import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Problems } from "@/components/sections/problems";
import { Pipeline } from "@/components/sections/pipeline";
import { Overview } from "@/components/sections/overview";
import { LiveOutcomes } from "@/components/sections/live-outcomes";
import { CustomBuild } from "@/components/sections/custom-build";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { FinalCTA } from "@/components/sections/final-cta";
import { SheetRail } from "@/components/sheet-rail";
import { HomepageJsonLd } from "@/components/jsonld";

/**
 * Homepage — a numbered drawing set (S/01–S/08), tracked by the fixed
 * SheetRail on very wide screens. Tight client-legible narrative:
 * what we do (hero) → the pains (problems) → how it runs (pipeline) →
 * live proof → the product (roles) → the ops layer (custom build) →
 * pricing → commit. (The audit-trail log and by-hand comparison
 * sections were cut 2026-07-17 for clarity — see git history.)
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
      <LiveOutcomes />
      <Overview />
      <CustomBuild />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
