import { SectionWatermark } from "@/components/section-watermark";

/**
 * The end-to-end story as four stations on one transmission line —
 * one station per thing we sell, in the order a customer meets them.
 * ST-02 names the two real deploy channels (§3.4: Website widget +
 * Hosted chat page) so the channels claim stays on the homepage; the
 * phone assistant is named separately because it is built to order.
 */
const STAGES = [
  {
    ref: "ST-01 / find",
    title: "New leads come in",
    body: "Cold email to companies that fit you, from your own address.",
  },
  {
    ref: "ST-02 / answer",
    title: "Every enquiry answered",
    body: "Chat on your site or hosted page, and a phone assistant we build for you.",
  },
  {
    ref: "ST-03 / follow up",
    title: "Follow-up runs itself",
    body: "Call-back, SMS, CRM updated, reminders and invoices sent.",
  },
  {
    ref: "ST-04 / report",
    title: "You see the result",
    body: "One live report, already built.",
  },
] as const;

export function Pipeline() {
  return (
    <section id="pipeline" className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="FLOW" size="sm" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-ink flex flex-wrap items-end justify-between gap-4 border-b-[1.5px] pb-5">
          <div>
            <span className="bp-ref text-violet">S/03</span>
            <h2 className="text-ink mt-4 max-w-[26ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              From first contact to paid invoice.
            </h2>
          </div>
        </div>

        {/* transmission line with station markers */}
        <div aria-hidden className="mt-12">
          <svg viewBox="0 0 1200 60" fill="none" className="block h-auto w-full">
            <line x1="24" y1="30" x2="1176" y2="30" stroke="var(--line-strong)" strokeWidth="1" />
            <line x1="24" y1="30" x2="1176" y2="30" stroke="var(--violet)" strokeWidth="1.5" strokeDasharray="10 14" />
            <g stroke="var(--border-hi)" strokeWidth="1">
              <rect x="18" y="24" width="12" height="12" fill="var(--bg)" />
              <rect x="405" y="24" width="12" height="12" fill="var(--bg)" />
              <rect x="792" y="24" width="12" height="12" fill="var(--bg)" />
              <rect x="1170" y="24" width="12" height="12" fill="var(--violet)" stroke="var(--violet)" />
            </g>
          </svg>
        </div>

        <div className="border-border-line -mt-px grid grid-cols-1 gap-px border bg-border-line md:grid-cols-4">
          {STAGES.map((s) => (
            <div key={s.ref} className="bg-bg px-5 py-6">
              <span className="bp-ref text-ink-dim">{s.ref}</span>
              <h3 className="text-ink mt-2.5 text-[15px] font-semibold tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="text-ink-mute mt-2 text-[13px] leading-[1.6]">{s.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
