import Link from "next/link";
import { Logo } from "./logo";
import { siteMap, siteMapRoles } from "@/lib/content";
import { CookieSettingsLink } from "./cookie-settings-link";

/**
 * Footer columns, read from the shared site map so the footer, the header
 * panel and the homepage index can never disagree about what we sell.
 *
 * Every link here MUST resolve to a real page — dead "#" anchors used to be
 * a habit and broke trust on the legal column especially. If a section
 * doesn't have content yet, omit the link rather than promising it.
 *
 * The old single "Product" column mixed four services with four chat roles
 * and read as one undifferentiated list of eight. They are different things
 * — one is what you buy, the other is which job the chat does — so they get
 * their own headings.
 */
const cols = [
  siteMap.services,
  siteMapRoles,
  {
    heading: siteMap.company.heading,
    items: [
      ...siteMap.company.items,
      { href: "/audit", label: "Book the audit", desc: "" },
    ],
  },
  siteMap.legal,
];

const titleBlock = [
  { k: "Project", v: "Flowstack" },
  { k: "Client", v: "Your operation" },
  { k: "Scale", v: "1:1" },
  { k: "Rev", v: "A" },
  { k: "Sheet", v: "01" },
];

export function SiteFooter() {
  return (
    <footer className="bg-footer-grid bg-bg-elev relative mt-16">
      {/* Corner registration ticks */}
      <span
        aria-hidden
        className="border-border-hi absolute top-0 left-0 h-3 w-3 border-t border-l"
      />
      <span
        aria-hidden
        className="border-border-hi absolute top-0 right-0 h-3 w-3 border-t border-r"
      />

      {/* TITLE BLOCK — bordered grid of mono key/value cells */}
      <div className="border-border-line border-b">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="border-border-line grid grid-cols-2 border-x sm:grid-cols-3 lg:grid-cols-5">
            {titleBlock.map((cell) => (
              <div
                key={cell.k}
                className="border-border-line border-t border-r px-4 py-3 last:border-r-0 sm:border-t-0 [&:nth-child(-n+3)]:border-t-0 lg:[&:nth-child(-n+5)]:border-t-0"
              >
                <span className="bp-ref text-ink-mute block">{cell.k}</span>
                <span className="text-ink mt-1 block font-mono text-[13px] tracking-[0.06em]">
                  {cell.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[320px_1fr] lg:gap-x-16">
          {/* Identity block */}
          <div className="max-w-[320px]">
            <Link href="/" aria-label="Flowstack home">
              <Logo />
            </Link>
            <p className="text-ink-dim mt-4 text-sm leading-[1.6]">
              We answer your website, find you customers, and put your
              numbers in one place. Built to order, on the tools you already
              use.
            </p>
            <p className="bp-annot mt-5 normal-case">
              Pick a role · paste your knowledge · watch leads land
            </p>
          </div>

          {/* Link columns — hairline-divided grid, shared 1px borders, no gaps */}
          <div className="border-border-line grid grid-cols-1 border-t border-l sm:grid-cols-2 lg:grid-cols-4">
            {cols.map((c) => (
              <div
                key={c.heading}
                className="border-border-line border-r border-b px-5 py-5"
              >
                <h2 className="bp-ref text-ink-mute mb-4 flex items-center gap-2">
                  <span aria-hidden className="bp-dot" />
                  {c.heading}
                </h2>
                <ul className="space-y-1">
                  {c.items.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="text-ink-dim hover:text-ink inline-flex min-h-[24px] items-center font-mono text-[13px] tracking-[0.04em] transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer baseline: copyright + cookie-settings re-open + privacy contact */}
        <div className="border-border-line mt-16 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="bp-annot">
            © 2026 Flowstack Studio · Limassol, Cyprus · All rights
            reserved
          </p>
          <div className="bp-annot flex flex-col items-start gap-x-5 gap-y-2 sm:flex-row sm:items-center">
            {/* Greek pages live under /el — a visible way in, beyond hreflang. */}
            <Link
              href="/el"
              hrefLang="el"
              lang="el"
              className="text-ink-dim hover:text-ink inline-block py-1.5 transition-colors"
            >
              Ελληνικά
            </Link>
            <span aria-hidden className="text-ink-mute hidden sm:inline">
              ·
            </span>
            <CookieSettingsLink />
            <span aria-hidden className="text-ink-mute hidden sm:inline">
              ·
            </span>
            <a
              href="mailto:privacy@flowstack.run"
              className="text-ink-dim hover:text-ink inline-block py-1.5 transition-colors"
            >
              privacy@flowstack.run
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
