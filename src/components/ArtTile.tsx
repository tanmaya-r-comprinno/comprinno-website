/**
 * Image holder for story / outcome cards: a soft pastel tile with a light
 * background texture and one glossy, softly lit object holding an icon.
 * Ten variants (colour + texture + object + icon), picked per story by slug.
 * Pure SVG, so it is light to load and immune to the site's square-corner rule.
 * Motion is slow and small; static for reduced-motion users. viewBox 320 × 180.
 */
import { iconPath, type IconName } from "@/components/Icon";

type Hue = { main: string; light: string; deep: string };
// Brand Guidelines 2026 palette only: Primary Blue, Soft Blue, Dark Purple, Warm Yellow, Yellow Ochre (tints for backgrounds)
const HUES: Record<string, Hue> = {
  primary: { main: "#006bc9", light: "#e3f0fc", deep: "#004f96" },
  soft: { main: "#0088ff", light: "#e5f3ff", deep: "#006bc9" },
  navy: { main: "#2a3a8f", light: "#f4f3ff", deep: "#0a134b" },
  yellow: { main: "#ffbb00", light: "#fff6dc", deep: "#d89f04" },
  ochre: { main: "#d89f04", light: "#fbf1d6", deep: "#a87a00" },
};

type Texture = "beams" | "arcs" | "grid" | "binary" | "halftone" | "waves" | "ripples" | "floor" | "nodes" | "orbit";
type Shape = "orb" | "stack" | "hex" | "pill" | "tile" | "cube";

const VARIANTS: { hue: keyof typeof HUES; texture: Texture; shape: Shape; icon: IconName }[] = [
  { hue: "primary", texture: "beams", shape: "orb", icon: "agent" },
  { hue: "navy", texture: "arcs", shape: "orb", icon: "search" },
  { hue: "soft", texture: "grid", shape: "stack", icon: "chart" },
  { hue: "primary", texture: "binary", shape: "hex", icon: "shield" },
  { hue: "yellow", texture: "halftone", shape: "pill", icon: "cloud" },
  { hue: "soft", texture: "waves", shape: "tile", icon: "migrate" },
  { hue: "ochre", texture: "ripples", shape: "orb", icon: "spark" },
  { hue: "navy", texture: "floor", shape: "cube", icon: "database" },
  { hue: "primary", texture: "nodes", shape: "pill", icon: "users" },
  { hue: "soft", texture: "orbit", shape: "stack", icon: "lock" },
];
export const ART_TILE_COUNT = VARIANTS.length;

/** Stable variant for a slug: varied across stories, same picture every visit */
export const tileFor = (slug: string) => [...slug].reduce((h, ch) => (h * 33 + ch.charCodeAt(0)) >>> 0, 5381) % VARIANTS.length;

const CX = 160;
const CY = 92;
const r = (n: number) => Array.from({ length: n }, (_, i) => i);

