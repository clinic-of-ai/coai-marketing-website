import { TitleBlock } from "@/components/common/title-block";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface IntroductionProps {
  title: string;
  heading: string;
  paragraph: string;
  video: {
    src: string;
    thumbnail: string;
    alt: string;
  };
}

export function IntroductionSection(props: IntroductionProps) {
  return (
    <section className="py-[72px]">
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[56px]">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          <TitleBlock
            align="left"
            title={props.title}
            heading={props.heading}
            size="lg"
            classNames={{
              container: "max-w-[740px]"
            }}
          />
          <p className="leading-6 tracking-[-0.16px] text-foreground lg:max-w-[432px]">
            {props.paragraph}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[12px]">
          <HeroVideoDialog
            className="block"
            animationStyle="top-in-bottom-out"
            videosrc={props.video.src}
            thumbnailSrc={props.video.thumbnail}
            thumbnailAlt={props.video.alt}
          />
        </div>
      </div>
    </section>
  );
}
