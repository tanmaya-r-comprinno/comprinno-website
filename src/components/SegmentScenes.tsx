/**
 * One animated line scene per audience. Each one shows *what we do* for that
 * segment, not just a logo: research data becoming reports, sale-day spikes
 * absorbed, payments passing compliance gates, and so on.
 * Inline SVG + native SVG animation: no image files, a few KB each.
 */
import type { ReactNode } from "react";
import { iconPath, type IconName } from "./Icon";

const C = {
  line: "var(--color-line-strong)",
  flow: "var(--color-accent-line)",
  accent: "var(--color-accent)",
  ok: "var(--color-ok)",
  bg: "var(--color-bg)",
  surf: "var(--color-surface)",
  surf2: "var(--color-surface-2)",
  muted: "var(--color-muted)",
  ink: "var(--color-ink)",
};
const sw = { stroke: C.line, strokeWidth: 1.5, fill: "none" } as const;

function Scene({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 220" role="img" aria-label={label} className="viz h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

/** Draw one of our 24px icons at (x, y) with size `s`. */
function Glyph({ name, x, y, s = 24, color = C.ink }: { name: IconName; x: number; y: number; s?: number; color?: string }) {
  return (
    <path d={iconPath(name)} transform={`translate(${x} ${y}) scale(${s / 24})`} stroke={color} strokeWidth={1.5 * (24 / s)} fill="none" />
  );
}

function Packet({ path, begin = "0s", dur = "2.4s", r = 4, color = C.ok }: { path: string; begin?: string; dur?: string; r?: number; color?: string }) {
  return (
    <circle r={r} fill={color} className="packet">
      <animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" />
    </circle>
  );
}

const Tag = ({ x, y, t, w = 52 }: { x: number; y: number; t: string; w?: number }) => (
  <g>
    <rect x={x} y={y} width={w} height="20" rx="4" fill={C.bg} stroke={C.line} strokeWidth="1.2" />
    <text x={x + w / 2} y={y + 14} textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">{t}</text>
  </g>
);

/* 1 · LIFE SCIENCE: a DNA helix streams data into an AI-written report */
function helix(phase: number) {
  let d = "";
  for (let x = 30; x <= 190; x += 4) {
    const y = 80 + 30 * Math.sin(((x - 30) / 80) * Math.PI * 2 + phase);
    d += `${x === 30 ? "M" : "L"}${x} ${y.toFixed(1)}`;
  }
  return d;
}
export function LifeScienceScene() {
  const rungs = Array.from({ length: 11 }, (_, i) => 34 + i * 15);
  return (
    <Scene label="A DNA helix streaming research data into an AI-generated report">
      {rungs.map((x) => {
        const a = 80 + 30 * Math.sin(((x - 30) / 80) * Math.PI * 2);
        const b = 80 + 30 * Math.sin(((x - 30) / 80) * Math.PI * 2 + Math.PI);
        return <path key={x} d={`M${x} ${a.toFixed(1)}V${b.toFixed(1)}`} stroke={C.line} strokeWidth="1.2" />;
      })}
      <path d={helix(0)} {...sw} stroke={C.accent} />
      <path d={helix(Math.PI)} {...sw} />
      <Packet path={helix(0)} dur="3s" />
      <path d="M196 80H224" stroke={C.flow} strokeWidth="1.5" className="flow-line" />
      {/* report being written */}
      <rect x="230" y="34" width="70" height="96" rx="6" fill={C.bg} stroke={C.line} strokeWidth="1.5" />
      <Glyph name="spark" x={240} y={42} s={16} color={C.accent} />
      {[66, 80, 94, 108].map((y, i) => (
        <path key={y} d={`M242 ${y}h${i % 2 ? 34 : 46}`} stroke={C.line} strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset="1">
          <animate attributeName="stroke-dashoffset" values="1;1;0;0;1" keyTimes={`0;${0.15 + i * 0.12};${0.27 + i * 0.12};0.92;1`} dur="5s" repeatCount="indefinite" />
        </path>
      ))}
      <text x="160" y="170" textAnchor="middle" fontSize="11" fill={C.muted} fontFamily="var(--font-mono)">research → report in weeks</text>
    </Scene>
  );
}

/* 2 · RETAIL: sale-day spike, servers scale out automatically, cost stays flat */
export function RetailScene() {
  const spike = "M20 150L70 146L100 140L120 70L140 60L160 132L200 140L300 142";
  return (
    <Scene label="A sale-day traffic spike absorbed by servers that scale out automatically">
      <Glyph name="bag" x={18} y={22} s={36} color={C.ink} />
      <text x="62" y="46" fontSize="11" fill={C.muted} fontFamily="var(--font-mono)">sale day</text>
      <path d="M20 160H300" stroke={C.line} strokeWidth="1.2" />
      <path d={spike} stroke={C.accent} strokeWidth="2" pathLength={1} strokeDasharray="1" strokeDashoffset="1">
        <animate attributeName="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.45;0.9;1" dur="5s" repeatCount="indefinite" />
      </path>
      {/* servers that appear as the spike arrives */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} opacity={i === 0 ? 1 : 0}>
          <rect x={200 + i * 24} y="40" width="18" height="34" rx="3" fill={C.bg} stroke={C.line} strokeWidth="1.4" />
          <circle cx={209 + i * 24} cy="50" r="2" fill={C.ok} />
          {i > 0 && <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${0.2 + i * 0.07};${0.26 + i * 0.07};0.9;1`} dur="5s" repeatCount="indefinite" />}
        </g>
      ))}
      <text x="248" y="92" textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">auto-scale</text>
      <Tag x={20} y={176} t="cost: flat" w={74} />
      <Tag x={102} y={176} t="uptime: 100%" w={92} />
    </Scene>
  );
}

/* 3 · HEALTHCARE: a patient record sealed in an encrypted vault, heartbeat steady */
export function HealthcareScene() {
  const beat = "M20 170h90l10-20 12 34 10-28 8 14h150";
  return (
    <Scene label="A patient record locked inside an encrypted vault, with a steady heartbeat line">
      <rect x="40" y="30" width="110" height="100" rx="8" fill={C.bg} stroke={C.line} strokeWidth="1.5" />
      <Glyph name="user" x={52} y={42} s={28} color={C.ink} />
      {[50, 62].map((y) => <path key={y} d={`M88 ${y}h46`} stroke={C.line} strokeWidth="2" />)}
      {[86, 100, 114].map((y, i) => <path key={y} d={`M52 ${y}h${80 - i * 16}`} stroke={C.line} strokeWidth="2" />)}
      <path d="M150 80H200" stroke={C.flow} strokeWidth="1.5" className="flow-line" />
      <Packet path="M150 80H200" dur="1.6s" />
      {/* vault */}
      <rect x="204" y="34" width="86" height="92" rx="10" fill={C.surf} stroke={C.accent} strokeWidth="1.5" />
      <Glyph name="lock" x={229} y={56} s={36} color={C.ink} />
      <text x="247" y="114" textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">hipaa</text>
      <path d={beat} stroke={C.line} strokeWidth="1.5" />
      <path d={beat} stroke={C.ok} strokeWidth="2" pathLength={1} strokeDasharray="0.18 0.82" className="packet">
        <animate attributeName="stroke-dashoffset" values="1;0" dur="2.6s" repeatCount="indefinite" />
      </path>
    </Scene>
  );
}

/* 4 · FINTECH: payments pass through RBI / SEBI / IRDAI checkpoints before settling */
export function FintechScene() {
  const lane = "M70 96H262";
  return (
    <Scene label="Payments flowing through RBI, SEBI and IRDAI compliance checkpoints before settling">
      <rect x="18" y="72" width="52" height="48" rx="6" fill={C.bg} stroke={C.line} strokeWidth="1.5" />
      <Glyph name="card" x={28} y={80} s={32} color={C.ink} />
      <path d={lane} stroke={C.flow} strokeWidth="1.5" className="flow-line" />
      {["RBI", "SEBI", "IRDAI"].map((t, i) => {
        const x = 104 + i * 52;
        return (
          <g key={t}>
            <path d={`M${x} 64V128`} stroke={C.line} strokeWidth="1.5" strokeDasharray="3 4" />
            <Tag x={x - 24} y={136} t={t} w={48} />
            <circle cx={x} cy="56" r="8" fill={C.bg} stroke={C.ok} strokeWidth="1.5" />
            <path d={`M${x - 3.5} 56l2.5 2.5 4.5-5`} stroke={C.ok} strokeWidth="1.6" />
          </g>
        );
      })}
      <rect x="262" y="72" width="44" height="48" rx="6" fill={C.surf} stroke={C.accent} strokeWidth="1.5" />
      <Glyph name="bank" x={272} y={84} s={24} color={C.ink} />
      {[0, 0.8, 1.6].map((b) => <Packet key={b} path={lane} begin={`${b}s`} />)}
      <text x="160" y="190" textAnchor="middle" fontSize="11" fill={C.muted} fontFamily="var(--font-mono)">compliant by design</text>
    </Scene>
  );
}

/* 5 · SAAS STARTUPS: lift-off from a secure, funded launch pad */
export function StartupScene() {
  return (
    <Scene label="A rocket lifting off from a secure launch pad, with AWS credits alongside">
      {/* isometric pad */}
      <path d="M160 150l90 30-90 30-90-30z" fill={C.bg} stroke={C.line} strokeWidth="1.5" />
      <path d="M70 180v10l90 30 90-30v-10" fill={C.surf2} stroke={C.line} strokeWidth="1.5" />
      <Glyph name="shield" x={150} y={170} s={20} color={C.ok} />
      {/* exhaust */}
      <path d="M160 140V100" stroke={C.flow} strokeWidth="2" strokeDasharray="4 6" className="flow-line" />
      <g>
        <Glyph name="rocket" x={130} y={40} s={60} color={C.ink} />
        <animateTransform attributeName="transform" type="translate" values="0 10;0 -6;0 10" dur="3s" repeatCount="indefinite" />
      </g>
      {/* credits */}
      {[{ x: 44, y: 70, b: "0s" }, { x: 250, y: 56, b: "1s" }, { x: 262, y: 120, b: "2s" }].map((c) => (
        <g key={c.x}>
          <Glyph name="coin" x={c.x} y={c.y} s={22} color={C.accent} />
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="3s" begin={c.b} repeatCount="indefinite" />
        </g>
      ))}
      <text x="56" y="112" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">credits</text>
    </Scene>
  );
}

/* 6 · ISV: code → CI/CD → multi-tenant platform → AWS Marketplace */
export function IsvScene() {
  const p1 = "M58 100H104";
  const p2 = "M214 100H252";
  return (
    <Scene label="Code shipped through CI/CD into a multi-tenant platform and listed on a marketplace">
      <rect x="14" y="78" width="44" height="44" rx="6" fill={C.bg} stroke={C.line} strokeWidth="1.5" />
      <Glyph name="code" x={24} y={88} s={24} color={C.ink} />
      <path d={p1} stroke={C.flow} strokeWidth="1.5" className="flow-line" />
      <Packet path={p1} dur="1.4s" />
      {/* multi-tenant platform: three tenant layers on one base */}
      <rect x="104" y="44" width="110" height="112" rx="8" fill={C.surf} stroke={C.line} strokeWidth="1.5" />
      {["tenant a", "tenant b", "tenant c"].map((t, i) => (
        <g key={t}>
          <rect x="116" y={56 + i * 30} width="86" height="22" rx="4" fill={C.bg} stroke={i === 1 ? C.accent : C.line} strokeWidth="1.3" />
          <text x="159" y={71 + i * 30} textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">{t}</text>
          <circle cx="124" cy={67 + i * 30} r="2.5" fill={C.ok}>
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <path d={p2} stroke={C.flow} strokeWidth="1.5" className="flow-line" />
      <Packet path={p2} dur="1.4s" begin="0.7s" />
      <rect x="252" y="72" width="56" height="56" rx="6" fill={C.bg} stroke={C.accent} strokeWidth="1.5" />
      <Glyph name="store" x={264} y={82} s={32} color={C.ink} />
      <text x="36" y="144" textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">ci/cd</text>
      <text x="280" y="148" textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">marketplace</text>
    </Scene>
  );
}

/* 7 · TECH-LED ENTERPRISES: a legacy block dissolves into a network of AI agents */
export function EnterpriseScene() {
  const nodes = [
    { x: 236, y: 52 }, { x: 290, y: 90 }, { x: 270, y: 156 }, { x: 206, y: 160 }, { x: 196, y: 98 },
  ];
  const hub = { x: 246, y: 108 };
  return (
    <Scene label="A legacy system transforming into a network of AI agents across teams">
      <g>
        <rect x="24" y="46" width="96" height="120" rx="6" fill={C.surf2} stroke={C.line} strokeWidth="1.5" />
        {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={38 + c * 24} y={60 + r * 24} width="14" height="12" rx="2" fill={C.bg} stroke={C.line} strokeWidth="1" />
        )))}
        <animate attributeName="opacity" values="1;1;0.3;0.3;1" keyTimes="0;0.3;0.45;0.9;1" dur="6s" repeatCount="indefinite" />
      </g>
      <text x="72" y="186" textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">legacy</text>
      <path d="M130 106h40m-8-8l8 8-8 8" stroke={C.flow} strokeWidth="1.5" />
      {nodes.map((n) => <path key={`l${n.x}`} d={`M${hub.x} ${hub.y}L${n.x} ${n.y}`} stroke={C.flow} strokeWidth="1.3" className="flow-line" />)}
      {nodes.map((n, i) => <Packet key={`p${n.x}`} path={`M${hub.x} ${hub.y}L${n.x} ${n.y}`} begin={`${i * 0.4}s`} dur="2s" r={3} />)}
      {nodes.map((n) => <circle key={`n${n.x}`} cx={n.x} cy={n.y} r="10" fill={C.bg} stroke={C.line} strokeWidth="1.4" />)}
      <circle cx={hub.x} cy={hub.y} r="18" fill={C.surf} stroke={C.accent} strokeWidth="1.5" />
      <Glyph name="agent" x={hub.x - 11} y={hub.y - 11} s={22} color={C.ink} />
      <text x="246" y="194" textAnchor="middle" fontSize="10" fill={C.muted} fontFamily="var(--font-mono)">ai across teams</text>
    </Scene>
  );
}
