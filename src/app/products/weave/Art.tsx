/**
 * Weave illustrations (not real screenshots), built on the shared light kit:
 * hero (a run console + an exception card) and the four "Inside Weave" views.
 * Square corners, brand colours, nothing behind the picture.
 */
import type { IconName } from "@/components/Icon";
import { Art, Panel, Card, Float, Glyph, Trend, textW, NAVY, BLUE, SKY, GOLD, OCHRE, GREEN, INK, MUTED, EDGE, SOFT, TINT } from "@/components/illustration/Kit";

/** status pill: ok (green), wait (gold), plan (planned, gold outline) */
function Status({ x, y, text, tone }: { x: number; y: number; text: string; tone: "ok" | "wait" | "plan" | "run" }) {
  const w = Math.ceil(textW(text, 9.5, { caps: true, spacing: 0.6 })) + 16;
  const c = { ok: GREEN, wait: OCHRE, plan: OCHRE, run: BLUE }[tone];
  const bg = { ok: "#e6f4ec", wait: "#fff8e1", plan: "#fff", run: TINT }[tone];
  return (
    <g>
      <rect x={x - w} y={y - 13} width={w} height="18" fill={bg} stroke={tone === "plan" ? GOLD : "none"} />
      <text x={x - w / 2} y={y} fontSize="9.5" fontWeight="700" fill={c} textAnchor="middle" letterSpacing=".6">{text.toUpperCase()}</text>
    </g>
  );
}

/** labelled node box with icon */
function Node({ x, y, w, h = 30, icon, text, on = false, color = BLUE }: { x: number; y: number; w: number; h?: number; icon: IconName; text: string; on?: boolean; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={Math.max(w, Math.ceil(textW(text, 11.5, { bold: on })) + 40)} height={h} fill={on ? TINT : "#fff"} stroke={on ? BLUE : EDGE} />
      <Glyph icon={icon} x={x + 15} y={y + h / 2} size={13} color={color} />
      <text x={x + 28} y={y + h / 2 + 4} fontSize="11.5" fill={on ? BLUE : INK} fontWeight={on ? 700 : 400}>{text}</text>
    </g>
  );
}

/* ---------- HERO: a run of supplier invoices ---------- */
export function WeaveHero() {
  const id = "wh";
  const steps: [IconName, string, string, "ok" | "wait" | "run"][] = [
    ["agent", "Intake agent", "Reads each invoice", "ok"],
    ["agent", "Validation agent", "Checks POs and receipts", "ok"],
    ["agent", "Business-rule agent", "Applies your approval policy", "ok"],
    ["user", "Human approval", "1 exception to finance", "wait"],
    ["check", "Verified outcome", "Audited and ready", "run"],
  ];
  return (
    <Art id={id} w={560} h={494} label="Weave run: a batch of supplier invoices moves through intake, validation and business-rule agents; one exception goes to finance for approval before a verified, audited outcome.">
      <Panel id={id} x={16} y={16} w={440} h={330} product="Weave" title="Supplier invoices" sub="Run in progress" />
      <rect x="32" y="56" width="408" height="30" fill={SOFT} />
      <Glyph icon="mail" x={48} y={71} size={13} />
      <text x="62" y="75" fontSize="11.5" fontWeight="700" fill={NAVY}>Batch received</text>
      <text x="160" y="75" fontSize="11" fill={MUTED}>by email · documents attached</text>
      {steps.map(([icon, name, task, tone], i) => {
        const y = 98 + i * 44;
        return (
          <g key={name}>
            {i > 0 && <path d={`M48 ${y - 8} V${y}`} stroke={EDGE} />}
            <rect x="32" y={y} width="408" height="36" fill={tone === "wait" ? "#fff8e1" : "#fff"} stroke={tone === "wait" ? GOLD : EDGE} />
            <Glyph icon={icon} x={48} y={y + 18} size={14} color={tone === "wait" ? OCHRE : BLUE} />
            <text x="64" y={y + 15} fontSize="11.5" fontWeight="700" fill={NAVY}>{name}</text>
            <text x="64" y={y + 29} fontSize="10" fill={MUTED}>{task}</text>
            <Status x={430} y={y + 22} text={tone === "ok" ? "Done" : tone === "wait" ? "Your call" : "Ready"} tone={tone} />
          </g>
        );
      })}
      {/* progress along the run */}
      <path d="M24 98 V314" stroke={EDGE} strokeWidth="2" />
      <path d="M24 98 V314" stroke={GOLD} strokeWidth="2.6" pathLength={100} strokeDasharray="12 88" className="bill-run tv-run" />

      {/* front card: the exception */}
      <g transform="translate(0 0)">
        <Float id={id}>
          <Card x={210} y={262} w={336} h={214} tag="EXCEPTION · NEEDS YOUR CALL" tagColor={GOLD}>
            <text x="226" y="310" fontSize="14.5" fontWeight="700" fill={NAVY}>Invoice total differs from PO</text>
            <text x="226" y="330" fontSize="11" fill={MUTED}>Validation agent · evidence attached</text>
            <rect x="226" y="344" width="144" height="44" fill={SOFT} />
            <text x="236" y="361" fontSize="9.5" fill={MUTED} letterSpacing=".6">PURCHASE ORDER</text>
            <text x="236" y="379" fontSize="12" fontWeight="700" fill={INK}>Quantity 40</text>
            <rect x="378" y="344" width="152" height="44" fill="#fff8e1" />
            <text x="388" y="361" fontSize="9.5" fill={OCHRE} letterSpacing=".6">INVOICE</text>
            <text x="388" y="379" fontSize="12" fontWeight="700" fill={INK}>Quantity 46</text>
            <rect x="226" y="404" width="96" height="28" fill={NAVY} />
            <text x="274" y="422" fontSize="11.5" fontWeight="700" fill="#fff" textAnchor="middle">Approve</text>
            <rect x="330" y="404" width="96" height="28" fill="#fff" stroke={EDGE} />
            <text x="378" y="422" fontSize="11.5" fill={INK} textAnchor="middle">Send back</text>
            <Glyph icon="eye" x={234} y={454} size={12} color={MUTED} />
            <text x="246" y="458" fontSize="10.5" fill={MUTED}>Your decision is logged to the audit trail</text>
          </Card>
        </Float>
      </g>
    </Art>
  );
}

