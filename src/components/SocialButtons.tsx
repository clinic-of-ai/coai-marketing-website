import { SocialIcon } from "react-social-icons";
import { socialLinks } from "@/constants/links";

export function SocialButtons() {
  return (
    <>
      {socialLinks.map((link, index) => (
        <SocialIcon
          url={link.url}
          key={index + link.label}
          href={link.href}
          target="_blank"
          bgColor="#09d0ef"
          fgColor="#020817"
          style={{ height: 40, width: 40 }}
        />
      ))}
    </>
  );
}
