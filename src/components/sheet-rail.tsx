"use client";

import { useEffect, useState } from "react";

/**
 * Sheet-index rail — fixed left register of the homepage's numbered
 * sections, highlighting the one in view, like the sheet list on a
 * drawing set. Renders only ≥1440px (there's no room to spare inside
 * the 1280px content column below that) and only where its targets
 * exist, so it's safe to mount site-wide from the homepage alone.
 */
const SHEETS: Array<[id: string, label: string]> = [
  ["hero", "S/01"],
  ["problems", "S/02"],
  ["pipeline", "S/03"],
  ["agents", "S/04"],
  ["custom", "S/05"],
  ["catalogue", "S/06"],
  ["plans", "S/07"],
  ["index", "S/08"],
  ["commit", "S/09"],
];

export function SheetRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const targets = SHEETS.map(([id]) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length < SHEETS.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sheet index"
      className="border-border-line fixed bottom-0 left-0 top-0 z-30 hidden w-[68px] flex-col items-center gap-0.5 border-r pb-7 pt-36 min-[1440px]:flex"
      style={{
        background:
          "linear-gradient(90deg, color-mix(in oklab, var(--bg) 94%, transparent), color-mix(in oklab, var(--bg) 55%, transparent))",
      }}
    >
      <span
        className="text-ink mb-6 font-mono text-[12px] font-bold tracking-[0.1em]"
        style={{ writingMode: "vertical-rl" }}
      >
        FLOWSTACK / A0
      </span>
      {SHEETS.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={`w-full border-l-2 py-2 text-center font-mono text-[10px] tracking-[0.14em] transition-colors ${
            active === id
              ? "border-violet text-violet"
              : "text-ink-mute hover:text-ink-dim border-transparent"
          }`}
        >
          {label}
        </a>
      ))}
      <span className="mt-auto flex flex-col items-center gap-2">
        <span aria-hidden className="bg-violet block h-1.5 w-1.5" />
        <span className="bp-ref" style={{ writingMode: "vertical-rl" }}>
          REV C · 1:1
        </span>
      </span>
    </nav>
  );
}
