import { IntroTitle } from "@/components/IntroTitle";
import { Separator } from "@/components/ui/separator";

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  heading: string;
  paragraph: string;
  iconBgColor: string;
  iconColor: string;
}

interface SolutionOverviewProps {
  content: {
    heading: string;
    title: string;
    paragraph: string;
    features: Feature[];
  };
}

export function SolutionOverview({ content }: SolutionOverviewProps) {
  const { heading, title, paragraph, features } = content;

  return (
    <>
      <div className="container mx-auto py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <IntroTitle
              heading={title}
              title={heading}
              size="md"
              align="left"
            />
            <p className="mt-8 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4">
                <div
                  className={`flex size-12 items-center justify-center rounded-md ${feature.iconBgColor}`}
                >
                  <div className={feature.iconColor}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold uppercase">
                  {feature.heading}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
