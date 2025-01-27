import { IntroTitle } from "@/components/IntroTitle";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";

interface PricingCtaProps {
  content: {
    title: string;
    heading: string;
    description: string;
    buttonText: string;
  };
}

export function PricingCta({ content }: PricingCtaProps) {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl text-center">
        <IntroTitle
          heading={content.title}
          title={content.heading}
          size="lg"
        />

        <p className="mx-auto max-w-2xl text-muted-foreground">
          {content.description}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <AnimatedArrowButton>
            {content.buttonText}
          </AnimatedArrowButton>
        </div>
      </div>
    </div>
  );
}
