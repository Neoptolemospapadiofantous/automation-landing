"use client";

/**
 * Last-resort boundary — replaces the ROOT LAYOUT when it throws, so
 * nothing from globals.css / next-font is guaranteed to exist here.
 * Everything is inline-styled and dependency-free on purpose: this
 * must render even when the design system itself is what crashed.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          background: "#000",
          color: "#fff",
          fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Flowstack — fatal fault
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.04,
          }}
        >
          The whole sheet failed to draw.
        </h1>
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            background: "#fff",
            color: "#000",
            border: 0,
            padding: "1rem 1.5rem",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Try again →
        </button>
        {error.digest && (
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {`// fault reference: ${error.digest}`}
          </p>
        )}
      </body>
    </html>
  );
}
