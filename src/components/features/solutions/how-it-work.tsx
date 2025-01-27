"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { IntroTitle } from "@/components/IntroTitle";

interface HowItWorksProps {
  content: {
    title: string;
    heading: string;
    features: {
      number: string;
      heading: string;
      paragraph: string;
    }[];
  };
}

export function HowItWorks({ content }: HowItWorksProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-12 flex max-w-xl items-start justify-between">
          <IntroTitle
            heading={content.title}
            title={content.heading}
            align="left"
          />
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[Autoplay({ delay: 5000 })]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {content.features.map((feature, index) => (
              <CarouselItem key={index} className="pl-2 lg:basis-1/2 lg:pl-4">
                <Card {...feature} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 hidden justify-end gap-2 md:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {content.features.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`h-3 w-3 rounded-full p-0 ${current === index ? "bg-black" : "bg-gray-300"}`}
              onClick={() => goToSlide(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card(props: HowItWorksProps["content"]["features"][0]) {
  const { number, heading, paragraph } = props;
  return (
    <div className="aspect-video rounded-lg border border-border p-3 group">
      <div className="h-full rounded-md bg-slate-400"></div>
      <div className="p-6">
        <Badge className="mb-4 px-3 py-2 bg-slate-600 font-bold">
          {number}
          <ArrowRightIcon className="h-6 w-6" />
        </Badge>
        <h3 className="mt-4 font-semibold">{heading}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      </div>
    </div>
  );
}
