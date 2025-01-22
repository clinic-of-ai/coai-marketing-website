"use client";

import { ReactNode, useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { useMotionValue, animate, motion } from "framer-motion";

const FAST_DURATION = 25;
const SLOW_DURATION = 75;

interface InfiniteLoopCarouselProps {
  children: ReactNode;
  fastDuration?: number;
  slowDuration?: number;
}

export function InfiniteLoopCarousel({
  children,
  fastDuration = FAST_DURATION,
  slowDuration = SLOW_DURATION,
}: InfiniteLoopCarouselProps) {
  let [ref, { width }] = useMeasure();
  let [duration, setDuration] = useState(fastDuration);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, xTranslation, duration, rerender]);

  return (
    <motion.div
      className="flex gap-x-2 items-center w-full"
      ref={ref}
      style={{ x: xTranslation }}
      onHoverStart={() => {
        setMustFinish(true);
        setDuration(slowDuration);
      }}
      onHoverEnd={() => {
        setMustFinish(true);
        setDuration(fastDuration);
      }}
    >
      {children}
    </motion.div>
  );
}
