"use client";

import { useEffect, useRef, useState } from "react";

const ROWS = ["1", "2", "3", "4", "5", "6"];

/**
 * Persistent drawing-sheet furniture rendered over the whole site:
 * a sheet border, a left coordinate ruler, a revision stamp, a live
 * scroll-position readout, and a cursor crosshair reticle. Decorative —
 * pointer-events-none, hidden on touch / small screens.
 */
export function BlueprintChrome() {
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const posRef = useRef<HTMLSpanElement>(null);
  const [reticleOn, setReticleOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    let pending = false;
    const flush = () => {
      pending = false;
      if (vRef.current) vRef.current.style.transform = `translateX(${x}px)`;
      if (hRef.current) hRef.current.style.transform = `translateY(${y}px)`;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(flush);
      }
      setReticleOn(true);
    };
    const onLeave = () => setReticleOn(false);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let pending = false;
    const flush = () => {
      pending = false;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const pct = max > 0 ? Math.round((y / max) * 100) : 0;
      if (posRef.current) {
        posRef.current.textContent = `Y ${String(Math.round(y)).padStart(
          5,
          "0",
        )} · ${String(pct).padStart(2, "0")}%`;
      }
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(flush);
    };
    flush();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden sm:block"
    >
      {/* sheet border */}
      <div className="border-border-line/55 absolute inset-3 border" />

      {/* corner ticks */}
      <span className="border-draw/60 absolute left-3 top-3 h-4 w-4 border-l border-t" />
      <span className="border-draw/60 absolute right-3 top-3 h-4 w-4 border-r border-t" />
      <span className="border-draw/60 absolute bottom-3 left-3 h-4 w-4 border-b border-l" />
      <span className="border-draw/60 absolute bottom-3 right-3 h-4 w-4 border-b border-r" />

      {/* left coordinate ruler */}
      <div className="absolute bottom-3 left-3 top-3 hidden w-6 flex-col items-center justify-between py-10 lg:flex">
        {ROWS.map((r) => (
          <span key={r} className="bp-annot text-ink-mute/70 text-[9px]">
            {r}
          </span>
        ))}
      </div>

      {/* revision stamp */}
      <div className="absolute bottom-8 right-8 hidden -rotate-[5deg] md:block">
        <div className="border-draw/45 text-draw/70 border px-3 py-2 text-center font-mono uppercase">
          <div className="text-[11px] font-bold tracking-[0.3em]">Approved</div>
          <div className="border-draw/30 mt-1 border-t pt-1 text-[8px] tracking-[0.18em]">
            Flowstack · Rev A
          </div>
          <div className="text-[8px] tracking-[0.18em]">FS-2026 · 1:1</div>
        </div>
      </div>

      {/* scroll-position readout */}
      <div className="absolute bottom-9 left-8 hidden items-center gap-2 md:flex">
        <span className="bp-ref text-[9px]">Pos</span>
        <span ref={posRef} className="bp-annot text-[10px]">
          Y 00000 · 00%
        </span>
      </div>

      {/* cursor crosshair reticle */}
      <div
        ref={vRef}
        className={`bg-violet/20 absolute left-0 top-0 h-full w-px transition-opacity duration-300 ${
          reticleOn ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translateX(-100px)" }}
      />
      <div
        ref={hRef}
        className={`bg-violet/20 absolute left-0 top-0 h-px w-full transition-opacity duration-300 ${
          reticleOn ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translateY(-100px)" }}
      />
    </div>
  );
}
