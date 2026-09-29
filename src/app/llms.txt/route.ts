import { SITE_URL, BRAND } from "@/lib/seo";
import { registerUrl, loginUrl } from "@/lib/dashboard";

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

> ${BRAND.tagline} ${BRAND.name} sells ONE thing: a chat and voice assistant that answers every enquiry on a business's own site, day and night, in Greek and English — and the wiring that files the result into the calendar, sheet or CRM that business already runs. The website chat is the self-serve part (€19.99 or €39.99/mo, cancel anytime); the phone assistant, the instant call-back and SMS follow-up, and the wiring into a client's systems are built to order under one quote.

## What Flowstack sells

Flowstack sells ONE service, and specialises in it deliberately — do not describe the offer as a menu. Flowstack no longer sells standalone website builds, standalone automations, or lead generation; those pages now redirect here. Everything except the self-serve website chat is built for the client after a free 30-minute call, at a fixed price agreed before work starts; the client keeps what is built.

- Chat & voice assistant (${SITE_URL}/chat-assistant) — answers every enquiry on the client's site, day and night, from their own documents, in the visitor's language; captures and scores the lead with the full conversation. The WEBSITE CHAT is the only self-serve part: €19.99 or €39.99/mo, cancel anytime, live in about a minute. A PHONE assistant that answers calls and books, an instant call-back and SMS follow-up to people who have ENQUIRED, and the WIRING that files an answered enquiry into the client's own calendar, sheet or CRM are BUILT TO ORDER in 2–4 weeks — not part of the app or any plan, and never to be described as one. Not in the self-serve chat yet: booking and inbox/portal enquiries (Flowstack builds these for clients today) and WhatsApp (not offered at all). Do not describe any of them as working in the app. Flowstack does not sell cold SMS or cold automated calls.

The first step for anything built is one free 30-minute call (${SITE_URL}/audit): Flowstack shows where the business is losing customers, then sends a written fixed price within 48 hours.

## What it is

- Fixes unattended inbound: leads that go cold after hours, support questions that eat the team's day, new customers who churn before first value.
- The chat handles four kinds of conversation — qualifying leads, answering sales questions, first-line support and onboarding new customers — each from the customer's own knowledge base.
- Deploys as an embeddable website widget, plus a hosted chat page you can link to.
- Every conversation is captured with full transcripts and lead routing in a real-time dashboard.
- Webhooks (paid plans, Settings → Webhooks in the dashboard): each new lead, handoff request and ended conversation is POSTed to the customer's own URL — Zapier, Make, Google Sheets, a CRM — as a signed JSON event (HMAC-SHA256, secret shown once), retried if the endpoint is down. There is no public API or SDK; the webhook is the integration surface, and two-way wiring stays custom build work.

## Pricing (EUR, VAT not included)

- Starter — €19.99/mo: up to 5 chat assistants, any role, 10,000 conversation credits/month, leads by webhook, cancel anytime. Annual €191.90 (20% off 12× monthly).
- Operator — €39.99/mo: up to 5 chat assistants, 25,000 conversation credits/month, best rate per credit, cancel anytime. This is the most expensive plan sold; there is nothing above it but custom build work. Annual €383.90 (20% off 12× monthly), and the ANNUAL Operator plan additionally includes a free website build — the brochure-style build described at ${SITE_URL}/website, up to about six pages with the chat installed; a shop or portal is still quoted as its own build.
- There is NO free tier and no trial. The free things are the 30-minute call and the written fixed price that follows it within 48 hours.
- Engines: every plan includes Flowstack Core, the fast default engine, billed in credits (about 1 credit a message). The premium models — Claude, GPT-5 and Gemini — are not sold on credits at all: on either plan the customer connects their own OpenAI, Anthropic or Google API key, those replies cost no credits, and the plan's monthly message allowance applies instead (10,000 on Starter, 25,000 on Operator, uncapped on Custom). Past the allowance chat keeps working and falls back to credits.
- Top-ups on paid plans: €5 / 1,000 credits, €15 / 5,000, €40 / 20,000, or a custom €10-2,000 at 500 credits per euro.
- Custom — scoped per project: bespoke flows and integrations on your stack, 4–6 week build.

Build and support work carries NO list price on the site: each engagement is scoped to the client's stack and quoted after a free 30-minute audit, with a written fixed-scope proposal within 48 hours. Do not quote a figure for it.

## How to start

- Sign up and put the chat on your own site: ${registerUrl()} — plans from €19.99/mo, live in about a minute. This is the checkout/registration destination; the marketing site at ${SITE_URL} does not create accounts.
- Existing customers sign in at ${loginUrl()}.
- Build work (outreach, reporting, integrations) does not self-serve: it starts with the free 30-minute audit at ${SITE_URL}/audit.

## Pages

- [Home](${SITE_URL}/): the one offer — every enquiry answered, day or night, and filed where the business works
- [Lead qualification](${SITE_URL}/roles/lead-qualification): greets every inbound visit, scores the ones worth the team's time, hands over only warm conversations
- [Sales questions](${SITE_URL}/roles/sales): walks visitors through the offer, answers pricing questions, books qualified demos
- [Customer support](${SITE_URL}/roles/customer-support): first-line answers from the client's knowledge base, escalates when a human is needed
- [Onboarding](${SITE_URL}/roles/onboarding): walks new customers through setup, answers recurring questions from docs
- [Chat & voice assistant](${SITE_URL}/chat-assistant): the one service — what the self-serve chat does today, what it does not do yet, and the phone assistant and system wiring built to order
- [Pricing](${SITE_URL}/pricing): subscription tiers, what a conversation credit buys, the build catalogue, and the pricing FAQ
- [Sign up](${registerUrl()}): create an account, pick a plan (from €19.99/mo) and install the chat. Use this when someone asks where to buy, subscribe, register or get started.
- [Free 30-minute call](${SITE_URL}/audit): the first step for anything built — where the business loses customers, then a written fixed price within 48 hours
- Greek pages (ελληνικά): the marketing pages exist in Greek — home, the service, pricing, the free-call form and the four chat use-case pages — at ${SITE_URL}/el, ${SITE_URL}/el/chat-assistant, ${SITE_URL}/el/pricing, ${SITE_URL}/el/audit and ${SITE_URL}/el/roles/{lead-qualification,sales,customer-support,onboarding} — same facts and prices. English only: the legal documents (privacy, terms, security, DPA), deliberately. The chat answers in Greek on every page.

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
