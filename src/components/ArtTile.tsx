/**
 * Image holder for story / outcome / blog cards.
 * Flat line-art scenes on a soft grey panel: small white UI fragments (rows, bars,
 * bubbles, toggles, an orbit of chips) with thin outlines and ONE accent element
 * in brand blue or yellow. No perspective, no glossy objects.
 * The picture is chosen from the card's own content (artSpec): the topic picks the scene,
 * the title gives the label (main technology or standard), the industry gives an icon,
 * and the slug seeds small variations (bar heights, which row is highlighted…).
 * Pure SVG; reuses the existing at-* motion classes; static for reduced-motion users.
 * viewBox 320 × 180. Content stays inside x 44–276, y 22–158 so cropped (fill) tiles keep it.
 */
import { iconPath, type IconName } from "@/components/Icon";

type Accent = { main: string; light: string };
const ACCENTS = {
  blue: { main: "#006bc9", light: "#e3f0fc" },
  yellow: { main: "#d89f04", light: "#fff4d6" },
} satisfies Record<string, Accent>;

const PANEL = "#f5f7fa";
const DOT = "#d9e0ea";
const LINE = "#d3dbe6";
const SKEL = "#e7ecf2";
const MUTED = "#6b7a92";

type Scene = "orbit" | "rows" | "bars" | "scan" | "chat" | "flow" | "merge" | "toggles" | "stack";

/** What a card is about. All plain strings, so it works in server and client components. */
export type ArtInput = { slug: string; title: string; about?: string; industry?: string };

type Spec = { scene: Scene; icon: IconName; accent: keyof typeof ACCENTS; label: string; from?: string; to?: string; side: IconName; sats: IconName[]; rnd: () => number };

// which picture: first rule whose words appear in the title / service / topic
const SCENES: [RegExp, Scene[], IconName, keyof typeof ACCENTS][] = [
  [/\bcosts?\b|finops|\bbills?\b|spend|saving|cost-effective/, ["bars", "orbit"], "coin", "yellow"],
  [/secur|complian|pci|iso 27001|\bsoc ?2|sebi|\brbi\b|irdai|hipaa|regtech|\biam\b|ddos|misconfig|harden|localization|cyber/, ["rows", "toggles", "scan"], "shield", "blue"],
  [/migrat|to aws|from azure|digital ocean|\bvmc\b|cloudendure|easymigrate/, ["flow", "merge"], "migrate", "blue"],
  [/video|document|media|knowledge|query|root cause|research|clinical|insight|predict/, ["scan", "chat", "orbit"], "search", "blue"],
  [/genai|gen ai|generative|bedrock|llm|agentic|\bai\b|ai-|chat|assistant|conversation|recommend|sagemaker|comprehend|machine learning|\bml\b/, ["chat", "orbit", "scan"], "agent", "blue"],
  [/resilien|disaster|availability|reliab|failure|chaos|backup|autoscal|load balanc/, ["orbit", "toggles", "rows"], "shield", "blue"],
  [/monitor|observab|cloudwatch|prometheus|grafana|itsm|cloudops|operations|managed service|\bams\b/, ["scan", "bars"], "eye", "yellow"],
  [/landing zone|control tower|governance|governed|multi-account|foundation|environment|partner network|well.?architected|wafr|best practice/, ["toggles", "stack", "rows"], "lock", "blue"],
  [/eks|kubernetes|\becs\b|container|microservice|monolith|serverless|lambda|devops|ci\/cd|pipeline|terraform|codebuild|codecommit|moderni|cloud-native|infrastructure as code|hyperledger|blockchain/, ["stack", "orbit"], "layers", "blue"],
  [/data|analytic|aurora|\brds\b|database|lake|redshift|warehouse|\bs3\b|glacier/, ["bars", "stack"], "chart", "blue"],
];

