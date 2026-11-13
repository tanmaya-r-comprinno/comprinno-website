/**
 * VoxSphere illustrations (not real screenshots), in the shared light console style.
 * Hero: a live call console with an overlapping "agent actions" card.
 * Inside: dashboards and analytics, the two voice pipelines, self-service setup.
 */
import { Art, BLUE, Card, Chip, EDGE, Float, GOLD, GREEN, Glyph, INK, MUTED, NAVY, OCHRE, Panel, SKY, SOFT, TINT, Trend } from "@/components/illustration/Kit";

/** animated waveform */
function Wave({ x, y, n = 22, gap = 5, h = 18 }: { x: number; y: number; n?: number; gap?: number; h?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const v = 4 + Math.abs(Math.sin(i * 1.27)) * h;
        return <rect key={i} x={x + i * gap} y={y - v / 2} width="2.6" height={v} fill={SKY} className="pd-eq" style={{ animationDelay: `${-i * 0.11}s` }} />;
      })}
    </g>
  );
}

/** transcript bubble: speaker label + text lines */
function Turn({ x, y, w, who, lang, lines, agent = false }: { x: number; y: number; w: number; who: string; lang: string; lines: string[]; agent?: boolean }) {
  const h = 14 + lines.length * 15;
  return (
    <g>
      <text x={x} y={y - 6} fontSize="9.5" fontWeight="700" fill={agent ? BLUE : MUTED} letterSpacing=".8">{who}</text>
      <text x={x + who.length * 6.6 + 6} y={y - 6} fontSize="9" fill={MUTED}>{lang}</text>
      <rect x={x} y={y} width={w} height={h} fill={agent ? TINT : SOFT} stroke={agent ? BLUE : "none"} strokeOpacity=".35" />
      {agent && <rect x={x} y={y} width="3" height={h} fill={BLUE} />}
      {lines.map((l, i) => <text key={l} x={x + 12} y={y + 18 + i * 15} fontSize="11.5" fill={agent ? NAVY : INK}>{l}</text>)}
    </g>
  );
}

/* ---------------- HERO ---------------- */
export function VoxsphereHero() {
  const id = "vh";
  const actions: [string, string, string, string][] = [
    ["check", "Account verified", "Last 4 digits matched", GREEN],
    ["code", "get_emi_status()", "Due 5 Nov · ₹4,250 · unpaid", BLUE],
    ["mail", "Payment link sent", "SMS to registered mobile", BLUE],
  ];
  return (
    <Art id={id} w={560} h={494} label="VoxSphere live call: a voice agent handles a Hindi and English support call, checks the account with a tool call, sends a payment link and logs the outcome.">
      <Panel id={id} x={16} y={16} w={440} h={300} product="VoxSphere" title="Live call" sub="0:48" />
      {/* call meta */}
      <Chip x={32} y={68} text="Inbound · Support" on w={118} />
      <Chip x={156} y={68} text="Hindi + English" w={104} />
      <Wave x={300} y={79} n={24} gap={5.6} h={14} />

      <Turn x={32} y={122} w={250} who="CALLER" lang="Hindi" lines={["Meri EMI ka payment fail ho gaya."]} />
      <Turn x={150} y={172} w={290} who="VOICE AGENT" lang="Hindi" agent lines={["Main abhi check karti hoon. Aapki EMI", "₹4,250 hai, link SMS par bhej doon?"]} />
      <Turn x={32} y={240} w={180} who="CALLER" lang="English" lines={["Yes, please send it."]} />

      {/* front card: what the agent did */}
      <Float id={id}>
        <Card x={250} y={262} w={294} h={216} tag="AGENT ACTIONS">
          {actions.map(([icon, t, s, c], i) => {
            const y = 290 + i * 46;
            return (
              <g key={t}>
                <rect x={266} y={y} width={262} height={38} fill={i === 1 ? SOFT : "#fff"} stroke={EDGE} />
                <rect x={266} y={y} width="3" height={38} fill={c} />
                <Glyph icon={icon as "check"} x={284} y={y + 19} size={13} color={c} />
                <text x={298} y={y + 16} fontSize="11.5" fontWeight="700" fill={NAVY}>{t}</text>
                <text x={298} y={y + 30} fontSize="10" fill={MUTED}>{s}</text>
              </g>
            );
          })}
          <rect x={266} y={430} width={262} height={34} fill="#e8f5ee" stroke={GREEN} />
          <text x={280} y={451} fontSize="11.5" fontWeight="700" fill={GREEN}>Resolved · no hand-off needed</text>
        </Card>
      </Float>
    </Art>
  );
}

