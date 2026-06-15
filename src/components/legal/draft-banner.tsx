/**
 * DRAFT banner shown at the top of every legal document on this site.
 * The legal pages are scaffolds — section structure + generic SaaS
 * boilerplate — pending review by qualified counsel. This banner exists
 * to be unmistakable about that so neither visitors nor procurement
 * teams treat the page as a finalised legal commitment.
 */
export function DraftBanner() {
  return (
    <div
      role="note"
      aria-label="Document status"
      className="border-border-hi bg-bg-elev/70 relative mb-10 border"
    >
      {/* diagonal hatch fill — same emphasis device the system uses for
          "cut" or "callout" regions */}
      <div aria-hidden className="bp-hatch absolute inset-0 opacity-25" />

      <div className="relative flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5">
        <span className="ins-stamp shrink-0 self-start">Draft</span>
        <div className="font-mono text-[12px] leading-[1.55] tracking-[0.04em]">
          <p className="text-ink">
            This document is a draft scaffold — structure and generic
            boilerplate only.
          </p>
          <p className="text-ink-dim mt-1">
            It has not been reviewed by counsel and must not be relied on
            as legal advice or as the operator&apos;s final commitment.
            Contact <span className="text-ink">privacy@flowstack.run</span>{" "}
            for the live version.
          </p>
        </div>
      </div>
    </div>
  );
}
