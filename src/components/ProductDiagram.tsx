/**
 * Plain-language product scenes for the home page product cards (no real
 * screenshots). One distinct metaphor per product, after the Aivar product
 * heroes, in Comprinno brand colours:
 *   Tevico    – isometric cloud stack watched by an AI agent
 *   VeriQ     – a questionnaire filling itself in
 *   VoxSphere – a live call answered by a voice agent (console view)
 *   Weave    – one agent hub orchestrating business processes
 * Pure SVG + light CSS motion (.pd-* in brand.css). viewBox 320 × 200.
 */
import type { ReactNode } from "react";
import { iconPath, type IconName } from "@/components/Icon";

const BLUE = "#006bc9";
const SKY = "#0088ff";
const NAVY = "#0a134b";
const GOLD = "#ffbb00";
const LINE = "#b9d5f0";

function Glyph({ icon, x, y, size = 14, color = BLUE, w = 2 }: { icon: IconName; x: number; y: number; size?: number; color?: string; w?: number }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}>
      <path d={iconPath(icon)} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** Glossy brand-blue core with an icon, like the glowing hub in the reference */
function Core({ x, y, icon, r = 20, id }: { x: number; y: number; icon: IconName; r?: number; id: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r + 12} fill={`url(#${id}-core)`} opacity=".14" className="pd-pulse" />
      <circle cx={x} cy={y} r={r} fill={`url(#${id}-core)`} filter={`url(#${id}-sh)`} />
      <circle cx={x} cy={y} r={r - 1} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" />
      <ellipse cx={x - r * 0.3} cy={y - r * 0.45} rx={r * 0.4} ry={r * 0.2} fill="#fff" opacity=".35" />
      <Glyph icon={icon} x={x} y={y} size={r * 0.85} color="#fff" />
    </g>
  );
}

function Label({ x, y, text, anchor = "middle", w }: { x: number; y: number; text: string; anchor?: "start" | "middle" | "end"; w: number }) {
  const left = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  return (
    <g>
      <rect x={left} y={y - 9} width={w} height="18" rx="9" fill="#fff" stroke={LINE} />
      <text x={left + w / 2} y={y + 3} fontSize="7.6" fill={NAVY} textAnchor="middle" fontWeight="500">{text}</text>
    </g>
  );
}

/* ---------- Tevico: your AWS as a layered stack, an agent watching over it ---------- */
function Tevico({ id }: { id: string }) {
  const plate = (cx: number, cy: number, s: number, fill: string, icon: IconName, label: string, k: number) => (
    <g key={label} className="pd-float" style={{ animationDelay: `${-k * 0.8}s` }}>
      <path d={`M${cx} ${cy - s / 2}L${cx + s} ${cy}L${cx} ${cy + s / 2}L${cx - s} ${cy}Z`} fill={fill} stroke="#fff" strokeWidth="1.2" />
      <path d={`M${cx - s} ${cy}V${cy + 7}L${cx} ${cy + s / 2 + 7}L${cx + s} ${cy + 7}V${cy}L${cx} ${cy + s / 2}Z`} fill={fill} opacity=".55" />
      <Glyph icon={icon} x={cx} y={cy} size={12} color="#fff" />
      <Label x={cx - s - 6} y={cy} text={label} anchor="end" w={56} />
    </g>
  );
  return (
    <>
      {plate(126, 148, 44, "#9cc6ee", "cloud", "Your AWS", 0)}
      {plate(126, 116, 38, "#5aa6eb", "shield", "Security", 1)}
      {plate(126, 86, 32, BLUE, "coin", "Costs", 2)}
      <path d="M126 70V48" stroke={BLUE} strokeWidth="1" strokeDasharray="2 3" />
      <circle cx="126" cy="40" r="2.4" fill={GOLD} className="pd-blink" />
      <path d="M222 70 L158 86" stroke={LINE} strokeDasharray="3 3" />
      <Core x={244} y={64} icon="agent" id={id} />
      <Label x={244} y={100} text="AI agents, 24/7" w={74} />
      <g className="pd-pop">
        <rect x="202" y="128" width="96" height="40" rx="8" fill="#fff" stroke={LINE} />
        <circle cx="216" cy="141" r="5" fill="#e3f6ec" /><Glyph icon="check" x={216} y={141} size={7} color="#16794a" w={3} />
        <text x="226" y="143.5" fontSize="7.4" fill={NAVY} fontWeight="600">Issue fixed</text>
        <text x="210" y="158" fontSize="6.6" fill="#6b6b6b">You approved · 2 min</text>
      </g>
    </>
  );
}