/* ---------------- 01 Dashboards and analytics ---------------- */
export function DashboardView() {
  const id = "v1";
  const calls = [42, 55, 49, 63, 71, 66, 80, 76, 88, 84];
  const base = 200;
  return (
    <Art id={id} label="Illustration: VoxSphere dashboard with call volume, latency and quality, and a post-call summary with extracted keywords logged to Amazon CloudWatch.">
      <Panel id={id} product="VoxSphere" title="Dashboard" sub="Last 7 days" />
      <Chip x={20} y={54} text="Support" on w={70} />
      <Chip x={96} y={54} text="Collections" w={86} />
      <Chip x={188} y={54} text="Outbound" w={76} />

      {/* call volume */}
      <text x="20" y="104" fontSize="12" fontWeight="700" fill={NAVY}>Call volume</text>
      {calls.map((v, i) => {
        const h = (v / 90) * 80;
        return <rect key={i} x={22 + i * 18} y={base - h} width="11" height={h} fill={`url(#${id}-bar)`} opacity={i === 8 ? 1 : 0.4} className="tv-rise" style={{ animationDelay: `${-i * 0.3}s` }} />;
      })}
      <path d={`M20 ${base} H200`} stroke={EDGE} />

      {/* latency */}
      <text x="226" y="104" fontSize="12" fontWeight="700" fill={NAVY}>Response latency</text>
      <Trend id={id} points="226,170 252,162 278,166 304,150 330,154 356,144 382,146" base={200} />
      <path d="M226 200 H382" stroke={EDGE} />
      <text x="226" y="216" fontSize="10" fill={MUTED}>Voice-to-voice, per turn</text>

      {/* quality */}
      <text x="408" y="104" fontSize="12" fontWeight="700" fill={NAVY}>Quality</text>
      <circle cx="462" cy="156" r="36" fill="none" stroke={TINT} strokeWidth="9" />
      <circle cx="462" cy="156" r="36" fill="none" stroke={SKY} strokeWidth="9" strokeDasharray="190 226" transform="rotate(-90 462 156)" filter={`url(#${id}-glow)`} />
      <text x="462" y="153" fontSize="10" fill={MUTED} textAnchor="middle">Call</text>
      <text x="462" y="166" fontSize="10" fill={MUTED} textAnchor="middle">score</text>

      {/* turns logged */}
      <text x="20" y="246" fontSize="12" fontWeight="700" fill={NAVY}>Logged to Amazon CloudWatch</text>
      {[["Turn 6", "Caller asks to move EMI date"], ["Tool", "update_due_date()"], ["Turn 7", "Agent confirms new date"]].map(([k, v], i) => (
        <g key={k + v}>
          <rect x="20" y={258 + i * 34} width="230" height="28" fill={i === 1 ? TINT : "#fff"} stroke={EDGE} />
          <text x="30" y={276 + i * 34} fontSize="10" fontWeight="700" fill={i === 1 ? BLUE : MUTED}>{k}</text>
          <text x="80" y={276 + i * 34} fontSize="11" fill={INK}>{v}</text>
        </g>
      ))}

      <Float id={id}>
        <Card x={270} y={236} w={320} h={210} tag="POST-CALL SUMMARY">
          <text x="286" y="282" fontSize="14" fontWeight="700" fill={NAVY}>EMI date moved to 12 Dec</text>
          <text x="286" y="302" fontSize="11.5" fill={MUTED}>Customer confirmed. Reminder scheduled.</text>
          <text x="286" y="330" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">KEYWORDS</text>
          <Chip x={286} y={340} text="EMI" w={46} />
          <Chip x={338} y={340} text="reschedule" w={84} />
          <Chip x={428} y={340} text="salary date" w={88} />
          <path d="M286 378 H574" stroke={EDGE} />
          <text x="286" y="400" fontSize="11" fill={INK}>Sentiment</text>
          <rect x="370" y="392" width="190" height="8" fill={TINT} />
          <rect x="370" y="392" width="140" height="8" fill={`url(#${id}-hbar)`} className="tv-grow" />
          <text x="286" y="426" fontSize="11" fill={INK}>Outcome</text>
          <text x="370" y="426" fontSize="11" fontWeight="700" fill={GREEN}>Resolved by agent</text>
        </Card>
      </Float>
    </Art>
  );
}

