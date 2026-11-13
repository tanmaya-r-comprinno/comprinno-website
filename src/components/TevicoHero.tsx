/**
 * Tevico hero: an illustrated overview (not a real screenshot), split into two
 * overlapping cards so the text stays readable:
 *   back  – the overview: cost by service with a savings recommendation, and security
 *   front – how Comprinno operates: an alert picked up by an engineer, and every
 *           change going through your approval before it is applied and logged.
 * Brand colours, square corners, one animation (the live-monitoring dot).
 */
import { iconPath, type IconName } from "@/components/Icon";

const BLUE = "#006bc9";
const SKY = "#0088ff";
const NAVY = "#0a134b";
const GOLD = "#ffbb00";
const OCHRE = "#b98800";
const LINE = "#d3e3f3";
const MUTED = "#5f6b7a";
const INK = "#1c1c1c";
const SOFT = "#f5f8fd";

function Glyph({ icon, x, y, size = 14, color = BLUE }: { icon: IconName; x: number; y: number; size?: number; color?: string }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}>
      <path d={iconPath(icon)} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export default function TevicoHero() {
  const spend: [string, number][] = [["Amazon EC2", 104], ["Amazon RDS", 70], ["Amazon S3", 42], ["Data transfer", 26]];
  const sev: [string, number, string][] = [["Critical", 22, NAVY], ["High", 46, BLUE], ["Medium", 74, SKY]];
  const flow: [string, string, IconName][] = [["Finding", "Idle capacity", "search"], ["Engineer", "Proposes fix", "users"], ["You", "Approve", "check"], ["Applied", "Logged", "lock"]];

  return (
    <svg viewBox="0 0 560 494" className="pd tv-crisp block h-auto w-full" role="img" aria-label="Tevico overview: cost by service with savings recommendations and security findings across your AWS accounts; alerts are picked up by Comprinno engineers, and every change is approved by you before it is applied and logged.">
      <defs>
        <filter id="tv-sh" x="-10%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor={NAVY} floodOpacity=".12" />
        </filter>
        <linearGradient id="tv-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f3f8fe" />
        </linearGradient>
        <pattern id="tv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(0,107,201,.06)" />
        </pattern>
        <linearGradient id="tv-hbar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={BLUE} />
          <stop offset="1" stopColor="#9fd3ff" />
        </linearGradient>
        <linearGradient id="tv-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY} stopOpacity=".22" />
          <stop offset="1" stopColor={SKY} stopOpacity="0" />
        </linearGradient>
        <filter id="tv-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>


      {/* ---------- BACK CARD: overview ---------- */}
      <g>
        <rect x="16" y="16" width="440" height="290" fill="url(#tv-panel)" />
        <rect x="16" y="52" width="440" height="254" fill="url(#tv-grid)" />
        <rect x="16.5" y="16.5" width="439" height="289" fill="none" stroke={LINE} />
        <path d="M16 52 H456" stroke={LINE} />
        <path d="M16 17 H176" stroke={SKY} strokeWidth="2" filter="url(#tv-glow)" />
        <text x="32" y="39" fontSize="13" fontWeight="700" fill={NAVY}>Tevico</text>
        <text x="84" y="39" fontSize="11" fill={BLUE}>All AWS accounts</text>
        <circle cx="352" cy="34" r="4" fill="none" stroke={GOLD} strokeWidth="1.5" className="tv-ring" />
        <circle cx="352" cy="34" r="4" fill={GOLD} filter="url(#tv-glow)" />
        <text x="362" y="38" fontSize="10.5" fill={MUTED}>Monitoring</text>

        {/* cost */}
        <Glyph icon="coin" x={40} y={74} size={14} />
        <text x="54" y="78.5" fontSize="12.5" fontWeight="700" fill={NAVY}>Cost by service</text>
        {spend.map(([name, w], i) => (
          <g key={name}>
            <text x="32" y={106 + i * 24} fontSize="10.5" fill={INK}>{name}</text>
            <rect x="112" y={97 + i * 24} width={w} height="11" fill="url(#tv-hbar)" opacity={i === 0 ? 1 : 0.45} className="tv-grow" style={{ animationDelay: `${-i * 0.6}s` }} />
          </g>
        ))}
        <rect x="32" y="196" width="196" height="40" fill="#fff8e1" />
        <rect x="32" y="196" width="3" height="40" fill={GOLD} />
        <text x="44" y="211" fontSize="9" fontWeight="700" fill={OCHRE} letterSpacing=".8">SAVINGS FOUND</text>
        <text x="44" y="228" fontSize="11" fill={NAVY}>Rightsize idle EC2</text>

        <path d="M242 64 V290" stroke={LINE} />

        {/* security */}
        <Glyph icon="shield" x={264} y={74} size={14} />
        <text x="278" y="78.5" fontSize="12.5" fontWeight="700" fill={NAVY}>Security</text>
        <circle cx="296" cy="132" r="28" fill="none" stroke="#e3f0fc" strokeWidth="8" />
        <circle cx="296" cy="132" r="28" fill="none" stroke={SKY} strokeWidth="8" strokeDasharray="132 176" transform="rotate(-90 296 132)" filter="url(#tv-glow)" />
        <text x="296" y="136" fontSize="10" fontWeight="700" fill={NAVY} textAnchor="middle">Score</text>
        {sev.map(([s, w, c], i) => (
          <g key={s}>
            <text x="340" y={112 + i * 20} fontSize="10.5" fill={INK}>{s}</text>
            <rect x="388" y={103 + i * 20} width={w * 0.8} height="10" fill={c === NAVY ? NAVY : "url(#tv-hbar)"} opacity={c === SKY ? 0.55 : 1} />
          </g>
        ))}
        <text x="258" y="190" fontSize="10" fill={MUTED}>250+ checks · score over time</text>
        <polygon points="258,232 258,228 286,222 314,224 342,214 370,208 398,200 440,194 440,232" fill="url(#tv-area)" />
        <polyline points="258,228 286,222 314,224 342,214 370,208 398,200 440,194" fill="none" stroke={SKY} strokeWidth="2" filter="url(#tv-glow)" />
        <polyline points="258,228 286,222 314,224 342,214 370,208 398,200 440,194" fill="none" stroke={GOLD} strokeWidth="2.6" pathLength={100} strokeDasharray="12 88" className="bill-run tv-run" />
        <path d="M258 232 H440" stroke={LINE} />
      </g>

      {/* ---------- FRONT CARD: how Comprinno operates ---------- */}
      <g transform="translate(0 24)">
      <g className="tv-float">
      <g filter="url(#tv-sh)">
        <rect x="120" y="226" width="424" height="228" fill="#fff" stroke={LINE} />
      </g>
      <rect x="120" y="226" width="424" height="4" fill={BLUE} />

      {/* alert picked up */}
      <text x="138" y="256" fontSize="12.5" fontWeight="700" fill={NAVY}>Alert, picked up by an engineer</text>
      <rect x="138" y="268" width="190" height="44" fill={SOFT} />
      <rect x="138" y="268" width="3" height="44" fill={GOLD} />
      <text x="150" y="286" fontSize="11" fontWeight="700" fill={NAVY}>RDS CPU high</text>
      <text x="150" y="302" fontSize="9.5" fill={MUTED}>Production database</text>
      <path d="M332 290 H346 M342 286 L346 290 L342 294" stroke={BLUE} strokeWidth="1.6" fill="none" />
      <rect x="350" y="268" width="176" height="44" fill="#e3f0fc" />
      <Glyph icon="user" x={366} y={290} size={14} />
      <text x="380" y="286" fontSize="11" fontWeight="700" fill={BLUE}>Engineer assigned</text>
      <text x="380" y="302" fontSize="9.5" fill={MUTED}>Following the runbook</text>

      {/* approval flow */}
      <text x="138" y="342" fontSize="12.5" fontWeight="700" fill={NAVY}>Every change, with your approval</text>
      {flow.map(([t, s, icon], i) => {
        const x = 138 + i * 99;
        const you = i === 2, last = i === 3;
        return (
          <g key={t}>
            <rect x={x} y="354" width="86" height="82" fill={last ? "#e3f0fc" : you ? "#fff8e1" : SOFT} stroke={you ? GOLD : last ? BLUE : "none"} strokeWidth="1.5" />
            <Glyph icon={icon} x={x + 18} y={376} size={16} color={you ? OCHRE : BLUE} />
            <text x={x + 10} y="408" fontSize="11.5" fontWeight="700" fill={last ? BLUE : NAVY}>{t}</text>
            <text x={x + 10} y="424" fontSize="10" fill={MUTED}>{s}</text>
            {you && <rect x={x - 3} y="351" width="92" height="88" fill="none" stroke={GOLD} strokeWidth="1.5" className="tv-twinkle" />}
            {i < 3 && <path d={`M${x + 88} 395 H${x + 97} M${x + 93} 391 L${x + 97} 395 L${x + 93} 399`} stroke={BLUE} strokeWidth="1.6" fill="none" />}
          </g>
        );
      })}
      </g>
      </g>
    </svg>
  );
}
