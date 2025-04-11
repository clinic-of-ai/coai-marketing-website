'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NextTopLoader from "nextjs-toploader";
import { NotificationContainer } from "@/components/video-platform/notification";
import "@/styles/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        // Add your authentication check logic here
        const isAuthenticated = false; // Replace with actual auth check
        if (isAuthenticated) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NextTopLoader
        color="#00FFFF"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        zIndex={1600}
        showAtBottom={false}
      />
      {children}
      <NotificationContainer />
    </div>
  );
} 