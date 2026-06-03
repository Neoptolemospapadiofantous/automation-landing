import Link from "next/link";
import { agentRoles } from "@/lib/content";
import { registerUrl } from "@/lib/dashboard";

/**
 * Agent role picker — the "drawing index" pattern applied to product
 * roles. Each row is one pre-built role on the platform; clicking
 * launches the dashboard register flow (role selection itself happens
 * inside the onboarding wizard, not via a URL param, so all rows share
 * the same destination).
 */
export function Overview() {
  const href = registerUrl();

  return (
    <section id="agents" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="border-border-line flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <span className="bp-ref">Agent roles</span>
            <h2 className="text-ink mt-4 max-w-[22ch] text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Pick the role. We provision the agent.
            </h2>
          </div>
          <span className="bp-annot hidden sm:block">
            {`// ${agentRoles.length} roles available · select to start`}
          </span>
        </div>

        <ul>
          {agentRoles.map((r) => (
            <li key={r.ref}>
              <Link
                href={href}
                className="group border-border-line hover:bg-bg-elev/60 grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b py-7 transition-colors sm:gap-8"
              >
                <span className="bp-ref text-ink-mute group-hover:text-violet w-14 shrink-0 transition-colors sm:w-20">
                  {r.ref}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-ink text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      {r.name}
                    </h3>
                  </div>
                  <p className="text-ink-dim mt-1.5 max-w-[68ch] text-sm leading-[1.55]">
                    {r.desc}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="bp-wire hidden w-10 opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                  <span
                    aria-hidden
                    className="text-ink-mute group-hover:text-violet font-mono text-lg transition-colors group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="bp-annot mt-6">
          {"// don't see your role? "}
          <Link
            href="/audit"
            className="text-draw hover:text-violet underline-offset-4 hover:underline"
          >
            book a custom build →
          </Link>
        </p>
      </div>
    </section>
  );
}
