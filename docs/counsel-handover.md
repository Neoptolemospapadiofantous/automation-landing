# Counsel Handover — Flowstack Legal Docs

**Prepared:** 2026-06-10
**Target FINAL date:** week commencing 2026-07-13
**Status of source docs:** DRAFT (rendered with visible DRAFT banner, `robots: noindex`)

This document is the single briefing for the engaged counsel. It tells you (a) what you're reviewing, (b) where it lives in the codebase, (c) the conventions you should respect, (d) the format we expect redlines back in, and (e) every open question the drafts already flag.

---

## 1. Documents in scope

| # | Document | URL | Source file | Sections |
|---|---|---|---|---|
| 1 | Privacy Policy | `/privacy` | `src/app/privacy/page.tsx` | 10 |
| 2 | Terms of Service | `/terms` | `src/app/terms/page.tsx` | 15 |
| 3 | Security | `/security` | `src/app/security/page.tsx` | 9 |
| 4 | Data Processing Agreement | `/dpa` | `src/app/dpa/page.tsx` | 13 |

Each page renders through a shared shell (`src/components/legal/legal-doc.tsx`) that provides:

- A DRAFT banner (`src/components/legal/draft-banner.tsx`) — remove on go-FINAL.
- An effective/last-reviewed/status strip at the top.
- A sticky §-numbered table of contents (lg+ screens).
- §-anchored sections with hairline-divided headers and sans-serif prose body.
- A cross-link footer between the four documents.

The site visual system is mono-editorial; section structure and §-numbering should be preserved so anchor links don't break.

---

## 2. Section ToC per document

### 2.1 Privacy Policy (`/privacy`)
1. §1 — Who we are
2. §2 — What data we collect
3. §3 — How we use it (purposes and lawful basis)
4. §4 — Who we share it with
5. §5 — International transfers
6. §6 — How long we keep it
7. §7 — Your rights
8. §8 — Cookies and tracking
9. §9 — Children
10. §10 — Changes to this policy

### 2.2 Terms of Service (`/terms`)
1. §1 — Acceptance
2. §2 — The service
3. §3 — Accounts and access
4. §4 — Fees, billing, cancellation
5. §5 — Acceptable use
6. §6 — Customer data and intellectual property
7. §7 — Privacy and data protection
8. §8 — Service availability
9. §9 — Warranties and disclaimer
10. §10 — Limitation of liability
11. §11 — Indemnification
12. §12 — Term and termination
13. §13 — Governing law and disputes
14. §14 — Changes to these Terms
15. §15 — Contact

### 2.3 Security (`/security`)
1. §1 — Hosting and infrastructure
2. §2 — Encryption
3. §3 — Access control
4. §4 — Backups and disaster recovery
5. §5 — Vulnerability management and patching
6. §6 — Incident response
7. §7 — Compliance and certifications
8. §8 — Sub-processors
9. §9 — Responsible disclosure

### 2.4 Data Processing Agreement (`/dpa`)
1. §1 — Scope and roles
2. §2 — Definitions
3. §3 — Subject matter, nature and duration
4. §4 — Controller instructions
5. §5 — Confidentiality
6. §6 — Security measures
7. §7 — Sub-processors
8. §8 — Data subject rights and requests
9. §9 — Personal data breach notification
10. §10 — Audits
11. §11 — International transfers
12. §12 — Return or deletion of data
13. §13 — Liability

---

## 3. Conventions counsel should respect

### 3.1 `[TBC]` markers
Inline placeholders wherever we need company-specific or jurisdiction-specific facts. They render as a dashed mono pill on the live site. Each one carries a short note explaining what's expected. **Treat them as questions to you, the operator, and to counsel:**

- If you can answer: replace the marker with the answer.
- If counsel needs to recommend: insert counsel's recommendation inline and remove the marker.
- If the section should be removed entirely (e.g. "not in scope"): strike through the marker and leave a comment so we know not to render an empty placeholder.

Full inventory in §5 below.

### 3.2 §-numbered sections
The §-refs (`§1`, `§2`, …) are URL anchors (`/terms#section-13`). They're referenced from other documents and the audit form. **Please don't renumber.** If a new section is needed, append it at the end of the document; tell us where it should sit and we'll renumber once across all four docs in one commit.

### 3.3 Cross-references
Several sections cross-link between documents:

- Privacy `/privacy` → DPA §7 (sub-processors) + DPA §6 (security measures)
- Terms `/terms` → Privacy and DPA generally
- Security `/security` → DPA §7
- DPA → Terms §10 (liability cap)

If you change a referenced §-number, please flag it so we update the links.

