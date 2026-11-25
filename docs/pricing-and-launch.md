# Pricing & Launch Plan — Flowstack

> Single source of truth for what we charge, why, and how we get to launch.
> Pricing constants live in `automation_dashboard/app/Billing/Plan.php` +
> `TopUpPack.php`. Landing copy reads from
> `automation-landing/src/lib/content.ts`. This doc is the rationale + plan
> behind those numbers.

> **⚠ PRICING CORRECTION — current as of 2026-09-15 (the two-plan EUR
> repricing).** Much of this doc's body still narrates the original June 2026
> USD pricing ($99/$399) and a top-up fix that never shipped in that form.
> The **current offer** is:
>
> - **Starter — €19.99/mo** (annual **€191.90/yr**, 20% off): up to 5 agents,
>   10,000 conversation credits/mo, BYOK allowed, cancel anytime.
> - **Operator — €39.99/mo** (annual **€383.90/yr**, 20% off): up to 5 agents,
>   25,000 credits/mo, best €/credit; annual Operator includes a **free
>   brochure-style website build** (~6 pages, chat installed).
> - **Custom** — scoped 4–6 week project build, invoiced out-of-band.
> - **No free tier, no trial.** "Free" is only the unsubscribed default state
>   (0 credits). The free things are the 30-minute call and the written quote.
> - **Top-up packs** (paid plans only): Small **€5**/1,000, Medium
>   **€15**/5,000, Large **€40**/20,000 credits; landing also offers a custom
>   top-up, €10–2,000 at 500 credits per euro.
>
> Authoritative source of truth: `automation_dashboard/app/Billing/Plan.php`
> + `TopUpPack.php`; landing copy: `automation-landing/src/lib/content.ts`.
> Sections below that describe the old USD pricing are kept **as history**
> (framed where needed); §2 and §3 are corrected to current values.

**Updated:** 2026-09-15 (repriced to Starter €19.99 / Operator €39.99 EUR; prior USD figures retained only as history)
**Status:** Two-plan pricing live; top-up packs **repriced and shipped** (see §3)
**Owner:** [TBC]

---

## 1. The product, in one paragraph

A real-time multi-tenant SaaS where every team configures their own chat assistant
through a managed onboarding flow. Agents are powered by Flowstack's native
runtime (production default OpenAI GPT-5 nano; Claude and Gemini on the
customer's own key; OpenAI text-embedding-3-small for the knowledge base;
MySQL full-text search, Typesense optional). Voiceflow has been removed. The
dashboard ticks live across all connected screens via WebSockets (self-hosted
Reverb in production), with lead-qualification, knowledge-base
upload, transcript review, and Kanban delegation built in. Customers pay
monthly for one or more agents and a pool of conversation credits;
custom-build engagements deliver bespoke flows, integrations, and internal
tooling on top of the same runtime.

---

## 2. Tier specification

Source of truth: `automation_dashboard/app/Billing/Plan.php`.

| | Starter | Operator | Custom |
|---|---|---|---|
| **Price** | €19.99/mo | €39.99/mo | scoped 4–6 week project |
| **Annual** | €191.90/yr (€16/mo equivalent, 20% off) | €383.90/yr (€32/mo equivalent, 20% off) + **free brochure-style website build** (~6 pages, chat installed) | — |
| **Agents** | up to 5 | up to 5 | bespoke |
| **Conversation credits / month** | 10,000 | 25,000 | negotiated |
| **Top-ups** | ✅ | ✅ | n/a (project-based) |
| **Knowledge-base upload** | ✅ | ✅ | ✅ |
| **Real-time dashboard + transcripts** | ✅ | ✅ | ✅ |
| **Lead routing + Kanban** | ✅ | ✅ | ✅ |
| **Support** | community / email | 24h email | dedicated |
| **Custom integrations (AMS, CRM, telephony)** | — | — | ✅ |
| **Custom flows / your own LLM / your UI** | — | — | ✅ |
| **Lock-in** | none, cancel anytime | none, cancel anytime | order-form scoped |
| **CTA on landing** | `Start with Starter` | `Choose Operator` | `Book a call` |

