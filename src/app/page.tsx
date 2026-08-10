import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Problems } from "@/components/sections/problems";
import { Pipeline } from "@/components/sections/pipeline";
import { Overview } from "@/components/sections/overview";
import { CustomBuild } from "@/components/sections/custom-build";
import { Catalogue } from "@/components/sections/catalogue";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { FinalCTA } from "@/components/sections/final-cta";
import { SheetRail } from "@/components/sheet-rail";
import { HomepageJsonLd } from "@/components/jsonld";

/**
 * Homepage — a numbered drawing set (S/01–S/08), tracked by the fixed
 * SheetRail on very wide screens. Tight client-legible narrative:
 * what we do (hero) → the pains (problems) → how it runs (pipeline) →
 * the product (roles) → the ops layer (custom build) → what we build →
 * pricing →
 * commit. (The audit-trail log and by-hand comparison sections were cut
 * 2026-07-17, the live-readouts strip 2026-08-01 — see git history.)
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
      <Overview />
      <CustomBuild />
      <Catalogue sheetRef="S/06 / what we build" />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
