import { IntroTitle } from "@/components/IntroTitle";
import { Separator } from "@/components/ui/separator";
import { IconContainer } from "@/components/ui/icon-container";
import { PillBottle, Handshake, ShieldCheck, Calendar } from "lucide-react";

const iconProps = {
  strokeWidth: 1.5,
  className: "h-6 w-6",
};

const icons = [
  <PillBottle {...iconProps} key="pill-bottle" />,
  <Handshake {...iconProps} key="handshake" />,
  <ShieldCheck {...iconProps} key="shield-check" />,
  <Calendar {...iconProps} key="calendar" />,
];

interface ClientGainsProps {
  content: {
    title: string;
    heading: string;
    videoSrc: string;
    benefits: string[];
  };
}

export function ClientGains({ content }: ClientGainsProps) {
  return (
    <section className="bg-[#E0E8EB] py-14 font-sans space-y-6">
      <div className="container">
        <div className="flex w-full flex-col-reverse gap-4 lg:flex-row">
          <div className="pt-6 lg:my-auto lg:flex-1 lg:px-12">
            <IntroTitle
              heading={content.title}
              title={content.heading}
              size="lg"
              align="left"
            />
          </div>

          <div className="relative h-[380px] w-full rounded-lg bg-[#ccd7db] lg:h-[460px] lg:w-[460px] xl:w-[560px]">
            <video
              src={content.videoSrc}
              className="h-full w-full rounded-lg object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-wrap gap-x-6 gap-y-8 lg:pl-12">
          {content.benefits.map((benefit, index) => (
            <div key={benefit} className="flex items-center gap-x-4">
              <IconContainer icon={icons[index]} />
              <p className="whitespace-nowrap text-base leading-6 tracking-[-0.16px] text-black/60">
                {benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
