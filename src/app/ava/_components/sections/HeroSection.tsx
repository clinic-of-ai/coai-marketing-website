import Image from "next/image";
import { TitleBlock } from "@/components/common/title-block";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";
import { BookingForm } from "@/components/common/booking-form";

interface HeroProps {
  title: string;
  heading: string;
  paragraph: string;
  image: string;
  cta: {
    label: string;
    formId: string;
    formUrl: string;
  };
}

export function HeroSection(props: HeroProps) {
  return (
    <section className="relative h-[740px] w-full bg-[#ccd7db]">
      <Image
        fill
        alt=""
        src={props.image}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/80">
        <div className="container mx-auto flex h-full flex-col items-center justify-center gap-8">
          <div className="">
            <TitleBlock
              title={props.title}
              heading={props.heading}
              size="lg"
              classNames={{
                container: "max-w-[740px] text-white",
                title: "text-white/60"
              }}
            />
            <p className="mx-auto max-w-[665px] text-center text-lg leading-7 text-white/70">
              {props.paragraph}
            </p>
          </div>
          <BookingForm
            iframeUrl={props.cta.formUrl}
            iframeId={props.cta.formId}
          >
            <AnimatedArrowButton>
              {props.cta.label}
            </AnimatedArrowButton>
          </BookingForm>
        </div>
      </div>
    </section>
  );
}
