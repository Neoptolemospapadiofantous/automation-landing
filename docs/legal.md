# Legal posture — operator's compass

> One-page reference for what we claim publicly, where it lives in code,
> what's been resolved, and what's still open. Pair with
> [`counsel-handover.md`](./counsel-handover.md) for the briefing pack we
> send the engaged lawyer.

**Status:** DRAFT pending Cyprus / EU counsel review
**Updated:** 2026-06-12
**Owner:** [TBC]

---

## 1. Where the legal artefacts live

| Surface | Path | Role |
|---|---|---|
| Privacy Policy | `/privacy` → `src/app/privacy/page.tsx` | Public, `noindex` until FINAL |
| Terms of Service | `/terms` → `src/app/terms/page.tsx` | Public, `noindex` until FINAL |
| Security | `/security` → `src/app/security/page.tsx` | Public, `noindex` until FINAL |
| DPA | `/dpa` → `src/app/dpa/page.tsx` | Public, `noindex` until FINAL |
| **Cleaned-up master drafts** | `src/legal/*.md` | Operator-owned source of truth — feed into counsel review |
| Honesty ledger | `src/legal/claims-vs-reality.md` | Strict gate on what we may claim |
| Counsel briefing | `docs/counsel-handover.md` | What we send the engaged lawyer |
| Outdated `.docx` masters | `src/legal/source/*.docx` | **Do not use directly** — they still describe the deleted Voiceflow architecture; redlines in `src/legal/docx-redlines.md` |

---

## 2. The standing rule

**Claim only what `src/legal/claims-vs-reality.md` marks ✅.**

The ledger is split three ways:

- ✅ **True today, safe to claim** — e.g. AI Act Article 50 disclosure
  rendered at the interface layer (tested 2026-06-12), engine isolated
  behind an internal contract (proven by deletion of the prior
  vendor), per-tenant authorisation tested, log redaction
  sentinel-proofed, daily security scans.
- 🟡 **Partially true — qualify** — e.g. data-subject rights are
  supported but no formal DSR intake; encryption-at-rest is whatever
  the host DB provides; "audit log" is the billing ledger only.
- ❌ **Not true — must NOT appear** — e.g. "Built on Voiceflow",
  SOC 2 / ISO 27001 / HIPAA programmes, PII redaction at the engine
  layer, signed session tokens, scheduled credential rotation,
  consent records, written incident runbook, WCAG 2.1 AA conformance,
  data-residency configuration per Client.

Compliance copy that outruns the codebase is a liability, not an
asset. Before merging any change to the four legal pages, re-check
the ledger.

---

## 3. What's already decided

These were open `[TBC]`s in the original scaffolds and are now closed
across `/privacy`, `/terms`, `/security`, `/dpa` and
`src/legal/*.md`:

