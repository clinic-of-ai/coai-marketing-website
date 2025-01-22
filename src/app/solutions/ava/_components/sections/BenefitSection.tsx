import { IntroTitle } from "@/components/IntroTitle";
import { BenefitCard } from "../cards/BenefitCard";

const items = [
  {
    label: "Personalized messaging",
    title: "Your hotel guests receive instant, personalized attention at any hour.",
    imgSrc: "https://images.pexels.com/photos/6787357/pexels-photo-6787357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    label: "Timely Communication",
    title:  "Your restaurant never misses a booking call, even during the busiest rush",
    imgSrc: "https://images.pexels.com/photos/4468250/pexels-photo-4468250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    label: "Internationalization",
    title: "Language barriers disappear, welcoming global travelers and diners",
    imgSrc: "/image/people-looking-at-computer.jpg",
  },
  {
    label: "Routing Automation",
    title:  "Routine tasks are automated, freeing your staff to create memorable experiences",
    imgSrc: "https://images.pexels.com/photos/8204405/pexels-photo-8204405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  // {
  //   label: "Seamless operation",
  //   title:  "Your business operates seamlessly, even when you're not there",
  //   imgSrc:  "https://images.pexels.com/photos/6787357/pexels-photo-6787357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // },
];
 
export function BenefitSection() {
  return (
    <section className="py-[72px]">
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[56px]">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          <IntroTitle
            align="left"
            heading="Benefits"
            title="Experience increased revenue, reduced costs, and enhanced guest satisfaction."
            size="lg"
            className="max-w-[740px]"
          />
          <p className="leading-6 tracking-[-0.16px] text-black/50 lg:max-w-[432px]">
            Discover how AVA can transform your hospitality or dining business
            with AI-powered efficiency, 24/7 customer service, and streamlined
            operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <BenefitCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
