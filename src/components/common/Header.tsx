"use client";

import Link from "next/link";
import { cn } from "@/libs/utils";
import { NavBar } from "@/components/Navigation/NavBar";
import { CoAILogo } from "@/components/ui/logo/CoAILogo";
import { Cross as Hamburger } from "hamburger-react";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import { useToggleState } from "@/hooks/useToggleState";
import { MobileMenu } from "../Navigation/MobileMenu";
import { navTopLinks } from "@/constants/links";
import { DEFAULT_HEADER_HEIGHT } from "@/app/config";

export function Header() {
  const { isOpen, toggleMenu } = useToggleState();
  const { isVisible, isAtTop } = useScrollVisibility();

  return (
    <>
      <header
        className={cn(
          "fixed z-[100] w-full transition-all duration-300 ease-in-out bg-inverse/60 backdrop-blur-sm",
          isVisible ? "top-0" : "-top-full",
          isAtTop ? `${DEFAULT_HEADER_HEIGHT}` : `h-16`,
          isOpen ? "bg-transparent" : "",
        )}
      >
        <div className="container flex h-full w-full items-center justify-between gap-16">
          <Link href="/" aria-label="Home">
            <CoAILogo size="sm" variant="onBlack" />
          </Link>

          <NavBar
            className="hidden md:flex"
            leftItems={navTopLinks.slice(0, 2)}
            rightItems={navTopLinks.slice(2)}
          />

          <div className="md:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={toggleMenu}
              direction="right"
              color="#FFF"
              size={28}
              aria-label="Toggle menu"
            />
          </div>
        </div>
      </header>
      <MobileMenu toggleMenu={toggleMenu} isOpen={isOpen} items={navTopLinks} />
    </>
  );
}
