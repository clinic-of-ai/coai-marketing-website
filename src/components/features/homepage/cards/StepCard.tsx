"use client";

import { useState, useEffect } from "react";
import { cn } from "@/libs/utils";
import { useStepper } from "@/hooks/useStepper";
import { motion, AnimatePresence } from "framer-motion";

interface StepCardProps {
  content: {
    title: string;
    heading: string;
    paragraph: string;
    media: {
      src: string;
      alt: string;
    };
  }[];
  action: () => JSX.Element;
}

export function StepCard({ content, action }: StepCardProps) {
  const { currentValue, currentCount, isRunning, toggleRunning, stepTo } =
    useStepper({
      values: content,
      countInterval: 10,
      options: {
        countDelay: 500,
        countDirection: "down",
        indexDirection: "ascend",
      },
    });

  const { title, heading, paragraph } = currentValue;

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [currentValue]);

  return (
    <div className="container flex w-full flex-col overflow-hidden rounded-[12px] bg-[#233171] p-0 text-white lg:flex-row">
      <div className="flex-1 space-y-16 px-8 py-12 md:p-16">
        <div className="space-y-3">
          {content.map((value, index) => (
            <div
              className="flex cursor-pointer gap-x-6"
              key={index}
              onClick={() => stepTo(index)}
            >
              <span
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-500 ease-in-out",
                  value.title === title
                    ? "bg-white text-slate-950"
                    : "bg-white/20 text-white/40",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "max-w-[430px] font-mono text-sm uppercase transition-all duration-500 ease-in-out",
                  value.title === title ? "text-white" : "text-white/40",
                )}
              >
                {value.title}
              </p>
            </div>
          ))}
        </div>
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
              <h1 className="text-3xl leading-[40px] tracking-tighter">
                {heading}
              </h1>
              <p className="text-inverse-foreground/60">{paragraph}</p>
              <div>{action()}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="relative h-[300px] w-full lg:h-auto lg:w-[540px]">
        {content.map((item, index) => (
          <div
            key={index}
            className={cn(
              "absolute left-0 top-0 h-full w-full",
              item.title === title ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
          >
            <video
              src={item.media.src}
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        ))}
      </div>
    </div>
  );
}
