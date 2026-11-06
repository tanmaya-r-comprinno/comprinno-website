/**
 * Animated line illustrations: one per idea, so a visitor "gets it" without reading.
 * Inline SVG + native SVG animation: no images, no JS, a few KB each.
 * Reduced-motion users get a still frame (Spotlight.tsx pauses SVG animations).
 */
import type { ReactNode } from "react";

const S = {
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

function Frame({ label, children, vb = "0 0 320 200" }: { label: string; children: ReactNode; vb?: string }) {
  return (
    <svg viewBox={vb} role="img" aria-label={label} className="viz h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function Packet({ path, begin = "0s", dur = "2.4s" }: { path: string; begin?: string; dur?: string }) {
  return (
    <circle r="4" fill={S.ok} className="packet">
      <animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" />
    </circle>
  );
}

/** MIGRATE: on-prem servers stream into the cloud in waves. */
export function MigrateViz() {
  const flows = ["M104 64C150 64 170 98 214 102", "M104 100H214", "M104 136C150 136 170 110 214 108"];
  return (
    <Frame label="Servers moving into the cloud in planned waves">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="24" y={50 + i * 36} width="80" height="28" rx="6" fill={S.bg} stroke={S.line} strokeWidth="1.5" />
          <circle cx="38" cy={64 + i * 36} r="3" fill={S.ok} />
          <path d={`M50 ${64 + i * 36}h40`} stroke={S.line} strokeWidth="1.5" />
        </g>
      ))}
      <text x="64" y="172" textAnchor="middle" fontSize="11" fill={S.muted} fontFamily="var(--font-mono)">on-prem</text>
      <g stroke={S.flow} strokeWidth="1.5" className="flow-line">
        {flows.map((d) => <path key={d} d={d} />)}
      </g>
      <path d="M222 140a28 28 0 0 1-4-56 36 36 0 0 1 68-6 26 26 0 0 1 4 62z" fill={S.bg} stroke={S.line} strokeWidth="1.5" />
      <path d="M240 108l9 9 18-18" stroke={S.ok} strokeWidth="2.2" />
      <text x="254" y="172" textAnchor="middle" fontSize="11" fill={S.muted} fontFamily="var(--font-mono)">cloud</text>
      {flows.map((d, i) => <Packet key={d} path={d} begin={`${i * 0.6}s`} />)}
    </Frame>
  );
}