function Texture({ t, h, id }: { t: Texture; h: Hue; id: string }) {
  switch (t) {
    case "beams":
      return (
        <>
          {r(9).map((i) => <path key={i} d={`M${CX} ${CY + 10}L${-40 + i * 50} 180`} stroke={h.main} strokeWidth=".6" opacity=".18" />)}
          {[[44, 52, 40], [92, 30, 52], [70, 70, 24], [236, 34, 48], [276, 62, 34], [250, 92, 20], [118, 96, 16]].map(([x, y, len], i) => (
            <g key={i} className="at-twinkle" style={{ animationDelay: `${-i * 0.6}s` }}>
              <path d={`M${x} ${y}V${y + len}`} stroke={`url(#${id}-beam)`} strokeWidth="1.4" />
              <circle cx={x} cy={y} r="5" fill={h.main} opacity=".25" />
              <circle cx={x} cy={y} r="2" fill={h.main} />
            </g>
          ))}
        </>
      );
    case "arcs":
      return (
        <>
          {r(6).map((i) => <circle key={i} cx={CX} cy={CY} r={44 + i * 22} fill="none" stroke={h.main} strokeWidth=".8" opacity={0.3 - i * 0.04} className="at-ripple-soft" style={{ animationDelay: `${-i * 0.5}s` }} />)}
          {r(18).flatMap((i) => r(4).map((j) => <circle key={`${i}-${j}`} cx={20 + i * 16.5} cy={148 + j * 8} r={1.1} fill={h.main} opacity={0.12 + j * 0.08} />))}
        </>
      );
    case "grid":
      return (
        <g mask={`url(#${id}-fade)`}>
          {r(21).map((i) => <path key={`v${i}`} d={`M${i * 16} 0V180`} stroke={h.main} strokeWidth=".6" opacity=".22" />)}
          {r(12).map((i) => <path key={`h${i}`} d={`M0 ${i * 16}H320`} stroke={h.main} strokeWidth=".6" opacity=".22" />)}
        </g>
      );
    case "binary":
      return (
        <g mask={`url(#${id}-fade)`} className="at-drift" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill={h.main} opacity=".35">
          {r(11).map((i) => <text key={i} x={-20 + (i % 2) * 7} y={18 + i * 15} letterSpacing="2">{"0110100110101100101101001101011001011010011011001011010100110".slice(i * 3, i * 3 + 58)}</text>)}
        </g>
      );
    case "halftone":
      return (
        <g mask={`url(#${id}-fade)`}>
          {r(22).flatMap((i) => r(12).map((j) => {
            const d = Math.hypot(i * 15 - CX, j * 15 - CY);
            return <circle key={`${i}-${j}`} cx={i * 15} cy={j * 15} r={Math.max(0.4, 2.6 - d / 55)} fill={h.main} opacity=".3" />;
          }))}
        </g>
      );
    case "waves":
      return (
        <>
          {r(7).map((i) => (
            <path key={i} d={r(33).map((k) => `${k ? "L" : "M"}${k * 10} ${(40 + i * 18 + Math.sin(k * 0.45 + i * 0.7) * 9).toFixed(1)}`).join("")} fill="none" stroke={h.main} strokeWidth=".9" opacity={0.14 + (i % 3) * 0.07} className="at-drift" style={{ animationDelay: `${-i}s` }} />
          ))}
        </>
      );
    case "ripples":
      return (
        <>
          {r(4).map((i) => <circle key={i} cx={CX} cy={CY} r="40" fill="none" stroke={h.main} strokeWidth="1.2" className="at-ripple" style={{ animationDelay: `${i * 1.1}s` }} />)}
          {r(5).map((i) => <circle key={`s${i}`} cx={CX} cy={CY} r={58 + i * 24} fill="none" stroke={h.main} strokeWidth=".6" opacity={0.18 - i * 0.025} strokeDasharray="2 6" />)}
        </>
      );
    case "floor":
      return (
        <>
          {r(15).map((i) => <path key={`c${i}`} d={`M${CX} 96L${-120 + i * 40} 180`} stroke={h.main} strokeWidth=".6" opacity=".22" />)}
          {r(6).map((j) => { const y = 112 + Math.pow(j / 5, 1.7) * 68; return <path key={`r${j}`} d={`M0 ${y.toFixed(1)}H320`} stroke={h.main} strokeWidth=".6" opacity=".22" />; })}
          {[[58, 0], [104, 1.2], [214, 0.6], [262, 2], [140, 2.6], [188, 1.8]].map(([x, d], i) => <circle key={i} cx={x} cy="130" r="1.8" fill={h.main} className="at-rise" style={{ animationDelay: `${-d}s` }} />)}
        </>
      );
    case "nodes": {
      const pts: [number, number][] = [[30, 40], [80, 22], [64, 120], [110, 70], [40, 156], [250, 30], [292, 76], [214, 132], [276, 150], [230, 76]];
      const links: [number, number][] = [[0, 1], [0, 3], [1, 3], [2, 3], [2, 4], [5, 9], [5, 6], [6, 9], [7, 9], [7, 8], [6, 8]];
      return (
        <>
          {links.map(([a, b], i) => <path key={i} d={`M${pts[a][0]} ${pts[a][1]}L${pts[b][0]} ${pts[b][1]}`} stroke={h.main} strokeWidth=".7" opacity=".3" />)}
          {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.6" fill="#fff" stroke={h.main} strokeWidth="1" className="at-twinkle" style={{ animationDelay: `${-i * 0.4}s` }} />)}
        </>
      );
    }
    case "orbit":
      return (
        <g transform={`rotate(-14 ${CX} ${CY})`}>
          {r(3).map((i) => <ellipse key={i} cx={CX} cy={CY} rx={80 + i * 36} ry={26 + i * 12} fill="none" stroke={h.main} strokeWidth=".8" opacity={0.3 - i * 0.07} />)}
          <ellipse cx={CX} cy={CY} rx="116" ry="38" fill="none" stroke={h.main} strokeWidth="2" strokeLinecap="round" pathLength="100" strokeDasharray="8 92" className="at-comet" />
        </g>
      );
  }
}

/** The icon, drawn white and centred at (x, y) */
function Glyph({ icon, x, y, size = 26 }: { icon: IconName; x: number; y: number; size?: number }) {
  const s = size / 24;
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${s})`}>
      <path d={iconPath(icon)} fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Shape({ s, h, id, icon }: { s: Shape; h: Hue; id: string; icon: IconName }) {
  const glass = `url(#${id}-glass)`;
  const shadow = `url(#${id}-shadow)`;
  switch (s) {
    case "orb":
      return (
        <>
          <circle cx={CX} cy={CY} r="46" fill={h.main} opacity=".12" className="at-breathe" />
          <g className="at-float">
            <circle cx={CX} cy={CY} r="32" fill={glass} filter={shadow} />
            <circle cx={CX} cy={CY} r="31" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" />
            <ellipse cx={CX - 9} cy={CY - 15} rx="14" ry="7" fill="#fff" opacity=".35" />
            <Glyph icon={icon} x={CX} y={CY} />
          </g>
        </>
      );
    case "pill":
      return (
        <g className="at-float">
          <rect x={CX - 52} y={CY - 26} width="104" height="52" rx="26" fill={glass} filter={shadow} />
          <rect x={CX - 51} y={CY - 25} width="102" height="50" rx="25" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" />
          <rect x={CX - 38} y={CY - 20} width="56" height="10" rx="5" fill="#fff" opacity=".3" />
          <Glyph icon={icon} x={CX} y={CY} />
        </g>
      );
    case "tile":
      return (
        <g className="at-float">
          <rect x={CX - 32} y={CY - 32} width="64" height="64" rx="16" fill={glass} filter={shadow} transform={`rotate(-8 ${CX} ${CY})`} />
          <rect x={CX - 31} y={CY - 31} width="62" height="62" rx="15" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.5" transform={`rotate(-8 ${CX} ${CY})`} />
          <Glyph icon={icon} x={CX} y={CY} size={28} />
        </g>
      );
    case "stack": {
      const plate = (y: number, top: boolean, k: number) => (
        <g key={k} opacity={top ? 1 : 0.55 - k * 0.12}>
          <path d={`M${CX} ${y - 22}L${CX + 44} ${y}L${CX} ${y + 22}L${CX - 44} ${y}Z`} fill={top ? glass : h.main} stroke="#fff" strokeOpacity=".75" strokeWidth="1.2" filter={top ? shadow : undefined} />
        </g>
      );
      return (
        <g className="at-float">
          {[2, 1].map((k) => plate(CY + 8 + k * 11, false, k))}
          {plate(CY - 2, true, 0)}
          <Glyph icon={icon} x={CX} y={CY - 2} size={22} />
        </g>
      );
    }
    case "hex": {
      const hex = (cy: number, rad: number) => r(6).map((k) => { const a = (Math.PI / 3) * k - Math.PI / 2; return `${(CX + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a) * 0.62).toFixed(1)}`; }).join(" ");
      return (
        <g className="at-float">
          <polygon points={hex(CY + 18, 40)} fill={h.main} opacity=".25" />
          <polygon points={hex(CY + 9, 40)} fill={h.main} opacity=".45" />
          <polygon points={hex(CY, 40)} fill={glass} stroke="#fff" strokeOpacity=".75" strokeWidth="1.2" filter={shadow} />
          <Glyph icon={icon} x={CX} y={CY} size={24} />
        </g>
      );
    }
    case "cube":
      return (
        <g className="at-float">
          <path d={`M${CX} ${CY - 34}L${CX + 34} ${CY - 17}L${CX} ${CY}L${CX - 34} ${CY - 17}Z`} fill={glass} stroke="#fff" strokeOpacity=".8" strokeWidth="1.2" />
          <path d={`M${CX - 34} ${CY - 17}L${CX} ${CY}V${CY + 38}L${CX - 34} ${CY + 21}Z`} fill={h.main} stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" />
          <path d={`M${CX + 34} ${CY - 17}L${CX} ${CY}V${CY + 38}L${CX + 34} ${CY + 21}Z`} fill={h.deep} stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" />
          <g transform={`matrix(1 0.5 -1 0.5 ${CX} ${CY - 34}) translate(17 17) rotate(0)`}>
            <g transform="translate(-9 -9) scale(0.75)"><path d={iconPath(icon)} fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></g>
          </g>
        </g>
      );
  }
}

export default function ArtTile({ variant = 0, className = "", fill = false }: { variant?: number; className?: string; fill?: boolean }) {
  const v = VARIANTS[((variant % VARIANTS.length) + VARIANTS.length) % VARIANTS.length];
  const h = HUES[v.hue];
  const id = `at${VARIANTS.indexOf(v)}`;
  return (
    <div className={`art-tile ${className}`} style={{ borderColor: h.light }}>
      <svg viewBox="0 0 320 180" preserveAspectRatio={fill ? "xMidYMid slice" : undefined} className={`block w-full ${fill ? "h-full" : "h-auto"}`} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor={h.light} />
          </linearGradient>
          <radialGradient id={`${id}-glow`} cx={CX} cy={CY} r="130" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={h.main} stopOpacity=".22" />
            <stop offset="1" stopColor={h.main} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}-glass`} cx=".35" cy=".3" r=".85">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset=".35" stopColor={h.main} stopOpacity=".85" />
            <stop offset="1" stopColor={h.deep} />
          </radialGradient>
          <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={h.main} />
            <stop offset="1" stopColor={h.main} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-fadeg`} cx=".5" cy=".55" r=".6">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={`${id}-fade`}><rect width="320" height="180" fill={`url(#${id}-fadeg)`} /></mask>
          <filter id={`${id}-shadow`} x="-60%" y="-60%" width="220%" height="240%">
            <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor={h.deep} floodOpacity=".35" />
          </filter>
        </defs>
        <rect width="320" height="180" fill={`url(#${id}-bg)`} />
        <Texture t={v.texture} h={h} id={id} />
        <rect width="320" height="180" fill={`url(#${id}-glow)`} />
        <Shape s={v.shape} h={h} id={id} icon={v.icon} />
      </svg>
    </div>
  );
}