### 3.4 What is fixed
- **Document IDs** (the four URLs): `/privacy`, `/terms`, `/security`, `/dpa`. Counsel may rename headings; URLs stay.
- **Effective / Reviewed dates**: we'll update these at FINAL publication. Don't worry about them now.
- **The DRAFT banner**: removed at FINAL by us, not by counsel.

### 3.5 What you can freely change
- All prose.
- Section ordering within a document (with the renumbering note above).
- Bullet lists vs paragraphs.
- Specific clause language, defined terms, definitions.
- The list of items inside lists (add / remove / reword).

---

## 4. Redline workflow (recommended)

We expect Google Docs with Suggesting mode. Workflow:

1. **We will provide one Google Doc per legal document** (4 docs total), seeded with the current page prose copied verbatim.
2. Counsel works in Suggesting mode — proposes inserts, deletes, and comments.
3. We review and Accept / Reject from the codebase side, then port accepted suggestions into the JSX source.
4. We re-publish the live `/privacy`, `/terms`, `/security`, `/dpa` URLs and ping counsel to verify.
5. One additional revision round is included in the engagement.

**Alternative**: track-changes Word (.docx) is fine. PDF mark-ups are acceptable but slower for us to apply — please avoid if Google Docs is available.

**Not acceptable**: rewriting the docs in a new document without preserving §-numbering and structure. We'll have to manually re-map sections and risk losing anchors.

Each Google Doc will carry this header so counsel sees the same context:

> **DRAFT — Flowstack [Document Name]**
> Source: `src/app/<docname>/page.tsx`
> Live preview: `/<docname>` on the staging site (link)
> Effective on FINAL: TBD
> §-numbering is load-bearing — please flag any add/remove/renumber.

---

## 5. The TBC inventory — every open question

Grouped by category. Source location in `[brackets]`.

### 5.1 Corporate identity
- Legal entity name, registration number, registered office  *[privacy §1, terms §15]*
- Confirmation of all contact email addresses  *[privacy §1, terms §15]*
- Postal address for legal notices  *[terms §15]*

### 5.2 Governing law and disputes
- Country of governing law — Portugal / Greece / other  *[terms §13]*
- Court of exclusive jurisdiction (city + country)  *[terms §13]*
- Other primary jurisdictions to mention in supervisory-authority guidance  *[privacy §7]*

### 5.3 Retention periods
- Account-data retention post-termination — recommended N years  *[privacy §6]*
- Inquiry-data retention — recommended N months (default 12)  *[privacy §6]*
- Customer-content deletion window post-termination — recommended N days (default 30)  *[privacy §6, dpa §12]*
- Server-log retention — recommended N days (default 30)  *[privacy §6]*

### 5.4 Notice windows
- Price-change notice period — recommended N days (default 30)  *[terms §4]*
- Policy-change notice period — recommended N days (default 30)  *[privacy §10, terms §14]*
- Material-breach cure window — recommended N days (default 30)  *[terms §12]*
- Personal-data breach notification window to Controller — recommended N hours (default 48)  *[dpa §9]*
- Sub-processor change notice period — recommended N days (default 30)  *[dpa §7]*

### 5.5 Commercial terms
- Liability cap multiplier — default 12 months of fees paid  *[terms §10]*
- Late-payment interest rate — default statutory  *[terms §4]*
- Existence of public SLA / uptime page — confirm  *[terms §8]*

### 5.6 Vendor stack — to populate the sub-processor list
- Hosting / infrastructure provider + region  *[privacy §4, dpa §7, security §1]*
- Database provider + region  *[dpa §7]*
- Transactional email provider + region  *[privacy §4, dpa §7]*
- Payment processor — likely Stripe, confirm  *[privacy §2, privacy §4, dpa §7]*
- Customer-support tooling + region  *[privacy §4, dpa §7]*
- Analytics provider — or `none — server logs only`  *[privacy §4, dpa §7]*
- LLM inference provider + model class + region  *[dpa §7]*

### 5.7 Security baseline
- At-rest encryption confirmation: provider-managed AES-256, KMS-backed?  *[security §2]*
- Secrets store: provider's secret manager or equivalent  *[security §2]*
- Access-review cadence  *[security §3]*
- Backup frequency and retention  *[security §4]*
- Restore-test cadence  *[security §4]*
- RPO / RTO targets  *[security §4]*
- Base-image rebuild cadence  *[security §5]*
- Penetration test cadence + last test date (or `not yet`)  *[security §5]*

### 5.8 Compliance scope
- SOC 2 / ISO 27001 status — `in progress` / `not yet` / certification number  *[security §7]*
- HIPAA / PCI-DSS scope — confirm whether in scope  *[security §7]*
- Bug bounty programme — confirm whether one exists  *[security §9]*