/* ---------- 01 Intake: every channel converges into one tracked case ---------- */
export function IntakeView() {
  const id = "wi";
  const inputs: [IconName, string][] = [["mail", "Documents and email"], ["code", "APIs and events"], ["layers", "Portals and forms"], ["user", "Human requests"]];
  const stores: [IconName, string][] = [["database", "Document storage"], ["search", "Knowledge base"], ["cube", "Schema registry"]];
  return (
    <Art id={id} label="Weave intake: documents and email, APIs and events, portals and forms, and human requests flow into one workflow state, backed by document storage, a knowledge base and a schema registry.">
      <Panel id={id} product="Weave" title="Channels and intake" sub="Live" />
      <text x="20" y="70" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">CHANNELS</text>
      {inputs.map(([icon, t], i) => {
        const y = 82 + i * 46;
        return (
          <g key={t}>
            <Node x={20} y={y} w={164} icon={icon} text={t} />
            <path d={`M184 ${y + 15} H198 V196 H212`} stroke={EDGE} fill="none" />
            <path d={`M184 ${y + 15} H198 V196 H212`} stroke={SKY} strokeWidth="2" fill="none" pathLength={100} strokeDasharray="10 90" className="bill-run" style={{ animationDelay: `${-i * 1.1}s` }} />
          </g>
        );
      })}

      {/* the case record */}
      <rect x="212" y="128" width="146" height="136" fill="#fff" stroke={BLUE} />
      <rect x="212" y="128" width="146" height="26" fill={TINT} />
      <Glyph icon="loop" x={226} y={141} size={12} />
      <text x="238" y="145" fontSize="11.5" fontWeight="700" fill={BLUE}>Workflow state</text>
      {[["Case", "Open"], ["Source", "Email"], ["Type", "Invoice"], ["Owner", "Agent"]].map(([k, v], i) => (
        <g key={k}>
          <text x="224" y={176 + i * 22} fontSize="10.5" fill={MUTED}>{k}</text>
          <text x="346" y={176 + i * 22} fontSize="10.5" fontWeight="700" fill={INK} textAnchor="end">{v}</text>
        </g>
      ))}

      <text x="380" y="70" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">CONTEXT</text>
      {stores.map(([icon, t], i) => {
        const y = 120 + i * 48;
        return (
          <g key={t}>
            <path d={`M358 196 H369 V${y + 15} H380`} stroke={EDGE} fill="none" />
            <Node x={380} y={y} w={146} icon={icon} text={t} />
          </g>
        );
      })}

      <Float id={id}>
        <Card x={250} y={292} w={340} h={156} tag="NEW CASE CREATED">
          <text x="266" y="340" fontSize="14.5" fontWeight="700" fill={NAVY}>Supplier invoice batch</text>
          <text x="266" y="360" fontSize="11" fill={MUTED}>Received by email · classified on arrival</text>
          {["Invoice PDF", "Purchase order", "Goods receipt"].map((t, i) => (
            <g key={t}>
              <rect x={266 + i * 104} y="378" width="96" height="26" fill={SOFT} stroke={EDGE} />
              <text x={314 + i * 104} y="395" fontSize="10.5" fill={INK} textAnchor="middle">{t}</text>
            </g>
          ))}
          <Glyph icon="check" x={274} y={426} size={12} color={GREEN} />
          <text x="286" y="430" fontSize="10.5" fill={MUTED}>All sources attached to one tracked case</text>
        </Card>
      </Float>
    </Art>
  );
}

