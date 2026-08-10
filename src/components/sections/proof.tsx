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
 */
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
            We run all of this on our own business before we sell it to
            yours.
          </h2>

          <div className="mt-7 flex flex-col gap-5">
            <p className="text-ink-dim max-w-[62ch] leading-[1.6]">
              The emails and posts we send are assigned by live experiments —
              which subject line, which style, which format — and judged on
              what actually came back.
            </p>

            <p className="text-ink-dim max-w-[62ch] leading-[1.6]">
              The evidence said our video posts reached about half as many
              people as our plain ones.{" "}
              <span className="text-ink font-semibold">We retired video.</span>
            </p>

            <p className="text-ink-dim max-w-[62ch] leading-[1.6]">
              A bug was inflating our own reply rate. We found it, repaired
              the data, and revised the number down — twice.{" "}
              <span className="text-ink font-semibold">
                That is the standard we hold your numbers to.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
