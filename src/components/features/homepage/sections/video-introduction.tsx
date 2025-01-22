import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

interface HeroProps {
  content: {
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt: string;
  };
}

export function VideoIntroduction({ content }: HeroProps) {
  return (
    <div className="container relative py-16 md:py-10 lg:max-w-5xl">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="top-in-bottom-out"
        {...content}
      />
    </div>
  );
}
