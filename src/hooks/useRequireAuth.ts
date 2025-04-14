'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';

/**
 * Hook to protect routes that require authentication
 * @param redirectTo The path to redirect to if not authenticated (default: /login)
 * @returns Object with isAuthenticated status and loading state
 */
export function useRequireAuth(redirectTo = '/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Wait until auth state is loaded
    if (!isLoading) {
      setAuthChecked(true);
      
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        // Include the current path as a redirect parameter
        const redirectUrl = `${redirectTo}?redirectTo=${encodeURIComponent(pathname)}`;
        router.push(redirectUrl);
      }
    }
  }, [isAuthenticated, isLoading, pathname, redirectTo, router]);

  return { 
    isAuthenticated, 
    isLoading: isLoading || !authChecked 
  };
} 