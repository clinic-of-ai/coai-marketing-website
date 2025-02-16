import { TitleBlock } from "@/components/common/title-block";
import { FeatureCard } from "../cards/FeatureCard";

interface FeatureSectionProps {
  title: string;
  heading: string;
  description: string;
  items: Array<{
    label: string;
    description: string;
  }>;
}

export function FeatureSection(props: FeatureSectionProps) {
  return (
    <section className="bg-secondary">
      <div className="container">
        <div className="h-auto">
          <div className="py-[72px]">
            <TitleBlock
              title={props.title}
              heading={props.heading}
              size="lg"
              classNames={{
                container: "mx-auto max-w-[740px]",
              }}
            />
            <p className="mx-auto max-w-[565px] text-center text-secondary-foreground">
              {props.description}
            </p>
          </div>

          <div className="pb-[72px]">
            <div className="grid grid-cols-1 md:grid-cols-2 border-y border-black/40 xl:grid-cols-4">
              {props.items.map((item, index) => (
                <div key={index} className="border border-black/20">
                  <FeatureCard content={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
