import Image from "next/image";
import { Diamond } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScreenSize } from "@/hooks/useScreenSize";
import { discoveryCallBookingSource } from "@/app/config";
import { LeadForm } from "@/components/form/LeadForm";

export type SolutionContent = {
  heading: string;
  title: string;
  paragraph: string;
  imageSrc: string;
  color: string;
};

type SolutionCardProps = {
  content: SolutionContent;
  isHovered: boolean;
  onMouseEnter: () => void;
};

export function SolutionCard(props: SolutionCardProps) {
  const { content, isHovered, onMouseEnter } = props;
  const { paragraph, title, heading, imageSrc, color } = content;

  const isLargeScreen = useScreenSize();

  return (
    <motion.div
      className={`group flex flex-col gap-y-8 rounded-[8px] bg-white p-4 transition-all duration-300 ease-out lg:flex-row-reverse lg:justify-between`}
      onMouseEnter={onMouseEnter}
      animate={{
        flex: isHovered ? 2 : 1,
      }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    >
      <motion.div
        className="relative h-[302px] w-full overflow-hidden rounded-[8px] lg:h-[457px]"
        animate={{
          width: isLargeScreen ? (isHovered ? "320px" : "0px") : "100%",
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
      >
        <Image
          fill
          src={imageSrc ?? ""}
          alt=""
          className="object-cover object-left"
        />
      </motion.div>

      <div className="space-y-4 px-2 font-sans text-slate-950 lg:flex lg:flex-1 lg:flex-col lg:justify-between">
        <div className="space-y-6 lg:space-y-10">
          <div
            className="flex h-12 w-12 items-center justify-center rounded text-white"
            style={{ backgroundColor: color, opacity: 0.3 }}
          >
            <Diamond width={24} height={24} />
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-sm font-semibold uppercase text-black/40">
              {title}
            </h2>
            <p className="text-3xl leading-[40px] -tracking-[1.6px]">
              {heading}
            </p>
          </div>
        </div>

        <div className="space-y-14 pb-10 lg:space-y-6">
          <p className="text-sm leading-6">{paragraph}</p>
          <LeadForm
            source={discoveryCallBookingSource.bookingUrl}
            id={discoveryCallBookingSource.bookingId}
          >
            <Button className="rounded-full" style={{ backgroundColor: color }}>
              Learn More
            </Button>
          </LeadForm>
        </div>
      </div>
    </motion.div>
  );
}
