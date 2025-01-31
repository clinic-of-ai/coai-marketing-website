"use client";

import Image from "next/image";
import { StarSolid } from "iconoir-react";
import { LeadForm } from "@/components/common/lead-form";
import { avaBookingSource } from "@/app/config";
import { AnimatedArrowButton } from "@/components/ui/animated-arrow-button";

export function PrimaryCTASection() {
  return (
    <section>
      <div className="md:container md:rounded-[20px] pb-20">
        <div className="relative text-white">
          <div className="container relative inset-0 z-10 flex flex-col items-center justify-center gap-y-6 py-20 text-center">
            <div className="space-y-20">
              <div className="flex flex-col items-center justify-center gap-y-3">
                <StarSolid className="text-primary" width={24} height={24} />
                <h5 className="text-sm font-bold capitalize text-primary">
                  Your guests (and your stress levels) will thank you
                </h5>
              </div>

              <h2 className="mx-auto max-w-4xl text-center text-3xl font-semibold tracking-tighter">
                With AVA, you can focus on what you do best—creating memorable
                experiences for your guests, whether they’re staying overnight
                or dining for the evening.
              </h2>

              <p className="mx-auto max-w-4xl text-center text-sm leading-6">
                Let AVA handle the routine tasks while you perfect your service,
                ambiance, and offerings. Don’t let another busy season be marred
                by booking chaos or understating. Embrace the future of
                hospitality and restaurant management with AVA.
              </p>

              <div className="w-full flex justify-center items-center">
                <LeadForm
                  source={avaBookingSource.bookingUrl}
                  id={avaBookingSource.bookingId}
                >
                  <AnimatedArrowButton>
                    Transform your business today
                  </AnimatedArrowButton>
                </LeadForm>
              </div>
            </div>
          </div>

          <Image
            src="/image/thumbnail/banner-image.png"
            alt=""
            fill
            className="bg-gray-300 object-cover md:rounded-[20px] mx-auto"
          />
          <div className="absolute inset-0 bg-primary opacity-50 md:rounded-[20px]" />
          <div className="absolute inset-0 bg-black opacity-50 md:rounded-[20px]" />
        </div>
      </div>
    </section>
  );
}
