"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/Icon";

/**
 * About hero: life at Comprinno wrapped smoothly onto a glossy, turning ball.
 *
 * Each photo appears once, alternating with blue data tiles, laid out like a world map
 * (three bands of eight rounded tiles between 60°N and 60°S). The poles are soft pale discs. Everything is painted once into offscreen maps,
 * then each frame every pixel of the ball looks up its spot (the tilt is fixed, so the
 * lookup is precomputed and the spin is just an offset), and gets lighting: soft shade,
 * a glossy highlight and a blue rim.
 *
 * Hover (or tap) a tile: the ball pauses, the tile lights up with a yellow edge, and a card
 * (288px, never full width) slides in beside that tile. It stays while the pointer is on the
 * ball, gliding from tile to tile, and closes when the pointer leaves the ball.
 * ~30 fps, paused off screen / in hidden tabs; still for reduced-motion users.
 */
type Photo = { kind: "photo"; src: string; caption: string };
type Fact = { kind: "fact"; value: string; label: string; tag: string; desc: string; icon: IconName; tone: 0 | 1 | 2 };
type Item = Photo | Fact;

const PHOTOS: Photo[] = [
  { kind: "photo", src: "/careers/life-team-huddle.webp", caption: "Team huddle" },
  { kind: "photo", src: "/careers/life-office-floor.webp", caption: "On the office floor" },
  { kind: "photo", src: "/careers/life-knowledge-session.webp", caption: "Knowledge session" },
  { kind: "photo", src: "/careers/life-festive-day.webp", caption: "Festive day" },
  { kind: "photo", src: "/careers/life-town-hall.webp", caption: "Town hall" },
  { kind: "photo", src: "/careers/life-cricket-team.webp", caption: "The cricket team" },
  { kind: "photo", src: "/careers/life-team-selfie.webp", caption: "Team selfie" },
  { kind: "photo", src: "/careers/life-leadership-talk.webp", caption: "Leadership talk" },
  { kind: "photo", src: "/careers/life-cafeteria-meetup.webp", caption: "Cafeteria meetup" },
  { kind: "photo", src: "/careers/life-welcome-cake.webp", caption: "Welcome cake" },
  { kind: "photo", src: "/careers/life-drum-circle.webp", caption: "Drum circle" },
  { kind: "photo", src: "/careers/life-movie-outing.webp", caption: "Movie outing" },
];

// data tiles: only facts the site already states
const FACTS: Fact[] = [
  { kind: "fact", value: "2013", label: "Founded in Bengaluru", tag: "Company", desc: "Over a decade of cloud and AI delivery for teams around the world.", icon: "rocket", tone: 0 },
  { kind: "fact", value: "Tevico", label: "AI for cloud operations", tag: "Platform", desc: "Our own platform for running, governing and securing cloud estates.", icon: "eye", tone: 2 },
  { kind: "fact", value: "4", label: "Locations", tag: "Company", desc: "Offices in Bengaluru and Pune, with a presence in the US and UK.", icon: "pin", tone: 1 },
  { kind: "fact", value: "Migrate", label: "Move to the cloud", tag: "Service", desc: "Plan and move workloads to the cloud with minimal disruption.", icon: "migrate", tone: 0 },
  { kind: "fact", value: "VeriQ", label: "Security questionnaires", tag: "Accelerator", desc: "Evidence-backed answers to customer security questionnaires, with human review.", icon: "check", tone: 2 },
  { kind: "fact", value: "Cloud + AI", label: "What we build", tag: "Focus", desc: "Migrate, modernize, run and secure your cloud, and put AI into production.", icon: "cloud", tone: 1 },
  { kind: "fact", value: "Modernize", label: "Cloud-native", tag: "Service", desc: "Rebuild applications and data platforms for cloud-native scale.", icon: "layers", tone: 0 },
  { kind: "fact", value: "VoxSphere", label: "Voice agents", tag: "Accelerator", desc: "Voice agents for customer conversations, with human handoff when needed.", icon: "phone", tone: 2 },
  { kind: "fact", value: "6", label: "Values we live by", tag: "Culture", desc: "Competent, professional, innovative, trustworthy, grateful and purposeful.", icon: "heart", tone: 1 },
  { kind: "fact", value: "Secure", label: "Security and compliance", tag: "Service", desc: "Security and compliance built into every layer of your cloud.", icon: "shield", tone: 0 },
  { kind: "fact", value: "Weave", label: "Agentic workflows", tag: "Accelerator", desc: "Agentic workflows for document-heavy finance and procurement processes.", icon: "loop", tone: 2 },
  { kind: "fact", value: "Fintech", label: "Industries we serve", tag: "Industries", desc: "Fintech, healthcare, SaaS and enterprise teams around the world.", icon: "bank", tone: 1 },
];
const TONES = [["#1f9bff", "#006bc9"], ["#3a4fb8", "#0a134b"], ["#38b0ff", "#0059a8"]];