/* ---------- VeriQ: a questionnaire that fills itself in ---------- */
function VeriQ({ id }: { id: string }) {
  const rows = ["Do you encrypt data at rest?", "Who can access customer data?", "Describe your backup policy.", "Are you SOC 2 audited?"];
  return (
    <>
      <g transform="rotate(-4 120 100)">
        <rect x="46" y="26" width="150" height="152" rx="8" fill="#fff" stroke={LINE} filter={`url(#${id}-soft)`} />
        <rect x="46" y="26" width="150" height="22" rx="8" fill="#fff6dc" />
        <text x="58" y="40" fontSize="7.6" fill={NAVY} fontWeight="700">Security questionnaire</text>
        {rows.map((q, i) => {
          const y = 62 + i * 29;
          const done = i < 3;
          return (
            <g key={q}>
              <text x="58" y={y} fontSize="6.4" fill="#3d3d3d">{q}</text>
              <rect x="58" y={y + 5} width="124" height="12" rx="3" fill={done ? "#e3f0fc" : "#f4f6fa"} />
              {done ? (
                <rect x="61" y={y + 9} width={[96, 78, 104][i]} height="4" rx="2" fill={BLUE} opacity=".55" className="pd-type" style={{ animationDelay: `${i * 0.9}s` }} />
              ) : (
                <rect x="61" y={y + 9} width="2" height="5" fill={BLUE} className="pd-blink" />
              )}
              {done && <g><circle cx="188" cy={y + 11} r="5" fill="#e3f6ec" /><Glyph icon="check" x={188} y={y + 11} size={7} color="#16794a" w={3} /></g>}
            </g>
          );
        })}
      </g>
      <Core x={246} y={70} icon="spark" id={id} />
      <Label x={246} y={104} text="Drafts every answer" w={88} />
      <g className="pd-pop">
        <rect x="206" y="128" width="88" height="34" rx="8" fill="#fff" stroke={LINE} />
        <Glyph icon="eye" x={219} y={140} size={10} />
        <text x="229" y="142.5" fontSize="7" fill={NAVY} fontWeight="600">Source: Policy v3</text>
        <text x="214" y="155" fontSize="6.4" fill="#6b6b6b">You review, then send</text>
      </g>
    </>
  );
}

/* ---------- VoxSphere: a call answered by a voice agent ---------- */
function VoxSphere({ id }: { id: string }) {
  const bars = Array.from({ length: 15 }, (_, i) => 4 + Math.abs(Math.sin(i * 1.3)) * 14);
  return (
    <>
      {/* live-call console panel (web, not a mobile app) */}
      <rect x="96" y="22" width="122" height="160" rx="6" fill="#fff" stroke={LINE} filter={`url(#${id}-soft)`} />
      <rect x="96" y="22" width="122" height="20" rx="6" fill="#e3f0fc" />
      <rect x="96" y="36" width="122" height="6" fill="#e3f0fc" />
      <circle cx="106" cy="32" r="2.6" fill={BLUE} className="pd-blink" />
      <text x="113" y="34.5" fontSize="6.8" fill={NAVY} fontWeight="700">Live call</text>
      <text x="210" y="34.5" fontSize="6.4" fill="#6b6b6b" textAnchor="end">0:42</text>
      <g className="pd-bubble" style={{ animationDelay: "0s" }}>
        <text x="104" y="56" fontSize="5.4" fill="#6b6b6b">CALLER</text>
        <rect x="104" y="59" width="106" height="16" rx="4" fill="#f4f6fa" />
        <text x="110" y="70" fontSize="6.6" fill={NAVY}>Can I move my appointment?</text>
      </g>
      <g className="pd-bubble" style={{ animationDelay: "1s" }}>
        <text x="210" y="86" fontSize="5.4" fill="#6b6b6b" textAnchor="end">VOICE AGENT</text>
        <rect x="116" y="89" width="94" height="26" rx="4" fill={BLUE} />
        <text x="122" y="100" fontSize="6.6" fill="#fff">Done, moved to Friday</text>
        <text x="122" y="110" fontSize="6.6" fill="#fff">at 3 PM. Anything else?</text>
      </g>
      <g className="pd-bubble" style={{ animationDelay: "2s" }}>
        <rect x="104" y="122" width="48" height="16" rx="4" fill="#f4f6fa" />
        <text x="110" y="133" fontSize="6.6" fill={NAVY}>No, thanks!</text>
      </g>
      <path d="M96 148 H218" stroke="#eef2f8" />
      <g transform="translate(122 155)">
        {bars.map((h, i) => <rect key={i} x={i * 5.4} y={10 - h / 2} width="2.6" height={h} rx="1.2" fill={SKY} className="pd-eq" style={{ animationDelay: `${-i * 0.12}s` }} />)}
      </g>
      <Core x={62} y={78} icon="phone" id={id} />
      <Label x={62} y={112} text="Voice agent" w={60} />
      <path d="M86 80 C 92 80, 92 84, 96 84" stroke={LINE} strokeDasharray="3 3" fill="none" />
      <g className="pd-pop">
        <rect x="224" y="58" width="84" height="22" rx="11" fill="#fff" stroke={LINE} />
        <circle cx="236" cy="69" r="5" fill="#e3f6ec" /><Glyph icon="check" x={236} y={69} size={7} color="#16794a" w={3} />
        <text x="246" y="71.5" fontSize="7" fill={NAVY} fontWeight="600">Query solved</text>
        <rect x="224" y="90" width="84" height="22" rx="11" fill="#fff" stroke={LINE} />
        <Glyph icon="user" x={236} y={101} size={9} />
        <text x="246" y="103.5" fontSize="7" fill={NAVY}>Staff hand-off</text>
        <rect x="224" y="122" width="84" height="22" rx="11" fill="#fff" stroke={LINE} />
        <Glyph icon="clock" x={236} y={133} size={9} />
        <text x="246" y="135.5" fontSize="7" fill={NAVY}>Any hour</text>
      </g>
    </>
  );
}

