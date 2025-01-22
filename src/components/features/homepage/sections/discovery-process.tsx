"use client";

import { IntroTitle } from "@/components/IntroTitle";
import { LeadForm } from "@/components/form/LeadForm";
import { discoveryCallBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import { StepCard } from "@/components/features/homepage/cards/StepCard";

interface DiscoveryProcessProps {
  content: {
    title: string;
    heading: string;
    processes: {
      title: string;
      heading: string;
      paragraph: string;
      media: {
        src: string;
        alt: string;
      };
    }[];
  };
}

export function DiscoveryProcess({ content }: DiscoveryProcessProps) {
  return (
    <section className="space-y-20 py-20 lg:px-6">
      <IntroTitle size="md" heading={content.title} title={content.heading} />
      <StepCard
        content={content.processes}
        action={() => {
          return (
            <LeadForm
              source={discoveryCallBookingSource.bookingUrl}
              id={discoveryCallBookingSource.bookingId}
            >
              <AnimatedArrowButton className="rounded-full">
                Book a call
              </AnimatedArrowButton>
            </LeadForm>
          );
        }}
      />
    </section>
  );
}
