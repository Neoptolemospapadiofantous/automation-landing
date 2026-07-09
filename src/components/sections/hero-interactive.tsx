"use client";

import { useEffect, useRef } from "react";

/**
 * Hero schematic — the whole positioning as one moving drawing. Wires
 * plotter-draw themselves on mount, then particles flow continuously
 * from INBOUND / YOUR TOOLS through AUTOMATE / AGGREGATE into LIVE
 * VIEW. Canvas, no libraries; generic node labels only — no third-party
 * service names so we don't imply integrations we haven't shipped.
 * Reduced motion: wires render complete and static, no particles.
 */

const W = 620;
const H = 380;

type Node = { x: number; y: number; label: string; sub: string; hot?: boolean };

const NODES: Node[] = [
  { x: 90, y: 70, label: "INBOUND", sub: "chat on your site" },
  { x: 90, y: 190, label: "YOUR TOOLS", sub: "crm · sheets · inbox" },
  { x: 310, y: 130, label: "AUTOMATE", sub: "the busywork runs" },
  { x: 310, y: 250, label: "AGGREGATE", sub: "one source of truth" },
  { x: 520, y: 190, label: "LIVE VIEW", sub: "audited · real-time", hot: true },
];

const WIRES: Array<[number, number]> = [[0, 2], [1, 3], [2, 4], [3, 4], [2, 3]];

export function HeroSchematic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const YELLOW = styles.getPropertyValue("--violet").trim() || "#F5C518";
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const parts = WIRES.map((w, i) => ({ w, p: (i * 0.21) % 1 }));
    let raf = 0;
    let t0: number | null = null;

    const wirePath = (a: Node, b: Node) => {
      const ax = a.x + 62;
      const bx = b.x - 62;
      return { ax, ay: a.y, bx, by: b.y, mx: (ax + bx) / 2 };
    };

    const drawNode = (n: Node, glow: boolean) => {
      ctx.strokeStyle = n.hot
        ? YELLOW
        : glow
          ? "rgba(255,255,255,0.9)"
          : "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(n.x - 62, n.y - 26, 124, 52);
      ctx.fillStyle = n.hot ? YELLOW : "rgba(255,255,255,0.95)";
      ctx.font = "700 11px ui-monospace, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText(n.label, n.x, n.y - 2);
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.font = "9px ui-monospace, Menlo, monospace";
      ctx.fillText(n.sub, n.x, n.y + 13);
    };

    const draw = (ts: number) => {
      if (t0 === null) t0 = ts;
      const el = (ts - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= W; gx += 40) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy <= H; gy += 40) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      const prog = reduced ? 1 : Math.min(1, el / 1.6);
      WIRES.forEach(([ai, bi]) => {
        const { ax, ay, bx, by, mx } = wirePath(NODES[ai], NODES[bi]);
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.setLineDash([1000]);
        ctx.lineDashOffset = 1000 * (1 - prog);
        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(mx, ay); ctx.lineTo(mx, by); ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      if (!reduced && prog === 1) {
        parts.forEach((pt) => {
          pt.p = (pt.p + 0.004) % 1;
          const [ai, bi] = pt.w;
          const { ax, ay, bx, by, mx } = wirePath(NODES[ai], NODES[bi]);
          const legs = [Math.abs(mx - ax), Math.abs(by - ay), Math.abs(bx - mx)];
          const total = legs[0] + legs[1] + legs[2];
          const d = pt.p * total;
          let px: number, py: number;
          if (d < legs[0]) {
            px = ax + Math.sign(mx - ax) * d; py = ay;
          } else if (d < legs[0] + legs[1]) {
            px = mx; py = ay + Math.sign(by - ay) * (d - legs[0]);
          } else {
            px = mx + Math.sign(bx - mx) * (d - legs[0] - legs[1]); py = by;
          }
          ctx.beginPath();
          ctx.arc(px, py, 2.4, 0, 7);
          ctx.fillStyle = YELLOW;
          ctx.fill();
        });
      }

      NODES.forEach((n, i) =>
        drawNode(n, prog === 1 && Math.floor(el * 0.8) % NODES.length === i),
      );

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="glass-strong relative">
      {/* corner registration ticks */}
      <span className="border-accent-line absolute -left-px -top-px h-3 w-3 border-l border-t" />
      <span className="border-accent-line absolute -right-px -top-px h-3 w-3 border-r border-t" />
      <span className="border-accent-line absolute -bottom-px -left-px h-3 w-3 border-b border-l" />
      <span className="border-accent-line absolute -bottom-px -right-px h-3 w-3 border-b border-r" />

      {/* filename / status bar */}
      <div className="border-border-line flex items-center gap-3 border-b px-5 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase">
        <span className="bp-ref text-violet">FIG. 1</span>
        <span className="text-ink-mute hidden truncate sm:inline">
          end-to-end.flow
        </span>
        <span className="text-ink ml-auto inline-flex items-center gap-2">
          <span className="bg-violet pulse-glow inline-block h-1.5 w-1.5" />
          RUNNING
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="block h-auto w-full"
        style={{ aspectRatio: `${W} / ${H}` }}
        role="img"
        aria-label="Schematic: inbound conversations and your tools flow through automation and aggregation into one live, audited view."
      />

      {/* readout strip */}
      <div className="border-border-line text-ink-mute grid grid-cols-1 border-t font-mono text-[10.5px] tracking-[0.06em] sm:grid-cols-2">
        <span className="border-border-line px-5 py-3 sm:border-r">
          schematic · one operation, end to end
        </span>
        <span className="text-ink-dim px-5 py-3 sm:text-right">
          every run audited
        </span>
      </div>
    </div>
  );
}
