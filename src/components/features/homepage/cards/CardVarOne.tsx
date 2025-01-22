import Image from "next/image";
import { IntroTitle } from "@/components/IntroTitle";

type CardVarOneProps = {
  content: {
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
  };
};

export function CardVarOne({ content }: CardVarOneProps) {
  const { title, subtitle, description, imageSrc } = content;
  return (
    <div className="flex h-full w-full flex-col-reverse justify-between gap-y-10 rounded-lg bg-[#DC8100] p-6 text-white md:flex-row md:gap-y-0 lg:p-8">
      <div className="flex h-full max-w-[660px] flex-1 flex-col justify-between gap-y-10 md:gap-y-0 lg:pl-4">
        <IntroTitle
          heading={title}
          title={subtitle}
          align="left"
          size="lg"
          className="py-0"
        />

        <p className="font-sans leading-6 tracking-[-0.16px]">{description}</p>
      </div>

      <div className="relative mr-6 h-[240px] w-[240px] md:h-[290px] md:w-[290px]">
        <Image
          src={imageSrc ?? ""}
          alt=""
          fill
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}
