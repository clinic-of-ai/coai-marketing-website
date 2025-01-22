"use client";
import { InfiniteLoopCarousel } from "@/components/InfiniteLoopCarousel";
import { IndustryCard } from "@/components/Card/IndustryCard";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import { LeadForm } from "@/components/form/LeadForm";
import { discoveryCallBookingSource } from "@/app/config";
import { IntroTitle } from "@/components/IntroTitle";

interface IndustriesSectionProps {
  content: {
    title: string;
    heading: string;
    paragraph: string;
    industries: {
      title: string;
      heading: string;
      paragraph: string;
      imageSrc: string;
      href: string;
    }[]
  };
}

export function Industries({ content }: IndustriesSectionProps) {
  return (
    <section className="relative space-y-16 border-b border-border py-[72px]">
      <div className="container flex place-items-center pb-[72px]">
        <div className="container mx-auto max-w-[680px] space-y-8">
          <IntroTitle
            heading={content.title}
            title={content.heading}
            size="lg"
            className="pb-0"
          />
          <p className="mx-auto max-w-[640px] text-center font-sans leading-6 tracking-[-0.16px] text-black/60">
            {content.paragraph}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl overflow-x-hidden">
        <InfiniteLoopCarousel>
          {[...content.industries, ...content.industries].flatMap((industry, index, array) => {
            const items = [
              <IndustryCard 
                key={`industry-${index}`}
                title={industry.title}
                paragraph={industry.paragraph}
                imageSrc={industry.imageSrc}
                href={industry.href}
              />
            ];
            if ((index + 1) % 3 === 0) {
              items.push(<CTACard key={`cta-${index}`} />);
            }
            return items;
          })}
        </InfiniteLoopCarousel>
      </div>
    </section>
  );
}

function CTACard() {
  return (
    <div className="flex h-[347px] w-[500px] min-w-[500px] flex-col justify-between gap-4 rounded-[12px] bg-[#233171] px-8 py-10 text-white">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl tracking-tight">
          Unlock the power of artificial intelligence for your business
        </h3>
        <p className="text-white/60 text-sm leading-7">
          The benefits our GenAI and LLM solutions can bring to various
          businesses are endless. Let us know if there are other problems we can
          help.
        </p>
      </div>
      <div>
        <LeadForm
          source={discoveryCallBookingSource.bookingUrl}
          id={discoveryCallBookingSource.bookingId}
        >
          <AnimatedArrowButton>Book Now</AnimatedArrowButton>
        </LeadForm>
      </div>
    </div>
  );
}
