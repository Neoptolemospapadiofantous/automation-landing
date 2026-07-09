/**
 * Automation ticker — a thin marquee strip under the hero cycling the
 * kinds of runs the platform executes. Content is generic capability
 * vocabulary (no invented metrics, no client names). The track is
 * rendered twice for a seamless -50% CSS loop (see .tick-track in
 * globals.css); aria-hidden because it's decorative reinforcement of
 * copy that exists elsewhere on the page.
 */
const ITEMS = [
  "follow-up sequence sent",
  "crm record synced",
  "lead enriched",
  "report rebuilt",
  "invoice chased",
  "ticket triaged",
  "demo booked",
  "data pipeline run",
  "inbox answered",
  "handoff routed",
];

export function Ticker() {
  return (
    <div
      aria-hidden
      className="ticker-strip border-border-hi overflow-hidden border-y"
    >
      <div className="tick-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-ink-dim whitespace-nowrap py-3.5 font-mono text-[12px] tracking-[0.14em] uppercase after:mx-6 after:text-violet after:content-['·']"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