- **Jurisdiction.** Nicosia, Cyprus. Cyprus
  [Commissioner for Personal Data Protection](https://www.dataprotection.gov.cy)
  (Law 125(I)/2018) is the supervisory authority.
- **Governing law.** Republic of Cyprus; exclusive jurisdiction in
  the Nicosia courts.
- **Engine.** Native runtime, calling LLM providers server-side
  through a single internal contract. **No third-party
  conversational engine is involved** — Voiceflow has been deleted
  from every document.
- **Sub-processors.** Anthropic (LLM — default), OpenAI (LLM +
  knowledge-base embeddings), Google (LLM — paid tier only;
  free tier trains on data and is contractually excluded),
  Stripe (payments), Pusher (real-time UI), AWS SES (email),
  Typesense (search — optional, currently off). Source of truth:
  `src/legal/claims-vs-reality.md` §"sub-processor list".
- **AI Act Article 50.** Implemented today, ahead of the
  2026-08-02 effective date. Disclosure is rendered at the interface
  layer, outside Client control, with a one-tap human-handoff
  request. Tested.
- **Annex III exclusions.** No high-risk use cases: no recruitment
  screening, credit scoring, insurance underwriting, education
  scoring, or essential-services eligibility decisions. Customers
  warrant this in `/terms §9`.
- **Multi-sector framing.** GDPR (Platform = processor) and EU AI
  Act (Platform = provider) apply to every engagement. Sector
  regimes (DORA, IDD, healthcare, consumer protection) apply
  conditionally per Client and are addressed in
  `src/legal/compliance-framework.md` Part B.
- **No-training commitments.** We do not use customer data or
  end-user conversations to train AI models — relying on provider
  commercial terms (verified for the paid tiers).

---

## 4. What's still open

The shortlist of remaining TBCs. Full inventory in
[`counsel-handover.md §5`](./counsel-handover.md). Resolve in this
order:

1. **Corporate identity** — legal entity name, registration number,
   registered office in Nicosia, Cyprus.
2. **Contact addresses** — `privacy@`, `security@`, `legal@`.
3. **Hosting provider + region** — last unknown in the vendor stack.
4. **Per-provider transfer mechanism** — SCC vs DPF status verified
   at publication for Anthropic, OpenAI, Google, Stripe, Pusher,
   AWS SES.
5. **Retention periods** — account data (Cyprus statutory accounting
   period applies), customer content (default 30d post-termination),
   server logs (default 30d).
6. **Notice windows** — sub-processor change notice (default 30d),
   personal-data breach notification to Controller (default 48h),
   policy-change notice (default 30d).
7. **Commercial terms** — liability cap multiplier (default 12
   months of fees), late-payment interest rate.
8. **Incident-response runbook** — being drafted. Until it ships,
   `/security §6` claims only the GDPR Art. 33–34 obligation, not a
   "written runbook" in force.

---

## 5. How the public site enforces the rule

The four legal pages share the `<LegalDoc>` shell at
`src/components/legal/legal-doc.tsx` which renders:

- A **DRAFT banner** at the top of every page (`<DraftBanner />`)
  with the explicit "not legal advice, not reviewed by counsel"
  disclaimer.
- `robots: { index: false, follow: false }` in each page's `metadata`
  export so the drafts cannot be indexed by search engines while
  pending counsel sign-off.
- A `[TBC · what to confirm]` marker convention (the `<Tbc />`
  component) that renders as a visible dashed pill — easy for the
  operator and counsel to grep for.

Operator command for the live TBC count:

```sh
grep -rn 'Tbc note=' src/app/{privacy,terms,security,dpa}
```

---

## 6. Going FINAL — per-document publishing checklist

Per document, when counsel has signed off:

- [ ] Replace every `<Tbc note="..." />` with resolved content (zero
      remain).
- [ ] Update `effective` and `reviewed` props on `<LegalDoc>` to the
      publication date.
- [ ] Remove or gate `<DraftBanner />` for that page only.
- [ ] Flip `robots: { index: false, follow: false }` →
      `robots: { index: true, follow: true }` in the page's metadata.
- [ ] Add the URL to `src/app/sitemap.ts` with
      `priority: 0.5, changeFrequency: "yearly"`.
- [ ] Update the page's metadata description if §1 wording changed
      materially.
- [ ] Commit with a message like
      `legal(privacy): publish FINAL after counsel review (Rev B)`.
- [ ] Archive the counsel-redlined Google Doc as the source of truth
      for that revision in `src/legal/`.

Pages flip independently — no requirement to publish all four at
once.

---

## 7. Cross-references

- **Source-of-truth drafts** — `src/legal/`
  - [`README.md`](../src/legal/README.md) — folder map
  - [`claims-vs-reality.md`](../src/legal/claims-vs-reality.md) — the
    honesty ledger
  - [`trust-page.md`](../src/legal/trust-page.md) — public-facing
    summary draft
  - [`privacy-policy.md`](../src/legal/privacy-policy.md) — controller-
    role privacy draft (the operator's own customers, not their
    end-users)
  - [`compliance-framework.md`](../src/legal/compliance-framework.md)
    — internal framework + DPA / ToS skeletons for business customers
  - [`docx-redlines.md`](../src/legal/docx-redlines.md) — corrections
    required for any further use of the legacy `.docx` masters
- **Counsel briefing** — [`docs/counsel-handover.md`](./counsel-handover.md)
- **Dashboard repo** — `~/automation_dashboard/docs/runtime-native.md`
  is the engine source-of-truth that the legal docs lean on.
  `runtime-native-l1` is the branch the claims-vs-reality ledger was
  audited against on 2026-06-12.

---

## 8. When this doc goes stale

Refresh when any of these change:

- A `[TBC]` becomes a real value in any of the four legal pages — bump
  §4 here.
- A new sub-processor is engaged or removed — update §3 + propagate
  to all four legal pages + `claims-vs-reality.md`.
- A claim moves from 🟡 → ✅ or ✅ → 🟡 in `claims-vs-reality.md` —
  recheck the corresponding section in `/security` or `/dpa`.
- A page flips from DRAFT → FINAL — update §1 (status column) and §6
  (publishing checklist).
- A regulatory regime changes scope (AI Act amendments, ePrivacy
  successor, etc.).
- Counsel signs off and the engagement closes.

End of doc.
