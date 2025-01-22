import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

type FeatureHighlightSectionProps = {
  content: {
    tagline: string;
    title: string;
    description: string;
    image: string;
  };
};

export function FeatureHighlightSection({
  content,
}: FeatureHighlightSectionProps) {
  return (
    <section className="py-12 md:py-24">
      <div className="container flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="w-full md:w-1/2">
          <Image
            src={content.image}
            alt=""
            width={400}
            height={400}
            className="h-auto w-full rounded-[20px] object-cover"
          />
        </div>
        <div className="w-full space-y-4 md:w-1/2">
          <SectionHeader
            className="lg:mt-8"
            subtitle={content.tagline}
            title={content.tagline}
            description={content.description}
            align="left"
          />
        </div>
      </div>
    </section>
  );
}
