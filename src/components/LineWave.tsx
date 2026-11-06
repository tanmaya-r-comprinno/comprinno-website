"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: the particle wave redrawn as thin lines. Each row is one
 * hairline that rolls like a slow wave toward the viewer; nearer rows are
 * wavier and a touch darker.
 *
 * Performance: one canvas, ~30 fps, pauses when off screen or the tab is hidden.
 * Reduced-motion users get a single still frame.
 */
const ROWS = 28;

export default function LineWave() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = getComputedStyle(document.documentElement);
    const dot = root.getPropertyValue("--color-line-strong").trim() || "#c9d3de";
    const accent = root.getPropertyValue("--color-accent").trim() || "#8aa0b8";

    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let t = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // Fake perspective: rows of dots that get bigger, wider apart and wavier
    // toward the bottom, so the field reads as a surface rolling toward you.
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let j = 0; j < ROWS; j++) {
        const p = j / (ROWS - 1); // 0 = far (top), 1 = near (bottom)
        const base = h * (0.3 + 0.7 * Math.pow(p, 1.35));
        const amp = 6 + 38 * p;
        ctx.globalAlpha = 0.2 + 0.55 * p;
        ctx.lineWidth = 0.5 + 0.6 * p; // hairlines, slightly thicker when near
        ctx.strokeStyle = j % 6 === 3 ? accent : dot; // a few accent lines
        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += 8) {
          const u = x / w;
          const y = base + Math.sin(u * 6.2 + t * 1.2 + j * 0.35) * amp * 0.6 + Math.sin(u * 13 + t * 0.7 - j * 0.2) * amp * 0.25;
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 33) return; // ~30 fps cap
      last = now;
      t += 0.022;
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
