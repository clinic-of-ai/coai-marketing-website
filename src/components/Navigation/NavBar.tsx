import { cn } from "@/libs/utils";
import { NavLink } from "./NavLink";
import { NavLink as NavLinkType } from "@/types/NavLink";
import { SolutionNavCard } from "../Card/SolutionNavCard";
import { solutionsPreviewItems } from "@/data/solutions-preview";
import { pagePaths } from "@/app/config";
import Autoplay from "embla-carousel-autoplay";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AnimatedArrowButton } from "../AnimatedArrowButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface NavBarProps {
  leftItems: NavLinkType[];
  rightItems: NavLinkType[];
  className?: string;
}

export function NavBar({ leftItems, rightItems, className }: NavBarProps) {
  return (
    <nav
      className={cn(
        "flex h-full w-full items-center justify-between",
        className,
      )}
    >
      <div className="flex items-center gap-x-7">
        {leftItems.map((item, index) => (
          <div key={`left-${index}`}>{renderComponent(item)}</div>
        ))}
      </div>

      <div className="flex items-center gap-x-7 pr-6">
        {rightItems.map((item, index) => (
          <NavLink {...item} key={`right-${index}`}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

const renderComponent = (item: NavLinkType) => {
  switch (item.href) {
    case pagePaths.solutions.path:
      return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="rounded-full">
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[360px] p-4">
                  <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[Autoplay({ delay: 2000 })]}
                    className="mx-auto w-full max-w-[620px]"
                  >
                    <CarouselContent className="-ml-1">
                      {solutionsPreviewItems.map((item, index) => (
                        <CarouselItem key={index} className="pl-2">
                          <NavigationMenuLink asChild>
                            <SolutionNavCard key={index} {...item} />
                          </NavigationMenuLink>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  {/* <div className="w-full pt-6">
                    <AnimatedArrowButton
                      size="sm"
                      variant="secondary"
                      className="mx-auto w-fit"
                    >
                      <span className="text-xs">View All</span>
                    </AnimatedArrowButton>
                  </div> */}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    default:
      return <NavLink {...item}>{item.label}</NavLink>;
  }
};
