import Link from "next/link";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileMenu } from "./mobile-menu";
import { registerUrl, loginUrl } from "@/lib/dashboard";
import { ctaClass } from "@/components/ui/button";

export function SiteNav() {
  return (
    <header>
      <div className="border-border-line bg-bg/80 relative mx-auto flex max-w-[1280px] items-center justify-between gap-2 border px-4 py-1.5 backdrop-blur-[2px] sm:gap-8 sm:py-2">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Flowstack home"
            className="relative z-50 shrink-0"
          >
            <Logo />
          </Link>
          <span
            aria-hidden
            className="border-border-line text-ink-mute hidden border-l pl-4 font-mono text-[10px] tracking-[0.22em] uppercase xl:inline"
          >
            Sheet 00 / Index
          </span>
        </div>
        <NavLinks />
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href={loginUrl()}
            className="text-ink-dim hover:text-ink relative z-50 hidden font-mono text-[11px] tracking-[0.18em] uppercase transition-colors sm:inline-flex"
          >
            Login
          </Link>
          {/* whitespace-nowrap: the label used to wrap to 2–3 lines on
              phones. Compact sizing below sm; under 360px the price
              alone remains so the button never forces overflow. */}
          <Link
            href={registerUrl()}
            className={ctaClass({ size: "nav", className: "relative z-50" })}
          >
            <span className="hidden min-[360px]:inline">Try it for&nbsp;</span>
            €99 →
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
