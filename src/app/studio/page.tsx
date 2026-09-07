import type { Metadata } from "next";
import { OG_IMAGES } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";

/**
 * /studio — the done-for-you line, kept separate from the app.
 *
 * Two lines, on purpose (founder decision 2026-09-06): the APP is the
 * self-serve chat sold at /pricing; the STUDIO is the local service line
 * — website, outreach, booking, email, one live view, ongoing care —
 * built and watched by us, quoted and invoiced separately. This page
 * owns the "customer acquisition, done for you" query family. /audit
 * keeps "custom build"; the homepage keeps the end-to-end pitch.
 *
 * It sells three things and names them: the free Leak Report (the
 * trial — a result, not a login), and two outcome packages. UNPRICED,
 * per the standing rule: package prices live on the sales sheet and
 * every engagement ends at the audit.
 */
export const metadata: Metadata = {
  title: "Customer acquisition, done for you — Cyprus",
  description:
    "The Studio: we find where your business loses customers, then answer every enquiry, fill the calendar and watch it run. Starts with a free one-page Leak Report.",
  alternates: {
    canonical: "/studio",
    languages: { en: "/studio", el: "/el/studio", "x-default": "/studio" },
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Customer acquisition, done for you — Flowstack Studio",
    url: "/studio",
    description:
      "We find where your business loses customers, then answer every enquiry, fill the calendar and watch it run. Starts with a free one-page Leak Report.",
  },
};

const leak = [
  {
    ref: "SD-01",
    title: "You give us a week of access",
    body: "Your site, your listings and the inbox enquiries land in. Read-only, with your say-so, nothing installed.",
  },
  {
    ref: "SD-02",
    title: "We measure where customers leak",
    body: "How fast enquiries get answered. How many never do. Which languages and hours arrive with nobody there.",
  },
  {
    ref: "SD-03",
    title: "You get one page",
    body: "Your numbers on top, three fixes underneath, ranked by what each one is costing you. Five working days.",
  },
  {
    ref: "SD-04",
    title: "We talk for thirty minutes",
    body: "Greek or English. Then a written price within 48 hours — yours to keep whether or not you hire us.",
  },
] as const;

const packages = [
  {
    name: "Never Miss an Enquiry",
    promise:
      "Every enquiry — site, WhatsApp, email — answered in under a minute, in the visitor's language, and booked.",
    includes: [
      "The chat on your site, live from day one, trained on your material",
      "WhatsApp and inbox enquiries routed to the same agent",
      "Booking into your calendar, with confirmation and reminder",
      "Instant answers for the twenty questions you get every day",
      "A weekly one-line report: enquiries in, answered, booked",
      "Care — we watch it, fix it, and change it a little every month",
    ],
    who: "Car-rental desks, hotels and villas, venues, studios, clinics — anyone whose customer asks at 23:40.",
  },
  {
    name: "Fill the Calendar",
    promise:
      "Everything above, plus we go and find the customers — and change what we do each month on the numbers.",
    includes: [
      "Everything in Never Miss an Enquiry",
      "Cold outreach on your own sending domain: list built and verified, sequences in your voice",
      "Email automation to people who already know you: follow-ups, reminders, reactivation",
      "One live view — your numbers in one dashboard, refreshed by itself",
      "Managed — a monthly report on what came in and what it produced, and the changes made because of it",
    ],
    who: "The same businesses once the first package has proved itself, and any firm whose next client is an email away.",
  },
] as const;

/* Why us — the edge in four lines. The stack, not a feature: nobody on the
   comparison list builds the list, mails it, answers the WhatsApp, books
   the calendar and reads the numbers monthly. We do, and we run it on
   ourselves. */
