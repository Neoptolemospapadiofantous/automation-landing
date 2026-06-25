import { ImageResponse } from "next/og";
import { brandMarkDataUri, BRAND_MARK_RATIO } from "@/lib/brand-mark";

/**
 * Apple touch icon (iOS home-screen / bookmark). iOS applies its own
 * rounding and gloss, so the mark sits on a solid black ground with a
 * little extra breathing room than the web icon.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const markWidth = Math.round(size.width * 0.54);
  const markHeight = Math.round(markWidth / BRAND_MARK_RATIO);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandMarkDataUri()} width={markWidth} height={markHeight} alt="" />
      </div>
    ),
    { ...size },
  );
}
