"use client";

import { useEffect, useRef } from "react";

/**
 * About hero: a slowly swaying globe drawn as dots, faint latitude/longitude lines and two
 * orbit rings, with our four locations (Bengaluru, Pune, UK, US) all linked by glowing arcs
 * and a light travelling along each arc.
 * Light theme: brand blues on white, yellow for the travelling lights.
 *
 * Performance: one canvas, ~30 fps, pauses off screen and in hidden tabs.
 * Reduced-motion users get a single still frame with India facing the viewer.
 */
type City = { name: string; lat: number; lon: number; home?: boolean };
const CITIES: City[] = [
  { name: "Bengaluru", lat: 12.97, lon: 77.59, home: true },
  { name: "Pune", lat: 18.52, lon: 73.86, home: true },
  { name: "UK", lat: 52.5, lon: -1.5 },
  { name: "US", lat: 39.5, lon: -98.0 },
];
// every office linked to every other
const ARCS: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];

const rad = (d: number) => (d * Math.PI) / 180;
type V = [number, number, number];
const fromLatLon = (lat: number, lon: number): V => [Math.cos(rad(lat)) * Math.sin(rad(lon)), Math.sin(rad(lat)), Math.cos(rad(lat)) * Math.cos(rad(lon))];

// even spread of points over the sphere
const DOTS: V[] = (() => {
  const n = 2600;
  const out: V[] = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    out.push([Math.cos(g * i) * r, y, Math.sin(g * i) * r]);
  }
  return out;
})();

// orbit rings: radius (globe = 1), tilt of the ring plane, speed in rad/s
type Orbit = { r: number; incl: number; node: number; speed: number };
const ORBITS: Orbit[] = [
  { r: 1.22, incl: 1.15, node: 0.5, speed: 0.22 },
  { r: 1.36, incl: 1.35, node: -0.9, speed: -0.14 },
];
const orbitPoint = (o: Orbit, a: number): V => {
  const x = Math.cos(a) * o.r;
  const z0 = Math.sin(a) * o.r;
  const y = -z0 * Math.sin(o.incl);
  const z = z0 * Math.cos(o.incl);
  return [x * Math.cos(o.node) - z * Math.sin(o.node), y, x * Math.sin(o.node) + z * Math.cos(o.node)];
};

/** great-circle path from a to b, lifted off the surface in the middle */
function arcPoints(a: V, b: V, steps = 48): V[] {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const w = Math.acos(dot);
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const s1 = Math.sin((1 - t) * w) / Math.sin(w);
    const s2 = Math.sin(t * w) / Math.sin(w);
    const lift = 1 + 0.22 * Math.sin(Math.PI * t) * (w / Math.PI + 0.4);
    return [(a[0] * s1 + b[0] * s2) * lift, (a[1] * s1 + b[1] * s2) * lift, (a[2] * s1 + b[2] * s2) * lift];
  });
}

