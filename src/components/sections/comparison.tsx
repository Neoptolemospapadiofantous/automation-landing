import { SectionWatermark } from "@/components/section-watermark";

/**
 * "The same week, run twice" — by-hand column vs Flowstack column.
 * Column A figures are framed as what teams typically report in the
 * audit call (and the annotation says yours get measured, not assumed)
 * so we never present invented numbers as platform metrics.
 */
const BY_HAND: Array<[task: string, cost: string]> = [
  ["Answer the overnight inbox, one by one", "~2h / day"],
  ["Chase follow-ups from a spreadsheet", "~4h / wk"],
  ["Re-key CRM records from email threads", "~3h / wk"],
  ["Rebuild the Monday report from 4 tools", "~2h / wk"],
  ["Qualify leads after they've gone cold", "lost deals"],
];

const WITH_FLOWSTACK: Array<[task: string, cost: string]> = [
  ["Chat answers every inbound as it lands", "0h"],
  ["Follow-up sequences run themselves", "0h"],
  ["Records sync between tools automatically", "0h"],
  ["The report is a live dashboard, always current", "0h"],
  ["Leads qualified in the conversation, routed warm", "same minute"],
];

function Column({
  label,
  rows,
  accent,
}: {
  label: string;
  rows: Array<[string, string]>;
  accent?: boolean;
}) {
  return (
    <div className={accent ? "bg-bg-elev" : "bg-bg"}>
      <header
        className={`border-border-line border-b px-6 py-4 font-mono text-[11px] tracking-[0.22em] uppercase ${
          accent ? "text-violet" : "text-ink-mute"
        }`}
      >
        {label}
      </header>
      <ul className="py-2">
        {rows.map(([task, cost]) => (
          <li
            key={task}
            className={`border-border-line grid grid-cols-[1fr_auto] items-baseline gap-4 border-b px-6 py-3 text-sm last:border-b-0 ${
              accent ? "text-ink" : "text-ink-dim"
            }`}
          >
            <span>{task}</span>
            <span
              className={`whitespace-nowrap font-mono text-[12px] tabular-nums ${
                accent ? "text-violet" : "text-ink-mute"
              }`}
            >
              {cost}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Comparison() {
  return (
    <section id="versus" className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="VS" size="sm" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-hi flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref text-violet">S/06</span>
            <h2 className="text-ink mt-4 max-w-[22ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              The same week, run twice.
            </h2>
          </div>
          <span className="bp-annot hidden sm:block">{"// by hand vs flowstack"}</span>
        </div>

        <div className="border-border-hi mt-10 grid grid-cols-1 gap-px border bg-border-hi md:grid-cols-2">
          <Column label="A — by hand" rows={BY_HAND} />
          <Column label="B — flowstack" rows={WITH_FLOWSTACK} accent />
        </div>

        <p className="bp-annot mt-5">
          {"// column A times are what teams typically report in the audit call — yours get measured, not assumed"}
        </p>
      </div>
    </section>
  );
}
