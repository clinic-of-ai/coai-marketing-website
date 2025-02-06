import Image from "next/image";
import { TitleBlock } from "@/components/common/title-block";
// import { LeadForm } from "@/components/common/lead-form";
// import { avaBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

export function HeroSection() {
  return (
    <section className="relative h-[740px] w-full bg-[#ccd7db]">
      <Image
        fill
        alt=""
        src="https://storage.googleapis.com/msgsndr/SRTw3xlSbwAV7iycIh1t/media/67a531244325e175f15172af.jpeg"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/80">
        <div className="container mx-auto flex h-full flex-col items-center justify-center gap-8">
          <div className="">
            <TitleBlock
              title="From hoteliers to hoteliers"
              heading="Transform hospitality operations with AVA and See how AI can elevate your service today."
              size="lg"
              classNames={{
                container: "max-w-[740px] text-white",
                title: "text-white/60"
              }}
            />

            <p className="mx-auto max-w-[665px] text-center text-lg leading-7 text-white/70">
              Let us show you how our Personalized Voice Agent can Simplify
              Hospitality Operations. Delight Your Guests with AVA, Your 24/7 AI
              Concierge, using the most advanced voice technology.
            </p>
          </div>
          {/* <LeadForm
            source={avaBookingSource.bookingUrl}
            id={avaBookingSource.bookingId}
          >
          </LeadForm> */}
            <AnimatedArrowButton variant="secondary">
              Book a Call
            </AnimatedArrowButton>
        </div>
      </div>
    </section>
  );
}
