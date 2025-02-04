"use client";

import * as React from "react";
import Link from "next/link";
import { Cross as Hamburger } from "hamburger-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useToggleState } from "@/hooks/useToggleState";

import { ThemeToggleButton } from "./theme-toggle-button";
import { MegaMenuContent } from "./navigation/mega-menu-content";

export function Header() {
  const { isOpen, toggleMenu } = useToggleState();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="inline-block font-bold">HackTheBox</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenuContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenuContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink>Pricing</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenuContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaMenuContent />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end gap-x-2">
          <div className="lg:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={toggleMenu}
              direction="right"
              size={28}
              aria-label="Toggle menu"
            />
          </div>
          <ThemeToggleButton />
        </div>
      </div>
      {/* Mobile menu content panel goes here */}
    </header>
  );
}
