import React, { FC } from "react";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import { LeadForm } from "@/components/form/LeadForm";
import { discoveryCallBookingSource } from "@/app/config";
import { type LucideProps } from 'lucide-react';

export interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.FC<LucideProps>
}

export function FeatureCard({ title, description, link, icon: Icon }: FeatureCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-lg px-4 py-6 sm:flex-row sm:items-start">
      <div className="size-12 bg-primary/10 rounded-full flex justify-center items-center" >
        <Icon className="size-6" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="max-w-[320px] text-sm text-foreground/50">
            {description}
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