/* ---------- Weave: one agent hub orchestrating business processes ---------- */
function Weave({ id }: { id: string }) {
  const spokes: [number, number, string, IconName][] = [
    [160, 32, "Invoices", "mail"], [256, 62, "PO matching", "layers"], [256, 138, "Expense claims", "coin"],
    [160, 168, "Reconciliation", "card"], [64, 138, "Approvals", "user"], [64, 62, "Audit trail", "eye"],
  ];
  return (
    <>
      {spokes.map(([x, y], i) => (
        <g key={i}>
          <path d={`M160 100L${x} ${y}`} stroke={LINE} strokeWidth="1" />
          <circle r="2.2" fill={i % 2 ? GOLD : BLUE}><animateMotion dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={`M160 100L${x} ${y}`} /></circle>
        </g>
      ))}
      {spokes.map(([x, y, label, icon]) => {
        const w = Math.round(30 + label.length * 4);
        const left = Math.min(Math.max(x - w / 2, 6), 314 - w);
        return (
          <g key={label}>
            <rect x={left} y={y - 11} width={w} height="22" rx="6" fill="#fff" stroke={LINE} />
            <Glyph icon={icon} x={left + 12} y={y} size={10} />
            <text x={left + 21} y={y + 2.8} fontSize="7.2" fill={NAVY} fontWeight="500">{label}</text>
          </g>
        );
      })}
      <Core x={160} y={100} icon="loop" r={24} id={id} />
    </>
  );
}

