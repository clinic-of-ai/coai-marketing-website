import { CardVarOne } from "../cards/CardVarOne";
import { CardVarTwo } from "../cards/CardVarTwo";
import { CardVarThree } from "../cards/CardVarThree";
import { CardVarFour } from "../cards/CardVarFour";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import { LeadForm } from "@/components/form/LeadForm";
import { discoveryCallBookingSource } from "@/app/config";

interface CustomerBenefitsProps {
  content: {
    heading: string;
    paragraph: string;
    cards: {
      mainCard: {
        title: string;
        subtitle: string;
        description: string;
        imageSrc: string;
      };
      integrationCard: {
        title: string;
        subtitle: string;
        description: string;
      };
      quickStartCard: {
        title: string;
        subtitle: string;
      };
      aiTeamCard: {
        imageSrc: string;
        heading: string;
        title: string;
        description: string;
      };
    };
  };
}

export function CustomerBenefits({ content }: CustomerBenefitsProps) {
  return (
    <section className="bg-[#E0E8EB] py-[108px] font-sans">
      <div className="container mx-auto grid grid-cols-1 gap-y-12 px-6">
        <div className="flex flex-col gap-x-[105px] gap-y-6 lg:flex-row">
          <h1 className="max-w-[360px] font-sans text-4xl leading-[48px] -tracking-[1.8px]">
            {content.heading}
          </h1>
          <div className="flex flex-col gap-y-6">
            <p className="max-w-[460px] font-sans leading-6 tracking-[-0.16px] text-black/60">
              {content.paragraph}
            </p>

            <LeadForm
              source={discoveryCallBookingSource.bookingUrl}
              id={discoveryCallBookingSource.bookingId}
            >
              <AnimatedArrowButton className="w-fit rounded-full">
                Book a call
              </AnimatedArrowButton>
            </LeadForm>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 rounded-lg bg-white p-3 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CardVarOne content={content.cards.mainCard} />
          </div>
          <div className="lg:col-span-4">
            <CardVarTwo content={content.cards.integrationCard} />
          </div>
          <div className="lg:col-span-4">
            <CardVarFour content={content.cards.quickStartCard} />
          </div>
          <div className="lg:col-span-8">
            <CardVarThree content={content.cards.aiTeamCard} />
          </div>
        </div>
      </div>
    </section>
  );
}
