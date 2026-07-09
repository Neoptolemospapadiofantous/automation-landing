"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Audit-trail section — an activity.log that appends rows when scrolled
 * into view, one per ~0.9s, latest row highlighted. Sells "every run
 * audited" by showing the artifact instead of claiming it. The rows are
 * ILLUSTRATIVE (labelled as such in the bar) — capability vocabulary
 * only, no invented client data or metrics. Reduced motion renders the
 * full log statically.
 */
const LOG: Array<[time: string, message: string]> = [
  ["09:02:11", "inbound answered — pricing question, knowledge base §4"],
  ["09:02:38", "lead captured → qualified on ICP · routed to your team"],
  ["09:04:02", "automation: crm-sync — 3 records updated"],
  ["09:11:47", "automation: follow-up-day-3 — 12 emails queued"],
  ["09:15:20", "pipeline: tools → warehouse — rows aggregated"],
  ["09:15:22", "dashboard refreshed — one live view, all sources"],
  ["09:23:05", "inbound answered — booking request → calendar hold"],
  ["09:23:06", "handoff: human requested → escalated with transcript"],
];

export function RunLog() {
  const listRef = useRef<HTMLOListElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        if (reduced) {
          // No append choreography — the full log lands at once.
          setShown(LOG.length);
          return;
        }
        timer = setInterval(() => {
          setShown((n) => {
            if (n + 1 >= LOG.length && timer) clearInterval(timer);
            return Math.min(n + 1, LOG.length);
          });
        }, 900);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <section id="audit-trail" className="relative isolate overflow-hidden py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-hi flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref text-violet">S/04</span>
            <h2 className="text-ink mt-4 max-w-[24ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Every run leaves a paper trail.
            </h2>
          </div>
          <span className="bp-annot hidden sm:block">
            {"// the audit log, as your team sees it"}
          </span>
        </div>

        <div className="glass-strong border-border-hi relative mt-10 border">
          {/* corner ticks */}
          <span className="border-accent-line absolute -left-px -top-px h-3 w-3 border-l border-t" />
          <span className="border-accent-line absolute -right-px -top-px h-3 w-3 border-r border-t" />
          <span className="border-accent-line absolute -bottom-px -left-px h-3 w-3 border-b border-l" />
          <span className="border-accent-line absolute -bottom-px -right-px h-3 w-3 border-b border-r" />

          <div className="border-border-line flex items-center gap-3 border-b px-5 py-3 font-mono text-[10.5px] tracking-[0.18em] uppercase">
            <span className="text-violet">FIG. 2</span>
            <span className="text-ink-mute">activity.log — illustrative</span>
            <span className="text-ink ml-auto inline-flex items-center gap-2">
              <span className="bg-violet pulse-glow inline-block h-1.5 w-1.5" />
              APPENDING
            </span>
          </div>

          <ol
            ref={listRef}
            aria-label="Illustrative automation activity log"
            className="min-h-[280px] py-4 font-mono"
          >
            {LOG.map(([time, message], i) => {
              const visible = i < shown;
              const hot = i === shown - 1;
              return (
                <li
                  key={time}
                  className={`grid grid-cols-[76px_1fr_auto] items-baseline gap-4 border-l-2 px-5 py-2 text-[12.5px] transition-all duration-300 sm:gap-6 ${
                    visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
                  } ${hot ? "border-l-violet bg-violet/10 text-ink" : "border-l-transparent text-ink-dim"}`}
                >
                  <span className="text-ink-mute tabular-nums">{time}</span>
                  <span>{message}</span>
                  <span className="text-violet text-[11px] tracking-[0.14em]">OK ✓</span>
                </li>
              );
            })}
          </ol>

          <div className="border-border-line text-ink-mute flex flex-wrap justify-between gap-3 border-t px-5 py-3 font-mono text-[10.5px] tracking-[0.1em] uppercase">
            <span>every automation run: who triggered it · what ran · what came back</span>
            <span className="text-ink-dim tabular-nums">{shown} runs shown</span>
          </div>
        </div>
      </div>
    </section>
  );
}
