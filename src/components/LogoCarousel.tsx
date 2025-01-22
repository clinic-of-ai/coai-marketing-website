"use client";
import Image from "next/image";
import { useEffect, useCallback } from "react";
import useMeasure from "react-use-measure";
import { useMotionValue, animate, motion } from "framer-motion";

export const LogoCarousel = ({ logos }: { logos: string[] }) => {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  const startAnimation = useCallback(() => {
    const finalPosition = -width / 2 - 8;
    return animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 70,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
  }, [width, xTranslation]);

  useEffect(() => {
    const controls = startAnimation();
    return () => controls.stop();
  }, [startAnimation]);

  return (
    <motion.div
      className="flex w-full items-center gap-x-2 py-6"
      ref={ref}
      style={{
        x: xTranslation,
        width: "max-content",
      }}
    >
      {[...logos, ...logos].map((logo, index) => (
        <div className="relative h-14 w-[162px]" key={`${logo}-${index}`}>
          <Image
            fill
            src={logo}
            alt="Partner logo"
            className="object-contain"
          />
        </div>
      ))}
    </motion.div>
  );
};
