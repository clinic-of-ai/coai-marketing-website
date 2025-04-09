import type React from "react"
import "@/styles/globals.css"
import { plusJakartaSansFont, jetBrainsMonoFont } from "@/app/font";
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