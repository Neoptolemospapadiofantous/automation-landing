import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/seo";

/**
 * Default Open Graph image — what every URL on the site shows when it
 * gets pasted into Slack, Twitter, Discord, LinkedIn, iMessage, etc.
 * Mirrors the mono editorial system of the live site: black ground,
 * white ink, hairline grid, corner registration ticks, monospace.
 *
 * Per-page OG overrides can be added by creating sibling files like
 * `src/app/pricing/opengraph-image.tsx`.
 */
export const alt = `${BRAND.name} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const tickColor = "#FFFFFF";
  const lineColor = "rgba(255,255,255,0.14)";
  const muteColor = "#6B6B6B";
  const dimColor = "#B8B8B8";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "#000000",
          color: "#FFFFFF",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          padding: 64,
          // 160px major grid — same primitive as the body bg on the site
          backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: "160px 160px, 160px 160px",
        }}
      >
        {/* corner registration ticks — same furniture as the chrome */}
        <div style={tickStyle("top-left", tickColor)} />
        <div style={tickStyle("top-right", tickColor)} />
        <div style={tickStyle("bottom-left", tickColor)} />
        <div style={tickStyle("bottom-right", tickColor)} />

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
              border: `1.5px solid ${tickColor}`,
              display: "flex",
            }}
          />
          <span>FIG. 00 / FLOWSTACK</span>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 100,
            gap: 28,
          }}
        >
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              maxWidth: 1000,
            }}
          >
            An AI agent for your team.
          </div>
          <div
            style={{
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: dimColor,
            }}
          >
            Live in 60 seconds.
          </div>
        </div>

        {/* dimension line + annotation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 40,
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
            $99/mo · cancel anytime
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
            borderTop: `1px solid ${lineColor}`,
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: muteColor,
          }}
        >
          <span style={{ color: tickColor, letterSpacing: "0.1em" }}>
            FLOWSTACK / AUTOMATION
          </span>
          <span>SHEET 01 · REV A · SCALE 1:1</span>
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
