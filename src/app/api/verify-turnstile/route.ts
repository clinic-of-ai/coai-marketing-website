import { NextRequest, NextResponse } from 'next/server';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function POST(request: NextRequest) {
  try {
    // Check if secret key is configured
    if (!TURNSTILE_SECRET_KEY) {
      console.error('Turnstile secret key is not configured');
      return NextResponse.json({ 
        success: false, 
        error: 'Captcha service is not properly configured' 
      }, { status: 500 });
    }

    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Turnstile token is required' 
      }, { status: 400 });
    }

    // Prepare form data for Cloudflare API
    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    
    // Optional: Add the user's IP address
    if (request.ip) {
      formData.append('remoteip', request.ip);
    }

    // Verify with Cloudflare with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const result = await fetch(TURNSTILE_VERIFY_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!result.ok) {
        console.error('Turnstile API responded with error:', result.status, result.statusText);
        return NextResponse.json({ 
          success: false, 
          error: 'Error communicating with captcha service' 
        }, { status: 502 });
      }

      const outcome = await result.json();

      if (outcome.success) {
        return NextResponse.json({ success: true });
      } else {
        console.error('Turnstile verification failed:', outcome['error-codes']);
        return NextResponse.json({ 
          success: false, 
          error: 'Captcha verification failed',
          details: outcome['error-codes'] 
        }, { status: 400 });
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('Turnstile verification timed out');
        return NextResponse.json({ 
          success: false, 
          error: 'Captcha verification timed out' 
        }, { status: 504 });
      }
      throw fetchError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error during verification' 
    }, { status: 500 });
  }
} 