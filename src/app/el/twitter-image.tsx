/**
 * Greek Twitter card image — reuses the Greek OG card, the same way the
 * root twitter-image reuses the root OG card. Without this file the
 * /el pages would fall back to the ENGLISH root twitter-image while
 * their OG image is Greek — the exact split the 2026-09-02 Twitter-text
 * fix closed for the metadata.
 */
export { alt, size, contentType } from "./opengraph-image";
export { default } from "./opengraph-image";
