# Legal — archive

Historical artefacts that are no longer the active drafting target,
kept for audit trail / reference only.

| File | Why it's here |
|---|---|
| [`docx-redlines.md`](./docx-redlines.md) | Required corrections to the legacy `.docx` masters in `source/`. The redlines have already been applied across the live drafts in [`../`](../) and the live TSX pages, so the document is reference-only — it documents *what was wrong with the originals* and *what changed*. |
| `source/*.docx` | The original v2 multi-sector masters delivered by counsel. **Not usable directly** — they still describe the deleted Voiceflow engine architecture. Apply the redlines if you ever need to regenerate from these. Gitignored via `*.docx`; on disk for archival only. |

If a file becomes irrelevant (e.g. the `.docx` masters are
permanently superseded by a counsel-redlined Google Doc), feel free
to remove it. Until then, keep the breadcrumb so future readers
understand *why* the current drafts say what they say.

— Compass: [`../README.md`](../README.md)
