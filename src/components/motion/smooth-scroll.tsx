"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * One clock for scroll and motion. Lenis smooths the scroll, GSAP's ticker
 * drives Lenis, and ScrollTrigger updates on every Lenis frame — so a
 * scroll-scrubbed timeline is always exactly where the scroll is, in both
 * directions, and nothing lags, skips or fights a second easing loop.
 * (Three separate loops fighting each other is what made the earlier 3D
 * backdrop stutter.)
 *
 * Mounted by the pages that use scroll scenes. Reduced motion keeps native
 * scrolling; ScrollTrigger still works with it.
 */
gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
