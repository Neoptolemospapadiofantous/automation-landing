import { SectionWatermark } from "@/components/section-watermark";

/**
 * "We run this on ourselves first" — the credibility band.
 *
 * There are no client case studies to point at yet, so the proof has to
 * be the medicine: the same experiment loop we sell is the one running
 * our own outreach and posts, and these are the decisions it made.
 *
 * TWO RULES, both load-bearing, both learned the hard way:
 *
 * 1. Method, not traction. What we test and what we decided may be
 *    published; how many customers, signups or euros may not. The first
 *    proves rigour, the second is early-stage and undercuts us. This is
 *    the same honesty rule AGENTS.md already applies to platform counts.
 *
 * 2. No counts that decay, and no absolute volumes. The draft of this
 *    said "three experiments" — a fourth appeared the same afternoon.
 *    And the raw impression figures behind the video decision are true
 *    but small, so quoting them would sell against us while proving a
 *    point about rigour. Relative facts survive both problems: they stay
 *    true as the numbers grow, and they reveal method without revealing
 *    scale.
 *
 * Every claim here traces to a dated entry in the ecosystem ledger
 * (SHARED.md §5, 2026-08-08) so it can be substantiated if a client asks.
 *
 * Also carries the "why us" edge (moved from /studio, 2026-09-13, when the
 * Studio name left public copy). Only the two lines the heading does not
 * already say are here — "we run it on ourselves first" IS the heading,
 * and repeating it as a bullet would say one fact twice.
 */
const edge = [
  "The whole job, not a widget: website, chat and voice, automations, new customers.",
  "Greek and English, on Cyprus time. The 23:40 enquiry gets answered at 23:40.",
] as const;

export function Proof() {
  return (
    <section
      id="proof"
      className="relative isolate overflow-hidden pt-20 pb-4"
    >
      <SectionWatermark text="PROOF" />

      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line max-w-[860px] border-l-2 pl-6 sm:pl-8">
          <span className="bp-ref text-violet">on ourselves first</span>

          <h2 className="text-ink mt-4 text-2xl font-semibold tracking-[-0.03em] text-balance sm:text-3xl">
            We run this on ourselves before we sell it to you.
          </h2>

          <div className="mt-7 flex flex-col gap-5">
            <p className="text-ink-dim max-w-[62ch] leading-[1.6]">
              Our own experiments retired our video posts and revised our reply
              rate down — twice.{" "}
              <span className="text-ink font-semibold">
                That is the standard we hold your numbers to.
              </span>
            </p>
            <ul className="text-ink-dim flex max-w-[62ch] flex-col gap-2.5 leading-[1.6]">
              {edge.map((line) => (
                <li key={line} className="flex items-start gap-2.5">
                  <span className="bp-dot mt-2 shrink-0" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