// three bands of eight, photos and data tiles alternating like a chessboard
const COLS = 8;
const BANDS = [60, 20, -20, -60]; // band edges, degrees latitude
const GRID: Item[] = Array.from({ length: 3 * COLS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const k = row * (COLS / 2) + Math.floor(col / 2);
  return (row + col) % 2 === 0 ? PHOTOS[k] : FACTS[k];
});

const W = 2048; // tile map (equirectangular)
const H = 1024;
const CAP = 512; // pole disc maps
const CAP_LAT = 60;
const TILT = (16 * Math.PI) / 180;
const SCALE = 0.4; // ball radius / box size
const latToY = (lat: number) => ((90 - lat) / 180) * H;

function font(ctx: CanvasRenderingContext2D, text: string, weight: number, start: number, max: number) {
  let size = start;
  do {
    ctx.font = `${weight} ${size}px Inter, ui-sans-serif, system-ui, sans-serif`;
    if (ctx.measureText(text).width <= max) break;
    size -= 2;
  } while (size > 10);
}

/** the tile map: rounded tiles on a pale ground, photos cropped to how they look once wrapped */
function paintTiles(imgs: (HTMLImageElement | null)[]) {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#eaf4fe";
  ctx.fillRect(0, 0, W, H);
  const tw = W / COLS;
  const gap = 10;
  GRID.forEach((it, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const top = latToY(BANDS[row]) + gap / 2;
    const h = latToY(BANDS[row + 1]) - latToY(BANDS[row]) - gap;
    const x = col * tw + gap / 2;
    const w = tw - gap;
    const squash = Math.cos((((BANDS[row] + BANDS[row + 1]) / 2) * Math.PI) / 180);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, top, w, h, 22);
    ctx.clip();
    if (it.kind === "photo") {
      const img = imgs[PHOTOS.indexOf(it)];
      if (img && img.naturalWidth) {
        const shown = (w * squash) / h;
        let sw = img.naturalWidth;
        let sh = img.naturalHeight;
        if (sw / sh > shown) sw = sh * shown;
        else sh = sw / shown;
        ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, x, top, w, h);
      }
    } else {
      const [a, b] = TONES[it.tone];
      const g = ctx.createLinearGradient(x, top, x + w, top + h);
      g.addColorStop(0, a);
      g.addColorStop(1, b);
      ctx.fillStyle = g;
      ctx.fillRect(x, top, w, h);
      // faint grid texture
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      for (let gx = x; gx < x + w; gx += 26) { ctx.beginPath(); ctx.moveTo(gx, top); ctx.lineTo(gx, top + h); ctx.stroke(); }
      for (let gy = top; gy < top + h; gy += 26) { ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); ctx.stroke(); }
      // text pre-stretched so it reads normally once wrapped
      ctx.translate(x, top);
      ctx.scale(1 / squash, 1);
      const sw = w * squash;
      const pad = sw * 0.13;
      ctx.fillStyle = "#fff";
      font(ctx, it.value, 700, 58, sw - pad * 2);
      ctx.fillText(it.value, pad, h * 0.5);
      ctx.globalAlpha = 0.8;
      font(ctx, it.label, 500, 22, sw - pad * 2);
      ctx.fillText(it.label, pad, h * 0.5 + 34);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffbb00";
      ctx.fillRect(pad, h * 0.22, 34, 6);
    }
    ctx.restore();
  });
  return ctx.getImageData(0, 0, W, H).data;
}

