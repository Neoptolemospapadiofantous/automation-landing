#!/usr/bin/env python3
# branding/design-system.py
#
"""Generates the Flowstack design-system preview bundle.

Sibling of render.sh: that one renders brand assets from the SVG masters,
this one renders the *system* — colour, type, components, patterns — as
standalone HTML cards for the design-system project on claude.ai/design
(project 9fa84e9e-1ae0-4649-a4c9-0b60f14c9969, "Flowstack — ink on paper").

Every colour is read out of branding/tokens.css at build time, so a card
can never drift from the canonical tokens by hand-copying a hex. The
component CSS below is a deliberate transcription of globals.css — keep
it honest: a card that renders differently from the site is worse than no
card, because it looks authoritative. The buttons card earned that rule by
catching a live bug (tracking utilities the cascade was discarding).

Usage:  python3 branding/design-system.py [outdir]
        (default outdir: branding/design-system-build/, gitignored)

Then upload with the DesignSync tool — list_files, finalize_plan, then
write_files against the project id above. The first line of each card is a
`<!-- @dsCard group="..." -->` marker; the Design System pane builds its
index from those, so keep it as line one.
"""
import pathlib, re, sys

REPO = pathlib.Path(__file__).resolve().parent.parent
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else REPO / "branding/design-system-build"
OUT.mkdir(parents=True, exist_ok=True)

TOKENS = (REPO / "branding/tokens.css").read_text()

def sheet(name):
    """Pull one sheet's token block out of the canonical file."""
    if name == "black":
        m = re.search(r":root,\s*\.sheet-black\s*\{(.*?)\n\}", TOKENS, re.S)
    else:
        m = re.search(r"\.sheet-white\s*\{(.*?)\n\}", TOKENS, re.S)
    return dict(re.findall(r"(--[\w-]+):\s*([^;]+);", m.group(1)))

WHITE, BLACK = sheet("white"), sheet("black")
SIGNAL, SIGNAL_INK = "#f5c518", "#141412"

def tokens_css(d):
    return "\n".join(f"    {k}: {v.strip()};" for k, v in d.items())

