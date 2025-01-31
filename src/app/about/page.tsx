import { HQMapLocation } from "@/app/config";
import { MapLocation } from "@/components/common/map-location";

import { HeroSection } from "./_components/hero-section";
import { MotivationSection } from "./_components/motivation-section";
import { TeamGallerySection } from "./_components/team-gallery-section";
import { CompanyMissionSection } from "./_components/company-mission-section";
import data from "./_data";

export default function About() {
  return (
    <>
      <HeroSection {...data.hero} />
      <CompanyMissionSection {...data.companyMission} />
      <MotivationSection {...data.motivation} />
      <TeamGallerySection {...data.team} />

      <section>
        <div className="h-[31.25rem] xl:h-[26rem]">
          <MapLocation src={HQMapLocation} />
        </div>
      </section>
    </>
  );
}
