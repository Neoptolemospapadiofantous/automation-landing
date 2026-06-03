import { Logo } from "./logo";

type FooterLink = { label: string; href: string };
const cols: { h: string; l: FooterLink[] }[] = [
  {
    h: "Product",
    l: [
      { label: "Agent roles", href: "/#agents" },
      { label: "Pricing", href: "/pricing" },
      { label: "Custom build", href: "/audit" },
      { label: "Status", href: "#" },
    ],
  },
  {
    h: "Company",
    l: [
      { label: "About", href: "#" },
      { label: "Manifesto", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    h: "Resources",
    l: [
      { label: "Docs", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    h: "Legal",
    l: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "DPA", href: "#" },
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
    <footer className="bg-bg-elev relative mt-16">
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
              AI agents for sales, support, lead-qual and onboarding. Plus
              a bespoke automation studio for when off-the-shelf isn&apos;t
              enough.
            </p>
            <p className="bp-annot mt-5">
              {"// pick a role · paste your knowledge · watch leads land"}
            </p>
          </div>

          {/* Link columns — hairline-divided grid, shared 1px borders, no gaps */}
          <div className="border-border-line grid grid-cols-2 border-t border-l md:grid-cols-4">
            {cols.map((c) => (
              <div
                key={c.h}
                className="border-border-line border-r border-b px-5 py-5"
              >
                <h4 className="bp-ref text-ink-mute mb-4 flex items-center gap-2">
                  <span aria-hidden className="bp-dot" />
                  {c.h}
                </h4>
                <ul className="space-y-3">
                  {c.l.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-ink-dim hover:text-ink font-mono text-[13px] tracking-[0.04em] transition-colors"
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

        {/* Footer baseline: copyright + social, divided by a hairline */}
        <div className="border-border-line mt-16 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="bp-annot">
            © 2026 Flowstack Studio · Built in Lisbon &amp; Athens
          </p>
          <ul className="flex items-center gap-5">
            {["LinkedIn", "X", "GitHub", "RSS"].map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="text-ink-dim hover:text-ink font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
