import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Tldr } from "@/components/tldr";
import { SectionWatermark } from "@/components/section-watermark";
import { ctaClass } from "@/components/ui/button";
import { FREE_CALL, FREE_CALL_EL, type Service } from "@/lib/content";

/**
 * One template for the four service pages (plan, 2026-09-13).
 *
 * Every service page answers the same six questions in the same order, so
 * a buyer comparing two services compares like with like:
 *   what it is (hero lead) · who it's for · what it costs · how long it
 *   takes (TL;DR) · what you get · how to start (closing).
 *
 * The words come from `services` in lib/content.ts — the page supplies
 * only its headline, its "how it works" steps and any section of its own.
 * `copy` carries the labels, so the Greek pages reuse this component with
 * their own set (the AuditForm copy-prop pattern) instead of forking it.
 */
export type ServicePageCopy = {
  whoFor: string;
  cost: string;
  time: string;
  whatYouGet: string;
  howItWorks: string;
  isnt: string;
  howToStart: string;
  /** What the free call is, in this language. */
  callWhat: string;
};

export const SERVICE_PAGE_EN: ServicePageCopy = {
  whoFor: "Who it's for",
  cost: "What it costs",
  time: "How long it takes",
  whatYouGet: "What you get.",
  howItWorks: "How it works",
  isnt: "What it isn't",
  howToStart: "How to start.",
  callWhat: FREE_CALL.what,
};

export const SERVICE_PAGE_EL: ServicePageCopy = {
  whoFor: "Για ποιους",
  cost: "Τι κοστίζει",
  time: "Σε πόσο καιρό",
  whatYouGet: "Τι παίρνετε.",
  howItWorks: "Πώς δουλεύει",
  isnt: "Τι δεν είναι",
  howToStart: "Πώς ξεκινάτε.",
  callWhat: FREE_CALL_EL.what,
};

export type ServiceStep = { ref: string; title: string; body: string };

export type ServiceCta = {
  href: string;
  label: string;
  short?: string;
  variant?: "primary" | "secondary";
};

const DEFAULT_CTAS: ServiceCta[] = [
  {
    href: FREE_CALL.href,
    label: `${FREE_CALL.label} →`,
    short: `${FREE_CALL.short} →`,
  },
];

export function ServicePage({
  service,
  title,
  watermark,
  steps,
  ctas = DEFAULT_CTAS,
  copy = SERVICE_PAGE_EN,
  languageLink,
  children,
}: {
  service: Service;
  title: React.ReactNode;
  watermark: string;
  steps?: readonly ServiceStep[];
  ctas?: ServiceCta[];
  copy?: ServicePageCopy;
  /** The twin page in the other language, shown after the closing CTAs. */
  languageLink?: { href: string; label: string; hrefLang: "en" | "el" };
  children?: React.ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow={service.name}
        eyebrowTint="violet"
        title={title}
        lead={service.oneLiner}
        ctas={ctas}
      />

      <Tldr
        rows={[
          { k: copy.whoFor, v: service.forWho },
          { k: copy.cost, v: service.cost },
          { k: copy.time, v: service.time },
        ]}
      />

      <section className="relative isolate overflow-hidden pb-16">
        <SectionWatermark text={watermark} />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-1 gap-8 border-t pt-10 lg:grid-cols-[1fr_1fr]">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              {copy.whatYouGet}
            </h2>
            <ul className="flex flex-col gap-3">
              {service.get.map((g) => (
                <li
                  key={g}
                  className="text-ink flex items-start gap-3 leading-[1.55]"
                >
                  <span className="bp-dot mt-2 shrink-0" aria-hidden />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-ink-dim mt-8 max-w-[70ch] text-sm leading-[1.6]">
            <span className="bp-ref text-ink-mute mr-2">{copy.isnt}</span>
            {service.isnt}
          </p>
        </div>
      </section>

      {steps && steps.length > 0 && (
        <section className="relative pb-16">
          <div className="mx-auto max-w-[1280px] px-6">
            <span className="bp-ref text-violet">{copy.howItWorks}</span>
            <ol className="border-border-line bg-border-line mt-4 grid grid-cols-1 gap-px border sm:grid-cols-2">
              {steps.map((s) => (
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
      )}

      {children}

      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-col items-start gap-5 border-t pt-10">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              {copy.howToStart}
            </h2>
            <p className="text-ink-dim max-w-[56ch] leading-[1.6]">
              {copy.callWhat}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {ctas.map((c) => (
                <Link
                  key={c.href + c.label}
                  href={c.href}
                  className={ctaClass(
                    c.variant === "secondary" ? { variant: "ghost" } : {},
                  )}
                >
                  {c.short ? (
                    <>
                      <span className="sm:hidden">{c.short}</span>
                      <span className="hidden sm:inline">{c.label}</span>
                    </>
                  ) : (
                    c.label
                  )}
                </Link>
              ))}
            </div>
            {languageLink && (
              <Link
                href={languageLink.href}
                hrefLang={languageLink.hrefLang}
                className="bp-annot inline-block py-1.5 normal-case underline underline-offset-4"
              >
                {languageLink.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
