"use client";

import { useEffect } from "react";

/**
 * One tiny global listener (not one per card): writes the pointer position
 * into CSS variables on the hovered .card so the CSS spotlight can follow it.
 * Skipped entirely on touch devices and for reduced-motion users.
 */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // SVG-native animations ignore CSS media queries, so freeze them here.
      document.querySelectorAll("svg").forEach((s) => s.pauseAnimations());
      return;
    }
    if (!window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const card = (e.target as Element | null)?.closest<HTMLElement>(".card");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
