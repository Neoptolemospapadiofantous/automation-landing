import Link from "next/link";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40">
      <div className="border-border-line bg-bg/80 mx-auto mt-4 flex max-w-[1280px] items-center justify-between gap-8 border px-5 py-3 backdrop-blur-[2px]">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Flowstack home" className="shrink-0">
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
        <div className="flex items-center gap-4">
          <Link
            href="/audit"
            className="btn-grad inline-flex items-center px-4 py-2 text-[12px] font-medium uppercase"
          >
            Book audit →
          </Link>
        </div>
      </div>
    </header>
  );
}
