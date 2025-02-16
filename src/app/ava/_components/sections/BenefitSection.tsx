import { TitleBlock } from "@/components/common/title-block";
import { BenefitCard } from "../cards/BenefitCard";

interface BenefitSectionProps {
  title: string;
  heading: string;
  description: string;
  items: Array<{
    label: string;
    title: string;
    imgSrc: string;
  }>;
}

export function BenefitSection(props: BenefitSectionProps) {
  return (
    <section className="py-[72px]">
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[56px]">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          <TitleBlock
            align="left"
            title={props.title}
            heading={props.heading}
            size="lg"
            classNames={{
              container: "max-w-[740px]"
            }}
          />
          <p className="leading-6 tracking-[-0.16px] text-foreground lg:max-w-[432px]">
            {props.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
          {props.items.map((item, index) => (
            <BenefitCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
