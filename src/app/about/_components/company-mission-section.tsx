import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SectionHeader } from "@/components/common/section-header";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { LeadForm } from "@/components/common/lead-form";
import { discoveryCallBookingSource } from "@/app/config";
import { type LucideProps } from "lucide-react";

interface CompanyMissionSectionProps {
  features: FeatureCardProps[];
  title: string;
  heading: string;
  paragraph: string;
  image: {
    url: string;
    alt: string;
  };
}

export function CompanyMissionSection(props: CompanyMissionSectionProps) {
  return (
    <div className="container">
      <div className="flex flex-col gap-4 pb-10 pt-20">
        <SectionHeader
          subtitle={props.title}
          title={props.heading}
          description={props.paragraph}
        />
      </div>

      <AspectRatio ratio={13 / 8} className="w-full">
        <Image
          src={props.image.url}
          alt={props.image.alt}
          className="rounded-xl bg-slate-400 object-cover"
          fill
        />
      </AspectRatio>

      <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {props.features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  heading: string;
  paragraph: string;
  link: string;
  icon: React.FC<LucideProps>;
}

function FeatureCard(props: FeatureCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-lg px-4 py-6 sm:flex-row sm:items-start">
      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
        <props.icon className="size-6" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-sm font-bold">{props.heading}</h2>
          <p className="max-w-[320px] text-sm text-foreground/50">
            {props.paragraph}
          </p>
        </div>
        <LeadForm
          source={discoveryCallBookingSource.bookingUrl}
          id={discoveryCallBookingSource.bookingId}
        >
          <AnimatedArrowButton size="sm" className="mx-auto w-fit sm:mx-0">
            <span className="font-medium md:text-xs">Show me</span>
          </AnimatedArrowButton>
        </LeadForm>
      </div>
    </div>
  );
}
