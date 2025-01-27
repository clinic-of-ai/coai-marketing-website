import Image from "next/image";
import { IntroTitle } from "@/components/IntroTitle";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";

interface HeroProps {
  content: {
    heading: string;
    title: string;
    paragraph: string;
    imageSrc: string;
  };
}

export function Hero({ content }: HeroProps) {
  const { heading, title, paragraph, imageSrc } = content;

  return (
    <section className="pt-20">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-center py-16 text-center">
        <IntroTitle
          heading={title}
          title={heading}
          size="lg"
          className="max-w-2xl"
        />
        <p className="mb-10 max-w-2xl text-muted-foreground">{paragraph}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <AnimatedArrowButton variant="outline">
            Learn More
          </AnimatedArrowButton>
          <AnimatedArrowButton variant="default">
            Book a Call
          </AnimatedArrowButton>
        </div>
        <div className="relative mt-20 h-[500px] w-full md:h-[700px]">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="rounded-xl bg-gray-100 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