/* ---------------- 02 Two voice pipelines ---------------- */
export function PipelinesView() {
  const id = "v2";
  const node = (x: number, y: number, w: number, t: string, s: string, hot = false) => (
    <g>
      <rect x={x} y={y} width={w} height="44" fill={hot ? TINT : "#fff"} stroke={hot ? BLUE : EDGE} />
      <text x={x + 10} y={y + 19} fontSize="11.5" fontWeight="700" fill={hot ? BLUE : NAVY}>{t}</text>
      <text x={x + 10} y={y + 34} fontSize="10" fill={MUTED}>{s}</text>
    </g>
  );
  const arrow = (x1: number, x2: number, y: number) => (
    <g>
      <path d={`M${x1} ${y} H${x2}`} stroke={SKY} strokeWidth="1.6" />
      <path d={`M${x2 - 5} ${y - 4} L${x2} ${y} L${x2 - 5} ${y + 4}`} stroke={SKY} strokeWidth="1.6" fill="none" />
    </g>
  );
  return (
    <Art id={id} label="Illustration: VoxSphere's two voice pipelines. Unified speech-to-speech with Amazon Nova Sonic 2, and a modular pipeline with Deepgram Nova-3, Amazon Nova 2 Lite and ElevenLabs Flash 3, sharing knowledge, tools, memory and guardrails.">
      <Panel id={id} product="VoxSphere" title="Pipelines" sub="Same AWS foundation" dotX={384} />

      {/* A: unified */}
      <text x="20" y="72" fontSize="10" fontWeight="700" fill={BLUE} letterSpacing="1">A · UNIFIED SPEECH-TO-SPEECH</text>
      {node(20, 84, 96, "Caller", "Audio in / out")}
      <path d="M118 100 H190 M118 112 H190" stroke={SKY} strokeWidth="1.6" />
      <path d="M185 96 L190 100 L185 104 M123 108 L118 112 L123 116" stroke={SKY} strokeWidth="1.6" fill="none" />
      <path d="M118 100 H190" stroke={GOLD} strokeWidth="2.4" pathLength={100} strokeDasharray="14 86" className="bill-run tv-run" />
      {node(192, 84, 196, "Amazon Nova Sonic 2", "Listens, reasons, speaks", true)}
      <text x="402" y="102" fontSize="11" fill={INK}>One bidirectional stream</text>
      <text x="402" y="118" fontSize="11" fill={MUTED}>Hindi and English</text>

      <path d="M20 150 H520" stroke={EDGE} strokeDasharray="4 4" />

      {/* B: modular */}
      <text x="20" y="178" fontSize="10" fontWeight="700" fill={BLUE} letterSpacing="1">B · MODULAR PIPELINE</text>
      {node(20, 190, 150, "Deepgram Nova-3", "Speech to text")}
      {arrow(172, 190, 212)}
      {node(192, 190, 150, "Amazon Nova 2 Lite", "Reasoning", true)}
      {arrow(344, 362, 212)}
      {node(364, 190, 156, "ElevenLabs Flash 3", "Text to speech")}
      <path d="M172 212 H190 M344 212 H362" stroke={GOLD} strokeWidth="2.4" pathLength={100} strokeDasharray="30 70" className="bill-run tv-run" />
      <text x="20" y="260" fontSize="11" fill={INK}>More languages</text>
      <text x="124" y="260" fontSize="11" fill={MUTED}>·</text>
      <text x="134" y="260" fontSize="11" fill={INK}>Mid-call language switching</text>
      <Chip x={20} y={276} text="हिंदी" w={56} on />
      <path d="M80 287 H96" stroke={SKY} strokeWidth="1.6" />
      <Chip x={100} y={276} text="English" w={70} />

      <Float id={id}>
        <Card x={250} y={298} w={340} h={148} tag="SHARED BY BOTH PIPELINES">
          {([["Knowledge base", "database"], ["Tools", "code"], ["Memory", "layers"], ["Guardrails", "shield"]] as [string, "database"][]).map(([t, icon], i) => {
            const x = 266 + (i % 2) * 156, y = 338 + Math.floor(i / 2) * 46;
            return (
              <g key={t}>
                <rect x={x} y={y} width="148" height="36" fill={i === 3 ? TINT : SOFT} stroke={i === 3 ? BLUE : "none"} />
                <Glyph icon={icon} x={x + 18} y={y + 18} size={14} />
                <text x={x + 32} y={y + 22.5} fontSize="12" fontWeight="700" fill={NAVY}>{t}</text>
              </g>
            );
          })}
        </Card>
      </Float>
    </Art>
  );
}