export default function DotGlobe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cities = CITIES.map((c) => fromLatLon(c.lat, c.lon));
    const arcs = ARCS.map(([a, b]) => arcPoints(cities[a], cities[b]));
    const tilt = rad(22); // north tipped towards us, so India and Europe face the viewer

    let size = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // rotate about the vertical axis, then tilt towards the viewer; returns screen x, y and depth
    const project = (p: V, spin: number) => {
      const x1 = p[0] * Math.cos(spin) + p[2] * Math.sin(spin);
      const z1 = -p[0] * Math.sin(spin) + p[2] * Math.cos(spin);
      const y2 = p[1] * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = p[1] * Math.sin(tilt) + z1 * Math.cos(tilt);
      const r = size * 0.34;
      return { x: size / 2 + x1 * r, y: size / 2 - y2 * r, z: z2 };
    };

    const start = rad(-58); // India just right of centre, London in view to the upper left
    const draw = (ms: number) => {
      const spin = start + (reduce ? 0 : Math.sin((ms / 1000) * 0.12) * 0.5); // slow sway, India always in view
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const r = size * 0.34;

      // soft body and rim
      const body = ctx.createRadialGradient(size / 2 - r * 0.35, size / 2 - r * 0.4, r * 0.1, size / 2, size / 2, r);
      body.addColorStop(0, "rgba(255,255,255,0.95)");
      body.addColorStop(1, "rgba(227,240,252,0.9)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,107,201,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // faint latitude / longitude lines, front half only
      const line = (pts: V[]) => {
        ctx.beginPath();
        let on = false;
        for (const q of pts) {
          const p = project(q, spin);
          if (p.z < 0) { on = false; continue; }
          if (on) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y);
          on = true;
        }
        ctx.stroke();
      };
      ctx.strokeStyle = "rgba(0,107,201,0.09)";
      ctx.lineWidth = 0.8;
      for (let lat = -60; lat <= 60; lat += 30) line(Array.from({ length: 73 }, (_, i) => fromLatLon(lat, i * 5)));
      for (let lon = 0; lon < 360; lon += 30) line(Array.from({ length: 37 }, (_, i) => fromLatLon(-90 + i * 5, lon)));

      // dots: front ones darker and larger
      for (const d of DOTS) {
        const p = project(d, spin);
        if (p.z < -0.05) continue;
        ctx.fillStyle = `rgba(0,107,201,${(0.12 + p.z * 0.5).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.6 + p.z * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // two orbit rings around the globe, each with nodes riding along
      ORBITS.forEach((o, k) => {
        const ring = Array.from({ length: 97 }, (_, i) => orbitPoint(o, (i / 96) * Math.PI * 2));
        for (let i = 1; i < ring.length; i++) {
          const a = project(ring[i - 1], spin);
          const b = project(ring[i], spin);
          ctx.strokeStyle = `rgba(0,107,201,${a.z < 0 ? 0.08 : 0.22})`;
          ctx.lineWidth = 1;
          ctx.setLineDash(k ? [3, 5] : []);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        for (let j = 0; j < 3; j++) {
          const p = project(orbitPoint(o, (reduce ? 0 : ms / 1000) * o.speed + (j * Math.PI * 2) / 3), spin);
          ctx.fillStyle = p.z < 0 ? "rgba(0,136,255,0.25)" : j === 0 ? "#0088ff" : "#ffffff";
          ctx.strokeStyle = "rgba(0,107,201,0.6)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.z < 0 ? 2 : 3.2, 0, Math.PI * 2);
          ctx.fill();
          if (p.z >= 0) ctx.stroke();
        }
      });

      // arcs with a travelling light
      arcs.forEach((pts, k) => {
        const sp = pts.map((q) => project(q, spin));
        for (let i = 1; i < sp.length; i++) {
          const a = sp[i - 1];
          const b = sp[i];
          const vis = Math.min(a.z, b.z);
          if (vis < -0.35) continue;
          ctx.strokeStyle = `rgba(0,136,255,${(0.25 + Math.max(0, vis) * 0.55).toFixed(3)})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        const t = reduce ? 0.6 : ((ms / 1000 + k * 0.9) % 3.6) / 3.6;
        const p = sp[Math.round(t * (sp.length - 1))];
        if (p.z > -0.2) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 10);
          glow.addColorStop(0, "rgba(255,187,0,0.9)");
          glow.addColorStop(1, "rgba(255,187,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffbb00";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // cities: India marked stronger; labels only when facing us
      ctx.font = "600 11px ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
      CITIES.forEach((c, i) => {
        const p = project(cities[i], spin);
        if (p.z < 0.05) return;
        ctx.globalAlpha = Math.min(1, p.z * 2.5);
        const pulse = reduce ? 0.5 : ((ms / 1000 + i * 0.7) % 2.4) / 2.4;
        ctx.strokeStyle = `rgba(0,136,255,${(0.5 * (1 - pulse)).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6 + pulse * 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = c.home ? "rgba(0,107,201,0.18)" : "rgba(0,136,255,0.14)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, c.home ? 9 : 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = c.home ? "#006bc9" : "#0088ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, c.home ? 3.6 : 3, 0, Math.PI * 2);
        ctx.fill();
        if (p.z > 0.25) {
          ctx.fillStyle = "#0a134b";
          ctx.fillText(c.name, p.x + 10, p.y + (c.name === "Pune" ? -6 : 8));
        }
        ctx.globalAlpha = 1;
      });
    };

    let raf = 0;
    let last = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const loop = (ms: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || ms - last < 33) return;
      last = ms;
      draw(ms);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={`block aspect-square w-full ${className}`} aria-hidden="true" />;
}
