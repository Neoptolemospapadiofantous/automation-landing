/**
 * TL;DR band — the plain-language summary that sits directly under every
 * page hero.
 *
 * The site reads as a drafting set, and a drawing set opens with a
 * legend: three labelled facts before any of the argument. That is what
 * this is. A visitor who reads nothing else on the page should still be
 * able to say what we sell, what it costs, and what to do next.
 *
 * Copy rule for the rows: one short sentence each, no jargon, no clause
 * that needs the row above it to make sense. If a row needs a comma and
 * a "which means", it is too long for this band.
 */
export type TldrRow = { k: string; v: React.ReactNode };

export function Tldr({ rows }: { rows: readonly TldrRow[] }) {
  return (
    <section aria-label="Summary" className="relative pb-14">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-hi border">
          <div className="border-border-line flex items-center gap-2.5 border-b px-5 py-3">
            <span className="bp-dot shrink-0" aria-hidden />
            <span className="text-ink font-mono text-[11px] tracking-[0.22em] uppercase">
              TL;DR
            </span>
          </div>
          <dl className="border-border-line grid grid-cols-1 sm:grid-cols-3">
            {rows.map((r, i) => (
              <div
                key={r.k}
                className={`border-border-line px-5 py-5 ${
                  i < rows.length - 1
                    ? "border-b sm:border-r sm:border-b-0"
                    : ""
                }`}
              >
                <dt className="bp-ref text-ink-mute">{r.k}</dt>
                <dd className="text-ink mt-2 max-w-[38ch] leading-[1.55]">
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
