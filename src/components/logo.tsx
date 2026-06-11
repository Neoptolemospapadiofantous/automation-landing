import { cn } from "@/lib/utils";

/**
 * Flow-node mark + wordmark.
 *
 * A node with two state indicators inside — one filled (active) next
 * to one hollow (queued) — wired in and arrowed out. All strokes and
 * fills use `currentColor` so the whole mark inherits the parent's
 * text color, keeping a single point of color control.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("text-ink flex items-center gap-2.5", className)}>
      <svg
        width="34"
        height="22"
        viewBox="0 0 34 22"
        fill="none"
        aria-hidden
        className="shrink-0 overflow-visible"
      >
        {/* input wire */}
        <path d="M0 11 H6" stroke="currentColor" strokeWidth="1.5" />

        {/* node frame */}
        <rect
          x="6.75"
          y="4.75"
          width="20.5"
          height="12.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* active core — filled square (left, currently processing) */}
        <rect x="10.25" y="8.5" width="5" height="5" fill="currentColor" />

        {/* queued indicator — hollow square (right, waiting) */}
        <rect
          x="18.75"
          y="8.5"
          width="5"
          height="5"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* output wire */}
        <path d="M27.25 11 H34" stroke="currentColor" strokeWidth="1.5" />

        {/* arrowhead */}
        <path
          d="M31.5 8.5 L34 11 L31.5 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>

      <span className="text-[17px] font-semibold tracking-tight">
        Flowstack
      </span>
      <span
        aria-hidden
        className="border-border-line hidden self-center border-l pl-2.5 font-mono text-[10px] tracking-[0.22em] uppercase sm:inline"
      >
        / automation
      </span>
    </div>
  );
}
