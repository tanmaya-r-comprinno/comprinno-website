"use client";

import { useEffect, useRef } from "react";

/**
 * Server HTML contains the FINAL number (works with no JS, good for SEO).
 * On the client, when scrolled into view, it counts up once.
 * Years like "2013" are left alone.
 */
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\D*)([\d,]+)(.*)$/);
    if (!el || !m) return;
    const [, pre, numStr, suf] = m;
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    if (!numStr.includes(",") && target >= 1900 && target <= 2100) return; // a year
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${pre}${Math.round(target * eased).toLocaleString("en-US")}${suf}`;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
