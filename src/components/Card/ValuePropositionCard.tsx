import Image from "next/image";

type BgColor = "light" | "blue" | "dark";
type Variant = "default" | "minimal";

export interface ValuePropositionCardProps {
  variant: Variant;
  title: string;
  subtitle?: string;
  description: string;
  bgColor: BgColor;
  diagram: React.ReactNode;
  imageSrc?: string;
}

export function ValuePropositionCard(props: ValuePropositionCardProps) {
  const {
    variant = "default",
    bgColor = "light",
    title,
    subtitle,
    description,
    diagram,
    imageSrc,
  } = props;

  return (
    <CardWrapper bgColor={bgColor}>
       <div
        className={`flex relative z-10 flex-col overflow-hidden gap-y-2 ${variant === "default" ? "" : "mb-32"} ${imageSrc ? "text-white" : ""}`}
      >
        <h2 className={`text-xs z-1010 font-medium uppercase tracking-widest ${imageSrc ? "text-white" : ""}`}>
          {title}
        </h2>
        {subtitle && variant === "default" && (
          <SubTitleText subtitle={subtitle} className={imageSrc ? "text-white" : ""} />
        )}
      </div>
      {diagram}
      <div className={`flex relative z-10 flex-col gap-y-4 ${imageSrc ? "text-white" : ""}`}>
        {variant === "minimal" && subtitle && (
          <SubTitleText subtitle={subtitle} className={imageSrc ? "text-white" : ""} />
        )}
        <p className={`text-sm ${imageSrc ? "text-white" : ""}`}>{description}</p>
      </div>
      {imageSrc && (
        <>
          <Image fill src={imageSrc} alt={""} className="object-cover" />
          <div className="absolute inset-0 bg-black opacity-50" />
        </>
      )}
    </CardWrapper>
  );
}

function SubTitleText({ subtitle, className }: { subtitle: string; className?: string }) {
  return <p className={`text-2xl tracking-tighter ${className || ''}`}>{subtitle}</p>;
}

interface CardWrapperProps {
  children: React.ReactNode;
  bgColor: BgColor;
  className?: string;
}

function CardWrapper({ children, bgColor = "light", className }: CardWrapperProps) {
  const getCardColor = () => {
    switch (bgColor) {
      case "blue":
        return "bg-primary text-slate-900";
      case "dark":
        return "bg-gray-900 text-white";
      default:
        return "bg-gray-100 text-slate-900";
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 ${getCardColor()} ${className || ''}`}>
      {children}
    </div>
  );
}
