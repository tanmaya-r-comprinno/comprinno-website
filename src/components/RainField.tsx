"use client";

import { useEffect, useRef } from "react";

/**
 * Low-fidelity "falling light" background (after the green-rain reference),
 * redrawn for a light page, with 3D depth: far streaks are short, hair-thin,
 * faint and slow; near ones are longer, thicker, faster and softly blurred,
 * painted back to front over faint static guide lines.
 *
 * Performance: one canvas, ~30 fps, paused off screen / in hidden tabs.
 * Reduced-motion users get one still frame.
 */
type Drop = { x: number; y: number; z: number; len: number; speed: number; alpha: number };

export default function RainField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // read tokens where the canvas sits, so a page theme (e.g. .brand) can recolour it; --rain overrides the drop colour
    const root = getComputedStyle(canvas);
    const head = root.getPropertyValue("--rain").trim() || root.getPropertyValue("--color-accent").trim() || "#8aa0b8";
    // same colour at zero opacity, so the whole tail stays in the drop colour (no grey midpoint)
    const fade = (() => {
      const c = document.createElement("canvas").getContext("2d");
      if (!c) return "rgba(0,0,0,0)";
      c.fillStyle = head;
      const hex = c.fillStyle; // normalised to #rrggbb
      const n = parseInt(hex.slice(1), 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},0)`;
    })();
    const guide = root.getPropertyValue("--color-line").trim() || "#e1e7ee";

    let w = 0;
    let h = 0;
    let drops: Drop[] = [];
    let guides: { x: number; y: number; len: number }[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    // z = depth (0 far .. 1 near). Squaring biases toward far drops, like real depth.
    // Near drops: longer, thicker, faster, a touch stronger. Far: short, hair-thin, slow, faint.
    const spawn = (anywhere: boolean): Drop => {
      const z = Math.pow(Math.random(), 2);
      return {
        x: Math.round(rand(0, w)) + 0.5,
        y: anywhere ? rand(-h * 0.2, h) : rand(-260, -40),
        z,
        len: 30 + 200 * z + rand(0, 40),
        speed: 0.5 + 2.8 * z,
        alpha: 0.05 + 0.5 * z, // depth: far drops faint, near drops clear
      };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(w / 22); // more drops, but most are faint far ones
      drops = Array.from({ length: count }, () => spawn(true)).sort((a, b) => a.z - b.z); // paint far -> near
      guides = Array.from({ length: Math.round(w / 40) }, () => ({ x: Math.round(rand(0, w)) + 0.5, y: rand(0, h * 0.7), len: rand(80, 320) }));
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // faint static guide lines
      ctx.strokeStyle = guide;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      for (const g of guides) {
        ctx.moveTo(g.x, g.y);
        ctx.lineTo(g.x, g.y + g.len);
      }
      ctx.stroke();
      // falling streaks: transparent tail -> bright head
      for (const d of drops) {
        const grad = ctx.createLinearGradient(d.x, d.y - d.len, d.x, d.y);
        grad.addColorStop(0, fade);
        grad.addColorStop(1, head);
        ctx.strokeStyle = grad;
        // near drops get a soft, wide halo first: reads as depth-of-field blur
        if (d.z > 0.55) {
          ctx.globalAlpha = d.alpha * 0.22;
          ctx.lineWidth = 2 + 4 * d.z;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y - d.len);
          ctx.lineTo(d.x, d.y);
          ctx.stroke();
        }
        ctx.globalAlpha = d.alpha;
        ctx.lineWidth = 0.5 + 1.1 * d.z;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - d.len);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
        // tiny bright head on near drops
        if (d.z > 0.7) {
          ctx.globalAlpha = Math.min(1, d.alpha * 1.6);
          ctx.fillStyle = head;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 0.8 + 0.8 * d.z, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 33) return;
      last = now;
      for (let i = 0; i < drops.length; i++) {
        drops[i].y += drops[i].speed;
        if (drops[i].y - drops[i].len > h) drops[i] = spawn(false);
      }
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
