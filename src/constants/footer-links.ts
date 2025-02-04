export type FooterLink = Readonly<{
  groupLabel: string;
  sub: {
    label: string;
    href: string;
    target?: string;
  }[];
}>[];

export const footerLinks: FooterLink = [
  {
    groupLabel: "legal",
    sub: [
      {
        label: "terms",
        href: "/",
      },
      {
        label: "policy",
        href: "/",
      },
      {
        label: "gdpr",
        href: "/",
      },
      {
        label: "contact",
        href: "/",
      },
    ],
  },
  {
    groupLabel: "resources",
    sub: [
      {
        label: "tutorials",
        href: "/",
      },
      {
        label: "blog",
        href: "/",
        target: "_blank",
      },
    ],
  },
];
