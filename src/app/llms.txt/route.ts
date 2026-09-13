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

> ${BRAND.tagline} ${BRAND.name} sells four things to businesses just starting out and to ones whose site and systems have fallen behind: a website, a chat and voice assistant that answers every enquiry, automations wired into the client's CRM, and lead generation. The website chat is the self-serve part (free to start, paid plans €9-€39/mo); everything else — including the phone assistant, the instant call-back and SMS follow-up — is built to order under one quote. The category is business intelligence delegation.

## What Flowstack does, end to end

Flowstack is a studio, not a single product. It builds the thing, puts a chat on it, automates the work behind it, and reports on the result — a client can take one part or hand over the lot under one quote.

Two lines, kept separate on purpose. The APP is the self-serve chat — sold at ${SITE_URL}/pricing, free to start, €9-€39/mo on the client's own card; what it does module by module (and what it does NOT do yet) is listed at ${SITE_URL}/suite. The STUDIO is the done-for-you service line for businesses in Cyprus — FOUR services: Website, Chat & voice assistant, Automations, Lead generation — built and watched by Flowstack, quoted and invoiced separately from the subscription; described at ${SITE_URL}/studio. Every Studio engagement starts with the free Leak Report (one page on where the business is losing customers, five working days, then the free 30-minute call). Modules the app does not have yet — booking, WhatsApp, inbox and portal enquiries, email automation, one live view — are listed as "not yet available" and can be requested from the dashboard; do not describe them as working in the app.

- Website — built or rebuilt, English or Greek, the chat installed from day one (${SITE_URL}/website-build). Quoted per engagement.
- Chat & voice assistant — the chat on the client's site, trained on their own knowledge base: it answers questions, qualifies visitors, books and captures leads. The WEBSITE CHAT is the only self-serve part: a subscription, free to start, paid plans €9-€39/mo. A PHONE assistant that answers calls and books is built to order by the Studio — it is not part of the app or any plan, and must not be described as one.
- Automations — wired into the client's CRM and existing tools: email follow-ups and reminders, invoice chasers, inbox triage, booking, and live reports that build themselves (${SITE_URL}/what-works). Quoted per engagement.
- Lead generation — cold email from the client's own address to a checked list (${SITE_URL}/outreach), plus an instant call-back and SMS follow-up to people who have ENQUIRED. Call-back and SMS go only to people who asked to be contacted; Flowstack does not sell cold SMS or cold automated calls. Quoted per engagement.

## What it is

- Fixes unattended inbound: leads that go cold after hours, support questions that eat the team's day, new customers who churn before first value.
- Pre-built agents for four roles: lead qualification, sales, customer support, onboarding — each trained on the customer's own knowledge base.
- Deploys as an embeddable website widget, plus a hosted chat page you can link to.
- Every conversation is captured with full transcripts and lead routing in a real-time dashboard.
- Webhooks (paid plans, Settings → Webhooks in the dashboard): each new lead, handoff request and ended conversation is POSTed to the customer's own URL — Zapier, Make, Google Sheets, a CRM — as a signed JSON event (HMAC-SHA256, secret shown once), retried if the endpoint is down. There is no public API or SDK; the webhook is the integration surface, and two-way wiring stays custom build work.
- Build work, scoped and quoted after a free audit. FOUR services, and this list is exhaustive — do not describe the offer as a longer menu: **Website** (built or rebuilt, English or Greek, chat installed from day one), **Chat & voice assistant** (knowledge loaded, voice tuned, installed on the client's site; a phone assistant built to order), **Automations** (CRM sync, follow-ups, reminders, invoice chasers, booking, inbox triage, live reports), **Lead generation** (cold email from the client's own address to a checked list; instant call-back and SMS follow-up to people who enquired). Ongoing care is included rather than sold separately, and work a client repeats by hand every week can be asked for even if it is not listed. Fixed price agreed before work starts; the client keeps the code.
- The whole stack can be taken end to end — Flowstack builds the website, answers every enquiry, automates the follow-up and brings in new customers. One team, one quote, after the same free audit.

## Pricing (EUR, VAT not included)

