/**
 * Generic, reusable header images for case-study / outcome cards.
 * Not tied to any one story: pick any variant for any card.
 * Futuristic, monochrome, agentic: hairline geometry, depth through perspective
 * and layering, one accent detail. Static images (no animation).
 * viewBox 320 × 180.
 */
const INK = "var(--color-ink)";
const SOFT = "var(--color-line-strong)";
const FAINT = "var(--color-line)";
const ACC = "var(--color-accent)";
const BG = "var(--color-bg)";

const r = (n: number) => Array.from({ length: n }, (_, i) => i);
const f = (v: number) => v.toFixed(1);

/** Perspective floor grid converging on a vanishing point. */
function Floor({ vy = 70, y0 = 180, cols = 22, rows = 9 }: { vy?: number; y0?: number; cols?: number; rows?: number }) {
  return (
    <g stroke={FAINT} strokeWidth="0.7">
      {r(cols + 1).map((i) => {
        const x = -160 + (i * 640) / cols;
        return <path key={`c${i}`} d={`M160 ${vy}L${f(x)} ${y0}`} />;
      })}
      {r(rows).map((j) => {
        const t = Math.pow((j + 1) / rows, 2);
        const y = vy + (y0 - vy) * t;
        return <path key={`r${j}`} d={`M0 ${f(y)}H320`} />;
      })}
    </g>
  );
}

/** 1 · Agent core: a hex core above a perspective floor, with orbiting nodes. */
function Core() {
  const hex = (s: number, cx = 160, cy = 78) => r(6).map((k) => { const a = (Math.PI / 3) * k - Math.PI / 2; return `${f(cx + s * Math.cos(a))},${f(cy + s * Math.sin(a))}`; }).join(" ");
  const nodes = r(8).map((k) => { const a = (Math.PI / 4) * k; return [160 + 88 * Math.cos(a), 78 + 30 * Math.sin(a)] as const; });
  return (
    <>
      <Floor vy={86} />
      <ellipse cx="160" cy="132" rx="70" ry="10" fill="none" stroke={SOFT} strokeWidth="0.8" />
      <path d="M160 108V132" stroke={SOFT} strokeDasharray="2 3" />
      <ellipse cx="160" cy="78" rx="88" ry="30" fill="none" stroke={SOFT} strokeWidth="0.8" />
      {nodes.map(([x, y], k) => <path key={`l${k}`} d={`M160 78L${f(x)} ${f(y)}`} stroke={FAINT} strokeWidth="0.7" />)}
      {[34, 24, 14].map((s, i) => <polygon key={s} points={hex(s)} fill={i === 0 ? BG : "none"} stroke={i === 2 ? ACC : INK} strokeWidth={i === 2 ? 1.2 : 0.9} />)}
      <rect x="156" y="74" width="8" height="8" fill={INK} />
      {nodes.map(([x, y], k) => <rect key={k} x={f(x - 3)} y={f(y - 3)} width="6" height="6" fill={k === 2 ? INK : BG} stroke={INK} strokeWidth="0.8" />)}
    </>
  );
}

/** 2 · Orbital network: tilted rings, a wire globe and linked satellites. */
function Orbit() {
  const sats: [number, number][] = [[52, 60], [96, 140], [262, 48], [280, 128], [214, 158], [118, 26]];
  return (
    <>
      {r(14).map((i) => <circle key={i} cx={20 + i * 22} cy="168" r="0.9" fill={SOFT} />)}
      {[0, 1, 2].map((i) => <ellipse key={i} cx="160" cy="90" rx={70 + i * 34} ry={20 + i * 10} transform={`rotate(-14 160 90)`} fill="none" stroke={i === 1 ? SOFT : FAINT} strokeWidth="0.8" strokeDasharray={i === 2 ? "3 5" : undefined} />)}
      {sats.map(([x, y], i) => <path key={`s${i}`} d={`M160 90L${x} ${y}`} stroke={FAINT} strokeWidth="0.7" />)}
      <circle cx="160" cy="90" r="34" fill={BG} stroke={INK} strokeWidth="0.9" />
      {r(4).map((i) => <ellipse key={`m${i}`} cx="160" cy="90" rx={34 * Math.cos((i * Math.PI) / 8)} ry="34" fill="none" stroke={SOFT} strokeWidth="0.7" />)}
      {[-17, 0, 17].map((d) => <ellipse key={`p${d}`} cx="160" cy={90 + d} rx={Math.sqrt(34 * 34 - d * d)} ry="5" fill="none" stroke={SOFT} strokeWidth="0.7" />)}
      {sats.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 2 ? 4.5 : 3.2} fill={i === 2 ? ACC : BG} stroke={i === 2 ? "none" : INK} strokeWidth="0.9" />)}
    </>
  );
}

