import { HeroSection } from "./_components/sections/HeroSection";
import { IntroductionSection } from "./_components/sections/IntroductionSection";
import { JoinLiveVideoChat } from "./_components/sections/JoinLiveVideoChat";
import { BenefitSection } from "./_components/sections/BenefitSection";
import { MethodSection } from "./_components/sections/MethodSection";
import { FeatureSection } from "./_components/sections/FeatureSection";
import { ClientTestimonialSection } from "./_components/sections/ClientTestimonialSection";
// import { PricingSection } from "./_components/sections/PricingSection";
import { FAQSection } from "./_components/sections/FAQSection";

export default function AVA() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <JoinLiveVideoChat />
      <BenefitSection />
      <MethodSection />
      <FeatureSection />
      <ClientTestimonialSection />
      {/* <PricingSection /> */}
      <FAQSection />
    </>
  );
}
