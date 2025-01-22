import { cn } from "@/libs/utils";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  className,
  subtitle,
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn("space-y-6", alignmentClasses[align], className)}>
      {subtitle && (
        <h1 className="text-xs font-bold uppercase tracking-widest text-primary">
          {subtitle}
        </h1>
      )}
      <h2 className={cn(
        "text-3xl font-bold tracking-tighter md:text-4xl max-w-[704px] text-inherit",
        align === 'center' && "mx-auto"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-sm tracking-tight text-inherit/50 max-w-[604px]",
          align === 'center' && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
