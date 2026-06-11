import { cn } from "@/lib/utils";
import type { Tint } from "@/lib/content";

// Tint names are kept for API compatibility — the underlying tokens
// (--violet, --draw, --success, ...) all resolve to white in the current
// mono palette, so every variant renders as white-on-black. Re-introduce
// per-tint color by editing those tokens in globals.css.
const tintInk: Record<Tint, { dot: string; label: string }> = {
  violet: { dot: "border-violet", label: "text-violet" },
  cyan: { dot: "border-draw", label: "text-draw" },
  success: { dot: "border-success", label: "text-success" },
  warn: { dot: "border-warn", label: "text-warn" },
  danger: { dot: "border-danger", label: "text-danger" },
};

export function Eyebrow({
  tint = "violet",
  children,
  className,
}: {
  tint?: Tint;
  children: React.ReactNode;
  className?: string;
}) {
  const ink = tintInk[tint];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 border border-border-line bg-bg-elev/60 px-3 py-1.5",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("bp-dot shrink-0", ink.dot)}
      />
      <span
        className={cn(
          "font-mono text-[11px] leading-none tracking-[0.22em] uppercase",
          ink.label,
        )}
      >
        {children}
      </span>
    </div>
  );
}
