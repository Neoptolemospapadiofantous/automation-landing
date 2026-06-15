import "server-only";
import nodemailer from "nodemailer";

/**
 * Lazy-built SMTP transport. We construct it on first use so a missing
 * env var only blows up when someone tries to send, not at module load
 * (which would crash unrelated routes during build).
 *
 * Returns null when SMTP isn't configured — callers fall back to the
 * console-log behavior instead of failing. Dev / preview deploys can
 * therefore run without SMTP credentials.
 */
function getTransport(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user, pass },
  });
}

export type AuditSubmission = {
  name: string;
  email: string;
  company: string;
  leak: string;
};

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "smtp-not-configured" | "send-failed" };

/**
 * Format the audit-form submission as a plain-text email and send it
 * to AUDIT_RECIPIENT via SMTP. The visitor's email is set as Reply-To
 * so the operator can hit Reply in their inbox to respond directly.
 *
 * Falls back to console.log if SMTP isn't configured — caller still
 * shows the success message to the visitor in that case, so we don't
 * break dev / preview flows.
 */
export async function sendAuditEmail(
  data: AuditSubmission,
): Promise<SendResult> {
  const transporter = getTransport();
  if (!transporter) {
    console.warn(
      "[mail] SMTP not configured — falling back to log-only. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in env to enable real delivery.",
    );
    console.log("[audit-submission]", {
      ...data,
      received_at: new Date().toISOString(),
    });
    return { ok: false, reason: "smtp-not-configured" };
  }

  const to = process.env.AUDIT_RECIPIENT ?? "hello@flowstack.run";
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const company = data.company || "(no company given)";

  const text = [
    `New audit-form submission from flowstack.run/audit`,
    ``,
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Company: ${company}`,
    ``,
    `What the off-the-shelf agent doesn't cover:`,
    `------`,
    data.leak,
    `------`,
    ``,
    `Received: ${new Date().toISOString()}`,
    `Reply to this email and it goes directly to ${data.name}.`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Flowstack audit form" <${from}>`,
      to,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `Audit request — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text,
    });
    return { ok: true };
  } catch (err) {
    console.error("[mail] send failed", err);
    return { ok: false, reason: "send-failed" };
  }
}