/* ---------------- 03 Self-service configuration ---------------- */
export function ConfigView() {
  const id = "v3";
  const flow = ["Greet", "Verify", "Negotiate", "Confirm"];
  return (
    <Art id={id} label="Illustration: VoxSphere self-service setup for agent persona, conversation workflow, negotiation boundaries, turn-taking and knowledge document ingestion.">
      <Panel id={id} product="VoxSphere" title="Agent setup" sub="Draft · not live" />

      {/* persona */}
      <text x="20" y="70" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">PERSONA</text>
      <rect x="20" y="78" width="240" height="30" fill="#fff" stroke={EDGE} />
      <Glyph icon="user" x={36} y={93} size={13} />
      <text x="50" y="97.5" fontSize="12" fontWeight="700" fill={NAVY}>Asha · Collections</text>
      <Chip x={20} y={116} text="Hindi" on w={56} />
      <Chip x={82} y={116} text="English" on w={66} />
      <Chip x={154} y={116} text="Polite, firm" w={92} />

      {/* workflow */}
      <text x="280" y="70" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">WORKFLOW</text>
      {flow.map((t, i) => {
        const x = 278 + i * 64;
        return (
          <g key={t}>
            <rect x={x} y="78" width="60" height="30" fill={i === 2 ? TINT : "#fff"} stroke={i === 2 ? BLUE : EDGE} />
            <text x={x + 30} y="97.5" fontSize="10" fill={i === 2 ? BLUE : INK} fontWeight={i === 2 ? 600 : 400} textAnchor="middle">{t}</text>
            {i < 3 && <path d={`M${x + 60} 93 H${x + 64}`} stroke={SKY} strokeWidth="1.6" />}
          </g>
        );
      })}

      {/* negotiation boundaries */}
      <text x="20" y="170" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">NEGOTIATION BOUNDARIES</text>
      {([["Instalments offered", "Up to 3", 0.6], ["Late-fee waiver", "Needs approval", 0.25]] as [string, string, number][]).map(([t, v, f], i) => {
        const y = 184 + i * 46;
        return (
          <g key={t}>
            <text x="20" y={y + 10} fontSize="11.5" fill={INK}>{t}</text>
            <text x="260" y={y + 10} fontSize="11" fontWeight="700" fill={i === 1 ? OCHRE : BLUE} textAnchor="end">{v}</text>
            <rect x="20" y={y + 18} width="240" height="6" fill={TINT} />
            <rect x="20" y={y + 18} width={240 * f} height="6" fill={i === 1 ? GOLD : BLUE} />
            <rect x={20 + 240 * f - 5} y={y + 15} width="10" height="12" fill="#fff" stroke={i === 1 ? GOLD : BLUE} strokeWidth="1.5" />
          </g>
        );
      })}

      {/* turn-taking */}
      <text x="20" y="300" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">TURN-TAKING</text>
      {["Barge-in handling", "Filler-word filtering"].map((t, i) => (
        <g key={t}>
          <rect x="20" y={310 + i * 30} width="30" height="16" fill={BLUE} />
          <rect x="36" y={312 + i * 30} width="12" height="12" fill="#fff" />
          <text x="60" y={322 + i * 30} fontSize="11.5" fill={INK}>{t}</text>
        </g>
      ))}

      <Float id={id}>
        <Card x={290} y={150} w={300} h={210} tag="KNOWLEDGE DOCUMENTS">
          {([["Collections policy v2.pdf", "Ingested", 1, GREEN], ["EMI and charges FAQ.docx", "Ingesting", 0.62, BLUE], ["Hindi call scripts.docx", "Queued", 0, MUTED]] as [string, string, number, string][]).map(([t, s, f, c], i) => {
            const y = 186 + i * 46;
            return (
              <g key={t}>
                <Glyph icon="layers" x={314} y={y + 10} size={13} color={c === MUTED ? MUTED : BLUE} />
                <text x="328" y={y + 14} fontSize="11.5" fill={INK}>{t}</text>
                <text x="574" y={y + 14} fontSize="10.5" fontWeight="700" fill={c} textAnchor="end">{s}</text>
                <rect x="306" y={y + 24} width="268" height="5" fill={TINT} />
                {f > 0 && <rect x="306" y={y + 24} width={268 * f} height="5" fill={`url(#${id}-hbar)`} className={f < 1 ? "tv-grow" : undefined} />}
              </g>
            );
          })}
          <rect x="306" y="324" width="268" height="24" fill="none" stroke={BLUE} strokeDasharray="4 3" className="tv-twinkle" />
          <text x="440" y="340" fontSize="11" fill={BLUE} textAnchor="middle">+ Upload document</text>
        </Card>
      </Float>
    </Art>
  );
}
