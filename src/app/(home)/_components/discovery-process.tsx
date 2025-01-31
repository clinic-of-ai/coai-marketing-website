"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TitleBlock } from "@/components/common/title-block";
// import { LeadForm } from "@/components/common/lead-form";
// import { discoveryCallBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

interface DiscoveryProcessProps {
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
}

export function DiscoveryProcess(props: DiscoveryProcessProps) {
  const content = props.processes.map((process) => ({
    col1: (
      <div className="space-y-8">
        <div className="space-y-4">
          <Badge
            variant="secondary"
            className="bg-black/5 p-2 font-mono text-xs font-semibold uppercase text-muted-foreground transition-colors hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            {process.title}
          </Badge>
          <h2 className="text-xl font-semibold tracking-tight lg:pr-8">
            {process.heading}
          </h2>
          <p className="text-muted-foreground">{process.paragraph}</p>
        </div>
        <AnimatedArrowButton className="rounded-full">
          Book a call
        </AnimatedArrowButton>
      </div>
    ),
    col2: (
      <div className="flex h-full w-full items-center justify-center">
        <video
          src={process.media.src}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    ),
  }));
  return (
    <section className="space-y-20 bg-muted py-20 lg:px-6">
      <div className="container space-y-10">
        <TitleBlock size="md" {...props} />
        <Separator className="bg-muted-foreground/10" />
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
