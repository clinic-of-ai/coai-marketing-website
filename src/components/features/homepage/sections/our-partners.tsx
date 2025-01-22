import { IntroTitle } from "@/components/IntroTitle";
import { LogoCarousel } from "@/components/LogoCarousel";

interface OurPartnersProps {
  content: {
    heading: string;
    title: string;
    paragraph: string;
    partners: string[];
  };
}

export function OurPartners({ content }: OurPartnersProps) {
  return (
    <section className="space-y-10 bg-background py-14 font-sans">
      <div className="container mx-auto max-w-[680px] space-y-8 px-6">
        <IntroTitle
          heading={content.title}
          title={content.heading}
          size="lg"
          className="pb-0"
        />
        <p className="mx-auto max-w-[540px] text-center font-sans leading-6 tracking-[-0.16px] text-black/60">
          {content.paragraph}
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[1024px] overflow-hidden">
        <LogoCarousel logos={content.partners} />
      </div>
    </section>
  );
}
