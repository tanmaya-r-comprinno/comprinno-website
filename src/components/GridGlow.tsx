"use client";

import { useEffect, useRef, useState } from "react";

const CELL = 72; // must match .hero-grid background-size in motion.css
const STEP = 2600; // ms between blinks

/**
 * Hero background after comprinno.net's hero video: a faint square grid with a
 * dot on every corner (pure CSS on the parent), and one corner at a time lighting
 * up with a soft glow before fading, then another somewhere else.
 *
 * ~1 KB of JS instead of a ~200 KB video. Pauses when off screen or the tab is
 * hidden; reduced-motion users just see the static grid.
 */
export default function GridGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<{ x: number; y: number; k: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    let k = 0;
    let last = { c: -1, r: -1 };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    // grid offset so lines end cleanly: centred horizontally, a full row at the bottom
    const grid = el.parentElement as HTMLElement | null;
    let off = { x: 0, y: 0 };
    const align = () => {
      if (!grid) return;
      const { width, height } = grid.getBoundingClientRect();
      off = { x: (width % CELL) / 2, y: height % CELL };
      grid.style.backgroundPosition = `${off.x - CELL / 2 + 0.5}px ${off.y - CELL / 2 + 0.5}px, ${off.x}px ${off.y}px, ${off.x}px ${off.y}px`;
    };
    align();
    const ro = new ResizeObserver(align);
    if (grid) ro.observe(grid);

    const blink = () => {
      if (!visible || document.hidden) return;
      const { width, height } = el.getBoundingClientRect();
      const cols = Math.max(1, Math.floor(width / CELL));
      const rows = Math.max(1, Math.floor(height / CELL));
      let c = 0;
      let r = 0;
      // pick a new corner that isn't right next to the previous one
      for (let tries = 0; tries < 8; tries++) {
        c = 1 + Math.floor(Math.random() * Math.max(1, cols - 1));
        r = 1 + Math.floor(Math.random() * Math.max(1, rows - 1));
        if (Math.abs(c - last.c) + Math.abs(r - last.r) > 3) break;
      }
      last = { c, r };
      setSpot({ x: off.x + c * CELL, y: off.y + r * CELL, k: ++k });
    };

    blink();
    const t = setInterval(blink, STEP);
    return () => {
      clearInterval(t);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {spot && <span key={spot.k} className="grid-glow" style={{ left: spot.x, top: spot.y }} />}
    </div>
  );
}