Notes from `Plan.php`:
- One credit = one message in either direction (user *or* agent reply).
- The runtime has a per-session ceiling of 100 turns (`RUNTIME_MAX_TURNS`),
  so a runaway session can't burn arbitrary credits even if a customer
  misconfigures their flow.
- The enum cases stay `free` / `starter` / `pro` / `business` because the
  `teams.plan` column persists the string; renaming the cases would need
  a data migration. The display labels are Free / Starter / Operator / Custom
  via `label()` — `pro` IS the rung sold as "Operator". A `growth` rung
  existed briefly (2026-08-27 repricing) and was folded into Starter on
  2026-09-15.

---

## 3. Top-up packs — repriced and shipped

Source of truth: `automation_dashboard/app/Billing/TopUpPack.php`.

### Current (live since the 2026-08-27 repricing, unchanged 2026-09-15)

| Pack | Credits | Price | Per-credit | vs Operator base |
|---|---|---|---|---|
| Small | 1,000 | €5 | €0.0050 | 3.1× worse |
| Medium | 5,000 | €15 | €0.0030 | 1.9× worse |
| Large | 20,000 | €40 | €0.0020 | 1.25× worse |

The landing also offers a **custom top-up**: €10–2,000 at 500 credits per
euro (€0.002/credit).

Plan rates as reference:
- Starter €19.99 / 10,000 = €0.0020 per credit
- Operator €39.99 / 25,000 = €0.0016 per credit ← **the floor**

**Invariant (asserted by
`tests/Unit/Billing/PricingInvariantsTest.php`, which derives the floor from
the `config/runtime.php` tier rates):** every pack's €/credit is strictly
worse than Operator's monthly rate. That is the upgrade-pressure mechanism
*and* the margin floor.

### History — why the original packs were broken (June 2026, superseded)

The original packs ($10 / $39 / $129 for 1,000 / 5,000 / 20,000 credits) were
calibrated against the old $19 / $79 plan prices. After the June 2026 bump to
$99 / $399 the relationship inverted — top-ups became massively cheaper per
credit than the plans they were meant to support (a Starter customer could
buy Medium packs at $0.008/credit against a $0.040/credit base rate), which
removed the upgrade-pressure mechanism entirely.

A first proposal to fix this by raising packs to $45 / $95 / $320 was **never
shipped**. What actually shipped (2026-08-27): the runtime tier multipliers
in `config/runtime.php` were re-aligned to real provider token rates, which
dropped the margin floor from €0.01333/credit to €0.00156/credit, and the
packs landed at €5 / €15 / €40 — see the `TopUpPack.php` docblock.

Implementation today: `priceEur()` return values in `TopUpPack.php`, Stripe
SKUs mapped via `config/billing.stripe_price.topup_*`; the `grantTopUp()`
flow is untouched by price changes.

UI consequence: the Billing/Index.vue page shows a per-credit breakdown;
at current prices "buy a pack" reads as a buffer, not a deal — which is the
intent.

---

## 4. Unit economics — what each plan actually costs us

### Per-message cost basis (native engine)

From `automation_dashboard/docs/runtime-native.md`:
> Native cost basis: ~$0.005–0.01 per customer message
> (Anthropic Haiku + OpenAI embeddings) → ~99% gross margin at the €19.99
> Starter price.

