import { SectionWatermark } from "@/components/section-watermark";

/**
 * The end-to-end story as four stations on one transmission line.
 * ST-01 names the two real deploy channels (§3.4: Website widget +
 * Hosted chat page) so the channels claim stays on the homepage.
 */
const STAGES = [
  {
    ref: "ST-01 / intake",
    title: "Chat answers the front door",
    body: "Every visitor answered from your own knowledge, instantly — website widget or hosted chat page.",
  },
  {
    ref: "ST-02 / automate",
    title: "The busywork runs itself",
    body: "Follow-ups sent, records synced, workflows triggered — scoped to your stack.",
  },
  {
    ref: "ST-03 / aggregate",
    title: "Data pulled into one place",
    body: "Pipelines collect what's scattered across your tools into one source of truth.",
  },
  {
    ref: "ST-04 / display",
    title: "One live view",
    body: "Conversations, leads and every run on a real-time dashboard, fully audited.",
  },
] as const;

export function Pipeline() {
  return (
    <section id="pipeline" className="relative isolate overflow-hidden py-24">
      <SectionWatermark text="FLOW" size="sm" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-hi flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref text-violet">S/03</span>
            <h2 className="text-ink mt-4 max-w-[26ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              One pipeline, client-facing to in-house.
            </h2>
          </div>
          <span className="bp-annot hidden sm:block">{"// how it runs"}</span>
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
              <h3 className="text-ink mt-2.5 text-[15.5px] font-semibold tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="text-ink-mute mt-2 text-[13px] leading-[1.6]">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="bp-annot mt-5">
          {"// it's the same automation stack we run Flowstack's own growth on"}
        </p>
      </div>
    </section>
  );
}
