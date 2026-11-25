"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { registerUrl } from "@/lib/dashboard";
import { ctaClass } from "@/components/ui/button";
import { FREE_CALL } from "@/lib/content";
import {
  AnswerBubble,
  ChatWindow,
  ENQUIRY_EN,
  LeadCard,
  Meta,
  VisitorBubble,
} from "@/components/motion/product-bits";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Hero — depth built into the page (2026-09-29, after a decorative 3D
 * backdrop was rejected as "boxes floating"): the product itself is the
 * scene. The chat window, the visitor's message, our answer, the lead and a
 * time tag sit on separate layers at different depths inside one perspective
 * stage.
 *   - load: layers arrive from depth, back to front
 *   - pointer: the stage turns toward the cursor (quickTo, no easing fights)
 *   - scroll: scrubbed 1:1 by ScrollTrigger — near layers move further than
 *     far ones, the stage tips back, the text lifts away
 * Reduced motion: the composed scene, still.
 */
const proof = [
  { v: "48h", l: "free call → written fixed price", mark: true },
  { v: "24/7", l: "every enquiry answered", mark: false },
  { v: "60s", l: "to add the chat · from €19.99/mo", mark: false },
] as const;

// Depth (px, translateZ) and scroll travel (px) per layer, back to front.
// SHARPNESS RULE: with a 2400px perspective, z ≤ 180 keeps every layer
// within ~8% of true size. A layer pushed further forward is rasterised at
// its CSS size and then enlarged, which blurs its text — so depth comes from
// the parallax travel (near layers move further) and the shadows, not from
// large z values.
const LAYERS = [
  { key: "glow", z: -260, travel: 40 },
  { key: "window", z: 0, travel: -80 },
  { key: "visitor", z: 70, travel: -190 },
  { key: "answer", z: 120, travel: -290 },
  { key: "lead", z: 150, travel: -370 },
  { key: "tag", z: 180, travel: -440 },
] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const copy = ENQUIRY_EN;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 768px)",
        },
        (ctx) => {
          const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
          const depth = wide ? 1 : 0.5;
          LAYERS.forEach((l) => gsap.set(`[data-layer="${l.key}"]`, { z: l.z * depth }));
          gsap.set("[data-stage]", { rotationX: 6, rotationY: -12 });
          if (!motion) return;

          // Arrive from depth, back to front.
          gsap.from("[data-layer]", {
            z: (i) => LAYERS[i].z * depth - 700,
            autoAlpha: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
          });
          gsap.from("[data-hero-line]", { y: 28, autoAlpha: 0, duration: 0.8, ease: "power4.out", stagger: 0.06 });

          // Pointer: turn the stage toward the cursor.
          const rx = gsap.quickTo("[data-stage]", "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo("[data-stage]", "rotationY", { duration: 0.6, ease: "power3.out" });
          const onMove = (e: PointerEvent) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            rx(6 - y * 8);
            ry(-12 + x * 12);
          };
          if (wide) window.addEventListener("pointermove", onMove);

          // Scroll: layers separate by depth, the stage tips back, text lifts.
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          });
          LAYERS.forEach((l) => tl.to(`[data-layer="${l.key}"]`, { y: l.travel * depth, ease: "none" }, 0));
          tl.to("[data-tilt]", { rotationX: 14, ease: "none" }, 0);
          tl.to("[data-hero-text]", { y: -90, autoAlpha: 0.15, ease: "none" }, 0);

          return () => window.removeEventListener("pointermove", onMove);
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="hero" ref={root} className="relative overflow-x-clip">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 pt-14 pb-10 sm:pt-20 lg:min-h-[78vh] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div data-hero-text className="relative z-20">
          <span data-hero-line className="bp-ref inline-flex items-center gap-2.5">
            <span className="bp-dot" aria-hidden />
            FIG. 00 — {copy.time} · office closed · answered anyway
          </span>
          <h1
            data-hero-line
            className="mt-7 text-[42px] leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-[58px] lg:text-[70px]"
          >
            Every enquiry answered. Even the ones <span className="text-gradient">at 3am.</span>
          </h1>
          <p data-hero-line className="text-ink-dim mt-7 max-w-[44ch] text-lg leading-[1.6] text-pretty">
            Your phone is covered eight and a half hours a day. Enquiries are not.{" "}
            <span className="text-ink font-semibold">
              We answer the rest, in Greek and English, and file them where you work.
            </span>
          </p>
          <div data-hero-line className="mt-9 flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
            <Link href={FREE_CALL.href} className={ctaClass()}>
              <span className="sm:hidden">{FREE_CALL.short} →</span>
              <span className="hidden sm:inline">{FREE_CALL.label} →</span>
            </Link>
            <Link href={registerUrl()} className={ctaClass({ variant: "ghost" })}>
              Start the chat
            </Link>
          </div>
        </div>

        {/* The scene. Decorative: the headline says it. */}
        <div aria-hidden className="relative mt-10 h-[420px] [perspective:2400px] sm:h-[520px] lg:mt-0">
          <div data-tilt className="absolute inset-0 [transform-style:preserve-3d]">
            <div data-stage className="absolute inset-0 [transform-style:preserve-3d]">
              <div
                data-layer="glow"
                className="absolute top-[4%] left-[6%] h-[92%] w-[92%] rounded-[28px] bg-[radial-gradient(closest-side,rgba(245,197,24,0.55),rgba(245,197,24,0.12)_55%,transparent)]"
              />
              <div data-layer="window" className="absolute top-[10%] left-[18%] h-[76%] w-[62%]">
                <ChatWindow copy={copy} />
              </div>
              <div data-layer="visitor" className="absolute top-[4%] left-[0%] w-[58%] max-w-[330px]">
                <VisitorBubble copy={copy} />
              </div>
              <div data-layer="answer" className="absolute top-[42%] right-[0%] w-[60%] max-w-[340px]">
                <AnswerBubble copy={copy} />
              </div>
              <div data-layer="lead" className="absolute bottom-[0%] left-[16%] w-[46%] max-w-[260px]">
                <LeadCard copy={copy} />
              </div>
              <div
                data-layer="tag"
                className="bg-ink text-bg absolute top-[0%] right-[6%] hidden rounded-full md:block px-3.5 py-1.5 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.5)]"
              >
                <Meta className="text-bg">{copy.time} · 3 s</Meta>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6">
        {/* Proof — three structurally-true claims. */}
        <dl className="border-border-hi bg-bg relative z-10 mt-6 grid max-w-[860px] grid-cols-1 border sm:grid-cols-3">
          {proof.map((p, i) => (
            <div
              key={p.l}
              className={`px-5 py-4 ${i > 0 ? "border-border-line border-t sm:border-t-0 sm:border-l" : ""}`}
            >
              <dt className="text-ink text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                <span className={p.mark ? "mark-under" : undefined}>{p.v}</span>
              </dt>
              <dd className="bp-annot mt-1 normal-case">{p.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
