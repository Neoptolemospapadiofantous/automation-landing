import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/seo";

/**
 * Default Open Graph image — what every URL on the site shows when it
 * gets pasted into Slack, Twitter, Discord, LinkedIn, iMessage, etc.
 * Mirrors the "ink on paper" system of the live site (2026-08
 * redesign): paper ground, ink type, hairline grid, corner
 * registration ticks, the marker-highlight swipe on the third beat.
 *
 * Per-page OG overrides can be added by creating sibling files like
 * `src/app/pricing/opengraph-image.tsx`.
 */
export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#000000";
const SIGNAL = "#F5C518";
const SIGNAL_INK = "#141412";

export default async function OpenGraphImage() {
  const lineColor = "rgba(0,0,0,0.09)";
  const muteColor = "#8A8A8A";
  const dimColor = "#525252";

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
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          padding: 64,
          // 160px major grid — same primitive as the body bg on the site
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
            letterSpacing: "0.22em",
            textTransform: "uppercase",
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
          <span>FIG. 00 / FLOWSTACK</span>
        </div>

        {/* headline — the three-beat tagline, one line each; third beat
            carries the marker-highlight swipe from the live hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 52,
            gap: 22,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              maxWidth: 1040,
            }}
          >
            Automate the busywork.
          </div>
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: dimColor,
              maxWidth: 1040,
            }}
          >
            Aggregate the data.
          </div>
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: SIGNAL_INK,
              background: SIGNAL,
              padding: "6px 14px",
              maxWidth: 1080,
            }}
          >
            Answer every inbound.
          </div>
        </div>

        {/* dimension line + annotation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 36,
          }}
        >
          <div style={{ width: 96, height: 1, background: dimColor }} />
          <div
            style={{
              color: muteColor,
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            live in 60 seconds · free to start · cancel anytime
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
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: muteColor,
          }}
        >
          <span style={{ color: INK, letterSpacing: "0.1em" }}>
            FLOWSTACK / AUTOMATION
          </span>
          <span>SHEET 01 · REV B · SCALE 1:1</span>
        </div>
      </div>
    ),
    { ...size },
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
