import { Hero } from "./_components/hero";
import { ClientGains } from "./_components/client-gains";
import { OurPartners } from "./_components/our-partners";
import { VideoIntroduction } from "./_components/video-introduction";
import { DiscoveryProcess } from "./_components/discovery-process";
import { ClientBenefits } from "./_components/client-benefits";
import { Quote } from "./_components/quote";
import { SolutionOffering } from "./_components/solution-offering";
import { Industries } from "./_components/industries";
import { Insight } from "./_components/insight";
import { GetStartedSection } from "./_components/get-started-section";
import { GameButton } from "./_components/game-button"; // Add this import

import content from "./_data";

export default function Home() {
  return (
    <>
      <Hero {...content.hero} />
      <GameButton /> {/* Add this line right after the Hero */}
      <VideoIntroduction {...content.videoIntro} />
      <OurPartners {...content.ourPartners} />
      <ClientGains {...content.clientGains} />
      <DiscoveryProcess {...content.discoveryProcess} />
      <ClientBenefits {...content.clientBenefits} />
      <Quote {...content.quote} />
      <SolutionOffering {...content.solutionOffering} />
      <Industries {...content.industries} />
      <Insight {...content.insights} />
      <GetStartedSection {...content.mainCta} />
    </>
  );
}
