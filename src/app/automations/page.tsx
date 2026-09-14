import type { Metadata } from "next";
import Link from "next/link";
import { OG_IMAGES } from "@/lib/seo";
import { ServicePage, type ServiceStep } from "@/components/service-page";
import { serviceBySlug } from "@/lib/content";

/**
 * /automations — the Automations service (was /email-automation; renamed
 * 2026-09-13 and broadened from email to the CRM, invoices, inbox and
 * reports, with a permanent redirect).
 *
 * The not-a-cold-list line (`isnt`) is load-bearing: this writes to people
 * who already know the business, from its own address. Finding new
 * customers is Lead generation. Unpriced.
 */
export const metadata: Metadata = {
  title: "Email & CRM automation for small businesses",
  description:
    "Follow-ups, reminders and invoice chasers that send themselves, from your own address and wired into your CRM. Live in 2–4 weeks. Fixed price after a free call.",
  alternates: {
    canonical: "/automations",
    languages: {
      en: "/automations",
      el: "/el/automations",
      "x-default": "/automations",
    },
  },
  openGraph: {
    images: OG_IMAGES,
    title: "Email & CRM automation for small businesses — Flowstack",
    url: "/automations",
    description:
      "Follow-ups, reminders and invoice chasers that send themselves, wired into your CRM. Fixed price after a free call.",
  },
};

const steps: readonly ServiceStep[] = [
  {
    ref: "EM-01",
    title: "You show us what you do by hand",
    body: "Half an hour: the follow-ups you forget, the reminders you retype, the invoices you chase on Fridays.",
  },
  {
    ref: "EM-02",
    title: "We write it in your words",
    body: "Every message is yours, shaped by us. You approve each one before anything sends.",
  },
  {
    ref: "EM-03",
    title: "We wire it to your tools",
    body: "Your CRM, inbox, calendar and invoicing. It runs when the trigger happens, not when someone remembers.",
  },
  {
    ref: "EM-04",
    title: "You watch it run",
    body: "Every send is logged. Replies land in your own inbox, as always.",
  },
];

export default function AutomationsPage() {
  return (
    <ServicePage
      service={serviceBySlug("automations")}
      watermark="AUTO"
      steps={steps}
      title={
        <>
          The work you push by hand,{" "}
          <span className="text-gradient">done for you.</span>
        </>
      }
    >
      <section className="relative pb-16">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
            <span className="bp-ref text-violet">live reports</span>
            <p className="text-ink-dim mt-4 max-w-[62ch] leading-[1.6]">
              Want to see the numbers every tool keeps apart, in one place?{" "}
              <Link
                href="/what-works"
                className="text-ink inline-block py-1.5 underline underline-offset-4"
              >
                How live reports work
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </ServicePage>
  );
}