BASE = f"""
  :root {{
{tokens_css(WHITE)}
    --signal: {SIGNAL};
    --signal-ink: {SIGNAL_INK};
    --radius: 0;
    --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
    --font-display: "Inter Tight", Inter, ui-sans-serif, sans-serif;
  }}
  .on-black {{
{tokens_css(BLACK)}
    background: var(--bg); color: var(--ink);
  }}
  * {{ box-sizing: border-box; }}
  body {{
    margin: 0; padding: 28px;
    background: var(--bg); color: var(--ink);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }}
  h1, h2, h3 {{ font-family: var(--font-display); }}
  .ds-title {{
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--ink-mute); margin: 0 0 18px;
  }}
  .ds-note {{
    font-family: var(--font-mono); font-size: 11px; line-height: 1.6;
    color: var(--ink-mute); margin-top: 18px;
    border-top: 1px solid var(--border-line); padding-top: 12px;
  }}
  .ds-row {{ display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }}
  .ds-stack {{ display: flex; flex-direction: column; gap: 18px; }}
  .ds-label {{
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--ink-mute);
  }}

  /* ── the CTA recipe — paint from globals.css, metrics from ui/button.tsx ── */
  .btn {{ display: inline-flex; align-items: center; justify-content: center;
         text-decoration: none; cursor: pointer; font-family: var(--font-mono); }}
  .btn-grad {{
    background: var(--signal); color: var(--signal-ink);
    border: 1.5px solid var(--signal-ink); letter-spacing: 0.06em;
    box-shadow: 4px 4px 0 var(--ink);
    transition: box-shadow .15s, transform .15s;
  }}
  .btn-grad:hover {{ transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }}
  .btn-draw {{
    background: transparent; color: var(--ink); border: 1px solid var(--ink);
    letter-spacing: 0.06em; transition: background .15s, color .15s;
  }}
  .btn-draw:hover {{ background: var(--ink); color: var(--bg); }}
  /* Sizes deliberately set no letter-spacing — the paint classes own it
     (.06em), and on the real site the cascade throws away any tracking
     utility a call site adds. Mirrored here so the card cannot lie. */
  .size-lg  {{ padding: 16px 24px; font-size: 13px; font-weight: 600;
              text-transform: uppercase; }}
  .size-sm  {{ padding: 10px 20px; font-size: 12px; font-weight: 600;
              text-transform: uppercase; }}
  .size-nav {{ padding: 8px 16px; font-size: 12px; font-weight: 500;
              text-transform: uppercase; white-space: nowrap; }}

  /* ── blueprint motifs ── */
  .bp-dot {{ display:inline-block; width:8px; height:8px;
             border:1px solid var(--violet); background:transparent; }}
  .bp-ref {{ font-family: var(--font-mono); font-size:.6875rem; letter-spacing:.22em;
             text-transform:uppercase; color: var(--violet); }}
  .bp-annot {{ font-family: var(--font-mono); font-size:.75rem;
               letter-spacing:.04em; color: var(--ink-mute); }}
  .bp-dim {{ position:relative; height:1px; background:var(--line-strong); }}
  .bp-dim::before, .bp-dim::after {{ content:""; position:absolute; top:-3px;
    width:1px; height:7px; background:var(--line-strong); }}
  .bp-dim::before {{ left:0; }} .bp-dim::after {{ right:0; }}
  .bp-hatch {{ background-image: repeating-linear-gradient(45deg, transparent,
    transparent 6px, var(--line-strong) 6px, var(--line-strong) 7px); }}
  .bp-wire {{ position:relative; height:2px; color:var(--violet);
    background-image: linear-gradient(90deg, currentColor 55%, transparent 55%);
    background-size: 11px 2px; }}
  .bp-wire::after {{ content:""; position:absolute; right:-1px; top:50%;
    transform:translateY(-50%); border-left:7px solid var(--violet);
    border-top:4px solid transparent; border-bottom:4px solid transparent; }}

  /* ── the one loud gesture ── */
  .text-gradient {{
    color: var(--signal-ink);
    background: linear-gradient(transparent 8%, var(--signal) 8%,
                                var(--signal) 94%, transparent 94%);
    -webkit-box-decoration-break: clone; box-decoration-break: clone;
    padding-inline: .08em; margin-inline: -.08em;
  }}
  .mark-under {{ box-shadow: inset 0 -0.32em 0 var(--signal); }}
  .eyebrow {{
    display:inline-flex; align-items:center; gap:10px;
    border:1px solid var(--border-line); background:var(--bg-elev);
    padding:6px 12px;
  }}
  .eyebrow span:last-child {{ font-family:var(--font-mono); font-size:11px;
    line-height:1; letter-spacing:.22em; text-transform:uppercase; color:var(--violet); }}
"""

# The status palette lives in the dashboard's own stylesheet, not tokens.css
# (it is app-semantic, and tokens.css must stay byte-identical across repos).
# Read it from there rather than hand-copying — same rule as the brand tokens.
DASH_CSS = REPO.parent / "automation_dashboard/resources/css/app.css"

def status_tokens():
    if not DASH_CSS.exists():
        raise SystemExit(
            f"Cannot read the status palette: {DASH_CSS} not found.\n"
            "The App cards document automation_dashboard, so that repo must be a "
            "sibling of this one. Refusing to emit a card with invented colours."
        )
    css = DASH_CSS.read_text()
    def block(sel):
        i = css.index(sel + " {")
        return css[i:css.index("}", i)]
    out = {}
    for name, sel in (("white", ".sheet-white"), ("black", ".sheet-black"), ("solid", ":root")):
        out[name] = dict(re.findall(r"(--state-[\w-]+):\s*([^;]+);", block(sel)))
    return out

STATUS = status_tokens()

def st(sheet, key):
    """--state-ok-ink for the given sheet, falling back to the sheet-invariant block."""
    return (STATUS[sheet].get(f"--state-{key}") or STATUS["solid"][f"--state-{key}"]).strip()

