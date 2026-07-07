import { Logo } from "./logo";
import { CookieSettingsLink } from "./cookie-settings-link";

type FooterLink = { label: string; href: string };

/**
 * Footer columns. Every link here MUST resolve to a real page —
 * dead "#" anchors used to be a habit and broke trust on the legal
 * column especially. If a section doesn't have content yet, omit
 * the link rather than promising it.
 */
const cols: { h: string; l: FooterLink[] }[] = [
  {
    h: "Product",
    l: [
      { label: "Lead qualification", href: "/roles/lead-qualification" },
      { label: "Sales", href: "/roles/sales" },
      { label: "Customer support", href: "/roles/customer-support" },
      { label: "Onboarding", href: "/roles/onboarding" },
      { label: "Pricing", href: "/pricing" },
      { label: "Custom build", href: "/audit" },
    ],
  },
  {
    h: "Legal",
    l: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "DPA", href: "/dpa" },
    ],
  },
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
            <Logo />
            <p className="text-ink-dim mt-4 text-sm leading-[1.6]">
              Inbound answered around the clock — leads qualified, questions
              resolved, customers onboarded. Plus the automations and data
              pipelines behind it, built to order.
            </p>
            <p className="bp-annot mt-5">
              {"// pick a role · paste your knowledge · watch leads land"}
            </p>
          </div>

          {/* Link columns — hairline-divided grid, shared 1px borders, no gaps */}
          <div className="border-border-line grid grid-cols-1 border-t border-l sm:grid-cols-2">
            {cols.map((c) => (
              <div
                key={c.h}
                className="border-border-line border-r border-b px-5 py-5"
              >
                <h4 className="bp-ref text-ink-mute mb-4 flex items-center gap-2">
                  <span aria-hidden className="bp-dot" />
                  {c.h}
                </h4>
                <ul className="space-y-1">
                  {c.l.map((item) => (
                    <li key={item.label}>
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
            © 2026 Flowstack Studio · Nicosia, Cyprus · All rights
            reserved
          </p>
          <div className="bp-annot flex flex-col items-start gap-x-5 gap-y-2 sm:flex-row sm:items-center">
            <CookieSettingsLink />
            <span aria-hidden className="text-ink-mute hidden sm:inline">
              ·
            </span>
            <a
              href="mailto:privacy@flowstack.run"
              className="text-ink-dim hover:text-ink transition-colors"
            >
              privacy@flowstack.run
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
