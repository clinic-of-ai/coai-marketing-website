import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedArrowButton } from "../AnimatedArrowButton";
import { cn } from "@/libs/utils";

export interface ExpandableCardProps {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  bulletPoints?: string[];
  bgColor: string;
  textColor: string;
  buttonColor: string;
  arrowBgColor: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ExpandableCard({
  id,
  title,
  description,
  buttonText,
  bulletPoints,
  bgColor,
  textColor,
  buttonColor,
  arrowBgColor,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: ExpandableCardProps) {
  return (
    <motion.div
      className={`group rounded-[20px] p-6 ${bgColor} ${textColor} border border-gray-200 hover:border-0 transition-all duration-300 ease-out flex h-[480px] flex-col justify-between overflow-hidden`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      animate={{
        flex: isHovered ? 2 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <div className="mb-4 flex items-start justify-between">
          <motion.h2
            className="font-semibold tracking-tight"
            animate={{
              fontSize: isHovered ? "2rem" : "1.2rem",
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h2>
          <div className={`rounded-full p-5 ${arrowBgColor}`}>
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>

        <div className="space-y-2">
        <p className="mb-12 text-sm leading-6 tracking-tight">{description}</p>
        <motion.div
          className="overflow-hidden text-sm"
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {bulletPoints && (
            <ul className="mb-4 list-none space-y-2">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div
                    className={cn(
                      "mr-2 w-fit rounded-full p-[3px] text-white",
                      buttonColor,
                    )}
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
        </div>
        
      </div>
      <AnimatedArrowButton
        className={`${buttonColor} w-fit text-xs font-semibold text-white`}
      >
        {buttonText}
      </AnimatedArrowButton>
    </motion.div>
  );
}
