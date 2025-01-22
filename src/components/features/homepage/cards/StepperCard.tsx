"use client";
import { useStepper } from "../../../../hooks/useStepper";
import { cn } from "../../../../libs/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface StepContent {
  mainTitle: string;
  mainDescription: string;
  subTitle: string;
  subDescription: string;
  mediaComponent: ({ show }: { show: boolean }) => JSX.Element;
  action: () => JSX.Element;
}

interface StepperCardProps {
  content: StepContent[];
}

export function StepperCard({ content }: StepperCardProps) {
  const { currentValue, currentCount, isRunning, toggleRunning, stepTo } = useStepper({
    values: content,
    countInterval: 10,
    options: {
      countDelay: 500,
      countDirection: "down",
      indexDirection: "ascend",
    },
  });

  const {
    mainTitle,
    mainDescription,
    subTitle,
    subDescription,
    mediaComponent: MediaComponent,
    action,
  } = currentValue;

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [currentValue]);

  return (
    <div className="bg-inverse text-inverse-foreground container flex w-full flex-col overflow-hidden rounded-[20px] p-0 lg:flex-row">
      <div className="flex-1 space-y-16 px-8 py-12 md:p-16">
        <div className="space-y-3">
          {content.map((value, index) => (
            <div className="flex gap-x-6 cursor-pointer" key={index} onClick={() => stepTo(index)}>
              <span
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-500 ease-in-out",
                  value.mainTitle === mainTitle
                    ? "bg-primary text-primary-foreground"
                    : "bg-inverse-foreground/15 text-inverse-foreground/30",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "max-w-[430px] text-sm tracking-tight transition-all duration-500 ease-in-out",
                  value.mainTitle === mainTitle
                    ? "text-inverse-foreground"
                    : "text-inverse-foreground/50",
                )}
              >
                {value.subTitle}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="w-full border-t border-inverse-foreground/15"></div> */}
        <div className="flex max-w-[720px] flex-col gap-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-y-6"
            >
              <h1 className="text-3xl font-semibold tracking-tighter">
                {mainTitle}
              </h1>
              <p className="text-inverse-foreground/50 text-md">
                {mainDescription}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="py-6">{action()}</div>
        </div>
      </div>
      <div className="relative h-[300px] w-full lg:h-auto lg:w-[540px]">
        {content.map((item, index) => (
          <MediaComponent key={index} show={item.mainTitle === mainTitle} />
        ))}
      </div>
    </div>
  );
}
