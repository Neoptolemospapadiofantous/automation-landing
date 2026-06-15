/**
 * TEMPORARY debug endpoint for the audit-form SMTP wiring.
 *
 * Gated by SMTP_DEBUG_KEY env var — when unset (the safe default), this
 * endpoint returns 404. To enable for a debugging window:
 *
 *   1. Set SMTP_DEBUG_KEY=<any-random-string> in Forge env
 *   2. Redeploy
 *   3. curl "https://www.flowstack.run/api/debug/smtp-test?key=<that-string>"
 *   4. The JSON response either says ok:true or includes nodemailer's
 *      code/responseCode/response so we can pinpoint the failure
 *   5. Unset SMTP_DEBUG_KEY in Forge + redeploy when done
 *
 * Returns 404 (not 401/403) when the key is missing or wrong — so the
 * endpoint's existence isn't even discoverable without the secret.
 */
import { NextResponse } from "next/server";
import { sendAuditEmail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const expected = process.env.SMTP_DEBUG_KEY;
  if (!expected) return new Response("Not found", { status: 404 });

  const url = new URL(request.url);
  const provided = url.searchParams.get("key");
  if (provided !== expected) {
    return new Response("Not found", { status: 404 });
  }

  const result = await sendAuditEmail({
    name: "SMTP debug",
    email: "debug@flowstack.run",
    company: "internal test",
    leak: `Diagnostic message from /api/debug/smtp-test at ${new Date().toISOString()}. Safe to delete.`,
  });

  return NextResponse.json({
    smtp_configured: !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ),
    config: {
      host: process.env.SMTP_HOST ?? null,
      port: process.env.SMTP_PORT ?? null,
      user: process.env.SMTP_USER ?? null,
      from: process.env.SMTP_FROM ?? null,
      recipient: process.env.AUDIT_RECIPIENT ?? null,
      pass_length: process.env.SMTP_PASS?.length ?? 0,
    },
    result,
  });
}
