/**
 * Stroke-only icon set (no fills), drawn on a 24px grid.
 * Style follows the reference: light, rounded joins, isometric where it fits.
 * Each path uses pathLength=1 so CSS can "draw" it on hover (see motion.css).
 */
const paths = {
  cube: "M12 3l8 4.5v9L12 21l-8-4.5v-9z M4 7.5L12 12l8-4.5 M12 12v9",
  layers: "M12 3l9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5",
  migrate: "M2 6l6-3 6 3v8l-6 3-6-3z M2 6l6 3 6-3 M8 9v8 M16.5 12H22 M19 9l3 3-3 3",
  shield: "M12 3l8 3v6c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V6z M8.5 12l2.5 2.5 4.5-5",
  spark: "M12 3v4 M12 17v4 M3 12h4 M17 12h4 M6 6l2.5 2.5 M15.5 15.5L18 18 M6 18l2.5-2.5 M15.5 8.5L18 6 M12 9l3 3-3 3-3-3z",
  agent: "M12 3a2 2 0 1 0 .01 0 M5 15a2 2 0 1 0 .01 0 M19 15a2 2 0 1 0 .01 0 M12 7v4 M12 11l-5.5 4.5 M12 11l5.5 4.5",
  puzzle: "M5 8h3.5a2.5 2.5 0 1 1 5 0H17v3.5a2.5 2.5 0 1 1 0 5V20H5z",
  alert: "M12 4l9 16H3z M12 10v4 M12 17v.01",
  chart: "M4 20h16 M6 20v-6h3v6 M11 20V9h3v11 M16 20V5h3v15",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M16 5a3 3 0 0 1 0 6 M21 20c0-2.6-1.6-4.8-4-5.6",
  user: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",
  building: "M3 21h18 M5 21V4h9v17 M14 9h5v12 M8 8h3 M8 12h3 M8 16h3 M16.5 13h.01 M16.5 17h.01",
  rocket: "M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z M12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0 M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
  lock: "M6 11h12v10H6z M8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  cloud: "M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z",
  coin: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15 9h-4a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3H9 M12 7v2 M12 15v2",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4",
  loop: "M20 12a8 8 0 0 1-14 5.3 M4 12a8 8 0 0 1 14-5.3 M18 3v4h-4 M6 21v-4h4",
  code: "M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14",
  heart: "M12 20s-8-4.5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 10-8 10z",
  cart: "M3 4h2.5l2.2 10.5h10.6L20.5 7H6.4 M7.8 19.5a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0 M15.8 19.5a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0",
  flask: "M9 3h6 M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3",
  bank: "M3 10l9-6 9 6 M5 10v8 M9.5 10v8 M14.5 10v8 M19 10v8 M3 21h18",
  check: "M5 12.5l4.5 4.5L19 7",
  database: "M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3z M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  phone: "M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z",
  pin: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  dna: "M6 3c0 6 12 5 12 9s-12 3-12 9 M18 3c0 6-12 5-12 9s12 3 12 9 M8 6.5h8 M9.5 12h5 M8 17.5h8",
  bag: "M5 8h14l-1 13H6z M9 8V6a3 3 0 0 1 6 0v2 M9 12a3 3 0 0 0 6 0",
  card: "M3 6h18v12H3z M3 10h18 M7 14.5h4",
  store: "M4 9l1.5-5h13L20 9 M4 9v11h16V9 M4 9h16 M9 20v-5h6v5",
} as const;

export type IconName = keyof typeof paths;

/** Raw path data, for drawing an icon inside a larger SVG scene. */
export const iconPath = (name: IconName) => paths[name];

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={paths[name]} pathLength={1} />
    </svg>
  );
}

/** Bordered tile that holds an icon; animates when its parent .card is hovered. */
export function IconTile({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span className={`icon-tile ${className}`}>
      <Icon name={name} />
    </span>
  );
}

export const serviceIcon: Record<string, IconName> = {
  migrate: "migrate",
  modernize: "layers",
  manage: "shield",
  maximize: "spark",
};

/** Icons for each service's four "the problem" cards, in order. */
export const problemIcons: Record<string, IconName[]> = {
  migrate: ["search", "clock", "alert", "coin"], // no starting point, deadlines, cutover risk, dual-running cost
  modernize: ["clock", "cube", "loop", "search"], // slow releases, monoliths, toil, no pathway
  manage: ["users", "lock", "check", "cloud"], // overload, security gaps, compliance, downtime
  maximize: ["rocket", "chart", "shield", "coin"], // pilots stall, unclear value, trust, cost
};

/** "How it runs" step icons per service, matched to each step's meaning. */
export const processIcons: Record<string, IconName[]> = {
  migrate: ["search", "shield", "migrate", "check", "chart"], // plan, prepare, migrate, validate, optimize
  modernize: ["search", "cube", "code", "rocket", "layers"], // assess, package, automate, deploy, scale
  manage: ["search", "layers", "loop", "eye", "chart"], // assess, design, transition, run, report
  maximize: ["search", "agent", "code", "rocket", "eye"], // discover, design, prototype, scale, operate
};

/** Icons for each service's four offerings, in order. */
export const offeringIcons: Record<string, IconName[]> = {
  migrate: ["migrate", "cube", "database", "spark"],
  modernize: ["loop", "layers", "code", "coin"],
  manage: ["cloud", "check", "lock", "eye"],
  maximize: ["database", "agent", "chart", "spark"],
};

/**
 * Isometric line illustration in the style of the reference:
 * stacked slabs with a floating piece. Light strokes, pale side faces.
 */
export function IsoStack({ className = "" }: { className?: string }) {
  const slab = (cx: number, cy: number, w: number, h: number, t: number) => {
    const top = `M${cx} ${cy - h / 2}L${cx + w / 2} ${cy}L${cx} ${cy + h / 2}L${cx - w / 2} ${cy}Z`;
    const left = `M${cx - w / 2} ${cy}L${cx} ${cy + h / 2}L${cx} ${cy + h / 2 + t}L${cx - w / 2} ${cy + t}Z`;
    const right = `M${cx} ${cy + h / 2}L${cx + w / 2} ${cy}L${cx + w / 2} ${cy + t}L${cx} ${cy + h / 2 + t}Z`;
    return { top, left, right };
  };
  const parts = [slab(150, 190, 220, 120, 18), slab(150, 150, 150, 82, 16), slab(232, 70, 90, 50, 14)];
  return (
    <svg viewBox="0 0 300 270" className={className} aria-hidden="true" fill="none" stroke="var(--color-line-strong)" strokeWidth="1.5" strokeLinejoin="round">
      {parts.map((p, i) => (
        <g key={i} className={i === 2 ? "iso-float" : undefined}>
          <path d={p.left} fill="var(--color-surface)" />
          <path d={p.right} fill="var(--color-surface-2)" />
          <path d={p.top} fill="var(--color-bg)" />
        </g>
      ))}
      {/* puzzle notch on the floating piece */}
      <path className="iso-float" d="M222 70a10 6 0 1 0 20 0" fill="var(--color-surface-2)" />
      <path d="M150 150v-20" strokeDasharray="3 4" />
    </svg>
  );
}
