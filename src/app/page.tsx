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
 * what we do (hero) → the summary in three lines (TL;DR) → the four
 * service verbs → why believe us (proof, unnumbered — like the
 * ticker, it is an interstitial rather than part of the argument) →
 * the pains (problems) → how it runs (pipeline) →
 * the end-to-end build (custom build) → what we build (catalogue) →
 * the chat product (roles) → pricing → the index → commit.
 *
 * ORDER CHANGE 2026-09-05 (founder): the site promotes the FULL
 * end-to-end build — website + chat + back office + numbers — to
 * businesses starting out or updating an aged setup. The build story
 * (S/04 custom, S/05 catalogue) therefore comes BEFORE the chat
 * product (S/06 roles); the chat stays the self-serve door, not the
 * headline act.
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
    k: "Who it's for",
    v: "Businesses just starting out, and businesses whose site and systems have fallen behind. Take one piece, or hand us the whole thing under one quote.",
  },
  {
    k: "How to start",
    v: "Book the free 30-minute call — you leave with a written fixed price in 48 hours. Or try the chat on your own site first, free.",
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
      <CustomBuild />
      <Catalogue sheetRef="S/05 / what we build" />
      <Overview />
      <PricingTeaser />
      <SiteIndex />
      <FinalCTA />
    </>
  );
}
