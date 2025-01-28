import Image from "next/image";
import { IntroTitle } from "@/components/IntroTitle";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";

interface PricingCtaProps {
  content: {
    imageSrc: string;
    title: string;
    heading: string;
    description: string;
    buttonText: string;
  };
}

export function PricingCta({ content }: PricingCtaProps) {
  return (
    <div className="relative flex min-h-[600px] flex-col items-center justify-center px-4 py-16 text-white">
      <div className="absolute inset-0 z-[1] bg-black/70" />{" "}
      {/* Dark overlay */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <IntroTitle heading={content.title} title={content.heading} size="lg" />

        <p className="mx-auto max-w-2xl">{content.description}</p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <AnimatedArrowButton>{content.buttonText}</AnimatedArrowButton>
        </div>
      </div>
      <Image
        fill
        src={content.imageSrc}
        alt=""
        className="inset-0 z-0 object-cover"
      />
    </div>
  );
}
