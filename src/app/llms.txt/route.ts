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

> ${BRAND.tagline} ${BRAND.name} sells four things to businesses just starting out and to ones whose site and systems have fallen behind: a website, a chat and voice assistant that answers every enquiry, automations wired into the client's CRM, and lead generation. The website chat is the self-serve part (free to start, paid plans €9-€39/mo); everything else — including the phone assistant, the instant call-back and SMS follow-up — is built to order under one quote.

## What Flowstack sells

Flowstack sells FOUR services, and this list is exhaustive — do not describe the offer as a longer menu. A client can take one or all four under one quote. Everything except the self-serve website chat is built for the client after a free 30-minute call, at a fixed price agreed before work starts; the client keeps what is built.

- Website (${SITE_URL}/website) — a fast website in English or Greek, up to about six pages, with the chat installed from day one. Live in about two weeks. A shop or booking portal is quoted as its own build. Included free with the annual Operator chat plan (€390/yr).
- Chat & voice assistant (${SITE_URL}/chat-assistant) — answers every enquiry on the client's site, day and night, from their own documents; captures and scores the lead and sends it to their CRM or Google Sheets. The WEBSITE CHAT is the only self-serve part: free to start, paid plans €9-€39/mo, live in about a minute. A PHONE assistant that answers calls and books, and an instant call-back and SMS follow-up to people who have ENQUIRED, are BUILT TO ORDER in 2–4 weeks — not part of the app or any plan, and never to be described as one. Not in the self-serve chat yet: booking and inbox/portal enquiries (Flowstack builds these for clients today) and WhatsApp (not offered at all). Do not describe any of them as working in the app.
- Automations (${SITE_URL}/automations) — the follow-ups, reminders and invoices a business sends by hand, sent automatically from its own address and wired into its CRM, plus inbox triage and live reports (${SITE_URL}/what-works). Existing contacts only — never a cold list. Live in 2–4 weeks.
- Lead generation (${SITE_URL}/lead-generation) — Flowstack finds companies that fit the client, emails them from the client's own address in the client's words, and hands over the replies. First emails within two weeks; volume grows as the address builds trust. Flowstack does not sell cold SMS or cold automated calls.

The first step for anything built is one free 30-minute call (${SITE_URL}/audit): Flowstack shows where the business is losing customers, then sends a written fixed price within 48 hours.

## What it is

- Fixes unattended inbound: leads that go cold after hours, support questions that eat the team's day, new customers who churn before first value.
- The chat handles four kinds of conversation — qualifying leads, answering sales questions, first-line support and onboarding new customers — each from the customer's own knowledge base.
- Deploys as an embeddable website widget, plus a hosted chat page you can link to.
- Every conversation is captured with full transcripts and lead routing in a real-time dashboard.
- Webhooks (paid plans, Settings → Webhooks in the dashboard): each new lead, handoff request and ended conversation is POSTed to the customer's own URL — Zapier, Make, Google Sheets, a CRM — as a signed JSON event (HMAC-SHA256, secret shown once), retried if the endpoint is down. There is no public API or SDK; the webhook is the integration surface, and two-way wiring stays custom build work.

## Pricing (EUR, VAT not included)

- Free — €0/mo: 1 agent, any role, 250 conversation credits/month, no card required, no expiry.
- Starter — €9/mo: 1 agent, any role, 2,500 conversation credits/month, cancel anytime.
- Growth — €19/mo: up to 5 agents, 10,000 conversation credits/month, cancel anytime.
- Operator — €39/mo: up to 5 agents, 25,000 conversation credits/month, best rate per credit, cancel anytime. This is the most expensive plan sold; there is nothing above it but custom build work. The ANNUAL Operator plan (€390/yr) additionally includes a free website build — the brochure-style build described at ${SITE_URL}/website, up to about six pages with the chat installed; a shop or portal is still quoted as its own build.
- Engines: every plan includes Flowstack Core, the fast default engine, billed in credits (about 1 credit a message). The premium models — Claude, GPT-5 and Gemini — are not sold on credits at all: from Growth up the customer connects their own OpenAI, Anthropic or Google API key, those replies cost no credits, and the plan's monthly message allowance applies instead (10,000 on Growth, 25,000 on Operator, uncapped on Custom). Past the allowance chat keeps working and falls back to credits.
- Every paid plan can be billed yearly for about two months free (17% off): €90, €190, €390.
- Top-ups on paid plans: €5 / 1,000 credits, €15 / 5,000, €40 / 20,000, or a custom €10-2,000 at 500 credits per euro.
- Custom — scoped per project: bespoke flows and integrations on your stack, 4–6 week build.

Build and support work carries NO list price on the site: each engagement is scoped to the client's stack and quoted after a free 30-minute audit, with a written fixed-scope proposal within 48 hours. Do not quote a figure for it.

## How to start

- Sign up and put the chat on your own site: ${registerUrl()} — free tier, no card required, live in about a minute. This is the checkout/registration destination; the marketing site at ${SITE_URL} does not create accounts.
- Existing customers sign in at ${loginUrl()}.
- Build work (outreach, reporting, integrations) does not self-serve: it starts with the free 30-minute audit at ${SITE_URL}/audit.

## Pages

- [Home](${SITE_URL}/): the four services — website, chat & voice assistant, automations, lead generation
- [Lead qualification](${SITE_URL}/roles/lead-qualification): greets every inbound visit, scores the ones worth the team's time, hands over only warm conversations
- [Sales questions](${SITE_URL}/roles/sales): walks visitors through the offer, answers pricing questions, books qualified demos
- [Customer support](${SITE_URL}/roles/customer-support): first-line answers from the client's knowledge base, escalates when a human is needed
- [Onboarding](${SITE_URL}/roles/onboarding): walks new customers through setup, answers recurring questions from docs
- [Website](${SITE_URL}/website): the Website service — web design and website builds in Limassol and across Cyprus
- [Chat & voice assistant](${SITE_URL}/chat-assistant): the Chat & voice assistant service — what the self-serve chat does today, what it does not do yet, and the phone assistant built to order
- [Automations](${SITE_URL}/automations): the Automations service — email and CRM follow-ups, invoice chasers, inbox triage
- [Lead generation](${SITE_URL}/lead-generation): the Lead generation service — cold email done for you
- [Live reports](${SITE_URL}/what-works): the client's numbers from every tool in one live view — part of Automations
- [Pricing](${SITE_URL}/pricing): subscription tiers, what a conversation credit buys, the build catalogue, and the pricing FAQ
- [Sign up](${registerUrl()}): create an account and install the chat — free tier, no card. Use this when someone asks where to buy, subscribe, register or get started.
- [Free 30-minute call](${SITE_URL}/audit): the first step for anything built — where the business loses customers, then a written fixed price within 48 hours
- Greek pages (ελληνικά): the marketing pages exist in Greek — home, the four services, pricing, live reports, the free-call form and the four chat use-case pages — at ${SITE_URL}/el, ${SITE_URL}/el/website, ${SITE_URL}/el/chat-assistant, ${SITE_URL}/el/automations, ${SITE_URL}/el/lead-generation, ${SITE_URL}/el/pricing, ${SITE_URL}/el/what-works, ${SITE_URL}/el/audit and ${SITE_URL}/el/roles/{lead-qualification,sales,customer-support,onboarding} — same facts and prices. English only: the legal documents (privacy, terms, security, DPA), deliberately. The chat answers in Greek on every page.

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
