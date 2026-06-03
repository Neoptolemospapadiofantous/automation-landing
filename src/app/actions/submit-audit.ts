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

  if (!name || !email || !leak) {
    return { ok: false, message: "Please fill in name, email, and the leak." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That email doesn't look quite right." };
  }

  // TODO: forward to CRM / email / Slack webhook. For now, log.
  console.log("[audit-submission]", { name, email, company, leak });

  // Simulate latency so the optimistic UI feels real
  await new Promise((r) => setTimeout(r, 600));

  return { ok: true, message: "Got it. We'll reply within 4 hours." };
}
