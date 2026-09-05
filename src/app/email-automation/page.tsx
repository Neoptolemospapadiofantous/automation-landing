import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /email-automation — the priced email-automation service gets its page.
 *
 * The search plan's last unowned query family: "email automation for
 * small business" had a catalogue cell and nothing else. The page owns
 * it now — the title carries the query, the lead names the place.
 *
 * The distinction with cold outreach is load-bearing (same rule as the
 * internal pitch): this service mails EXISTING customers from the
 * business's own address — never a cold list. Blur that line and the
 * sales conversation goes sideways, so the page states it three times:
 * the TL;DR, the "what we won't do" column, and the three-jobs band.
 *
 * Unpriced, per the standing rule. The €700 lives on the sales sheet;
 * the page ends at the audit like every other build.
 */
export const metadata: Metadata = {
  title: "Email automation for small businesses",
  description:
    "Follow-ups, reminders and invoice chasers that send themselves — from your own address, in your voice. For small businesses in Cyprus. Quoted after a free call.",
  alternates: {
    canonical: "/email-automation",
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Email automation for small businesses — Flowstack",
    url: "/email-automation",
    description:
      "Follow-ups, reminders and invoice chasers that send themselves — from your own address, in your voice. Quoted after a free 30-minute call.",
  },
};

const steps = [
  {
    ref: "EM-01",
    title: "You show us the mail you send by hand",
    body: "Half an hour: the follow-ups you forget, the reminders you retype every week, the invoices you chase on Fridays.",
  },
  {
    ref: "EM-02",
    title: "We write it in your voice",
    body: "Every template is your words, shaped by us. You approve each one before anything ever sends.",
  },
  {
    ref: "EM-03",
    title: "We wire it to your tools",
    body: "Your inbox, calendar and invoicing. The mail goes out when the trigger happens — not when you remember.",
  },
  {
    ref: "EM-04",
    title: "You watch it run",
    body: "Every send is logged. Pause any sequence whenever you like, and replies land in your own inbox, same as always.",
  },
] as const;

export default function EmailAutomationPage() {
  return (
    <>
      <PageHero
        eyebrow="Email automation"
        eyebrowTint="violet"
        title={
          <>
            The email you already owe people —{" "}
            <span className="text-gradient">sent on time, every time.</span>
          </>
        }
        lead="Follow-ups, reminders, review asks and invoice chasers — from your own address, in your voice. For small businesses in Limassol and across Cyprus."
        ctas={[{ href: "/audit", label: "Book the audit →", variant: "primary" }]}
      />

      <Tldr
        rows={[
          {
            k: "What it is",
            v: "Follow-ups, reminders, replies and invoice chasers that send themselves — from your own address, in your voice.",
          },
          {
            k: "What it isn't",
            v: "Cold email. This writes to people who already know you. Finding new customers is its own service — cold outreach.",
          },
          {
            k: "What it costs",
            v: "Quoted after a free 30-minute call. Fixed price before we start, and you own every template.",
          },
        ]}
      />

      {/* How it runs — four beats, same shape as /website-build. */}
      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="MAIL" />
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

      {/* Scope, stated plainly — the not-a-cold-list line is what keeps
          this engagement from being confused with outreach. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-1 gap-8 border-t pt-10 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What this covers.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                The mail your business already owes people: booking
                confirmations and reminders, follow-ups after a job, review
                requests, invoice chasers, replies to the forms on your site.
              </p>
              <p className="bp-annot normal-case mt-1">
                Want new customers instead? That&apos;s{" "}
                <Link
                  href="/outreach"
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  cold outreach
                </Link>{" "}
                — its own service, after the same free call.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What we won&apos;t do.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Buy a list. Mail strangers. Send a word you haven&apos;t
                approved. It&apos;s your address doing the sending — so its
                reputation stays clean, and every message is one you&apos;d
                have sent yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where this fits — email has three jobs; naming the siblings is
          the honest map, and it routes the wrong-fit reader out early. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">where this fits</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Email has three jobs.{" "}
              <Link
                href="/outreach"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                Cold outreach
              </Link>{" "}
              writes to strangers who fit you. Inbox triage sorts what
              arrives. This is the third: the mail you already owe people,
              sent without you.
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
                Fixed price before we start, and you own every template.
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
