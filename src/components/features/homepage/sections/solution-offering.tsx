"use client";

import { useState } from "react";
import { IntroTitle } from "@/components/IntroTitle";
import { SolutionCard, SolutionContent } from "../cards/SolutionCard";
import { LeadForm } from "@/components/form/LeadForm";
import { discoveryCallBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";

interface SolutionOfferingSectionProps {
  content: {
    title: string;
    heading: string;
    solutions: SolutionContent[];
  };
}

export function SolutionOffering({ content }: SolutionOfferingSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<any>(null);

  return (
    <section className="bg-gradient-to-b from-[#17264A] to-[#020817] py-[108px] font-sans text-white">
      <div className="container mx-auto grid grid-cols-1 gap-y-12 px-6">
        <div className="flex flex-col gap-x-[105px] gap-y-6 lg:flex-row lg:items-end lg:justify-between">
          <IntroTitle
            align="left"
            size="lg"
            heading={content.title}
            title={content.heading}
          />
          <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
            <AnimatedArrowButton className="w-fit rounded-full">
              Book a call
            </AnimatedArrowButton>
          </LeadForm>
        </div>

        <div className="space-y-3 rounded-[12px] bg-[#E0E8EB] p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            {content.solutions.slice(0, 2).map((card, index) => (
              <SolutionCard
                key={`${card.title}-${index}`}
                content={card}
                isHovered={hoveredCard === `${card.title}-${index}`}
                onMouseEnter={() => setHoveredCard(`${card.title}-${index}`)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            {content.solutions.slice(2, 4).map((card, index) => (
              <SolutionCard
                key={`${card.title}-${index}`}
                content={card}
                isHovered={hoveredCard === `${card.title}-${index}`}
                onMouseEnter={() => setHoveredCard(`${card.title}-${index}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
