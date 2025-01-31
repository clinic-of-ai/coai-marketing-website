import { cn } from "@/libs/utils";
import { VariantProps, cva } from "class-variance-authority";

const titleBlockVariants = cva(
  "flex w-full flex-col justify-center space-y-4 py-4",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      size: {
        sm: "p-text-2xl [&>p]:text-2xl [&>p]:leading-[36px] [&>p]:-tracking-[1.2px]",
        md: "p-text-3xl [&>p]:text-3xl [&>p]:leading-[42px] [&>p]:-tracking-[1.5px]",
        lg: "p-text-4xl [&>p]:text-4xl [&>p]:leading-[48px] [&>p]:-tracking-[1.8px]",
        xl: "p-text-5xl [&>p]:text-5xl [&>p]:leading-[56px] [&>p]:-tracking-[2px]",
      },
    },
    defaultVariants: {
      align: "center",
      size: "md",
    },
  },
);

interface TitleBlockProps {
  title: string;
  heading: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center" | "right";
  className?: string;
}

export function TitleBlock(props: TitleBlockProps) {
  const { title, heading, align, size, className } = props;
  return (
    <div className={cn(titleBlockVariants({ align, size }), className)}>
      <h2 className="font-mono text-base font-semibold uppercase text-primary">
        {title}
      </h2>
      <p className="font-sans">{heading}</p>
    </div>
  );
}