/* ---------- 02 Execution: agents step through the case, with a tool-call log ---------- */
export function ExecutionView() {
  const id = "we";
  const stages: [string, "ok" | "run" | "next"][] = [["Read", "ok"], ["Validate", "ok"], ["Apply rules", "run"], ["Route", "next"]];
  const log: [IconName, string, string, string][] = [
    ["code", "lookup_purchase_order", "Tool call", BLUE],
    ["code", "match_goods_receipt", "Tool call", BLUE],
    ["shield", "Amount within policy limit", "Guardrail", GREEN],
    ["eye", "Trace recorded", "Observability", MUTED],
  ];
  return (
    <Art id={id} label="Weave agentic execution: orchestration moves a case through read, validate, apply rules and route steps, with memory carried across, tool calls, guardrail checks and traces logged.">
      <Panel id={id} product="Weave" title="Agentic execution" sub="Case in progress" />
      <text x="20" y="70" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">ORCHESTRATION</text>
      {stages.map(([t, st], i) => {
        const x = 20 + i * 128;
        const on = st === "run";
        return (
          <g key={t}>
            {i > 0 && <path d={`M${x - 16} 100 H${x}`} stroke={st === "next" ? EDGE : BLUE} strokeWidth="1.6" />}
            <rect x={x} y="82" width="112" height="36" fill={on ? TINT : st === "ok" ? "#fff" : SOFT} stroke={on ? BLUE : EDGE} />
            {on && <rect x={x - 3} y="79" width="118" height="42" fill="none" stroke={SKY} strokeWidth="1.5" className="tv-twinkle" />}
            <Glyph icon={st === "ok" ? "check" : on ? "agent" : "clock"} x={x + 16} y={100} size={13} color={st === "ok" ? GREEN : on ? BLUE : MUTED} />
            <text x={x + 30} y="104" fontSize="11.5" fontWeight={on ? 700 : 400} fill={st === "next" ? MUTED : INK}>{t}</text>
          </g>
        );
      })}

      {/* memory carried across */}
      <rect x="20" y="132" width="496" height="24" fill={SOFT} stroke={EDGE} />
      <Glyph icon="database" x={34} y={144} size={12} />
      <text x="46" y="148" fontSize="10.5" fill={INK}>Memory and context: supplier, PO lines, earlier decisions</text>
      <rect x="20" y="154" width="496" height="2" fill={TINT} />
      <rect x="20" y="154" width="330" height="2" fill={SKY} className="tv-grow" />

      {/* tool-call log */}
      <text x="20" y="184" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">ACTIONS</text>
      {log.map(([icon, t, kind, c], i) => {
        const y = 194 + i * 34;
        return (
          <g key={t}>
            <rect x="20" y={y} width="280" height="28" fill="#fff" stroke={EDGE} />
            <rect x="20" y={y} width="3" height="28" fill={c} />
            <Glyph icon={icon} x={36} y={y + 14} size={12} color={c} />
            <text x="50" y={y + 18} fontSize="11" fill={INK} fontFamily={kind === "Tool call" ? "ui-monospace, monospace" : undefined}>{t}</text>
            <text x="292" y={y + 18} fontSize="9.5" fill={MUTED} textAnchor="end">{kind}</text>
          </g>
        );
      })}

      <Float id={id}>
        <Card x={318} y={196} w={272} h={176} tag="BUSINESS RULE APPLIED">
          <text x="334" y="244" fontSize="14" fontWeight="700" fill={NAVY}>Variance above tolerance</text>
          <text x="334" y="263" fontSize="11" fill={MUTED}>Your policy says a person decides</text>
          <rect x="334" y="280" width="240" height="30" fill="#fff8e1" />
          <rect x="334" y="280" width="3" height="30" fill={GOLD} />
          <Glyph icon="user" x={350} y={295} size={12} color={OCHRE} />
          <text x="362" y="299" fontSize="11" fontWeight="700" fill={OCHRE}>Routed to finance approver</text>
          <rect x="334" y="324" width="240" height="30" fill={SOFT} />
          <Glyph icon="eye" x={350} y={339} size={12} />
          <text x="362" y="343" fontSize="11" fill={INK}>Reasoning and evidence attached</text>
        </Card>
      </Float>
    </Art>
  );
}

