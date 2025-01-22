import { DEFAULT_HEADER_HEIGHT } from "@/app/config";
import { cn } from "@/libs/utils";
import { Globe } from "@/components/ui/globe";
import { AvatarCircles } from "@/components/ui/avatar-circles";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

export function HeroSection() {
  return (
    <div className="h-fit overflow-hidden bg-inverse text-inverse-foreground">
      {/* Used for spading purposes ONLY */}
      <div className={cn(DEFAULT_HEADER_HEIGHT)} />

      <div className="container flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 py-16 lg:pl-10">
          <AvatarCircles numPeople={99} avatarUrls={avatarUrls} />
          <h2 className="text-3xl font-semibold tracking-tight">
            Your Personal AI R&D team keeping your value chain updated with the
            latest technologies.
          </h2>
          <p className="leading-6 text-inverse-foreground/60 md:text-">
            {"Don't"} miss out on the biggest development since intelligent life
            first appeared on this planet. At Clinic of AI, we believe in
            developing solutions to real-life problems for everyone.
          </p>
        </div>
        <div className="relative hidden h-[400px] flex-1 lg:block">
          <Globe className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
}
