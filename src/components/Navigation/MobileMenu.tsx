import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavLink as NavLinkType } from "@/types/NavLink";
import { MenuItem } from "./MenuItem";
import { pagePaths } from "@/app/config";
import Autoplay from "embla-carousel-autoplay";
import { ScrollArea } from "../ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SolutionNavCard } from "../Card/SolutionNavCard";
import { solutionsPreviewItems } from "@/data/solutions-preview";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  items: NavLinkType[];
  toggleMenu: () => void;
}

export function MobileMenu({ isOpen, items, toggleMenu }: MobileMenuProps) {
  const menuVariants = {
    hidden: { y: "-100%" },
    visible: { y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: {
      y: "-100%",
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.4 },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isOpen]);

  const renderComponent = useCallback(
    (item: NavLinkType, index: number, items: NavLinkType[]) => {
      switch (item.href) {
        case pagePaths.solutions.path:
          return (
            <div className="w-full space-y-7 border-b border-b-white/20 pb-7">
              <MenuItem {...item} index={index} itemsLength={items.length}>
                {item.label}
              </MenuItem>

              <Carousel
                opts={{ align: "start", loop: true }}
                plugins={[Autoplay({ delay: 2000 })]}
                className="mx-auto w-full max-w-full"
              >
                <CarouselContent className="-ml-1">
                  {solutionsPreviewItems.map((item, index) => (
                    <CarouselItem key={index} className="pl-2">
                      <Link href={item.href} onClick={() => toggleMenu()}>
                        <SolutionNavCard key={index} {...item} />
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          );
        default:
          return (
            <Link href={item.href} onClick={() => toggleMenu()}>
              <MenuItem {...item} index={index} itemsLength={items.length}>
                {item.label}
              </MenuItem>
            </Link>
          );
      }
    },
    [toggleMenu],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-inverse"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
        >
          <ScrollArea className="h-full w-full">
            <nav>
              <div className="container mt-20 h-full w-full">
                {items.map((item, i) => (
                  <div key={item.label + i}>
                    {renderComponent(item, i, items)}
                  </div>
                ))}
              </div>
            </nav>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
