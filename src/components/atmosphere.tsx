/**
 * Fixed, page-wide ambient background behind all content. Pure CSS: a
 * faint blueprint grid that slowly drifts, giving the flat paper sheet
 * a sense of depth. (The two floating accent glows were removed with
 * the 2026-08 white-sheet redesign — blurred gold clouds read as
 * stains on paper.) Decorative only — aria-hidden, pointer-events-none,
 * sits at -z so it never intercepts interaction or covers content.
 * Silenced under prefers-reduced-motion via the .atmosphere-* rules in
 * globals.css.
 */
export function Atmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span className="atmosphere-grid" />
    </div>
  );
}
