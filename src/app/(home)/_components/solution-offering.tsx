"use client";

import { useState } from "react";
import { TitleBlock } from "@/components/common/title-block";
import { SolutionCard, SolutionContent } from "./cards/solution-card";
// import { LeadForm } from "@/components/common/lead-form";
// import { discoveryCallBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

interface SolutionOfferingSectionProps {
  title: string;
  heading: string;
  solutions: SolutionContent[];
}

export function SolutionOffering(props: SolutionOfferingSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<any>(null);

  return (
    <section className="bg-gradient-to-b from-[#17264A] to-[#020817] py-[108px] font-sans text-white">
      <div className="container mx-auto grid grid-cols-1 gap-y-12 px-6">
        <div className="flex flex-col gap-x-[105px] gap-y-6 lg:flex-row lg:items-end lg:justify-between">
          <TitleBlock
            align="left"
            size="lg"
            {...props}
          />
          {/* <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
          </LeadForm> */}
            <AnimatedArrowButton className="w-fit rounded-full">
              Book a call
            </AnimatedArrowButton>
        </div>

        <div className="space-y-3 rounded-[12px] bg-[#E0E8EB] p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            {props.solutions.slice(0, 2).map((solution, index) => (
              <SolutionCard
                key={`${solution.title}-${index}`}
                content={solution}
                isHovered={hoveredCard === `${solution.title}-${index}`}
                onMouseEnter={() => setHoveredCard(`${solution.title}-${index}`)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            {props.solutions.slice(2, 4).map((solution, index) => (
              <SolutionCard
                key={`${solution.title}-${index}`}
                content={solution}
                isHovered={hoveredCard === `${solution.title}-${index}`}
                onMouseEnter={() => setHoveredCard(`${solution.title}-${index}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
