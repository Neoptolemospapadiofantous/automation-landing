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
import { ctaClass } from "@/components/ui/button";

const initial: AuditFormState = { ok: false };

/* One form, two label sets. The validation, the action and the consent
   gate are shared on purpose — a duplicated Greek form would drift from
   this one the first time a field changes. */
export type AuditFormCopy = Omit<typeof EN_COPY, "lang" | "bullets"> & {
  lang: "en" | "el";
  bullets: readonly string[];
};

const EN_COPY = {
  lang: "en" as "en" | "el",
  eyebrow: "Free — 30 min — no pitch",
  headingA: "Book the call.",
  headingB: "Keep the scope",
  headingC: " either way.",
  turnaround: "≤ 48H TURNAROUND",
  lead: "Tell us what to take off your plate. A written, fixed-scope proposal comes back within 48 hours.",
  bullets: [
    "Written scope document — yours to keep",
    "Live walkthrough of the build (no slides)",
    "No retainer. No NDA gating. No upsell.",
  ],
  formTitle: "Tell us what to build.",
  allRequired: "// all fields required unless noted",
  name: { label: "Your name", placeholder: "Jane Doe" },
  email: { label: "Work email", placeholder: "jane@company.com" },
  company: {
    label: "Company & role",
    placeholder: "e.g. Acme Corp — Director of Operations",
  },
  leak: {
    label: "What does the off-the-shelf agent not do? (the more specific, the better)",
    placeholder:
      "We need the agent to push qualified leads into our internal CRM (custom REST API), tag by territory, and notify the assigned rep when deal value > $X.",
  },
  consentBefore:
    "I agree that Flowstack may store the details above to reply to this inquiry and scope the engagement, per the",
  privacyLabel: "Privacy Policy",
  consentAfter: ". We'll delete the record if you don't become a customer.",
  sending: "Sending…",
  sent: "Sent — we'll be in touch",
  submit: "Send the brief",
  noNewsletter: "No newsletter — just the scope.",
};

export const AUDIT_FORM_EL: AuditFormCopy = {
  lang: "el",
  eyebrow: "Δωρεάν — 30 λεπτά — χωρίς πίεση",
  headingA: "Κλείστε το ραντεβού.",
  headingB: "Κρατάτε την προσφορά",
  headingC: " ό,τι κι αν γίνει.",
  turnaround: "ΑΠΑΝΤΗΣΗ ≤ 48Ω",
  lead: "Πείτε μας τι θέλετε να φύγει από τα χέρια σας. Μια γραπτή προσφορά με σταθερό αντικείμενο έρχεται μέσα σε 48 ώρες.",
  bullets: [
    "Γραπτή προσφορά — δική σας, ό,τι κι αν αποφασίσετε",
    "Ζωντανή παρουσίαση του τι θα φτιαχτεί (χωρίς διαφάνειες)",
    "Χωρίς πάγιο. Χωρίς NDA για να μιλήσουμε. Χωρίς πιέσεις.",
  ],
  formTitle: "Πείτε μας τι θέλετε να φτιάξουμε.",
  allRequired: "// όλα τα πεδία είναι απαραίτητα",
  name: { label: "Το όνομά σας", placeholder: "Μαρία Παπαδοπούλου" },
  email: { label: "Email εργασίας", placeholder: "maria@etaireia.com.cy" },
  company: {
    label: "Επιχείρηση & ρόλος",
    placeholder: "π.χ. Καφεκοπτεία Λεμεσού — Διεύθυνση",
  },
  leak: {
    label: "Τι σας δυσκολεύει σήμερα; (όσο πιο συγκεκριμένα, τόσο καλύτερα)",
    placeholder:
      "Θέλουμε τα leads από το site να μπαίνουν στο CRM μας, να ειδοποιείται ο πωλητής της περιοχής, και τα τιμολόγια να φεύγουν χωρίς να τα γράφει κάποιος.",
  },
  consentBefore:
    "Συμφωνώ να κρατήσει η Flowstack τα παραπάνω στοιχεία για να απαντήσει σε αυτό το αίτημα και να ορίσει το έργο, σύμφωνα με την",
  privacyLabel: "Πολιτική Απορρήτου",
  consentAfter: ". Διαγράφουμε την εγγραφή αν δεν γίνετε πελάτης.",
  sending: "Αποστολή…",
  sent: "Στάλθηκε — θα επικοινωνήσουμε",
  submit: "Στείλτε το",
  noNewsletter: "Χωρίς newsletter — μόνο η προσφορά.",
};

export function AuditForm({ copy = EN_COPY }: { copy?: AuditFormCopy }) {
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
            <Eyebrow tint="success">{copy.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              {copy.headingA}
              <br />
              <span className="text-gradient">{copy.headingB}</span>
              {copy.headingC}
            </h2>

            {/* dimension line under the headline */}
            <div
              aria-hidden
              className="mt-6 flex max-w-[55ch] items-center gap-3"
            >
              <span className="bp-dim flex-1" />
              <span className="bp-annot whitespace-nowrap">
                {copy.turnaround}
              </span>
            </div>

            <p className="text-ink-dim mt-6 max-w-[48ch] text-lg leading-[1.65]">
              {copy.lead}
            </p>

            <ul className="mt-10 space-y-4">
              {copy.bullets.map((line) => (
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
            {/* The action returns its messages in this language. */}
            <input type="hidden" name="lang" value={copy.lang} />
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
              {copy.formTitle}
            </h3>
            <p className="bp-annot mt-2">
              {copy.allRequired}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                name="name"
                label={copy.name.label}
                placeholder={copy.name.placeholder}
              />
              <Field
                name="email"
                type="email"
                label={copy.email.label}
                placeholder={copy.email.placeholder}
              />
            </div>
            <div className="mt-5">
              <Field
                name="company"
                label={copy.company.label}
                placeholder={copy.company.placeholder}
              />
            </div>
            <div className="mt-5">
              <Label
                htmlFor="leak"
                className="text-ink-mute font-mono text-[11px] tracking-[0.18em] uppercase"
              >
                {copy.leak.label}
              </Label>
              <Textarea
                id="leak"
                name="leak"
                required
                rows={4}
                placeholder={copy.leak.placeholder}
                className="bg-bg-elev/85 border-border-line text-ink placeholder:text-ink-mute focus-visible:ring-ring/60 focus-visible:border-violet mt-2 rounded-none font-mono text-[16px] sm:text-[13px]"
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
                  {copy.consentBefore}{" "}
                  <Link
                    href="/privacy"
                    hrefLang="en"
                    className="text-ink inline-block py-1 underline-offset-4 hover:underline"
                  >
                    {copy.privacyLabel}
                  </Link>
                  {copy.consentAfter}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={pending}
              className={ctaClass({ className: "mt-5 h-13 w-full rounded-none transition disabled:cursor-not-allowed disabled:opacity-70" })}
            >
              {pending ? copy.sending : state.ok ? copy.sent : copy.submit}
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
              {copy.noNewsletter}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* 16px on phones is not a style choice: iOS Safari zooms the whole page in
   when a focused input is under 16px, and the visitor has to pinch back out
   mid-form. The 13px drawing-office look returns at sm and up. */
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
        className="bg-bg-elev/85 border-border-line text-ink placeholder:text-ink-mute focus-visible:ring-ring/60 focus-visible:border-violet mt-2 h-11 rounded-none font-mono text-[16px] sm:text-[13px]"
      />
    </div>
  );
}
