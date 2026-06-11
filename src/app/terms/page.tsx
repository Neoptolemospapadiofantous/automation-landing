import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Terms of Service — Flowstack",
  description:
    "The contract between Flowstack and customers of the agent platform and custom-build studio. Draft scaffold pending counsel review.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
};

const Tbc = ({ note }: { note: string }) => (
  <span className="tbc">[TBC · {note}]</span>
);

const sections: LegalSection[] = [
  {
    ref: "§1",
    title: "Acceptance",
    body: (
      <p>
        By creating an account, subscribing to a plan, or engaging us
        for a custom build, you agree to these Terms on behalf of
        yourself or the organisation you represent. If you do not agree,
        do not use the service. These Terms form the contract between
        you (&quot;Customer&quot;) and Flowstack Studio (&quot;Flowstack&quot;,
        &quot;we&quot;, &quot;us&quot;).
      </p>
    ),
  },
  {
    ref: "§2",
    title: "The service",
    body: (
      <>
        <p>
          Flowstack provides (a) a self-serve AI-agent platform under
          the plans listed on our <a href="/pricing">pricing page</a>,
          and (b) custom-build engagements scoped per project. The
          self-serve plans are billed monthly and may be cancelled at
          any time. Custom-build engagements are governed by an order
          form (statement of work) that incorporates these Terms.
        </p>
      </>
    ),
  },
  {
    ref: "§3",
    title: "Accounts and access",
    body: (
      <>
        <p>
          You must be 18 or older and using the service for a business
          purpose. You are responsible for the accuracy of registration
          details and for keeping account credentials confidential.
          Notify us immediately at{" "}
          <a href="mailto:security@flowstack.example">
            security@flowstack.example
          </a>{" "}
          if you suspect unauthorised access.
        </p>
      </>
    ),
  },
  {
    ref: "§4",
    title: "Fees, billing, cancellation",
    body: (
      <>
        <ul>
          <li>
            Subscription fees are charged monthly in advance at the rate
            shown on your account at the time of renewal.
          </li>
          <li>
            Cancellation takes effect at the end of the current billing
            cycle; we do not pro-rate refunds for partial months unless
            required by law.
          </li>
          <li>
            We may change the price for a future billing period with at
            least <Tbc note="N days, e.g. 30" /> notice by email.
          </li>
          <li>
            Custom-build fees are quoted on the order form and invoiced
            on the schedule set there. Late payment interest accrues at{" "}
            <Tbc note="rate, e.g. statutory" />.
          </li>
        </ul>
      </>
    ),
  },
  {
    ref: "§5",
    title: "Acceptable use",
    body: (
      <>
        <p>You will not, and will not allow anyone to:</p>
        <ul>
          <li>
            use the service to send spam, malware, or content that
            infringes a third party&apos;s rights;
          </li>
          <li>
            attempt to access another customer&apos;s data or to
            interfere with the integrity, security or performance of
            the service;
          </li>
          <li>
            reverse engineer or copy the platform, except to the extent
            permitted by mandatory law;
          </li>
          <li>
            use the service to make automated decisions with legal or
            similarly significant effects on individuals without an
            appropriate lawful basis and human review.
          </li>
        </ul>
        <p>
          We may suspend or terminate access for material breach of this
          section, with notice where reasonable.
        </p>
      </>
    ),
  },
  {
    ref: "§6",
    title: "Customer data and intellectual property",
    body: (
      <>
        <p>
          You retain all rights to your Customer Data — knowledge-base
          content, transcripts, leads, and any other data you put into
          the platform. You grant us a limited, non-exclusive licence
          to host, process and transmit Customer Data solely to deliver
          the service.
        </p>
        <p>
          We retain all rights to the platform, the agent runtime, the
          UI, and any improvements, including those derived from
          aggregated, de-identified usage data that cannot reasonably
          be linked back to you or any individual.
        </p>
        <p>
          For custom-build engagements, IP ownership is set in the
          order form. The default is that you own the code we ship for
          you; we retain rights to the underlying platform and any
          reusable libraries we created before or independently of the
          engagement.
        </p>
      </>
    ),
  },
  {
    ref: "§7",
    title: "Privacy and data protection",
    body: (
      <p>
        We process personal data in accordance with the{" "}
        <a href="/privacy">Privacy Policy</a> and, where we act as a
        processor for your Customer Data, the{" "}
        <a href="/dpa">Data Processing Agreement</a>, which is
        incorporated by reference.
      </p>
    ),
  },
  {
    ref: "§8",
    title: "Service availability",
    body: (
      <p>
        We aim for high availability but do not currently offer a
        contractual SLA on the self-serve plans. For custom-build
        engagements and enterprise terms, availability targets and
        remedies are set in the order form.{" "}
        <Tbc note="confirm whether a public uptime page or SLA exists" />
      </p>
    ),
  },
  {
    ref: "§9",
    title: "Warranties and disclaimer",
    body: (
      <p>
        Except as expressly stated, the service is provided
        &quot;as is&quot; and &quot;as available&quot;. To the maximum
        extent permitted by law, we disclaim all implied warranties,
        including merchantability, fitness for a particular purpose,
        and non-infringement. Statutory consumer rights, where they
        apply, are not affected.
      </p>
    ),
  },
  {
    ref: "§10",
    title: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, each party&apos;s total
        aggregate liability arising under or in connection with these
        Terms is capped at the fees paid by Customer in the{" "}
        <Tbc note="12 months, typical" /> preceding the event giving
        rise to liability. Neither party is liable for indirect or
        consequential losses, loss of profits, revenue, goodwill or
        anticipated savings. Nothing limits liability that cannot be
        limited under applicable law (fraud, death, personal injury,
        wilful misconduct).
      </p>
    ),
  },
  {
    ref: "§11",
    title: "Indemnification",
    body: (
      <p>
        We will defend and indemnify you against third-party claims
        that the unmodified service infringes that party&apos;s
        intellectual property rights, subject to standard conditions
        (prompt notice, control of defence, no settlement without
        consent). You will defend and indemnify us against third-party
        claims arising from your Customer Data or from your breach of{" "}
        <a href="#section-5">§5 Acceptable use</a>.
      </p>
    ),
  },
  {
    ref: "§12",
    title: "Term and termination",
    body: (
      <>
        <ul>
          <li>
            These Terms continue until terminated by either party.
          </li>
          <li>
            You may terminate at any time by cancelling your
            subscription; access continues until the end of the paid
            period.
          </li>
          <li>
            We may terminate for material breach not cured within{" "}
            <Tbc note="N days, e.g. 30" /> of written notice, or
            immediately for severe acceptable-use violations.
          </li>
          <li>
            Sections that by their nature should survive (IP, payment
            obligations accrued, liability, governing law) survive
            termination.
          </li>
        </ul>
      </>
    ),
  },
  {
    ref: "§13",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of{" "}
        <Tbc note="Portugal / Greece / other" />. The courts of{" "}
        <Tbc note="city / country" /> have exclusive jurisdiction,
        without prejudice to any non-waivable consumer protections
        available where you are habitually resident.
      </p>
    ),
  },
  {
    ref: "§14",
    title: "Changes to these Terms",
    body: (
      <p>
        We may update these Terms from time to time. Material changes
        are notified by email at least{" "}
        <Tbc note="N days, e.g. 30" /> before they take effect.
        Continued use after that date constitutes acceptance.
      </p>
    ),
  },
  {
    ref: "§15",
    title: "Contact",
    body: (
      <p>
        Questions about these Terms:{" "}
        <a href="mailto:legal@flowstack.example">
          legal@flowstack.example
        </a>{" "}
        <Tbc note="confirm address" />. Postal address:{" "}
        <Tbc note="registered office" />.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Service"
      intent="The contract between Flowstack and customers of the agent platform and the custom-build studio."
      effective="2026-06-08"
      reviewed="2026-06-08"
      sections={sections}
    />
  );
}
