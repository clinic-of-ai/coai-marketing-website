"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

interface NavLinkProps extends Omit<LinkProps, "href"> {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export function NavLink(props: NavLinkProps) {
  const { href, children, size = "md", ...rest } = props;

  const pathname = usePathname();
  const isActive = pathname === href;

  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Link
      {...rest}
      href={href}
      className={cn(
        sizeClasses[size],
        `font-medium tracking-tight transition-all duration-300 ease-in-out ${
          isActive
            ? "text-inverse-foreground"
            : "text-inverse-foreground hover:text-primary"
        } `,
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
