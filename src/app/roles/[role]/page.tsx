import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { SectionWatermark } from "@/components/section-watermark";
import { RoleBreadcrumbJsonLd } from "@/components/jsonld";
import { rolePages } from "@/lib/content";
import { registerUrl } from "@/lib/dashboard";

/**
 * Per-role landing pages — one statically generated page per agent
 * role, targeting the query people actually type ("automated sales
 * agent", "customer support agent for website", ...). All copy comes from
 * `rolePages` in lib/content.ts; the sections below are the shared
 * factual frame (channels, dashboard, pricing) identical across roles.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return rolePages.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const r = rolePages.find((p) => p.slug === role);
  if (!r) return {};
  return {
    title: r.metaTitle,
    description: r.metaDescription,
    alternates: { canonical: `/roles/${r.slug}` },
    openGraph: {
      title: r.metaTitle,
      url: `/roles/${r.slug}`,
      description: r.metaDescription,
    },
  };
}

/* The ways the agent ships — the only channels the app actually
   surfaces today (mirrors the homepage deploy strip). */
const CHANNELS = ["Website widget", "Hosted chat page"] as const;

const DASHBOARD_CELLS = [
  {
    ref: "D-01",
    title: "Full transcripts",
    desc: "Every conversation captured end to end — read what visitors actually asked, in their words.",
  },
  {
    ref: "D-02",
    title: "Lead routing",
    desc: "Conversations that qualify become leads in the dashboard, with the context your team needs to follow up.",
  },
  {
    ref: "D-03",
    title: "Real-time view",
    desc: "Watch conversations and leads land as they happen — no exports, no waiting on a report.",
  },
] as const;

export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const r = rolePages.find((p) => p.slug === role);
  if (!r) notFound();

  const others = rolePages.filter((p) => p.slug !== r.slug);

  return (
    <>
      <RoleBreadcrumbJsonLd role={r} />

      <PageHero
        eyebrow={`${r.ref} / Agent role`}
        title={
          <>
            {r.h1} <span className="text-gradient">{r.h1Accent}</span>
          </>
        }
        lead={r.lead}
        ctas={[
          { href: registerUrl(), label: "Try it for €99 →" },
          { href: "/pricing", label: "See pricing", variant: "secondary" },
        ]}
      />

      {/* What the role does — drawing-index rows, same language as the
          homepage roles list. */}
      <section className="relative isolate overflow-hidden pb-20">
        <SectionWatermark text={r.name.split(" ")[0].toUpperCase()} size="sm" />
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              What the {r.name.toLowerCase()} agent does
            </h2>
            <span className="bp-annot hidden sm:block">
              {`// ${r.ref.toLowerCase()} · included at every tier`}
            </span>
          </div>
          <ul>
            {r.does.map((d) => (
              <li
                key={d.ref}
                className="border-border-line grid grid-cols-[auto_1fr] items-start gap-5 border-b py-7 sm:gap-8"
              >
                <span className="bp-ref text-ink-mute w-14 shrink-0 sm:w-20">
                  {d.ref}
                </span>
                <div>
                  <h3 className="text-ink text-lg font-semibold tracking-[-0.02em] sm:text-xl">
                    {d.title}
                  </h3>
                  <p className="text-ink-dim mt-1.5 max-w-[68ch] text-sm leading-[1.55]">
                    {d.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it goes live — the real channels the app surfaces, nothing invented. */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="depth-rise border-border-line relative border">
            <div className="border-border-line flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
              <span className="bp-ref text-ink">How it deploys</span>
              <span className="bp-annot">
                {"// live in 60 seconds · embed on any site"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
              {CHANNELS.map((name) => (
                <div
                  key={name}
                  className="border-border-line border-b px-5 py-5 sm:border-r sm:border-b-0 sm:[&:nth-child(2)]:border-r-0"
                >
                  <span className="text-ink block font-mono text-[13px] tracking-[0.08em] uppercase">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What you see in the dashboard. */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
            <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Every conversation, on your dashboard
            </h2>
            <span className="bp-annot hidden sm:block">
              {"// no one watches a queue"}
            </span>
          </div>
          <div className="border-border-line grid grid-cols-1 border-l sm:grid-cols-3">
            {DASHBOARD_CELLS.map((d) => (
              <div
                key={d.ref}
                className="border-border-line border-r border-b px-5 py-6"
              >
                <span className="bp-ref text-ink-mute block">{d.ref}</span>
                <h3 className="text-ink mt-2 text-base font-semibold tracking-[-0.01em]">
                  {d.title}
                </h3>
                <p className="text-ink-dim mt-1.5 text-sm leading-[1.55]">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing summary — same numbers as /pricing, no drift. */}
      <section className="relative pb-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="depth-rise border-border-line relative border px-6 py-8 sm:px-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-[52ch]">
                <h2 className="text-ink text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  From €99/mo. Cancel anytime.
                </h2>
                <p className="text-ink-dim mt-3 font-mono text-sm leading-[1.7]">
                  Starter is one agent — any role, 2,500 conversation credits
                  a month, every feature on. Operator runs up to five agents
                  with 25,000 credits. No lock-in either way.
                </p>
                <p className="bp-annot mt-4">
                  {"// need it wired into your CRM or internal tools? "}
                  <Link
                    href="/audit"
                    className="text-draw hover:text-violet underline-offset-4 hover:underline"
                  >
                    book a custom build →
                  </Link>
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <Link
                  href={registerUrl()}
                  className="btn-grad inline-flex items-center px-6 py-4 text-xs font-semibold tracking-[0.18em] uppercase"
                >
                  Try it for €99 →
                </Link>
                <Link
                  href="/pricing"
                  className="text-ink-dim hover:text-ink font-mono text-[12px] tracking-[0.08em] uppercase transition-colors"
                >
                  Full pricing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links — the other three roles. */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line border-b pb-4">
            <span className="bp-ref">Other roles on the sheet</span>
          </div>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/roles/${o.slug}`}
                  className="group border-border-line hover:bg-bg-elev/60 grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b py-5 transition-colors sm:gap-8"
                >
                  <span className="bp-ref text-ink-mute group-hover:text-violet w-14 shrink-0 transition-colors sm:w-20">
                    {o.ref}
                  </span>
                  <span className="text-ink text-base font-semibold tracking-[-0.01em] sm:text-lg">
                    {o.name}
                  </span>
                  <span
                    aria-hidden
                    className="text-ink-mute group-hover:text-violet font-mono text-lg transition-colors"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
