import { cn } from "@/libs/utils";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

interface HeroProps {
  content: {
    heading: string;
    paragraph: string;
  };
  action: React.JSX.Element;
}

export function Hero({ content, action }: HeroProps) {
  return (
    <section className="relative flex h-[640px] w-full items-center justify-center overflow-hidden rounded-lg border bg-inverse text-inverse-foreground">
      <div className="container">
        <div className="grid h-fit w-full gap-10 lg:grid-cols-2">
          <h1 className="max-w-[572px] text-[40px] leading-[48px] tracking-[-2px]">
            {content.heading}
          </h1>
          <div className="space-y-12">
            <p className="max-w-[554px] leading-6 tracking-[-0.16px] text-inverse-foreground">
              {content.paragraph}
            </p>
            {action}
          </div>
        </div>
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </section>
  );
}
