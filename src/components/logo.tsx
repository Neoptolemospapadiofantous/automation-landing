import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Flow-node mark: signal in → node w/ active core → signal out */}
      <svg
        width="28"
        height="22"
        viewBox="0 0 28 22"
        fill="none"
        aria-hidden
        className="shrink-0 overflow-visible"
      >
        {/* input wire */}
        <path d="M0 11 H6" stroke="var(--draw)" strokeWidth="1.5" />
        {/* node frame */}
        <rect
          x="6.75"
          y="3.75"
          width="14.5"
          height="14.5"
          stroke="var(--draw)"
          strokeWidth="1.5"
        />
        {/* active core */}
        <rect x="11" y="8" width="6" height="6" fill="var(--accent)" />
        {/* output wire + arrowhead */}
        <path d="M21.25 11 H28" stroke="var(--accent)" strokeWidth="1.5" />
        <path
          d="M25.5 8.5 L28 11 L25.5 13.5"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      <span className="text-ink text-[17px] font-semibold tracking-tight">
        Flowstack
      </span>
      <span
        aria-hidden
        className="text-ink-mute hidden self-center border-l border-border-line pl-2.5 font-mono text-[10px] tracking-[0.22em] uppercase sm:inline"
      >
        / automation
      </span>
    </div>
  );
}
