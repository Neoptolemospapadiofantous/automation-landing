import { Hero } from "@/components/sections/hero";
import { LinesOfBusiness } from "@/components/sections/lines-of-business";
import { Overview } from "@/components/sections/overview";
import { LiveOutcomes } from "@/components/sections/live-outcomes";
import { CustomBuild } from "@/components/sections/custom-build";
import { FinalCTA } from "@/components/sections/final-cta";
import { HomepageJsonLd } from "@/components/jsonld";

export default function Home() {
  return (
    <>
      <HomepageJsonLd />
      <Hero />
      <LinesOfBusiness />
      <Overview />
      <LiveOutcomes />
      <CustomBuild />
      <FinalCTA />
    </>
  );
}
