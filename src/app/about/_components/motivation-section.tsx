import { HoveringQuoteMark } from "@/components/ui/hovering-quote-mark";

interface MotivationSectionProps {
  heading: string;
  paragraph: string;
}

export function MotivationSection(props: MotivationSectionProps) {
  return (
    <div className="container px-6">
      <div className="rounded-2xl bg-inverse pb-24 pt-28 text-center text-inverse-foreground md:px-10 lg:mx-auto">
        <div className="mx-auto flex gap-3 lg:flex-row">
          <HoveringQuoteMark />
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {props.heading}
            </h2>

            <p className="mx-auto max-w-3xl text-base">{props.paragraph}</p>
          </div>
          <HoveringQuoteMark />
        </div>
      </div>
    </div>
  );
}
