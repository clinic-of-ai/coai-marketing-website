import { Marquee } from "@/components/ui/marquee";
import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

import { IndustryCard, IndustryCardProps } from "./cards/industry-card";
// import { LeadForm } from "@/components/common/lead-form";
// import { discoveryCallBookingSource } from "@/app/config";

interface IndustriesSectionProps {
  title: string;
  heading: string;
  paragraph: string;
  industries: IndustryCardProps[];
}

export function Industries(props: IndustriesSectionProps) {
  return (
    <section className="relative border-y border-border">
      <div className="container border-x border-border flex place-items-center pt-[72px] pb-[72px]">
        <div className="mx-auto max-w-[680px] space-y-8">
          <TitleBlock {...props} size="lg" />
          <p className="mx-auto max-w-[640px] text-center font-sans leading-6 tracking-[-0.16px] text-muted-foreground">
            {props.paragraph}
          </p>
        </div>
      </div>

      <div className="px-0 overflow-x-hidden pb-[72px] container border-x border-border">
        <Marquee
          className="w-full"
          pauseOnHover={true}
        >
          <div className="flex">
            {props.industries.map((industry, index) => (
              <>
                <div
                  key={`industry-${index}`}
                  className="min-w-[355px] px-2"
                >
                  <IndustryCard {...industry} layout="loosed" />
                </div>
                {(index + 1) % 3 === 0 && (
                  <div
                    key={`cta-${index}`}
                    className="min-w-[500px] px-2 h-auto"
                  >
                    <CTACard />
                  </div>
                )}
              </>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}

function CTACard() {
  return (
    <div className="flex h-full w-[500px] min-w-[500px] flex-col justify-between gap-4 rounded-lg bg-navy px-8 py-10 text-navy-foreground">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl tracking-tight">
          Unlock the power of artificial intelligence for your business
        </h3>
        <p className="text-muted-foreground">
          The benefits our GenAI and LLM solutions can bring to various
          businesses are endless. Let us know if there are other problems we can
          help.
        </p>
      </div>
      <div>
        {/* <LeadForm
          source={discoveryCallBookingSource.bookingUrl}
          id={discoveryCallBookingSource.bookingId}
        >
        </LeadForm> */}
          <AnimatedArrowButton>Book Now</AnimatedArrowButton>
      </div>
    </div>
  );
}
