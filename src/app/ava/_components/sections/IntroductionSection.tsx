import { TitleBlock } from "@/components/common/title-block";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export function IntroductionSection() {
  return (
    <section className="py-[72px]">
      <div className="container grid grid-cols-1 grid-rows-1 gap-y-[56px]">
        <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-center lg:justify-between">
          <TitleBlock
            align="left"
            title="Hoteliers for Hoteliers"
            heading="AVA is an intelligent virtual assistant specifically designed for the hospitality industry."
            size="lg"
            classNames={{
              container: "max-w-[740px]"
            }}
          />
          <p className="leading-6 tracking-[-0.16px] text-black/50 lg:max-w-[432px]">
            In the dynamic world of hospitality, delivering exceptional guest
            experiences while managing daily operations can be challenging.
            Introducing AVA, your AI-powered virtual assistant designed to
            streamline your business, enhance guest satisfaction, and boost
            efficiency around the clock.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[12px]">
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="top-in-bottom-out"
            videosrc={
              "https://res.cloudinary.com/dd4yjjtql/video/upload/v1733327833/Transform_Your_Hospitality_with_Ava_ocmstb.mp4"
            }
            thumbnailSrc="/image/thumbnail/businessman-provides-information-front-desk-department-in-hotel-check-procedure-travelling-work-purposes-attend-official-conference-receptionist-greeting-professional-client-lobby-1024x683.webp"
            thumbnailAlt=""
          />
        </div>
      </div>
    </section>
  );
}
