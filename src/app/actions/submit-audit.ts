"use server";

import { sendAuditEmail } from "@/lib/mail";

export type AuditFormState = {
  ok: boolean;
  message?: string;
};

/* The form posts a hidden `lang`. Absent (or anything else) means English,
   so the English page behaves exactly as before. */
const MESSAGES = {
  en: {
    missing: "Please fill in name, email, and the leak.",
    email: "That email doesn't look quite right.",
    consent: "Please confirm the privacy notice before sending.",
    failed:
      "We hit a snag sending that. Email hello@flowstack.run directly and we'll take it from there.",
    sent: "Got it. We'll come back to book the call.",
  },
  el: {
    missing: "Συμπληρώστε όνομα, email και το τι σας δυσκολεύει.",
    email: "Αυτό το email δεν φαίνεται σωστό.",
    consent: "Επιβεβαιώστε τη σημείωση απορρήτου πριν στείλετε.",
    failed:
      "Κάτι πήγε στραβά με την αποστολή. Στείλτε μας email στο hello@flowstack.run και το αναλαμβάνουμε.",
    sent: "Το λάβαμε. Θα επικοινωνήσουμε για να κλείσουμε το ραντεβού.",
  },
} as const;

export async function submitAudit(
  _prev: AuditFormState,
  formData: FormData,
): Promise<AuditFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const leak = String(formData.get("leak") ?? "").trim();
  // HTML checkboxes are absent from FormData when unchecked, "on"
  // when checked. Don't trust client-side `required` on its own.
  const consent = formData.get("consent") === "on";
  const lang = formData.get("lang") === "el" ? "el" : "en";
  const t = MESSAGES[lang];

  if (!name || !email || !leak) {
    return { ok: false, message: t.missing };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: t.email };
  }
  if (!consent) {
    return { ok: false, message: t.consent };
  }

  // Real send. SMTP not configured falls back to console.log so dev /
  // preview flows still work — the visitor sees success either way.
  const result = await sendAuditEmail({ name, email, company, leak, lang });

  if (!result.ok && result.reason === "send-failed") {
    return { ok: false, message: t.failed };
  }

  return { ok: true, message: t.sent };
}
