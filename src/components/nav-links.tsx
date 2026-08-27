"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, siteMap, siteMapRoles } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Desktop nav.
 *
 * The bar itself is width-bound — four items is the documented ceiling at
 * `lg` — but the site has ten pages worth reaching, and until now the four
 * role pages were footer-only. So the bar keeps the three highest-intent
 * destinations and everything else lives in one structured panel, laid out
 * the same way as the homepage index band and the footer.
 *
 * Opens on click (not hover): hover menus are unusable by keyboard and
 * hostile on touch-capable laptops. Escape and click-away close it, focus
 * returns to the trigger, and every link inside is also in the footer, so
 * nothing here is the only route to a page.
 */
const GROUPS = [siteMap.services, siteMapRoles] as const;

export function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // Close on route change — a tapped link must not leave the panel hanging.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  // The panel owns a page when that page is one of its links.
  const inPanel = GROUPS.some((g) => g.items.some((i) => i.href === pathname));

  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-6 lg:flex"
      ref={wrap}
    >
      <div className="relative">
        <button
          ref={trigger}
          type="button"
          aria-expanded={open}
          aria-controls="nav-services-panel"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "relative flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
            open || inPanel ? "text-ink" : "text-ink-dim hover:text-ink",
          )}
        >
          {nav.menuLabel}
          <span
            aria-hidden
            className={cn(
              "text-[9px] leading-none transition-transform",
              open && "rotate-180",
            )}
          >
            ▼
          </span>
          {inPanel && (
            <span
              aria-hidden
              className="bg-violet absolute -bottom-1.5 left-0 block h-px w-[calc(100%-14px)]"
            />
          )}
        </button>

        {open && (
          <div
            id="nav-services-panel"
            className="border-border-hi bg-bg absolute top-[calc(100%+14px)] left-0 z-50 grid w-[600px] grid-cols-2 gap-px border shadow-[8px_8px_0_var(--ink)]"
          >
            {GROUPS.map((g) => (
              <div key={g.heading} className="bg-bg p-5">
                <div className="border-border-line mb-3 border-b pb-2">
                  <span className="text-ink font-mono text-[10px] tracking-[0.22em] whitespace-nowrap uppercase">
                    {g.heading}
                  </span>
                </div>
                <ul className="flex flex-col">
                  {g.items.map((it) => {
                    const active = pathname === it.href;
                    return (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "hover:bg-bg-elev group -mx-2 flex flex-col gap-0.5 px-2 py-2 transition-colors",
                            active && "bg-bg-elev",
                          )}
                        >
                          <span className="text-ink flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em]">
                            <span className="bp-dot shrink-0" aria-hidden />
                            {it.label}
                          </span>
                          <span className="text-ink-dim pl-[14px] text-[12px] leading-[1.45]">
                            {it.desc}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {nav.links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative font-mono text-[11px] tracking-[0.18em] uppercase transition-colors",
              active ? "text-ink" : "text-ink-dim hover:text-ink",
            )}
          >
            {l.label}
            {active && (
              <span
                aria-hidden
                className="bg-violet absolute -bottom-1.5 left-0 block h-px w-full"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
