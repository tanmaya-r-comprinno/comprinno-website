import { Icon } from "./Icon";

/**
 * Home hero: "agent control plane".
 * An AI agent core on an isometric AWS platform, wired to four live cards that
 * show what it does: migrate, optimise cost, secure, and wait for human sign-off.
 * SVG + HTML + CSS only (no JS, no images). All numbers are illustrative.
 */
const C = {
  line: "var(--color-line-strong)",
  flow: "var(--color-accent-line)",
  accent: "var(--color-accent)",
  ok: "var(--color-ok)",
  bg: "var(--color-bg)",
  surf: "var(--color-surface)",
  surf2: "var(--color-surface-2)",
  soft: "var(--color-accent-soft)",
};

// core sits at (250,185) in a 500x400 box; wires end near each card
const wires = [
  "M250 185C200 150 170 110 140 92",
  "M250 185C300 150 330 110 360 92",
  "M250 185C200 225 170 280 140 300",
  "M250 185C300 225 330 280 360 300",
];

export default function HeroVisual() {
  return (
    <div
      className="hv relative aspect-[4/5] w-full sm:aspect-[5/4]"
      role="img"
      aria-label="Illustration: an AI agent running on AWS, connected to live cards for migration progress, falling cost, security status and a human approving an action."
    >
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* isometric AWS platform */}
        <path d="M250 290l84 28-84 28-84-28z" fill={C.bg} stroke={C.line} strokeWidth="1.5" />
        <path d="M166 318v12l84 28 84-28v-12" fill={C.surf2} stroke={C.line} strokeWidth="1.5" />
        <path d="M208 304l84 28 M292 304l-84 28" stroke={C.line} strokeWidth="0.8" strokeDasharray="2 4" />
        <text x="250" y="374" textAnchor="middle" fontSize="11" fill="var(--color-muted)" fontFamily="var(--font-mono)">running on aws</text>
        <path d="M250 250V290" stroke={C.flow} strokeWidth="1.5" strokeDasharray="3 4" className="flow-line" />

        {/* wires + travelling packets */}
        {wires.map((d) => <path key={d} d={d} stroke={C.flow} strokeWidth="1.5" className="flow-line" />)}
        {wires.map((d, i) => (
          <circle key={`p${i}`} r="4" fill={C.ok} className="packet">
            <animateMotion path={d} dur="2.8s" begin={`-${i * 0.7}s`} repeatCount="indefinite" keyPoints={i % 2 ? "0;1" : "1;0"} keyTimes="0;1" calcMode="linear" />
          </circle>
        ))}

        {/* agent core */}
        <g transform="translate(250 185)">
          <circle r="78" fill={C.soft} opacity="0.55" className="hv-breathe" />
          <g className="hv-spin">
            <circle r="64" stroke={C.line} strokeWidth="1.2" strokeDasharray="2 7" />
            <circle cx="64" r="4" fill={C.accent} />
          </g>
          <g className="hv-spin-rev">
            <circle r="48" stroke={C.flow} strokeWidth="1.2" strokeDasharray="10 6" />
            <circle cx="-48" r="3.5" fill={C.ok} />
          </g>
          <circle r="32" fill={C.bg} stroke={C.accent} strokeWidth="1.8" />
          <path d="M0 -14a2.5 2.5 0 1 0 .01 0 M-11 7a2.5 2.5 0 1 0 .01 0 M11 7a2.5 2.5 0 1 0 .01 0 M0 -9v6 M0 -3l-9 8 M0 -3l9 8" stroke="var(--color-ink)" strokeWidth="1.6" />
        </g>
        <text x="250" y="240" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--color-ink)">AI agent</text>
      </svg>

      {/* Card 1: migration wave */}
      <div className="hv-card left-0 top-[2%] sm:top-[4%]" style={{ animationDelay: "0s" }}>
        <p className="hv-label"><Icon name="migrate" className="h-3.5 w-3.5" /> Migrating</p>
        <p className="hv-value">Wave 3 of 5</p>
        <div className="hv-bar"><span /></div>
      </div>

      {/* Card 2: cost trend */}
      <div className="hv-card right-0 top-[2%] sm:top-[4%]" style={{ animationDelay: "1.2s" }}>
        <p className="hv-label"><Icon name="coin" className="h-3.5 w-3.5" /> Cloud cost</p>
        <svg viewBox="0 0 120 34" className="mt-1 h-8 w-full" fill="none" aria-hidden="true">
          <path d="M2 30H118" stroke={C.line} strokeWidth="1" strokeDasharray="2 4" />
          <path d="M2 6C24 8 36 4 52 14S86 24 118 28" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
          <path d="M2 6C24 8 36 4 52 14S86 24 118 28" stroke={C.accent} strokeWidth="2" strokeLinecap="round" pathLength={1} className="hv-draw" />
          <circle cx="118" cy="28" r="3" fill={C.ok} />
        </svg>
        <p className="hv-value">Trending down</p>
      </div>

      {/* Card 3: security */}
      <div className="hv-card bottom-[2%] left-0 sm:bottom-[16%]" style={{ animationDelay: "0.6s" }}>
        <p className="hv-label"><Icon name="shield" className="h-3.5 w-3.5" /> Security</p>
        <p className="hv-value flex items-center gap-2"><span className="pulse-dot" /> 0 critical findings</p>
      </div>

      {/* Card 4: human sign-off */}
      <div className="hv-card bottom-[2%] right-0 sm:bottom-[16%]" style={{ animationDelay: "1.8s" }}>
        <p className="hv-label"><Icon name="user" className="h-3.5 w-3.5" /> Human sign-off</p>
        <p className="hv-value">Restart api-prod?</p>
        <span className="hv-approve"><span className="a1">Approve</span><span className="a2">✓ Approved</span></span>
      </div>
    </div>
  );
}