// the short name shown on the picture: the main technology or standard in the title
const LABELS: [RegExp, string][] = [
  [/agentcore/, "AgentCore"], [/bedrock/, "Amazon Bedrock"], [/sagemaker/, "SageMaker"], [/comprehend/, "Comprehend"],
  [/redshift/, "Redshift"], [/aurora/, "Aurora"], [/\brds\b/, "Amazon RDS"], [/mongodb/, "MongoDB"], [/\bdms\b/, "AWS DMS"],
  [/eks|kubernetes/, "Amazon EKS"], [/\becs\b/, "Amazon ECS"], [/lambda/, "AWS Lambda"], [/serverless/, "Serverless"],
  [/prometheus|grafana/, "Grafana"], [/cloudwatch/, "CloudWatch"], [/resilience hub/, "Resilience Hub"], [/elastic disaster|cloudendure/, "Elastic DR"],
  [/control tower/, "Control Tower"], [/landing zone/, "Landing zone"], [/well.?architected|wafr/, "Well-Architected"],
  [/pci/, "PCI DSS"], [/iso 27001/, "ISO 27001"], [/sebi/, "SEBI"], [/\brbi\b/, "RBI"], [/irdai/, "IRDAI"], [/\biam\b/, "AWS IAM"], [/ddos/, "DDoS"],
  [/localization/, "Data residency"], [/codebuild|codecommit|codepipeline|ci\/cd/, "CI/CD"], [/terraform|infrastructure as code/, "Terraform"],
  [/hyperledger|blockchain/, "Blockchain"], [/microservice|monolith/, "Microservices"], [/s3|glacier/, "Amazon S3"],
  [/finops/, "FinOps"], [/cost explorer/, "Cost Explorer"], [/itsm/, "ITSM"], [/root cause/, "Root cause"], [/chaos/, "Chaos tests"],
  [/disaster/, "Disaster recovery"], [/video/, "Video AI"], [/document/, "Documents"], [/genai|gen ai|generative/, "GenAI"], [/agentic/, "Agentic AI"],
  [/devops/, "DevOps"], [/autoscal/, "Autoscaling"], [/governance|governed/, "Governance"], [/compliance|compliant/, "Compliance"],
];

// where a migration starts
const SOURCES: [RegExp, string, IconName][] = [
  [/bigquery/, "BigQuery", "database"], [/cosmos/, "Cosmos DB", "database"], [/azure and gcp/, "Azure + GCP", "cloud"], [/azure/, "Azure", "cloud"],
  [/gcp|google cloud/, "GCP", "cloud"], [/digital ocean/, "DigitalOcean", "cloud"], [/\bvmc\b|vmware/, "VMware", "building"],
];

// names that can be the destination of a migration
const AWS_TARGETS = ["Redshift", "Aurora", "Amazon RDS", "MongoDB", "AWS DMS", "Amazon EKS", "Amazon ECS", "AWS Lambda", "Serverless", "Amazon S3", "Elastic DR"];

const INDUSTRY: [RegExp, IconName][] = [
  [/fintech|financ|bank|payment|credit|lending|insur|index|regtech|pos /, "bank"], [/retail|commerce|consumer|fmcg|wearable|marketplace|dining/, "cart"],
  [/health|medi|clinic|care|patient/, "heart"], [/life ?science|bio|genom|pharma|research/, "dna"], [/edtech|edu|skill|learning/, "users"],
  [/hr |employee|workforce|people|gigs/, "users"], [/telematic|logistic|mobility|\bev\b|supply|iot|fleet|highway/, "pin"],
  [/manufactur|shop.?floor|mining|real estate|proptech|printing/, "building"], [/ad.?tech|publish|media|entertain|social/, "eye"],
  [/carbon|esg|climate|agri/, "spark"], [/saas|software|platform|tech/, "code"],
];

const POOL: IconName[] = ["database", "lock", "chart", "code", "users", "mail", "cloud", "clock", "search", "loop", "cube", "eye"];

