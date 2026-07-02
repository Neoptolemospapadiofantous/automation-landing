import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Branded 404 — without this, a mistyped URL drops the visitor into
 * Next's unstyled default page, which breaks the blueprint sheet
 * language everywhere else on the site.
 */
export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title={
          <>
            Sheet not found <span className="text-gradient">in the index.</span>
          </>
        }
        lead="The page you're looking for doesn't exist — it may have been moved, renamed, or never drawn. Head back to the index or jump straight to pricing."
        ctas={[
          { href: "/", label: "Back to index →" },
          { href: "/pricing", label: "See pricing", variant: "secondary" },
        ]}
      />
      <div aria-hidden className="pb-24 text-center">
        <p className="text-ink-dim font-mono text-[11px] tracking-[0.18em] uppercase">
          {"// fig. 404 — no sheet at this reference"}
        </p>
      </div>
    </>
  );
}
