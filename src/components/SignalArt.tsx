/**
 * Futuristic card art for the outcome panels (light blue-white): light rather than linework.
 * Six scenes (signal flow, constellation, radar, light columns, aurora, orbit),
 * each with one slow motion. Pure SVG + CSS (.sa-* in brand.css), no JS, no images.
 * Static for reduced-motion users. viewBox 320 × 180.
 */
// tuned for the light panel: brand blues on soft blue-white
const SKY = "#0088ff";
const ICE = "#006bc9";
const DOT = "#006bc9";
const GOLD = "#ffbb00";

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-line`} x1="0" x2="1">
        <stop offset="0" stopColor={SKY} stopOpacity="0" />
        <stop offset=".5" stopColor={SKY} stopOpacity=".9" />
        <stop offset="1" stopColor={SKY} stopOpacity="0" />
      </linearGradient>
      <linearGradient id={`${id}-col`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor={ICE} stopOpacity=".95" />
        <stop offset=".6" stopColor={SKY} stopOpacity=".45" />
        <stop offset="1" stopColor={SKY} stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-core`}>
        <stop offset="0" stopColor="#ffffff" />
        <stop offset=".35" stopColor="#8cc8ff" />
        <stop offset="1" stopColor={SKY} stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-gold`}>
        <stop offset="0" stopColor="#fff6d6" />
        <stop offset=".4" stopColor={GOLD} />
        <stop offset="1" stopColor={GOLD} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-sweep`} x1="0" x2="1">
        <stop offset="0" stopColor={SKY} stopOpacity="0" />
        <stop offset="1" stopColor={ICE} stopOpacity=".75" />
      </linearGradient>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
      <filter id={`${id}-soft`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" /></filter>
    </defs>
  );
}

const r = (n: number) => Array.from({ length: n }, (_, i) => i);

/** 0 · Signal flow: streams of light converge on a glowing core */
function Flow({ id }: { id: string }) {
  return (
    <>
      {r(9).map((i) => {
        const y = 22 + i * 17;
        const d = `M-10 ${y} C 90 ${y}, 120 90, 160 90 S 230 ${180 - y}, 330 ${180 - y}`;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={`url(#${id}-line)`} strokeWidth="1" opacity=".7" />
            <path d={d} fill="none" stroke={ICE} strokeWidth="1.4" strokeLinecap="round" className="sa-pulse" style={{ animationDelay: `${-i * 0.7}s` }} />
          </g>
        );
      })}
      <circle cx="160" cy="90" r="34" fill={`url(#${id}-core)`} opacity=".55" className="sa-breathe" />
      <circle cx="160" cy="90" r="5" fill={DOT} />
      <circle cx="160" cy="90" r="11" fill="none" stroke={GOLD} strokeWidth="1" className="sa-ring" />
    </>
  );
}

/** 1 · Constellation: a network that twinkles while light travels its links */
const NODES: [number, number][] = [[40, 50], [86, 30], [70, 96], [124, 64], [118, 134], [168, 40], [176, 104], [214, 70], [226, 140], [262, 44], [280, 108], [300, 70], [26, 140], [150, 160]];
const LINKS: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [4, 6], [5, 7], [6, 7], [6, 8], [7, 9], [7, 10], [9, 11], [10, 11], [8, 10], [2, 12], [4, 13], [8, 13]];
function Constellation({ id }: { id: string }) {
  return (
    <>
      {LINKS.map(([a, b], i) => {
        const d = `M${NODES[a][0]} ${NODES[a][1]}L${NODES[b][0]} ${NODES[b][1]}`;
        return (
          <g key={i}>
            <path d={d} stroke={SKY} strokeWidth=".8" opacity=".55" />
            {i % 3 === 0 && <path d={d} stroke={ICE} strokeWidth="1.4" strokeLinecap="round" className="sa-pulse sa-pulse-short" style={{ animationDelay: `${-i * 0.45}s` }} />}
          </g>
        );
      })}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="7" fill={`url(#${i === 7 ? `${id}-gold` : `${id}-core`})`} opacity=".7" className="sa-twinkle" style={{ animationDelay: `${-i * 0.37}s` }} />
          <circle cx={x} cy={y} r={i === 7 ? 2.6 : 1.8} fill={i === 7 ? GOLD : DOT} />
        </g>
      ))}
    </>
  );
}

/** 2 · Radar: a light sweep scans rings, blips answer */
function Radar({ id }: { id: string }) {
  return (
    <>
      {r(5).map((i) => <circle key={i} cx="160" cy="90" r={16 + i * 17} fill="none" stroke={SKY} strokeWidth=".9" opacity={0.75 - i * 0.1} strokeDasharray={i % 2 ? "2 5" : undefined} />)}
      <path d="M160 0V180M70 90H250" stroke={SKY} strokeWidth=".6" opacity=".4" />
      <g className="sa-spin" style={{ transformOrigin: "160px 90px" }}>
        <path d="M160 90 L160 6 A84 84 0 0 1 232 48 Z" fill={`url(#${id}-sweep)`} opacity=".9" />
        <path d="M160 90 L232 48" stroke={ICE} strokeWidth="1.2" />
      </g>
      {[[198, 56, 0], [126, 120, 1.2], [214, 118, 2.1], [108, 62, 3]].map(([x, y, d], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" fill={`url(#${i === 0 ? `${id}-gold` : `${id}-core`})`} className="sa-blip" style={{ animationDelay: `${d}s` }} />
          <circle cx={x} cy={y} r="1.8" fill={i === 0 ? GOLD : DOT} />
        </g>
      ))}
      <circle cx="160" cy="90" r="3" fill={DOT} />
    </>
  );
}

