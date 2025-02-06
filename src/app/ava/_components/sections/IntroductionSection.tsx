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
          <p className="leading-6 tracking-[-0.16px] text-foreground lg:max-w-[432px]">
            In the dynamic world of hospitality, delivering exceptional guest
            experiences while managing daily operations can be challenging.
            Introducing AVA, your AI-powered virtual assistant designed to
            streamline your business, enhance guest satisfaction, and boost
            efficiency around the clock.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[12px]">
          <HeroVideoDialog
            className="block"
            animationStyle="top-in-bottom-out"
            videosrc={
              "https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/678a891b671b4d807ced0b35.mp44"
            }
            thumbnailSrc="https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/6790d9cd427b592eaf748291.webp"
            thumbnailAlt=""
          />
        </div>
      </div>
    </section>
  );
}
