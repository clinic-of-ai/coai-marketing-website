'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/libs/supabase';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get code and next from URL
      const code = searchParams.get('code');
      const next = searchParams.get('next') || '/';
      
      if (code) {
        try {
          // Exchange the code for a session
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error('Error exchanging code for session:', error);
            router.push('/auth/login?error=Authentication%20failed');
            return;
          }
          
          // Redirect to the intended destination or default route
          router.push(decodeURIComponent(next));
        } catch (error) {
          console.error('Auth callback error:', error);
          router.push('/auth/login?error=Authentication%20failed');
        }
      } else {
        // No code in URL, redirect to login
        router.push('/auth/login');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[hsl(222.2,84%,4.9%)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Completing authentication...</h2>
        <p className="text-gray-500 dark:text-gray-400">Please wait while we finish the authentication process.</p>
      </div>
    </div>
  );
}

// Loading fallback
function CallbackFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[hsl(222.2,84%,4.9%)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Loading...</h2>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackFallback />}>
      <CallbackContent />
    </Suspense>
  );
} 