APP_CSS = """
  /* Transcribed from automation_dashboard: resources/css/app.css (.btn-signal)
     and resources/js/Components/{Primary,Secondary,Danger}Button.vue. Tokens are
     the same vendored tokens.css, so colour comes from the shared block above. */
  .app-btn { display:inline-flex; align-items:center; padding:8px 16px;
             border:1px solid; font-family:var(--font-mono); font-weight:600;
             font-size:12px; letter-spacing:0.1em; text-transform:uppercase;
             cursor:pointer; text-decoration:none; }
  .app-primary { background:var(--signal); color:#111; border-color:#111;
                 box-shadow:3px 3px 0 var(--ink); transition:all .15s; }
  .app-primary:hover { transform:translate(1px,1px); box-shadow:2px 2px 0 var(--ink); }
  .app-secondary { background:transparent; color:var(--ink); border-color:var(--ink); }
  .app-secondary:hover { background:var(--ink); color:var(--bg); }
  .app-danger { background:__BAD_SOLID__; color:__BAD_ON__; border-color:__BAD_SOLID__; }
  .app-input { width:100%; padding:8px 12px; font-size:14px; background:var(--bg);
               color:var(--ink); border:1px solid var(--border-hi); border-radius:0; }
  .app-label { display:block; font-family:var(--font-mono); font-size:12px;
               text-transform:uppercase; letter-spacing:0.05em; color:var(--ink-dim); }
  .sidebar-link { display:flex; align-items:center; gap:10px; border-left:2px solid transparent;
                  padding:6px 8px; font-size:14px; font-weight:500; color:var(--ink-dim);
                  text-decoration:none; }
  .sidebar-link.is-active { border-left-color:var(--violet); background:var(--surface-hi);
                            color:var(--ink); }
  .sidebar-link:hover { background:var(--surface-hi); color:var(--ink); }
  .badge { display:inline-block; padding:2px 8px; font-family:var(--font-mono);
           font-size:11px; letter-spacing:0.06em; text-transform:uppercase; }
  .meter { height:6px; background:var(--surface-hi); overflow:hidden; }
  .meter > i { display:block; height:100%; }
"""

# The danger button is the status palette's `solid` role — resolve it from the
# dashboard tokens rather than repeating the hex, so the card follows a retune.
APP_CSS = (APP_CSS.replace("__BAD_SOLID__", st("solid", "bad-solid"))
                  .replace("__BAD_ON__", st("solid", "bad-on")))

def card(path, group, title, subtitle, body, width=880, height=520, extra=""):
    html = f"""<!-- @dsCard group="{group}" -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<style>{BASE}{extra}</style>
</head>
<body>
<p class="ds-title">{title} — {subtitle}</p>
{body}
</body>
</html>
"""
    p = OUT / path
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(html)
    return {"path": path, "name": title, "subtitle": subtitle,
            "group": group, "width": width, "height": height}

CARDS = []

# ── 1. Colour ────────────────────────────────────────────────────────────
def swatches(d, keys):
    out = []
    for k in keys:
        v = d[k].strip()
        show = v if v.startswith("#") else v
        out.append(f"""<div style="min-width:132px">
      <div style="height:56px;border:1px solid var(--border-line);background:{show}"></div>
      <div class="ds-label" style="margin-top:6px">{k.replace('--','')}</div>
      <div class="bp-annot" style="font-size:10px">{v}</div>
    </div>""")
    return "\n".join(out)

keys = ["--bg","--surface","--border-line","--ink","--ink-dim","--ink-mute","--violet"]
CARDS.append(card(
  "foundations/colour.html", "Foundations", "Colour",
  "Two sheets, one ink, one signal",
  f"""<div class="ds-stack">
  <div>
    <div class="ds-label" style="margin-bottom:10px">White sheet — the marketing site + app</div>
    <div class="ds-row">{swatches(WHITE, keys)}</div>
  </div>
  <div class="on-black" style="padding:20px;border:1px solid var(--border-line)">
    <div class="ds-label" style="margin-bottom:10px">Black sheet — inverted bands</div>
    <div class="ds-row">{swatches(BLACK, keys)}</div>
  </div>
  <div class="ds-row" style="gap:20px">
    <div>
      <div style="height:56px;width:132px;border:1px solid var(--ink);background:{SIGNAL}"></div>
      <div class="ds-label" style="margin-top:6px">signal (fills)</div>
      <div class="bp-annot" style="font-size:10px">{SIGNAL}</div>
    </div>
    <p class="bp-annot" style="max-width:46ch;margin:0">
      The accent slot is named <code>--violet</code> for legacy reasons — code, not
      copy. It carries accent <em>text</em> (#8A6A00 on paper, readable). Signal
      yellow is for <em>fills</em> only and always pairs with near-black ink.
    </p>
  </div>
</div>
<p class="ds-note">Source: branding/tokens.css — canonical, vendored byte-identical
into automation_dashboard/resources/css/tokens.css. Edit landing-side first.</p>""",
  width=880, height=620))

