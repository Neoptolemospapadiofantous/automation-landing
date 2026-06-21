"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { loginUrl } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

/**
 * Phone-only nav menu. Below `lg` the inline <NavLinks /> is hidden and
 * below `sm` the Login link is hidden too — so on a phone the bar would
 * otherwise show only the logo + the primary CTA, leaving Pricing /
 * Custom build / Login unreachable. This hamburger surfaces them.
 *
 * Hidden at `lg+` where the inline nav already covers the links.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change so a tapped link doesn't leave the panel open.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="text-ink hover:text-ink-dim -mr-1 inline-flex h-9 w-9 items-center justify-center transition-colors"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <path d="M6 6l12 12M6 18 18 6" />
          ) : (
            <>
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Click-away backdrop — sits under the panel, above page content. */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-transparent"
          />
          <div
            id="mobile-nav-panel"
            className="border-border-line bg-bg absolute left-0 right-0 top-full z-50 flex flex-col border border-t-0 px-4 py-2"
          >
            {nav.links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "border-border-line/60 border-b py-3 font-mono text-[12px] tracking-[0.18em] uppercase transition-colors",
                    active ? "text-ink" : "text-ink-dim hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href={loginUrl()}
              className="text-ink-dim hover:text-ink py-3 font-mono text-[12px] tracking-[0.18em] uppercase transition-colors sm:hidden"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
