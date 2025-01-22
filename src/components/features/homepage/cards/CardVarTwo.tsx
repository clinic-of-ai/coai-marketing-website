import { IntroTitle } from "@/components/IntroTitle";

export interface CardVarTwoProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export function CardVarTwo({ content }: CardVarTwoProps) {
  const { title, subtitle, description } = content;

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-20 rounded-lg bg-[#233171] p-8 text-white">
      <IntroTitle
        heading={title}
        title={subtitle}
        align="left"
        size="lg"
        className="max-w-[660px] py-0"
      />

      <p className="max-w-[660px] font-sans leading-6 tracking-[-0.16px]">
        {description}
      </p>
    </div>
  );
}
