import Image from "next/image";
import Link from "next/link";
import { cn } from "@/libs/utils";
import { AnimatedArrowButton } from "../AnimatedArrowButton";

interface SolutionNavCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
  variant?: 'inline' | 'compact' | 'default';
}

export function SolutionNavCard2(props: SolutionNavCardProps) {
  const { title, image, href, className, variant = 'default' } = props;

  const cardContent = (
    <>
      <Image
        src={image}
        alt={title}
        width={variant === 'inline' ? 50 : 100}
        height={variant === 'inline' ? 50 : 100}
        className="rounded-lg object-cover"
      />
      <div>
        <h3 className={cn("font-bold", {
          'text-xs': variant === 'inline',
          'text-sm': variant === 'compact',
          'text-base': variant === 'default'
        })}>{title}</h3>
      </div>
    </>
  );

  return (
    <Link
      href={href}
      className={cn(
        "flex items-start rounded-lg p-2 no-underline transition-all duration-200 ease-in-out hover:scale-105 hover:bg-accent",
        {
          'space-x-2': variant === 'inline',
          'space-x-3': variant === 'compact',
          'space-x-4': variant === 'default',
        },
        className
      )}
    >
      {cardContent}
    </Link>
  );
}

export function SolutionNavCard(props: SolutionNavCardProps) {
  const { title, image, href, className, variant = 'default' } = props;

  return (
    <div className={cn(
      "group flex rounded-xl bg-slate-800 text-inverse-foreground",
      {
        'flex-row items-center p-2 space-x-2': variant === 'inline',
        'flex-col p-3 gap-y-3': variant === 'compact',
        'flex-col p-4 gap-y-6': variant === 'default',
      },
      className
    )}>
      <div className={cn(
        "relative overflow-hidden rounded-xl bg-gray-300",
        {
          'h-12 w-12': variant === 'inline',
          'h-[150px] w-full': variant === 'compact',
          'h-[220px] w-full': variant === 'default',
        }
      )}>
        <Image fill src={image} alt={title} className="rounded-lg object-cover" />
      </div>

      <div className="flex flex-col justify-end gap-y-2">
        <h3 className={cn("font-bold tracking-tight", {
          'text-sm': variant === 'inline',
          'text-base': variant === 'compact',
          'text-lg': variant === 'default',
        })}>{title}</h3>
        {variant !== 'inline' && (
          <Link href={href || '#'}>
            <AnimatedArrowButton size="sm" variant="secondary" className="w-fit">
              <span className="text-xs">Learn More</span>
            </AnimatedArrowButton>
          </Link>
        )}
      </div>
    </div>
  );
}
