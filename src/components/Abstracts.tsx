/**
 * Twenty abstract line vectors for the Outcomes cards (and anywhere else).
 * Futuristic, hairline geometry: one ink colour, one accent, no fills except
 * small accent marks. Each has one slow micro-motion (CSS, see .abs-* in
 * motion.css), and all are static for reduced-motion users.
 *
 * viewBox is 240 × 140 so they sit in a 12:7 card header.
 */
import type { ReactNode } from "react";

const W = 240;
const H = 140;
const cx = W / 2;
const cy = H / 2;
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const pt = (r: number, a: number, x = cx, y = cy) => [x + r * Math.cos(a), y + r * Math.sin(a)] as const;
const poly = (pts: (readonly [number, number])[]) => pts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");

const A = "var(--color-accent)";

const art: { name: string; el: ReactNode }[] = [
  {
    name: "Orbit",
    el: (
      <>
        {range(4).map((i) => <ellipse key={i} cx={cx} cy={cy} rx={30 + i * 18} ry={12 + i * 7} transform={`rotate(${-18 + i * 6} ${cx} ${cy})`} />)}
        <circle cx={cx} cy={cy} r={10} className="abs-accent" />
        <g className="abs-spin"><circle cx={cx + 84} cy={cy} r={3} fill={A} stroke="none" /></g>
      </>
    ),
  },
  {
    name: "Wire sphere",
    el: (
      <g className="abs-spin-slow">
        <circle cx={cx} cy={cy} r={52} />
        {range(5).map((i) => <ellipse key={`m${i}`} cx={cx} cy={cy} rx={52 * Math.cos((i * Math.PI) / 10)} ry={52} />)}
        {range(5).map((i) => { const y = -52 + (i + 1) * 17.3; const r = Math.sqrt(52 * 52 - y * y); return <ellipse key={`p${i}`} cx={cx} cy={cy + y} rx={r} ry={r * 0.18} />; })}
      </g>
    ),
  },
  {
    name: "Signal rings",
    el: (
      <>
        {range(6).map((i) => <circle key={i} cx={cx} cy={cy} r={8 + i * 11} strokeDasharray={i % 2 ? "2 4" : undefined} />)}
        <circle cx={cx} cy={cy} r={8} className="abs-pulse" stroke={A} />
        <path d={`M${cx} ${cy}L${cx + 64} ${cy - 36}`} stroke={A} />
      </>
    ),
  },
  {
    name: "Terrain",
    el: (
      <>
        {range(12).map((i) => {
          const y = 30 + i * 8;
          const d = range(25).map((k) => { const x = k * 10; const z = Math.exp(-((x - cx) ** 2) / 1800) * (28 - i * 1.5); return `${k ? "L" : "M"}${x} ${(y - Math.max(0, z)).toFixed(1)}`; }).join("");
          return <path key={i} d={d} stroke={i === 6 ? A : undefined} />;
        })}
      </>
    ),
  },
  {
    name: "Iso cube",
    el: (
      <g className="abs-float">
        {[0, 1, 2].map((k) => {
          const s = 46 - k * 14;
          const top = [[cx, cy - s], [cx + s * 0.87, cy - s / 2], [cx, cy], [cx - s * 0.87, cy - s / 2]] as const;
          return (
            <g key={k}>
              <polygon points={poly([...top])} stroke={k === 2 ? A : undefined} />
              <path d={`M${cx - s * 0.87} ${cy - s / 2}V${cy + s / 2}L${cx} ${cy + s}L${cx + s * 0.87} ${cy + s / 2}V${cy - s / 2}M${cx} ${cy}V${cy + s}`} />
            </g>
          );
        })}
      </g>
    ),
  },
  {
    name: "Neural mesh",
    el: (() => {
      const cols = [40, 90, 150, 200];
      const nodes = cols.flatMap((x, c) => range(c === 0 || c === 3 ? 3 : 4).map((r, _, a) => [x, cy + (r - (a.length - 1) / 2) * 26] as const));
      const layers = cols.map((x) => nodes.filter((n) => n[0] === x));
      return (
        <>
          {layers.slice(0, -1).flatMap((L, i) => L.flatMap((a) => layers[i + 1].map((b) => <path key={`${a}-${b}`} d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`} strokeOpacity={0.5} />)))}
          {nodes.map((n, i) => <circle key={i} cx={n[0]} cy={n[1]} r={4} fill="var(--color-bg)" className={i === 5 ? "abs-pulse" : undefined} stroke={i === 5 ? A : undefined} />)}
        </>
      );
    })(),
  },
  {
    name: "Vortex",
    el: (
      <g className="abs-spin-slow">
        {range(14).map((i) => <rect key={i} x={cx - (60 - i * 4)} y={cy - (60 - i * 4)} width={(60 - i * 4) * 2} height={(60 - i * 4) * 2} transform={`rotate(${i * 7} ${cx} ${cy})`} stroke={i === 13 ? A : undefined} strokeOpacity={0.4 + i * 0.04} />)}
      </g>
    ),
  },
  {
    name: "Circuit",
    el: (
      <>
        {range(7).map((i) => {
          const y = 22 + i * 16;
          const bend = 70 + (i % 3) * 18;
          return <path key={i} d={`M10 ${y}H${bend}L${bend + 16} ${cy}H${W - bend - 16}L${W - bend} ${y}H${W - 10}`} strokeOpacity={0.55} />;
        })}
        <rect x={cx - 22} y={cy - 14} width={44} height={28} fill="var(--color-bg)" />
        <rect x={cx - 10} y={cy - 6} width={20} height={12} fill={A} stroke="none" className="abs-pulse" />
      </>
    ),
  },
  {
    name: "Helix",
    el: (
      <>
        {[0, Math.PI].map((ph, s) => (
          <path key={s} d={range(49).map((k) => { const x = 10 + k * 4.6; return `${k ? "L" : "M"}${x.toFixed(1)} ${(cy + Math.sin(k * 0.33 + ph) * 34).toFixed(1)}`; }).join("")} stroke={s ? A : undefined} />
        ))}
        {range(16).map((k) => { const x = 10 + k * 14.2; const t = (x - 10) / 4.6; return <path key={k} d={`M${x} ${cy + Math.sin(t * 0.33) * 34}L${x} ${cy + Math.sin(t * 0.33 + Math.PI) * 34}`} strokeOpacity={0.35} />; })}
      </>
    ),
  },
  {
    name: "Prism",
    el: (
      <>
        <polygon points={poly([[cx, 18], [cx + 54, 118], [cx - 54, 118]])} />
        <polygon points={poly([[cx, 46], [cx + 30, 102], [cx - 30, 102]])} stroke={A} />
        <path d={`M10 ${cy + 6}L${cx - 30} ${cy + 2}`} />
        {range(5).map((i) => <path key={i} d={`M${cx + 26} ${cy + 6}L${W - 10} ${30 + i * 20}`} strokeOpacity={0.3 + i * 0.12} className="abs-draw" />)}
      </>
    ),
  },
  {
    name: "Grid warp",
    el: (
      <>
        {range(13).map((i) => <path key={`v${i}`} d={`M${30 + i * 15} 15Q${cx + (30 + i * 15 - cx) * 0.6} ${cy} ${30 + i * 15} 125`} strokeOpacity={0.5} />)}
        {range(8).map((i) => <path key={`h${i}`} d={`M30 ${15 + i * 15.7}Q${cx} ${cy + (15 + i * 15.7 - cy) * 0.6} 210 ${15 + i * 15.7}`} strokeOpacity={0.5} />)}
        <circle cx={cx} cy={cy} r={5} fill={A} stroke="none" className="abs-pulse" />
      </>
    ),
  },
  {
    name: "Radar",
    el: (
      <>
        {[18, 36, 54].map((r) => <circle key={r} cx={cx} cy={cy} r={r} />)}
        <path d={`M${cx - 60} ${cy}H${cx + 60}M${cx} ${cy - 60}V${cy + 60}`} strokeOpacity={0.4} />
        <g className="abs-spin"><path d={`M${cx} ${cy}L${cx + 54} ${cy}A54 54 0 0 0 ${pt(54, -0.6)[0]} ${pt(54, -0.6)[1]}Z`} fill={A} fillOpacity={0.18} stroke={A} /></g>
        <circle cx={cx + 22} cy={cy - 28} r={2.5} fill={A} stroke="none" />
      </>
    ),
  },
  {
    name: "Stack",
    el: (
      <>
        {range(6).map((i) => {
          const y = 30 + i * 14;
          return <polygon key={i} points={poly([[cx, y - 12], [cx + 60, y], [cx, y + 12], [cx - 60, y]])} fill="var(--color-bg)" stroke={i === 0 ? A : undefined} className={i === 0 ? "abs-float" : undefined} />;
        })}
      </>
    ),
  },
  {
    name: "Starburst",
    el: (
      <>
        {range(36).map((i) => { const a = (i / 36) * Math.PI * 2; const r0 = 14; const r1 = i % 3 ? 44 : 60; const [x0, y0] = pt(r0, a); const [x1, y1] = pt(r1, a); return <path key={i} d={`M${x0} ${y0}L${x1} ${y1}`} stroke={i % 9 === 0 ? A : undefined} strokeOpacity={i % 3 ? 0.45 : 1} />; })}
        <circle cx={cx} cy={cy} r={14} className="abs-pulse" />
      </>
    ),
  },
  {
    name: "Contours",
    el: (
      <>
        {range(9).map((i) => {
          const r = 8 + i * 7;
          const d = range(41).map((k) => { const a = (k / 40) * Math.PI * 2; const rr = r * (1 + 0.18 * Math.sin(a * 3 + i * 0.4)); return `${k ? "L" : "M"}${(cx + rr * 1.5 * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; }).join("") + "Z";
          return <path key={i} d={d} stroke={i === 4 ? A : undefined} />;
        })}
      </>
    ),
  },
  {
    name: "Tunnel",
    el: (
      <>
        {range(9).map((i) => { const s = 1 - i * 0.1; return <rect key={i} x={cx - 100 * s} y={cy - 58 * s} width={200 * s} height={116 * s} strokeOpacity={1 - i * 0.08} stroke={i === 8 ? A : undefined} />; })}
        {[[-100, -58], [100, -58], [100, 58], [-100, 58]].map(([x, y], i) => <path key={i} d={`M${cx + x} ${cy + y}L${cx + x * 0.2} ${cy + y * 0.2}`} strokeOpacity={0.5} />)}
      </>
    ),
  },
  {
    name: "Particles in flow",
    el: (
      <>
        {range(9).map((i) => <path key={i} d={`M0 ${cy + (i - 4) * 12}C${cx - 40} ${cy + (i - 4) * 12} ${cx - 30} ${cy + (i - 4) * 3} ${cx} ${cy + (i - 4) * 3}S${cx + 40} ${cy + (i - 4) * 12} ${W} ${cy + (i - 4) * 12}`} strokeOpacity={0.45} />)}
        <path d={`M0 ${cy}H${W}`} stroke={A} className="abs-dash" strokeDasharray="6 10" />
      </>
    ),
  },
  {
    name: "Hex lattice",
    el: (
      <>
        {range(5).flatMap((r) => range(7).map((c) => {
          const x = 45 + c * 25 + (r % 2) * 12.5;
          const y = 26 + r * 22;
          const hot = r === 2 && c === 3;
          return <polygon key={`${r}-${c}`} points={poly(range(6).map((k) => pt(12, (k * Math.PI) / 3 + Math.PI / 6, x, y)))} stroke={hot ? A : undefined} strokeOpacity={hot ? 1 : 0.45} className={hot ? "abs-pulse" : undefined} />;
        }))}
      </>
    ),
  },
  {
    name: "Gate",
    el: (
      <>
        {range(5).map((i) => <path key={i} d={`M${cx - 70 + i * 8} 125V${60 - i * 4}A${70 - i * 8} ${70 - i * 8} 0 0 1 ${cx + 70 - i * 8} ${60 - i * 4}V125`} stroke={i === 4 ? A : undefined} strokeOpacity={0.4 + i * 0.15} />)}
        <path d="M20 125H220" />
        <circle cx={cx} cy={95} r={4} fill={A} stroke="none" className="abs-float" />
      </>
    ),
  },
  {
    name: "Equalizer",
    el: (
      <>
        {range(28).map((i) => { const h = 10 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)) * 70; return <path key={i} d={`M${22 + i * 7.3} ${cy - h / 2}V${cy + h / 2}`} stroke={i === 14 ? A : undefined} className="abs-eq" style={{ animationDelay: `${(i % 7) * -0.3}s` }} />; })}
        <path d={`M14 ${cy}H226`} strokeOpacity={0.3} />
      </>
    ),
  },
];

export const abstractNames = art.map((a) => a.name);
export const ABSTRACT_COUNT = art.length;

export default function Abstract({ index, className = "" }: { index: number; className?: string }) {
  const a = art[((index % art.length) + art.length) % art.length];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`abs ${className}`} fill="none" stroke="var(--color-ink)" strokeWidth={0.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {a.el}
    </svg>
  );
}
