/**
 * Fixed, page-wide ambient background behind all content. Pure CSS: a
 * faint blueprint grid that slowly drifts plus two slow-floating accent
 * glows that give the otherwise-flat sheet a sense of depth. Decorative
 * only — aria-hidden, pointer-events-none, sits at -z so it never
 * intercepts interaction or covers content. Silenced under
 * prefers-reduced-motion via the .atmosphere-* rules in globals.css.
 */
export function Atmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <span className="atmosphere-grid" />
      <span className="atmosphere-glow atmosphere-glow-1 absolute" />
      <span className="atmosphere-glow atmosphere-glow-2 absolute" />
    </div>
  );
}
