"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FREE_CALL, nav, siteMap } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Desktop nav.
 *
 * The bar is width-bound, so the four services sit in one panel and the
 * bar keeps a single flat link (Pricing). The panel is a plain list of what
 * we sell — no line names, no categories (2026-09-13: every surface names
 * the same four services in the same order, read from `services`).
 *
 * Opens on click (not hover): hover menus are unusable by keyboard and
 * hostile on touch-capable laptops. Escape and click-away close it, focus
 * returns to the trigger, and every link inside is also in the footer, so
 * nothing here is the only route to a page.
 */
const pathOf = (href: string) => href.split("#")[0];

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

  const items = siteMap.services.items;
  // The panel owns a page when that page is one of its links.
  const inPanel = items.some((i) => pathOf(i.href) === pathname);

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
            className="border-border-hi bg-bg absolute top-[calc(100%+14px)] left-0 z-50 w-[420px] border p-5 shadow-[8px_8px_0_var(--ink)]"
          >
            <div className="border-border-line mb-2 border-b pb-2">
              <span className="text-ink font-mono text-[10px] tracking-[0.22em] uppercase">
                {siteMap.services.heading}
              </span>
            </div>
            <ul className="flex flex-col">
              {items.map((it) => {
                const active = pathOf(it.href) === pathname;
                return (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "hover:bg-bg-elev -mx-2 flex flex-col gap-0.5 px-2 py-2 transition-colors",
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
            <Link
              href={FREE_CALL.href}
              className="border-border-line text-ink mt-3 flex items-center justify-between border-t pt-3 font-mono text-[11px] tracking-[0.14em] uppercase"
            >
              {FREE_CALL.label}
              <span aria-hidden className="text-violet">
                →
              </span>
            </Link>
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
