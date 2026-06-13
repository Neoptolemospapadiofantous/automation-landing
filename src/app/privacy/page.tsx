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
          Flowstack Studio Ltd (&quot;Flowstack&quot;, &quot;we&quot;,
          &quot;us&quot;) is a company established in Nicosia, Cyprus,
          providing AI-powered assistant software to businesses across
          many sectors. We are the data controller for the personal
          data processed in connection with this site (
          <a href="https://flowstack.example">flowstack.example</a>).
          For personal data processed inside the Flowstack agent
          platform on behalf of our business customers, we act as a
          data processor and the customer is the controller — see the{" "}
          <a href="/dpa">Data Processing Agreement</a>.
        </p>
        <p>
          Registered office:{" "}
          <Tbc note="legal name, registration number, address — Nicosia, Cyprus" />.
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
          <strong>AI transparency (EU AI Act Article 50).</strong> Every
          chat conversation in the agent begins with a platform-rendered
          disclosure that you are interacting with an AI assistant and
          can request a human at any time. The disclosure is enforced at
          the interface layer and cannot be removed by the Client. The
          AI Act's transparency obligations apply from 2 August 2026; we
          implemented them ahead of that date.
        </p>
        <p>
          We do not use personal data for automated decision-making
          producing legal or similarly significant effects on you, we do
          not sell personal data, and we do not use your data or your
          visitors&apos; conversations to train AI models — our model
          providers are bound by their commercial terms not to train on
          API data (Google&apos;s free tier is contractually excluded
          for that reason; we use the paid tier only).
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
          instructions. The current authoritative list lives in{" "}
          <a href="/dpa">DPA §7</a> and is reproduced here for visibility.
        </p>
        <ul>
          <li>
            <strong>LLM inference</strong> — Anthropic (United States)
            for the default Claude tier; OpenAI (United States) for the
            ChatGPT tier and for knowledge-base embeddings; Google
            (United States) for the optional Gemini tier (paid only —
            the free tier trains on data and is contractually
            excluded). Model providers process chat content; we never
            send our visitors&apos; identifiers beyond what the chat
            content itself contains.
          </li>
          <li>
            <strong>Real-time UI events</strong> — Pusher (United
            Kingdom / United States) for the dashboard&apos;s live
            updates. EU cluster available.
          </li>
          <li>
            <strong>Payments</strong> — Stripe (United States / Ireland).
            Card details go directly to Stripe; we never see or store
            card numbers.
          </li>
          <li>
            <strong>Transactional email</strong> — Amazon Web Services
            SES <Tbc note="confirm SES region in use" />.
          </li>
          <li>
            <strong>Search (optional)</strong> — Typesense for
            knowledge-base retrieval. Currently off; database fallback
            in use.
          </li>
          <li>
            <strong>Hosting / infrastructure</strong>{" "}
            <Tbc note="provider, region — confirm before publication" />.
          </li>
          <li>
            <strong>Website analytics</strong> — Google Analytics 4
            (Google Ireland Limited) on this marketing site only. Loaded
            after explicit visitor consent via the cookie banner; IP
            anonymisation enabled. Not invoked inside the agent
            platform.
          </li>
        </ul>
      </>
    ),
  },
  {
    ref: "§5",
    title: "International transfers",
    body: (
      <>
        <p>
          Several sub-processors (notably the LLM providers and Stripe)
          process data in the United States. Where personal data is
          transferred outside the European Economic Area we rely on the
          European Commission&apos;s Standard Contractual Clauses
          (SCCs, 2021/914) together with a Transfer Impact Assessment
          per EDPB Recommendations 01/2020, and any necessary
          supplementary measures.{" "}
          <Tbc note="verify per-provider SCC vs DPF status at publication — Anthropic, OpenAI, Google, Stripe, Pusher, AWS" />
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
          </a>{" "}
          — we respond within one month. You can also lodge a complaint
          with the Cyprus{" "}
          <a href="https://www.dataprotection.gov.cy">
            Commissioner for Personal Data Protection
          </a>{" "}
          (the supervisory authority for our establishment under Cyprus
          Law 125(I)/2018) or with the supervisory authority where you
          are habitually resident.
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
