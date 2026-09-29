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
    // Short timeouts so a misconfigured / blocked-port deploy surfaces a
    // visible error in ~10s instead of leaving the server action hanging
    // for nodemailer's 5-minute default. If you see consistent timeouts,
    // try SMTP_PORT=587 (STARTTLS) — some networks silently drop 465.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export type AuditSubmission = {
  name: string;
  email: string;
  company: string;
  leak: string;
  /** Which language the form was filled in — the reply should match. */
  lang?: "en" | "el";
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
/**
 * Write the submission where it survives, before we try to deliver it.
 * Email is a notification; it is not a record. Every outcome goes through
 * here so an enquiry is never held only by a mail server. Appends to
 * AUDIT_LOG_PATH when set (point it OUTSIDE the release dir — each deploy
 * replaces `current`), and always emits a structured line the process log
 * keeps regardless.
 */
function recordSubmission(data: AuditSubmission, outcome: string): void {
  const row = JSON.stringify({
    ...data,
    outcome,
    received_at: new Date().toISOString(),
  });
  console.log("[audit-submission]", row);

  const path = process.env.AUDIT_LOG_PATH;
  if (!path) return;
  try {
    // Lazy require: this file is imported by client-adjacent code paths and
    // node:fs must not end up in a browser bundle.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("node:fs") as typeof import("node:fs");
    fs.appendFileSync(path, row + "\n", { encoding: "utf8" });
  } catch (err) {
    // A full disk or a bad path must never cost us the submission: the
    // console line above already has it.
    console.error("[mail] audit log append failed", err);
  }
}

export async function sendAuditEmail(
  data: AuditSubmission,
): Promise<SendResult> {
  const transporter = getTransport();
  if (!transporter) {
    console.warn(
      "[mail] SMTP not configured — falling back to log-only. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in env to enable real delivery.",
    );
    recordSubmission(data, "smtp-not-configured");
    return { ok: false, reason: "smtp-not-configured" };
  }

  const to = process.env.AUDIT_RECIPIENT ?? "hello@flowstack.run";
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER!;
  const company = data.company || "(no company given)";

  const greek = data.lang === "el";

  const text = [
    greek
      ? `New audit-form submission from flowstack.run/el/audit — REPLY IN GREEK`
      : `New audit-form submission from flowstack.run/audit`,
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
      subject: `Audit request${greek ? " (EL)" : ""} — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text,
    });
    recordSubmission(data, "delivered");
    return { ok: true };
  } catch (err) {
    // Delivery failed. Log the WHOLE submission, not just the error: this is a
    // real person who filled the form, and the mail we cannot send is the only
    // copy of what they said. Without this the enquiry is gone. (Sep 2026: the
    // box's outbound SMTP ports 25/465/587 are blocked by the host, so every
    // submission failed here for months and none was recoverable.)
    console.error("[mail] send failed", err);
    recordSubmission(data, "UNDELIVERED");
    return { ok: false, reason: "send-failed" };
  }
}