# ── 2. Type ──────────────────────────────────────────────────────────────
rungs = [("Display / h1","72px","600","-0.045em","var(--font-display)","Hand it off."),
         ("Section / h2","44px","600","-0.03em","var(--font-display)","One live view"),
         ("Lead","17px","400","0","var(--font-sans)","We fix your back office."),
         ("Body","15px","400","0","var(--font-sans)","Automations run the busywork."),
         ("Body small","13px","400","0","var(--font-sans)","Cancel anytime, no lock-in."),
         ("Label","12px","600","0.12em","var(--font-mono)","TRY IT FOR €99"),
         ("Ref / mono","11px","400","0.22em","var(--font-mono)","S/03 / PIPELINE"),
         ("Micro","10px","400","0.18em","var(--font-mono)","MOST PICKED")]
rows = "\n".join(f"""<tr>
    <td style="padding:10px 18px 10px 0;vertical-align:baseline"><span class="ds-label">{n}</span></td>
    <td style="padding:10px 0;vertical-align:baseline;font-family:{f};font-size:{s};font-weight:{w};letter-spacing:{t}">{x}</td>
    <td style="padding:10px 0 10px 18px;vertical-align:baseline"><span class="bp-annot">{s} · {t}</span></td>
  </tr>""" for n,s,w,t,f,x in rungs)
CARDS.append(card(
  "foundations/type.html", "Foundations", "Type scale",
  "Inter Tight display · Inter body · mono labels",
  f"""<table style="border-collapse:collapse;width:100%">{rows}</table>
<p class="ds-note">Eight rungs, and that is the whole scale. Below 20px the site had
accreted fifteen distinct sizes (12.5 / 13.5 / 14.5 / 15.5 …) — folded back into
these on 2026-08-10. Two components keep their own miniature scale on purpose:
the drawn ProductWindow and the sheet chrome (8–9.5px drafting marks).</p>""",
  width=880, height=560))

# ── 3. Buttons ───────────────────────────────────────────────────────────
CARDS.append(card(
  "components/buttons.html", "Site", "Buttons — marketing",
  "Primary / ghost, three sizes",
  f"""<div class="ds-stack">
  <div>
    <div class="ds-label" style="margin-bottom:10px">lg — page-level CTA</div>
    <div class="ds-row">
      <a class="btn btn-grad size-lg" href="#">Book the free audit →</a>
      <a class="btn btn-draw size-lg" href="#">Try the chat for €99</a>
    </div>
  </div>
  <div>
    <div class="ds-label" style="margin-bottom:10px">sm — compact contexts</div>
    <div class="ds-row">
      <a class="btn btn-grad size-sm" href="#">Accept</a>
      <a class="btn btn-draw size-sm" href="#">Decline</a>
    </div>
  </div>
  <div>
    <div class="ds-label" style="margin-bottom:10px">nav — header only, holds one line to 320px</div>
    <div class="ds-row"><a class="btn btn-grad size-nav" href="#">Try it for €99 →</a></div>
  </div>
  <div class="on-black" style="padding:22px;border:1px solid var(--border-line)">
    <div class="ds-label" style="margin-bottom:10px">on a black band — the offset shadow flips to the sheet's ink</div>
    <div class="ds-row">
      <a class="btn btn-grad size-lg" href="#">Book the free audit →</a>
      <a class="btn btn-draw size-lg" href="#">See pricing</a>
    </div>
  </div>
</div>
<p class="ds-note">globals.css owns the paint (.btn-grad / .btn-draw) and the
letter-spacing; ui/button.tsx owns size, weight and padding via cva. Hover lifts 2px
into a 6px shadow — the only motion, disabled under prefers-reduced-motion. No soft
shadows, no radius, anywhere. Tracking is not settable per call site: Tailwind emits
its tracking utilities ahead of the paint classes in the same layer, so .06em always
wins — eleven call sites carried tracking classes that never rendered.</p>""",
  width=880, height=680))

