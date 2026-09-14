import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { AuditForm } from "@/components/sections/audit-form";

export const metadata: Metadata = {
  title: "Free 30-minute call — fixed price in 48 hours",
  description:
    "Thirty minutes on a call: we show you where you're losing customers, then send a written fixed price within 48 hours. Yours to keep.",
  alternates: {
    canonical: "/audit",
    languages: { en: "/audit", el: "/el/audit", "x-default": "/audit" },
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Free 30-minute call — Flowstack",
    url: "/audit",
    description:
      "A free 30-minute call, then a written fixed price within 48 hours. Yours to keep, whether or not you go ahead.",
  },
};

const expect = [
  {
    step: "01",
    title: "30-minute call",
    body: "You show us how enquiries and work flow today. We show you where customers go missing.",
  },
  {
    step: "02",
    title: "Written price in 48h",
    body: "What we would build, how long it takes, and the fixed price. Yours to keep.",
  },
  {
    step: "03",
    title: "You decide",
    body: "Hire us, take the scope elsewhere, or build it yourself. No follow-up sales emails.",
  },
] as const;

export default function AuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free 30-minute call"
        eyebrowTint="violet"
        title={
          <>
            Thirty minutes, and you&apos;ll have{" "}
            <span className="text-gradient">a number.</span>
          </>
        }
        lead="For a website, a chat and voice assistant, automations or new customers — any of the four."
        ctas={[
          { href: "#audit", label: "Jump to the form →", variant: "primary" },
        ]}
      />

      <Tldr
        rows={[
          { k: "Cost", v: "Nothing. The call and the written price are both free." },
          {
            k: "Time",
            v: "Thirty minutes on a call, then a written price within 48 hours.",
          },
          {
            k: "Commitment",
            v: "None. Take the scope elsewhere if you want. We won't chase you.",
          },
        ]}
      />

      {/* What to expect — hairline-bordered grid, large mono step number
          as the differentiator (per-step tint collapses in mono). */}
      <section className="relative pb-8">
        <div className="mx-auto max-w-[1280px] px-6">
          <ol className="depth-rise flow-edge grid grid-cols-1 border-t border-l border-border-line md:grid-cols-3">
            {expect.map((e) => (
              <li
                key={e.step}
                className="lift-hover bg-surface/40 relative border-r border-b border-border-line p-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-ink font-mono text-5xl font-semibold leading-none tracking-[-0.04em]">
                    {e.step}
                  </span>
                  <span className="bp-dim flex-1" aria-hidden />
                </div>
                <h2 className="text-ink mt-5 text-xl font-semibold tracking-[-0.02em]">
                  {e.title}
                </h2>
                <p className="text-ink-dim mt-3 text-[15px] leading-[1.55]">
                  {e.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <AuditForm />
    </>
  );
}
