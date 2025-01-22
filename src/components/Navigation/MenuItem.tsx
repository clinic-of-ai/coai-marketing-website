import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MenuItemProps {
  index: number;
  children: React.ReactNode;
  itemsLength: number;
}

export function MenuItem(props: MenuItemProps) {
  const { index, children, itemsLength, ...rest } = props;

  const itemVariants = useMemo(
    () => ({
      hidden: { x: -20, opacity: 0 },
      visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: 0.5 + i * 0.1, duration: 0.3 },
      }),
      exit: (i: number) => ({
        x: 20,
        opacity: 0,
        transition: { delay: (itemsLength - 1 - i) * 0.1, duration: 0.3 },
      }),
    }),
    [itemsLength],
  );

  return (
    <motion.div
      className="group flex w-full items-center justify-between border-b border-inverse-foreground/20 py-3 last:border-0"
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={itemVariants}
    >
      <span
        {...rest}
        className="text-2xl tracking-tight text-inverse-foreground/60 transition-all duration-300 ease-in-out group-hover:font-medium group-hover:text-inverse-foreground"
      >
        {children}
      </span>
      <ArrowRight className="size-6 text-inverse-foreground/60 transition-all group-hover:translate-x-2 group-hover:text-foreground" />
    </motion.div>
  );
}
