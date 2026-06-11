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
    title: "Hosting and infrastructure",
    body: (
      <p>
        The platform runs on{" "}
        <Tbc note="provider, region(s)" />, on a persistent Node host
        (the live-stats pipeline requires a long-lived process — see the{" "}
        <a href="/dpa">DPA</a> for sub-processor detail). Each customer
        tenant is logically isolated; cross-tenant data access is
        prevented at the application layer.
      </p>
    ),
  },
  {
    ref: "§2",
    title: "Encryption",
    body: (
      <>
        <ul>
          <li>
            <strong>In transit</strong> — TLS 1.2+ on every public
            endpoint; HSTS enforced on the marketing site and the agent
            dashboard.
          </li>
          <li>
            <strong>At rest</strong> —{" "}
            <Tbc note="confirm: provider-managed AES-256, KMS-backed?" />
            .
          </li>
          <li>
            <strong>Secrets</strong> — environment variables and API
            credentials live in{" "}
            <Tbc note="provider's secret manager or equivalent" /> and
            are never logged or transmitted to the browser.
          </li>
        </ul>
      </>
    ),
  },
  {
    ref: "§3",
    title: "Access control",
    body: (
      <ul>
        <li>
          Production access is limited to a named on-call rotation. All
          access is via SSO with mandatory MFA.
        </li>
        <li>
          Principle of least privilege: production database credentials
          are scoped per service.
        </li>
        <li>
          Access is reviewed{" "}
          <Tbc note="cadence, e.g. quarterly" /> and revoked on role
          change or departure.
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
    title: "Vulnerability management and patching",
    body: (
      <ul>
        <li>
          Dependencies are scanned on every commit; critical findings
          block merge.
        </li>
        <li>
          OS and runtime base images are rebuilt{" "}
          <Tbc note="cadence, e.g. weekly" />.
        </li>
        <li>
          External penetration test:{" "}
          <Tbc note="cadence + last test date, or 'not yet'" />.
        </li>
      </ul>
    ),
  },
  {
    ref: "§6",
    title: "Incident response",
    body: (
      <p>
        On detection of a security incident affecting customer data,
        we follow a written runbook: contain, eradicate, recover,
        notify. Customers affected by a personal-data breach are
        notified without undue delay and in any event within 72 hours
        of confirmation, per GDPR Art. 33–34 and the{" "}
        <a href="/dpa">DPA</a>.
      </p>
    ),
  },
  {
    ref: "§7",
    title: "Compliance and certifications",
    body: (
      <ul>
        <li>
          <strong>GDPR</strong> — see the{" "}
          <a href="/privacy">Privacy Policy</a> and{" "}
          <a href="/dpa">DPA</a>.
        </li>
        <li>
          <strong>SOC 2 / ISO 27001</strong> —{" "}
          <Tbc note="status: 'in progress', 'not yet', or certification number" />
          .
        </li>
        <li>
          <strong>HIPAA / PCI-DSS</strong> —{" "}
          <Tbc note="confirm whether in scope" />.
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
