/**
 * Illustrated (not real) Tevico views for the "Inside Tevico" section.
 * Futuristic but light: a white console with a faint blue grid, softly glowing
 * brand-blue data, and a white insight card floating off the corner for depth.
 * Square corners, brand colours, nothing behind the panel. One animation per
 * view: a light running along the main chart (existing bill-run keyframes).
 */
import { iconPath, type IconName } from "@/components/Icon";

const NAVY = "#0a134b";
const BLUE = "#006bc9";
const SKY = "#0088ff";
const ICE = "#9fd3ff";
const LINEC = SKY; // chart line on light
const GOLD = "#ffbb00";
const OCHRE = "#a87a00";
const TXT = NAVY;
const DIM = "#5f6b7a";
const GRID = "rgba(0,107,201,.06)";
const EDGE = "#d3e3f3";
const INK = "#1c1c1c";
const MUTED = "#5f6b7a";

function Glyph({ icon, x, y, size = 14, color = SKY }: { icon: IconName; x: number; y: number; size?: number; color?: string }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}>
      <path d={iconPath(icon)} fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/** dark console + floating card slot; ids are per view so gradients don't clash */
function Console({ id, title, sub, children, card }: { id: string; title: string; sub: string; children: React.ReactNode; card: React.ReactNode }) {
  return (
    <svg viewBox="0 0 600 460" className="pd tv-crisp block h-auto w-full" role="img" aria-label={`Illustration: Tevico ${title}`}>
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

      {/* console */}
      <rect x="0" y="0" width="540" height="380" fill={`url(#${id}-panel)`} />
      <rect x="0" y="40" width="540" height="340" fill={`url(#${id}-grid)`} />
      <rect x="0.5" y="0.5" width="539" height="379" fill="none" stroke={EDGE} />
      <path d="M0 40 H540" stroke={EDGE} />
      <path d="M0 0.5 H180" stroke={SKY} strokeWidth="2" filter={`url(#${id}-glow)`} />
      <text x="20" y="25.5" fontSize="13" fontWeight="700" fill={NAVY}>Tevico</text>
      <text x="72" y="25.5" fontSize="12" fill={BLUE}>{title}</text>
      <circle cx="430" cy="21" r="3.5" fill="none" stroke={GOLD} strokeWidth="1.5" className="tv-ring" />
      <circle cx="430" cy="21" r="3.5" fill={GOLD} filter={`url(#${id}-glow)`} />
      <text x="520" y="25" fontSize="11" fill={DIM} textAnchor="end">{sub}</text>
      {children}

      {/* floating insight card */}
      <g filter={`url(#${id}-sh)`}><g className="tv-float">{card}</g></g>
    </svg>
  );
}

/** white card frame used for the floating insight */
function Card({ x, y, w, h, tag, tagColor = BLUE, children }: { x: number; y: number; w: number; h: number; tag: string; tagColor?: string; children: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#fff" stroke={EDGE} />
      <rect x={x} y={y} width={w} height="3" fill={tagColor} />
      <text x={x + 16} y={y + 24} fontSize="10" fontWeight="700" fill={tagColor === GOLD ? OCHRE : tagColor} letterSpacing="1.2">{tag}</text>
      {children}
    </g>
  );
}

