import Link from "next/link";
import { type CSSProperties, type ReactNode } from "react";
import GridGlow from "./GridGlow";
import LineWave from "./LineWave";

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
  "AWS Premier Tier Partner": 0, // teal
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
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  newTab?: boolean;
}) {
  // keep a trailing arrow on the same line as the last word, so it never wraps alone
  let body: ReactNode = children;
  if (typeof children === "string") {
    const m = children.match(/^(.*?)(\S+\s*[→↗])$/);
    if (m) body = <span>{m[1]}<span className="whitespace-nowrap">{m[2]}</span></span>;
  }
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
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
  /** A string renders all bold. Pass JSX with <strong> for the bold/regular mix and <Br /> for the line break. */
  title: ReactNode;
  desc?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-8 sm:mb-12 ${typeof title === "string" ? "max-w-3xl" : "max-w-5xl"} ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={`mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.2] ${typeof title === "string" ? "font-semibold" : "font-normal [&_strong]:font-semibold"}`}>{title}</h2>
      {desc && <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">{desc}</p>}
    </div>
  );
}

/** Line break that only applies from tablet up; phones wrap naturally. */
export const Br = () => <br className="hidden sm:block" />;

export function PageHero({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  /** string = all bold; JSX with <strong> = bold/regular mix like the home hero */
  title: ReactNode;
  desc?: ReactNode;
  children?: ReactNode;
  /** @deprecated hero visuals removed */
  visual?: ReactNode;
}) {
  return (
    <section className="hero-block relative overflow-hidden border-b border-line">
      <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
      <Container className="py-14 sm:py-20">
        <div className={`mx-auto flex flex-col items-center text-center ${typeof title === "string" ? "max-w-4xl" : "max-w-6xl"}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className={`mt-5 leading-[1.1] ${typeof title === "string" ? "text-[clamp(2rem,6vw,3.6rem)] font-semibold" : "text-[clamp(1.9rem,4.6vw,3.6rem)] font-normal [&_strong]:font-bold"}`}>{title}</h1>
          {desc && <p className={`mt-5 text-base sm:text-lg leading-relaxed text-muted ${typeof desc === "string" ? "max-w-2xl" : "max-w-5xl"}`}>{desc}</p>}
          {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
        </div>
      </Container>
    </section>
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

export function CtaBand({
  title = "Planning your next cloud or AI project?",
  desc,
  label = "Talk to an expert",
  href = "/contact",
  eyebrow = "Let's talk",
  steps = ["30-minute call with a cloud and AI expert", "Assessment + funding check", "A plan you can act on"],
  children,
}: {
  title?: ReactNode;
  desc?: string;
  label?: string;
  href?: string;
  eyebrow?: string;
  steps?: string[];
  children?: ReactNode;
}) {
  return (
    <section className="cta-full">
      <div className="cta-wave" aria-hidden="true"><LineWave /></div>
      <Container className="relative py-16 text-center sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={`mx-auto mt-5 max-w-4xl text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.15] ${typeof title === "string" ? "font-semibold" : "font-normal [&_strong]:font-semibold"}`}>{title}</h2>
        {desc && <p className="mx-auto mt-4 max-w-xl text-muted sm:text-lg">{desc}</p>}
        {steps.length > 0 && (
          <ol className="cta-steps">
            {steps.map((s, i) => (
              <li key={s} className="cta-step" style={{ "--d": `${i * 0.15}s` } as CSSProperties}>
                <span className="cta-step-k">Step {i + 1}</span>
                <span className="cta-step-t">{s}</span>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={href}>{label} <span className="go">→</span></Button>
        </div>
        {children}
      </Container>
    </section>
  );
}
