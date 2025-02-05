"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useEffect} from "react";
import Hamburger from "hamburger-react"; 
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ThemeToggleButton } from "./theme-toggle-button";
import ProductPanel from "@/components/common/navigation/dropdown-panel/product-panel";
import SolutionPanel from "@/components/common/navigation/dropdown-panel/solution-panel";
import ResourcePanel from "@/components/common/navigation/dropdown-panel/resource-panel";
import CompanyPanel from "@/components/common/navigation/dropdown-panel/company-panel";
import { CoAILogo } from "@/components/ui/logo/CoAILogo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const themeObserver = new MutationObserver(() => {
      checkDarkMode();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      themeObserver.disconnect();
    };
  }, []);


  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
      <CoAILogo variant="onBlack" size="sm" className="mr-4" />
        <div className="flex lg:hidden absolute top-2 right-16">
      <Hamburger
        toggled={isMobileMenuOpen}
        toggle={toggleMobileMenu}
        size={24}
        color={isDarkMode ? 'white' : 'black'}
      />
    </div>

    <NavigationMenu className="hidden lg:flex flex-1 justify-between">
    <NavigationMenuList className="flex w-full justify-between"> 
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ProductPanel />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <SolutionPanel />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref className="mr-2 ml-2">
                <NavigationMenuLink>Pricing</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ResourcePanel />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <CompanyPanel />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed top-0 left-0 z-40 w-full h-full bg-white bg-opacity-75 dark:bg-black dark:bg-opacity-75 transition-all duration-300 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          onClick={closeMobileMenu}
        ></div>

        {/* Mobile Menu Container (Card Style) */}
        <div
          className={`lg:hidden fixed top-0 left-0 z-50 w-full h-full transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } ${isMobileMenuOpen ? "bg-white dark:bg-black" : ""}`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-5 text-2xl font-bold text-black dark:text-white"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            &times; {/* Cross Symbol */}
          </button>

          <div className="flex flex-col mt-20 space-y-6 p-8 bg-white dark:bg-black shadow-lg rounded-lg">
            <Link href="/" passHref>
              <p className="text-[16px] font-semibold text-black dark:text-white" onClick={closeMobileMenu}>
                Products →
              </p>
            </Link>
            <Link href="/" passHref>
              <p className="text-[16px] font-semibold text-black dark:text-white" onClick={closeMobileMenu}>
                Solutions →
              </p>
            </Link>
            <Link href="/pricing" passHref>
              <p className="text-[16px] font-semibold text-black dark:text-white" onClick={closeMobileMenu}>
                Pricing
              </p>
            </Link>
            <Link href="/" passHref>
              <p className="text-[16px] font-semibold text-black dark:text-white" onClick={closeMobileMenu}>
                Resources →
              </p>
            </Link>
            <Link href="/" passHref>
              <p className="text-[16px] font-semibold text-black dark:text-white" onClick={closeMobileMenu}>
                Company →
              </p>
            </Link>
          </div>
        </div>

        {/* Right Side Theme Toggle Button */}
        <div className="flex flex-1 items-center justify-end gap-x-2">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