- Free — €0/mo: 1 agent, any role, 250 conversation credits/month, no card required, no expiry.
- Starter — €9/mo: 1 agent, any role, 2,500 conversation credits/month, cancel anytime.
- Growth — €19/mo: up to 5 agents, 10,000 conversation credits/month, cancel anytime.
- Operator — €39/mo: up to 5 agents, 25,000 conversation credits/month, best rate per credit, cancel anytime. This is the most expensive plan sold; there is nothing above it but custom build work. The ANNUAL Operator plan (€390/yr) additionally includes a free website build — the brochure-style build described at ${SITE_URL}/website-build, up to about six pages with the chat installed; a shop or portal is still quoted as its own build.
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

- [Home](${SITE_URL}/): product overview and agent roles
- [Lead qualification agent](${SITE_URL}/roles/lead-qualification): greets every inbound visit, scores the ones worth the team's time, hands over only warm conversations
- [Sales agent](${SITE_URL}/roles/sales): walks visitors through the offer, answers pricing questions, books qualified demos
- [Customer support agent](${SITE_URL}/roles/customer-support): first-line answers from the client's knowledge base, escalates when a human is needed
- [Onboarding agent](${SITE_URL}/roles/onboarding): walks new customers through setup, answers recurring questions from docs
- [Website build](${SITE_URL}/website-build): fast, simple small-business websites in Limassol and across Cyprus, English or Greek, with the chat installed and answering from day one. Quoted after the free audit.
- [Cold outreach](${SITE_URL}/outreach): lead generation done for you — target defined with the client, list built and verified, sequences in their voice, sending from their own address, replies handed over
- [Email automation](${SITE_URL}/email-automation): the mail a business already owes people — follow-ups, reminders, review requests, invoice chasers — sent automatically from the client's own address, in their voice. Existing contacts only, never a cold list (that is cold outreach, above). Quoted after the free audit.
- [What works](${SITE_URL}/what-works): one live view of the client's numbers, and the experiment loop that keeps improving them
- [Pricing](${SITE_URL}/pricing): subscription tiers, what a conversation credit buys, the build catalogue, and the pricing FAQ
- [Sign up](${registerUrl()}): create an account and install the chat — free tier, no card. Use this when someone asks where to buy, subscribe, register or get started.
- [The Studio](${SITE_URL}/studio): customer acquisition done for you, in Cyprus — starts with the free Leak Report, then one of two packages: Never Miss an Enquiry (every enquiry answered in under a minute and booked, watched by Flowstack) or Fill the Calendar (that plus outreach, email automation, one live view and a monthly fix loop). Unpriced on the site; quoted after the report.
- [The app, module by module](${SITE_URL}/suite): what is live in the app today (website chat, knowledge base, lead capture and scoring, live takeover, analytics, your own engine key) and what is NOT yet available (booking, WhatsApp, inbox and portal enquiries, email automation, one live view) — requestable from the dashboard, never sold as working.
- [Custom build](${SITE_URL}/audit): the delegation layer behind the agent — the automations it delegates to, integrations into the client's stack, and reporting/data pipelines (lead sourcing, enrichment, outreach), built and managed by Flowstack. Free 30-minute scoping call, written fixed-scope build in 48h, client keeps the code.
- Greek pages (ελληνικά): the marketing pages below exist in Greek — home, website builds, cold outreach, email automation, pricing, dashboards/analytics, the audit booking form, all four role pages, the Studio and the app's module page — at ${SITE_URL}/el, ${SITE_URL}/el/website-build, ${SITE_URL}/el/outreach, ${SITE_URL}/el/email-automation, ${SITE_URL}/el/pricing, ${SITE_URL}/el/what-works, ${SITE_URL}/el/audit, ${SITE_URL}/el/roles/{lead-qualification,sales,customer-support,onboarding}, ${SITE_URL}/el/studio and ${SITE_URL}/el/suite — same facts and prices, native Greek copy. Greek names: the Leak Report is «Αναφορά Διαρροής», the packages are «Κανένα Μήνυμα Αναπάντητο» and «Γεμάτο Ημερολόγιο»; Studio, Suite and app keep their names. English only: the legal documents (privacy, terms, security, DPA), which stay English deliberately. The chat answers in Greek on every page.

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