/* ---------- 01 Cost ---------- */
export function CostView() {
  const id = "tc";
  const daily = [48, 55, 52, 60, 66, 61, 70, 76, 68, 73, 82, 74, 70, 64];
  const regions: [string, number][] = [["us-east-1", 120], ["ap-south-1", 84], ["eu-west-1", 50]];
  const top = 82, base = 250, max = 90;
  const pts = daily.map((v, i) => `${30 + i * 21},${base - (v / max) * (base - top)}`).join(" ");
  return (
    <Console id={id} title="Cost" sub="Last 30 days"
      card={
        <Card x={270} y={262} w={320} h={170} tag="SAVINGS RECOMMENDATION" tagColor={GOLD}>
          <text x="286" y="310" fontSize="15" fontWeight="700" fill={NAVY}>Rightsize overprovisioned EC2</text>
          <text x="286" y="330" fontSize="11.5" fill={MUTED}>Low CPU and memory use over 14 days</text>
          <rect x="286" y="348" width="112" height="28" fill="#f5f8fd" stroke="#d3e3f3" />
          <text x="298" y="366" fontSize="12" fill={INK}>m5.2xlarge</text>
          <path d="M406 362 H424 M419 357 L424 362 L419 367" stroke={BLUE} strokeWidth="1.8" fill="none" />
          <rect x="432" y="348" width="96" height="28" fill="#e3f0fc" stroke={BLUE} />
          <text x="444" y="366" fontSize="12" fontWeight="700" fill={BLUE}>m5.large</text>
          <rect x="286" y="390" width="140" height="28" fill={NAVY} />
          <text x="356" y="408" fontSize="11.5" fontWeight="700" fill="#fff" textAnchor="middle">Send for review</text>
        </Card>
      }>
      {/* group-by */}
      {["Account", "Service", "Usage type", "Region"].map((t, i) => {
        const x = [20, 92, 160, 248][i], w = [64, 60, 80, 60][i], on = i === 1;
        return (
          <g key={t}>
            <rect x={x} y="54" width={w} height="22" fill={on ? "#e3f0fc" : "#fff"} stroke={on ? BLUE : EDGE} />
            <text x={x + w / 2} y="69" fontSize="11" fill={on ? BLUE : DIM} textAnchor="middle">{t}</text>
          </g>
        );
      })}

      {/* daily trend: glowing area + line */}
      <text x="20" y="104" fontSize="12" fontWeight="700" fill={TXT}>Daily cost trend</text>
      {daily.map((v, i) => {
        const h = (v / max) * (base - top);
        return <rect key={i} x={23 + i * 21} y={base - h} width="13" height={h} fill={`url(#${id}-bar)`} opacity={i === 10 ? 1 : 0.35} className="tv-rise" style={{ animationDelay: `${-i * 0.35}s` }} />;
      })}
      <polygon points={`30,${base} ${pts} ${30 + 13 * 21},${base}`} fill={`url(#${id}-area)`} opacity=".5" />
      <polyline points={pts} fill="none" stroke={LINEC} strokeWidth="2" filter={`url(#${id}-glow)`} />
      <polyline points={pts} fill="none" stroke={GOLD} strokeWidth="2.6" pathLength={100} strokeDasharray="12 88" className="bill-run tv-run" />
      <path d={`M20 ${base} H320`} stroke={EDGE} />

      {/* top regions */}
      <text x="350" y="104" fontSize="12" fontWeight="700" fill={TXT}>Highest-spend Regions</text>
      {regions.map(([r, w], i) => (
        <g key={r}>
          <text x="350" y={132 + i * 34} fontSize="11.5" fill={DIM}>{r}</text>
          <rect x="350" y={139 + i * 34} width={w * 1.3} height="8" fill={`url(#${id}-hbar)`} opacity={i === 0 ? 1 : 0.55} className="tv-grow" style={{ animationDelay: `${-i * 0.6}s` }} />
        </g>
      ))}
    </Console>
  );
}

/* ---------- 02 Security ---------- */
export function SecurityView() {
  const id = "ts";
  const rows: [string, string, string, string][] = [
    ["Critical", "Root account used without MFA", "IAM", GOLD],
    ["High", "S3 bucket allows public read", "Amazon S3", SKY],
    ["High", "Port 22 open to 0.0.0.0/0", "Security group", SKY],
  ];
  const pts = "200,170 245,164 290,166 335,150 380,142 425,132 470,118 520,106";
  return (
    <Console id={id} title="Security" sub="250+ checks"
      card={
        <Card x={300} y={318} w={290} h={136} tag="TOP FINDING · CRITICAL" tagColor={GOLD}>
          <text x="316" y="364" fontSize="15" fontWeight="700" fill={NAVY}>Root account used without MFA</text>
          <text x="316" y="384" fontSize="11.5" fill={MUTED}>IAM · flagged for investigation</text>
          <rect x="316" y="402" width="132" height="28" fill={NAVY} />
          <text x="382" y="420" fontSize="11.5" fontWeight="700" fill="#fff" textAnchor="middle">Assign engineer</text>
        </Card>
      }>
      {/* score ring with glow */}
      <circle cx="96" cy="140" r="58" fill="none" stroke="#e3f0fc" strokeWidth="12" />
      <circle cx="96" cy="140" r="58" fill="none" stroke={SKY} strokeWidth="12" strokeDasharray="276 364" transform="rotate(-90 96 140)" filter={`url(#${id}-glow)`} />
      <circle cx="96" cy="140" r="40" fill="none" stroke={EDGE} strokeDasharray="2 5" />
      <text x="96" y="137" fontSize="11" fill={DIM} textAnchor="middle">Security</text>
      <text x="96" y="153" fontSize="11" fill={DIM} textAnchor="middle">score</text>

      {/* history */}
      <text x="200" y="74" fontSize="12" fontWeight="700" fill={TXT}>Score history</text>
      <polygon points={`200,186 ${pts} 520,186`} fill={`url(#${id}-area)`} opacity=".6" />
      <polyline points={pts} fill="none" stroke={LINEC} strokeWidth="2" filter={`url(#${id}-glow)`} />
      <polyline points={pts} fill="none" stroke={GOLD} strokeWidth="2.6" pathLength={100} strokeDasharray="12 88" className="bill-run tv-run" />
      <path d="M200 186 H520" stroke={EDGE} />
      <text x="200" y="202" fontSize="10.5" fill={DIM}>Jan</text>
      <text x="520" y="202" fontSize="10.5" fill={DIM} textAnchor="end">Today</text>

      {/* findings */}
      {rows.map(([sev, f, res, c], i) => {
        const y = 222 + i * 30;
        return (
          <g key={f}>
            <rect x="20" y={y} width="6" height="20" fill={c} filter={`url(#${id}-glow)`} />
            <text x="36" y={y + 14.5} fontSize="11" fontWeight="700" fill={c === GOLD ? OCHRE : BLUE}>{sev}</text>
            <text x="96" y={y + 14.5} fontSize="11.5" fill={TXT}>{f}</text>
            <text x="300" y={y + 14.5} fontSize="10.5" fill={DIM}>{res}</text>
          </g>
        );
      })}
    </Console>
  );
}