const hash = (str: string) => [...str].reduce((h, ch) => (h * 33 + ch.charCodeAt(0)) >>> 0, 5381);
function seeded(seed: number) {
  let x = seed || 1;
  return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 1000) / 1000; };
}

export function artSpec({ slug, title, about = "", industry = "" }: ArtInput): Spec {
  const text = ` ${title} ${about} `.toLowerCase().replace(/&amp;/g, "&");
  const ind = ` ${industry} ${title} `.toLowerCase();
  const rnd = seeded(hash(slug));
  const hit = SCENES.find(([re]) => re.test(text));
  const [, scenes, icon, accent] = hit ?? [/./, ["orbit", "stack", "toggles"] as Scene[], "cloud" as IconName, "blue" as const];
  // several sources into one AWS estate, or one of the topic's layouts picked by the story
  const src0 = SOURCES.find(([re]) => re.test(text));
  let scene: Scene = scenes[hash(slug + "scene") % scenes.length];
  // migrations: one named source gets a single arrow, several sources (or none named) may merge
  if (scenes.includes("flow")) scene = /consolidat|multi-product|workloads into|azure and gcp/.test(text) ? "merge" : src0 ? "flow" : scene;
  const side = INDUSTRY.find(([re]) => re.test(ind))?.[1] ?? "cloud";
  const tech = LABELS.find(([re]) => re.test(text))?.[1];
  const label = tech ?? (industry && industry.length <= 18 ? industry : about || "AWS");
  const src = SOURCES.find(([re]) => re.test(text));
  const from = src?.[1] ?? (/data cent|on.?prem/.test(text) ? "Data centre" : "On-prem");
  const fromIcon: IconName = src?.[2] ?? "building";
  const to = tech && AWS_TARGETS.includes(tech) ? tech : "AWS";
  // orbit / extra chips: the industry first, then a stable shuffle of the rest
  const rest = POOL.filter((i) => i !== icon && i !== side).sort((a, b) => hash(slug + a) - hash(slug + b));
  const sats = [side, ...rest].slice(0, 6);
  return { scene, icon: scene === "flow" || scene === "merge" ? fromIcon : icon, accent, label, from, to, side, sats, rnd };
}

const CX = 160;
const CY = 90;
const INK = "#0a134b";
const FONT = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
/** generous width estimate for 8.5px semibold text, so labels never reach a box edge */
const textW = (t: string, size = 8.5) => t.length * size * 0.6;
/** shorten a label until it fits */
function fit(t: string, max: number, size = 8.5) {
  if (textW(t, size) <= max) return t;
  let out = t;
  while (out.length > 3 && textW(out + "…", size) > max) out = out.slice(0, -1);
  return out.trimEnd() + "…";
}

