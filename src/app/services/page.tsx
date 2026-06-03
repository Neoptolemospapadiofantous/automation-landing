import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Services } from "@/components/sections/services";
import { SectionHeading } from "@/components/section-heading";
import { integrations } from "@/lib/content";

export const metadata: Metadata = {
  title: "What we build — Flowstack",
  description:
    "Lead ops, finance ops, onboarding, data ops and internal AI — built on your stack, in your accounts, with no lock-in.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we build"
        eyebrowTint="cyan"
        title={
          <>
            We don&apos;t sell tools. We sell{" "}
            <span className="text-gradient">outcomes.</span>
          </>
        }
        lead="Five flavours of automation, one rule: every build starts from a problem and ends with hours given back. All of it lives in your accounts — you own it the day we hand off."
        ctas={[
          { href: "/audit", label: "Scope my build →", variant: "primary" },
          { href: "/outcomes", label: "See the results", variant: "secondary" },
        ]}
      />

      <Services hideHeading />

      {/* Integrations */}
      <section className="relative py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Works with your stack"
            tint="violet"
            title="We build where you already work."
            sub="No rip-and-replace. We connect the tools you've got — and write custom code where an off-the-shelf connector won't cut it."
          />
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {integrations.map((g) => (
              <div key={g.group} className="glass rounded-3xl p-6">
                <h3 className="text-ink-mute font-mono text-[11px] tracking-[0.18em]">
                  {g.group.toUpperCase()}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.tools.map((tool) => (
                    <li
                      key={tool}
                      className="border-border-hi/80 bg-bg-elev/60 text-ink-dim rounded-lg border px-2.5 py-1 text-[13px]"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
