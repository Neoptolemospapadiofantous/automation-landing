import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Security — Flowstack",
  description:
    "How Flowstack protects the platform, your data, and your customers' data. Draft scaffold pending counsel review.",
  alternates: { canonical: "/security" },
  robots: { index: false, follow: false },
};

const Tbc = ({ note }: { note: string }) => (
  <span className="tbc">[TBC · {note}]</span>
);

const sections: LegalSection[] = [
  {
    ref: "§1",
    title: "Hosting and architecture",
    body: (
      <>
        <p>
          The agent platform is a Laravel application that operates its
          own conversational runtime, calling large-language-model
          providers (Anthropic by default; OpenAI; optionally Google
          paid-tier) server-side through a single internal contract.
          Customers never reach a model provider directly; provider
          API credentials are held platform-side only and are never
          exposed in browsers, logs, or source control.
        </p>
        <p>
          The marketing site (flowstack.com) runs on a persistent Node
          host because the live-stats pipeline requires a long-lived
          process for the SSE broadcaster singleton — see the{" "}
          <a href="/dpa">DPA</a> for the full sub-processor list and the
          deploy guide for the operational shape.{" "}
          <Tbc note="confirm hosting provider + region(s)" />
        </p>
        <p>
          Each customer team is logically isolated; cross-tenant data
          access is prevented at the application layer and exercised by
          test (team-scoped authorisation on every resource).
        </p>
      </>
    ),
  },
  {
    ref: "§2",
    title: "Encryption and credentials",
    body: (
      <>
        <ul>
          <li>
            <strong>In transit</strong> — TLS on every public endpoint;
            HSTS enforced on the marketing site and the agent dashboard.
          </li>
          <li>
            <strong>At rest</strong> — provided by the hosting database
            (provider-managed; we do not implement application-layer
            encryption at this time).{" "}
            <Tbc note="confirm host-provided encryption + key management once hosting target is finalised" />
          </li>
          <li>
            <strong>Credentials</strong> — provider API keys and
            secrets are stored server-side only in the platform&apos;s
            environment, never embedded in client-side code, log output,
            source control, or transmitted to the browser. Customer
            passwords are hashed with bcrypt.
          </li>
        </ul>
      </>
    ),
  },
  {
    ref: "§3",
    title: "Application controls",
    body: (
      <ul>
        <li>
          Team-scoped authorisation on every resource; cross-tenant
          access prevented and exercised by automated test.
        </li>
        <li>
          Rate limiting on all public and abuse-prone endpoints,
          including registration and password flows.
        </li>
        <li>
          CSRF protection on web forms (standard Laravel middleware,
          covered by test).
        </li>
        <li>
          Operational logs exclude message content — log redaction is
          sentinel-proofed in test, so accidentally logging a
          message body fails CI.
        </li>
        <li>
          Per-customer usage metering with hard limits; agents suspend
          on credit exhaustion. The billing ledger is append-only and
          reconciled daily against live balances.
        </li>
      </ul>
    ),
  },
  {
    ref: "§4",
    title: "Backups and disaster recovery",
    body: (
      <p>
        Primary databases are backed up{" "}
        <Tbc note="frequency, e.g. daily" /> with retention of{" "}
        <Tbc note="N days, e.g. 30" />. Restore is tested{" "}
        <Tbc note="cadence, e.g. quarterly" />. Recovery point and
        recovery time objectives:{" "}
        <Tbc note="RPO / RTO targets" />.
      </p>
    ),
  },
  {
    ref: "§5",
    title: "Vulnerability management",
    body: (
      <ul>
        <li>
          Secret scanning on every commit (gitleaks in CI). Hard-fails
          a push if a credential pattern lands in the repo.
        </li>
        <li>
          Dependency CVE scanning daily (composer audit for PHP,
          pnpm audit for JavaScript), plus a system health check every
          six hours.
        </li>
        <li>
          OS and runtime base images are rebuilt{" "}
          <Tbc note="cadence — confirm once hosting target is fixed" />.
        </li>
        <li>
          External penetration test: not yet — planned post-launch.
        </li>
      </ul>
    ),
  },
  {
    ref: "§6",
    title: "Incident response",
    body: (
      <p>
        Personal-data breaches are notified to affected Customers
        without undue delay and in any event within 72 hours of
        confirmation, per GDPR Articles 33–34 and the{" "}
        <a href="/dpa">DPA</a>. A formal written incident-response
        runbook is in development and will be referenced here once it
        ships; we do not claim one is in force today.
      </p>
    ),
  },
  {
    ref: "§7",
    title: "Regulatory position",
    body: (
      <ul>
        <li>
          <strong>GDPR (Regulation (EU) 2016/679)</strong> — Flowstack
          acts as data processor on behalf of Customers (controllers).
          See the <a href="/privacy">Privacy Policy</a> and{" "}
          <a href="/dpa">DPA</a>. Supervisory authority: Cyprus{" "}
          <a href="https://www.dataprotection.gov.cy">
            Commissioner for Personal Data Protection
          </a>{" "}
          (Law 125(I)/2018).
        </li>
        <li>
          <strong>EU AI Act (Regulation (EU) 2024/1689)</strong> —
          Flowstack acts as AI provider; Customers act as deployers.
          The Article 50 end-user transparency obligation is
          implemented today, ahead of the 2 August 2026 effective date:
          every chat conversation begins with a platform-rendered
          &quot;you are interacting with an AI&quot; disclosure that
          cannot be removed by the Customer, with a one-tap human-
          handoff request that notifies the Customer&apos;s team
          immediately. The product is not deployed for any Annex III
          high-risk use case (no recruitment screening, credit
          scoring, insurance underwriting, education scoring, or
          essential-services eligibility decisions); Customers warrant
          the same in the Terms of Service.
        </li>
        <li>
          <strong>SOC 2 / ISO 27001</strong> — not held today. Targeted
          for post-launch evaluation; we do not claim certifications
          that are not in force.
        </li>
        <li>
          <strong>HIPAA / PCI-DSS</strong> — out of scope. Card data
          flows directly to Stripe and is never seen by us; the agent
          platform does not process protected health information.
        </li>
      </ul>
    ),
  },
  {
    ref: "§8",
    title: "Sub-processors",
    body: (
      <p>
        The current list of sub-processors and their function lives in{" "}
        <a href="/dpa">§7 of the DPA</a>. We maintain a mailing list
        for advance notice of changes — to subscribe, email{" "}
        <a href="mailto:privacy@flowstack.example">
          privacy@flowstack.example
        </a>
        .
      </p>
    ),
  },
  {
    ref: "§9",
    title: "Responsible disclosure",
    body: (
      <p>
        Found something? Email{" "}
        <a href="mailto:security@flowstack.example">
          security@flowstack.example
        </a>
        . Please give us a reasonable window to investigate and fix
        before public disclosure; we will not pursue legal action
        against good-faith researchers who follow this policy. Bounty
        programme: <Tbc note="confirm whether one exists" />.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalDoc
      title="Security"
      intent="How we protect the platform, your data, and your customers' data — both the controls already in place and the ones still being formalised."
      effective="2026-06-08"
      reviewed="2026-06-08"
      sections={sections}
    />
  );
}
