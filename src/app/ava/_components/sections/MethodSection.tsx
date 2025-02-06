import { TitleBlock } from "@/components/common/title-block";
import { MethodCard } from "../cards/MethodCard";
import { Button } from "@/components/ui/button";
import { Settings2, Brain, Timer, Bolt } from "lucide-react";
// import { LeadForm } from "@/components/common/lead-form";
// import { avaBookingSource } from "@/app/config";


const items = [
  {
    label: "Seamless Integration",
    description:
      "AVA works with your existing tools and systems, from hotel management software to restaurant POS systems.",
    icon: <Settings2 className="h-6 w-6 text-black" />,
    className: "bg-[#233171] text-white",
  },
  {
    label: "Continuous Learning",
    description:
      "AVA improves over time, adapting to your unique business needs and guest preferences.",
    icon: <Brain className="h-6 w-6" />,
    className: "bg-[#46DDF4] text-slate-950",
  },
  {
    label: "Real-Time Assistance",
    description:
      "Handle live inquiries instantly, from room service requests to last-minute table bookings.",
    icon: <Timer className="h-6 w-6" />,
    className: "bg-[#E0E8EB] text-slate-950",
  },
  {
    label: "Easy Setup",
    description:
      "No coding required. Customize AVA to match your brand voice and service standards.",
    icon: <Bolt className="h-6 w-6 text-black" />,
    className: "bg-[#DC8100] text-white",
  },
];

export function MethodSection() {
  return (
    <section className="pb-[72px]">
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[56px]">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          <TitleBlock
            align="left"
            title="How It Works"
            heading="Streamlined hotel management support"
            size="lg"
            classNames={{
              container: "max-w-[740px]"
            }}

          />
          {/* <LeadForm
            source={avaBookingSource.bookingUrl}
            id={avaBookingSource.bookingId}
          >
          
          </LeadForm> */}
          <Button className="w-fit rounded-full">Book a call</Button>
        </div>


        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ className, ...items }, index) => (
            <MethodCard
              key={index}
              className={className}
              content={{ ...items }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
