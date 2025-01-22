import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

interface SolutionStepsProps {
  content: {
    title: string;
    description: string;
    image: string;
    steps: {
      title: string;
      description: string;
    }[];
  };
}

export function SolutionSteps({ content }: SolutionStepsProps) {
  return (
    <section className="bg-inverse py-20 text-inverse-foreground">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="relative flex h-full flex-col space-y-10">
            <div className="flex flex-col space-y-4">
              <SectionHeader
                align="left"
                subtitle={content.title}
                title={content.description}
              />
            </div>
            <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-slate-600">
              <Image fill className="object-cover" src={content.image} alt="" />
            </div>
          </div>

          <div className="">
            {content.steps.map((step, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr] grid-rows-1 gap-x-6"
              >
                <div className="h-full">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <span className="text-sm font-bold text-inverse">
                      {index + 1}
                    </span>
                  </div>
                  {index < content.steps.length - 1 && (
                    // line
                    <div className="mx-auto h-full w-0.5 bg-primary" />
                  )}
                </div>
                <div className="space-y-2 pb-8">
                  <h4 className="text-lg font-bold">{step.title}</h4>
                  <p className="text-sm text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