# ── 4. Signal gestures ───────────────────────────────────────────────────
CARDS.append(card(
  "brand/signal.html", "Brand", "Signal gestures",
  "Marker highlight, underline, badge",
  f"""<div class="ds-stack">
  <h2 style="font-size:44px;margin:0;letter-spacing:-0.03em;line-height:1.05">
    Answer every inbound. <span class="text-gradient">Hand it off.</span>
  </h2>
  <p style="font-size:15px;margin:0;max-width:52ch">
    Cold outreach that runs itself and a
    <strong class="mark-under">73%</strong> faster first reply.
  </p>
  <div class="ds-row">
    <span style="display:inline-block;border:1.5px solid var(--ink);background:var(--signal);
                 color:var(--signal-ink);padding:2px 8px;font-family:var(--font-mono);
                 font-size:10px;letter-spacing:.22em;text-transform:uppercase">Most picked</span>
    <span class="bp-annot">the one filled badge — reserved for the featured tier</span>
  </div>
</div>
<p class="ds-note">One loud gesture per screen. The highlight is a swipe behind ink,
never coloured text — signal yellow as type on paper is unreadable. box-decoration-break
keeps the swipe on every line when a phrase wraps.</p>""",
  width=880, height=440))

# ── 5. Blueprint motifs ──────────────────────────────────────────────────
CARDS.append(card(
  "components/blueprint.html", "Foundations", "Blueprint motifs",
  "Refs, dots, wires, dimensions, hatch",
  f"""<div class="ds-stack">
  <div class="ds-row" style="gap:28px">
    <span class="bp-ref">S/03 / pipeline</span>
    <span class="eyebrow"><span class="bp-dot"></span><span>Free — 30 min — no pitch</span></span>
  </div>
  <div class="ds-row" style="gap:28px">
    <div style="width:180px"><div class="bp-wire"></div>
      <div class="bp-annot" style="margin-top:8px">bp-wire — marching connector</div></div>
    <div style="width:180px"><div class="bp-dim"></div>
      <div class="bp-annot" style="margin-top:8px">bp-dim — measured span</div></div>
    <div style="width:120px"><div class="bp-hatch" style="height:44px;border:1px solid var(--border-line)"></div>
      <div class="bp-annot" style="margin-top:8px">bp-hatch — cut region</div></div>
  </div>
  <div>
    <div class="ds-label" style="margin-bottom:8px">Eyebrow tints — three inks, not five</div>
    <p class="bp-annot" style="margin:0;max-width:60ch">
      violet → gold #8A6A00 · warn → mid-grey · cyan/success/danger → plain black.
      A <code>danger</code> eyebrow reads as emphasis, not alarm; nothing on this
      brand is red or green.</p>
  </div>
</div>
<p class="ds-note">The drafting vocabulary. Every motif is drawn with borders and
gradients — no images, no icons beyond lucide's line set.</p>""",
  width=880, height=500))

# ── 6. Forms ─────────────────────────────────────────────────────────────
CARDS.append(card(
  "components/forms.html", "Site", "Form fields — marketing",
  "Label, input, textarea, submit",
  f"""<div style="max-width:420px" class="ds-stack">
  <div>
    <div class="ds-label" style="margin-bottom:8px">Work email</div>
    <input value="ops@company.cy" style="width:100%;padding:11px 13px;font-size:14px;
      font-family:var(--font-sans);background:var(--bg);color:var(--ink);
      border:1px solid var(--border-hi);border-radius:0;outline:none">
  </div>
  <div>
    <div class="ds-label" style="margin-bottom:8px">What should it handle?</div>
    <textarea rows="3" style="width:100%;padding:11px 13px;font-size:14px;
      font-family:var(--font-sans);background:var(--bg);color:var(--ink);
      border:1px solid var(--border-hi);border-radius:0;outline:none;resize:vertical"
      >Quotes and booking questions from the website.</textarea>
  </div>
  <a class="btn btn-grad size-lg" href="#" style="width:100%">Book the audit →</a>
</div>
<p class="ds-note">Focus is a single treatment sitewide: 2px solid ink outline at 2px
offset. Browser defaults are inconsistent and near-invisible on either sheet.</p>""",
  width=680, height=520))

