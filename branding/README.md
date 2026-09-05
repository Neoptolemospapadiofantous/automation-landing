# Flowstack — Brand Assets

Logo files in every resolution every platform asks for. Built from a small
set of SVG masters in `source/`, rendered to PNG/ICO via
[`render.sh`](./render.sh).

`tokens.css` here is the canonical brand palette — vendored byte-identical
into the dashboard as `resources/css/tokens.css`. Edit it landing-side
first, then re-sync; a diff between the two is a bug.
[`design-system.py`](./design-system.py) renders the *system* those tokens
describe as a component library — see below.

---

## TL;DR — which file do I upload?

| Platform / use | File |
|---|---|
| X (Twitter) profile picture | `social/x/profile-400.png` |
| X (Twitter) header | `social/x/banner-1500x500.png` |
| LinkedIn personal profile picture | `social/linkedin/profile-400.png` |
| LinkedIn personal cover | `social/linkedin/cover-personal-1584x396.png` |
| LinkedIn company logo | `social/linkedin/profile-300.png` |
| LinkedIn company cover | `social/linkedin/cover-company-1128x191.png` |
| Facebook profile / page | `social/facebook/profile-512.png` |
| Facebook cover | `social/facebook/cover-851x315.png` |
| Instagram profile picture | `social/instagram/profile-1024.png` |
| GitHub organisation avatar | `social/github/avatar-1024.png` |
| YouTube channel icon | `social/youtube/avatar-800.png` |
| YouTube channel art | `social/youtube/banner-2560x1440.png` |
| Google Business Profile — logo | `social/google/logo-720.png` |
| Google Business Profile — cover | `social/google/cover-1024x576.png` |
| Discord server icon | `social/discord/icon-512.png` |
| Email signature mark | `favicon/favicon-192.png` |
| Open Graph fallback (when next/og fails) | `social/meta/og-1200x630.png` |

> **Google Business Profile needs photographs, not just these two.** The logo and
> cover above fill Google's two brand slots. The slots that actually move the local
> map pack — exterior (so people recognise the door), interior, team, at-work — have
> to be real pictures. A profile carrying only logo graphics ranks worse and reads as
> a shell listing, which is the opposite of what a Limassol local-search play needs.

---

## Folder structure

```
branding/
├── README.md            # this file
├── render.sh            # regenerates every PNG from the SVG masters
├── tokens.css           # canonical palette — shared verbatim with the dashboard
├── design-system.py     # regenerates the design-system cards from tokens.css
├── source/              # editable SVG masters — only files you should hand-edit
│   ├── mark-square-white.svg
│   ├── mark-square-black.svg
│   ├── mark-square-white-on-black.svg   # default — the brand profile picture
│   ├── mark-square-maskable.svg         # PWA, inner ~60% safe area
│   ├── mark-wide-white.svg              # horizontal mark with wires + arrow
│   ├── banner-x.svg                     # 1500×500 X header
│   ├── banner-linkedin-cover.svg        # 1128×191 LinkedIn company cover
│   ├── banner-linkedin-personal.svg     # 1584×396 LinkedIn personal cover
│   └── banner-youtube.svg               # 2560×1440 YouTube channel art
├── favicon/             # site favicon set — also wire into src/app/favicon.ico
│   ├── favicon-{16,32,48,64,128,192,512}.png
│   ├── apple-touch-icon-180.png
│   └── favicon.ico                      # multi-resolution ICO (16/32/48/64)
├── pwa/                 # web manifest icons
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-512-maskable.png            # for Android adaptive icons
└── social/              # one folder per platform
    ├── x/
    ├── linkedin/
    ├── facebook/
    ├── instagram/
    ├── github/
    ├── youtube/
    ├── google/                       # Business Profile logo + 16:9 cover
    ├── discord/
    └── meta/
```

---

## When to use which variant

There are three colour treatments. Use the one that survives the
context, not the one you like best.

1. **`mark-square-white-on-black.svg`** — white mark on a solid black
   square. **Default.** Use whenever the platform will show your icon
   on an arbitrary background (every social profile picture). Avoids
   the "hollow rectangle on user-set wallpaper" problem.
