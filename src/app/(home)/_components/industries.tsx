"use client";

import { IndustryCard, IndustryCardProps } from "./cards/industry-card";
import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { Marquee } from "@/components/ui/marquee";
// import { LeadForm } from "@/components/common/lead-form";
// import { discoveryCallBookingSource } from "@/app/config";

interface IndustriesSectionProps {
  title: string;
  heading: string;
  paragraph: string;
  industries: IndustryCardProps[];
}

export function Industries(props: IndustriesSectionProps) {
  return (
    <section className="relative space-y-16 border-y border-border">
      <div className="container border-x border-border flex place-items-center pb-[72px] pt-[72px]">
        <div className="mx-auto max-w-[680px] space-y-8">
          <TitleBlock {...props} size="lg" className="pb-0" />
          <p className="mx-auto max-w-[640px] text-center font-sans leading-6 tracking-[-0.16px] text-muted-foreground">
            {props.paragraph}
          </p>
        </div>
      </div>
      <div className="px-2 overflow-x-hidden pb-[72px]">
        <Marquee
          className="w-full"
          pauseOnHover={true}
        >
          <div className="flex">
            {props.industries.map((industry, index) => (
              <>
                <div
                  key={`industry-${index}`}
                  className="min-w-[355px] px-2"
                >
                  <IndustryCard {...industry} layout="loosed" />
                </div>
                {(index + 1) % 3 === 0 && (
                  <div
                    key={`cta-${index}`}
                    className="min-w-[500px] px-2 h-auto"
                  >
                    <CTACard />
                  </div>
                )}
              </>
            ))}
          </div>
        </Marquee>
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
        <p className="text-sm leading-7 text-white/60">
          The benefits our GenAI and LLM solutions can bring to various
          businesses are endless. Let us know if there are other problems we can
          help.
        </p>
      </div>
      <div>
        {/* <LeadForm
          source={discoveryCallBookingSource.bookingUrl}
          id={discoveryCallBookingSource.bookingId}
        >
        </LeadForm> */}
          <AnimatedArrowButton>Book Now</AnimatedArrowButton>
      </div>
    </div>
  );
}