/* ---------- 03 Well-Architected Review ---------- */
export function WarView() {
  const id = "tw";
  const pillars: [string, number][] = [["Operational excellence", 4], ["Security", 7], ["Reliability", 5], ["Performance efficiency", 2], ["Cost optimization", 6], ["Sustainability", 1]];
  // hexagon radar: six pillars
  const cx = 150, cy = 200, R = 88;
  const ang = (i: number) => (-90 + i * 60) * (Math.PI / 180);
  const hex = (r: number) => Array.from({ length: 6 }, (_, i) => `${cx + r * Math.cos(ang(i))},${cy + r * Math.sin(ang(i))}`).join(" ");
  const shape = pillars.map(([, n], i) => { const r = R * (0.25 + n / 9.5); return `${cx + r * Math.cos(ang(i))},${cy + r * Math.sin(ang(i))}`; }).join(" ");
  const short = ["Ops", "Security", "Reliability", "Performance", "Cost", "Sustain."];
  return (
    <Console id={id} title="AWS Well-Architected Review" sub="Six pillars"
      card={
        <Card x={300} y={250} w={290} h={182} tag="REMEDIATION PLAN">
          {([["Enable Multi-AZ for RDS", "In progress", BLUE], ["Add AWS Backup plan", "Done", "#16794a"], ["Tag for cost allocation", "Planned", OCHRE]] as [string, string, string][]).map(([t, s, c], i) => (
            <g key={t}>
              <rect x="316" y={286 + i * 44} width="258" height="36" fill={i === 0 ? "#f5f8fd" : "#fff"} stroke="#d3e3f3" />
              <rect x="316" y={286 + i * 44} width="3" height="36" fill={c} />
              <text x="330" y={308 + i * 44} fontSize="12" fill={INK}>{t}</text>
              <text x="564" y={308 + i * 44} fontSize="11" fontWeight="700" fill={c} textAnchor="end">{s}</text>
            </g>
          ))}
        </Card>
      }>
      {/* radar */}
      {[1, 0.66, 0.33].map((k) => <polygon key={k} points={hex(R * k)} fill="none" stroke={EDGE} />)}
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${cx} ${cy} L${cx + R * Math.cos(ang(i))} ${cy + R * Math.sin(ang(i))}`} stroke={GRID} />)}
      <polygon points={shape} fill="rgba(0,136,255,.12)" stroke={LINEC} strokeWidth="2" filter={`url(#${id}-glow)`} />
      <polygon points={shape} fill="none" stroke={GOLD} strokeWidth="2.6" pathLength={100} strokeDasharray="12 88" className="bill-run tv-run" />
      {short.map((t, i) => {
        const x = cx + (R + 18) * Math.cos(ang(i)), y = cy + (R + 18) * Math.sin(ang(i));
        return <text key={t} x={x} y={y + 4} fontSize="10.5" fill={DIM} textAnchor={Math.abs(Math.cos(ang(i))) < 0.2 ? "middle" : Math.cos(ang(i)) > 0 ? "start" : "end"}>{t}</text>;
      })}

      {/* findings by pillar */}
      <text x="300" y="74" fontSize="12" fontWeight="700" fill={TXT}>Findings by pillar</text>
      {pillars.map(([p, n], i) => (
        <g key={p}>
          <text x="300" y={100 + i * 22} fontSize="11" fill={DIM}>{p}</text>
          <rect x="452" y={92 + i * 22} width={n * 9} height="8" fill={`url(#${id}-hbar)`} opacity={n >= 5 ? 1 : 0.55} />
          <text x={458 + n * 9} y={100 + i * 22} fontSize="10.5" fontWeight="700" fill={n >= 5 ? NAVY : DIM}>{n}</text>
        </g>
      ))}
      <rect x="20" y="52" width="94" height="22" fill="none" stroke={EDGE} />
      <Glyph icon="layers" x={34} y={63} size={12} color={BLUE} />
      <text x="46" y="67" fontSize="10.5" fill={TXT}>Architecture</text>
    </Console>
  );
}
