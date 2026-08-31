import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { ProductWindow } from "@/components/sections/product-window";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /what-works — the analytics service.
 *
 * Deliberately leads with the loop, not the dashboard. A dashboard is a
 * claim every agency makes; an experiment loop that retires what loses is
 * one almost nobody can back, and it is the half of this business with
 * evidence behind it today.
 *
 * The two halves map onto how the work is actually sold: the live view is
 * built once around a customer's stack, the loop keeps running. Neither
 * carries a price — every build is quoted per stack, and the audit is
 * where the number comes from.
 *
 * "Business intelligence" and "analytics" appear in the metadata, where
 * people search them, and nowhere in the headlines — the buyers here are
 * clinics, firms and hotels, and the plain sentence outsells the acronym.
 */
export const metadata: Metadata = {
  title: "Business dashboards & analytics",
  description:
    "Business intelligence and analytics as a service: your numbers in one live view, plus the experiments that change them — keep what wins, retire what doesn't.",
  alternates: { canonical: "/what-works" },
  openGraph: {
    title: "What works — Flowstack",
    url: "/what-works",
    description:
      "One live view of your numbers, and the loop that keeps improving them. Free 30-minute audit, written fixed scope in 48 hours.",
  },
};

const halves = [
  {
    ref: "W-01",
    name: "One live view",
    what: "Built once, around your stack.",
    body: "Your sales, leads and weekly figures, pulled out of scattered tools into one dashboard that keeps itself up to date.",
    points: [
      "Your CRM, spreadsheets, inbox and billing, read in one place",
      "The weekly report stops being a job someone does",
      "Numbers you can act on the same day, not next Monday",
    ],
  },
  {
    ref: "W-02",
    name: "The loop",
    what: "Runs every month, on your numbers.",
    body: "A dashboard tells you what happened. The loop tells you what to change, and what moved when you did.",
    points: [
      "Subject lines, sequences and formats tested against each other",
      "Winners kept, losers retired — on the evidence, not a hunch",
      "A monthly note on what changed, in plain language",
    ],
  },
] as const;

const ownGrowth = [
  "Every email and post we send is assigned by a live experiment, judged on what came back.",
  "The evidence said our video posts reached half as many people. We retired video.",
  "A bug inflated our own reply rate. We found it and revised the number down — twice.",
] as const;

export default function WhatWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="What works"
        eyebrowTint="violet"
        title={
          <>
            Most reporting tells you what happened.{" "}
            <span className="text-gradient">This tells you what to do next.</span>
          </>
        }
        lead="We put your numbers in one dashboard, then run the tests that change them."
        ctas={[{ href: "/audit", label: "Book the audit →", variant: "primary" }]}
      />

      <Tldr
        rows={[
          {
            k: "What it is",
            v: "All your numbers in one dashboard, built around the tools you already use.",
          },
          {
            k: "What else",
            v: "Every month we test what you send, keep what works, and drop what doesn't.",
          },
          {
            k: "What it costs",
            v: "Quoted after a free 30-minute call. Fixed price, and you keep the code.",
          },
        ]}
      />

      {/* The live view, drawn. Same component the homepage hero uses — it is
          a picture of exactly the thing this page sells.

          The wrapper is load-bearing, not decoration: the window's ink band
          is full-bleed via `inset-x-[calc(50%-50vw)]`, and 100vw counts the
          scrollbar the client width does not. On the homepage the hero's own
          `overflow-hidden` clips that; as a bare sibling here it pushed 8px
          of horizontal overflow onto the page. */}
      <section className="relative isolate overflow-hidden">
        <ProductWindow />
      </section>

      {/* The two halves — what you own, and what keeps happening. */}
      <section className="relative isolate overflow-hidden py-20">
        <SectionWatermark text="LOOP" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-px border bg-border-line border-border-line lg:grid-cols-2">
            {halves.map((h) => (
              <div key={h.ref} className="bg-bg flex flex-col gap-4 px-7 py-9">
                <span className="bp-ref text-ink-mute">{h.ref}</span>
                <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  {h.name}
                </h2>
                <p className="bp-annot normal-case">{h.what}</p>
                <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                  {h.body}
                </p>
                <ul className="mt-1 flex flex-col gap-2.5">
                  {h.points.map((p) => (
                    <li
                      key={p}
                      className="text-ink-dim flex items-start gap-3 text-[14px] leading-[1.5]"
                    >
                      <span className="bp-dot mt-1.5 shrink-0" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The proof. This is the page where the claim has to hold up, so the
          own-growth evidence runs fuller here than in the homepage band.
          Method only — no counts that decay, no absolute volumes. */}
      <section className="relative isolate overflow-hidden pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">on ourselves first</span>
            <h2 className="text-ink mt-4 text-2xl font-semibold tracking-[-0.03em] text-balance sm:text-3xl">
              The loop has been running on us the whole time.
            </h2>
            <div className="mt-7 flex flex-col gap-5">
              {ownGrowth.map((line) => (
                <p
                  key={line}
                  className="text-ink-dim max-w-[62ch] leading-[1.6]"
                >
                  {line}
                </p>
              ))}
              <p className="text-ink max-w-[62ch] leading-[1.6] font-semibold">
                Same loop, pointed at your numbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Close — every unpriced service ends at the audit. */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Scoped to your stack, quoted after a free 30-minute audit.{" "}
              <span className="text-ink font-semibold">
                Fixed price, and you keep the code.
              </span>
            </p>
            <Link href="/audit" className={ctaClass()}>
              Book the audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
