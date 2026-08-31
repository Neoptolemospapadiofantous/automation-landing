import Link from "next/link";
import { siteMap, siteMapRoles, type SiteLink } from "@/lib/content";

/**
 * S/08 — the sheet index: every page on this site, in one place, each
 * with the one line that says what is on it.
 *
 * The footer already carries the same links, but a footer is a list of
 * labels in the least-read part of the page. This band exists because a
 * visitor could scroll the whole homepage and still not learn that the
 * outreach service has a page of its own — the links were there, spread
 * across three bands, none of them announcing itself as "the pages".
 *
 * Legal pages are deliberately NOT here. They belong in the footer,
 * which is where people look for them, and putting them in a band about
 * what we sell would dilute it.
 */

function IndexList({
  heading,
  note,
  items,
}: {
  heading: string;
  note: string;
  items: readonly SiteLink[];
}) {
  return (
    <div>
      <div className="border-border-line flex flex-wrap items-baseline justify-between gap-3 border-b pb-3">
        <h3 className="text-ink font-mono text-[12px] tracking-[0.22em] uppercase">
          {heading}
        </h3>
        <span className="bp-annot">{note}</span>
      </div>
      <ul>
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group border-border-line hover:bg-bg-elev/60 flex items-start justify-between gap-5 border-b py-4 transition-colors"
            >
              <span className="flex flex-col gap-1">
                <span className="text-ink font-semibold tracking-[-0.01em]">
                  {it.label}
                </span>
                <span className="text-ink-dim max-w-[46ch] text-[14px] leading-[1.5]">
                  {it.desc}
                </span>
              </span>
              <span
                aria-hidden
                className="text-ink-mute group-hover:text-violet mt-0.5 font-mono text-lg transition-colors"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteIndex() {
  return (
    <section id="index" className="relative pb-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref">S/08 / index</span>
            <h2 className="text-ink mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Every page on this site.
            </h2>
          </div>
          <p className="bp-annot normal-case">
            Nothing hidden — this is the whole set.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
          <IndexList
            heading="Services"
            note={siteMap.services.note}
            items={siteMap.services.items}
          />
          <IndexList
            heading={siteMapRoles.heading}
            note={siteMapRoles.note}
            items={siteMapRoles.items}
          />
        </div>
      </div>
    </section>
  );
}
