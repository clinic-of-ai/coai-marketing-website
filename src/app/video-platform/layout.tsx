import type React from "react"
import "@/styles/globals.css";
import { plusJakartaSansFont, jetBrainsMonoFont } from "@/app/font";

import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/video-platform/theme-provider"
import { AuthProvider } from "@/components/video-platform/auth-provider"

export { meta as metadata } from "@/app/metadata";

type VideoPlatformLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function VideoPlatformLayout({ children }: VideoPlatformLayoutProps) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}