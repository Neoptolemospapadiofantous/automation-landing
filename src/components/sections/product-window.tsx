/**
 * Product window — the hero's proof object since the 2026-08 "ink on
 * paper" redesign: a drawn browser window showing the Live view the
 * pipeline ends in, half on the paper sheet, half on an ink band
 * (S/01's one dark moment). Replaces the canvas HeroSchematic.
 *
 * All figures inside are ILLUSTRATIVE and labelled `demo data` in the
 * window chrome — this depicts the product UI, never platform counts
 * (AGENTS.md rule 2). Static server markup; zero client JS.
 */

const KPIS = [
  { label: "warm leads · this week", value: "12", delta: "▲ 4" },
  { label: "conversations handled", value: "138", delta: null },
  { label: "follow-ups sent", value: "41", delta: null },
] as const;

const ROWS = [
  {
    lead: "Elena — Coastal Villas Ltd",
    source: "website chat",
    score: 86,
    status: "warm · handed over",
    tone: "warm",
  },
  {
    lead: "Marios — Harbour Dental",
    source: "website chat",
    score: 74,
    status: "warm · follow-up sent",
    tone: "warm",
  },
  {
    lead: "Anna — TriCity Logistics",
    source: "hosted page",
    score: 52,
    status: "qualifying",
    tone: "open",
  },
  {
    lead: "Petros — Old Town Bistro",
    source: "website chat",
    score: 31,
    status: "answered · closed",
    tone: "done",
  },
] as const;

const CHIP_TONE: Record<string, string> = {
  warm: "border-[var(--signal)] bg-[color-mix(in_oklab,var(--signal)_14%,transparent)] text-violet",
  open: "border-border-hi text-ink-dim",
  done: "border-ink text-ink",
};

const SIDE = [
  { label: "Live view", on: true },
  { label: "Leads", on: false },
  { label: "Conversations", on: false },
  { label: "Reports", on: false },
  { label: "Knowledge", on: false },
] as const;

export function ProductWindow() {
  return (
    <div className="relative mt-16 pb-32 sm:mt-20">
      {/* ink band — the sheet's one dark moment; the ticker sits
          directly below so the band reads as its backdrop */}
      <span
        aria-hidden
        className="bg-ink absolute inset-x-[calc(50%-50vw)] bottom-0 h-[58%]"
      />

      <div className="border-ink relative mx-auto max-w-[1040px] border-[1.5px] bg-bg shadow-[8px_8px_0_var(--ink)]">
        {/* window chrome */}
        <div className="border-ink bg-bg-elev flex items-center gap-2 border-b-[1.5px] px-4 py-2.5">
          <span aria-hidden className="border-ink h-2 w-2 rounded-full border" />
          <span aria-hidden className="border-ink h-2 w-2 rounded-full border bg-[var(--signal)]" />
          <span aria-hidden className="border-ink h-2 w-2 rounded-full border" />
          <span className="text-ink-mute mx-auto hidden font-mono text-[11px] tracking-[0.05em] sm:block">
            app.flowstack.run/live-view
          </span>
          <span className="text-violet ml-auto font-mono text-[9.5px] tracking-[0.14em] uppercase sm:ml-0">
            product view · demo data
          </span>
        </div>

        <div className="grid min-h-[400px] grid-cols-1 md:grid-cols-[180px_1fr]">
          {/* sidebar */}
          <div className="border-border-line bg-bg-elev hidden border-r py-4 md:block">
            {SIDE.map((s) => (
              <span
                key={s.label}
                className={`block px-5 py-2 text-[13.5px] ${
                  s.on
                    ? "text-ink bg-bg font-semibold shadow-[inset_3px_0_0_var(--signal)]"
                    : "text-ink-dim"
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>

          {/* main pane — table scrolls inside its own container on
              narrow screens; the page body never scrolls sideways */}
          <div className="overflow-x-auto p-5 sm:p-6">
            <div className="grid min-w-[520px] grid-cols-3 gap-3.5">
              {KPIS.map((k) => (
                <div key={k.label} className="border-border-hi border px-4 py-3">
                  <span className="text-ink-mute block font-mono text-[9.5px] tracking-[0.12em] uppercase">
                    {k.label}
                  </span>
                  <span className="text-ink text-[26px] font-semibold tracking-[-0.02em] tabular-nums">
                    {k.value}
                    {k.delta && (
                      <span className="text-violet ml-2 text-[12px] font-semibold">
                        {k.delta}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <table className="mt-4 w-full min-w-[520px] border-collapse text-[13.5px]">
              <thead>
                <tr>
                  {["Lead", "Source", "Score", "Status"].map((h) => (
                    <th
                      key={h}
                      className="border-border-hi text-ink-mute border-b p-2.5 text-left font-mono text-[9.5px] font-medium tracking-[0.13em] uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.lead}>
                    <td className="border-border-line border-b p-2.5">{r.lead}</td>
                    <td className="border-border-line text-ink-dim border-b p-2.5">
                      {r.source}
                    </td>
                    <td className="border-border-line border-b p-2.5 font-bold tabular-nums">
                      {r.score}
                    </td>
                    <td className="border-border-line border-b p-2.5">
                      <span
                        className={`border px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] whitespace-nowrap uppercase ${CHIP_TONE[r.tone]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* the chat answering after hours — floats over the window's
            lower-right corner onto the ink band */}
        <div
          role="img"
          aria-label="Chat example: a visitor asks about delivery at 23:41 and the chat answers instantly"
          className="border-ink absolute -bottom-24 right-4 hidden w-[270px] border-[1.5px] bg-bg p-3.5 shadow-[6px_6px_0_var(--signal)] md:block lg:-right-4"
        >
          <span className="text-ink-mute font-mono text-[9.5px] tracking-[0.14em] uppercase">
            visitor · 23:41
          </span>
          <p className="border-border-hi bg-bg-elev mt-1.5 border p-2.5 text-[13px] leading-[1.45]">
            Do you deliver to Larnaca? What would it cost?
          </p>
          <span className="text-ink-mute mt-2.5 block font-mono text-[9.5px] tracking-[0.14em] uppercase">
            flowstack chat · instant
          </span>
          <p className="border-ink mt-1.5 border p-2.5 text-[13px] leading-[1.45]">
            Yes — Larnaca is covered. For your order size it&apos;s{" "}
            <span className="mark-under font-semibold">€35, next-day</span>. Want
            me to book it in?
          </p>
        </div>
      </div>
    </div>
  );
}
