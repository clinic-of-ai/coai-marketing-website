"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { IntroTitle } from "@/components/IntroTitle";

interface Testimonial {
  id: number;
  quote: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

interface TestimonialsProps {
  content: {
    quotes: Testimonial[];
  };
}

export function Testimonials({ content }: TestimonialsProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: "rtl",
      dragFree: true,
    },
    [
      AutoPlay({
        delay: 3000,
        stopOnInteraction: false,
        playOnInit: true,
      }),
    ],
  );

  return (
    <section className="container overflow-hidden py-16">
      <div className="grid items-start gap-8 lg:grid-cols-[400px_1fr]">
        <div>
          <IntroTitle
            title="What Our Customers Say"
            align="left"
            heading="Testimonials"
          />
          <p className="leading-relaxed text-muted-foreground">
            Hear from our satisfied customers who have experienced the benefits
            of our solutions.
          </p>
        </div>
        <Carousel
          ref={emblaRef}
          className="w-full overflow-hidden bg-background"
        >
          <CarouselContent className="-ml-4 animate-carousel">
            {content.quotes.map((testimonial, index) => (
              <CarouselItem
                key={`${testimonial.id}-${index}`}
                className="min-w-0 basis-1/2 pl-4"
              >
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-[520px] max-w-3xl bg-muted shadow-none">
      <blockquote className="space-between flex h-full w-full flex-col p-6 md:p-8 md:pt-20">
        <p className="max-w-2xl text-start text-2xl leading-tight tracking-tighter">
          {testimonial.quote}
        </p>

        <footer className="mt-auto flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={testimonial.author.avatar}
              alt={testimonial.author.name}
            />
            <AvatarFallback>
              {testimonial.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <cite className="font-semibold not-italic">
              {testimonial.author.name}
            </cite>
            <span className="text-sm text-muted-foreground">
              {testimonial.author.title}
            </span>
          </div>
        </footer>
      </blockquote>
    </Card>
  );
}
