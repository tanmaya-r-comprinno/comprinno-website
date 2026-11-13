/**
 * VeriQ illustrations (not real screenshots), in the shared light console style.
 * Hero: questionnaire workspace (back) + a drafted answer with citations (front).
 * Inside: Workspace, Review queue, Knowledge and agents.
 */
import { Art, Panel, Card, Float, Chip, Glyph, NAVY, BLUE, SKY, GOLD, OCHRE, GREEN, INK, MUTED, EDGE, SOFT, TINT } from "@/components/illustration/Kit";

const conf = (v: number) => (v >= 80 ? GREEN : v >= 60 ? BLUE : OCHRE);

/* ---------- Hero ---------- */
export function VeriqHero() {
  const id = "vqh";
  const qs: [string, string, number][] = [
    ["Q12", "Do you run annual penetration tests?", 92],
    ["Q13", "Is MFA enforced for all admin access?", 88],
    ["Q14", "Do you encrypt customer data at rest?", 74],
    ["Q15", "Describe your incident response plan.", 58],
  ];
  return (
    <Art id={id} w={560} h={500} label="VeriQ: a vendor security questionnaire parsed into questions, with a drafted answer citing your security policy and SOC 2 report, ready for a person to approve, edit or flag.">
      <Panel id={id} x={0} y={0} w={460} h={300} product="VeriQ" title="Vendor security questionnaire" />
      {/* progress */}
      <text x="20" y="66" fontSize="11" fill={MUTED}>212 questions parsed</text>
      <rect x="160" y="58" width="280" height="8" fill={TINT} />
      <rect x="160" y="58" width="196" height="8" fill={`url(#${id}-hbar)`} className="tv-grow" />
      {qs.map(([n, q, c], i) => {
        const y = 84 + i * 40, on = n === "Q14";
        return (
          <g key={n}>
            <rect x="20" y={y} width="420" height="32" fill={on ? TINT : "#fff"} stroke={on ? BLUE : EDGE} />
            <text x="32" y={y + 20.5} fontSize="11" fontWeight="700" fill={on ? BLUE : MUTED}>{n}</text>
            <text x="64" y={y + 20.5} fontSize="11.5" fill={INK}>{q}</text>
            <text x="428" y={y + 20.5} fontSize="11" fontWeight="700" fill={conf(c)} textAnchor="end">{c}%</text>
          </g>
        );
      })}

      <Float id={id}>
        <Card x={110} y={250} w={440} h={236} tag="DRAFT ANSWER · Q14">
          <text x="126" y="300" fontSize="12.5" fontWeight="700" fill={NAVY}>Do you encrypt customer data at rest?</text>
          <text x="126" y="324" fontSize="11.5" fill={INK}>Yes. Customer data at rest is encrypted with managed</text>
          <text x="126" y="342" fontSize="11.5" fill={INK}>keys, with access restricted by role and reviewed quarterly.</text>
          {["Security Policy v4.pdf · §3.2", "SOC 2 Report 2026.pdf · p.18"].map((c, i) => (
            <g key={c}>
              <rect x={126 + i * 196} y="358" width="186" height="24" fill={SOFT} stroke={EDGE} />
              <Glyph icon="eye" x={140 + i * 196} y={370} size={11} />
              <text x={152 + i * 196} y="374" fontSize="10.5" fill={BLUE}>{c}</text>
            </g>
          ))}
          <rect x="126" y="400" width="96" height="30" fill={NAVY} />
          <text x="174" y="419" fontSize="11.5" fontWeight="700" fill="#fff" textAnchor="middle">Approve</text>
          <rect x="230" y="400" width="70" height="30" fill="#fff" stroke={EDGE} />
          <text x="265" y="419" fontSize="11.5" fill={INK} textAnchor="middle">Edit</text>
          <rect x="308" y="400" width="110" height="30" fill="#fff" stroke={EDGE} />
          <text x="363" y="419" fontSize="11.5" fill={INK} textAnchor="middle">Flag for review</text>
          <text x="126" y="462" fontSize="10.5" fill={MUTED}>Confidence</text>
          <rect x="196" y="455" width="200" height="7" fill={TINT} />
          <rect x="196" y="455" width="148" height="7" fill={BLUE} />
          <text x="406" y="462" fontSize="10.5" fontWeight="700" fill={BLUE}>74%</text>
        </Card>
      </Float>
    </Art>
  );
}

