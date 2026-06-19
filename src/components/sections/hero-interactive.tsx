"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Schematic node copy. Generic labels only — no third-party service
 * names so we don't imply integrations we haven't shipped.
 */
const NODES = [
  { label: "TRIGGER", title: "New inbound message", sub: "any channel" },
  { label: "ENRICH",  title: "Qualify on your ICP", sub: "context-aware" },
  { label: "ROUTE",   title: "Score & assign",      sub: "right person" },
  { label: "ACT",     title: "Notify + book",       sub: "in your stack" },
] as const;

export function HeroSchematic() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % NODES.length);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const lit = hover ?? active;

  return (
    <div className="ambient-float glass-strong relative">
      {/* corner registration ticks */}
      <span className="border-accent-line absolute -left-px -top-px h-3 w-3 border-l border-t" />
      <span className="border-accent-line absolute -right-px -top-px h-3 w-3 border-r border-t" />
      <span className="border-accent-line absolute -bottom-px -left-px h-3 w-3 border-b border-l" />
      <span className="border-accent-line absolute -bottom-px -right-px h-3 w-3 border-b border-r" />

      {/* status stamp — floating outside the top-right corner */}
      <span
        aria-hidden
        className="ins-stamp pointer-events-none absolute -right-3 -top-4 z-10 hidden sm:inline-block"
      >
        Live
      </span>

      {/* filename / status bar */}
      <div className="border-border-line flex items-center gap-3 border-b px-5 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase">
        <span className="bp-ref">FIG. 1</span>
        <span className="text-ink-mute hidden truncate sm:inline">
          lead-routing.flow
        </span>
        <span className="text-success ml-auto inline-flex items-center gap-2">
          <span className="bg-success pulse-glow inline-block h-1.5 w-1.5 rounded-full" />
          DEMO
        </span>
      </div>

      {/* schematic body — vertical flow */}
      <div className="bg-grid bg-grid-pan bg-grid-fade px-6 py-7">
        <ol
          onMouseLeave={() => {
            setHover(null);
            paused.current = false;
          }}
        >
          {NODES.map((n, i) => {
            const isLit = i === lit;
            return (
              <li key={n.label}>
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHover(i);
                    paused.current = true;
                  }}
                  onFocus={() => {
                    setHover(i);
                    paused.current = true;
                  }}
                  onBlur={() => {
                    setHover(null);
                    paused.current = false;
                  }}
                  className={`bp-node relative flex w-full items-center gap-4 border-l-2 p-4 text-left transition-colors duration-200 ${
                    isLit ? "border-violet bg-bg-elev" : ""
                  }`}
                >
                  <span
                    className={`bp-dot shrink-0 transition-colors ${
                      isLit ? "border-ink bg-ink/15" : ""
                    }`}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[10px] tracking-[0.22em] uppercase transition-colors ${
                        isLit ? "text-violet" : "text-ink-mute"
                      }`}
                    >
                      {n.label}
                    </span>
                    <span className="text-ink block truncate text-[14px] font-semibold tracking-tight">
                      {n.title}
                    </span>
                  </span>
                  <span className="text-ink-mute hidden shrink-0 font-mono text-[10px] tracking-[0.1em] sm:block">
                    {n.sub}
                  </span>
                  <span className="bp-ref text-ink-mute absolute right-2 top-2 text-[9px]">
                    N-0{i + 1}
                  </span>
                </button>

                {i < NODES.length - 1 && (
                  <div className="flex h-7 items-center pl-[26px]" aria-hidden>
                    <span
                      className={`block h-full w-px transition-opacity ${
                        i < lit ? "bp-wire-v opacity-100" : "bg-border-hi opacity-70"
                      }`}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {/* readout strip — describes what the schematic shows, no
          fabricated runtime numbers (latency, scores, region tags). */}
      <div className="border-border-line text-ink-mute grid grid-cols-1 border-t font-mono text-[10.5px] tracking-[0.06em] sm:grid-cols-2">
        <span className="border-border-line px-5 py-3 sm:border-r">
          schematic · agent role: lead qualification
        </span>
        <span className="text-success px-5 py-3 sm:text-right">
          configurable per workflow
        </span>
      </div>
    </div>
  );
}
