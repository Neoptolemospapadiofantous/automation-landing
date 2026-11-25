import { Hero } from "@/components/sections/hero";
import { Tldr } from "@/components/tldr";
import { Ticker } from "@/components/sections/ticker";
import { ServiceLines } from "@/components/sections/service-lines";
import { Proof } from "@/components/sections/proof";
import { Problems } from "@/components/sections/problems";
import { Overview } from "@/components/sections/overview";
import { CustomBuild } from "@/components/sections/custom-build";
import { Catalogue } from "@/components/sections/catalogue";
import { ManyAgents, MANY_AGENTS_EN } from "@/components/sections/many-agents";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { FinalCTA } from "@/components/sections/final-cta";
import { SheetRail } from "@/components/sheet-rail";
import { HomepageJsonLd } from "@/components/jsonld";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { EnquiryStory } from "@/components/sections/enquiry-story";

/**
 * Homepage — a numbered drawing set (S/01–S/09), tracked by the fixed
 * SheetRail on very wide screens. Tight client-legible narrative:
 * what we do (hero) → the summary in three lines (TL;DR) → the one
 * service (2026-09-29; four services from 09-13, four verbs before) → why believe us (proof, unnumbered — like the
 * ticker, it is an interstitial rather than part of the argument) →
 * the pains (problems) → how it runs (pipeline) →
 * the end-to-end build (custom build) → what we build (catalogue) →
 * the chat product (roles) → pricing → commit. (The index band was cut
 * 2026-09-07: it repeated the footer's four columns word for word.)
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
    k: "What we sell",
    v: "One thing: a chat and phone assistant that answers every enquiry on your site, in Greek and English, and files it into the calendar, sheet or CRM you already run.",
  },
  {
    k: "Who it's for",
    v: "Car rental desks, clinics, pool and trade companies, hotels and villas — anyone whose customers ask outside office hours.",
  },
  {
    k: "How to start",
    v: "A free 30-minute call, then a written fixed price in 48 hours. Or start the chat yourself from €19.99 a month.",
  },
] as const;

export default function Home() {
  return (
    <>
      <HomepageJsonLd />
      <SmoothScroll />
      <SheetRail />
      <Hero />
      <Tldr rows={TLDR} />
      <Ticker />
      <ServiceLines />
      <Proof />
      <Problems />
      <EnquiryStory />
      <CustomBuild />
      <ManyAgents copy={{ ...MANY_AGENTS_EN, sheetRef: "S/05 / custom · many agents" }} />
      <Catalogue sheetRef="S/06 / what we build" />
      <Overview />
      <PricingTeaser />
      <FinalCTA />
    </>
  );
}
