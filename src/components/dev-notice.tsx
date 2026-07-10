/**
 * Site-wide in-development notice — deliberately loud: yellow caution
 * stripes on both flanks, a WIP stamp, bold mono text. Sits under the
 * sticky chrome, non-sticky so it scrolls with the page. Remove from
 * layout.tsx when the platform is feature-complete.
 */

const STRIPES: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(45deg, var(--violet) 0 12px, transparent 12px 24px)",
};

export function DevNotice() {
  return (
    <div role="note" className="border-y" style={{ borderColor: "var(--violet)" }}>
      <div className="flex items-stretch">
        {/* caution stripes — left flank */}
        <span aria-hidden className="w-16 shrink-0 opacity-70 sm:w-28" style={STRIPES} />

        <p className="text-ink mx-auto flex items-center gap-3 px-4 py-3 text-center font-mono text-[12px] font-bold tracking-[0.08em] sm:text-[13px]">
          <span
            className="ins-stamp shrink-0"
            style={{ color: "var(--violet)" }}
            aria-hidden
          >
            WIP
          </span>
          <span>
            Some features are still in development —{" "}
            <span className="text-ink-dim font-normal">
              we apologize for any inconvenience and are fixing things as we
              go.
            </span>
          </span>
        </p>

        {/* caution stripes — right flank */}
        <span aria-hidden className="w-16 shrink-0 opacity-70 sm:w-28" style={STRIPES} />
      </div>
    </div>
  );
}