/** a pole disc: soft pale gradient with faint rings */
function paintCap() {
  const c = document.createElement("canvas");
  c.width = CAP;
  c.height = CAP;
  const ctx = c.getContext("2d")!;
  const m = CAP / 2;
  const g = ctx.createRadialGradient(m, m, 0, m, m, m);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.6, "#eef6fe");
  g.addColorStop(1, "#cfe5fa");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, CAP, CAP);
  ctx.strokeStyle = "rgba(0,107,201,0.1)";
  ctx.lineWidth = 2;
  for (let r = 70; r < m; r += 34) { ctx.beginPath(); ctx.arc(m, m, r, 0, Math.PI * 2); ctx.stroke(); }
  ctx.fillStyle = "rgba(0,107,201,0.18)";
  for (let k = 0; k < 48; k++) {
    const a = (k / 48) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(m + Math.cos(a) * (m - 30), m + Math.sin(a) * (m - 30), 3, 0, Math.PI * 2);
    ctx.fill();
  }
  return ctx.getImageData(0, 0, CAP, CAP).data;
}

/** which tile a map position falls in, or -1 on a pole */
function tileAt(u: number, lat: number) {
  if (lat > BANDS[0] || lat < BANDS[3]) return -1;
  const row = lat > BANDS[1] ? 0 : lat > BANDS[2] ? 1 : 2;
  return row * COLS + Math.min(COLS - 1, Math.floor(u / (W / COLS)));
}

const toGlobe = (x: number, y: number) => {
  const z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
  const gy = y * Math.cos(TILT) + z * Math.sin(TILT);
  const gz = -y * Math.sin(TILT) + z * Math.cos(TILT);
  return { z, lat: (Math.asin(Math.max(-1, Math.min(1, gy))) * 180) / Math.PI, lon: Math.atan2(x, gz) };
};

