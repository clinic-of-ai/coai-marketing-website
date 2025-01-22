import { HQMapLocation } from "@/app/config";
import { MapLocation } from "@/components/MapLocation";
import { HeroSection } from "@/components/features/about/HeroSection";
import { MissionSection } from "@/components/features/about/MissionSection";
import { MotivationSection } from "@/components/features/about/MotivationSection";
import { TeamGallerySection } from "@/components/features/about/TeamGallerySection";

export default function About() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <MotivationSection />
      <TeamGallerySection />
      <section>
        <div className="h-[31.25rem] xl:h-[26rem]">
          <MapLocation src={HQMapLocation} />
        </div>
      </section>
    </>
  );
}
