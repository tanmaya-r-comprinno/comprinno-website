/**
 * Abstract data art for result cards: the shape *is* the number.
 * - "drop":  errors falling, bars shrink to half
 * - "trend": cost line bending down 40%
 * - "ring":  a gauge filling to 95%
 * Inline SVG, animates once when drawn; static for reduced-motion users.
 */
type Kind = "drop" | "trend" | "ring";

const C = {
  line: "var(--color-line-strong)",
  soft: "var(--color-surface-2)",
  accent: "var(--color-accent)",
  ok: "var(--color-ok)",
  muted: "var(--color-muted)",
};

export default function ProofArt({ kind, value }: { kind: Kind; value: number }) {
  return (
    <svg viewBox="0 0 240 120" className="proof-art h-auto w-full" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* faint grid */}
      {[30, 60, 90].map((y) => <path key={y} d={`M10 ${y}H230`} stroke={C.line} strokeWidth="0.75" strokeDasharray="2 5" />)}

      {kind === "drop" && (
        <g>
          {[100, 92, 84, 70, 60, 54, 50].map((h, i) => {
            const height = (h / 100) * 90;
            const x = 22 + i * 30;
            return (
              <rect key={i} x={x} y={110 - height} width="16" height={height} rx="3" fill={i < 3 ? C.soft : "var(--color-accent-soft)"} stroke={i < 3 ? C.line : C.accent} strokeWidth="1.2" className="proof-bar" style={{ animationDelay: `${i * 80}ms` }} />
            );
          })}
          <path d="M30 20L218 58" stroke={C.ok} strokeWidth="1.5" strokeDasharray="4 4" />
        </g>
      )}

      {kind === "trend" && (
        <g>
          <path d="M14 30C60 28 90 36 120 52S190 74 226 76V110H14Z" fill="var(--color-accent-soft)" opacity="0.6" />
          <path d="M14 30C60 28 90 36 120 52S190 74 226 76" stroke={C.accent} strokeWidth="2" pathLength={1} className="proof-draw" />
          <circle cx="226" cy="76" r="4" fill={C.ok} />
          <path d="M226 30V72" stroke={C.ok} strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M221 66l5 6 5-6" stroke={C.ok} strokeWidth="1.2" />
        </g>
      )}

      {kind === "ring" && (
        <g transform="translate(120 62)">
          <circle r="44" stroke={C.soft} strokeWidth="10" />
          <circle r="44" stroke={C.accent} strokeWidth="10" pathLength={100} strokeDasharray={`${value} 100`} transform="rotate(-90)" className="proof-ring" style={{ ["--v" as string]: value }} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle key={a} r="2.5" fill={C.line} transform={`rotate(${a}) translate(62 0)`} />
          ))}
          <text y="5" textAnchor="middle" fontSize="13" fill={C.muted} fontFamily="var(--font-mono)">{value}%</text>
        </g>
      )}
    </svg>
  );
}
