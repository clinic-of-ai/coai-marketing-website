import { TitleBlock } from "@/components/common/title-block";

export interface CardVariantDProps {
  title: string;
  heading: string;
  description: string;
}

export function CardVariantD(props: CardVariantDProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between space-y-20 rounded-lg bg-[#233171] p-8 text-white">
      <TitleBlock
        {...props}
        align="left"
        size="lg"
        className="max-w-[660px] py-0"
      />

      <p className="max-w-[660px] font-sans leading-6 tracking-[-0.16px]">
        {props.description}
      </p>
    </div>
  );
}
