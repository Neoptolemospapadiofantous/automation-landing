import { ImageResponse } from "next/og";
import { brandMarkDataUri, BRAND_MARK_RATIO } from "@/lib/brand-mark";

/**
 * Generated app icons. Emits the two sizes a PWA install needs (192 +
 * 512); `manifest.ts` references these via `/icon/192` and `/icon/512`.
 * Black ground + white flow-node mark, matching the site chrome and the
 * OG image.
 */
export function generateImageMetadata() {
  return [
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const n = Number(await id);
  const markWidth = Math.round(n * 0.6);
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
    { width: n, height: n },
  );
}