/* ---------- AWS billing: several accounts flow into one Comprinno invoice ---------- */
function Billing() {
  // vertical layout: three accounts on top, one bus down into Comprinno, then the invoice
  const accts: [string, string, IconName][] = [["prod", "$4,120", "cloud"], ["data", "$1,860", "database"], ["dev", "$640", "code"]];
  const xs = [52, 150, 248];
  const wires = xs.map((x) => `M${x} 58 V74 H150 V92`);
  return (
    <>
      {/* wires: base line + a slow pulse of light running down each one */}
      <path d="M52 74 H248 M150 74 V92" fill="none" stroke={LINE} strokeWidth="1.4" />
      {xs.map((x) => <path key={x} d={`M${x} 58 V74`} stroke={LINE} strokeWidth="1.4" />)}
      {wires.map((d, i) => (
        <path key={d} d={d} fill="none" stroke={SKY} strokeWidth="2.4" pathLength="100" strokeDasharray="16 84" className="bill-run" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
      <path d="M150 136 V156" stroke={LINE} strokeWidth="1.4" />
      <path d="M150 136 V156" stroke={GOLD} strokeWidth="2.4" pathLength="100" strokeDasharray="35 65" className="bill-run bill-run-fast" />

      {accts.map(([n, v, icon], i) => {
        const x = xs[i];
        return (
          <g key={n}>
            <rect x={x - 46} y="14" width="92" height="44" fill="#fff" stroke={LINE} />
            <rect x={x - 38} y="26" width="22" height="22" fill="#e3f0fc" />
            <Glyph icon={icon} x={x - 27} y={37} size={13} />
            <text x={x - 8} y="35" fontSize="9" fontWeight="700" fill={NAVY}>{n}</text>
            <text x={x - 8} y="47" fontSize="7.8" fill="#6b6b6b">{v}</text>
            <rect x={x - 2} y="72" width="4" height="4" fill={BLUE} />
          </g>
        );
      })}

      {/* Comprinno hub */}
      {/* logo centred in the tile */}
      <rect x="96" y="92" width="108" height="44" fill="#fff" stroke={BLUE} strokeWidth="1.6" />
      <image href="/brand/comprinno-logo.webp" x="106" y="101" width="88" height="26" preserveAspectRatio="xMidYMid meet" />

      {/* the single invoice */}
      <rect x="40" y="156" width="220" height="150" fill="#fff" stroke={LINE} />
      <text x="54" y="180" fontSize="10" fontWeight="700" fill={NAVY}>One invoice</text>
      <text x="246" y="180" fontSize="7.6" fill="#6b6b6b" textAnchor="end">All AWS accounts · Nov</text>
      {accts.map(([n, v], i) => (
        <g key={n} className="bill-line">
          <text x="54" y={202 + i * 15} fontSize="8.4" fill="#3d3d3d">{n}-account</text>
          <text x="246" y={202 + i * 15} fontSize="8.4" fill="#3d3d3d" textAnchor="end">{v}</text>
        </g>
      ))}
      <path d="M54 242 H246" stroke={LINE} />
      <text x="54" y="258" fontSize="9.4" fontWeight="700" fill={NAVY}>Total</text>
      <text x="246" y="258" fontSize="9.4" fontWeight="700" fill={NAVY} textAnchor="end">$6,620</text>
      <g className="bill-stamp">
        <rect x="54" y="266" width="192" height="16" fill="#ffbb00" />
        <text x="60" y="277.5" fontSize="8" fontWeight="700" fill="#1c1c1c">▲ Savings found</text>
        <text x="240" y="277.5" fontSize="8" fontWeight="700" fill="#1c1c1c" textAnchor="end">−$910</text>
      </g>
      <rect x="54" y="290" width="6" height="6" fill="#16a34a" className="pd-blink" />
      <text x="66" y="296" fontSize="8" fill="#3d3d3d">Engineer on call · 24/7</text>
    </>
  );
}

const SCENES: Record<string, { tint: string; el: (id: string) => ReactNode; alt: string; accent?: [string, string, string]; bg?: string; plain?: boolean; view?: string }> = {
  tevico: { tint: "#e0f2f0", el: (id) => <Tevico id={id} />, alt: "Tevico: AI agents watch your AWS costs and security around the clock, fix issues and ask you to approve." },
  veriq: { tint: "#fff6dc", el: (id) => <VeriQ id={id} />, alt: "VeriQ: a security questionnaire filling itself in, each answer drafted with its source for you to review." },
  voxsphere: { tint: "#e5f3ff", el: (id) => <VoxSphere id={id} />, alt: "VoxSphere: a voice agent answers a customer call, solves the query and hands off to staff when needed." },
  billing: { tint: "#e3f0fc", plain: true, view: "0 8 300 304", el: () => <Billing />, alt: "Your AWS accounts flow into one Comprinno invoice, with savings found and an engineer on call." },
  weave: { tint: "#f4f3ff", el: (id) => <Weave id={id} />, alt: "Weave: one agent hub runs business processes such as invoices, PO matching, expense claims and approvals." },
};

export default function ProductDiagram({ product }: { product: string }) {
  const key = product.toLowerCase();
  const s = SCENES[key];
  if (!s) return null;
  const id = `pd-${key}`;
  const [hi, mid, lo] = s.accent ?? ["#6cbcff", BLUE, "#004f96"];
  return (
    <svg viewBox={s.view ?? "0 0 320 200"} className="pd block h-full w-full" role="img" aria-label={s.alt}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor={s.tint} /></linearGradient>
        <radialGradient id={`${id}-glow`} cx=".5" cy=".5" r=".6"><stop offset="0" stopColor={mid} stopOpacity=".12" /><stop offset="1" stopColor={mid} stopOpacity="0" /></radialGradient>
        <radialGradient id={`${id}-core`} cx=".35" cy=".3" r=".9"><stop offset="0" stopColor={hi} /><stop offset=".55" stopColor={mid} /><stop offset="1" stopColor={lo} /></radialGradient>
        <filter id={`${id}-sh`} x="-60%" y="-60%" width="220%" height="240%"><feDropShadow dx="0" dy="6" stdDeviation="6" floodColor={mid} floodOpacity=".32" /></filter>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={NAVY} floodOpacity=".12" /></filter>
      </defs>
      {!s.plain && <rect width="320" height="200" fill={`url(#${id}-bg)`} />}
      {!s.plain && <rect width="320" height="200" fill={`url(#${id}-glow)`} />}
      {s.el(id)}
    </svg>
  );
}
