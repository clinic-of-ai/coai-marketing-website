"use client";
import { InsightCard, InsightCardProps } from "@/components/Card/InsightCard";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IntroTitle } from "@/components/IntroTitle";

interface InsightSectionProps {
  content: {
    heading: string;
    subheading: string;
    blogLink: string;
    articles: {
      title: string;
      description: string;
      link: string;
      thumbnail: string;
    }[];
  };
}

export function Insight({ content }: InsightSectionProps) {

  const carouselInsights: InsightCardProps[] = content.articles.map(article => ({
    title: article.title,
    description: article.description,
    href: article.link,
    thumbnail: article.thumbnail,
  }));

  return (
    <section>
      <div className="container space-y-12 py-20">
        <div className="flex flex-col items-start gap-y-8 md:flex-row md:items-center md:justify-between">
          <IntroTitle
            heading={content.heading}
            title={content.subheading}
            size="md"
            className="pb-0 max-w-[540px]"
            align="left"
          />

          <a
            href={content.blogLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedArrowButton size="sm" className="text-xs md:mr-10">
              View All
            </AnimatedArrowButton>
          </a>
        </div>
        <Carousel
          className="mx-auto w-full max-w-[1150px]"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="-ml-1">
            {carouselInsights.map((insight, index) => (
              <CarouselItem
                key={insight.title + index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <InsightCard key={insight.title + index} {...insight} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
