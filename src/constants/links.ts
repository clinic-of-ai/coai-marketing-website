import type { NavLink } from "@/types/NavLink";
import { socialLinks as social, pagePaths } from "@/app/config";

export const navTopLinks: NavLink[] = [
  {
    href: pagePaths.solutions.path,
    label: pagePaths.solutions.name,
  },
  // {
  //   href: pagePaths.industries.path,
  //   label: pagePaths.industries.name,
  // },
  {
    href: pagePaths.about.path,
    label: pagePaths.about.name,
  },
  {
    href: pagePaths.contact.path,
    label: pagePaths.contact.name,
  },
  {
    href: pagePaths.blog.path,
    label: pagePaths.blog.name,
    target: "_blank",
  },
];

export const footerLinks: Readonly<{
  groupLabel: string;
  sub: NavLink[];
}>[] = [
  {
    groupLabel: "legal",
    sub: [
      { label: pagePaths.terms.name, href: pagePaths.terms.path },
      { label: pagePaths.policy.name, href: pagePaths.policy.path },
      { label: pagePaths.gdpr.name, href: pagePaths.gdpr.path },
      { label: pagePaths.contact.name, href: pagePaths.contact.path },
    ],
  },
  {
    groupLabel: "resources",
    sub: [
      { label: pagePaths.tutorials.name, href: pagePaths.tutorials.path },
      {
        label: pagePaths.blog.name,
        href: pagePaths.blog.path,
        target: "_blank",
      },
    ],
  },
];

export const socialLinks: (NavLink & Readonly<{ url: string }>)[] = [
  {
    label: "linkedin",
    href: social.linkedin,
    url: "www.linkedin.com",
  },
  {
    label: "twitch",
    href: social.twitch,
    url: "https://www.twitch.tv",
  },
  {
    label: "youtube",
    href: social.youtube,
    url: "https://www.youtube.com",
  },
  {
    label: "x",
    href: social.x,
    url: "https://twitter.com",
  },
  {
    label: "reddit",
    href: social.reddit,
    url: "https://www.reddit.com",
  },
  {
    label: "tiktok",
    href: social.tiktok,
    url: "https://www.tiktok.com",
  },
  {
    label: "instagram",
    href: social.instagram,
    url: "https://www.instagram.com",
  },
  {
    label: "facebook",
    href: social.facebook,
    url: "https://www.facebook.com",
  },
];
