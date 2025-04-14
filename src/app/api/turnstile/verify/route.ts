import { NextRequest, NextResponse } from 'next/server';

// Rate limiting implementation
const RATE_LIMIT_DURATION = 60 * 1000; // 1 minute in milliseconds
const MAX_REQUESTS = 10; // Maximum requests per minute
const ipRequests = new Map<string, { count: number; timestamp: number }>();

// Clean up old rate limiting entries periodically
let cleanupInterval: NodeJS.Timeout | null = null;

// Initialize rate limiting cleanup when in Node.js environment
if (typeof global !== 'undefined' && !cleanupInterval) {
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of ipRequests.entries()) {
      if (now - data.timestamp > RATE_LIMIT_DURATION) {
        ipRequests.delete(ip);
      }
    }
  }, RATE_LIMIT_DURATION);
  
  // Ensure the interval is cleared if the process exits
  if (typeof process !== 'undefined') {
    process.on('exit', () => {
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
      }
    });
    
    // Also clear on SIGINT and SIGTERM
    process.on('SIGINT', () => {
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
      }
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      if (cleanupInterval) {
        clearInterval(cleanupInterval);
        cleanupInterval = null;
      }
      process.exit(0);
    });
  }
}

// Helper function that safely checks if a string starts with any of the allowed origins
function hasValidOrigin(value: string | null | undefined, allowedOrigins: string[]): boolean {
  if (!value) return false;
  
  for (const origin of allowedOrigins) {
    if (value.startsWith(origin)) {
      return true;
    }
  }
  
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.ip || '';
    
    // Check rate limit
    if (ip) {
      const now = Date.now();
      const requestData = ipRequests.get(ip) || { count: 0, timestamp: now };
      
      if (now - requestData.timestamp < RATE_LIMIT_DURATION) {
        // Within the rate limit window
        if (requestData.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { success: false, message: 'Too many requests, please try again later' },
            { status: 429 }
          );
        }
        requestData.count++;
      } else {
        // Reset for a new rate limit window
        requestData.count = 1;
        requestData.timestamp = now;
      }
      
      ipRequests.set(ip, requestData);
    }
    
    // Define allowed origins
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL,
      'https://www.clinicofai.com', 
      'https://clinicofai.com',
      // Add localhost for development
      'http://localhost:3000'
    ].filter(Boolean) as string[]; // Remove any undefined values
    
    // Origin validation
    const origin = req.headers.get('origin');
    if (!hasValidOrigin(origin, allowedOrigins)) {
      return NextResponse.json(
        { success: false, message: 'Invalid origin' },
        { status: 403 }
      );
    }
    
    // CSRF token validation - check if the request is coming from our site
    const referer = req.headers.get('referer');
    if (!hasValidOrigin(referer, allowedOrigins)) {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing referer' },
        { status: 403 }
      );
    }
    
    // Get the token from the request body
    const { token } = await req.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Turnstile token is required' },
        { status: 400 }
      );
    }
    
    // Verify with Cloudflare Turnstile API
    const formData = new FormData();
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY || '');
    formData.append('response', token);
    formData.append('remoteip', ip);
    
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Turnstile API responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      return NextResponse.json(
        { success: true, data: result },
        {
          headers: {
            // Set security headers
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Cache-Control': 'no-store, max-age=0'
          }
        }
      );
    } else {
      console.error('Turnstile verification failed:', result['error-codes']);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Verification failed', 
          errors: result['error-codes'] 
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 