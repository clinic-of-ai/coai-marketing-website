"use client";

import { motion } from "framer-motion";
import { LeadForm } from "@/components/form/LeadForm";
import { discoveryCallBookingSource } from "../../../../app/config";
import { LampContainer } from "@/components/ui/lamp";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function GetStartedSection() {
  return (
    <LampContainer className="rounded-none">
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center justify-center gap-y-10"
      >
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="mx-auto max-w-[494px] bg-gradient-to-br from-cyan-100 to-cyan-300 bg-clip-text text-center text-3xl font-semibold tracking-tighter text-transparent md:text-4xl">
            Every industry stands to gain from the benefits of AI.
          </h1>
          <p className="text-inverse-foreground">
            It all starts with a simple 15-minute call.
          </p>
        </div>
        <LeadForm
          source={discoveryCallBookingSource.bookingUrl}
          id={discoveryCallBookingSource.bookingId}
        >
          <ShimmerButton
            shimmerColor="rgba(6, 182, 212, 1)"
            background="rgba(9, 14, 35, 1)"
            className="rounded-full transition-all duration-300 ease-in-out hover:animate-pulse"
          >
            <span className="md:text-xs">Book a call</span>
          </ShimmerButton>
        </LeadForm>
      </motion.div>
    </LampContainer>
  );
}
