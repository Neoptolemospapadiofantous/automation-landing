import { cn } from "@/lib/utils";

/**
 * Diagonal watermark behind a section's content — reads like the rotated
 * "DRAFT" / "APPROVED" / "REV A" stamps printed across technical drawings.
 * Pointer-events-none, aria-hidden, very low opacity.
 *
 * Usage: the host section must be `relative isolate` (the `isolate`
 * creates a stacking context so the watermark's negative z-index stays
 * contained inside the section instead of bleeding behind the body).
 *
 *     <section className="relative isolate overflow-hidden ...">
 *       <SectionWatermark text="FLOWSTACK" />
 *       ...
 *     </section>
 */
export function SectionWatermark({
  text,
  className,
  size = "lg",
}: {
  text: string;
  className?: string;
  /** "lg" ≈ 16vw, "md" ≈ 12vw, "sm" ≈ 9vw. Match to section height. */
  size?: "sm" | "md" | "lg";
}) {
  const fontSize =
    size === "sm"
      ? "clamp(5rem, 9vw, 11rem)"
      : size === "md"
      ? "clamp(7rem, 12vw, 15rem)"
      : "clamp(9rem, 16vw, 20rem)";

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center overflow-hidden",
        className,
      )}
    >
      <span
        className="watermark-parallax text-ink/[0.10] font-mono font-black uppercase whitespace-nowrap leading-none tracking-[0.05em]"
        style={{ fontSize, transform: "rotate(-8deg)" }}
      >
        {text}
      </span>
    </span>
  );
}
