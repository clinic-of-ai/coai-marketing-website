import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";

type HeroBackgroundImageCTAProps = {
  content: {
    tag: string;
    title: string;
    description: string;
    image: string;
    cta: {
      component?: React.JSX.Element;
      label?: string;
      href?: string;
    };
  };
};

export function HeroBackgroundImageCTA(props: HeroBackgroundImageCTAProps) {
  const {
    content: { cta, ...rest },
  } = props;

  return (
    <section className="relative h-[540px] overflow-hidden">
      <Image fill src={rest.image} alt="Background" className="object-cover" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-y-10">
        <SectionHeader
          className="text-white [&_p]:text-base"
          subtitle={rest.tag}
          title={rest.title}
          description={rest.description}
        />
        {cta.component ? (
          cta.component
        ) : (
          <Link href={cta.href || "#"} className="mx-auto">
            <AnimatedArrowButton className="w-fit">
              {cta.label}
            </AnimatedArrowButton>
          </Link>
        )}
      </div>
      <div className="absolute inset-0 z-0 bg-primary/50" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-black/55" aria-hidden="true" />
    </section>
  );
}
