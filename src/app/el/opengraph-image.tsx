import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Greek Open Graph image — covers /el and everything under it, so a
 * Greek link shared on Facebook, LinkedIn or WhatsApp shows a Greek
 * card instead of the English tagline sheet the root image draws.
 *
 * Same "ink on paper" template as the root card, but the headline is
 * the four-verb offer the Greek pages actually open with (ΧΤΙΖΟΥΜΕ /
 * ΑΠΑΝΤΑΜΕ / ΑΥΤΟΜΑΤΟΠΟΙΟΥΜΕ / ΜΕΤΡΑΜΕ) rather than a translation of
 * the English tagline — the tagline never appears on the Greek pages,
 * the verbs do.
 *
 * Fonts: satori's built-in font is Latin-only, so Greek text renders
 * blank without an explicit font. The two TTFs beside this file are
 * Inter 500/700 subset to Greek + basic Latin (~27KB each, against
 * ImageResponse's 500KB bundle cap) — regenerate with pyftsubset over
 * unicodes U+0020-007E, U+00B7, U+0370-03FF, U+1F00-1FFF, U+2013,
 * U+2014, U+20AC if the copy ever needs a glyph outside that set.
 *
 * All-caps Greek drops the tonos (ledger, 2026-09-02), and satori's
 * text-transform is a naive toUpperCase() that would keep it — so the
 * uppercase strings below are authored unaccented directly, and no
 * textTransform is applied to Greek text.
 */
export const alt = "Flowstack — Χτίζουμε, απαντάμε, αυτοματοποιούμε, μετράμε";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#000000";
const SIGNAL = "#F5C518";
const SIGNAL_INK = "#141412";

export default async function OpenGraphImage() {
  const lineColor = "rgba(0,0,0,0.09)";
  const muteColor = "#8A8A8A";
  const dimColor = "#525252";

  const [interBold, interMedium] = await Promise.all([
    readFile(join(process.cwd(), "src/app/el/InterGreek-Bold.ttf")),
    readFile(join(process.cwd(), "src/app/el/InterGreek-Medium.ttf")),
  ]);

  // Site order, one verb a line; ΑΠΑΝΤΑΜΕ carries the marker swipe the
  // way "Answer every inbound." does on the English card.
  const verbs = [
    { text: "ΧΤΙΖΟΥΜΕ", color: INK },
    { text: "ΑΠΑΝΤΑΜΕ", swipe: true },
    { text: "ΑΥΤΟΜΑΤΟΠΟΙΟΥΜΕ", color: dimColor },
    { text: "ΜΕΤΡΑΜΕ", color: INK },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#FFFFFF",
          color: INK,
          fontFamily: "Inter",
          padding: 64,
          backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: "160px 160px, 160px 160px",
        }}
      >
        {/* corner registration ticks — same furniture as the chrome */}
        <div style={tickStyle("top-left", INK)} />
        <div style={tickStyle("top-right", INK)} />
        <div style={tickStyle("bottom-left", INK)} />
        <div style={tickStyle("bottom-right", INK)} />

        {/* sheet ref top-left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: muteColor,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.22em",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              border: `1.5px solid ${INK}`,
              background: SIGNAL,
              display: "flex",
            }}
          />
          <span>FIG. 00 / FLOWSTACK · EL</span>
        </div>

        {/* headline — the four verbs, one per line */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 40,
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          {verbs.map((v) => (
            <div
              key={v.text}
              style={{
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                ...(v.swipe
                  ? {
                      color: SIGNAL_INK,
                      background: SIGNAL,
                      padding: "6px 14px",
                    }
                  : { color: v.color }),
              }}
            >
              {v.text}
            </div>
          ))}
        </div>

        {/* dimension line + annotation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 28,
          }}
        >
          <div style={{ width: 96, height: 1, background: dimColor }} />
          <div
            style={{
              color: muteColor,
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "0.16em",
            }}
          >
            CHAT ΣΕ 60 ΔΕΥΤΕΡΟΛΕΠΤΑ · ΔΩΡΕΑΝ ΞΕΚΙΝΗΜΑ · ΛΕΜΕΣΟΣ, ΚΥΠΡΟΣ
          </div>
        </div>

        {/* footer baseline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "auto",
            paddingTop: 32,
            borderTop: `1px solid rgba(0,0,0,0.14)`,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: muteColor,
          }}
        >
          <span style={{ color: INK, letterSpacing: "0.1em" }}>
            FLOWSTACK / AUTOMATION
          </span>
          <span>ΦΥΛΛΟ 01 · ΑΝΑΘ. Β · ΚΛΙΜΑΚΑ 1:1</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
      ],
    },
  );
}

function tickStyle(
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right",
  color: string,
): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 24,
    height: 24,
    display: "flex",
  };
  switch (corner) {
    case "top-left":
      return {
        ...base,
        top: 48,
        left: 48,
        borderTop: `2px solid ${color}`,
        borderLeft: `2px solid ${color}`,
      };
    case "top-right":
      return {
        ...base,
        top: 48,
        right: 48,
        borderTop: `2px solid ${color}`,
        borderRight: `2px solid ${color}`,
      };
    case "bottom-left":
      return {
        ...base,
        bottom: 48,
        left: 48,
        borderBottom: `2px solid ${color}`,
        borderLeft: `2px solid ${color}`,
      };
    case "bottom-right":
      return {
        ...base,
        bottom: 48,
        right: 48,
        borderBottom: `2px solid ${color}`,
        borderRight: `2px solid ${color}`,
      };
  }
}
