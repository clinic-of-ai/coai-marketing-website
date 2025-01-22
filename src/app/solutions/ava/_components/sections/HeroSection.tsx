import Image from "next/image";
import { IntroTitle } from "@/components/IntroTitle";
import { LeadForm } from "@/components/form/LeadForm";
import { avaBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/AnimatedArrowButton";

export function HeroSection() {
  return (
    <section className="relative h-[740px] w-full bg-[#ccd7db]">
      <Image
        fill
        alt=""
        src="/image/thumbnail/banner-image.png"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/80">
        <div className="container mx-auto flex h-full flex-col items-center justify-center gap-8">
          <div className="">
            <IntroTitle
              heading="From hoteliers to hoteliers"
              title=" Transform hospitality operations with AVA and See how AI can elevate your service today."
              size="lg"
              className="max-w-[740px] text-white [&>h2]:text-white/60"
            />

            <p className="mx-auto max-w-[665px] text-center text-lg leading-7 text-white/70">
              Let us show you how our Personalized Voice Agent can Simplify
              Hospitality Operations. Delight Your Guests with AVA, Your 24/7 AI
              Concierge, using the most advanced voice technology.
            </p>
          </div>
          <LeadForm
            source={avaBookingSource.bookingUrl}
            id={avaBookingSource.bookingId}
          >
            <AnimatedArrowButton variant="secondary">
              Book a Call
            </AnimatedArrowButton>
          </LeadForm>
        </div>
      </div>
    </section>
  );
}
