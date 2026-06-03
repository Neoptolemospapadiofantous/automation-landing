import { tickerLogos } from "@/lib/content";

export function LogoTicker() {
  // Duplicate the array so the marquee can wrap seamlessly
  const items = [...tickerLogos, ...tickerLogos];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line relative border">
          {/* corner registration ticks */}
          <span
            aria-hidden
            className="border-draw absolute -top-px -left-px h-3 w-3 border-t border-l"
          />
          <span
            aria-hidden
            className="border-draw absolute -top-px -right-px h-3 w-3 border-t border-r"
          />
          <span
            aria-hidden
            className="border-draw absolute -bottom-px -left-px h-3 w-3 border-b border-l"
          />
          <span
            aria-hidden
            className="border-draw absolute -right-px -bottom-px h-3 w-3 border-r border-b"
          />

          {/* caption rail */}
          <div className="border-border-line flex items-center gap-3 border-b px-5 py-3">
            <span className="bp-ref">TRUSTED BY OPERATIONS AT &mdash;</span>
            <span className="bp-annot ml-auto hidden sm:inline">
              {"// fig. 0 · clients"}
            </span>
          </div>

          {/* wordmark marquee */}
          <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="animate-marquee flex w-max items-center">
              {items.map((label, i) => (
                <span
                  key={`${label}-${i}`}
                  className="text-draw flex shrink-0 items-center gap-8 px-8 font-mono text-[15px] tracking-[0.18em] whitespace-nowrap uppercase"
                >
                  {label}
                  <span
                    aria-hidden
                    className="bg-border-hi inline-block h-1.5 w-1.5 rotate-45"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