const edge = [
  "We run everything we sell on our own company first — it is how we found you.",
  "The whole loop, not a widget: chat, outreach, booking, one dashboard.",
  "Something changes every month because of the numbers. Software alone cannot promise that.",
  "Greek and English, on Cyprus time. The 23:40 enquiry gets answered at 23:40.",
] as const;

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="The Studio"
        title={
          <>
            Customer acquisition,{" "}
            <span className="text-gradient">done for you.</span>
          </>
        }
        lead="We find where your business is losing customers, fix it, and watch it run. For businesses in Limassol and across Cyprus, in Greek or English. It starts with a free one-page report."
        ctas={[{ href: "/audit", label: "Free Leak Report →", variant: "primary" }]}
      />

      <Tldr
        rows={[
          {
            k: "What it is",
            v: "The done-for-you side of Flowstack. We build it, install it and keep watching it — you never open a settings page.",
          },
          {
            k: "What it isn't",
            v: (
              <>
                The app. The chat you run yourself is a separate subscription at{" "}
                <Link
                  href="/pricing"
                  className="text-ink inline-block py-1.5 underline underline-offset-4"
                >
                  €0 to €39 a month
                </Link>
                , on your own card. Studio work is quoted and invoiced on its own.
              </>
            ),
          },
          {
            k: "What it costs",
            v: "Quoted after the free Leak Report. Fixed price before we start, and you keep everything we build.",
          },
        ]}
      />

      {/* The trial is a result, not a login — four beats, same shape as
          the other service pages. */}
      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text="LEAK" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="mb-8 flex flex-col gap-3">
            <span className="bp-ref text-violet">free · five working days</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Start with the Leak Report.
            </h2>
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              One page on where you are losing customers this month. Free,
              nothing installed, and yours to keep either way.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-px border bg-border-line border-border-line sm:grid-cols-2">
            {leak.map((s) => (
              <li key={s.ref} className="bg-bg flex flex-col gap-3 px-7 py-9">
                <span className="bp-ref text-violet">{s.ref}</span>
                <h3 className="text-ink text-xl font-semibold tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two packages, named by the outcome. No prices. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line mb-8 flex flex-col gap-3 border-t pt-10">
            <span className="bp-ref text-violet">then, one of two</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Two packages. You buy the promise, not the parts.
            </h2>
            <p className="text-ink-dim max-w-[52ch] leading-[1.6]">
              Each is a fixed set-up we know how to run. Add-ons — a website,
              invoices, inbox triage, connecting your tools — come after,
              never instead.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border bg-border-line border-border-line lg:grid-cols-2">
            {packages.map((p) => (
              <article key={p.name} className="bg-bg flex flex-col gap-5 px-7 py-9">
                <div className="flex flex-col gap-2">
                  <h3 className="text-ink text-2xl font-semibold tracking-[-0.03em]">
                    {p.name}
                  </h3>
                  <p className="text-ink-dim max-w-[46ch] leading-[1.6]">
                    {p.promise}
                  </p>
                </div>
                <ul className="text-ink-dim flex flex-col gap-2 leading-[1.5]">
                  {p.includes.map((line) => (
                    <li key={line} className="border-border-line border-l-2 pl-4">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="bp-annot normal-case mt-auto pt-2">{p.who}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why us — the AQ-03 edge. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line mb-6 flex flex-col gap-3 border-t pt-10">
            <span className="bp-ref text-violet">why us</span>
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Everyone else sells software. We run it.
            </h2>
          </div>
          <ul className="text-ink-dim flex max-w-[70ch] flex-col gap-3 leading-[1.6]">
            {edge.map((line) => (
              <li key={line} className="border-border-line border-l-2 pl-4">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The app is separate — say so where a reader might conflate them. */}
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">where the app fits</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Every Studio client runs the same chat you can start yourself at{" "}
              <Link
                href="/pricing"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                /pricing
              </Link>
              . We install it and build around it; the subscription stays
              yours. What the app does on its own, module by module, is at{" "}
              <Link
                href="/suite"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                /suite
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
              Quoted after the free Leak Report.{" "}
              <span className="text-ink font-semibold">
                Fixed price before we start, and you keep everything we build.
              </span>
            </p>
            <Link href="/audit" className={ctaClass()}>
              Free Leak Report →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
