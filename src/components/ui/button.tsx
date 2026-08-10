import { cva, type VariantProps } from "class-variance-authority";

/**
 * The one CTA recipe.
 *
 * `btn-grad` (signal-yellow block) and `btn-draw` (outlined ghost) in
 * globals.css own the *paint* — fill, border, hard offset shadow, mono
 * face. This owns the *metrics* — padding, size, tracking, weight —
 * which had drifted into six near-identical hand-written variants
 * across eleven call sites (12px/0.18em here, 13px/0.12em there, one
 * primary CTA that had lost `uppercase` entirely).
 *
 * Three sizes, and that is the whole scale:
 *   lg   the page-level CTA — heroes, pricing tiers, final CTA, forms
 *   sm   compact contexts where a full-size button would dominate
 *   nav  the header button only: responsive down to 320px, where the
 *        label used to wrap to three lines. Deliberately its own rung.
 *
 * No `tracking-*` here on purpose. Tailwind emits its tracking utilities
 * ahead of globals.css's custom ones in the same cascade layer, so
 * `.btn-grad` / `.btn-draw` (letter-spacing: .06em) win regardless — the
 * old call sites' 0.18em / 0.12em / tracking-normal never rendered at all.
 * Letter-spacing belongs to the paint classes; setting it here would only
 * re-add a decision the cascade throws away.
 *
 * Returns a class string rather than wrapping an element — call sites
 * stay real `<Link>` / `<button>` elements, so routing, prefetch and
 * form semantics are untouched.
 */
export const ctaClass = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      primary: "btn-grad",
      ghost: "btn-draw",
    },
    size: {
      lg: "px-6 py-4 text-[13px] font-semibold uppercase",
      sm: "px-5 py-2.5 text-[12px] font-semibold uppercase",
      nav: "px-3 py-1.5 text-[11px] font-medium uppercase whitespace-nowrap sm:px-4 sm:py-2 sm:text-[12px]",
    },
  },
  defaultVariants: { variant: "primary", size: "lg" },
});

export type CtaVariants = VariantProps<typeof ctaClass>;