The true per-credit cost basis is derived from the `config/runtime.php` tier
rates in `tests/Unit/Billing/PricingInvariantsTest.php` — that derivation
(Operator's €0.0016/credit as the margin floor) is authoritative; the
per-message figure above is the Haiku-tier ballpark. Provider token costs are
USD-denominated while revenue is EUR, so treat the conversions as approximate.

### Per-customer cost at full credit utilisation

| Plan | Credits/mo | LLM cost (worst case, at the €0.0016/credit floor) | Plan revenue | LLM gross margin |
|---|---|---|---|---|
| Starter | 10,000 | €16.00 | €19.99 | 20% |
| Operator | 25,000 | €40.00 | €39.99 | ~0% (priced at the floor) |

These are *worst case*: customer burns every credit, all on the most
expensive tier mix. Typical utilisation is 40–60% based on usage patterns in
`runtime_sessions`, and cheaper tiers dominate the mix, so realistic margins
are far above these floors.

### Fixed monthly costs (single Forge box, native runtime)

| Item | Cost | Notes |
|---|---|---|
| Forge VPS (1–2 GB) | $5–20/mo | Hetzner / DO / Vultr |
| Domain | ~$1/mo amortised | `.com` at standard pricing |
| Resend (transactional email) | $0 → $20/mo | free up to 100/day |
| Pusher (real-time WebSocket) | $0 → $49/mo | free at 100 concurrent / 200k msgs/day |
| Anthropic + OpenAI | usage-based | bundled into per-credit cost above |
| Typesense | self-hosted on same VPS | $0 |
| **Stripe** | 2.9% + 30¢ per transaction | comes off revenue |
| **Total fixed** | **$25–90/mo** | scales with traffic, not customer count |

### Margin math at typical customer mix (90% Starter / 9% Operator / 1% Custom)

Assumptions: average revenue per customer = 0.9 × €19.99 + 0.09 × €39.99 ≈
**€21.59**; LLM cost shown is the *worst case* (50% utilisation, all on the
most expensive tier mix → 11,250 avg credits × 50% × €0.0016 floor ≈
**€9/customer**); Stripe ≈ 3%; fixed from the table above.

| Customers | Revenue/mo | LLM cost (50% util.) | Stripe (3%) | Fixed | Net | Margin |
|---|---|---|---|---|---|---|
| 5 | €108 | €45 | €3 | €40 | **€20** | 18% |
| 20 | €432 | €180 | €13 | €50 | **€189** | 44% |
| 50 | €1,080 | €450 | €32 | €70 | **€528** | 49% |
| 100 | €2,159 | €900 | €65 | €80 | **€1,114** | 52% |
| 250 | €5,398 | €2,250 | €162 | €120 | **€2,866** | 53% |

The model still holds, but the shape changed with the 2026 repricing: at
€19.99/€39.99 the worst-case margin is ~18% at customer 5 rising to ~53% at
scale (vs ~88% at the old $99/$399 prices). Real margins sit well above
these figures — the LLM column assumes every used credit runs on the most
expensive tier mix at the PricingInvariantsTest floor, and infrastructure
step-up costs (bigger VPS, larger Pusher tier, possibly horizontal scaling —
see `automation-landing/docs/deploy-forge.md` §13) shift the curve beyond
customer 250.

Stage-2 ceiling on a single Forge box: roughly 250 customers before
infrastructure becomes interesting. Stage 3 = Reverb self-hosted +
horizontal pub/sub.

---

## 5. Pricing rationale

> **Historical (June 2026, $99/$399 USD era).** The prices in this section
> were cut twice — 2026-08-27, then 2026-09-15 to the current
> **€19.99 Starter / €39.99 Operator EUR** (see the banner). Kept for the
> reasoning that produced the launch pricing, not for the numbers.

### Why $99 / $399 / Custom (and not the prior $19 / $79)

**Premium positioning.** B2B SaaS at $19/mo signals consumer-tier; the
target customer (operations leaders at companies serious enough to need an
agent platform with knowledge base, transcripts, real-time delegation) is
not the buyer who's deciding at $19 vs $25. The buyer at $99 is the one
who already understands they're going to spend on tooling and wants quality.

**Operator at 4× the price for 10× the credits.** That's the standard SaaS
shape — volume discount as you scale. Pulls Starter customers up once their
usage stabilises above ~3,000 credits/month.

**Custom hides the dollar number.** "Let's talk" / "By scope" signals the
work is bespoke; once you put a number on Custom you anchor every
conversation to that number, even when the actual scope is half or twice.
The prior `from $15k` was removed for this reason; the landing now uses
`Let's talk` in the pricing card and `BY SCOPE` in the final-CTA strip.

### Why no free trial (and no free tier)

Per `Plan.php` docblock: *"There is no trial either — do not add Stripe
Checkout `trial_period_days` to subscription sessions. The free door into
the product is the free 30-minute call, not a plan."* The paid Starter tier
(€19.99/mo) IS the entry point; cancel anytime via the Stripe Billing
Portal.

Implementation note: do not add `trial_period_days` to Stripe Checkout
sessions in `StripeClient.php`. Cancel-anytime via the Billing Portal is the
risk-reversal that replaces a trial.

### Why annual was 17% off (now 20%)

> **Superseded 2026-09-15:** annual is now **20% off 12× monthly** —
> Starter €191.90/yr, Operator €383.90/yr. `Plan::annualPriceEur()` holds
> the real yearly charge as its own source of truth (in step with the
> annual Stripe Prices) and `Plan::annualSavingsPct()` *derives* the 20 from
> the two prices rather than asserting it.

17% = the SaaS convention for "2 months free on annual" (10/12 ≈ 0.83).
Higher would erode margins on annual customers without proportional
retention upside. Lower would not move the conversion needle. (Historical:
this was hard-coded in `Plan::annualSavingsPct()` before the 2026-09-15
repricing made the discount derived.)

### Why credits over flat seat pricing

Conversation credits map directly to LLM cost, the dominant variable. Per-
seat would punish low-message, many-user customers and undercharge high-
message customers. Credit packs also give us a natural upsell path
without renegotiating a contract.

---

## 6. Launch plan — re-anchored to today

> **Executed June–July 2026** — kept as the record of the launch plan. The
> prices cited below were the June 2026 USD pricing ($99/$399), superseded
> per the banner; the top-up fix it references shipped differently (§3).

Today: 2026-06-11 — day 2 of the soft-launch window.

### Path A — Founder cohort (target soft launch 2026-06-24, **13 days out**)

| Week | Days | Owner | What |
|---|---|---|---|
| 1 | 06-10 → 06-16 | 🧑 you | Domain + DNS + SSL; real `BRAND.contact.*` inboxes; deploy to Forge; uptime monitor; `php artisan platform:set` with real `founder_slots_total`, `next_cohort_label`, `featured_proof`. |
| 2 | 06-17 → 06-23 | 🧑 you | One-page founder MSA template; manual Stripe invoicing setup; sitemap submitted to Google Search Console; soft-launch comms to personal network. |
| 3 | 06-24 → 06-30 | 🧑 you | Open the gate — 5 founder cohort onboardings, one-on-one; capture quotes + screenshots for the (re-added) testimonials section. |

Critical-path block: the domain. Until `NEXT_PUBLIC_SITE_URL` resolves,
SEO surfaces (sitemap, canonical, OG image) all advertise
`flowstack.example`. Everything downstream stalls.

### Path B — Public self-serve launch (target 2026-07-22)

| Week | Days | Owner | What |
|---|---|---|---|
| 3 | 06-24 → 06-30 | ⚖ counsel + 🧑 you | Engage counsel; send the `docs/counsel-handover.md` brief + TBC inventory. Stripe products configured ($99 Starter, $399 Operator, annual variants); Stripe Checkout wired in dashboard; **fix top-up pricing — see §3**. |
| 4 | 07-01 → 07-07 | 🛠 dashboard repo | Subscription state machine on dashboard (`trialing` / `active` / `past_due` / `canceled`); end-to-end test (signup → Stripe → tenant provisioning); Sentry on both projects; cancellation + refund flows. |
| 5 | 07-08 → 07-14 | ⚖ counsel + 🧑 you | Counsel revisions; you resolve every `[TBC]` (hosting region, sub-processor list, breach window, governing law, retention); flip the four legal pages DRAFT → FINAL via the §7 checklist in `counsel-handover.md`. |
| 6 | 07-15 → 07-21 | 🧑 you | Press kit + announcement post + HN / Product Hunt scheduling; open self-serve registration; first 72h: monitor uptime, Stripe events, Sentry, SSE connection counts. |

---

## 7. Open pricing decisions to make before launch

> **Pre-launch list, resolved.** Status 2026-09-15: (1) top-up packs
> repriced and shipped — §3; (2) no trial AND no free tier — confirmed at
> the 2026-09-15 repricing; (3) annual shipped at 20% off
> (€191.90/€383.90, both cycles live); (4) `Plan::maxAgents()` = 5 on both
> paid tiers; (5)–(6) see code + the next pricing review. The original list
> follows as written in June 2026.

Concrete things that need a yes/no, ordered by urgency:

1. **Fix the top-up pack prices** before Stripe products are created in §3.
   The Stripe SKUs you create now will be the ones live customers pay; bad
   prices baked into SKUs cost more to fix than to set correctly the first
   time. Recommended new values in §3.
2. **Confirm "no free trial" survives launch.** Some founders will ask
   for a 14-day trial; the rationale to refuse is in `Plan.php` and §5.
3. **Decide whether annual pricing is shown at launch.** Stripe SKUs need
   to exist for both Monthly + Annual; `Plan::stripePriceId()` already
   handles the cycle. Recommendation: ship Monthly only at soft launch
   (week 2–3), add Annual at public launch (week 6) once you have
   baseline retention data.
4. **Confirm Operator's "up to 5 agents"** matches what the dashboard
   actually enforces. `Plan::maxAgents()` returns 5 for Operator — verify
   no other code path bypasses this (search for `agent` creation flow in
   the dashboard).
5. **Document the Custom-build floor in counsel intake**, not in public
   copy. Tell counsel "we anchor Custom at ~$15k–25k internally" so they
   can flag if the MSA template needs different liability terms for
   sub-$10k engagements (it probably doesn't).
6. **Set a date for the next pricing review.** Recommend: 2026-12-11
   (six months post-launch). Things to revisit then: actual credit
   utilisation, churn rate by tier, did Custom upgrades materialise from
   Operator overruns, did the announcement-bar countdown drive any
   measurable conversion bump.

---

## 8. Risks / things to watch post-launch

- **Top-up price arbitrage** — if not fixed in §3, expect early adopters
  to optimise around it within weeks.
- **Annual cohort cohort retention** — annual customers are usually
  stickier, but the 20% discount eats margin if they churn at month 3.
- **Custom-build scope creep** — without a numeric anchor on the public
  page, every conversation starts fresh. Counsel-approved MSA + a one-page
  scoping deliverable mitigates.
- **Operator credit ceiling at 25,000** — at typical 20-msg conversations,
  that's ~1,250 conversations/month. Heavy claims-intake or quote-
  qualification customers might burn through faster. Watch the
  CreditMeter alert thresholds (`EvaluateCreditAlerts.php`).
- **Voiceflow-legacy customers** — legacy agents still cost ~$10/customer
  in pass-through LLM fees vs ~$0.50/customer on native. Migration to
  native is in progress per `runtime-native.md`; pricing assumes native
  margin. Track legacy share as a separate cohort.
- **Stripe processing fees at low volume** — 2.9% + 30¢ on a €19.99 charge ≈
  €0.86 (~4.3%). On Annual €191.90 ≈ €5.85 (~3.0%). At low customer counts
  this is the second-largest line after LLM cost.

---

## 9. Cross-references

- Pricing constants: `automation_dashboard/app/Billing/Plan.php`
- Top-up packs: `automation_dashboard/app/Billing/TopUpPack.php`
- Cost basis: `automation_dashboard/docs/runtime-native.md` §"Economics note"
- Legacy economics (Voiceflow era, historical): `automation_dashboard/docs/operations/economics.md`
- Landing copy: `automation-landing/src/lib/content.ts` (`pricingTiers`)
- Landing FAQ tier description: `automation-landing/src/lib/content.ts` (`faqItems[1]`)
- Counsel handover: `automation-landing/docs/counsel-handover.md`
- Deploy guide: `automation-landing/docs/deploy-forge.md`
- JSON-LD Offer wiring: `automation-landing/src/components/jsonld.tsx`

---

## 10. When this doc goes stale

Update when any of these change:
- Anthropic Haiku or OpenAI embedding token pricing
- Forge / hosting / Pusher tier pricing
- Stripe fee structure
- Our plan tiers (`Plan.php`)
- Top-up pack prices (`TopUpPack.php`)
- Annual discount percentage (`Plan::annualSavingsPct()`)
- The launch dates in §6

End of doc.
