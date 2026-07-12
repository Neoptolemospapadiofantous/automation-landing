/**
 * Site-wide in-development notice — loud on desktop (yellow caution
 * stripes + WIP stamp), compact on mobile (thin strip, small dot, no
 * flanks — phone rows are too narrow for the tape). Sits under the
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
        {/* caution stripes — desktop flanks only */}
        <span aria-hidden className="hidden shrink-0 opacity-70 sm:block sm:w-16 lg:w-28" style={STRIPES} />

        <p className="text-ink mx-auto flex items-center gap-2.5 px-4 py-1.5 font-mono text-[10.5px] font-bold leading-[1.5] tracking-[0.05em] sm:gap-3 sm:py-3 sm:text-center sm:text-[13px] sm:tracking-[0.08em]">
          {/* wrappers own the responsive display — bp-dot/ins-stamp set
              their own `display` in unlayered CSS and beat utilities */}
          <span aria-hidden className="shrink-0 sm:hidden">
            <span className="bp-dot" style={{ borderColor: "var(--violet)" }} />
          </span>
          <span aria-hidden className="hidden shrink-0 sm:block">
            <span className="ins-stamp" style={{ color: "var(--violet)" }}>
              WIP
            </span>
          </span>
          <span>
            Some features are still in development —{" "}
            <span className="text-ink-dim font-normal">
              we apologize for any inconvenience and are fixing things as we
              go.
            </span>
          </span>
        </p>

        {/* caution stripes — desktop flanks only */}
        <span aria-hidden className="hidden shrink-0 opacity-70 sm:block sm:w-16 lg:w-28" style={STRIPES} />
      </div>
    </div>
  );
}
