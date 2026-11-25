"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  AnswerBubble,
  CalendarCard,
  ChatWindow,
  ENQUIRY_EN,
  LeadCard,
  TypingDots,
  VisitorBubble,
} from "@/components/motion/product-bits";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * S/03 — one enquiry, end to end, as a pinned scroll scene (replaces the old
 * Pipeline sheet, whose first step still sold cold email after the
 * 2026-09-29 narrowing).
 *
 * The section pins for ~3 viewports while one timeline, scrubbed 1:1 by the
 * scroll, plays four steps in depth: the message arrives, it is answered,
 * the lead is pulled out of the conversation, the calendar slot fills. The
 * "camera" (the stage's rotation and zoom) orbits slowly across the whole
 * scene. The step list follows the scroll and is also the text equivalent of
 * the scene for screen readers.
 *
 * Reduced motion: no pin, the finished scene and all four steps, still.
 */
const STEPS = [
  { n: "01", t: "It arrives", d: "23:40, the office is closed. A visitor asks on your site." },
  { n: "02", t: "It's answered", d: "In seconds, from your own documents, in Greek or English." },
  { n: "03", t: "The lead is kept", d: "Name, number and the whole conversation, scored for fit." },
  { n: "04", t: "It's filed", d: "Straight into the calendar, sheet or CRM you already use." },
] as const;

export function EnquiryStory() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const copy = ENQUIRY_EN;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 768px)" },
        (ctx) => {
          const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
          const d = wide ? 1 : 0.55;
          if (!motion) {
            setActive(3);
            return;
          }

          gsap.set("[data-s-stage]", { rotationX: 8, rotationY: -16, z: -40 * d });
          gsap.set("[data-s='visitor']", { z: -700 * d, autoAlpha: 0 });
          gsap.set("[data-s='typing']", { autoAlpha: 0, scale: 0.6 });
          gsap.set("[data-s='answer']", { z: -500 * d, x: 120 * d, autoAlpha: 0 });
          gsap.set("[data-s='lead']", { z: -40, x: 90 * d, y: -40 * d, scale: 0.55, autoAlpha: 0 });
          gsap.set("[data-fit]", { scaleX: 0 });
          gsap.set("[data-s='cal']", { y: 260 * d, z: -200 * d, autoAlpha: 0 });
          gsap.set("[data-slot]", { scaleX: 0, transformOrigin: "left center" });
          gsap.set("[data-booked]", { autoAlpha: 0 });
          gsap.set("[data-inwin]", { autoAlpha: 0, y: 10 });

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 3}`,
              scrub: true,
              pin: pin.current,
              anticipatePin: 1,
              // A step lights up once its part of the scene is under way.
              onUpdate: (st) => setActive(Math.min(3, Math.max(0, Math.floor(st.progress * 4 - 0.2)))),
            },
          });

          // Camera orbit across the whole scene.
          tl.to("[data-s-stage]", { rotationY: 10, rotationX: 4, z: 0, duration: 4, ease: "none" }, 0);

          // 01 — the message arrives.
          tl.to("[data-s='visitor']", { z: 90 * d, autoAlpha: 1, duration: 0.8 }, 0.1)
            .to("[data-inwin='visitor']", { autoAlpha: 1, y: 0, duration: 0.3 }, 0.75);
          // 02 — typing, then the answer.
          tl.to("[data-s='typing']", { autoAlpha: 1, scale: 1, duration: 0.3 }, 1.0)
            .to("[data-s='typing']", { autoAlpha: 0, duration: 0.2 }, 1.45)
            .to("[data-s='answer']", { z: 150 * d, x: 0, autoAlpha: 1, duration: 0.7 }, 1.35)
            .to("[data-s='visitor']", { z: 50 * d, duration: 0.7 }, 1.35)
            .to("[data-inwin='answer']", { autoAlpha: 1, y: 0, duration: 0.3 }, 1.9);
          // 03 — the lead is pulled out of the conversation.
          tl.to("[data-s='lead']", { z: 170 * d, x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.8 }, 2.05)
            .to("[data-fit]", { scaleX: 1, duration: 0.6, ease: "power1.out" }, 2.4)
            .to("[data-s='answer']", { z: 100 * d, duration: 0.8 }, 2.05);
          // 04 — it is filed in the calendar.
          tl.to("[data-s='cal']", { y: 0, z: 170 * d, autoAlpha: 1, duration: 0.8 }, 3.0)
            .to("[data-slot]", { scaleX: 1, duration: 0.45, ease: "power1.out" }, 3.45)
            .to("[data-booked]", { autoAlpha: 1, duration: 0.2 }, 3.75)
            .to("[data-s='lead']", { z: 120 * d, duration: 0.8 }, 3.0);
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="pipeline" ref={root} className="relative overflow-x-clip">
      <div ref={pin} className="relative flex min-h-[100svh] items-center">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-4 px-6 py-10 md:gap-8 md:py-16 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]">
          <div>
            <span className="bp-ref text-violet">S/03 / one enquiry, end to end</span>
            <h2 className="text-ink mt-4 text-2xl font-semibold sm:text-3xl tracking-[-0.035em] text-balance md:text-4xl lg:text-[44px] lg:leading-[1.06]">
              What happens to a message at 23:40.
            </h2>
            <ol className="mt-5 flex flex-col gap-1 md:mt-8">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  // Phones show only the active step, so the scene stays in view.
                  className={`border-l-2 py-3 pl-5 transition-colors duration-300 ${
                    i === active ? "border-[#F5C518]" : "border-border-line hidden md:block"
                  }`}
                >
                  <span className={`font-mono text-[11px] tracking-[0.12em] ${i <= active ? "text-violet" : "text-ink-mute"}`}>
                    {s.n}
                  </span>
                  <p className={`mt-1 font-semibold transition-colors duration-300 ${i === active ? "text-ink" : "text-ink-mute"}`}>
                    {s.t}
                  </p>
                  <p
                    className={`text-ink-dim mt-1 max-w-[38ch] text-[15px] leading-[1.5] transition-[opacity] duration-300 ${
                      i === active ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden className="relative h-[400px] [perspective:2400px] sm:h-[560px]">
            <div data-s-stage className="absolute inset-0 [transform-style:preserve-3d]">
              <div className="absolute top-[6%] left-[4%] h-[92%] w-[92%] rounded-[28px] bg-[radial-gradient(closest-side,rgba(245,197,24,0.45),rgba(245,197,24,0.1)_55%,transparent)] [transform:translateZ(-300px)]" />
              <div className="absolute top-[12%] left-[20%] h-[72%] w-[58%]">
                <ChatWindow copy={copy}>
                  <p
                    data-inwin="visitor"
                    className="bg-surface-hi text-ink max-w-[80%] self-start rounded-[12px] rounded-bl-[4px] px-3 py-2"
                  >
                    {copy.visitor}
                  </p>
                  <div data-s="typing" className="self-end">
                    <TypingDots />
                  </div>
                  <p
                    data-inwin="answer"
                    className="max-w-[80%] self-end rounded-[12px] rounded-br-[4px] border border-[#141412] bg-[#F5C518] px-3 py-2 text-[#141412]"
                  >
                    {copy.answer}
                  </p>
                </ChatWindow>
              </div>
              <div data-s="visitor" className="absolute top-[4%] left-[0%] w-[58%] max-w-[340px]">
                <VisitorBubble copy={copy} />
              </div>
              <div data-s="answer" className="absolute top-[36%] right-[0%] w-[60%] max-w-[350px]">
                <AnswerBubble copy={copy} />
              </div>
              <div data-s="lead" className="absolute bottom-[4%] left-[2%] w-[46%] max-w-[270px]">
                <LeadCard copy={copy} />
              </div>
              <div data-s="cal" className="absolute right-[2%] bottom-[0%] w-[48%] max-w-[290px]">
                <CalendarCard copy={copy} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
