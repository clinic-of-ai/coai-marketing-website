import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { InteractWithAssistant } from "@/components/InteractWithAssistant";
import { VideoCamera } from "iconoir-react";

export function TalkToAssistant() {
  return (
    <section className="border-y border-gray-200">
      <div className="flex w-full flex-col items-center justify-center gap-10 py-[108px]">
        <SectionHeader
          title="Live Video Call With Sophie"
          description="Experience firsthand how AVA can transform your hospitality business with our AI assistant Sophie. Start a conversation now!"
        />

        <div className="relative h-[249px] w-[249px] rounded-full">
          <div className="absolute right-2 top-5 z-10 flex size-10 animate-pulse items-center justify-center rounded-full bg-red-500">
            <VideoCamera className="h-5 w-5 text-white" />
          </div>
          <div className="absolute right-1 top-4 z-[9] flex size-12 items-center justify-center rounded-full bg-white"></div>
          <Image
            fill
            src="/image/avatar/ava_realistic_photo.png"
            className="rounded-full bg-slate-500 object-cover"
            alt=""
          />
        </div>

        <InteractWithAssistant />
      </div>
    </section>
  );
}
