import { SectionWatermark } from "@/components/section-watermark";

/**
 * Deploy-surface strip — a dec-page-style row that names the ways the
 * agent ships onto your site. Sits between the hero and the agent-roles
 * list so "this is how it goes live" is established before the visitor
 * reads what each role does.
 *
 * Only what the app actually surfaces today (dashboard EmbedController):
 * the JS embed widget (/widget/{slug}.js) and its hosted chat page
 * (/embed/{slug}). No inbound webhook — the native runtime has none
 * (AgentController hardcodes webhook_url = null); no SMS/Slack/WhatsApp/
 * voice either. Those aren't shipped, so we don't list them.
 *
 * Visual language matches the rest of the system: hairline borders,
 * mono uppercase labels, sheet ref + small chat-bubble mark on the left.
 */
const CHANNELS = [
  "Website widget",
  "Hosted chat page",
] as const;

function ChatGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* speech bubble outline */}
      <path
        d="M2 3 H16 V12 H6 L3 15 V12 H2 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* three message dots */}
      <circle cx="6"  cy="7.5" r="0.85" fill="currentColor" />
      <circle cx="9"  cy="7.5" r="0.85" fill="currentColor" />
      <circle cx="12" cy="7.5" r="0.85" fill="currentColor" />
    </svg>
  );
}

export function LinesOfBusiness() {
  return (
    <section
      aria-labelledby="channels-heading"
      className="relative isolate overflow-hidden py-20"
    >
      <SectionWatermark text="EMBED" size="sm" />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="depth-rise flow-edge border-border-line relative border">
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
            className="border-draw absolute -bottom-px -right-px h-3 w-3 border-b border-r"
          />

          {/* header rail */}
          <div className="border-border-line flex items-center gap-3 border-b px-5 py-3">
            <ChatGlyph className="text-ink shrink-0" />
            <span id="channels-heading" className="bp-ref text-ink">
              How it deploys
            </span>
            <span className="bp-annot ml-auto hidden sm:inline">
              {"// embed on any site · every option included"}
            </span>
          </div>

          {/* channel cells — hairline-divided grid, mono labels */}
          <ul className="divide-border-line grid grid-cols-2 divide-x divide-y sm:grid-cols-2 lg:grid-cols-2 lg:divide-y-0">
            {CHANNELS.map((ch, i) => {
              const ref = `CH-0${i + 1}`;
              return (
                <li
                  key={ch}
                  className="lift-hover flex flex-col gap-1.5 px-4 py-4 lg:gap-2"
                >
                  <span
                    className="text-ink-mute font-mono text-[10px] tracking-[0.22em] uppercase"
                    aria-hidden
                  >
                    {ref}
                  </span>
                  <span className="text-ink font-mono text-[13px] tracking-[0.08em] uppercase">
                    {ch}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
