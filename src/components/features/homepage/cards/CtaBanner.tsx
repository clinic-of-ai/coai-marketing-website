import { IntroTitle } from "@/components/IntroTitle";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import { discoveryCallBookingSource } from "@/app/config";
import { LeadForm } from "@/components/form/LeadForm";

interface CtaBannerProps {
  content: {
    title: string;
    heading: string;
    buttonText: string;
    videoSrc: string;
    href: string;
  };
}

export function CtaBanner({ content }: CtaBannerProps) {
  return (
    <section className="relative h-[400px] w-full bg-[#ccd7db] lg:h-[640px]">
      <video
        src={content.videoSrc}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/70">
        <div className="container mx-auto flex h-full flex-col items-center justify-center gap-8">
          <IntroTitle
            heading={content.title}
            title={content.heading}
            size="lg"
            className="max-w-[740px] text-white [&>h2]:text-white/60"
          />
          <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
            <AnimatedArrowButton className="w-fit rounded-full">
              {content.buttonText}
            </AnimatedArrowButton>
          </LeadForm>
        </div>
      </div>
    </section>
  );
}
