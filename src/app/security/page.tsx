import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Flowstack protects the platform, your data and your customers' data: tenant isolation, encrypted credentials, backups, and how we handle incidents.",
  alternates: { canonical: "/security" },
};

const sections: LegalSection[] = [
  {
    ref: "§1",
    title: "Hosting and architecture",
    body: (
      <>
        <p>
          The agent platform is a Laravel application that operates its
          own conversational runtime, calling large-language-model
          providers server-side through a single internal contract.
          OpenAI is the only provider we send data to on our own
          account, and the Claude and Gemini tiers are not enabled on our
          accounts. On the Operator plan a customer may connect its own
          OpenAI or Anthropic key, in which case that customer&apos;s
          chat runs on their provider account instead — see{" "}
          <a href="/dpa">DPA §7</a>. Customers never reach a model
          provider directly; provider API credentials — ours, and any a
          customer connects — are held platform-side only, encrypted at
          rest, and are never exposed in browsers, logs, or source
          control.
        </p>
        <p>
          The marketing site (flowstack.run) is a statically prerendered
          Next.js application served from its own host; it holds no
          customer data and calls no model providers — see the{" "}
          <a href="/dpa">DPA</a> for the full sub-processor list and the
          deploy guide for the operational shape. Both run on
          DigitalOcean droplets in Amsterdam (AMS3), Netherlands; the
          application database sits on the same private host as the
          application and is not exposed to the public internet.
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
            <strong>In transit</strong> — TLS on every public endpoint.
            HSTS is enforced on the marketing site
            (<code>max-age</code> two years, includeSubDomains, preload);
            it is not yet set on the agent dashboard.
          </li>
          <li>
            <strong>At rest</strong> — provided by the hosting database
            (provider-managed; we do not implement application-layer
            encryption at this time). Disk encryption and key
            management are handled by DigitalOcean at the block-storage
            layer. Database backups are the exception: those are
            encrypted by us, with a key the server does not hold (see
            §4).
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
      <>
        <p>
          The production database is dumped nightly at 02:17 UTC, with a
          consistent-snapshot dump that does not lock the running site.
          Dumps are compressed, stored with owner-only permissions on the
          application host, and pruned after thirty days.
        </p>
        <p>
          Restores are verified by loading the most recent dump into a
          scratch database and comparing table and row counts against
          production — never over the live database. The recovery point
          objective follows from the nightly schedule: at most
          twenty-four hours of data. We do not publish a recovery time
          objective, because we do not offer a contractual availability
          commitment on self-serve plans (see{" "}
          <a href="/terms">Terms §8</a>); a measured restore of the
          current database completes in under a minute.
        </p>
        <p>
          Every dump is encrypted before it touches disk, to a public key
          whose private half is held off the server. The application host
          can write new backups but cannot read any of them, including
          its own — so a compromise of the server does not hand over its
          backup history.
        </p>
        <p>
          Encrypted dumps are replicated nightly to separate
          infrastructure under our control, inside the EEA, and kept
          there for ninety days against thirty on the server. The copy is
          <em>pulled</em> by the destination rather than pushed by the
          server, so the server holds no credential that could be used to
          reach in and delete the off-host history. Each pull is verified
          by decrypting the newest archive and confirming it is a
          readable dump.
        </p>
      </>
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
          OS packages are patched on the host through the distribution
          security channel; we do not run immutable rebuilt images.
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
        without undue delay and in any event within forty-eight hours of
        becoming aware, per the <a href="/dpa">DPA §9</a>. That window is
        deliberately tighter than the seventy-two hours GDPR Article 33
        then allows the Customer, as controller, to notify its own
        supervisory authority. A formal written incident-response
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
        <a href="mailto:privacy@flowstack.run">
          privacy@flowstack.run
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
        <a href="mailto:security@flowstack.run">
          security@flowstack.run
        </a>
        . Please give us a reasonable window to investigate and fix
        before public disclosure; we will not pursue legal action
        against good-faith researchers who follow this policy. We do not
        run a paid bug-bounty programme.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalDoc
      title="Security"
      intent="How we protect the platform, your data, and your customers' data — both the controls already in place and the ones still being formalised."
      effective="2026-08-30"
      reviewed="2026-08-30"
      sections={sections}
    />
  );
}