# ── 7. Pricing card ──────────────────────────────────────────────────────
def tier(name, price, cadence, feats, featured):
    border = ("border:1.5px solid var(--ink);box-shadow:6px 6px 0 var(--signal)"
              if featured else "border:1px solid var(--border-hi)")
    badge = (f"""<span style="position:absolute;top:-10px;left:24px;border:1.5px solid var(--ink);
        background:var(--signal);color:var(--signal-ink);padding:2px 8px;
        font-family:var(--font-mono);font-size:10px;letter-spacing:.22em;
        text-transform:uppercase">Most picked</span>""" if featured else "")
    items = "".join(f"""<li style="display:flex;gap:12px;align-items:flex-start;
        font-size:13px;color:var(--ink-dim);margin:8px 0">
        <span class="bp-dot" style="margin-top:5px;flex-shrink:0"></span>{f}</li>""" for f in feats)
    btn = "btn-grad" if featured else "btn-draw"
    return f"""<div style="position:relative;padding:26px 24px;background:var(--bg);
      display:flex;flex-direction:column;{border}">
      {badge}
      <span style="font-family:var(--font-mono);font-size:12px;letter-spacing:.22em;
        text-transform:uppercase">{name}</span>
      <div style="font-size:34px;font-weight:600;letter-spacing:-0.03em;margin-top:14px">{price}</div>
      <div style="font-size:12px;color:var(--ink-mute);margin-top:4px">{cadence}</div>
      <ul style="list-style:none;padding:0;margin:18px 0 22px">{items}</ul>
      <a class="btn {btn} size-lg" href="#" style="width:100%;margin-top:auto">
        {"Start with Operator" if featured else "Try it for €99"}</a>
    </div>"""

CARDS.append(card(
  "patterns/pricing.html", "Site", "Pricing tier",
  "Default and featured",
  f"""<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:760px">
  {tier("Starter","€99/mo","1 agent · cancel anytime",
        ["Website widget + hosted chat page","Conversation credits included","Trained on your own content"],False)}
  {tier("Operator","€399/mo","up to 5 agents · cancel anytime",
        ["Everything in Starter","Lead capture + handoff to a human","One live view of your numbers"],True)}
</div>
<p class="ds-note">The featured card is marked three ways at once — heavier border,
a signal-yellow offset shadow, and the filled badge. Both surfaces that render tiers
(homepage teaser, /pricing) use identical metrics as of 2026-08-10; they had drifted
to different sizes.</p>""",
  width=880, height=620))

# ── 8. Two-sheet system ──────────────────────────────────────────────────
CARDS.append(card(
  "patterns/two-sheets.html", "Site", "Two-sheet system",
  "White ground, one inverted band",
  f"""<div style="border:1px solid var(--border-line)">
  <div style="padding:26px">
    <span class="bp-ref">S/04 / roles</span>
    <h3 style="font-size:26px;margin:10px 0 8px;letter-spacing:-0.02em">Ink on paper</h3>
    <p style="margin:0;font-size:14px;color:var(--ink-dim);max-width:52ch">
      The default sheet. Black type, hairline rules, generous air.</p>
  </div>
  <div class="on-black" style="padding:26px">
    <span class="bp-ref">S/05 / the delegation layer</span>
    <h3 style="font-size:26px;margin:10px 0 8px;letter-spacing:-0.02em">The band flips</h3>
    <p style="margin:0;font-size:14px;color:var(--ink-dim);max-width:52ch">
      One section per page may invert. Tokens do the work — the same markup,
      the same classes, a different sheet class on the wrapper.</p>
    <div style="margin-top:16px"><a class="btn btn-grad size-lg" href="#">Talk about custom</a></div>
  </div>
</div>
<p class="ds-note">Never more than one inverted band in a scroll. The flip is the
punctuation, so a second one spends the effect.</p>""",
  width=880, height=560))

# ── 9-12. The dashboard (automation_dashboard) ───────────────────────────
# The app vendors tokens.css byte-identical, so colour is shared and only the
# component layer differs. These cards exist to make the differences legible —
# which ones are deliberate, and which are still open.

CARDS.append(card(
  "app/buttons.html", "App", "Buttons — app",
  "Primary, secondary, danger",
  f"""<div class="ds-stack">
  <div class="ds-row">
    <button class="app-btn app-primary">Save changes</button>
    <button class="app-btn app-secondary">Cancel</button>
    <button class="app-btn app-danger">Delete agent</button>
  </div>
  <div class="on-black" style="padding:22px;border:1px solid var(--border-line)">
    <div class="ds-label" style="margin-bottom:10px">dark mode — the offset shadow flips with the sheet</div>
    <div class="ds-row">
      <button class="app-btn app-primary">Save changes</button>
      <button class="app-btn app-secondary">Cancel</button>
    </div>
  </div>
  <div>
    <div class="ds-label" style="margin-bottom:10px">the deliberate divergence</div>
    <div class="ds-row" style="gap:32px">
      <div><a class="btn btn-grad size-lg" href="#">Site — lifts out</a>
        <div class="bp-annot" style="margin-top:8px">4px shadow → 6px, translate(-2,-2)</div></div>
      <div><button class="app-btn app-primary">App — presses in</button>
        <div class="bp-annot" style="margin-top:8px">3px shadow → 2px, translate(+1,+1)</div></div>
    </div>
  </div>
</div>
<p class="ds-note">Same paint, opposite hover. A marketing CTA should feel raised;
an app control should feel pressed. That is a choice, not drift — recorded here so
nobody "fixes" it. The shadow itself is var(--ink) on both: it falls on the page
ground, so it must flip. It was hard-coded #111 until 2026-08-10, which made it
invisible in dark mode.</p>""",
  width=880, height=620, extra=APP_CSS))

