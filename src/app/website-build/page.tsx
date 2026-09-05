import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /website-build — the B-02 service gets its page.
 *
 * This is the search plan's biggest gap: "web design limassol" had no
 * owner. The page owns that query family — the title carries it, the
 * lead names the place, and the differentiator is real: nobody else
 * here ships a site with a working knowledge-base chat on it from
 * day one.
 *
 * Scope honesty is load-bearing (same rule as the internal pitch): this
 * sells the brochure-style site. Shops, portals and custom features are
 * still us, but quoted as their own build — saying so here is what stops
 * the small-site price anchoring a twenty-page e-commerce project.
 *
 * Unpriced, per the standing rule. The €900 lives on the sales sheet;
 * the page ends at the audit like every other build.
 */
export const metadata: Metadata = {
  title: "Web design & website builds, Limassol",
  description:
    "Fast, simple websites for small businesses in Limassol and across Cyprus — designed in English or Greek, with a chat that answers visitors from day one.",
  alternates: {
    canonical: "/website-build",
    languages: {
      en: "/website-build",
      el: "/el/website-build",
      "x-default": "/website-build",
    },
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Web design & website builds, Limassol — Flowstack",
    url: "/website-build",
    description:
      "Fast, simple websites for small businesses in Limassol and across Cyprus — with a chat that answers visitors from day one. Quoted after a free 30-minute call.",
  },
};

const steps = [
  {
    ref: "WB-01",
    title: "You tell us what it's for",
    body: "Half an hour: what you sell, who it's for, and the language — English, Greek, or both. Bring your old site or nothing at all.",
  },
  {
    ref: "WB-02",
    title: "We design and write it",
    body: "Your words, shaped by us, on pages built for phones first. You approve every page before it goes anywhere.",
  },
  {
    ref: "WB-03",
    title: "We build it and switch on the chat",
    body: "Fast, mobile-ready, on your own domain. The chat goes on with it — trained on your own knowledge, answering from day one.",
  },
  {
    ref: "WB-04",
    title: "You own all of it",
    body: "Domain, code, content — yours. Update it yourself, or we watch it for you under ongoing care.",
  },
] as const;

export default function WebsiteBuildPage() {
  return (
    <>
      <PageHero
        eyebrow="Website build"
        eyebrowTint="violet"
        title={
          <>
            A fast, simple website —{" "}
            <span className="text-gradient">
              with the chat on it from day one.
            </span>
          </>
        }
        lead="Websites for small businesses in Limassol and across Cyprus. In English, Greek, or both."
        ctas={[{ href: "/audit", label: "Book the audit →", variant: "primary" }]}
      />

      <Tldr
        rows={[
          {
            k: "What it is",
            v: "A fast, simple site — your pages, your words, mobile-ready, deployed on your own domain.",
          },
          {
            k: "What's different",
            v: "The chat ships with it, trained on your own knowledge. Your site answers questions while you sleep.",
          },
          {
            k: "What it costs",
            v: "Quoted after a free 30-minute call — or free with the annual Operator chat plan. Fixed price before we start, and you own everything.",
          },
        ]}
      />

      {/* How it runs — four beats, same shape as /outreach. */}
      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="SITE" />
        <div className="mx-auto max-w-[1280px] px-6">
          <ol className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2">
            {steps.map((s) => (
              <li key={s.ref} className="bg-bg flex flex-col gap-3 px-7 py-9">
                <span className="bp-ref text-violet">{s.ref}</span>
                <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">
                  {s.title}
                </h2>
                <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scope, stated plainly — the honesty that keeps the small-site
          engagement from anchoring a twenty-page shop. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-1 gap-8 border-t pt-10 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What this covers.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                A brochure-style site — up to about six pages. Who you are,
                what you do, how to reach you, and a chat that answers the
                rest.
              </p>
              <p className="bp-annot normal-case mt-1">
                Shop, booking portal, or something custom? Still us — quoted
                as its own build after the same free call.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What we won&apos;t do.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Hold your domain. Lock your content. Disappear after launch.
                Everything we ship is yours to keep — including the code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The chat is the differentiator — send the reader to its page. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">why the chat matters</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Most small-business sites are read and left. Yours ships with a
              chat trained on your own knowledge — it answers questions,
              qualifies visitors, and hands you the leads.{" "}
              <Link
                href="/pricing"
                className="text-ink underline underline-offset-4"
              >
                See how the chat works
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Quoted after a free 30-minute call.{" "}
              <span className="text-ink font-semibold">
                Fixed price before we start, and you keep the code.
              </span>
            </p>
            <p className="bp-annot normal-case">
              On the{" "}
              <Link
                href="/pricing"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                annual Operator plan
              </Link>
              , this build is included — free.
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
