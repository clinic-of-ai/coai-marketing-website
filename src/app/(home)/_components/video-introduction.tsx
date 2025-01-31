import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface VideoIntroductionProps {
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
}

export function VideoIntroduction(props: VideoIntroductionProps) {
  return (
    <div className="container relative py-16 md:py-10 lg:max-w-5xl">
      <HeroVideoDialog
        {...props}
        className="block aspect-video"
        animationStyle="top-in-bottom-out"
      />
    </div>
  );
}
