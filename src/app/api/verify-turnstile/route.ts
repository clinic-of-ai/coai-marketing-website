import { NextRequest, NextResponse } from 'next/server';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function POST(request: NextRequest) {
  try {
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

    // Verify with Cloudflare
    const result = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

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
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error during verification' 
    }, { status: 500 });
  }
} 