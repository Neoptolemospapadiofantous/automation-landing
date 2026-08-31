import { Hero } from "@/components/sections/hero";
import { Tldr } from "@/components/tldr";
import { Ticker } from "@/components/sections/ticker";
import { ServiceLines } from "@/components/sections/service-lines";
import { Proof } from "@/components/sections/proof";
import { Problems } from "@/components/sections/problems";
import { Pipeline } from "@/components/sections/pipeline";
import { Overview } from "@/components/sections/overview";
import { CustomBuild } from "@/components/sections/custom-build";
import { Catalogue } from "@/components/sections/catalogue";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { SiteIndex } from "@/components/sections/site-index";
import { FinalCTA } from "@/components/sections/final-cta";
import { SheetRail } from "@/components/sheet-rail";
import { HomepageJsonLd } from "@/components/jsonld";

/**
 * Homepage — a numbered drawing set (S/01–S/09), tracked by the fixed
 * SheetRail on very wide screens. Tight client-legible narrative:
 * what we do (hero) → the summary in three lines (TL;DR) → the three
 * service lines → why believe us (proof, unnumbered — like the
 * ticker, it is an interstitial rather than part of the argument) →
 * the pains (problems) → how it runs (pipeline) →
 * the product (roles) → the ops layer (custom build) → what we build →
 * pricing → every page on the site (index) → commit.
 *
 * (The audit-trail log and by-hand comparison sections were cut
 * 2026-07-17, the live-readouts strip 2026-08-01 — see git history.)
 */
const TLDR = [
  {
    k: "What we do",
    v: "We build your website or dashboard, put a chat on it that answers from your own knowledge, automate the email and busywork behind it, and land your numbers in one live view.",
  },
  {
    k: "What it costs",
    v: "The chat is free to start, then €9 to €39 a month. Everything we build for you is quoted first, at a fixed price.",
  },
  {
    k: "How to start",
    v: "Add the chat to your site in about a minute, or book a free 30-minute call.",
  },
] as const;

export default function Home() {
  return (
    <>
      <HomepageJsonLd />
      <SheetRail />
      <Hero />
      <Tldr rows={TLDR} />
      <Ticker />
      <ServiceLines />
      <Proof />
      <Problems />
      <Pipeline />
      <Overview />
      <CustomBuild />
      <Catalogue sheetRef="S/06 / what we build" />
      <PricingTeaser />
      <SiteIndex />
      <FinalCTA />
    </>
  );
}