export default function PhotoSphere() {
  const wrap = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const paused = useRef(false);
  const activeRef = useRef(-1);
  const angle = useRef(0.25);
  const lookup = useRef<{ N: number; idx: Int32Array; lon: Float32Array; lat: Float32Array; shade: Float32Array; spec: Float32Array; rim: Float32Array; alpha: Uint8Array } | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [card, setCard] = useState<{ left: number; top: number; side: "l" | "r" } | null>(null);

  useEffect(() => {
    const el = wrap.current;
    const canvas = cvs.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tiles: Uint8ClampedArray | null = null;
    let capTop: Uint8ClampedArray | null = null;
    let capBot: Uint8ClampedArray | null = null;
    let out: ImageData | null = null;

    const build = () => {
      const N = Math.min(840, Math.round(el.clientWidth * Math.min(window.devicePixelRatio || 1, 2)));
      if (!N) return;
      canvas.width = N;
      canvas.height = N;
      const R = N * SCALE;
      const c = N / 2;
      const a = { idx: [] as number[], lon: [] as number[], lat: [] as number[], shade: [] as number[], spec: [] as number[], rim: [] as number[], alpha: [] as number[] };
      // light from the upper left, viewer straight on
      const L = [-0.42, 0.55, 0.72];
      const Hn = Math.hypot(L[0], L[1], L[2] + 1);
      const Hv = [L[0] / Hn, L[1] / Hn, (L[2] + 1) / Hn];
      for (let py = 0; py < N; py++) {
        for (let px = 0; px < N; px++) {
          let x = (px + 0.5 - c) / R;
          let y = (c - py - 0.5) / R;
          const d = Math.hypot(x, y);
          if (d > 1 + 1 / R) continue;
          const cov = d > 1 ? Math.max(0, 1 - (d - 1) * R) : 1; // anti-aliased rim
          if (d > 1) { x /= d; y /= d; }
          const g = toGlobe(x, y);
          const z = g.z;
          a.idx.push((py * N + px) * 4);
          a.lon.push(g.lon);
          a.lat.push(g.lat);
          const lam = Math.max(0, L[0] * x + L[1] * y + L[2] * z);
          a.shade.push(0.68 + 0.38 * lam);
          a.spec.push(Math.pow(Math.max(0, Hv[0] * x + Hv[1] * y + Hv[2] * z), 60) * 0.55);
          a.rim.push(Math.pow(1 - z, 3) * 0.75);
          a.alpha.push(Math.round(255 * cov));
        }
      }
      lookup.current = { N, idx: Int32Array.from(a.idx), lon: Float32Array.from(a.lon), lat: Float32Array.from(a.lat), shade: Float32Array.from(a.shade), spec: Float32Array.from(a.spec), rim: Float32Array.from(a.rim), alpha: Uint8Array.from(a.alpha) };
      out = ctx.createImageData(N, N);
    };

    const render = () => {
      const T = lookup.current;
      if (!T || !tiles || !capTop || !capBot || !out) return;
      const o = out.data;
      const spin = angle.current;
      const act = activeRef.current;
      const tw = W / COLS;
      for (let i = 0; i < T.idx.length; i++) {
        const lat = T.lat[i];
        const lon = T.lon[i] + spin;
        let r: number, g: number, b: number;
        let lit = 1;
        if (lat > CAP_LAT || lat < -CAP_LAT) {
          // pole disc: polar coordinates around the pole, turning with the ball
          const top = lat > 0;
          const rr = ((90 - Math.abs(lat)) / (90 - CAP_LAT)) * (CAP / 2 - 1);
          const ang = top ? -lon : lon;
          const cx = Math.round(CAP / 2 + Math.cos(ang) * rr);
          const cy = Math.round(CAP / 2 + Math.sin(ang) * rr);
          const src = top ? capTop : capBot;
          const t = (cy * CAP + cx) * 4;
          r = src[t]; g = src[t + 1]; b = src[t + 2];
        } else {
          const u = ((((lon / (2 * Math.PI)) % 1) + 2) % 1) * W | 0;
          const v = Math.min(H - 1, latToY(lat) | 0);
          const t = (v * W + u) * 4;
          r = tiles[t]; g = tiles[t + 1]; b = tiles[t + 2];
          if (act >= 0 && tileAt(u, lat) === act) {
            lit = 1.12;
            const row = Math.floor(act / COLS);
            const ux = u % tw;
            const edge = Math.min(lat - BANDS[row + 1], BANDS[row] - lat) < 1.5 || ux < 12 || ux > tw - 12;
            if (edge) { r = 255; g = 187; b = 0; lit = 1; }
          }
        }
        const s = T.shade[i] * lit;
        const sp = T.spec[i] * 255;
        const rim = T.rim[i];
        const p = T.idx[i];
        // shade, add gloss, then tint the rim towards light brand blue
        o[p] = (r * s + sp) * (1 - rim) + 150 * rim;
        o[p + 1] = (g * s + sp) * (1 - rim) + 205 * rim;
        o[p + 2] = (b * s + sp) * (1 - rim) + 255 * rim;
        o[p + 3] = T.alpha[i];
      }
      ctx.putImageData(out, 0, 0);
    };

    let alive = true;
    Promise.all(PHOTOS.map((p) => new Promise<HTMLImageElement | null>((res) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = () => res(null);
      img.src = p.src;
    }))).then((imgs) => {
      if (!alive) return;
      tiles = paintTiles(imgs);
      capTop = paintCap();
      capBot = capTop;
      render();
    });

    build();
    const ro = new ResizeObserver(() => { build(); render(); });
    ro.observe(el);
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    let raf = 0;
    let last = 0;
    const loop = (ms: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || ms - last < 33) return;
      const dt = last ? (ms - last) / 1000 : 0;
      last = ms;
      if (!paused.current) angle.current += dt * 0.17;
      render();
    };
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  /** what is under a pointer: -2 off the ball, -1 on a pole, else the tile index */
  const hit = (clientX: number, clientY: number) => {
    const el = wrap.current;
    if (!el) return -2;
    const box = el.getBoundingClientRect();
    const R = box.width * SCALE;
    const x = (clientX - box.left - box.width / 2) / R;
    const y = (box.height / 2 - (clientY - box.top)) / R;
    if (x * x + y * y > 1) return -2;
    const g = toGlobe(x, y);
    const lon = g.lon + angle.current;
    const u = ((((lon / (2 * Math.PI)) % 1) + 2) % 1) * W;
    return tileAt(u, g.lat);
  };

  /** screen position of a tile's centre (px inside the box) */
  const tileCentre = (i: number) => {
    const el = wrap.current!;
    const size = el.clientWidth;
    const R = size * SCALE;
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const lat = (((BANDS[row] + BANDS[row + 1]) / 2) * Math.PI) / 180;
    const lon = ((col + 0.5) / COLS) * 2 * Math.PI - angle.current;
    const gx = Math.cos(lat) * Math.sin(lon);
    const gy = Math.sin(lat);
    const gz = Math.cos(lat) * Math.cos(lon);
    const y = gy * Math.cos(TILT) - gz * Math.sin(TILT);
    return { x: size / 2 + gx * R, y: size / 2 - y * R, size };
  };

  const point = (clientX: number, clientY: number) => {
    const i = hit(clientX, clientY);
    if (i === -2) return close();
    if (i === -1 || i === activeRef.current) return; // on a pole or same tile: keep the card
    paused.current = true;
    activeRef.current = i;
    const { x, y, size } = tileCentre(i);
    const w = 288;
    const h = GRID[i].kind === "photo" ? 270 : 250;
    // beside the tile, on the outside of the ball, so the tile stays visible
    const side = x < size / 2 ? "l" : "r";
    const left = side === "l" ? Math.max(x - w - 40, -48) : Math.min(x + 40, size - w + 48);
    const top = Math.min(Math.max(y - h / 2, -16), size - h + 16);
    setActive(i);
    setCard({ left, top, side });
  };
  const close = () => {
    paused.current = false;
    activeRef.current = -1;
    setActive(null);
    setCard(null);
  };

  const item = active !== null ? GRID[active] : null;

  return (
    <div
      ref={wrap}
      className="photo-sphere relative aspect-square w-full"
      onPointerMove={(e) => e.pointerType === "mouse" && point(e.clientX, e.clientY)}
      onPointerLeave={(e) => e.pointerType === "mouse" && close()}
      onClick={(e) => { const i = hit(e.clientX, e.clientY); if (i === activeRef.current || i === -2) close(); else point(e.clientX, e.clientY); }}
    >
      {/* halo, orbit rings and floor glow behind the ball */}
      <div className="ps-halo absolute inset-[6%] rounded-full" aria-hidden="true" />
      <div className="ps-floor absolute bottom-[1%] left-1/2 h-[7%] w-[56%] -translate-x-1/2" aria-hidden="true" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="49" ry="13" fill="none" stroke="#006bc9" strokeOpacity=".22" strokeWidth=".3" transform="rotate(-14 50 50)" />
        <ellipse cx="50" cy="50" rx="46" ry="19" fill="none" stroke="#006bc9" strokeOpacity=".14" strokeWidth=".25" strokeDasharray="1 1.6" transform="rotate(20 50 50)" />
        <circle r="1.1" fill="#ffbb00" className="ps-orbit-dot" />
      </svg>
      <canvas ref={cvs} className={`relative block h-full w-full ${active !== null ? "cursor-pointer" : ""}`} role="img" aria-label="Life at Comprinno: team photos and facts wrapped on a turning globe" />

      <ul className="sr-only">
        {GRID.map((it, i) => <li key={i}>{it.kind === "photo" ? it.caption : `${it.value}, ${it.label}: ${it.desc}`}</li>)}
      </ul>

      {/* the pop-out card: slides between tiles */}
      {item && card && (
        <div className="ps-card pointer-events-none absolute z-[200] w-72" style={{ left: card.left, top: card.top }} role="status">
          {item.kind === "photo" ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={item.src} src={item.src} alt="" className="ps-card-img aspect-[4/3] w-full object-cover" />
              <div className="flex items-center justify-between px-4 py-3">
                <p className="text-base font-semibold text-ink">{item.caption}</p>
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">Life at Comprinno</span>
              </div>
            </>
          ) : (
            <>
              <div className="ps-fact-head relative overflow-hidden p-5 text-white" style={{ background: `linear-gradient(140deg, ${TONES[item.tone][0]}, ${TONES[item.tone][1]})` }}>
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center border border-white/30 bg-white/10"><Icon name={item.icon} className="h-5 w-5" /></span>
                  <span className="border border-white/30 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest">{item.tag}</span>
                </div>
                <p className="mt-6 text-[2.6rem] font-semibold leading-none tracking-tight">{item.value}</p>
                <p className="mt-2 text-sm text-white/85">{item.label}</p>
              </div>
              <p className="px-5 py-4 text-sm leading-relaxed text-ink-2">{item.desc}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
