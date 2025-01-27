import { IntroTitle } from "@/components/IntroTitle";
import { Badge } from "@/components/ui/badge";

interface Benefit {
  title: string;
}

interface BenefitsProps {
  content: {
    title: string;
    heading: string;
    paragraph: string;
    benefits: Benefit[];
  };
}

interface BenefitCardProps {
  title: string;
}

function BenefitCard({ title }: BenefitCardProps) {
  return (
    <div className="flex aspect-[1.2/1.5] items-end rounded-xl border border-border p-8">
      <div>{/* // TODO: Place animated lotties here... */}</div>
      <div className="space-y-4">
        <Badge variant="secondary">Automation</Badge>
        <h2 className="text-xl tracking-tighter">{title}</h2>
      </div>
    </div>
  );
}

export function Benefits({ content }: BenefitsProps) {
  const { title, heading, paragraph, benefits } = content;

  return (
    <div className="container py-12">
      <IntroTitle heading={title} title={heading} />
      <p className="mx-auto mb-20 max-w-3xl text-center text-muted-foreground">
        {paragraph}
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} title={benefit.title} />
        ))}
      </div>
    </div>
  );
}
