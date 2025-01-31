import { HeroSection } from "./_components/hero-section";
import { ComponentA } from "./_components/component-a";
import { ComponentB } from "./_components/component-b";
import data from "./_data";

export default function AILabsPage() {
  return (
    <>
      <HeroSection {...data.hero} />
      <ComponentA />
      <ComponentB />
    </>
  );
}
