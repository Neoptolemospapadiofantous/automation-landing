import type { ReactNode } from "react";
import Link from "next/link";
import { DraftBanner } from "./draft-banner";

export type LegalSection = {
  /** Numbered ref like "§1" — displayed in mono next to the title and used as #anchor. */
  ref: string;
  title: string;
  body: ReactNode;
};

/**
 * Shared shell for the four legal scaffolds (Privacy, Terms, Security,
 * DPA). Renders a DRAFT banner, a header strip with effective + last-
 * reviewed dates, a sticky TOC on lg+ screens, and the §-numbered
 * sections. Body prose runs in Inter for readability — mono everywhere
 * works for marketing but punishes long-form reading.
 */
export function LegalDoc({
  title,
  intent,
  effective,
  reviewed,
  sections,
}: {
  /** Page title — "Privacy Policy", "Terms of Service", etc. */
  title: string;
  /** One-line plain-language summary above the section list. */
  intent: string;
  /** ISO date this draft was last edited. */
  effective: string;
  /** ISO date this draft was last reviewed (counsel or internal). */
  reviewed: string;
  sections: LegalSection[];
}) {
  return (
    <article className="relative isolate overflow-hidden pb-32 pt-16 sm:pt-24">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Header strip */}
        <header className="border-border-line border-b pb-8">
          <span className="bp-ref text-ink-mute">FLOWSTACK / LEGAL</span>
          <h1 className="text-ink mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            {title}
          </h1>
          <p className="text-ink-dim mt-5 max-w-[60ch] text-lg leading-[1.6]">
            {intent}
          </p>

          <dl className="flow-edge border-border-line mt-8 grid grid-cols-2 border font-mono text-[11px] uppercase tracking-[0.18em] sm:grid-cols-3">
            <div className="border-border-line border-r px-4 py-3">
              <dt className="text-ink-mute">Effective</dt>
              <dd className="text-ink mt-1 tabular-nums">{effective}</dd>
            </div>
            <div className="border-border-line border-r px-4 py-3">
              <dt className="text-ink-mute">Last reviewed</dt>
              <dd className="text-ink mt-1 tabular-nums">{reviewed}</dd>
            </div>
            <div className="border-border-line col-span-2 border-t px-4 py-3 sm:col-span-1 sm:border-t-0">
              <dt className="text-ink-mute">Status</dt>
              <dd className="text-ink mt-1">Draft · pending counsel</dd>
            </div>
          </dl>
        </header>

        {/* Banner + content */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* sticky TOC — only on lg+ */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Document sections"
              className="sticky top-24 border-border-line border-l pl-5"
            >
              <p className="bp-ref text-ink-mute mb-3">Contents</p>
              <ol className="space-y-2.5">
                {sections.map((s) => (
                  <li key={s.ref}>
                    <a
                      href={`#${anchor(s.ref)}`}
                      className="text-ink-dim hover:text-ink block font-mono text-[12px] leading-[1.4] tracking-[0.04em] transition-colors"
                    >
                      <span className="text-ink-mute mr-2 tabular-nums">
                        {s.ref}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0">
            <DraftBanner />

            <div className="space-y-14">
              {sections.map((s) => (
                <section
                  key={s.ref}
                  id={anchor(s.ref)}
                  className="scroll-mt-24"
                >
                  <header className="border-border-line flex items-baseline gap-4 border-b pb-3">
                    <span className="bp-ref text-ink-mute shrink-0 tabular-nums">
                      {s.ref}
                    </span>
                    <h2 className="text-ink text-xl font-semibold tracking-[-0.02em]">
                      {s.title}
                    </h2>
                  </header>
                  <div className="legal-prose text-ink-dim mt-5 max-w-[70ch] text-[15px] leading-[1.7]">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer — back to the cross-links between legal docs */}
            <nav
              aria-label="Other legal documents"
              className="border-border-line mt-20 border-t pt-6"
            >
              <p className="bp-ref text-ink-mute mb-4">Related</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] tracking-[0.04em]">
                <CrossLink href="/privacy" label="Privacy Policy" />
                <CrossLink href="/terms" label="Terms of Service" />
                <CrossLink href="/security" label="Security" />
                <CrossLink href="/dpa" label="Data Processing Agreement" />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </article>
  );
}

function CrossLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-ink-dim hover:text-ink underline-offset-4 transition-colors hover:underline"
      >
        {label}
      </Link>
    </li>
  );
}

/** "§1" → "section-1"; "§3.2" → "section-3-2". Stable anchor ids. */
function anchor(ref: string): string {
  return (
    "section-" +
    ref
      .replace(/§/g, "")
      .trim()
      .replace(/\./g, "-")
  );
}
