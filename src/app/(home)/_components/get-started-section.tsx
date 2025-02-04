"use client";

import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
// import { discoveryCallBookingSource } from "@/app/config";
// import { LeadForm } from "@/components/common/lead-form";

interface GetStartedSectionProps {
  title: string;
  heading: string;
  buttontext: string;
  videosrc: string;
  href: string;
}

export function GetStartedSection(props: GetStartedSectionProps) {
  return (
    <section className="relative h-[400px] w-full bg-muted lg:h-[640px]">
      <video
        src={props.videosrc}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/70">
        <div className="container flex h-full flex-col items-center justify-center gap-8">
          <TitleBlock
            {...props}
            size="lg"
            align="center"
            classNames={{
              container: "max-w-[740px] mx-auto text-center",
              heading: "text-white"
            }}
          />

          {/* <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
          </LeadForm> */}
          <AnimatedArrowButton className="w-fit rounded-full">
            {props.buttontext}
          </AnimatedArrowButton>
        </div>
      </div>
    </section>
  );
}
