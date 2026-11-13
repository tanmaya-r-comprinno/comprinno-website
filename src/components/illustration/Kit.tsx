/**
 * Shared kit for product illustrations (not real screenshots).
 * Light "futuristic" look: white-to-faint-blue console with a fine blue grid,
 * softly glowing brand-blue data, and white floating cards for depth.
 * Square corners, brand colours, nothing behind the picture.
 *
 * Motion classes (defined in brand.css, all disabled for reduced motion):
 *   tv-float   floating card drift          tv-ring   ripple on a live dot
 *   tv-rise    vertical bar rise (origin bottom, use animationDelay to stagger)
 *   tv-grow    horizontal bar grow (origin left)
 *   tv-twinkle outline fade in/out          bill-run tv-run  light running along a line
 *                                           (stroke={GOLD} pathLength={100} strokeDasharray="12 88")
 * Put `pd tv-crisp` on the root <svg> (Console does this).
 */
import type { ReactNode } from "react";
import { iconPath, type IconName } from "@/components/Icon";

export const NAVY = "#0a134b";
export const BLUE = "#006bc9";
export const SKY = "#0088ff";
export const ICE = "#9fd3ff";
export const GOLD = "#ffbb00";
export const OCHRE = "#a87a00";
export const GREEN = "#16794a";
export const INK = "#1c1c1c";
export const MUTED = "#5f6b7a";
export const EDGE = "#d3e3f3";
export const SOFT = "#f5f8fd";
export const TINT = "#e3f0fc";
export const GRID = "rgba(0,107,201,.06)";

/**
 * Rough rendered width of a label (Inter), in viewBox units. Use it to size any box
 * that holds text, then keep at least 8 units of padding on both sides:
 *   boxW = textW(label, size, { bold }) + leftInset + 8
 * Never guess box widths from character counts by eye.
 */
export function textW(text: string, size: number, o: { bold?: boolean; caps?: boolean; spacing?: number } = {}) {
  const per = o.caps ? 0.72 : o.bold ? 0.6 : 0.56;
  return text.length * (size * per + (o.spacing ?? 0));
}

export function Glyph({ icon, x, y, size = 14, color = BLUE }: { icon: IconName; x: number; y: number; size?: number; color?: string }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}>
      <path d={iconPath(icon)} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/**
 * Gradient / filter definitions, namespaced by `id`:
 *   url(#{id}-panel) url(#{id}-grid) url(#{id}-bar) vertical bar
 *   url(#{id}-hbar) horizontal bar   url(#{id}-area) area under a line
 *   url(#{id}-glow) soft glow filter url(#{id}-sh) floating-card shadow
 */
export function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#f3f8fe" />
      </linearGradient>
      <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={BLUE} />
        <stop offset="1" stopColor={ICE} />
      </linearGradient>
      <linearGradient id={`${id}-hbar`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={BLUE} />
        <stop offset="1" stopColor={ICE} />
      </linearGradient>
      <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={SKY} stopOpacity=".22" />
        <stop offset="1" stopColor={SKY} stopOpacity="0" />
      </linearGradient>
      <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke={GRID} />
      </pattern>
      <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor={NAVY} floodOpacity=".12" />
      </filter>
    </defs>
  );
}

/** Light console panel with header (product name, view title, live dot, right-hand note). Draws inside an existing <svg>. */
export function Panel({ id, x = 0, y = 0, w = 540, h = 380, product, title, sub, dotX }: { id: string; x?: number; y?: number; w?: number; h?: number; product: string; title: string; sub?: string; dotX?: number }) {
  const nameW = product.length * 7.6 + 8;
  const dx = dotX ?? x + w - (sub ? sub.length * 5.6 + 34 : 24);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-panel)`} />
      <rect x={x} y={y + 40} width={w} height={h - 40} fill={`url(#${id}-grid)`} />
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} fill="none" stroke={EDGE} />
      <path d={`M${x} ${y + 40} H${x + w}`} stroke={EDGE} />
      <path d={`M${x} ${y + 0.5} H${x + w / 3}`} stroke={SKY} strokeWidth="2" filter={`url(#${id}-glow)`} />
      <text x={x + 20} y={y + 25.5} fontSize="13" fontWeight="700" fill={NAVY}>{product}</text>
      <text x={x + 20 + nameW} y={y + 25.5} fontSize="12" fill={BLUE}>{title}</text>
      <circle cx={dx} cy={y + 21} r="3.5" fill="none" stroke={GOLD} strokeWidth="1.5" className="tv-ring" />
      <circle cx={dx} cy={y + 21} r="3.5" fill={GOLD} filter={`url(#${id}-glow)`} />
      {sub && <text x={x + w - 20} y={y + 25} fontSize="11" fill={MUTED} textAnchor="end">{sub}</text>}
    </g>
  );
}

/** White floating card with a coloured top edge and a small caps tag. Wrap in <Float id> for shadow + drift. */
export function Card({ x, y, w, h, tag, tagColor = BLUE, children }: { x: number; y: number; w: number; h: number; tag?: string; tagColor?: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#fff" stroke={EDGE} />
      <rect x={x} y={y} width={w} height="3" fill={tagColor} />
      {tag && <text x={x + 16} y={y + 24} fontSize="10" fontWeight="700" fill={tagColor === GOLD ? OCHRE : tagColor} letterSpacing="1.2">{tag}</text>}
      {children}
    </g>
  );
}

/** Shadow + gentle drift for a floating card (nested groups so SVG transforms are kept). */
export function Float({ id, children }: { id: string; children: ReactNode }) {
  return <g filter={`url(#${id}-sh)`}><g className="tv-float">{children}</g></g>;
}

/** Small outlined chip; `on` = selected. */
export function Chip({ x, y, text, on = false, w }: { x: number; y: number; text: string; on?: boolean; w?: number }) {
  const width = w ?? 18 + text.length * 6.2;
  return (
    <g>
      <rect x={x} y={y} width={width} height="22" fill={on ? TINT : "#fff"} stroke={on ? BLUE : EDGE} />
      <text x={x + width / 2} y={y + 15} fontSize="11" fill={on ? BLUE : MUTED} textAnchor="middle">{text}</text>
    </g>
  );
}

/** Glowing line + running light, with optional area fill to `base`. */
export function Trend({ id, points, base }: { id: string; points: string; base?: number }) {
  const first = points.split(" ")[0].split(",")[0];
  const last = points.trim().split(" ").pop()!.split(",")[0];
  return (
    <g>
      {base !== undefined && <polygon points={`${first},${base} ${points} ${last},${base}`} fill={`url(#${id}-area)`} />}
      <polyline points={points} fill="none" stroke={SKY} strokeWidth="2" filter={`url(#${id}-glow)`} />
      <polyline points={points} fill="none" stroke={GOLD} strokeWidth="2.6" pathLength={100} strokeDasharray="12 88" className="bill-run tv-run" />
    </g>
  );
}

/** Root svg for an illustration. */
export function Art({ id, w = 600, h = 460, label, children }: { id: string; w?: number; h?: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="pd tv-crisp block h-auto w-full" role="img" aria-label={label}>
      <Defs id={id} />
      {children}
    </svg>
  );
}