CARDS.append(card(
  "app/chrome.html", "App", "App chrome",
  "Sidebar links, credit meter, page header",
  f"""<div class="ds-row" style="align-items:flex-start;gap:28px">
  <div style="width:230px;border:1px solid var(--border-line)">
    <div style="padding:10px">
      <a class="sidebar-link is-active" href="#"><span class="bp-dot"></span>Overview</a>
      <a class="sidebar-link" href="#"><span class="bp-dot"></span>Agents</a>
      <a class="sidebar-link" href="#"><span class="bp-dot"></span>Conversations</a>
      <a class="sidebar-link" href="#"><span class="bp-dot"></span>Knowledge</a>
    </div>
    <div style="border-top:1px solid var(--border-line);padding:12px">
      <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px">
        <span style="color:var(--ink-mute);text-transform:uppercase;letter-spacing:.05em">Operator plan</span>
        <span style="color:var(--ink-dim)">1,240 left</span>
      </div>
      <div class="meter" style="margin-top:6px"><i style="width:62%;background:var(--ink-dim)"></i></div>
      <div class="bp-annot" style="font-size:10px;margin-top:4px">2,760 / 4,000 monthly used</div>
      <div class="meter" style="margin-top:10px"><i style="width:88%;background:var(--signal)"></i></div>
      <div class="bp-annot" style="font-size:10px;margin-top:4px">warning state — the BRAND yellow</div>
    </div>
  </div>
  <div style="flex:1;min-width:300px;border:1px solid var(--border-line);padding:18px">
    <div class="bp-annot" style="margin-bottom:6px">Agents / Sales Bot</div>
    <div style="display:flex;align-items:center;gap:10px">
      <span class="bp-ref">FS</span>
      <h3 style="margin:0;font-size:20px;font-weight:600">Sales Bot</h3>
    </div>
    <div class="bp-dim" style="margin-top:8px;max-width:7rem"></div>
    <p style="margin:8px 0 0;font-size:14px;color:var(--ink-dim)">Engine configuration</p>
  </div>
</div>
<p class="ds-note">The active sidebar link is marked with the accent slot (--violet →
gold on paper), the only place the accent carries state rather than decoration. The
credit meter's warning bar was Tailwind's amber-500 until 2026-08-10 — a second
yellow nobody chose, sitting beside the brand's own.</p>""",
  width=880, height=480, extra=APP_CSS))

CARDS.append(card(
  "app/forms.html", "App", "Form fields — app",
  "Label, input, checkbox, error",
  f"""<div style="max-width:420px" class="ds-stack">
  <div>
    <label class="app-label" style="margin-bottom:6px">Agent name</label>
    <input class="app-input" value="Sales Bot">
  </div>
  <div>
    <label class="app-label" style="margin-bottom:6px">Reply tone</label>
    <select class="app-input"><option>Professional</option></select>
  </div>
  <div style="display:flex;align-items:center;gap:10px">
    <input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--ink);border-radius:0">
    <span style="font-size:14px">Capture leads automatically</span>
  </div>
  <div>
    <label class="app-label" style="margin-bottom:6px">Webhook URL</label>
    <input class="app-input" value="not-a-url" style="border-color:{st('white','bad-ink')}">
    <p style="margin:6px 0 0;font-size:14px;color:{st('white','bad-ink')}">Must be a valid https URL.</p>
  </div>
</div>
<p class="ds-note">Square corners, hairline borders, mono uppercase labels — the same
register as the marketing forms, one size denser. The error colour is --state-bad-ink,
not a raw red — see the status card. select needs the app.css re-theme, because @tailwindcss/forms
hard-codes a white background that survives the black sheet.</p>""",
  width=680, height=600, extra=APP_CSS))

