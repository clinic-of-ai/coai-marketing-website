import { Hero } from "@/components/features/solutions/hero";
import { SolutionOverview } from "@/components/features/solutions/solution-overview";
import { Benefits } from "@/components/features/solutions/benefits";
import { HowItWorks } from "@/components/features/solutions/how-it-work";
import { Features } from "@/components/features/solutions/features";
import { Testimonials } from "@/components/features/solutions/testimonials";
import { PricingCta } from "@/components/features/solutions/pricing-cta";

import content from "@/data/solutions/gohighlevel-crm";

export default function GoHighLevelCRMPage() {
  return (
    <>
      <Hero content={content.hero} />
      <SolutionOverview content={content.solutionOverview} />
      <Benefits content={content.benefits} />
      <HowItWorks content={content.howItWorks} />
      <Features />
      <Testimonials content={content.testimonials} />
      <PricingCta content={content.pricingCta} />
    </>
  );
}
