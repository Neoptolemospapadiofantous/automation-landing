"use server";

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

  // TODO: forward to CRM / email / Slack webhook. For now, log.
  // consent_at gives the audit trail GDPR Art. 7(1) expects.
  console.log("[audit-submission]", {
    name,
    email,
    company,
    leak,
    consent_at: new Date().toISOString(),
  });

  // Simulate latency so the optimistic UI feels real
  await new Promise((r) => setTimeout(r, 600));

  return { ok: true, message: "Got it. We'll reply within 4 hours." };
}
