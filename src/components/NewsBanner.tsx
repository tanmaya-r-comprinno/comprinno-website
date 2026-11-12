/**
 * Generated banner for newsroom releases (no hand-made image needed).
 * From a release title it builds a badge-style card in the site's pastel tile
 * style: brand tint per release type, light texture, and a glossy plate that
 * reads e.g. "AWS · Competency · Data and Analytics". New releases get a
 * matching banner automatically. Pure SVG.
 */
type Spec = { main: string; light: string; deep: string; texture: "grid" | "diag" | "squares" | "fine" };
const BY_KIND: Record<string, Spec> = {
  Competency: { main: "#006bc9", light: "#e3f0fc", deep: "#004f96", texture: "grid" },
  "Service delivery": { main: "#0088ff", light: "#e5f3ff", deep: "#006bc9", texture: "squares" },
  Partnership: { main: "#2a3a8f", light: "#f4f3ff", deep: "#0a134b", texture: "diag" },
  Agreement: { main: "#d89f04", light: "#fff6dc", deep: "#a87a00", texture: "diag" },
  Certification: { main: "#2a3a8f", light: "#f4f3ff", deep: "#0a134b", texture: "squares" },
  Product: { main: "#006bc9", light: "#e3f0fc", deep: "#004f96", texture: "fine" },
};

// AWS logo from partnerLogos, split so the smile can be AWS orange
export const AWS_TEXT = "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z";
export const AWS_SMILE = "M21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z";

/** "Comprinno Achieves AWS Data and Analytics Competency" → { issuer: "AWS", label: "Data and Analytics" } */
export function bannerText(title: string, kind: string) {
  const t = title.replace(/&amp;/g, "&");
  const issuer = /openai/i.test(t) ? "OpenAI" : /\biso\b/i.test(t) ? "ISO" : /soc ?2/i.test(t) ? "AICPA" : /^tevico/i.test(t) ? "Tevico" : "AWS";
  let label = t
    .replace(/^Comprinno( Technologies)?\s+(achieves|attains|gains|joins|signs)\s+(the\s+)?/i, "")
    .replace(/^Tevico\s+/i, "")
    .replace(/\b(AWS|Amazon)\s+/gi, "")
    .replace(/\s*(Service Delivery( Program)?( badges?)?|Competency( Partner status)?( for .*)?|Partner status|certification.*|badge)$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (kind === "Agreement") label = "Strategic Collaboration Agreement";
  if (kind === "Partnership" && issuer === "OpenAI") label = "Select Partner";
  if (issuer === "ISO") label = "27001 Certified";
  if (issuer === "AICPA") label = "SOC 2 Type II";
  if (label.length > 44) label = label.slice(0, label.lastIndexOf(" ", 42)) + "…";
  return { issuer, label, caption: kind === "Service delivery" ? "Service Delivery" : kind === "Product" ? "Product news" : kind };
}

function wrap(s: string, max = 20) {
  const out: string[] = [];
  let cur = "";
  for (const w of s.split(" ")) {
    if ((cur + " " + w).trim().length > max && cur) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim();
  }
  if (cur) out.push(cur);
  return out.slice(0, 3);
}

export default function NewsBanner({ title, kind, className = "" }: { title: string; kind: string; className?: string }) {
  const c = BY_KIND[kind] ?? BY_KIND.Competency;
  const { issuer, label, caption } = bannerText(title, kind);
  const lines = wrap(label);
  const id = `nb-${kind.replace(/\W/g, "")}`;
  const r = (n: number) => Array.from({ length: n }, (_, i) => i);
  // badge plate: square with a cut top-right corner (like partner badges)
  const plate = "M104 40 H196 L224 68 V150 H104 Z";
  return (
    <svg viewBox="0 0 320 190" preserveAspectRatio="xMidYMid slice" className={`block h-full w-full ${className}`} role="img" aria-label={`${issuer} ${caption}: ${label}`}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor={c.light} /></linearGradient>
        <linearGradient id={`${id}-plate`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor={c.light} /></linearGradient>
        <filter id={`${id}-sh`} x="-40%" y="-40%" width="180%" height="190%"><feDropShadow dx="0" dy="10" stdDeviation="10" floodColor={c.deep} floodOpacity=".22" /></filter>
      </defs>
      <rect width="320" height="190" fill={`url(#${id}-bg)`} />
      {/* sharp-edged textures only: the platform has square corners everywhere */}
      {c.texture === "grid" && r(21).map((i) => <path key={i} d={`M${i * 16} 0V190M0 ${i * 16}H320`} stroke={c.main} strokeWidth=".5" opacity=".16" />)}
      {c.texture === "fine" && r(41).map((i) => <path key={i} d={`M${i * 8} 0V190M0 ${i * 8}H320`} stroke={c.main} strokeWidth=".4" opacity=".1" />)}
      {c.texture === "diag" && r(40).map((i) => <path key={i} d={`M${i * 14 - 190} 190L${i * 14} 0`} stroke={c.main} strokeWidth=".6" opacity=".16" />)}
      {c.texture === "squares" && r(22).flatMap((i) => r(13).map((j) => <rect key={`${i}-${j}`} x={i * 15 - 1} y={j * 15 - 1} width="2" height="2" fill={c.main} opacity=".28" />))}
      <rect x="84" y="24" width="152" height="142" fill={c.main} opacity=".06" />

      <g filter={`url(#${id}-sh)`}>
        <path d={plate} fill={`url(#${id}-plate)`} stroke={c.main} strokeWidth="2" />
      </g>
      {issuer === "AWS" ? (
        <g transform="translate(113 46) scale(1.25)" aria-label="AWS">
          <path d={AWS_TEXT} fill="#232f3e" />
          <path d={AWS_SMILE} fill="#ff9900" />
        </g>
      ) : (
        <text x="116" y="64" fontSize="13" fontWeight="800" fill={c.deep} letterSpacing=".5">{issuer}</text>
      )}
      <text x="116" y="90" fontSize="7" fontWeight="700" fill={c.main} letterSpacing="1.4" fontFamily="ui-monospace, Menlo, monospace">{caption.toUpperCase()}</text>
      {lines.map((l, i) => <text key={i} x="116" y={106 + i * 12} fontSize="9.5" fontWeight="600" fill="#1c1c1c">{l}</text>)}
      <text x="212" y="142" fontSize="6" fill="#6b6b6b" textAnchor="end" fontFamily="ui-monospace, Menlo, monospace">COMPRINNO</text>
    </svg>
  );
}
