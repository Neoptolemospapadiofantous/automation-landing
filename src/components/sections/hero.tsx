import Link from "next/link";
import { ProductWindow } from "./product-window";
import { registerUrl } from "@/lib/dashboard";
import { ctaClass } from "@/components/ui/button";
import { FREE_CALL } from "@/lib/content";

/**
 * Hero — "ink on paper" (2026-08 redesign): huge ink headline with the
 * marker highlight on the third beat, minimal lead, signal CTAs, the
 * three proof cells, then the product window as the proof object.
 *
 * Proof cells: three claims that are structurally true — the 48h scope
 * turnaround is the audit-page promise, the other two describe the
 * always-on product. No time-based metric is hard-coded that we can't
 * back.
 */
const proof = [
  { v: "48h", l: "free call → written fixed price", mark: true },
  { v: "24/7", l: "every enquiry answered", mark: false },
  { v: "60s", l: "to add the chat · free to start", mark: false },
] as const;

export function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden pt-14 sm:pt-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-[820px]">
          <span className="bp-ref inline-flex items-center gap-2.5">
            <span className="bp-dot" aria-hidden />
            FIG. 00 — website · chat & voice · automations · leads
          </span>

          <h1 className="hero-headline-parallax mt-7 text-[42px] leading-[1.02] font-bold tracking-[-0.045em] sm:text-[58px] lg:text-[72px]">
            <span className="block">We build your website,</span>
            <span className="text-ink-dim block">answer every enquiry,</span>
            <span className="block">
              <span className="text-gradient">and bring you customers.</span>
            </span>
          </h1>

          <p className="text-ink-dim mt-7 max-w-[47ch] text-lg leading-[1.6] text-pretty sm:text-[19px]">
            For businesses starting out, or updating an old setup.{" "}
            <span className="text-ink font-semibold sm:whitespace-nowrap">
              One team. One fixed price.
            </span>
          </p>

          <div className="mt-9 flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
            <Link
              href={FREE_CALL.href}
              className={ctaClass()}
            >
              <span className="sm:hidden">{FREE_CALL.short} →</span>
              <span className="hidden sm:inline">{FREE_CALL.label} →</span>
            </Link>
            <Link
              href={registerUrl()}
              className={ctaClass({ variant: "ghost" })}
            >
              Try the chat, free
            </Link>
          </div>
        </div>

        {/* Proof — three structurally-true claims. */}
        <dl className="border-border-hi bg-bg mt-14 grid max-w-[860px] grid-cols-1 border sm:grid-cols-3">
          {proof.map((p, i) => (
            <div
              key={p.l}
              className={`px-5 py-4 ${
                i > 0
                  ? "border-border-line border-t sm:border-t-0 sm:border-l"
                  : ""
              }`}
            >
              <dt className="text-ink text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                <span className={p.mark ? "mark-under" : undefined}>{p.v}</span>
              </dt>
              <dd className="bp-annot mt-1 normal-case">{p.l}</dd>
            </div>
          ))}
        </dl>

        {/* The proof object — Live view window over the ink band. */}
        <ProductWindow />
      </div>
    </section>
  );
}
