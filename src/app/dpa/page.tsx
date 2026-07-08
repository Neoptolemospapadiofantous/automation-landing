import type { Metadata } from "next";
import { LegalDoc, type LegalSection } from "@/components/legal/legal-doc";

export const metadata: Metadata = {
  title: "Data Processing Agreement — Flowstack",
  description:
    "GDPR Article 28 Data Processing Agreement between Flowstack (processor) and the Customer (controller).",
  alternates: { canonical: "/dpa" },
};

const Tbc = ({ note }: { note: string }) => (
  <span className="tbc">[TBC · {note}]</span>
);

const sections: LegalSection[] = [
  {
    ref: "§1",
    title: "Scope and roles",
    body: (
      <p>
        This Data Processing Agreement (&quot;DPA&quot;) forms part of
        the <a href="/terms">Terms of Service</a> between Flowstack
        Studio (&quot;Processor&quot;) and the Customer
        (&quot;Controller&quot;). It applies to all processing of
        personal data carried out by Processor on behalf of Controller
        in delivering the agent platform and any related services. In
        case of conflict, this DPA prevails over the Terms for matters
        of data protection.
      </p>
    ),
  },
  {
    ref: "§2",
    title: "Definitions",
    body: (
      <p>
        Capitalised terms not defined here have the meanings given in
        the EU General Data Protection Regulation 2016/679
        (&quot;GDPR&quot;). &quot;Standard Contractual Clauses&quot;
        means the SCCs adopted by Commission Implementing Decision (EU)
        2021/914.
      </p>
    ),
  },
  {
    ref: "§3",
    title: "Subject matter, nature and duration",
    body: (
      <ul>
        <li>
          <strong>Subject matter</strong> — provision of the Flowstack
          AI-agent platform to Controller. The Platform operates its
          own conversational runtime that calls large-language-model
          providers (Anthropic by default; OpenAI; optionally Google
          paid-tier) server-side through a single internal contract;
          model providers act as sub-processors and never interact
          with end-users directly.
        </li>
        <li>
          <strong>Nature and purpose</strong> — hosting, processing and
          transmitting personal data as part of the agent service so
          Controller can run AI agents against its knowledge base and
          its end-users.
        </li>
        <li>
          <strong>Duration</strong> — for the term of the underlying
          subscription or order form, plus the wind-down period for
          return or deletion of data (see <a href="#section-12">§12</a>
          ).
        </li>
        <li>
          <strong>Categories of data subjects</strong> —
          Controller&apos;s employees, contractors, customers,
          prospects and any individuals who interact with the agent.
        </li>
        <li>
          <strong>Categories of personal data</strong> — contact
          identifiers (name, email, phone, company), conversation
          content and transcripts, lead capture data, usage metadata.
          No special-category data is intended to be processed; if it
          is, Controller warrants it has an appropriate lawful basis
          (GDPR Art. 9), including explicit consent where required.
        </li>
      </ul>
    ),
  },
  {
    ref: "§4",
    title: "Controller instructions",
    body: (
      <p>
        Processor shall process personal data only on documented
        instructions from Controller, including the instructions
        contained in the Terms, the platform configuration set by
        Controller, and any reasonable written direction from
        Controller. Processor shall inform Controller without undue
        delay if, in its opinion, an instruction infringes the GDPR or
        other applicable data-protection law.
      </p>
    ),
  },
  {
    ref: "§5",
    title: "Confidentiality",
    body: (
      <p>
        Processor ensures personnel authorised to process personal data
        are bound by written confidentiality obligations or are under
        an appropriate statutory duty of confidence, and that access is
        limited to what is necessary to provide the service.
      </p>
    ),
  },
  {
    ref: "§6",
    title: "Security measures",
    body: (
      <p>
        Processor implements appropriate technical and organisational
        measures to ensure a level of security appropriate to the risk,
        including those summarised on the{" "}
        <a href="/security">Security page</a> (Annex II of this DPA).
        Controller acknowledges that the measures listed there are the
        baseline; either party may propose changes if the risk profile
        of processing changes materially.
      </p>
    ),
  },
  {
    ref: "§7",
    title: "Sub-processors",
    body: (
      <>
        <p>
          Controller grants general authorisation for Processor to
          engage the sub-processors listed below, subject to the
          notification right in this section. Transfer mechanism for
          each provider is verified against the provider&apos;s current
          DPA and Transfer Impact Assessment prior to publication of
          this list.
        </p>
        <ul>
          <li>
            <strong>Anthropic, PBC (United States)</strong> — LLM
            inference (Claude tier). Conversation content. DPA on file.
            Transfer mechanism:{" "}
            <Tbc note="verify SCCs vs DPF status at publication" />.
          </li>
          <li>
            <strong>OpenAI, LLC (United States)</strong> — LLM
            inference (ChatGPT tier) and knowledge-base embeddings.
            Conversation content and knowledge-base text. DPA on file.
            Transfer mechanism:{" "}
            <Tbc note="verify SCCs vs DPF status at publication" />.
          </li>
          <li>
            <strong>Google LLC (United States)</strong> — LLM inference
            (Gemini tier, optional). Paid tier only — the free tier
            trains on data and is contractually excluded. Conversation
            content. Transfer mechanism:{" "}
            <Tbc note="verify SCCs vs DPF status at publication" />.
          </li>
          <li>
            <strong>Stripe, Inc. (United States) / Stripe Payments
            Europe Ltd (Ireland)</strong> — payment processing. Billing
            identity; no conversation data. SCCs under Stripe DPA.
          </li>
          <li>
            <strong>Pusher Ltd (United Kingdom / United States)</strong>{" "}
            — real-time WebSocket delivery for the dashboard UI. Lead
            identifiers and message snippets in broadcast payloads. EU
            cluster available on request. Transfer mechanism:{" "}
            <Tbc note="UK adequacy decision + SCCs as applicable" />.
          </li>
          <li>
            <strong>Amazon Web Services, Inc.</strong> — transactional
            email (SES). Email addresses and notification content.{" "}
            <Tbc note="confirm SES region" />.
          </li>
          <li>
            <strong>Typesense (optional, currently off)</strong> —
            knowledge-base search. Message text only when enabled.
            Database fallback in use today.
          </li>
          <li>
            <strong>Hosting / infrastructure</strong> —{" "}
            <Tbc note="confirm provider + region before publication" />.
          </li>
        </ul>
        <p>
          The marketing site (flowstack.com) additionally uses Google
          Analytics 4 (Google Ireland Limited) under explicit visitor
          consent; this is outside Customer Data and is documented in
          the <a href="/privacy">Privacy Policy §4</a>.
        </p>
        <p>
          Processor will give Controller at least{" "}
          <Tbc note="N days, e.g. 30" /> notice of any addition or
          replacement, during which Controller may object on reasonable
          data-protection grounds. Processor flows down the
          data-protection obligations in this DPA to every
          sub-processor by written contract and remains liable to
          Controller for sub-processor performance.
        </p>
      </>
    ),
  },
  {
    ref: "§8",
    title: "Data subject rights and requests",
    body: (
      <p>
        Processor shall, taking into account the nature of the
        processing, assist Controller with appropriate technical and
        organisational measures, insofar as possible, to respond to
        data-subject requests under GDPR Chapter III. If Processor
        receives a request directly, it will redirect the data subject
        to Controller without responding to the substance.
      </p>
    ),
  },
  {
    ref: "§9",
    title: "Personal data breach notification",
    body: (
      <p>
        Processor will notify Controller without undue delay and in any
        event within{" "}
        <Tbc note="N hours, e.g. 48" /> of becoming aware of a
        personal-data breach affecting Controller&apos;s personal data,
        with the information required by GDPR Art. 33(3) as soon as
        available. The parties will cooperate in good faith to
        investigate, mitigate and remediate the breach.
      </p>
    ),
  },
  {
    ref: "§10",
    title: "Audits",
    body: (
      <p>
        Processor will make available to Controller, on reasonable
        written request and subject to confidentiality, the information
        necessary to demonstrate compliance with this DPA. Controller
        may audit Processor&apos;s compliance not more than once per
        twelve-month period (and more frequently as required by a
        competent supervisory authority), subject to reasonable advance
        notice and a mutually agreed scope. Audits will be conducted
        without unreasonable disruption to Processor&apos;s operations
        and at Controller&apos;s cost unless they reveal material
        non-compliance.
      </p>
    ),
  },
  {
    ref: "§11",
    title: "International transfers",
    body: (
      <p>
        Where personal data is transferred outside the EEA to a country
        without an adequacy decision, the parties incorporate the
        Standard Contractual Clauses (Commission Implementing Decision
        (EU) 2021/914, Module Two — Controller to Processor) into this
        DPA by reference. Each transfer is supported by a Transfer
        Impact Assessment per EDPB Recommendations 01/2020 and any
        necessary supplementary measures. Annex I, II and III to the
        SCCs are populated by the corresponding sections of this DPA
        and the <a href="/security">Security page</a>. Where the UK
        GDPR applies, the UK International Data Transfer Addendum is
        deemed appended. The parties do not rely on the EU&ndash;US
        Data Privacy Framework as the primary transfer mechanism unless
        a specific sub-processor is verified as a current participant
        at the time of the transfer.
      </p>
    ),
  },
  {
    ref: "§12",
    title: "Return or deletion of data",
    body: (
      <p>
        On termination of the underlying subscription, Processor will,
        at Controller&apos;s choice, return or delete all personal data
        within{" "}
        <Tbc note="N days, e.g. 30" /> and confirm in writing, except
        where retention is required by applicable law. Backups
        containing personal data are deleted on rotation per the
        retention schedule on the{" "}
        <a href="/security">Security page</a>.
      </p>
    ),
  },
  {
    ref: "§13",
    title: "Liability",
    body: (
      <p>
        Each party&apos;s liability under this DPA is subject to the
        limitation of liability in <a href="/terms">§10 of the Terms</a>
        . Nothing in this DPA limits any liability that cannot be
        limited under applicable data-protection law.
      </p>
    ),
  },
];

export default function DPAPage() {
  return (
    <LegalDoc
      title="Data Processing Agreement"
      intent="GDPR Article 28 Data Processing Agreement between Flowstack (Processor) and the Customer (Controller). Annex I (subject matter) and Annex II (security measures) are filled in by the relevant sections of this document."
      effective="2026-06-08"
      reviewed="2026-06-08"
      sections={sections}
    />
  );
}
