/**
 * Hero visual: an agent pipeline as inline SVG (no images, no JS).
 * Signal → Agent → Guardrails → Human sign-off → Action.
 * A data packet travels the whole chain on a 6s loop (SVG-native animation).
 * Hover a node to lift/highlight it. Colours come from design tokens.
 */
const nodes = [
  { x: 20, y: 40, w: 120, label: "Signal", sub: "alert · ticket" },
  { x: 200, y: 40, w: 120, label: "Agent", sub: "investigates" },
  { x: 380, y: 40, w: 120, label: "Guardrails", sub: "scoped access" },
  { x: 110, y: 170, w: 150, label: "Human sign-off", sub: "high-impact only" },
  { x: 320, y: 170, w: 150, label: "Action", sub: "logged · reversible" },
];

// Each segment: path + the share of the 6s loop in which the packet travels it.
const segments = [
  { d: "M140 66H200", a: 0.04, b: 0.18 },
  { d: "M320 66H380", a: 0.22, b: 0.36 },
  { d: "M440 92V120Q440 140 420 140H200Q185 140 185 170", a: 0.4, b: 0.7 },
  { d: "M260 196H320", a: 0.74, b: 0.88 },
];

export default function AgentFlow() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 520 260"
        role="img"
        aria-label="Diagram: a signal is investigated by an agent, checked by guardrails, approved by a human for high-impact steps, then acted on and logged."
        className="h-auto w-full"
      >
        <g stroke="var(--color-accent-line)" strokeWidth="1.5" fill="none" className="flow-line">
          {segments.map((s) => (
            <path key={s.d} d={s.d} />
          ))}
        </g>

        {nodes.map((n) => (
          <g key={n.label} className="node">
            <title>{n.label}</title>
            <rect x={n.x} y={n.y} width={n.w} height="52" rx="12" fill="var(--color-bg)" stroke="var(--color-line-strong)" strokeWidth="1.5" />
            <text x={n.x + 14} y={n.y + 23} fontSize="13" fontWeight="600" fill="var(--color-ink)">{n.label}</text>
            <text x={n.x + 14} y={n.y + 40} fontSize="10.5" fill="var(--color-muted)" fontFamily="var(--font-mono)">{n.sub}</text>
          </g>
        ))}

        {/* travelling data packets */}
        {segments.map((s) => (
          <circle key={`p-${s.d}`} r="5" fill="var(--color-ok)" className="packet" opacity="0">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path={s.d}
              keyTimes={`0;${s.a};${s.b};1`}
              keyPoints="0;0;1;1"
              calcMode="linear"
            />
            <animate attributeName="opacity" dur="6s" repeatCount="indefinite" calcMode="discrete" values="0;1;0" keyTimes={`0;${s.a};${s.b}`} />
          </circle>
        ))}

        {/* live status dot on Guardrails */}
        <circle cx="490" cy="52" r="4" fill="var(--color-ok)" className="packet">
          <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </figure>
  );
}
