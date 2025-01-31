import { CardVariantA, CardVariantAProps } from "./cards/benefit-card/card-variant-a";
import { CardVariantB, CardVariantBProps } from "./cards/benefit-card/card-variant-b";
import { CardVariantC, CardVariantCProps } from "./cards/benefit-card/card-variant-c";
import { CardVariantD, CardVariantDProps } from "./cards/benefit-card/card-variant-d";

import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
// import { LeadForm } from "@/components/common/lead-form";
// import { discoveryCallBookingSource } from "@/app/config";

interface ClientBenefitsProps {
  heading: string;
  paragraph: string;
  cards: {
    card1: CardVariantBProps;
    card2: CardVariantDProps;
    card3: CardVariantAProps;
    card4: CardVariantCProps;
  };
}

export function ClientBenefits(props: ClientBenefitsProps) {
  return (
    <section className="bg-[#E0E8EB] py-[108px] font-sans">
      <div className="container mx-auto grid grid-cols-1 gap-y-12 px-6">
        <div className="flex flex-col gap-x-[105px] gap-y-6 lg:flex-row">
          <h1 className="max-w-[360px] font-sans text-4xl leading-[48px] -tracking-[1.8px]">
            {props.heading}
          </h1>
          <div className="flex flex-col gap-y-6">
            <p className="max-w-[460px] font-sans leading-6 tracking-[-0.16px] text-black/60">
              {props.paragraph}
            </p>

            {/* <LeadForm
              source={discoveryCallBookingSource.bookingUrl}
              id={discoveryCallBookingSource.bookingId}
            >
            </LeadForm> */}
              <AnimatedArrowButton className="w-fit rounded-full">
                Book a call
              </AnimatedArrowButton>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CardVariantB {...props.cards.card1} />
          </div>
          <div className="lg:col-span-4">
            <CardVariantD {...props.cards.card2} />
          </div>
          <div className="lg:col-span-4">
            <CardVariantA {...props.cards.card3} />
          </div>
          <div className="lg:col-span-8">
            <CardVariantC {...props.cards.card4} />
          </div>
        </div>
      </div>
    </section>
  );
}
