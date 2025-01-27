"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { IntroTitle } from "@/components/IntroTitle";

export function Features() {
  return (
    <section>
      <div className="container py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <IntroTitle
            title="CRM setup solution as a service, the features we offer"
            heading="features"
          />
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            {" We'll"} configure and optimize your CRM to streamline workflows,
            automate tasks, and boost productivity.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="container mx-auto max-w-7xl">
          <CarouselCards />
        </div>
      </div>
    </section>
  );
}

function Card() {
  return <div className="aspect-square rounded-lg bg-muted p-4"></div>;
}

// group flex h-full flex-col gap-6    transition-shadow hover:shadow-lg
// {/* <div className="flex h-24 w-24 items-center justify-center">
// <BarChart3 className="h-16 w-16 text-[#d9d9d9]" />
// </div>
// <div className="space-y-4">
// <h3 className="text-2xl font-semibold">Customisable tool</h3>
// <p className="text-[#000000]/70">
//   Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Nam
//   sed tellus id magna elementum tincidunt.
// </p>
// </div>
// <div className="mt-auto">
// <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
// </div> */}

function CarouselCards() {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="space-y-16">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="-ml-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="space-x-2 md:basis-1/2 lg:basis-1/3"
            >
              <Card />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-8">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border-2 border-border hover:bg-muted"
          onClick={() => api?.scrollPrev()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <span className="text-sm font-bold">
          {current} / <span className="text-muted-foreground">{count}</span>
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border-2 border-border hover:bg-muted"
          onClick={() => api?.scrollNext()}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
