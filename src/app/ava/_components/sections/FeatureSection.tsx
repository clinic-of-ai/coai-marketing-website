import { TitleBlock } from "@/components/common/title-block";
import { FeatureCard } from "../cards/FeatureCard";

const items = [
  {
    label: "24/7 Support",
    description:
      "Never miss a booking or reservation. AVA operates around the clock, ensuring no opportunity is lost.",
  },
  {
    label: "Multilingual Capabilities", 
    description:
      "Communicate effortlessly with guests in multiple languages, breaking down language barriers.",
  },
  {
    label: "Automated Operations",
    description:
      "Streamline check-ins, reservations, and customer service tasks with intelligent automation.",
  },
  {
    label: "System Integration",
    description:
      "Seamlessly integrate with your existing systems (PMS, CRM, POS) for unified operations.",
  },
  {
    label: "Smart Recommendations",
    description:
      "Offer tailored suggestions for rooms, dining options, and local activities based on guest preferences.",
  },
  {
    label: "Guest Memory",
    description:
      "Remember returning guests and their preferences to provide consistent, personalized service.",
  },
  {
    label: "Revenue Optimization",
    description:
      "Increase bookings with 24/7 availability and intelligent pricing strategies.",
  },
  {
    label: "Upselling Intelligence",
    description:
      "Strategically promote services and amenities to improve guest satisfaction and boost revenue.",
  },
];

export function FeatureSection() {
  return (
    <section className="bg-secondary">
      <div className="container">
        <div className="h-auto">
          <div className="py-[72px]">
            <TitleBlock
              title="From Hoteliers to Hoteliers."
              heading="Why choose AVA?"
              size="lg"
              classNames={{
                container: "mx-auto max-w-[740px]",
              }}
            />
            <p className="mx-auto max-w-[565px] text-center text-secondary-foreground">


              Discover how AVA can transform your hospitality or dining business
              with AI-powered efficiency, 24/7 customer service, and streamlined
              operations.

            </p>
          </div>

          <div className="pb-[72px]">
            <div className="grid grid-cols-1 md:grid-cols-2 border-y border-black/40 xl:grid-cols-4">
              {items.map((item, index) => (
                <div key={index} className="border border-black/20">
                  <FeatureCard key={index} content={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
