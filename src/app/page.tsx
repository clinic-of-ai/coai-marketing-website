import { OurPartners } from "@/components/features/homepage/sections/our-partners";
import { ClientGains } from "@/components/features/homepage/sections/client-gains";
import { Quote } from "@/components/features/homepage/sections/Quote";
import { SolutionOffering } from "@/components/features/homepage/sections/solution-offering";
import { DiscoveryProcess } from "@/components/features/homepage/sections/discovery-process";
import { Insight } from "@/components/features/homepage/sections/insight";
import { Industries } from "@/components/features/homepage/sections/industries";
import { CtaBanner } from "@/components/features/homepage/cards/CtaBanner";
import { Hero } from "@/components/features/homepage/sections/hero";
import { VideoIntroduction } from "@/components/features/homepage/sections/video-introduction";
import { CustomerBenefits } from "@/components/features/homepage/sections/customer-benefits";

import { LeadForm } from "@/components/form/LeadForm";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import { discoveryCallBookingSource } from "@/app/config";

import content from "@/data/general/home";

export default function Home() {
  return (
    <>
      <Hero
        content={content.hero}
        action={
          <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
            <AnimatedArrowButton className="rounded-full">
              Book a call
            </AnimatedArrowButton>
          </LeadForm>
        }
      />
      <VideoIntroduction content={content.videoIntro} />
      <OurPartners content={content.ourPartners} />
      <ClientGains content={content.clientGains} />
      <DiscoveryProcess content={content.discoveryProcess} />
      <CustomerBenefits content={content.customerBenefits} />
      <Quote content={content.quote} />
      <SolutionOffering content={content.solutionOffering} />
      <Industries content={content.industries} />
      <Insight content={content.insights} />
      <CtaBanner content={content.ctaBanner} />
    </>
  );
}