/* ---------- 03 Integration: one runtime, layers underneath, outputs on the right ---------- */
export function IntegrationView() {
  const id = "wn";
  const layers: [IconName, string, number][] = [["spark", "Model gateway", 0.72], ["loop", "Workflow engine", 0.9], ["layers", "Event bus and queues", 0.58]];
  return (
    <Art id={id} label="Weave runtime and integration fabric: a model gateway, workflow engine and event queues run every workflow; human-in-the-loop is live, while ERP and CRM and connector services are planned.">
      <Panel id={id} product="Weave" title="Runtime and integration" sub="One runtime" />

      {/* stacked layers */}
      <text x="20" y="70" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">RUNTIME LAYERS</text>
      {layers.map(([icon, t, load], i) => {
        const y = 82 + i * 52;
        return (
          <g key={t}>
            <rect x="20" y={y} width="260" height="42" fill="#fff" stroke={EDGE} />
            <Glyph icon={icon} x={38} y={y + 15} size={13} />
            <text x="54" y={y + 19} fontSize="11.5" fontWeight="700" fill={NAVY}>{t}</text>
            <rect x="36" y={y + 29} width="228" height="5" fill={TINT} />
            <rect x="36" y={y + 29} width={228 * load} height="5" fill={`url(#${id}-hbar)`} className="tv-grow" style={{ animationDelay: `${-i * 0.9}s` }} />
          </g>
        );
      })}
      <rect x="20" y="240" width="260" height="34" fill={TINT} stroke={BLUE} />
      <Glyph icon="cloud" x={38} y={257} size={13} />
      <text x="54" y="261" fontSize="12" fontWeight="700" fill={BLUE}>Runtime in your cloud</text>

      {/* outputs */}
      <text x="316" y="70" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">CONNECTS TO</text>
      {([["users", "Human-in-the-loop", "run"], ["building", "ERP and CRM", "plan"], ["puzzle", "Connector services", "plan"]] as [IconName, string, "run" | "plan"][]).map(([icon, t, st], i) => {
        const y = 82 + i * 52;
        const live = st === "run";
        return (
          <g key={t}>
            <path d={`M280 ${y + 21} H316`} stroke={live ? BLUE : EDGE} strokeDasharray={live ? undefined : "3 3"} strokeWidth="1.4" />
            <rect x="316" y={y} width="208" height="42" fill={live ? TINT : "#fff"} stroke={live ? BLUE : EDGE} strokeDasharray={live ? undefined : "4 3"} />
            <Glyph icon={icon} x={334} y={y + 21} size={13} color={live ? BLUE : MUTED} />
            <text x="350" y={y + 19} fontSize="11" fontWeight={live ? 700 : 400} fill={live ? BLUE : INK}>{t}</text>
            <text x="350" y={y + 33} fontSize="8.5" fontWeight="700" fill={live ? BLUE : OCHRE} letterSpacing=".8">{live ? "LIVE" : "PLANNED"}</text>
          </g>
        );
      })}

      <Float id={id}>
        <Card x={296} y={250} w={294} h={150} tag="HUMAN-IN-THE-LOOP">
          <text x="312" y="298" fontSize="14" fontWeight="700" fill={NAVY}>Task assigned to finance</text>
          <text x="312" y="317" fontSize="11" fill={MUTED}>From the event queue, with full case context</text>
          <rect x="312" y="334" width="262" height="44" fill={SOFT} />
          <Glyph icon="clock" x={328} y={356} size={13} />
          <text x="342" y="352" fontSize="11" fontWeight="700" fill={INK}>Waiting for approval</text>
          <text x="342" y="368" fontSize="10" fill={MUTED}>Workflow resumes when you decide</text>
        </Card>
      </Float>
    </Art>
  );
}

