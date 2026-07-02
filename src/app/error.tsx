"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

/**
 * Route error boundary — keeps the site chrome (nav/footer render from
 * the layout above this boundary) and speaks the same sheet language
 * as the 404. `unstable_retry` re-fetches and re-renders the segment,
 * which recovers from transient faults like a hiccuping stats fetch.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Server errors reach the client as a generic message + digest;
    // log so the digest is easy to grab when matching server logs.
    console.error(error);
  }, [error]);

  return (
    <section className="relative pt-16 pb-24 sm:pt-24">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center">
        <Eyebrow tint="danger">Runtime fault</Eyebrow>

        <h1 className="mt-7 max-w-[20ch] text-balance text-4xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-6xl">
          Something broke{" "}
          <span className="text-gradient">on this sheet.</span>
        </h1>

        <p className="text-ink-dim mt-6 max-w-[60ch] text-pretty font-mono text-base leading-[1.7] tracking-[0.01em] sm:text-lg">
          The page hit an unexpected fault while rendering. It&apos;s
          usually transient — try again, or head back to the index.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="btn-grad inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.18em] uppercase"
          >
            Try again →
          </button>
          <Link
            href="/"
            className="btn-draw inline-flex items-center justify-center px-6 py-4 text-xs font-semibold tracking-[0.18em] uppercase"
          >
            Back to index
          </Link>
        </div>

        {error.digest && (
          <p
            aria-hidden
            className="text-ink-dim mt-16 font-mono text-[11px] tracking-[0.18em] uppercase"
          >
            {`// fault reference: ${error.digest}`}
          </p>
        )}
      </div>
    </section>
  );
}
