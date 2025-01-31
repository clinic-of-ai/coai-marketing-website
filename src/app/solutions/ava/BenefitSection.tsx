import { BenefitCard } from "@/components/Card/BenefitCard";
import { SectionHeader } from "@/components/common/section-header";

const content = [
  {
    tag: "Personalized messaging",
    description:
      "Your hotel guests receive instant, personalized attention at any hour.",
    thumbnail:
      "https://images.pexels.com/photos/6787357/pexels-photo-6787357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    tag: "Timely Communication",
    description:
      "Your restaurant never misses a booking call, even during the busiest rush",
    thumbnail:
      "https://images.pexels.com/photos/4468250/pexels-photo-4468250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    tag: "Internationalization",
    description:
      "Language barriers disappear, welcoming global travelers and diners",
    thumbnail:
      "https://images.pexels.com/photos/6281880/pexels-photo-6281880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    tag: "Routing Automation",
    description:
      "Routine tasks are automated, freeing your staff to create memorable experiences",
    thumbnail:
      "https://images.pexels.com/photos/8204405/pexels-photo-8204405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    tag: "Seamless operation",
    description:
      "Your business operates seamlessly, even when you're not there",
    thumbnail:
      "https://images.pexels.com/photos/6787357/pexels-photo-6787357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];
 
export function BenefitSection() {
  return (
    <section>
      <div className="space-y-20 py-20 container">
        <div className="">
          <SectionHeader
            subtitle="Benefits"
            title="This reality can become yours."
            description="Discover how AVA can transform your hospitality or dining business with AI-powered efficiency, 24/7 customer service, and streamlined operations. Experience increased revenue, reduced costs, and enhanced guest satisfaction."
          />
        </div>

        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {content.map((item) => (
            <BenefitCard key={item.tag} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
