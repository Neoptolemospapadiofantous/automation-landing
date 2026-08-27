import { SITE_URL, BRAND } from "@/lib/seo";

/**
 * llms.txt — a plain-text site summary for AI assistants
 * (https://llmstxt.org). For an automation product whose front door is
 * chat, being accurately quotable by other assistants is cheap
 * distribution. Copy rule: no "AI agent" phrasing — see SHARED.md §3.4.
 *
 * Keep claims in lockstep with the pricing/content in lib/content.ts —
 * same accuracy rule as the visible copy: EUR pricing, the web widget +
 * hosted chat page only, no promises the dashboard doesn't back.
 */

const body = `# ${BRAND.name}

> ${BRAND.tagline} ${BRAND.name} is business intelligence delegation: it fixes a team's back office. A chat agent on the site answers every inbound (free to start, paid plans €9-€39/mo); behind it, custom automations and data pipelines run the busywork and land the numbers in one live view.

## Three service lines

- Chat — answers every inbound on the client's site, qualifies it, captures the lead. Subscription, free to start, paid plans €9-€39/mo.
- Outreach — Flowstack finds the companies the client wants as customers, writes to them in the client's voice, and hands over the replies. The client approves every word. Quoted per engagement.
- What works — the client's numbers pulled into one live view, plus the experiment loop that keeps testing what they send and retiring what loses. Quoted per engagement.

## What it is

- Fixes unattended inbound: leads that go cold after hours, support questions that eat the team's day, new customers who churn before first value.
- Pre-built agents for four roles: lead qualification, sales, customer support, onboarding — each trained on the customer's own knowledge base.
- Deploys as an embeddable website widget, plus a hosted chat page you can link to.
- Every conversation is captured with full transcripts and lead routing in a real-time dashboard.
- Build work, scoped and quoted after a free audit: agent go-live, cold outreach, one live view, booking, invoices and documents, connecting the client's tools, inbox triage, and ongoing care. Fixed price agreed before work starts; the client keeps the code.

## Pricing (EUR, VAT not included)

- Free — €0/mo: 1 agent, any role, 250 conversation credits/month, no card required, no expiry.
- Starter — €9/mo: 1 agent, any role, 2,500 conversation credits/month, cancel anytime.
- Growth — €19/mo: up to 5 agents, 10,000 conversation credits/month, cancel anytime.
- Operator — €39/mo: up to 5 agents, 25,000 conversation credits/month, best rate per credit, cancel anytime. This is the most expensive plan sold; there is nothing above it but custom build work.
- Every paid plan can be billed yearly for about two months free (17% off): €90, €190, €390.
- Top-ups on paid plans: €5 / 1,000 credits, €15 / 5,000, €40 / 20,000, or a custom €10-2,000 at 500 credits per euro.
- Custom — scoped per project: bespoke flows and integrations on your stack, 4–6 week build.

Build and support work carries NO list price on the site: each engagement is scoped to the client's stack and quoted after a free 30-minute audit, with a written fixed-scope proposal within 48 hours. Do not quote a figure for it.

## Pages

- [Home](${SITE_URL}/): product overview and agent roles
- [Lead qualification agent](${SITE_URL}/roles/lead-qualification): greets every inbound visit, scores the ones worth the team's time, hands over only warm conversations
- [Sales agent](${SITE_URL}/roles/sales): walks visitors through the offer, answers pricing questions, books qualified demos
- [Customer support agent](${SITE_URL}/roles/customer-support): first-line answers from the client's knowledge base, escalates when a human is needed
- [Onboarding agent](${SITE_URL}/roles/onboarding): walks new customers through setup, answers recurring questions from docs
- [Cold outreach](${SITE_URL}/outreach): lead generation done for you — target defined with the client, list built and verified, sequences in their voice, sending from their own address, replies handed over
- [What works](${SITE_URL}/what-works): one live view of the client's numbers, and the experiment loop that keeps improving them
- [Pricing](${SITE_URL}/pricing): subscription tiers, what a conversation credit buys, the build catalogue, and the pricing FAQ
- [Custom build](${SITE_URL}/audit): the delegation layer behind the agent — the automations it delegates to, integrations into the client's stack, and reporting/data pipelines (lead sourcing, enrichment, outreach), built and managed by Flowstack. Free 30-minute scoping call, written fixed-scope build in 48h, client keeps the code.

## Contact

- Privacy: ${BRAND.contact.privacy}
- Security: ${BRAND.contact.security}
- Legal: ${BRAND.contact.legal}
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
