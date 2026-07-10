/**
 * Slim site-wide notice: some features are still in development. Sits
 * directly under the sticky chrome on every page — quiet mono strip,
 * not a modal, not dismissible (it should be seen, not managed).
 * Remove this component from layout.tsx when the platform is
 * feature-complete.
 */
export function DevNotice() {
  return (
    <div
      role="note"
      className="border-border-line bg-bg-elev/60 border-b"
    >
      <p className="text-ink-mute mx-auto flex max-w-[1280px] items-center gap-2.5 px-6 py-2 font-mono text-[11px] tracking-[0.08em]">
        <span aria-hidden className="bp-dot shrink-0" />
        Some features are still in development — we apologize for any
        inconvenience and are fixing things as we go.
      </p>
    </div>
  );
}
