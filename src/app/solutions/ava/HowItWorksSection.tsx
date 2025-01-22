import { SectionHeader } from "@/components/SectionHeader";
import { FeatureSimpleCard } from "@/components/Card/FeatureSimpleCard";
import { Settings, Sliders, RefreshCw, Clock } from "lucide-react";

const features = [
  {
    title: "Easy Setup",
    description:
      "No coding required. Customize AVA to match your brand voice and service standards.",
    icon: <Settings />,
  },
  {
    title: "Seamless Integration",
    description:
      "AVA works with your existing tools and systems, from hotel management software to restaurant POS systems.",
    icon: <Sliders />,
  },
  {
    title: "Continuous Learning",
    description:
      "AVA improves over time, adapting to your unique business needs and guest preferences.",
    icon: <RefreshCw />,
  },
  {
    title: "Real-Time Assistance",
    description:
      "Handle live inquiries instantly, from room service requests to last-minute table bookings.",
    icon: <Clock />,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <SectionHeader
        subtitle="How It Works"
        title="Streamlined Hotel Management Support"
        description="AVA's user-friendly interface and powerful features make hotel management easy and efficient."
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureSimpleCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}
