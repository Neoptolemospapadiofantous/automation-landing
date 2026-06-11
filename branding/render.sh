#!/usr/bin/env bash
# branding/render.sh
#
# Generates every PNG + ICO asset in this folder from the SVG masters
# in branding/source/. Re-run any time the master SVG changes.
#
# Requires ImageMagick (`convert`). Output is RGBA PNG.
#
# Usage:  bash branding/render.sh

set -euo pipefail

cd "$(dirname "$0")"
SRC="source"

# ── helpers ───────────────────────────────────────────────────────────────────

render() {
  # render <svg> <width> <output.png>
  local svg="$1" width="$2" out="$3"
  mkdir -p "$(dirname "$out")"
  convert -background none -density 300 "$svg" -resize "${width}x${width}" \
    -depth 8 -define png:color-type=6 "$out"
}

render_exact() {
  # render at exact WxH (for banners with non-square aspect)
  local svg="$1" w="$2" h="$3" out="$4"
  mkdir -p "$(dirname "$out")"
  convert -background none -density 300 "$svg" -resize "${w}x${h}!" \
    -depth 8 -define png:color-type=6 "$out"
}

count=0
say() { count=$((count + 1)); printf '  [%2d] %s\n' "$count" "$1"; }

# ── 1. Favicon set ────────────────────────────────────────────────────────────
echo "Favicon set..."
for size in 16 32 48 64 128 192 512; do
  render "$SRC/mark-square-white-on-black.svg" $size "favicon/favicon-${size}.png"
  say "favicon/favicon-${size}.png"
done

# Apple touch icon (180×180, rounded corners handled by iOS itself)
render "$SRC/mark-square-white-on-black.svg" 180 "favicon/apple-touch-icon-180.png"
say "favicon/apple-touch-icon-180.png"

# Multi-resolution favicon.ico (Windows + legacy browsers)
convert \
  favicon/favicon-16.png \
  favicon/favicon-32.png \
  favicon/favicon-48.png \
  favicon/favicon-64.png \
  favicon/favicon.ico
say "favicon/favicon.ico (multi-res 16/32/48/64)"

# ── 2. PWA / web manifest ─────────────────────────────────────────────────────
echo
echo "PWA icons..."
render "$SRC/mark-square-white-on-black.svg" 192 "pwa/icon-192.png"; say "pwa/icon-192.png"
render "$SRC/mark-square-white-on-black.svg" 512 "pwa/icon-512.png"; say "pwa/icon-512.png"
render "$SRC/mark-square-maskable.svg"      512 "pwa/icon-512-maskable.png"; say "pwa/icon-512-maskable.png"

# ── 3. X (Twitter) ────────────────────────────────────────────────────────────
echo
echo "X (Twitter)..."
render "$SRC/mark-square-white-on-black.svg" 400  "social/x/profile-400.png"; say "social/x/profile-400.png"
render "$SRC/mark-square-white-on-black.svg" 800  "social/x/profile-800.png"; say "social/x/profile-800.png  (retina)"
render_exact "$SRC/banner-x.svg" 1500 500 "social/x/banner-1500x500.png";       say "social/x/banner-1500x500.png"

# ── 4. LinkedIn ───────────────────────────────────────────────────────────────
echo
echo "LinkedIn..."
render "$SRC/mark-square-white-on-black.svg" 300 "social/linkedin/profile-300.png"; say "social/linkedin/profile-300.png"
render "$SRC/mark-square-white-on-black.svg" 400 "social/linkedin/profile-400.png"; say "social/linkedin/profile-400.png  (retina)"
render_exact "$SRC/banner-linkedin-cover.svg"    1128 191 "social/linkedin/cover-company-1128x191.png";    say "social/linkedin/cover-company-1128x191.png"
render_exact "$SRC/banner-linkedin-personal.svg" 1584 396 "social/linkedin/cover-personal-1584x396.png";   say "social/linkedin/cover-personal-1584x396.png"

# ── 5. Facebook ───────────────────────────────────────────────────────────────
echo
echo "Facebook..."
render "$SRC/mark-square-white-on-black.svg" 170 "social/facebook/profile-170.png"; say "social/facebook/profile-170.png"
render "$SRC/mark-square-white-on-black.svg" 512 "social/facebook/profile-512.png"; say "social/facebook/profile-512.png  (retina)"
render_exact "$SRC/banner-linkedin-cover.svg" 851 315 "social/facebook/cover-851x315.png"; say "social/facebook/cover-851x315.png  (reuses LinkedIn cover)"

# ── 6. Instagram ──────────────────────────────────────────────────────────────
echo
echo "Instagram..."
render "$SRC/mark-square-white-on-black.svg" 320  "social/instagram/profile-320.png"; say "social/instagram/profile-320.png"
render "$SRC/mark-square-white-on-black.svg" 1024 "social/instagram/profile-1024.png"; say "social/instagram/profile-1024.png  (retina)"

# ── 7. GitHub ─────────────────────────────────────────────────────────────────
echo
echo "GitHub..."
render "$SRC/mark-square-white-on-black.svg" 460  "social/github/avatar-460.png";  say "social/github/avatar-460.png"
render "$SRC/mark-square-white-on-black.svg" 1024 "social/github/avatar-1024.png"; say "social/github/avatar-1024.png  (retina)"

# ── 8. YouTube ────────────────────────────────────────────────────────────────
echo
echo "YouTube..."
render "$SRC/mark-square-white-on-black.svg" 800 "social/youtube/avatar-800.png"; say "social/youtube/avatar-800.png"
render_exact "$SRC/banner-youtube.svg" 2560 1440 "social/youtube/banner-2560x1440.png"; say "social/youtube/banner-2560x1440.png  (safe area 1546×423)"

# ── 9. Discord ────────────────────────────────────────────────────────────────
echo
echo "Discord..."
render "$SRC/mark-square-white-on-black.svg" 512 "social/discord/icon-512.png"; say "social/discord/icon-512.png"

# ── 10. Slack ─────────────────────────────────────────────────────────────────
echo
echo "Slack..."
render "$SRC/mark-square-white-on-black.svg" 512 "social/slack/icon-512.png"; say "social/slack/icon-512.png"

# ── 11. Meta / OG image static fallback ───────────────────────────────────────
echo
echo "Meta / OG..."
render_exact "$SRC/banner-x.svg" 1200 630 "social/meta/og-1200x630.png"; say "social/meta/og-1200x630.png  (reuses X banner)"

# ── Summary ───────────────────────────────────────────────────────────────────
echo
echo "Done — $count files."
echo "Re-run any time the SVG masters in branding/source/ change."
