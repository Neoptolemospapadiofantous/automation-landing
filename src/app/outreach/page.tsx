import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /outreach — cold outreach, done for you.
 *
 * The service with the highest ticket and, until this page, no web
 * presence at all: it existed on the site as a single unpriced bullet in
 * the custom-build band. Copy is adapted from the pitch we already send
 * (master-vm-system/docs/OUTREACH_PITCH_EN.html) because it converts in
 * the PDF — minus its pricing table, which stays a sales artefact.
 *
 * Everything a buyer is nervous about is answered before the CTA: whose
 * address it sends from, who approves the words, what happens when
 * someone replies, and how they stop. Without a price to anchor on, the
 * control a customer keeps IS the reassurance.
 */
export const metadata: Metadata = {
  title: "Cold outreach",
  description:
    "Lead generation, done for you: we find the companies you want as customers, write to them in your voice, and hand you the replies. You approve every word.",
  alternates: { canonical: "/outreach" },
  openGraph: {
    title: "Cold outreach — Flowstack",
    url: "/outreach",
    description:
      "We find the companies you want as customers, write to them in your voice, and hand you the replies. You approve every word.",
  },
};

const steps = [
  {
    ref: "O-01",
    title: "You tell us who",
    body: "Half an hour to name who you want — clinics, firms, hotels, here or abroad. We build the list. You approve it.",
  },
  {
    ref: "O-02",
    title: "We write the emails",
    body: "A first email and a few polite follow-ups, in Greek or English. You approve every word.",
  },
  {
    ref: "O-03",
    title: "Sending runs itself",
    body: "A few a day, from your own address. A reply stops the sequence. Bounces and opt-outs handle themselves.",
  },
  {
    ref: "O-04",
    title: "You see everything",
    body: "A monthly report: what went out, who replied, what to try next. Want a different kind of company? Say so and we switch.",
  },
] as const;

const yours = [
  "Half an hour to name who you want to reach",
  "Your approval of the email texts",
  "The name the emails are sent as",
] as const;

export default function OutreachPage() {
  return (
    <>
      <PageHero
        eyebrow="Cold outreach"
        eyebrowTint="violet"
        title={
          <>
            You only talk to people who are{" "}
            <span className="text-gradient">already interested.</span>
          </>
        }
        lead="We find companies that fit you, email them in your voice, and hand you the replies."
        ctas={[{ href: "/audit", label: "Book the audit →", variant: "primary" }]}
      />

      <Tldr
        rows={[
          {
            k: "What it is",
            v: "We build the list, write the emails, and send them from your own address.",
          },
          {
            k: "Your part",
            v: "Half an hour to say who you want. After that, you approve the words.",
          },
          {
            k: "What it costs",
            v: "Quoted after a free 30-minute call. Fixed price before we start.",
          },
        ]}
      />

      {/* How it runs — four beats, the same four the pitch uses. */}
      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="REACH" />
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

      {/* What we need from you — the objection this service always raises is
          "how much of my time does this eat?" Answer it plainly. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-1 gap-8 border-t pt-10 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What we need from you.
              </h2>
              <ul className="flex flex-col gap-2.5">
                {yours.map((y) => (
                  <li
                    key={y}
                    className="text-ink-dim flex items-start gap-3 leading-[1.5]"
                  >
                    <span className="bp-dot mt-1.5 shrink-0" aria-hidden />
                    {y}
                  </li>
                ))}
              </ul>
              <p className="bp-annot normal-case mt-1">
                That&apos;s it — we handle the rest.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What we won&apos;t do.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                We don&apos;t send what you haven&apos;t read. We don&apos;t buy
                scraped lists. We stop on the first reply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The loop is what makes this improve month over month — send the
          reader there, since it is the same machinery. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">why it improves</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Subject lines and sequences are tested, not guessed. Same loop we
              run on our own outreach —{" "}
              <Link
                href="/what-works"
                className="text-ink underline underline-offset-4"
              >
                you can read how it works
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
              Scoped to your market, quoted after a free audit.{" "}
              <span className="text-ink font-semibold">
                Fixed price before we start.
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
