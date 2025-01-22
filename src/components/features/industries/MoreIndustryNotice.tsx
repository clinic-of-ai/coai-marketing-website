import Image from "next/image";
import { Button } from "@/components/ui/button";

export function MoreIndustryNotice() {
  return (
    <section className="bg-primary text-slate-900 md:px-10">
      <div className="container flex w-full flex-col gap-y-6 py-[70px] md:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tighter">
              Expanding Our AI Solutions Across New Sectors
            </h2>
            <p className="">
              We are continuously expanding our AI solutions and expertise to
              serve new industries and sectors. Our team is actively researching
              and developing innovative approaches to tackle unique challenges
              across different business domains. Stay tuned for updates as we
              broaden our capabilities to help more organizations harness the
              power of artificial intelligence.
            </p>
          </div>

          <div>
            <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
              Schedule a free consultation
            </Button>
          </div>
        </div>

        <div className="relative h-[300px] w-full flex-1">
          <Image
            fill
            className="object-contain"
            src="/image/rocket.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