function Glyph({ icon, x, y, size = 14, color = MUTED, width = 1.8 }: { icon: IconName; x: number; y: number; size?: number; color?: string; width?: number }) {
  return (
    <g transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}>
      <path d={iconPath(icon)} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Txt({ x, y, t, max, color = INK, size = 8.5, anchor = "start" }: { x: number; y: number; t: string; max: number; color?: string; size?: number; anchor?: "start" | "middle" }) {
  return <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight="600" fill={color} textAnchor={anchor} className="at-label">{fit(t, max, size)}</text>;
}

/** White rounded box with a thin outline (accent outline when highlighted) */
function Box({ x, y, w, h, rx = 8, a, on = false, shadow, fill = "#fff" }: { x: number; y: number; w: number; h: number; rx?: number; a: Accent; on?: boolean; shadow?: string; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={on ? a.main : LINE} strokeWidth={on ? 1.3 : 1} filter={shadow} />;
}

const Skel = ({ x, y, w, h = 5, c = SKEL }: { x: number; y: number; w: number; h?: number; c?: string }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />;

/** Small round icon chip */
function Chip({ x, y, r = 10, icon, a, on = false }: { x: number; y: number; r?: number; icon: IconName; a: Accent; on?: boolean }) {
  return (
    <>
      <circle cx={x} cy={y} r={r} fill={on ? a.main : "#fff"} stroke={on ? a.main : LINE} />
      <Glyph icon={icon} x={x} y={y} size={r * 1.15} color={on ? "#fff" : MUTED} />
    </>
  );
}

/** Accent pill with the card's label, centred on x */
function Pill({ x, y, t, a, icon, max = 150 }: { x: number; y: number; t: string; a: Accent; icon?: IconName; max?: number }) {
  const label = fit(t, max - (icon ? 34 : 22));
  const w = textW(label) + (icon ? 34 : 22);
  const left = Math.min(Math.max(x - w / 2, 48), 272 - w);
  return (
    <g>
      <rect x={left} y={y} width={w} height="18" rx="9" fill={a.main} />
      {icon && <Glyph icon={icon} x={left + 12} y={y + 9} size={10} color="#fff" width={2.2} />}
      <Txt x={left + (icon ? 22 : 11)} y={y + 12.2} t={label} max={w} color="#fff" />
    </g>
  );
}

function SceneArt({ sp, a, sh }: { sp: Spec; a: Accent; sh: string }) {
  const { rnd, icon, label } = sp;
  switch (sp.scene) {
    case "orbit": {
      const cy = 84;
      const on = 1 + Math.floor(rnd() * 5);
      const angles = [0, 1, 2, 4, 5]; // the bottom slot holds the label
      return (
        <>
          <circle cx={CX} cy={cy} r="62" fill="none" stroke={LINE} strokeDasharray="3 5" />
          <circle cx={CX} cy={cy} r="38" fill={a.light} className="at-breathe" />
          <circle cx={CX} cy={cy} r="38" fill="none" stroke={a.main} strokeOpacity=".25" />
          {angles.map((k, i) => {
            const t = (Math.PI / 3) * k - Math.PI / 2;
            return <g key={k} className={i === on ? "at-float" : undefined}><Chip x={CX + 62 * Math.cos(t)} y={cy + 62 * Math.sin(t)} r={11} icon={sp.sats[i]} a={a} on={i === on} /></g>;
          })}
          <circle cx={CX} cy={cy} r="23" fill="#fff" stroke={a.main} strokeWidth="1.4" filter={sh} />
          <Glyph icon={icon} x={CX} y={cy} size={21} color={a.main} />
          <Pill x={CX} y={137} t={label} a={a} max={130} />
        </>
      );
    }
    case "rows": {
      const onAt = Math.floor(rnd() * 3);
      const ys = [28, 70, 116];
      const icons: IconName[] = [sp.sats[1], sp.sats[2], sp.sats[3]];
      icons[onAt] = icon;
      return (
        <>
          {ys.map((y0, i) => {
            const on = i === onAt;
            const w = on ? 200 : 176;
            const h = on ? 36 : 30;
            const y = on ? y0 - 2 : y0 + (i > onAt ? 4 : 0);
            const x = CX - w / 2;
            const cy = y + h / 2;
            return (
              <g key={i} className={on ? "at-float" : undefined}>
                <Box x={x} y={y} w={w} h={h} rx={10} a={a} on={on} shadow={on ? sh : undefined} />
                <Chip x={x + 19} y={cy} r={on ? 11 : 9} icon={icons[i]} a={a} on={on} />
                {on ? <Txt x={x + 38} y={cy - 0.5} t={label} max={w - 76} /> : <Skel x={x + 38} y={cy - 7} w={60 + Math.round(rnd() * 40)} />}
                <Skel x={x + 38} y={on ? cy + 5 : cy + 3} w={on ? 64 : 40 + Math.round(rnd() * 20)} h={4} />
                <circle cx={x + w - 18} cy={cy} r="6" fill={on ? a.main : "#eef2f6"} stroke={on ? a.main : LINE} />
                <Glyph icon="check" x={x + w - 18} y={cy} size={8} color={on ? "#fff" : MUTED} width={2.6} />
              </g>
            );
          })}
        </>
      );
    }
    case "bars": {
      const n = 4 + Math.floor(rnd() * 2);
      const gap = n === 4 ? 40 : 34;
      const bw = n === 4 ? 30 : 26;
      const x0 = CX - ((n - 1) * gap + bw) / 2;
      const fills = Array.from({ length: n }, () => 26 + Math.round(rnd() * 40));
      const on = Math.floor(rnd() * n);
      fills[on] = 78 + Math.round(rnd() * 12);
      const lineY = 150 - Math.round(fills.reduce((m, f) => m + f, 0) / n);
      return (
        <>
          {fills.map((f, i) => {
            const x = x0 + i * gap;
            const isOn = i === on;
            return (
              <g key={i}>
                <rect x={x} y={46} width={bw} height="108" rx={bw / 2} fill="#fff" stroke={isOn ? a.main : LINE} strokeWidth={isOn ? 1.3 : 1} filter={isOn ? sh : undefined} />
                <rect x={x + 4} y={150 - f} width={bw - 8} height={f} rx={(bw - 8) / 2} fill={isOn ? a.light : "#edf1f6"} stroke={isOn ? a.main : "none"} strokeOpacity=".5" />
                {isOn && <g className="at-float"><Chip x={x + bw / 2} y={150 - f + 12} r={8.5} icon={icon} a={a} on /></g>}
              </g>
            );
          })}
          <path d={`M${x0 - 14} ${lineY}H${x0 + (n - 1) * gap + bw + 14}`} stroke={a.main} strokeOpacity=".55" strokeDasharray="4 4" className="at-twinkle" />
          <path d={`M${x0 - 20} ${lineY - 5}l8 5-8 5z`} fill="#fff" stroke={a.main} strokeLinejoin="round" />
          <Pill x={x0 + on * gap + bw / 2} y={22} t={label} a={a} max={140} />
        </>
      );
    }
    case "scan": {
      const widths = [0, 1, 2, 3].map(() => 60 + Math.round(rnd() * 64));
      const bar = 92 + Math.round(rnd() * 30);
      return (
        <>
          <Box x={92} y={44} w={136} h={106} rx={10} a={a} fill="#fbfcfd" />
          <Box x={84} y={52} w={152} h={102} rx={10} a={a} shadow={sh} />
          {[0, 1, 2].map((i) => <circle key={i} cx={96 + i * 8} cy={64} r="2.4" fill={LINE} />)}
          <Chip x={218} y={64} r={7} icon={sp.side} a={a} />
          {widths.map((w, i) => <Skel key={i} x={98} y={80 + i * 16} w={w} />)}
          <g className="at-float">
            <rect x={72} y={bar - 16} width="176" height="16" fill={a.main} opacity=".07" />
            <rect x={72} y={bar} width="176" height="4" rx="2" fill={a.main} />
          </g>
          <Pill x={CX} y={24} t={label} a={a} icon={icon} max={170} />
        </>
      );
    }
    case "chat": {
      const w1 = 96 + Math.round(rnd() * 40);
      const w2 = 70 + Math.round(rnd() * 40);
      const reply = Math.min(Math.max(textW(fit(label, 120)) + 30, 96), 160);
      return (
        <>
          <Chip x={72} y={40} r={9} icon={sp.side} a={a} />
          <Box x={88} y={30} w={w1} h={20} rx={10} a={a} />
          <Skel x={98} y={37.5} w={w1 - 30} />
          <Chip x={72} y={72} r={9} icon="user" a={a} />
          <Box x={88} y={62} w={w2} h={20} rx={10} a={a} />
          <Skel x={98} y={69.5} w={w2 - 28} />
          <g className="at-float">
            <circle cx={72} cy={104} r="10" fill={a.main} />
            <Glyph icon={icon} x={72} y={104} size={12} color="#fff" />
            <Box x={88} y={93} w={reply} h={22} rx={11} a={a} on fill={a.light} />
            <Txt x={100} y={107} t={label} max={reply - 24} />
          </g>
          <Box x={64} y={128} w={192} h={24} rx={12} a={a} shadow={sh} />
          <Skel x={78} y={137.5} w={50 + Math.round(rnd() * 50)} />
          <circle cx={242} cy={140} r="8" fill={a.main} />
          <path d="M238.5 140h7M242.5 137l3 3-3 3" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    }
    case "flow": {
      const card = (x: number, name: string, ic: IconName, on: boolean) => (
        <>
          <Box x={x} y={56} w={80} h={64} rx={10} a={a} on={on} shadow={on ? sh : undefined} />
          <Chip x={x + 40} y={74} r={10} icon={ic} a={a} on={on} />
          <Txt x={x + 40} y={98} t={name} max={66} anchor="middle" />
          <Skel x={x + 20} y={106} w={40} h={4} c={on ? a.light : SKEL} />
        </>
      );
      return (
        <>
          {card(44, sp.from ?? "On-prem", icon, false)}
          {card(196, sp.to ?? "AWS", "cloud", true)}
          <path d="M124 88H138M182 88H196" stroke={a.main} strokeDasharray="3 4" />
          <path d="M191 84l5 4-5 4" fill="none" stroke={a.main} strokeLinecap="round" strokeLinejoin="round" />
          {[128, 134, 188].map((x, i) => <circle key={x} cx={x} cy={88} r="2" fill={a.main} className="at-twinkle" style={{ animationDelay: `${-i * 0.7}s` }} />)}
          <circle cx={CX} cy={88} r="28" fill={a.light} className="at-breathe" />
          <g className="at-float">
            <circle cx={CX} cy={88} r="20" fill="#fff" stroke={a.main} strokeWidth="1.4" filter={sh} />
            <Glyph icon="migrate" x={CX} y={88} size={18} color={a.main} />
          </g>
          <g opacity=".9"><Chip x={CX} y={140} r={9} icon={sp.side} a={a} /></g>
        </>
      );
    }
    case "merge": {
      const n = 2 + Math.floor(rnd() * 2);
      const names = (sp.from ?? "").includes("+") ? (sp.from ?? "").split("+").map((x) => x.trim()) : [];
      const pool = [...names, "Workloads", "Databases", "Apps"].slice(0, n);
      const icons: IconName[] = [icon, "database", "code"];
      const ys = n === 2 ? [46, 104] : [30, 76, 122];
      return (
        <>
          {ys.map((y, i) => (
            <g key={i}>
              <Box x={52} y={y} w={84} h={30} rx={9} a={a} />
              <Chip x={68} y={y + 15} r={8} icon={icons[i]} a={a} />
              <Txt x={81} y={y + 18} t={pool[i]} max={50} size={7.5} />
              <path d={`M136 ${y + 15}C160 ${y + 15} 160 90 184 90`} fill="none" stroke={a.main} strokeOpacity=".6" strokeDasharray="3 4" />
              <circle cx={148} cy={y + 15 + (90 - y - 15) * 0.3} r="2" fill={a.main} className="at-twinkle" style={{ animationDelay: `${-i * 0.8}s` }} />
            </g>
          ))}
          <circle cx={226} cy={90} r="44" fill={a.light} className="at-breathe" />
          <g className="at-float">
            <Box x={184} y={58} w={84} h={64} rx={12} a={a} on shadow={sh} />
            <Chip x={226} y={78} r={11} icon="cloud" a={a} on />
            <Txt x={226} y={103} t={sp.to ?? "AWS"} max={68} anchor="middle" />
            <Skel x={206} y={110} w={40} h={4} c={a.light} />
          </g>
        </>
      );
    }
    case "toggles": {
      const onAt = Math.floor(rnd() * 3);
      const icons: IconName[] = [sp.sats[0], sp.sats[2], sp.sats[4]];
      icons[onAt] = icon;
      const states = [rnd() > 0.5, rnd() > 0.5, true];
      return (
        <>
          {[28, 72, 116].map((y0, i) => {
            const on = i === onAt;
            const x = on ? 64 : 76;
            const w = on ? 192 : 168;
            const h = on ? 34 : 30;
            const y = on ? y0 - 2 : y0;
            const cy = y + h / 2;
            const lit = on || states[i];
            return (
              <g key={i} className={on ? "at-float" : undefined}>
                <Box x={x} y={y} w={w} h={h} rx={h / 2} a={a} on={on} shadow={on ? sh : undefined} />
                <Chip x={x + 18} y={cy} r={on ? 10 : 9} icon={icons[i]} a={a} on={on} />
                {on ? <Txt x={x + 36} y={cy + 3} t={label} max={w - 90} /> : <Skel x={x + 36} y={cy - 2.5} w={56 + Math.round(rnd() * 30)} />}
                <rect x={x + w - 42} y={cy - 7} width="26" height="14" rx="7" fill={on ? a.main : lit ? "#c9d3e0" : "#e9eef4"} />
                <circle cx={lit ? x + w - 23 : x + w - 35} cy={cy} r="5" fill="#fff" />
              </g>
            );
          })}
        </>
      );
    }
    case "stack": {
      const lines = [0, 1, 2].map(() => 70 + Math.round(rnd() * 40));
      return (
        <>
          <Box x={120} y={26} w={140} h={96} rx={10} a={a} fill="#eef2f7" />
          <Chip x={244} y={42} r={8} icon={sp.sats[2]} a={a} />
          <Box x={100} y={42} w={140} h={98} rx={10} a={a} fill="#f9fafc" />
          <Chip x={224} y={58} r={8} icon={sp.side} a={a} />
          <g className="at-float">
            <Box x={80} y={58} w={140} h={98} rx={10} a={a} shadow={sh} />
            <rect x={94} y={72} width="26" height="26" rx="7" fill={a.light} />
            <Glyph icon={icon} x={107} y={85} size={16} color={a.main} />
            <Txt x={128} y={83} t={label} max={84} />
            <Skel x={128} y={89} w={46} h={4} />
            {lines.map((w, i) => <Skel key={i} x={94} y={112 + i * 10} w={w} h={4} />)}
          </g>
          <g className="at-float" style={{ animationDelay: "-1.5s" }}>
            <circle cx={220} cy={58} r="12" fill={a.main} filter={sh} />
            <Glyph icon="check" x={220} y={58} size={12} color="#fff" width={2.6} />
          </g>
        </>
      );
    }
  }
}

export default function ArtTile({ art, className = "", fill = false }: { art: ArtInput; className?: string; fill?: boolean }) {
  const sp = artSpec(art);
  const a = ACCENTS[sp.accent];
  const id = `at${hash(art.slug).toString(36)}`;
  return (
    <div className={`art-tile ${className}`} style={{ borderColor: "#e6ebf2" }}>
      <svg viewBox="0 0 320 180" preserveAspectRatio={fill ? "xMidYMid slice" : undefined} className={`block w-full ${fill ? "h-full" : "h-auto"}`} aria-hidden="true">
        <defs>
          <pattern id={`${id}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r=".9" fill={DOT} />
          </pattern>
          <radialGradient id={`${id}-fadeg`} cx=".5" cy=".5" r=".62">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={`${id}-fade`}><rect width="320" height="180" fill={`url(#${id}-fadeg)`} /></mask>
          <filter id={`${id}-sh`} x="-30%" y="-40%" width="160%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#0a134b" floodOpacity=".09" />
          </filter>
        </defs>
        <rect width="320" height="180" fill={PANEL} />
        <rect width="320" height="180" fill={`url(#${id}-dots)`} mask={`url(#${id}-fade)`} />
        <SceneArt sp={sp} a={a} sh={`url(#${id}-sh)`} />
      </svg>
    </div>
  );
}
