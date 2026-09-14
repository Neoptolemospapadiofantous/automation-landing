import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import { ServicePage, type ServiceStep } from "@/components/service-page";
import { serviceBySlug } from "@/lib/content";

/**
 * /lead-generation — the Lead generation service (was /outreach; /studio
 * also lands here, since customer acquisition was its job. Both renamed
 * 2026-09-13 with permanent redirects).
 *
 * Finding and emailing NEW customers only. Instant call-back and SMS
 * answer people who already enquired, so they belong to Chat & voice.
 * `isnt` states we don't sell cold SMS or cold automated calls. Unpriced.
 */
export const metadata: Metadata = {
  title: "Lead generation & cold email service",
  description:
    "We find companies that fit you, email them from your own address in your words, and hand you the replies. First emails within two weeks.",
  alternates: {
    canonical: "/lead-generation",
    languages: {
      en: "/lead-generation",
      el: "/el/lead-generation",
      "x-default": "/lead-generation",
    },
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Lead generation & cold email service — Flowstack",
    url: "/lead-generation",
    description:
      "We find companies that fit you, email them in your words, and hand you the replies. Fixed price after a free call.",
  },
};

const steps: readonly ServiceStep[] = [
  {
    ref: "LG-01",
    title: "You tell us who",
    body: "Half an hour to name who you want — clinics, firms, hotels, here or abroad. We build the list, you approve it.",
  },
  {
    ref: "LG-02",
    title: "We write the emails",
    body: "A first email and a few polite follow-ups, in Greek or English. You approve every word.",
  },
  {
    ref: "LG-03",
    title: "Sending runs itself",
    body: "From your own address. A reply stops the sequence, and opt-outs are honoured automatically.",
  },
  {
    ref: "LG-04",
    title: "You see what worked",
    body: "Want a different kind of company? Say so, and we switch the list.",
  },
];

const yours = [
  "Half an hour to name who you want to reach",
  "Your approval of the email texts",
  "The name the emails are sent as",
] as const;

export default function LeadGenerationPage() {
  return (
    <ServicePage
      service={serviceBySlug("lead-generation")}
      watermark="LEADS"
      steps={steps}
      title={
        <>
          You only talk to people{" "}
          <span className="text-gradient">who are already interested.</span>
        </>
      }
    >
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
                    className="text-ink-dim flex items-start gap-3 leading-[1.55]"
                  >
                    <span className="bp-dot mt-2 shrink-0" aria-hidden />
                    {y}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                What we won&apos;t do.
              </h2>
              <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                Send what you haven&apos;t read. Buy scraped lists. Keep
                emailing someone who replied.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ServicePage>
  );
}
