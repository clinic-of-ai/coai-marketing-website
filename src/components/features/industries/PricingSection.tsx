import {
  type PricingPlanCardProps,
  PricingPlanCard,
} from "@/components/Card/PricingPlanCard";
import { SectionHeader } from "@/components/SectionHeader";

export function PricingSection({ content }: { content: PricingPlanCardProps[]}) {
  return (
    <section className="w-full py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container">
        <SectionHeader
          subtitle="Pricing"
          title="Simple, Transparent Pricing"
          description="Choose the plan that's right for you. All plans come with a 30-day money-back guarantee."
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.map((plan) => (
            <PricingPlanCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