/** 3 · Data horizon: a perspective floor with light columns rising to the horizon. */
function Horizon() {
  const cols = [[60, 40], [88, 64], [116, 30], [138, 66], [160, 80], [182, 58], [206, 72], [232, 48], [262, 60]];
  return (
    <>
      <Floor vy={96} rows={8} />
      <path d="M0 96H320" stroke={SOFT} strokeWidth="0.8" />
      {cols.map(([x, h], i) => (
        <g key={i}>
          <rect x={x - 5} y={96 - h} width="10" height={h} fill={BG} stroke={i === 4 ? INK : SOFT} strokeWidth="0.8" />
          {r(Math.floor(h / 10)).map((k) => <path key={k} d={`M${x - 5} ${96 - h + 6 + k * 10}H${x + 5}`} stroke={FAINT} strokeWidth="0.6" />)}
          <path d={`M${x} ${96}L${x + (x - 160) * 0.5} 180`} stroke={i === 4 ? INK : FAINT} strokeWidth="0.7" strokeDasharray="2 3" />
        </g>
      ))}
      <rect x="156" y="6" width="8" height="8" fill={ACC} />
      <path d="M160 14V16" stroke={INK} />
    </>
  );
}

/** 4 · Layered stack: isometric platforms with an agent node floating above. */
function Stack() {
  const plate = (y: number, s: number, accent = false) => {
    const p = `160,${y - s * 0.5} ${160 + s},${y} 160,${y + s * 0.5} ${160 - s},${y}`;
    return (
      <g key={y}>
        <path d={`M${160 - s} ${y}V${y + 6}L160 ${y + s * 0.5 + 6}L${160 + s} ${y + 6}V${y}`} fill={BG} stroke={SOFT} strokeWidth="0.8" />
        <polygon points={p} fill={BG} stroke={accent ? ACC : INK} strokeWidth={accent ? 1.1 : 0.9} />
      </g>
    );
  };
  return (
    <>
      <Floor vy={60} rows={10} />
      {[150, 122, 94].map((y, i) => plate(y, 96 - i * 16, i === 2))}
      <path d="M160 94V40" stroke={INK} strokeWidth="0.8" strokeDasharray="2 3" />
      {[[110, 52], [210, 52], [160, 24]].map(([x, y], i) => <path key={i} d={`M160 40L${x} ${y}`} stroke={SOFT} strokeWidth="0.7" />)}
      {[[110, 52], [210, 52], [160, 24]].map(([x, y], i) => <rect key={`n${i}`} x={x - 3} y={y - 3} width="6" height="6" fill={BG} stroke={INK} strokeWidth="0.8" />)}
      <rect x="153" y="33" width="14" height="14" fill={INK} />
    </>
  );
}

/** 5 · Signal field: a wave surface of hairlines with one marked peak. */
function Field() {
  return (
    <>
      {r(16).map((j) => {
        const p = j / 15;
        const base = 40 + p * 130;
        const amp = 6 + 26 * p;
        const d = r(41).map((k) => {
          const x = k * 8;
          const peak = Math.exp(-((x - 196) ** 2) / 2400) * (1 - Math.abs(p - 0.55)) * 40;
          const y = base + Math.sin(x / 34 + j * 0.5) * amp * 0.3 - peak;
          return `${k ? "L" : "M"}${x} ${f(y)}`;
        }).join("");
        return <path key={j} d={d} fill="none" stroke={j === 8 ? INK : SOFT} strokeWidth={j === 8 ? 0.9 : 0.6} strokeOpacity={0.35 + p * 0.65} />;
      })}
      <path d="M196 38V82" stroke={INK} strokeWidth="0.8" strokeDasharray="2 3" />
      <rect x="191" y="27" width="10" height="10" fill={BG} stroke={INK} strokeWidth="0.9" />
      <rect x="194" y="30" width="4" height="4" fill={ACC} />
    </>
  );
}

/** 6 · Gateway: nested frames receding into depth, with a node at the threshold. */
function Gate() {
  return (
    <>
      {r(10).map((i) => {
        const s = 1 - i * 0.085;
        return <rect key={i} x={f(160 - 140 * s)} y={f(90 - 78 * s)} width={f(280 * s)} height={f(156 * s)} rx={f(10 * s)} fill="none" stroke={i === 9 ? ACC : i % 3 === 0 ? INK : SOFT} strokeWidth={i % 3 === 0 ? 0.9 : 0.6} />;
      })}
      {[[20, 12], [300, 12], [300, 168], [20, 168]].map(([x, y], i) => <path key={i} d={`M${x} ${y}L${f(160 + (x - 160) * 0.24)} ${f(90 + (y - 90) * 0.24)}`} stroke={FAINT} strokeWidth="0.7" />)}
      <path d="M40 150H280" stroke={SOFT} strokeWidth="0.6" strokeDasharray="2 4" />
      <rect x="154" y="84" width="12" height="12" fill={INK} />
      <rect x="148" y="78" width="24" height="24" fill="none" stroke={INK} strokeWidth="0.7" />
    </>
  );
}

const VARIANTS = [Core, Orbit, Horizon, Stack, Field, Gate];
export const OUTCOME_ART_COUNT = VARIANTS.length;

export default function OutcomeArt({ variant = 0 }: { variant?: number }) {
  const V = VARIANTS[((variant % VARIANTS.length) + VARIANTS.length) % VARIANTS.length];
  return (
    <svg viewBox="0 0 320 180" className="oa" aria-hidden="true">
      <V />
    </svg>
  );
}