CARDS.append(card(
  "app/status.html", "App", "Status colour",
  "Four families, five roles",
  f"""<div class="ds-stack">
  <div>
    <div class="ds-label" style="margin-bottom:10px">white sheet</div>
    <div class="ds-row">
      <span class="badge" style="background:{st('white','ok-surface')};color:{st('white','ok-ink')};border:1px solid {st('white','ok-line')}">Published</span>
      <span class="badge" style="background:{st('white','warn-surface')};color:{st('white','warn-ink')};border:1px solid {st('white','warn-line')}">Draft</span>
      <span class="badge" style="background:{st('white','bad-surface')};color:{st('white','bad-ink')};border:1px solid {st('white','bad-line')}">Failed</span>
      <span class="badge" style="background:{st('white','info-surface')};color:{st('white','info-ink')};border:1px solid {st('white','info-line')}">Queued</span>
    </div>
  </div>
  <div class="on-black" style="padding:20px;border:1px solid var(--border-line)">
    <div class="ds-label" style="margin-bottom:10px">black sheet — the same classes, resolved through the sheet</div>
    <div class="ds-row">
      <span class="badge" style="background:{st('black','ok-surface')};color:{st('black','ok-ink')};border:1px solid {st('black','ok-line')}">Published</span>
      <span class="badge" style="background:{st('black','warn-surface')};color:{st('black','warn-ink')};border:1px solid {st('black','warn-line')}">Draft</span>
      <span class="badge" style="background:{st('black','bad-surface')};color:{st('black','bad-ink')};border:1px solid {st('black','bad-line')}">Failed</span>
      <span class="badge" style="background:{st('black','info-surface')};color:{st('black','info-ink')};border:1px solid {st('black','info-line')}">Queued</span>
    </div>
  </div>
  <div>
    <div class="ds-label" style="margin-bottom:10px">solid fills — sheet-invariant, they carry their own foreground</div>
    <div class="ds-row">
      <span class="badge" style="background:{st('solid','bad-solid')};color:{st('solid','bad-on')}">Delete</span>
      <span class="badge" style="background:{st('solid','ok-solid')};color:{st('solid','ok-on')}">Done</span>
      <span class="badge" style="background:{st('solid','warn-solid')};color:{st('solid','warn-on')}">Attention</span>
      <span class="badge" style="background:{st('solid','info-solid')};color:{st('solid','info-on')}">Active</span>
    </div>
  </div>
  <table style="border-collapse:collapse;font-size:13px">
    <tr><td style="padding:3px 16px 3px 0"><span class="ds-label">surface</span></td>
        <td class="bp-annot">chip fill — 1.03–1.31:1 against the page, so a badge never glares</td></tr>
    <tr><td style="padding:3px 16px 3px 0"><span class="ds-label">ink</span></td>
        <td class="bp-annot">text and icons — &ge;4.5:1 against BOTH the page and its own chip</td></tr>
    <tr><td style="padding:3px 16px 3px 0"><span class="ds-label">line</span></td>
        <td class="bp-annot">hairline borders on callouts</td></tr>
    <tr><td style="padding:3px 16px 3px 0"><span class="ds-label">solid</span></td>
        <td class="bp-annot">saturated fill for a filled control; sheet-invariant</td></tr>
    <tr><td style="padding:3px 16px 3px 0"><span class="ds-label">on</span></td>
        <td class="bp-annot">the foreground for solid — warn's is near-black, the yellow rule again</td></tr>
  </table>
</div>
<p class="ds-note">RESOLVED 2026-08-10. The brand is monochrome plus one signal and
tokens.css says status is ink and grey — right for the marketing site, wrong for an
ops UI where you scan a list to find the broken run. So: a small semantic set, and
only this set. 171 raw Tailwind palette classes across 36 files were migrated onto
it; those were frozen light-mode values that never flipped, so chips were near-white
blocks on the black sheet and standalone coloured text sat at 3.34:1. Now
6.47:1 light / 7.59:1 dark, measured in a browser, not estimated. warn's ink is the
BRAND accent rather than a new yellow. Reach for these instead of Tailwind's
palette — that leak is the bug they replace.</p>""",
  width=880, height=680, extra=APP_CSS))

print(f"{len(CARDS)} cards → {OUT}")
for c in CARDS:
    print(f"  {c['group']:<12} {c['path']}")
print("\nUpload: DesignSync finalize_plan(localDir=<outdir>, writes=[...]) then write_files.")