Counsel: please call out anything missing from this list that the current customer mix (predominantly EU + US businesses) requires.

---

## 6. Applying redlines back to code (operator / engineering)

This section is for whoever ports accepted redlines from Google Docs into the JSX source. Counsel can skip.

### 6.1 Source structure
Each legal page is a single file exporting a `LegalSection[]` array consumed by the shared `<LegalDoc>` shell:

```tsx
const sections: LegalSection[] = [
  {
    ref: "§1",
    title: "Who we are",
    body: (
      <>
        <p>...prose...</p>
        <p>...prose with <Tbc note="what to fill in" /> markers...</p>
      </>
    ),
  },
  // ...
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      intent="..."
      effective="YYYY-MM-DD"
      reviewed="YYYY-MM-DD"
      sections={sections}
    />
  );
}
```

### 6.2 Workflow per accepted suggestion
1. Find the matching `ref` in the `sections` array.
2. Edit the `body` JSX in place — keep tag structure (`<p>`, `<ul>`, `<li>`, `<a>`, `<strong>`) consistent with existing prose.
3. For filled `[TBC]` answers: replace `<Tbc note="..." />` inline with the resolved text. Do not leave a stray marker.
4. For new internal links: prefer `<a href="/terms#section-10">…</a>` (matches the anchor convention in `legal-doc.tsx`).
5. Run `pnpm tsc --noEmit` and `pnpm build` — JSX errors will show immediately.

### 6.3 Verification on each change
- Visit `/privacy` (etc.) on staging and confirm the section renders.
- Verify the TOC sidebar lists the right ref/title.
- Click each cross-link.
- Check `grep -rn "TBC" src/app/<docname>/page.tsx` — should return 0 lines once that doc is FINAL.

---

## 7. Publishing checklist (DRAFT → FINAL)

Per document, when counsel has signed off:

- [ ] Replace every `<Tbc note="..." />` with resolved content (zero TBC markers remain).
- [ ] Update `effective` and `reviewed` in the page's `<LegalDoc>` props to the FINAL publication date.
- [ ] Remove `<DraftBanner />` import and the rendered banner in `src/components/legal/legal-doc.tsx` for that specific page (or gate it on a `draft` prop and pass `false`).
- [ ] Flip `robots: { index: false, follow: false }` → `robots: { index: true, follow: true }` in the page's `metadata` export.
- [ ] Add the URL to `src/app/sitemap.ts` with `priority: 0.5, changeFrequency: "yearly"`.
- [ ] Update the page's metadata `description` if material wording in §1 changed.
- [ ] Commit with a message like `legal(privacy): publish FINAL after counsel review (Rev B)`.
- [ ] Notify counsel; archive the redlined Google Doc as the source of truth for that revision.
- [ ] Schedule the next scheduled review (recommend annual) on the calendar.

Repeat per document. The four documents can flip to FINAL independently — there's no requirement to publish all at once.

---

## 8. Out of scope for this engagement

For clarity, these are NOT being requested from counsel in this round:

- Drafting from scratch — the structure already exists.
- Cookie banner copy — current setup doesn't set non-essential cookies, so no banner is required under ePrivacy. Flag this if your view differs.
- Master Service Agreement template for the custom-build engagement — separate engagement, deferred to post-launch.
- Trademark advice on "Flowstack" — separate engagement.
- Tax registration / VAT handling in Portugal / Greece — accountant scope, not counsel.

If counsel sees scope creep into any of the above and recommends bundling, please flag in writing before doing the work so we can adjust the fee.

---

## 9. Engagement metadata

- **Operator point of contact:** [TBC]
- **Engineering point of contact (applies redlines):** [TBC]
- **Counsel point of contact:** [TBC]
- **Engagement start:** week commencing 2026-06-10
- **First-pass review expected back:** by 2026-06-26 (10 business days)
- **Revision round expected back:** by 2026-07-10
- **FINAL publication target:** week commencing 2026-07-13
- **Public launch target:** 2026-07-22
- **Fee anchor:** €3–6k flat for review + one revision pass (open to other shapes)

---

## 10. Quick commands for engineering

When redlines come back, useful greps to keep things consistent:

```sh
# What TBCs remain in each doc?
grep -rn 'Tbc note=' src/app/{privacy,terms,security,dpa}

# Are there orphaned anchor refs?
grep -rEn '#section-[0-9]+' src/app/{privacy,terms,security,dpa}

# Have any §-numbers been duplicated?
grep -rE '^\s*ref: ' src/app/{privacy,terms,security,dpa}/page.tsx | sort | uniq -c | sort -rn | awk '$1 > 1'

# Sanity check the build before publishing
pnpm build && pnpm tsc --noEmit
```

End of handover.
