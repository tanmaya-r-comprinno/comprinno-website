import type { ReactNode } from "react";
import Link from "next/link";
import { Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "./ui";
import { Icon, IconTile, type IconName } from "./Icon";
import GridGlow from "./GridGlow";
import LogoMarquee from "./LogoMarquee";
import FlowLoop from "./FlowLoop";
import OutcomeArt from "./OutcomeArt";

/**
 * One layout for every service stage page (Migrate, Modernize, Manage, Maximize).
 * Each page passes its own copy; the design stays identical across stages.
 */
export type ServiceStoryData = {
  hero: { eyebrow: string; title: ReactNode; lines: [string, string]; cta: string };
  problem: { title: ReactNode; desc: string; items: { title: string; desc: string; icon: IconName }[] };
  path: { eyebrow?: string; title: ReactNode; desc: string; items: { k: string; mark: string; title: string; desc: string; tags: string[] }[] };
  scope: { eyebrow: string; title: ReactNode; desc: string; items: { title: string; icon: IconName }[] };
  numbers: { value: string; suffix: string; label: string }[];
  steps: { eyebrow: string; title: ReactNode; desc: string; items: { title: string; desc: string }[]; icons: IconName[]; caption: string };
  included: {
    eyebrow?: string;
    title: ReactNode;
    desc?: string;
    items: (string | { text: string; plan: string })[];
    /** optional plan cards under the list (Manage) */
    plans?: { k: string; name: string; desc: string; featured?: boolean }[];
  };
  credentials: { title: ReactNode; desc?: string; items: string[] };
  outcomes: {
    title: ReactNode;
    desc: string;
    more: string;
    items: { tag: string; metric: string; what: string; title: string; href: string; icon: IconName }[];
    art: number; // first OutcomeArt variant to use
  };
  faq: { title: ReactNode; desc: string; items: { q: string; a: string }[] };
  cta: { title: ReactNode; desc: string; steps: string[]; label: string; next: ReactNode };
};

export default function ServiceStory({ d }: { d: ServiceStoryData }) {
  return (
    <>
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <Eyebrow>{d.hero.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.6rem)] font-normal leading-[1.1]">{d.hero.title}</h1>
            <p className="mt-5 max-w-5xl text-base leading-relaxed text-muted sm:text-lg">
              <span className="lg:block lg:whitespace-nowrap">{d.hero.lines[0]}</span>{" "}
              <span className="lg:block lg:whitespace-nowrap">{d.hero.lines[1]}</span>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact">{d.hero.cta} →</Button>
            </div>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* PROBLEM */}
      <Section tone="surface">
        <SectionHead eyebrow="The problem" title={d.problem.title} desc={d.problem.desc} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.problem.items.map((p) => (
            <div key={p.title} className="card">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink lg:min-h-[2.75em]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PATH: four disciplines */}
      <Section>
        <SectionHead eyebrow={d.path.eyebrow ?? "The path"} title={d.path.title} desc={d.path.desc} />
        <ol className="path-row">
          {d.path.items.map((p) => (
            <li key={p.title}>
              <div className="path-card">
                <span className="path-mark" aria-hidden="true">{p.mark}</span>
                <span className="path-verb lg:min-h-[3.2em]">{p.k}</span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-ink lg:min-h-[2.75em]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                <span className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* SCOPE: what we move / modernize / run */}
      <Section tone="surface" className="bg-grid">
        <SectionHead eyebrow={d.scope.eyebrow} title={d.scope.title} desc={d.scope.desc} />
        <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {d.scope.items.map((m) => (
            <li key={m.title}>
              <Link href="/contact" className="move-tile group">
                <span className="move-tile-top">
                  <span className="move-tile-icon" aria-hidden="true"><Icon name={m.icon} className="h-5 w-5" /></span>
                </span>
                <span className="move-tile-title">{m.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* NUMBERS */}
      <Section>
        <dl className="stats">
          {d.numbers.map((st) => (
            <div key={st.label} className="stat">
              <dt className="stat-label">{st.label}</dt>
              <dd className="stat-num">{st.value}<span className="stat-suffix">{st.suffix}</span></dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* HOW IT RUNS */}
      <Section id="how" className="scroll-mt-16">
        <SectionHead eyebrow={d.steps.eyebrow} title={d.steps.title} desc={d.steps.desc} />
        <FlowLoop items={d.steps.items} icons={d.steps.icons} caption={d.steps.caption} />
      </Section>

      {/* BUILT IN */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <Eyebrow>{d.included.eyebrow ?? "Built in, as standard"}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2] [&_strong]:font-semibold">{d.included.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{d.included.desc ?? "Whatever your size, you get the same team and the same standards. None of this is an add-on."}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {d.included.items.map((x) => {
              const text = typeof x === "string" ? x : x.text;
              return (
                <li key={text} className="flex gap-3 border border-line bg-bg p-4 text-sm leading-relaxed text-ink">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="flex-1">{text}</span>
                  {typeof x !== "string" && <span className="shrink-0 font-mono text-[0.68rem] text-muted">({x.plan})</span>}
                </li>
              );
            })}
          </ul>
        </div>
        {d.included.plans && (
          <div id="plans" className="plans mt-10 scroll-mt-20">
            {d.included.plans.map((p) => (
              <div key={p.name} className={`plan ${p.featured ? "is-featured" : ""}`}>
                <span className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">{p.k}</span>
                  {p.featured && <span className="border border-ink px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-widest text-ink">Recommended</span>}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-ink">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                <div className="mt-6">
                  <Button href="/contact" variant="ghost">Contact sales{p.featured ? " →" : ""}</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* CREDENTIALS */}
      <Section>
        <SectionHead eyebrow="Credentials" title={d.credentials.title} desc={d.credentials.desc ?? "Independently validated for exactly this kind of work."} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {d.credentials.items.map((c) => (
            <li key={c} className="card flex items-center gap-3 text-sm font-semibold text-ink sm:text-base">
              <IconTile name="check" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* OUTCOMES */}
      <Section tone="surface">
        <SectionHead eyebrow="Outcomes" title={d.outcomes.title} desc={d.outcomes.desc} />
        <div className="grid gap-4 md:grid-cols-3">
          {d.outcomes.items.map((o, i) => (
            <Link key={o.title} href={o.href} className="card block">
              <div className="flex items-center justify-between">
                <IconTile name={o.icon} />
                <span className="tag">{o.tag}</span>
              </div>
              <div className="mt-5 border border-line bg-surface p-3">
                <OutcomeArt variant={d.outcomes.art + i} />
              </div>
              <p className="mt-5 text-4xl font-semibold text-ink sm:text-5xl">{o.metric}</p>
              <p className="mt-1 text-ink-2">{o.what}</p>
              <p className="mt-4 font-semibold text-ink">{o.title}</p>
              <p className="mt-3 text-sm font-medium text-ink">Read the story <span className="go">→</span></p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/resources/case-studies" variant="ghost">{d.outcomes.more} →</Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2] [&_strong]:font-semibold">{d.faq.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{d.faq.desc}</p>
          </div>
          <Faq items={d.faq.items} />
        </div>
      </Section>

      <CtaBand title={d.cta.title} desc={d.cta.desc} steps={d.cta.steps} label={d.cta.label}>
        <p className="mt-8 font-mono text-xs text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">{d.cta.next}</p>
      </CtaBand>
    </>
  );
}