/* ---------- 01 Workspace ---------- */
export function WorkspaceView() {
  const id = "vqw";
  const files: [string, string][] = [["Excel", "xlsx"], ["Word", "docx"], ["PDF", "pdf"], ["CSV", "csv"]];
  const qs: [string, string, number][] = [
    ["Q31", "Where is customer data stored?", 91],
    ["Q32", "How often are access reviews run?", 83],
    ["Q33", "Do you have a DPA with sub-processors?", 66],
    ["Q34", "List your business continuity tests.", 52],
  ];
  return (
    <Art id={id} label="Illustration: VeriQ questionnaire workspace with parsed questions, confidence and source passages">
      <Panel id={id} product="VeriQ" title="Workspace" sub="RFP · 148 questions" />
      <text x="20" y="68" fontSize="11" fill={MUTED}>Uploaded as</text>
      {files.map(([f], i) => <Chip key={f} x={92 + i * 62} y={54} text={f} on={i === 0} w={54} />)}
      <rect x="20" y="88" width="500" height="26" fill={SOFT} />
      <text x="32" y="105" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing=".8">#</text>
      <text x="72" y="105" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing=".8">QUESTION</text>
      <text x="508" y="105" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing=".8" textAnchor="end">CONFIDENCE</text>
      {qs.map(([n, q, c], i) => {
        const y = 114 + i * 34;
        return (
          <g key={n}>
            <text x="32" y={y + 21} fontSize="11" fontWeight="700" fill={MUTED}>{n}</text>
            <text x="72" y={y + 21} fontSize="11.5" fill={INK}>{q}</text>
            <rect x="404" y={y + 13} width="64" height="7" fill={TINT} />
            <rect x="404" y={y + 13} width={64 * c / 100} height="7" fill={conf(c)} className="tv-grow" style={{ animationDelay: `${-i * 0.5}s` }} />
            <text x="508" y={y + 21} fontSize="11" fontWeight="700" fill={conf(c)} textAnchor="end">{c}%</text>
            <path d={`M20 ${y + 34} H520`} stroke={EDGE} />
          </g>
        );
      })}

      <Float id={id}>
        <Card x={262} y={276} w={328} h={170} tag="SOURCE PASSAGE · Q31">
          <text x="278" y="320" fontSize="12.5" fontWeight="700" fill={NAVY}>Data Residency Policy.pdf · §2.1</text>
          <rect x="278" y="334" width="3" height="44" fill={GOLD} />
          <text x="290" y="348" fontSize="11.5" fill={INK}>“Customer data is stored in AWS</text>
          <text x="290" y="365" fontSize="11.5" fill={INK}>ap-south-1, with backups in-region.”</text>
          <rect x="278" y="398" width="160" height="30" fill={NAVY} />
          <text x="358" y="417" fontSize="11.5" fontWeight="700" fill="#fff" textAnchor="middle">Open at this passage</text>
        </Card>
      </Float>
    </Art>
  );
}

/* ---------- 02 Review queue ---------- */
export function ReviewView() {
  const id = "vqr";
  const rows: [string, string, number, string][] = [
    ["Q87", "Describe your key rotation schedule.", 41, "Needs review"],
    ["Q15", "Describe your incident response plan.", 58, "Needs review"],
    ["Q14", "Do you encrypt customer data at rest?", 74, "Edited"],
    ["Q12", "Do you run annual penetration tests?", 92, "Approved"],
  ];
  const st = (s: string) => (s === "Approved" ? GREEN : s === "Edited" ? BLUE : OCHRE);
  return (
    <Art id={id} label="Illustration: VeriQ review queue with low-confidence drafts first and a change history">
      <Panel id={id} product="VeriQ" title="Review queue" sub="Lowest confidence first" />
      <Chip x={20} y={54} text="Needs review · 23" on w={124} />
      <Chip x={152} y={54} text="Edited · 9" w={84} />
      <Chip x={244} y={54} text="Approved · 180" w={112} />
      {rows.map(([n, q, c, s], i) => {
        const y = 92 + i * 44;
        return (
          <g key={n}>
            <rect x="20" y={y} width="500" height="36" fill={i === 0 ? SOFT : "#fff"} stroke={i === 0 ? BLUE : EDGE} />
            <rect x="20" y={y} width="3" height="36" fill={conf(c)} />
            <text x="34" y={y + 22.5} fontSize="11" fontWeight="700" fill={MUTED}>{n}</text>
            <text x="72" y={y + 22.5} fontSize="11.5" fill={INK}>{q}</text>
            <text x="370" y={y + 22.5} fontSize="11" fontWeight="700" fill={conf(c)}>{c}%</text>
            <text x="508" y={y + 22.5} fontSize="11" fontWeight="700" fill={st(s)} textAnchor="end">{s}</text>
          </g>
        );
      })}
      {i0Pulse()}

      <Float id={id}>
        <Card x={262} y={286} w={328} h={160} tag="CHANGE HISTORY · Q14">
          {([["Drafted by agent", "2 sources cited", "spark"], ["Edited by Priya (Security)", "Added quarterly review", "user"], ["Approved by Arjun (GRC)", "Feeds future drafts", "check"]] as [string, string, "spark" | "user" | "check"][]).map(([a, b, icon], i) => (
            <g key={a}>
              <Glyph icon={icon} x={286} y={344 + i * 34} size={13} color={i === 2 ? GREEN : BLUE} />
              <text x="302" y={340 + i * 34} fontSize="11.5" fontWeight="700" fill={NAVY}>{a}</text>
              <text x="302" y={355 + i * 34} fontSize="10.5" fill={MUTED}>{b}</text>
            </g>
          ))}
        </Card>
      </Float>
    </Art>
  );

  function i0Pulse() {
    return <rect x="18" y="90" width="504" height="40" fill="none" stroke={SKY} strokeWidth="1.5" className="tv-twinkle" />;
  }
}

