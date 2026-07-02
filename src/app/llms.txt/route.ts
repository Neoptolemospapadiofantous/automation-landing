import { SITE_URL, BRAND } from "@/lib/seo";

/**
 * llms.txt — a plain-text site summary for AI assistants
 * (https://llmstxt.org). For a product that IS an AI agent, being
 * accurately quotable by other assistants is cheap distribution.
 *
 * Keep claims in lockstep with the pricing/content in lib/content.ts —
 * same accuracy rule as the visible copy: EUR pricing, web + webhook
 * channels only, no promises the dashboard doesn't back.
 */

const body = `# ${BRAND.name}

> ${BRAND.tagline} Pick a role — sales, customer support, lead qualification, or onboarding — and ${BRAND.name} provisions an AI agent trained on your knowledge base, with every conversation and lead streaming into a real-time dashboard.

## What it is

- Pre-built AI agents for four roles: lead qualification, sales, customer support, onboarding.
- Deploys as a website widget, inline iframe, hosted chat page, or webhook.
- Every conversation is captured with full transcripts and lead routing in a real-time dashboard.
- Custom builds wire the agent into an existing stack (CRM, telephony, internal tools) — fixed scope, the client keeps the code.

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
- [Custom build](${SITE_URL}/audit): free 30-minute scoping call, written fixed-scope proposal in 48h

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