2. **`mark-square-white.svg`** — white mark, transparent background.
   Use only when you control the background and it's dark.
3. **`mark-square-black.svg`** — black mark, transparent background.
   Use only when you control the background and it's light (e.g.
   email signature on white).

The wide variants (`mark-wide-white.svg`, `banner-*.svg`) are
horizontal — for headers, banners, embeds, presentations.

---

## How to re-render

If a master SVG changes:

```bash
bash branding/render.sh
```

Requires ImageMagick (`convert`). Re-runs in ~5 seconds. Output is
8-bit RGBA PNG, transparent where the SVG is transparent.

---

## The design system

`branding/design-system.py` generates the card bundle behind the
design-system project on claude.ai/design ("Flowstack — ink on paper",
`9fa84e9e-1ae0-4649-a4c9-0b60f14c9969`) — eight standalone HTML cards
across Foundations (colour, type scale), Components (buttons, blueprint
motifs, forms), Brand (signal gestures) and Patterns (pricing tier,
two-sheet system).

```bash
python3 branding/design-system.py          # → branding/design-system-build/ (gitignored)
```

Then upload with the `DesignSync` tool: `finalize_plan` with the build
directory as `localDir`, then `write_files` against the project id. Never
hand-edit a card in the web UI — the script is the source of truth and
the next run would overwrite it.

Two rules keep the cards trustworthy:

1. **Colours are read from `tokens.css` at build time.** No hex is ever
   typed into a card, so a palette change flows through by re-running.
2. **The component CSS is a transcription of `globals.css`, and must stay
   one.** A card that renders differently from the live site is worse
   than no card, because it looks authoritative. This is not theoretical:
   the buttons card is what caught the fact that Tailwind's `tracking-*`
   utilities are emitted ahead of `.btn-grad` in the same cascade layer,
   so eleven call sites carried letter-spacing that never rendered.

---

## How the assets are composed

### Square mark
A 1.56:1 outlined node frame with two state indicators inside (filled
square on the left = active; hollow square on the right = queued).
Mirrors the inline `<Logo />` on the site, sized up. Strokes scale with
the rendered resolution because the SVG `stroke-width` is on the
source coordinate system.

### Wide mark
The square mark plus an input wire on the left and an output wire +
arrowhead on the right — matches the schematic motif used throughout
the site. Best at horizontal aspect ratios (3:1+).

### Banner compositions
All three banners share the same vocabulary as the live site:

- 160-pixel hairline grid background at ~10% opacity
- Corner registration ticks (engineering-drawing motif)
- Sheet ref top-left: `FIG. 00 / FLOWSTACK`
- Wide mark + the canonical three-beat tagline, set one beat per line
  (`Automate the busywork.` / `Aggregate the data.` / `Answer every inbound.`),
  the third beat carrying the signal-yellow marker highlight
- Dimension line + monospace annotation (`€99/MO · CANCEL ANYTIME`)
- Mono baseline: `FLOWSTACK / AUTOMATION  ·  SHEET 01 · REV <letter> · SCALE 1:1`
  — bump the REV letter in the master whenever a composition changes

Fonts: system `sans-serif` for the headline, system `ui-monospace` /
`Menlo` for the mono surfaces. Renderer falls back automatically when
those exact families aren't installed.

---

## Wiring the favicon into the site

Currently `src/app/favicon.ico` is a leftover Next.js default. To
swap in the new one:

```bash
cp branding/favicon/favicon.ico src/app/favicon.ico
```

For the full PWA icon set, drop the PNGs into `public/icons/` and
register them via a web app manifest (`public/manifest.webmanifest`).
Optional — neither is strictly required for launch.

---

## Trademark and reuse

These marks are the property of Flowstack Studio. Use them as-is —
don't recolour, distort, or recompose them in third-party material
without an explicit OK.

For investor decks, partnership announcements, and the like, contact
hello@flowstack.example. (Yes, that placeholder will get a real value
on launch day, same as everywhere else in the codebase that says
`flowstack.example`.)
