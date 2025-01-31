import { Iphone15Pro } from "@/components/ui/iphone-15-pro";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

export function HeroSection() {
  return (
    <section className="overflow-y-hidden bg-inverse">
      <div className="container relative flex flex-col items-center justify-center lg:flex-row">
        <div className="absolute h-full w-full">
          <div className="relative">
            <div className="ml-[10%] h-[1px] w-[1px] rounded-sm bg-transparent shadow-[0_0_250px_160px_rgba(98,139,205,0.65)]" />
            <div className="float-right ml-[10%] mr-[20%] mt-[20%] h-[1px] w-[1px] rounded-sm bg-transparent md:shadow-[0_0_250px_160px_rgba(98,139,205,0.65)]" />
          </div>
        </div>

        <div className="relative z-20 mx-auto max-w-[729px] space-y-12 pt-32 md:px-6 md:py-32 lg:my-auto lg:py-0">
          <div className="space-y-6">
            <h1 className="text-center text-4xl leading-[48px] tracking-[-2px] text-white lg:text-left">
              Elevate guest experience, boost efficiency, and grow your business
              24/7
            </h1>

            <p className="mx-auto max-w-[665px] text-center leading-6 text-[#a8b4c9] lg:text-left">
              Are you a hotel owner struggling with staffing shortages or a
              restaurant manager overwhelmed by reservation chaos? AVA is here
              to revolutionize your hospitality or dining business, providing
              unparalleled service and operational efficiency.
            </p>
          </div>
          <AnimatedArrowButton className="mx-auto w-fit lg:mx-0">
            Book a Demo
          </AnimatedArrowButton>
        </div>

        <div className="relative z-20 mx-auto h-[472px] w-full lg:mt-20">
          <Iphone15Pro className="w-full" src="/image/thumbnail/ava-call.png" />
        </div>
      </div>
    </section>
  );
}