/* ---------- 03 Knowledge and agents ---------- */
export function KnowledgeView() {
  const id = "vqk";
  const docs: [string, string, string, boolean][] = [
    ["SOC 2 Report 2026.pdf", "Audit", "Expires Mar 2027", true],
    ["ISO 27001 Certificate.pdf", "Certificate", "Expires Aug 2027", true],
    ["Security Policy v4.pdf", "Policy", "Review Jan 2027", true],
    ["SOC 2 Report 2024.pdf", "Audit", "Expired", false],
  ];
  return (
    <Art id={id} label="Illustration: VeriQ knowledge base with include and exclude references, expiry dates and scoped agents">
      <Panel id={id} product="VeriQ" title="Knowledge" sub="Only in-date evidence" />
      <Chip x={20} y={54} text="Include" on w={74} />
      <Chip x={102} y={54} text="Exclude" w={74} />
      <Chip x={184} y={54} text="Expiring soon" w={108} />
      {docs.map(([d, tag, exp, inc], i) => {
        const y = 92 + i * 40;
        return (
          <g key={d} opacity={inc ? 1 : 0.6}>
            <rect x="20" y={y} width="500" height="32" fill="#fff" stroke={EDGE} />
            <Glyph icon="layers" x={38} y={y + 16} size={13} color={inc ? BLUE : MUTED} />
            <text x="54" y={y + 20.5} fontSize="11.5" fill={INK}>{d}</text>
            <rect x="250" y={y + 8} width={tag.length * 6.4 + 14} height="17" fill={TINT} />
            <text x="257" y={y + 20} fontSize="10" fill={BLUE}>{tag}</text>
            <text x="350" y={y + 20.5} fontSize="10.5" fill={inc ? MUTED : OCHRE}>{exp}</text>
            <text x="508" y={y + 20.5} fontSize="10.5" fontWeight="700" fill={inc ? GREEN : OCHRE} textAnchor="end">{inc ? "Include" : "Exclude"}</text>
          </g>
        );
      })}

      <Float id={id}>
        <Card x={262} y={268} w={328} h={178} tag="AGENTS">
          {([["Enterprise sales", "RFPs · all product docs"], ["Client: Acme Bank", "Bank-specific evidence only"], ["Security team", "Policies, audits, certificates"]] as [string, string][]).map(([a, b], i) => (
            <g key={a}>
              <rect x="278" y={286 + 20 + i * 40} width="296" height="34" fill={i === 0 ? TINT : SOFT} stroke={i === 0 ? BLUE : "none"} />
              <Glyph icon="agent" x={294} y={323 + i * 40} size={14} color={BLUE} />
              <text x="310" y={319 + i * 40} fontSize="11.5" fontWeight="700" fill={NAVY}>{a}</text>
              <text x="310" y={333 + i * 40} fontSize="10" fill={MUTED}>{b}</text>
            </g>
          ))}
        </Card>
      </Float>
    </Art>
  );
}
