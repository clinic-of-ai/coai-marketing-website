import { DEFAULT_HEADER_HEIGHT } from "@/app/config";
import { cn } from "@/libs/utils";
import { Globe } from "@/components/ui/globe";
import { AvatarCircles } from "@/components/ui/avatar-circles";

interface HeroSectionProps {
  avatarUrls: string[];
  heading: string;
  paragraph: string;
}

export function HeroSection(props: HeroSectionProps) {
  return (
    <div className="h-fit overflow-hidden bg-inverse text-inverse-foreground">
      {/* // TODO: Change this spacing approach to use a more semantic solution */}
      <div className={cn(DEFAULT_HEADER_HEIGHT)} />

      <div className="container flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 py-16 lg:pl-10">
          <AvatarCircles numPeople={99} avatarUrls={props.avatarUrls} />
          <h2 className="text-3xl font-semibold tracking-tight">
            {props.heading}
          </h2>
          <p className="md:text- leading-6 text-inverse-foreground/60">
            {props.paragraph}
          </p>
        </div>
        <div className="relative hidden h-[400px] flex-1 lg:block">
          <Globe className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
