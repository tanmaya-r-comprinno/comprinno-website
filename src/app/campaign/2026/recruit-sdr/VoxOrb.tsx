"use client";

import { useEffect, useRef } from "react";

export type OrbState = "idle" | "ringing" | "agent" | "you" | "muted";

/**
 * VoxSphere voice orb: a particle sphere whose surface ripples like energy.
 * About 2,600 points on a sphere, pushed in and out by moving waves. The ripple grows while the
 * buyer speaks (simulated) or with your microphone level on your turn (`level` is 0 to 1, read
 * every frame without re-rendering). Colours run violet to orchid from the VoxSphere palette,
 * drawn for a light background. One small canvas, no libraries.
 */
export default function VoxOrb({ level, state, size = 176 }: { level: { current: number }; state: OrbState; size?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const mode = useRef(state);
  useEffect(() => { mode.current = state; }, [state]);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.height = Math.round(size * dpr);
    ctx.scale(dpr, dpr);

    // evenly spread points on a unit sphere (Fibonacci lattice)
    const N = 2600;
    const pts = new Float32Array(N * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      pts[i * 3] = Math.cos(golden * i) * r;
      pts[i * 3 + 1] = y;
      pts[i * 3 + 2] = Math.sin(golden * i) * r;
    }

    const R = size * 0.34;
    const mid = size / 2;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let amp = 0.05, raf = 0;

    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      const m = mode.current;
      // how hard the surface ripples
      const target =
        m === "agent" ? 0.12 + 0.1 * (0.5 + 0.5 * Math.sin(t * 9) * Math.sin(t * 3.7)) :
        m === "you" ? 0.05 + level.current * 0.22 :
        m === "ringing" ? 0.08 + 0.06 * Math.max(0, Math.sin(t * 5)) :
        0.04;
      amp += (target - amp) * 0.12;
      const speed = m === "agent" ? 1.8 : 1;

      ctx.clearRect(0, 0, size, size);
      // soft lavender halo behind the sphere
      const halo = ctx.createRadialGradient(mid, mid, R * 0.4, mid, mid, R * 1.55);
      halo.addColorStop(0, m === "muted" ? "rgba(119,115,143,.14)" : "rgba(108,76,241,.18)");
      halo.addColorStop(0.6, m === "muted" ? "rgba(119,115,143,.05)" : "rgba(217,85,154,.08)");
      halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, size, size);

      const rot = t * 0.35;
      const cr = Math.cos(rot), sr = Math.sin(rot);
      const tilt = 0.35, ct = Math.cos(tilt), st = Math.sin(tilt);
      const ts = t * speed;

      for (let i = 0; i < N; i++) {
        const x = pts[i * 3], y = pts[i * 3 + 1], z = pts[i * 3 + 2];
        // moving waves over the surface: the "energy" ridges
        const d =
          Math.sin(x * 3.1 + ts * 1.3) * Math.cos(y * 3.4 - ts) * Math.sin(z * 2.8 + ts * 0.8) +
          0.55 * Math.sin((x + y) * 5.2 - ts * 1.9) * Math.cos(z * 4.1 + ts * 1.1);
        const r = 1 + amp * d;
        // spin around Y, then tilt towards the viewer
        const rx = (x * cr + z * sr) * r;
        const rz0 = (-x * sr + z * cr) * r;
        const ry = (y * ct - rz0 * st) * r;
        const rz = y * st + rz0 * ct;
        const depth = (rz + 1.2) / 2.4; // 0 back … 1 front
        const p = 1 + rz * 0.12; // slight perspective
        const px = mid + rx * R * p, py = mid + ry * R * p;

        // ridges (pushed outwards) glow brighter and bigger; a thin "filament" where the waves cross;
        // the rim (edge-on to the viewer) glows like the reference clip
        const ridge = Math.max(0, d) * amp * 6;
        const filament = Math.pow(Math.max(0, 1 - Math.abs(Math.sin(x * 6 + y * 4 - z * 5 + ts * 1.2)) * 4), 2) * (0.4 + amp * 4);
        const rim = Math.pow(1 - Math.min(1, Math.abs(rz) / r), 3);
        const alpha = Math.min(1, 0.08 + depth * 0.45 + ridge * 0.5 + filament * 0.5 + rim * 0.55);
        if (m === "muted") {
          ctx.fillStyle = `rgba(119,115,143,${alpha * 0.8})`;
        } else {
          // violet at the top and back, orchid towards the bottom and on the ridges
          const k = Math.min(1, Math.max(0, (ry + 1) / 2 * 0.7 + ridge * 0.6 + rim * 0.3));
          const cR = Math.round(108 + (217 - 108) * k), cG = Math.round(76 + (85 - 76) * k), cB = Math.round(241 + (154 - 241) * k);
          ctx.fillStyle = `rgba(${cR},${cG},${cB},${alpha})`;
        }
        const s = (0.6 + depth * 0.8 + ridge * 0.8 + filament * 0.9 + rim * 0.6) * (size / 176);
        ctx.fillRect(px - s / 2, py - s / 2, s, s);
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [size, level]);

  return <canvas ref={canvas} style={{ width: size, height: size }} aria-hidden="true" />;
}
