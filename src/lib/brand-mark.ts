/**
 * The Flowstack flow-node mark as a standalone SVG, kept in sync with
 * `src/components/logo.tsx`. Used by the generated app icons
 * (`icon.tsx`, `apple-icon.tsx`) where Satori renders an `<img>` from a
 * data URI rather than inline JSX SVG.
 */
export function brandMarkSvg(color = "#FFFFFF"): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="22" viewBox="0 0 34 22" fill="none" overflow="visible"><path d="M0 11 H6" stroke="${color}" stroke-width="1.5"/><rect x="6.75" y="4.75" width="20.5" height="12.5" stroke="${color}" stroke-width="1.5"/><rect x="10.25" y="8.5" width="5" height="5" fill="${color}"/><rect x="18.75" y="8.5" width="5" height="5" stroke="${color}" stroke-width="1"/><path d="M27.25 11 H34" stroke="${color}" stroke-width="1.5"/><path d="M31.5 8.5 L34 11 L31.5 13.5" stroke="${color}" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter"/></svg>`;
}

/** Base64 data URI of the mark — avoids URL-encoding the `#` and spaces. */
export function brandMarkDataUri(color = "#FFFFFF"): string {
  return `data:image/svg+xml;base64,${Buffer.from(brandMarkSvg(color)).toString("base64")}`;
}

/** Mark aspect ratio (width / height) for sizing the `<img>`. */
export const BRAND_MARK_RATIO = 34 / 22;
