'use client';

import { usePathname } from 'next/navigation';
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/footer";
import { GHLChatBot } from "@/components/common/widgets/ghl-chatbot";
import config from "./config";

type LayoutContentProps = {
  children: React.ReactNode;
};

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/forgot-password');

  return (
    <>
      {!isAuthRoute && <Header />}
      <main>{children}</main>
      {!isAuthRoute && <Footer />}
      {!isAuthRoute && <GHLChatBot {...config.chatbot.ghl} />}
    </>
  );
} 