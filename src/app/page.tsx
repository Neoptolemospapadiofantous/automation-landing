import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Problems } from "@/components/sections/problems";
import { Pipeline } from "@/components/sections/pipeline";
import { RunLog } from "@/components/sections/run-log";
import { Overview } from "@/components/sections/overview";
import { LiveOutcomes } from "@/components/sections/live-outcomes";
import { Comparison } from "@/components/sections/comparison";
import { CustomBuild } from "@/components/sections/custom-build";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { FinalCTA } from "@/components/sections/final-cta";
import { SheetRail } from "@/components/sheet-rail";
import { HomepageJsonLd } from "@/components/jsonld";

/**
 * Homepage — a numbered drawing set (S/01–S/10), tracked by the fixed
 * SheetRail on very wide screens. Narrative order: thesis (hero) →
 * problems → how it runs (pipeline) → proof it's audited (run log) →
 * live numbers → the before/after → the product (roles) → the ops
 * layer (custom build) → pricing → commit.
 */
export default function Home() {
  return (
    <>
      <HomepageJsonLd />
      <SheetRail />
      <Hero />
      <Ticker />
      <Problems />
      <Pipeline />
      <RunLog />
      <LiveOutcomes />
      <Comparison />
      <Overview />
      <CustomBuild />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
