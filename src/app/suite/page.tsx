import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { dashboardUrl, registerUrl } from "@/lib/dashboard";

/**
 * /suite — what the APP does, module by module.
 *
 * The app is the self-serve line (see /studio for the done-for-you one).
 * This page is a catalogue with a hard honesty rule: everything under
 * "Live now" is verifiable against the dashboard today, and everything
 * under "Not yet available" says exactly that. This site has never
 * advertised an unshipped feature and does not start here — a coming
 * module is listed so a visitor can REQUEST it from their dashboard,
 * which is how the next build gets decided. Same list as the app's own
 * Suite page (config/suite.php in the dashboard); change one, change both.
 */
export const metadata: Metadata = {
  title: "What the Flowstack app does, module by module",
  description:
    "Website chat, knowledge base, lead capture, live takeover, analytics and your own engine key — live today. Booking, WhatsApp, inbox and email automation — not yet, request them.",
  alternates: { canonical: "/suite" },
  openGraph: {
    images: OG_IMAGES,
    title: "What the Flowstack app does, module by module",
    url: "/suite",
    description:
      "What's live in the app today, what's not yet available, and where to ask for it.",
  },
};

const live = [
  {
    name: "Website chat",
    body: "Answers visitors from your own material, in their language — on your site and on a hosted chat page.",
  },
  {
    name: "Knowledge base",
    body: "Upload documents and pages; the chat answers from them and shows where the answer came from.",
  },
  {
    name: "Lead capture & scoring",
    body: "Every conversation that gives a name or an email lands on your board, scored, transcript attached.",
  },
  {
    name: "Live takeover",
    body: "Step into any chat as yourself. The visitor sees a human; the agent waits until you hand back.",
  },
  {
    name: "Analytics & the Monday summary",
    body: "Conversations, leads and capture rate per agent, and one summary in your inbox every Monday.",
  },
  {
    name: "Your own engine key",
    body: "From Growth up, run premium engines on your own OpenAI, Anthropic or Google key — no credits spent.",
  },
] as const;

const coming = [
  {
    name: "Booking & appointments",
    body: "The chat checks your calendar, books the slot, sends the confirmation and the reminder.",
  },
  {
    name: "WhatsApp channel",
    body: "The same agent on your WhatsApp Business number, transcript on the same board.",
  },
  {
    name: "Inbox & portal enquiries",
    body: "Enquiries arriving by email — booking portals, listing sites, your contact form — routed to the agent.",
  },
  {
    name: "Email automation",
    body: "Follow-ups, reminders and reactivation to people who already know you, from your own address.",
  },
  {
    name: "One live view",
    body: "Your numbers from the tools they are scattered across, in one dashboard that refreshes itself.",
  },
] as const;

export default function SuitePage() {
  return (
    <>
      <PageHero
        eyebrow="The app"
        title={
          <>
            What the app does —{" "}
            <span className="text-gradient">module by module.</span>
          </>
        }
        lead="The chat you run yourself. Free to start, live in about a minute, €9 to €39 a month after that. Here is what is in it today, and what is not yet."
        ctas={[
          { href: registerUrl(), label: "Start free →", variant: "primary" },
          { href: "/pricing", label: "See the plans", variant: "secondary" },
        ]}
      />

      <Tldr
        rows={[
          {
            k: "Live today",
            v: "Website chat, knowledge base, lead capture and scoring, live takeover, analytics, your own engine key.",
          },
          {
            k: "Not yet",
            v: "Booking, WhatsApp, inbox enquiries, email automation, one live view. Request them from your dashboard; we build in the order people ask.",
          },
          {
            k: "Need it now",
            v: (
              <>
                The{" "}
                <Link
                  href="/studio"
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  Studio
                </Link>{" "}
                sets all of it up for you — separately quoted, separately invoiced.
              </>
            ),
          },
        ]}
      />

      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="LIVE" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-8 flex flex-col gap-3">
            <span className="bp-ref text-violet">live now · every plan unless stated</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              In the app today.
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2 lg:grid-cols-3">
            {live.map((m) => (
              <li key={m.name} className="bg-bg flex flex-col gap-3 px-7 py-8">
                <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                  {m.name}
                </h3>
                <p className="text-ink-dim max-w-[40ch] leading-[1.6]">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NOT AVAILABLE, in those words. The only action is to ask for it. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line mb-8 flex flex-col gap-3 border-t pt-10">
            <span className="bp-ref text-violet">not yet available · request it</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Not in the app yet.
            </h2>
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              None of these work today. Sign in, open{" "}
              <a
                href={dashboardUrl("/suite")}
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                Suite
              </a>{" "}
              in your dashboard and press Request on the ones you need — we
              build in that order and email you when yours is ready.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2 lg:grid-cols-3">
            {coming.map((m) => (
              <li key={m.name} className="bg-bg-elev flex flex-col gap-3 px-7 py-8">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-ink text-lg font-semibold tracking-[-0.02em]">
                    {m.name}
                  </h3>
                  <span className="bp-ref shrink-0">coming</span>
                </div>
                <p className="text-ink-dim max-w-[40ch] leading-[1.6]">{m.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Free to start, no card.{" "}
              <span className="text-ink font-semibold">
                Live on your own site in about a minute.
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={registerUrl()} className={ctaClass()}>
                Start free →
              </a>
              <Link href="/studio" className={ctaClass({ variant: "ghost" })}>
                Or have the Studio do it
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
