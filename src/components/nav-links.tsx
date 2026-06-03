"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-6 lg:flex">
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
