import React from "react";
import { HeroSection } from "./_components/sections/HeroSection";
import { BenefitSection } from "./_components/sections/BenefitSection";
import { ServicesSection } from "./_components/sections/ServicesSection";
import { ClientTestimonialSection } from "./_components/sections/ClientTestimonialSection";
import { CallToActionSection } from "./_components/sections/CallToActionSection";

export default function GoHighLevelCRMPage() {
  return (
    <>
      <HeroSection />
      <BenefitSection />
      <ServicesSection />
      <ClientTestimonialSection />
      <CallToActionSection />
    </>
  );
}
