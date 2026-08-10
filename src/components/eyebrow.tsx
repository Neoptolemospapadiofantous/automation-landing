import { cn } from "@/lib/utils";
import type { Tint } from "@/lib/content";

// Tint names are an API, not five colours. The brand is monochrome plus
// one signal, so on the current white sheet these resolve to just three
// inks: `violet` → the gold accent #8A6A00, `warn` → mid-grey, and
// cyan/success/danger → plain black. Nothing here is red or green; a
// `danger` eyebrow reads as emphasis, not alarm. The tokens live in
// branding/tokens.css (canonical, shared verbatim with the dashboard) —
// per-tint colour would have to be reintroduced there, not here.
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
