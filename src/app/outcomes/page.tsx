import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Outcomes } from "@/components/sections/outcomes";
import { LiveOutcomes } from "@/components/sections/live-outcomes";
import { SectionHeading } from "@/components/section-heading";
import { caseStudies, tintMap, type Tint } from "@/lib/content";

export const metadata: Metadata = {
  title: "Outcomes — Flowstack",
  description:
    "Real before-and-afters: cancelled hires, response times cut from hours to seconds, onboarding from days to minutes.",
};

export default function OutcomesPage() {
  return (
    <>
      <PageHero
        eyebrow="Outcomes"
        eyebrowTint="success"
        title={
          <>
            Quiet systems. <span className="text-gradient">Loud results.</span>
          </>
        }
        lead="We measure success in hires not made and hours given back — not in dashboards nobody opens. Here's what that looked like for real operators."
        ctas={[
          { href: "/audit", label: "Get my number →", variant: "primary" },
          { href: "/pricing", label: "See pricing", variant: "secondary" },
        ]}
      />

      <Outcomes />

      {/* Live numbers — pulled from the dashboard, complement the curated
          averages above with what's happening right now across all tenants. */}
      <LiveOutcomes />

      {/* Case studies */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Before / after"
            tint="violet"
            title="Three problems, three systems, three quiet wins."
          />
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {caseStudies.map((c) => {
              const t = tintMap[c.tint as Tint];
              return (
                <article
                  key={c.company}
                  className="glass relative flex flex-col overflow-hidden rounded-3xl p-8"
                >
                  <h3 className="text-ink text-xl font-semibold tracking-[-0.02em]">
                    {c.company}
                  </h3>
                  <dl className="mt-6 space-y-5 text-[14.5px] leading-[1.5]">
                    <div>
                      <dt className="text-danger font-mono text-[10px] tracking-[0.2em]">
                        PROBLEM
                      </dt>
                      <dd className="text-ink-dim mt-1">{c.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-cyan font-mono text-[10px] tracking-[0.2em]">
                        FIX
                      </dt>
                      <dd className="text-ink-dim mt-1">{c.fix}</dd>
                    </div>
                  </dl>
                  <div
                    className={`mt-auto pt-6 text-[15px] font-semibold ${t.text}`}
                  >
                    {c.result}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
