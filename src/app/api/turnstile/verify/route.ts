import { NextRequest, NextResponse } from 'next/server';
import config from '@/app/config';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Turnstile token is required' },
        { status: 400 }
      );
    }
    
    // Verify with Cloudflare Turnstile API
    const formData = new FormData();
    formData.append('secret', config.turnstile.secretKey || '');
    formData.append('response', token);
    formData.append('remoteip', req.headers.get('x-forwarded-for') || req.ip || '');
    
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const result = await response.json();
    
    if (result.success) {
      return NextResponse.json({ success: true, data: result });
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