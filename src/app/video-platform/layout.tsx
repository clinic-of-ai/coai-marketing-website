import type React from "react"
import "@/styles/globals.css"
import { NotificationContainer } from "@/components/video-platform/notification";

export { meta as metadata } from "@/app/metadata";

type VideoPlatformLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function VideoPlatformLayout({ children }: VideoPlatformLayoutProps) {
  return <>
  {children}
  <NotificationContainer />
  </>;
}