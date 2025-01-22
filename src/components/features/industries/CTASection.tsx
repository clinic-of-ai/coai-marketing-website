import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";
import { SectionHeader } from "@/components/SectionHeader";

export function CTASection() {
  return (
    <section className="bg-primary px-4 py-16 text-primary-foreground md:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <SectionHeader
          subtitle="Take the Next Step"
          title="Ready to Transform Your Business?"
          description="Schedule a personalized demo to see how our AI solutions can address your specific business challenges."
          className="text-black [&_p]:text-base"
        />
        <AnimatedArrowButton className="mx-auto mt-8 w-fit" variant="secondary">
          Book a Demo
        </AnimatedArrowButton>
      </div>
    </section>
  );
}
