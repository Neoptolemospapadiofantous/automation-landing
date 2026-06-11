import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Privacy Policy — Flowstack",
  description:
    "How Flowstack collects, uses, shares, retains and protects personal data. Draft scaffold pending counsel review.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

const Tbc = ({ note }: { note: string }) => (
  <span className="tbc">[TBC · {note}]</span>
);

const sections: LegalSection[] = [
  {
    ref: "§1",
    title: "Who we are",
    body: (
      <>
        <p>
          Flowstack Studio (&quot;Flowstack&quot;, &quot;we&quot;,
          &quot;us&quot;) is the data controller for the personal data
          processed in connection with this site (
          <a href="https://flowstack.example">flowstack.example</a>) and
          the Flowstack agent platform.
        </p>
        <p>
          Registered office:{" "}
          <Tbc note="legal entity, registration number, address" />.
          Contact for privacy matters:{" "}
          <a href="mailto:privacy@flowstack.example">
            privacy@flowstack.example
          </a>{" "}
          <Tbc note="confirm address" />.
        </p>
      </>
    ),
  },
  {
    ref: "§2",
    title: "What data we collect",
    body: (
      <>
        <p>
          We collect personal data in the following categories:
        </p>
        <ul>
          <li>
            <strong>Account data</strong> — name, work email, company,
            role, and the credentials you create when you sign up for
            the agent platform.
          </li>
          <li>
            <strong>Inquiry data</strong> — when you submit the audit
            form, we collect your name, work email, company &amp; role,
            and the description of the engagement you&apos;re scoping.
          </li>
          <li>
            <strong>Usage data</strong> — server logs, IP address,
            user-agent, request timing and error events, used to keep
            the service running and secure.
          </li>
          <li>
            <strong>Customer content</strong> — transcripts and lead
            data flowing through your agent. Processed under your
            instructions; see the{" "}
            <a href="/dpa">Data Processing Agreement</a>.
          </li>
          <li>
            <strong>Billing data</strong> — processed by our payment
            provider (<Tbc note="Stripe / other" />
            ); we receive the minimum needed to issue invoices and
            reconcile payments.
          </li>
        </ul>
      </>
    ),
  },
  {
    ref: "§3",
    title: "How we use it (purposes and lawful basis)",
    body: (
      <>
        <ul>
          <li>
            <strong>To deliver the service you subscribed to</strong> —
            lawful basis: performance of a contract (GDPR Art. 6(1)(b)).
          </li>
          <li>
            <strong>To respond to inquiries</strong> sent through the
            audit form — lawful basis: pre-contractual steps at your
            request (GDPR Art. 6(1)(b)) and, for follow-up beyond the
            initial reply, your consent (Art. 6(1)(a)).
          </li>
          <li>
            <strong>To operate, secure, and improve the platform</strong>
            — lawful basis: legitimate interest (GDPR Art. 6(1)(f)),
            balanced against your interests and rights.
          </li>
          <li>
            <strong>To comply with legal obligations</strong> (tax,
            accounting, lawful requests from competent authorities) —
            lawful basis: legal obligation (GDPR Art. 6(1)(c)).
          </li>
        </ul>
        <p>
          We do not use personal data for automated decision-making with
          legal or similarly significant effects on you, and we do not
          sell personal data.
        </p>
      </>
    ),
  },
  {
    ref: "§4",
    title: "Who we share it with",
    body: (
      <>
        <p>
          We share personal data only with the processors and parties
          listed below, under written agreements that bind them to
          confidentiality and to processing on our documented
          instructions:
        </p>
        <ul>
          <li>
            <strong>Hosting / infrastructure</strong>{" "}
            <Tbc note="provider, region" />
          </li>
          <li>
            <strong>Transactional email</strong>{" "}
            <Tbc note="provider, region" />
          </li>
          <li>
            <strong>Payments</strong> <Tbc note="provider, region" />
          </li>
          <li>
            <strong>Customer support tooling</strong>{" "}
            <Tbc note="provider, region" />
          </li>
          <li>
            <strong>Analytics</strong> — Google Analytics 4 (Google
            Ireland Limited, EU/US transfers under SCCs). Loaded only
            after explicit visitor consent via the cookie banner; IP
            anonymisation enabled.
          </li>
        </ul>
        <p>
          The current list of sub-processors lives in the{" "}
          <a href="/dpa">Data Processing Agreement</a>.
        </p>
      </>
    ),
  },
  {
    ref: "§5",
    title: "International transfers",
    body: (
      <>
        <p>
          Where personal data is transferred outside the European
          Economic Area, we rely on the European Commission&apos;s
          Standard Contractual Clauses (SCCs, 2021/914) and, where
          appropriate, supplementary measures as described in
          EDPB Recommendations 01/2020. The receiving processors are
          listed in <a href="/dpa">§7 of the DPA</a>.
        </p>
      </>
    ),
  },
  {
    ref: "§6",
    title: "How long we keep it",
    body: (
      <>
        <ul>
          <li>
            <strong>Account data</strong> — for the duration of your
            subscription and{" "}
            <Tbc note="N years" /> thereafter, for billing,
            audit and dispute purposes.
          </li>
          <li>
            <strong>Inquiry data</strong> from the audit form —{" "}
            <Tbc note="N months, e.g. 12" /> from last contact, then
            deleted unless you become a customer.
          </li>
          <li>
            <strong>Customer content</strong> — retained per the
            instructions you set in the platform; deleted within{" "}
            <Tbc note="N days, e.g. 30" /> of subscription termination.
          </li>
          <li>
            <strong>Server logs</strong> —{" "}
            <Tbc note="N days, e.g. 30" />, longer where needed for
            security investigations.
          </li>
        </ul>
      </>
    ),
  },
  {
    ref: "§7",
    title: "Your rights",
    body: (
      <>
        <p>
          Subject to the conditions in the GDPR (and equivalent regimes
          such as the UK GDPR and the California Consumer Privacy Act),
          you have the right to:
        </p>
        <ul>
          <li>access the personal data we hold about you;</li>
          <li>correct inaccurate or incomplete data;</li>
          <li>delete data we no longer have a lawful basis to keep;</li>
          <li>port the data you provided in a portable format;</li>
          <li>
            restrict or object to processing based on legitimate
            interest;
          </li>
          <li>
            withdraw consent at any time, where consent is the basis
            (without affecting the lawfulness of prior processing).
          </li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a href="mailto:privacy@flowstack.example">
            privacy@flowstack.example
          </a>
          . You can also lodge a complaint with your local supervisory
          authority — in Portugal, the{" "}
          <a href="https://www.cnpd.pt">CNPD</a>;{" "}
          <Tbc note="add any other primary jurisdictions" />.
        </p>
      </>
    ),
  },
  {
    ref: "§8",
    title: "Cookies and tracking",
    body: (
      <>
        <p>
          We use two categories of cookies:
        </p>
        <ul>
          <li>
            <strong>Strictly necessary</strong> — first-party cookies
            required to run the page (session identifier on the agent
            platform, the cookie that records your consent choice for
            this banner). These are set without consent because the
            site cannot function without them.
          </li>
          <li>
            <strong>Analytics</strong> — Google Analytics 4 cookies
            (`_ga`, `_ga_*`) used to measure how visitors find and use
            the site so we can improve it. These are set{" "}
            <strong>only after you click &quot;Accept&quot;</strong> on
            the consent banner, in line with Google Consent Mode v2.
            The analytics script is blocked from running until you
            consent. IP addresses are anonymised at collection.
          </li>
        </ul>
        <p>
          We do not set advertising or third-party tracking cookies.
          You can withdraw analytics consent at any time by clearing
          the `flowstack-consent` value in your browser&apos;s storage
          — the banner will re-appear on the next page load.
        </p>
      </>
    ),
  },
  {
    ref: "§9",
    title: "Children",
    body: (
      <p>
        Flowstack is a business product. We do not knowingly process
        personal data of children under 16. If you believe a child has
        provided us personal data, contact{" "}
        <a href="mailto:privacy@flowstack.example">
          privacy@flowstack.example
        </a>{" "}
        and we will delete it.
      </p>
    ),
  },
  {
    ref: "§10",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this policy as the product evolves. Material
        changes will be notified by email to active customers at least{" "}
        <Tbc note="N days, e.g. 30" /> before they take effect. The
        Effective date at the top of this page indicates the most
        recent version.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      intent="How Flowstack collects, uses, shares, retains and protects personal data — written so a procurement team can audit it and a customer can understand it."
      effective="2026-06-08"
      reviewed="2026-06-08"
      sections={sections}
    />
  );
}
