import { Eyebrow } from "./eyebrow";
import type { Tint } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  tint = "violet",
  title,
  sub,
  align = "center",
  className,
}: {
  eyebrow: string;
  tint?: Tint;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {/* Sheet-reference tag: mono, bp-dot prefixed */}
      <Eyebrow tint={tint}>{eyebrow}</Eyebrow>

      <h2 className="mt-5 max-w-[22ch] text-balance text-3xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Dimension line beneath the heading — a measured span annotation. */}
      <div
        aria-hidden
        className={cn(
          "bp-dim mt-5 w-16",
          centered && "mx-auto",
        )}
      />

      {sub && (
        <p className="text-ink-dim mt-5 max-w-[62ch] text-balance text-lg leading-[1.65]">
          {sub}
        </p>
      )}
    </div>
  );
}