/** 3 · Light columns: data rises and settles like an equaliser of light */
function Columns({ id }: { id: string }) {
  const hs = [46, 70, 38, 92, 60, 118, 84, 54, 100, 66, 42, 76];
  return (
    <>
      <path d="M20 150H300" stroke={ICE} strokeWidth=".8" opacity=".5" />
      <ellipse cx="160" cy="150" rx="150" ry="10" fill={`url(#${id}-core)`} opacity=".25" />
      {hs.map((h, i) => {
        const x = 34 + i * 23;
        const gold = i === 5;
        return (
          <g key={i} className="sa-rise" style={{ animationDelay: `${-i * 0.33}s`, transformOrigin: `${x}px 150px` }}>
            <rect x={x - 5} y={150 - h} width="10" height={h} fill={`url(#${id}-col)`} />
            <rect x={x - 5} y={150 - h} width="10" height="2" fill={gold ? GOLD : DOT} />
          </g>
        );
      })}
    </>
  );
}

/** 4 · Aurora: soft ribbons of light drift across the panel */
function Aurora({ id }: { id: string }) {
  return (
    <>
      <g filter={`url(#${id}-blur)`} opacity=".85">
        <path d="M-20 120 C 60 60, 140 150, 220 80 S 320 60, 350 90" fill="none" stroke={SKY} strokeWidth="18" className="sa-drift" />
        <path d="M-20 80 C 70 130, 150 40, 240 110 S 320 120, 350 70" fill="none" stroke="#7c6bff" strokeWidth="12" opacity=".7" className="sa-drift sa-drift-2" />
        <path d="M-20 140 C 80 110, 180 160, 350 120" fill="none" stroke={GOLD} strokeWidth="6" opacity=".45" className="sa-drift sa-drift-3" />
      </g>
      <g filter={`url(#${id}-soft)`}>
        <path d="M-20 120 C 60 60, 140 150, 220 80 S 320 60, 350 90" fill="none" stroke={ICE} strokeWidth="1.2" className="sa-drift" />
      </g>
      {[[52, 40], [96, 150], [148, 30], [204, 152], [252, 36], [290, 128], [30, 96], [180, 70]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.3" fill={DOT} className="sa-twinkle" style={{ animationDelay: `${-i * 0.6}s` }} />
      ))}
    </>
  );
}

/** 5 · Orbit: a comet of light circles a glowing core */
function Orbit({ id }: { id: string }) {
  return (
    <>
      <g transform="rotate(-16 160 90)">
        {[0, 1, 2].map((i) => <ellipse key={i} cx="160" cy="90" rx={62 + i * 34} ry={20 + i * 11} fill="none" stroke={SKY} strokeWidth=".7" opacity={0.45 - i * 0.12} strokeDasharray={i === 2 ? "3 6" : undefined} />)}
        <ellipse cx="160" cy="90" rx="96" ry="31" fill="none" stroke={ICE} strokeWidth="2.2" strokeLinecap="round" pathLength="100" strokeDasharray="14 86" className="sa-comet" />
        <ellipse cx="160" cy="90" rx="130" ry="42" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" pathLength="100" strokeDasharray="5 95" className="sa-comet sa-comet-slow" />
      </g>
      <circle cx="160" cy="90" r="44" fill={`url(#${id}-core)`} opacity=".45" className="sa-breathe" />
      <circle cx="160" cy="90" r="16" fill="#ffffff" stroke={ICE} strokeWidth="1" />
      {[-8, 0, 8].map((d) => <ellipse key={d} cx="160" cy={90 + d} rx={Math.sqrt(256 - d * d)} ry="3.2" fill="none" stroke={SKY} strokeWidth=".6" opacity=".7" />)}
      <ellipse cx="160" cy="90" rx="7" ry="16" fill="none" stroke={SKY} strokeWidth=".6" opacity=".7" />
    </>
  );
}

const SCENES = [Flow, Constellation, Radar, Columns, Aurora, Orbit];
export const SIGNAL_ART_COUNT = SCENES.length;

/** Stable scene for a slug, so a story card always shows the same picture */
export const signalFor = (slug: string) => [...slug].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7) % SCENES.length;

export default function SignalArt({ variant = 0 }: { variant?: number }) {
  const i = ((variant % SCENES.length) + SCENES.length) % SCENES.length;
  const S = SCENES[i];
  const id = `sa${i}`;
  return (
    <svg viewBox="0 0 320 180" className="sa block h-auto w-full" aria-hidden="true">
      <Defs id={id} />
      <S id={id} />
    </svg>
  );
}
