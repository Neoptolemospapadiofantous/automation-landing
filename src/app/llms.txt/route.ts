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

> ${BRAND.tagline} ${BRAND.name} builds the automations and data pipelines that run a team's repetitive work, aggregates scattered tools into one live view, and adds a chat agent that answers every website conversation from the company's own knowledge base — one product, end to end.

## What it is

- Fixes unattended inbound: leads that go cold after hours, support questions that eat the team's day, new customers who churn before first value.
- Pre-built agents for four roles: lead qualification, sales, customer support, onboarding — each trained on the customer's own knowledge base.
- Deploys as an embeddable website widget, plus a hosted chat page you can link to.
- Every conversation is captured with full transcripts and lead routing in a real-time dashboard.
- Custom builds add the operations layer behind the agent: automations, integrations into an existing stack (CRM, telephony, internal tools) and data pipelines — fixed scope, the client keeps the code.

## Pricing (EUR, VAT not included)

- Starter — €99/mo: 1 agent, any role, 2,500 conversation credits/month, cancel anytime.
- Operator — €399/mo: up to 5 agents, 25,000 conversation credits/month, cancel anytime.
- Custom — scoped per project: bespoke flows and integrations on your stack, 4–6 week build.

## Pages

- [Home](${SITE_URL}/): product overview and agent roles
- [Lead qualification agent](${SITE_URL}/roles/lead-qualification): greets every inbound visit, qualifies on ICP fit, hands over only warm conversations
- [Sales agent](${SITE_URL}/roles/sales): walks visitors through the offer, answers pricing questions, books qualified demos
- [Customer support agent](${SITE_URL}/roles/customer-support): first-line answers from the client's knowledge base, escalates when a human is needed
- [Onboarding agent](${SITE_URL}/roles/onboarding): walks new customers through setup, answers recurring questions from docs
- [Pricing](${SITE_URL}/pricing): tiers and the pricing FAQ
- [Custom build](${SITE_URL}/audit): the operations layer behind the agent — the automations it delegates to, integrations into the client's stack, and data pipelines (lead sourcing, enrichment, outreach), built and managed by Flowstack. Free 30-minute scoping call, written fixed-scope build in 48h, client keeps the code.

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