/* ---------- 04 Governance: who did what, when and why ---------- */
export function GovernanceView() {
  const id = "wg";
  const trail: [string, string, string, IconName, string][] = [
    ["09:02", "Intake agent", "Case opened from email", "agent", BLUE],
    ["09:03", "Validation agent", "PO and receipt matched", "agent", BLUE],
    ["09:03", "Business-rule agent", "Variance flagged", "alert", OCHRE],
    ["09:41", "Finance approver", "Approved with note", "user", GREEN],
  ];
  return (
    <Art id={id} label="Weave governance: identity and access, policies and secrets, and approvals control every step; an audit trail records who did what and when, with monitoring and alerts alongside.">
      <Panel id={id} product="Weave" title="Security, ops and governance" sub="Audited" />
      {([["lock", "Identity and access"], ["shield", "Policies and secrets"], ["check", "Approvals"]] as [IconName, string][]).map(([icon, t], i) => {
        const x = 20 + i * 168;
        return (
          <g key={t}>
            <rect x={x} y="56" width="160" height="32" fill="#fff" stroke={EDGE} />
            <Glyph icon={icon} x={x + 16} y={72} size={13} />
            <text x={x + 30} y="76" fontSize="11" fill={INK}>{t}</text>
          </g>
        );
      })}

      {/* audit trail */}
      <text x="20" y="114" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">AUDIT TRAIL</text>
      <rect x="20" y="122" width="320" height="24" fill={SOFT} />
      {["TIME", "ACTOR", "ACTION"].map((h, i) => <text key={h} x={[30, 76, 214][i]} y="138" fontSize="9.5" fontWeight="700" fill={MUTED} letterSpacing=".8">{h}</text>)}
      {trail.map(([t, who, what, icon, c], i) => {
        const y = 146 + i * 32;
        return (
          <g key={t + who}>
            <text x="30" y={y + 20} fontSize="10.5" fill={MUTED} fontFamily="ui-monospace, monospace">{t}</text>
            <Glyph icon={icon} x={84} y={y + 16} size={12} color={c} />
            <text x="96" y={y + 20} fontSize="10.5" fill={INK}>{who}</text>
            <text x="214" y={y + 20} fontSize="10.5" fill={INK}>{what}</text>
            <path d={`M20 ${y + 32} H340`} stroke={EDGE} />
          </g>
        );
      })}

      {/* monitoring */}
      <text x="364" y="114" fontSize="10" fontWeight="700" fill={MUTED} letterSpacing="1">MONITORING</text>
      <rect x="364" y="122" width="156" height="150" fill="#fff" stroke={EDGE} />
      <text x="376" y="142" fontSize="10.5" fill={INK}>Runs per hour</text>
      {[34, 46, 40, 58, 52, 64, 60].map((v, i) => (
        <rect key={i} x={378 + i * 19} y={238 - v} width="12" height={v} fill={`url(#${id}-bar)`} opacity={i === 5 ? 1 : 0.4} className="tv-rise" style={{ animationDelay: `${-i * 0.4}s` }} />
      ))}
      <path d="M372 238 H512" stroke={EDGE} />
      <circle cx="380" cy="256" r="3.5" fill={GREEN} />
      <text x="390" y="260" fontSize="10" fill={MUTED}>No open alerts</text>

      <Float id={id}>
        <Card x={250} y={300} w={340} h={150} tag="APPROVAL RECORDED" tagColor={GREEN}>
          <text x="266" y="348" fontSize="14" fontWeight="700" fill={NAVY}>Finance approver · 09:41</text>
          <text x="266" y="367" fontSize="11" fill={MUTED}>Decision, reason and evidence stored together</text>
          {[["Who", "Finance approver"], ["Why", "Price change agreed"]].map(([k, v], i) => (
            <g key={k}>
              <rect x={266 + i * 158} y="384" width="150" height="40" fill={SOFT} />
              <text x={276 + i * 158} y="400" fontSize="9.5" fill={MUTED} letterSpacing=".6">{k.toUpperCase()}</text>
              <text x={276 + i * 158} y="416" fontSize="11" fontWeight="700" fill={INK}>{v}</text>
            </g>
          ))}
        </Card>
      </Float>
      <Trend id={id} points="378,200 397,190 416,194 435,178 454,184 473,170 492,174" />
    </Art>
  );
}
