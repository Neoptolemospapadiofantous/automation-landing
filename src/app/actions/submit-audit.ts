"use server";

import { sendAuditEmail } from "@/lib/mail";

export type AuditFormState = {
  ok: boolean;
  message?: string;
};

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

  if (!name || !email || !leak) {
    return { ok: false, message: "Please fill in name, email, and the leak." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email doesn't look quite right." };
  }
  if (!consent) {
    return {
      ok: false,
      message: "Please confirm the privacy notice before sending.",
    };
  }

  // Real send. SMTP not configured falls back to console.log so dev /
  // preview flows still work — the visitor sees success either way.
  const result = await sendAuditEmail({ name, email, company, leak });

  if (!result.ok && result.reason === "send-failed") {
    return {
      ok: false,
      message:
        "We hit a snag sending that. Email hello@flowstack.run directly and we'll take it from there.",
    };
  }

  return { ok: true, message: "Got it. We'll reply within 4 hours." };
}
