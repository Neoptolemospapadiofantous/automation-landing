import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGES } from "@/lib/seo";
import { ServicePage } from "@/components/service-page";
import { SectionWatermark } from "@/components/section-watermark";
import { FREE_CALL, rolePages, serviceBySlug } from "@/lib/content";
import { dashboardUrl, registerUrl } from "@/lib/dashboard";

/**
 * /chat-assistant — the Chat & voice assistant service (new, 2026-09-13).
 *
 * It absorbs three things that used to be separate:
 * - the four role pages, now "what it can do" — each still links to its
 *   /roles page, which stays live for search but left the menu;
 * - /suite's honest list of what the do-it-yourself chat does today and
 *   what it does NOT yet (that URL now redirects here);
 * - the phone assistant, instant call-back and SMS — BUILT FOR THE CLIENT,
 *   never part of a plan (the `get` lines in `services` say so).
 *
 * HONESTY RULE (unchanged from /suite): "Not yet" items are described as
 * not working, with the only action being to ask for them. WhatsApp gets
 * no "we build it" line because we don't — not in the app, not for clients.
 */
export const metadata: Metadata = {
  title: "Website chat & phone assistant for businesses",
  description:
    "Answers every enquiry on your site, day and night, captures the lead and hands it to you. Chat from €19.99/mo; phone assistant, call-back and SMS built for you.",
  alternates: {
    canonical: "/chat-assistant",
    languages: {
      en: "/chat-assistant",
      el: "/el/chat-assistant",
      "x-default": "/chat-assistant",
    },
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Website chat & phone assistant for businesses — Flowstack",
    url: "/chat-assistant",
    description:
      "Every enquiry answered, day and night, on your site and your phone. Chat from €19.99/mo.",
  },
};

/** What the do-it-yourself chat does today — verifiable in the app. */
const today = [
  {
    name: "Website chat",
    body: "Answers visitors from your own material, in their language — on your site and on a hosted chat page.",
  },
  {
    name: "Your documents, as answers",
    body: "Upload FAQs, price lists and pages. The chat answers from them and shows where the answer came from.",
  },
  {
    name: "Leads, captured and scored",
    body: "Every conversation that gives a name or an email lands on your board, with the transcript attached.",
  },
  {
    name: "Step in yourself",
    body: "Take over any chat as yourself. The visitor sees a person; the assistant waits until you hand back.",
  },
  {
    name: "A Monday summary",
    body: "Conversations and leads for the week, and one summary in your inbox every Monday.",
  },
  {
    name: "Leads sent to your tools",
    body: "From Starter up, each new lead and handoff request goes by webhook to Zapier, Make, Google Sheets or your CRM as it happens — signed with your own secret. No public API.",
  },
] as const;

/** Not in the do-it-yourself chat yet — in those words. */
const notYet = [
  {
    name: "Booking & appointments",
    body: "The chat checks your calendar, books the slot, and sends the confirmation and reminder.",
    built: true,
  },
  {
    name: "Inbox & portal enquiries",
    body: "Enquiries from email, booking portals and listing sites, answered by the same assistant.",
    built: true,
  },
  {
    name: "WhatsApp",
    body: "The same assistant on your WhatsApp Business number.",
    built: false,
  },
] as const;

export default function ChatAssistantPage() {
  return (
    <ServicePage
      service={serviceBySlug("chat-assistant")}
      watermark="ASK"
      title={
        <>
          Every enquiry answered —{" "}
          <span className="text-gradient">day, night, site or phone.</span>
        </>
      }
      ctas={[
        { href: registerUrl(), label: "Start the chat — €19.99/mo →" },
        {
          href: FREE_CALL.href,
          label: `${FREE_CALL.label} →`,
          short: `${FREE_CALL.short} →`,
          variant: "secondary",
        },
      ]}
    >
      {/* What it can do — the four role pages, folded in. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line border-t pt-10">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              What it can do.
            </h2>
          </div>
          <ul className="border-border-line bg-border-line mt-6 grid grid-cols-1 gap-px border sm:grid-cols-2">
            {rolePages.map((r) => (
              <li key={r.slug} className="bg-bg">
                <Link
                  href={`/roles/${r.slug}`}
                  className="lift-hover group flex h-full flex-col gap-2 px-6 py-7"
                >
                  <span className="text-ink flex items-center gap-2.5 text-lg font-semibold tracking-[-0.02em]">
                    {r.name}
                    <span
                      aria-hidden
                      className="text-violet ml-auto transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                  <span className="text-ink-dim leading-[1.55]">{r.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* In the do-it-yourself chat today. */}
      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="LIVE" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-3 border-t pt-10">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              In the chat today.
            </h2>
            <Link
              href="/pricing"
              className="bp-annot inline-block py-1.5 normal-case underline underline-offset-4"
            >
              Every plan unless stated · see pricing
            </Link>
          </div>
          <ul className="border-border-line bg-border-line mt-6 grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3">
            {today.map((m) => (
              <li key={m.name} className="bg-bg flex flex-col gap-3 px-7 py-8">
                <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                  {m.name}
                </h3>
                <p className="text-ink-dim max-w-[40ch] leading-[1.6]">
                  {m.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NOT YET, in those words. The only action is to ask for it. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line border-t pt-10">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Not in the do-it-yourself chat yet.
            </h2>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              None of these work in the chat today. Ask for them from{" "}
              <a
                href={dashboardUrl("/suite")}
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                your dashboard
              </a>{" "}
              — we build in the order people ask.
            </p>
          </div>
          <ul className="border-border-line bg-border-line mt-6 grid grid-cols-1 gap-px border sm:grid-cols-3">
            {notYet.map((m) => (
              <li
                key={m.name}
                className="bg-bg-elev flex flex-col gap-3 px-7 py-8"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                    {m.name}
                  </h3>
                  <span className="bp-ref shrink-0">not yet</span>
                </div>
                <p className="text-ink-dim max-w-[40ch] leading-[1.6]">
                  {m.body}
                </p>
                {m.built && (
                  <p className="text-ink-mute mt-auto pt-1 text-[13px] leading-[1.5]">
                    We build this for you today:{" "}
                    <Link
                      href="/automations"
                      className="text-ink underline underline-offset-4"
                    >
                      Automations
                    </Link>
                    .
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ServicePage>
  );
}
