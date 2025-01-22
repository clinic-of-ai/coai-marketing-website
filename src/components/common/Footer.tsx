import Image from "next/image";
import { CoAILogo } from "@/components/ui/logo/CoAILogo";
import { footerLinks } from "@/constants/links";
import { NavLink } from "../Navigation/NavLink";
import { siteConfig } from "@/app/config";
import { SocialButtons } from "../SocialButtons";

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h5 className="font-bold text-muted-foreground">{children}</h5>
);

const FooterLinkGroup = ({
  groupLabel,
  links,
}: {
  groupLabel: string;
  links: { label: string; href: string }[];
}) => (
  <div className="space-y-2 capitalize">
    <FooterHeading>{groupLabel}</FooterHeading>
    <div className="flex flex-col gap-y-2">
      {links.map((link, index) => (
        <NavLink key={`${link.label}-${index}`} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </div>
  </div>
);

function FooterStrip() {
  return (
    <div className="container flex flex-col justify-between gap-6 py-7 text-sm text-muted-foreground md:flex-row md:items-center">
      <p>© {new Date().getFullYear()} Clinic of AI. All Rights Reserved.</p>
      <p>Making 🤖 with 💖 for the 🌏</p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-inverse-foreground/15 bg-inverse pt-16 text-sm text-inverse-foreground">
      <div className="container flex w-full max-w-6xl flex-col justify-between gap-y-12 pb-12 sm:flex-row">
        <div className="space-y-12">
          <CoAILogo variant="onBlack" />

          <div className="max-w-[600px] space-y-2">
            <h4 className="text-2xl tracking-tighter">
              {"Let's"} get in touch and {"we'll"} show you how {"we've"} helped
              others with similar problems
            </h4>
            <p className="leading-6 text-muted-foreground">
              We are your partner for AI research and development, regardless of
              your size, expertise, or financial constraints. We will help you
              succeed and always stay one step ahead of the curve.
            </p>
          </div>

          <div className="space-y-2">
            <p>{siteConfig.address}</p>
            <p>
              <a href={`tel:${siteConfig.phone}`} className="font-semibold">
                Call Us: {siteConfig.phone}
              </a>
            </p>
          </div>

          <div className="my-2 flex flex-wrap items-center gap-x-2">
            <SocialButtons />
          </div>
        </div>

        <div className="flex flex-col gap-y-10">
          <div className="grid grid-cols-2 gap-x-10">
            {footerLinks.map((link, index) => (
              <FooterLinkGroup
                key={`${link.groupLabel}-${index}`}
                groupLabel={link.groupLabel}
                links={link.sub}
              />
            ))}
          </div>

          <div className="grid grid-row-2 grid-cols-2 gap-2">
            <Image
              alt="Training Provider Badge"
              src="/image/badge/training-provider-badge.png"
              height={150}
              width={150}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-inverse-foreground/15">
        <FooterStrip />
      </div>
    </footer>
  );
}
