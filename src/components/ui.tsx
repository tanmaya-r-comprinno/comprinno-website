import Link from "next/link";
import { Children, type CSSProperties, type ReactNode } from "react";
import GridGlow from "./GridGlow";
import CountUp from "./CountUp";
import { Icon, IconTile, type IconName } from "./Icon";

/**
 * Scroll-stacking cards: each item is sticky with a slightly larger top offset,
 * so the next card slides up and overlaps the previous one. Pure CSS.
 */
export function StackCards({ children }: { children: ReactNode }) {
  return (
    <div className="stack">
      {Children.toArray(children).map((c, i) => (
        <div key={i} className="stack-item" style={{ "--i": Math.min(i, 5) } as CSSProperties}>
          {c}
        </div>
      ))}
      <div className="stack-dwell" aria-hidden="true" />
    </div>
  );
}

/**
 * "How we work" expanding cards, after comprinno.net's pattern:
 * hover (or keyboard focus) widens a card, darkens its number and reveals icon, title and text.
 * On touch / small screens every card is shown open.
 */
export function ExpandSteps({ items, icons }: { items: { title: string; desc: string }[]; icons: IconName[] }) {
  return (
    <div className="xsteps">
      {items.map((s, i) => (
        <div key={s.title} className="xcard" tabIndex={0}>
          <p className="xnum">{String(i + 1).padStart(2, "0")}.</p>
          <div className="xcontent">
            <span className="xicon"><Icon name={icons[i % icons.length]} className="h-12 w-12" /></span>
            <h3 className="xtitle">{s.title}</h3>
            <p className="xdesc">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Card with an icon tile, title and text: the most common block on the site. */
export function FeatureCard({ icon, title, desc, children }: { icon: IconName; title: string; desc: string; children?: ReactNode }) {
  return (
    <div className="card">
      <IconTile name={icon} />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
      {children}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Capitalise only the first letter, leave the rest (keeps "AWS", "Tevico"). */
const cap = (n: ReactNode) => (typeof n === "string" ? n.charAt(0).toUpperCase() + n.slice(1) : n);

/**
 * Each label gets its own hue (light, mid-tone; no dark colours). The hue is
 * picked from the label text, so the same label is the same colour everywhere.
 */
const EYEBROW_HUES: [string, string][] = [
  ["#14b8a6", "#e6f7f5"], // teal
  ["#8b5cf6", "#f1ecfe"], // violet
  ["#f59e0b", "#fdf3e1"], // amber
  ["#0ea5e9", "#e4f4fc"], // sky
  ["#f43f5e", "#fde8ec"], // rose
  ["#10b981", "#e3f6ef"], // emerald
  ["#6366f1", "#ebebfd"], // indigo
  ["#ec4899", "#fce9f3"], // pink
];
// Hand-picked for the main labels so neighbouring sections never share a colour.
const HUE_BY_LABEL: Record<string, number> = {
  "Agentic AI first · AWS Premier Tier Partner · Est. 2013": 0, // teal
  "Official partners": 3, // sky
  "What we do": 1, // violet
  "Our products": 2, // amber
  "How we work": 5, // emerald
  "Who we serve": 7, // pink
  "Track record": 6, // indigo
  "Results": 4, // rose
  "Let's talk": 0, // teal
  "What you get": 3, // sky
  "The problem": 4, // rose
  "Process": 5, // emerald
  "Plans": 2, // amber
  "Included": 1, // violet
  "FAQ": 6, // indigo
};
const hueFor = (n: ReactNode) => {
  const t = typeof n === "string" ? n : "";
  if (t in HUE_BY_LABEL) return EYEBROW_HUES[HUE_BY_LABEL[t]];
  let h = 0;
  for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
  return EYEBROW_HUES[h % EYEBROW_HUES.length];
};

/** Section label: a "live signal" chip with its own colour, scan sweep and signal bars. */
export function Eyebrow({ children }: { children: ReactNode }) {
  const [c, soft] = hueFor(children);
  return (
    <p className="eyebrow" style={{ "--eb": c, "--eb-soft": soft } as CSSProperties}>
      <span className="pulse-dot" aria-hidden="true" />
      <span className="eyebrow-text">{cap(children)}</span>
      <span className="eyebrow-sig" aria-hidden="true"><i /><i /><i /></span>
    </p>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {children}
    </Link>
  );
}

export function Section({
  children,
  id,
  tone = "plain",
  className = "",
  background,
}: {
  children: ReactNode;
  id?: string;
  tone?: "plain" | "surface";
  className?: string;
  /** Optional decorative layer drawn behind the content (e.g. an animated canvas). */
  background?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`py-14 sm:py-20 ${tone === "surface" ? "bg-surface border-y border-line" : ""} ${background ? "relative overflow-hidden" : ""} ${className}`}
    >
      {background}
      <Container className={background ? "relative" : ""}>{children}</Container>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-8 sm:mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-[clamp(1.6rem,4.2vw,2.5rem)] font-semibold leading-[1.15]">{title}</h2>
      {desc && <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">{desc}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  desc,
  children,
  visual,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  children?: ReactNode;
  visual?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
      <Container className={`py-14 sm:py-20 ${visual ? "grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]" : ""}`}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[1.08]">{title}</h1>
          {desc && <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">{desc}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {visual && <div className="rounded-lg border border-line bg-bg p-4 sm:p-6">{visual}</div>}
      </Container>
    </section>
  );
}

/** Numbered node list — the "agent pipeline" motif used for processes. */
const stepIcons: IconName[] = ["search", "layers", "code", "rocket", "loop"];

export function Steps({ items, icons = stepIcons }: { items: { title: string; desc: string }[]; icons?: IconName[] }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
      {items.map((s, i) => (
        <li key={s.title} className="card relative">
          <div className="flex items-center justify-between">
            <IconTile name={icons[i % icons.length]} />
            <span className="font-mono text-xs text-muted">Step {String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-sm sm:text-base leading-relaxed">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line text-ok">
            <Icon name="check" className="h-4 w-4" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Native <details>: accessible, zero JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-md border border-line bg-bg">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="font-mono text-muted transition group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card text-center">
      <p className="text-3xl sm:text-4xl font-semibold text-ink tabular-nums"><CountUp value={value} /></p>
      <p className="mt-2 text-xs sm:text-sm text-muted">{label}</p>
    </div>
  );
}

export function CtaBand({
  title = "Ready to put an agent on it?",
  desc = "Tell us what you're working on. An AWS-certified expert replies within 24 to 48 hours.",
  label = "Talk to an expert",
}: {
  title?: string;
  desc?: string;
  label?: string;
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="cta-panel">
          <div className="cta-glow" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow>Let&apos;s talk</Eyebrow>
              <h2 className="mt-5 max-w-xl text-[clamp(1.8rem,4.5vw,2.8rem)] font-semibold leading-[1.1]">{title}</h2>
              <p className="mt-4 max-w-lg text-muted sm:text-lg">{desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">{label} →</Button>
                <a href="mailto:sales@comprinno.net" className="btn btn-ghost">sales@comprinno.net</a>
              </div>
            </div>

            {/* "New request" console: pick what you need */}
            <div className="cta-console">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="ml-3 font-mono text-xs text-muted">agent · new request</span>
              </div>
              <div className="p-5">
                <p className="font-mono text-sm text-ink">
                  <span className="text-ok">&gt;</span> What are you working on?<span className="caret text-muted">▍</span>
                </p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {[
                    { t: "Move to AWS", i: "migrate", h: "/services/migrate" },
                    { t: "Ship faster", i: "layers", h: "/services/modernize" },
                    { t: "Run it 24×7", i: "shield", h: "/services/manage" },
                    { t: "Put agents to work", i: "spark", h: "/services/maximize" },
                  ].map((o) => (
                    <Link key={o.t} href={o.h} className="cta-option">
                      <Icon name={o.i as IconName} className="h-4 w-4" />
                      {o.t}
                      <span className="go ml-auto">→</span>
                    </Link>
                  ))}
                </div>
                <p className="mt-5 font-mono text-xs text-muted">Reply within 24 to 48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