/** MODERNIZE: a monolith breaks into small, independent services. */
export function ModernizeViz() {
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <Frame label="A monolith application breaking into small independent services">
      <g>
        <rect x="30" y="44" width="92" height="112" rx="10" fill={S.surf} stroke={S.line} strokeWidth="1.5" />
        {[64, 84, 104, 124].map((y) => <path key={y} d={`M46 ${y}h60`} stroke={S.line} strokeWidth="1.5" />)}
        <animate attributeName="opacity" values="1;1;0.25;0.25;1" keyTimes="0;0.3;0.42;0.9;1" dur="6s" repeatCount="indefinite" />
      </g>
      <path d="M134 100h34m-8-8l8 8-8 8" stroke={S.flow} strokeWidth="1.5" />
      {cells.map((i) => {
        const x = 186 + (i % 2) * 54;
        const y = 44 + Math.floor(i / 2) * 40;
        const t = 0.34 + i * 0.06;
        return (
          <g key={i} opacity="0">
            <rect x={x} y={y} width="44" height="30" rx="7" fill={S.bg} stroke={S.line} strokeWidth="1.5" />
            <circle cx={x + 12} cy={y + 15} r="3" fill={S.ok} />
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${t};${t + 0.06};0.9;1`} dur="6s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="-50 0;-50 0;0 0;0 0;0 0" keyTimes={`0;${t};${t + 0.06};0.9;1`} dur="6s" repeatCount="indefinite" />
          </g>
        );
      })}
    </Frame>
  );
}

/** MANAGE: a shield with radar rings and a live heartbeat: watched 24×7. */
export function ManageViz() {
  return (
    <Frame label="A shield with radar rings and a heartbeat line: your cloud watched around the clock">
      {[0, 1].map((i) => (
        <circle key={i} cx="160" cy="88" r="40" stroke={S.flow} strokeWidth="1.5" className="packet">
          <animate attributeName="r" values="40;96" dur="3s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="3s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <path d="M160 32l46 16v34c0 28-20 46-46 54-26-8-46-26-46-54V48z" fill={S.bg} stroke={S.line} strokeWidth="1.5" />
      <path d="M142 86l12 12 24-24" stroke={S.ok} strokeWidth="2.4" />
      <path d="M14 176h96l10-18 12 32 10-26 8 12h156" stroke={S.line} strokeWidth="1.5" />
      <path d="M14 176h96l10-18 12 32 10-26 8 12h156" stroke={S.ok} strokeWidth="2" pathLength={1} strokeDasharray="0.18 0.82" className="packet">
        <animate attributeName="stroke-dashoffset" values="1;0" dur="2.6s" repeatCount="indefinite" />
      </path>
      <text x="276" y="40" fontSize="11" fill={S.muted} fontFamily="var(--font-mono)">24×7</text>
    </Frame>
  );
}

/** MAXIMIZE: one agent coordinating your systems. */
export function MaximizeViz() {
  const sats = [
    { x: 58, y: 42, t: "tickets" },
    { x: 262, y: 42, t: "logs" },
    { x: 40, y: 140, t: "data" },
    { x: 280, y: 140, t: "cloud" },
    { x: 160, y: 182, t: "crm" },
  ];
  return (
    <Frame label="One AI agent at the centre coordinating tickets, logs, data, cloud and CRM">
      {sats.map((s) => <path key={s.t} d={`M160 100L${s.x} ${s.y}`} stroke={S.flow} strokeWidth="1.5" className="flow-line" />)}
      {sats.map((s, i) => <Packet key={`p${s.t}`} path={`M160 100L${s.x} ${s.y}`} begin={`${i * 0.45}s`} dur="2.2s" />)}
      {sats.map((s) => (
        <g key={`n${s.t}`}>
          <rect x={s.x - 28} y={s.y - 12} width="56" height="24" rx="12" fill={S.bg} stroke={S.line} strokeWidth="1.5" />
          <text x={s.x} y={s.y + 4} textAnchor="middle" fontSize="10.5" fill={S.muted} fontFamily="var(--font-mono)">{s.t}</text>
        </g>
      ))}
      <circle cx="160" cy="100" r="30" fill={S.surf} stroke={S.accent} strokeWidth="1.5" />
      <circle cx="160" cy="100" r="30" stroke={S.accent} strokeWidth="1.5" className="packet">
        <animate attributeName="r" values="30;42" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="160" y="104" textAnchor="middle" fontSize="12" fontWeight="600" fill={S.ink}>agent</text>
    </Frame>
  );
}

/** DELIVERY: four phases on one continuous loop, each lighting up in turn. */
export function PhaseLoop({ labels }: { labels: string[] }) {
  const pos = [
    { x: 180, y: 50 },
    { x: 280, y: 150 },
    { x: 180, y: 250 },
    { x: 80, y: 150 },
  ];
  const loop = "M180 50a100 100 0 1 1-.01 0";
  return (
    <Frame label={`A continuous loop of four phases: ${labels.join(", ")}`} vb="0 0 360 300">
      <circle cx="180" cy="150" r="100" stroke={S.line} strokeWidth="1.5" strokeDasharray="4 6" />
      <text x="180" y="146" textAnchor="middle" fontSize="13" fontWeight="600" fill={S.ink}>one team</text>
      <text x="180" y="164" textAnchor="middle" fontSize="11" fill={S.muted} fontFamily="var(--font-mono)">one loop</text>
      {pos.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="32" fill={S.bg} stroke={S.line} strokeWidth="1.5" />
          <circle cx={p.x} cy={p.y} r="32" fill={S.surf2} stroke={S.accent} strokeWidth="1.5" opacity={i === 0 ? 1 : 0}>
            <animate
              attributeName="opacity"
              calcMode="discrete"
              values={i === 0 ? "1;0" : "0;1;0"}
              keyTimes={i === 0 ? "0;0.25" : `0;${i / 4};${(i + 1) / 4}`}
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={S.ink}>{labels[i]}</text>
        </g>
      ))}
      <circle r="6" fill={S.ok} className="packet">
        <animateMotion path={loop} dur="8s" repeatCount="indefinite" />
      </circle>
    </Frame>
  );
}

export const serviceViz: Record<string, () => ReactNode> = {
  migrate: MigrateViz,
  modernize: ModernizeViz,
  manage: ManageViz,
  maximize: MaximizeViz,
};

/** Placeholder for a real photo/screenshot in the high-fidelity phase. */
export function ImageSlot({ label, ratio = "aspect-[16/10]" }: { label: string; ratio?: string }) {
  return (
    <div className={`bg-grid flex ${ratio} w-full flex-col items-center justify-center gap-3 rounded-md border border-dashed border-line-strong bg-surface text-muted`}>
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 5h18v14H3z M3 16l5-5 4 4 3-3 6 6 M15.5 9.5a1.5 1.5 0 1 0 0-.01" />
      </svg>
      <span className="font-mono text-xs">image · {label}</span>
    </div>
  );
}
