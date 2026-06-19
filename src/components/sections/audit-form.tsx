"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Eyebrow } from "../eyebrow";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  submitAudit,
  type AuditFormState,
} from "@/app/actions/submit-audit";

const initial: AuditFormState = { ok: false };

export function AuditForm() {
  const [state, action, pending] = useActionState(submitAudit, initial);

  return (
    <section id="audit" className="relative py-32">
      {/* sheet reference + crop ticks */}
      <div
        aria-hidden
        className="border-border-line absolute inset-x-6 top-12 hidden h-px border-t lg:block"
      />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-ink-mute mb-10 flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase">
          <span className="bp-ref">SHEET 04 / CUSTOM-BUILD INTAKE</span>
          <span aria-hidden>FIG. 4 — SCOPE REQUEST</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Eyebrow tint="success">Free — 30 min — no pitch</Eyebrow>
            <h2 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              Book the call.
              <br />
              <span className="text-gradient">Keep the scope</span> either way.
            </h2>

            {/* dimension line under the headline */}
            <div
              aria-hidden
              className="mt-6 flex max-w-[55ch] items-center gap-3"
            >
              <span className="bp-dim flex-1" />
              <span className="bp-annot whitespace-nowrap">
                ≤ 48H TURNAROUND
              </span>
            </div>

            <p className="text-ink-dim mt-6 max-w-[55ch] text-lg leading-[1.65]">
              Tell us what the off-the-shelf agent doesn&apos;t cover.
              We come back inside 48 hours with a written, fixed-scope
              proposal — what we&apos;ll build, in how long, for how much.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "Written scope document — yours to keep",
                "Live walkthrough of the build (no slides)",
                "No retainer. No NDA gating. No upsell.",
              ].map((line) => (
                <li key={line} className="flex items-center gap-3">
                  <span className="bp-dot mt-px shrink-0" aria-hidden />
                  <span className="text-ink text-[15px] font-medium">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <form action={action} className="flow-edge glass-strong relative p-7 sm:p-9">
            {/* title-block strip */}
            <div className="border-border-line -mx-7 -mt-7 mb-7 grid grid-cols-2 border-b sm:-mx-9 sm:-mt-9 sm:mb-9 sm:grid-cols-3">
              {[
                ["FORM", "INTAKE-01"],
                ["FIELDS", "04"],
                ["REPLY", "≤ 4H"],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={`border-border-line px-5 py-4 ${i === 0 ? "" : "border-l"} ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <div className="text-ink-mute font-mono text-[10px] tracking-[0.22em] uppercase">
                    {k}
                  </div>
                  <div className="text-draw mt-1 font-mono text-[13px] tracking-[0.06em]">
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-ink text-[22px] font-semibold tracking-[-0.02em]">
              Tell us what to build.
            </h3>
            <p className="bp-annot mt-2">
              {"// all fields required unless noted"}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field name="name" label="Your name" placeholder="Jane Doe" />
              <Field
                name="email"
                type="email"
                label="Work email"
                placeholder="jane@company.com"
              />
            </div>
            <div className="mt-5">
              <Field
                name="company"
                label="Company & role"
                placeholder="e.g. Acme Corp — Director of Operations"
              />
            </div>
            <div className="mt-5">
              <Label
                htmlFor="leak"
                className="text-ink-mute font-mono text-[11px] tracking-[0.18em] uppercase"
              >
                What does the off-the-shelf agent not do? (the more specific, the better)
              </Label>
              <Textarea
                id="leak"
                name="leak"
                required
                rows={4}
                placeholder="We need the agent to push qualified leads into our internal CRM (custom REST API), tag by territory, and notify the assigned rep when deal value > $X."
                className="bg-bg-elev/85 border-border-line text-ink placeholder:text-ink-mute focus-visible:ring-ring/60 focus-visible:border-violet mt-2 rounded-none font-mono text-[13px]"
              />
            </div>

            {/* Privacy notice + explicit consent — sits ABOVE the submit
                button so it can't be missed. Required to enable submit. */}
            <div className="border-border-line bg-bg-elev/40 mt-7 border p-4">
              <label
                htmlFor="consent"
                className="text-ink-dim flex cursor-pointer items-start gap-3 font-mono text-[12px] leading-[1.55] tracking-[0.02em]"
              >
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  className="border-border-hi bg-bg accent-ink mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none border checked:bg-ink"
                />
                <span>
                  I agree that Flowstack may store the details above to
                  reply to this inquiry and scope the engagement, per
                  the{" "}
                  <Link
                    href="/privacy"
                    className="text-ink underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  . We&apos;ll delete the record if you don&apos;t
                  become a customer.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="btn-grad mt-5 inline-flex h-13 w-full items-center justify-center rounded-none px-6 py-4 text-[13px] tracking-[0.06em] uppercase transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending
                ? "Sending…"
                : state.ok
                  ? "Sent — we'll be in touch"
                  : "Send — we reply within 4 hours"}
            </button>

            {state.message && (
              <p
                className="text-ink mt-3 flex items-center justify-center gap-2 text-center font-mono text-[12px] tracking-[0.06em]"
                role="status"
              >
                <span
                  aria-hidden
                  className={`inline-flex h-4 w-4 items-center justify-center border text-[10px] leading-none ${
                    state.ok
                      ? "border-ink text-ink"
                      : "border-ink-mute text-ink-mute"
                  }`}
                >
                  {state.ok ? "✓" : "✕"}
                </span>
                <span
                  className={`font-bold tracking-[0.18em] ${
                    state.ok ? "text-ink" : "text-ink-mute"
                  }`}
                >
                  {state.ok ? "OK" : "ERR"}
                </span>
                <span aria-hidden className="text-ink-mute">·</span>
                <span className={state.ok ? "text-ink" : "text-ink-dim"}>
                  {state.message}
                </span>
              </p>
            )}

            <p className="text-ink-mute mt-5 text-center font-mono text-[11px] tracking-[0.06em]">
              No newsletter — just the scope.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <Label
        htmlFor={name}
        className="text-ink-mute font-mono text-[11px] tracking-[0.18em] uppercase"
      >
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="bg-bg-elev/85 border-border-line text-ink placeholder:text-ink-mute focus-visible:ring-ring/60 focus-visible:border-violet mt-2 h-11 rounded-none font-mono text-[13px]"
      />
    </div>
  );
}
