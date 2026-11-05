import Link from "next/link";
import GridGlow from "@/components/GridGlow";
import HeroVisual from "@/components/HeroVisual";
import { Button, Container, CtaBand, Eyebrow, ExpandSteps, Section, SectionHead, StackCards, Stat } from "@/components/ui";
import { IconTile, serviceIcon, type IconName } from "@/components/Icon";
import { serviceViz } from "@/components/Illustrations";
import { services } from "@/content/services";
import { customers, phases, stats } from "@/content/company";
import { partnerPages, products } from "@/content/products";
import { partnerLogo } from "@/content/partnerLogos";
import SegmentExplorer from "@/components/SegmentExplorer";
import ProofArt from "@/components/ProofArt";
import ParticleWave from "@/components/ParticleWave";
import RainField from "@/components/RainField";

const ticker = [
  "agent · triaging alert on prod-api",
  "agent · right-sizing 14 idle instances",
  "agent · compliance evidence collected",
  "agent · waiting for human sign-off",
];


// Results told as one big number each (from comprinno.net case studies)
const proof = [
  { metric: "50%", what: "fewer compliance errors", who: "Sirovate · GenAI", href: "/case-studies/sirovate-genai-csr", icon: "spark" as IconName, art: "drop" as const, value: 50 },
  { metric: "40%", what: "lower AWS cost in a year", who: "boAt · Managed", href: "/case-studies/boat-aws-cost-reduction", icon: "coin" as IconName, art: "trend" as const, value: 40 },
  { metric: "95%", what: "services serverless or managed", who: "MediBuddy · Migrate", href: "/case-studies/medibuddy-data-center-to-aws", icon: "migrate" as IconName, art: "ring" as const, value: 95 },
];

export default function Home() {
  return (
    <>
      {/* 1 · HERO: the diagram explains the promise */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Agentic AI first · AWS Premier Tier Partner · Est. 2013</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.1rem,6.5vw,4rem)] font-semibold leading-[1.05]">
              Turn <span className="sweep">enterprise AI</span> into a lasting competitive advantage.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              We migrate, modernize and run your AWS environment, then build, govern and scale AI agents on it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Talk to an expert →</Button>
            </div>

          </div>
          <div className="rounded-lg border border-line bg-bg p-4 sm:p-6">
            <HeroVisual />
            <div className="mt-2 flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-2.5 font-mono text-xs text-muted" aria-hidden="true">
              <span className="pulse-dot shrink-0" />
              <div className="ticker min-w-0 flex-1">
                {ticker.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </div>
        </Container>

        {/* Official partners: part of the hero, full width */}
        <div className="relative">
          <Container className="pb-10 sm:pb-14">
            <div className="text-center"><Eyebrow>Official partners</Eyebrow></div>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {partnerPages.map((p) => (
                <li key={p.slug}>
                  <Link href={p.href} title={`${p.name}: ${p.badge}`} className="partner-tile">
                    <svg viewBox="0 0 24 24" role="img" aria-label={`${partnerLogo[p.slug].title}, ${p.badge}`} className={`partner-mark ${p.slug === "aws" ? "partner-mark-lg" : ""}`}>
                      <path d={partnerLogo[p.slug].d} fill="currentColor" />
                    </svg>
                    {/* AWS logo already spells "aws", so it shows the logo only */}
                    {p.slug !== "aws" && <span className="partner-name">{p.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* 2 · TRUST */}
      <section className="border-b border-line py-8">
        <Container>
          <p className="text-center font-mono text-xs text-muted">Trusted by 750+ high-growth and enterprise brands</p>
        </Container>
        <div className="marquee mt-5">
          <ul className="marquee-track text-base font-medium text-muted">
            {[...customers, ...customers].map((c, i) => (
              <li key={`${c}-${i}`} aria-hidden={i >= customers.length} className="whitespace-nowrap transition hover:text-ink">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · FOUR MOVES: each card is mostly picture */}
      <Section id="services" className="scroll-mt-16">
        <SectionHead eyebrow="What we do" title="Migrate. Modernize. Manage. Maximize." />
        <StackCards>
          {services.map((s) => {
            const Viz = serviceViz[s.slug];
            return (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group grid items-center gap-6 md:grid-cols-[1fr_1.3fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <IconTile name={serviceIcon[s.slug]} />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{s.verb}</h3>
                  <p className="mt-2 text-ink-2">{s.tagline}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-ink">Explore <span className="go">→</span></span>
                </div>
                <div className="rounded-md border border-line bg-surface p-3">
                  <Viz />
                </div>
              </Link>
            );
          })}
        </StackCards>
      </Section>

      {/* 4 · PRODUCTS: animated particle-wave background (low-fi take on the AI landing-page reference) */}
      <Section tone="surface" background={<ParticleWave />}>
        <SectionHead eyebrow="Our products" title="Products built by Comprinno" />

        {/* All five products, equal weight */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((p) => (
            <Link key={p.slug} href={p.href} className={`card flex flex-col ${p.status ? "border-dashed" : ""}`}>
              <IconTile name={p.icon} />
              <span className="tag mt-5 self-start">{p.category}</span>
              <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              <span className="mt-auto pt-6 text-sm font-medium text-ink">Learn more <span className="go">→</span></span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5 · HOW WE DELIVER: one animated loop instead of four text cards */}
      <Section>
        <SectionHead eyebrow="How we work" title="How we deliver lasting value" />
        <ExpandSteps items={phases} icons={["search", "layers", "eye", "loop"]} />
      </Section>

      {/* 6 · WHO WE SERVE: falling-light background (low-fi take on the green "rain" reference) */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Who we serve" title="Industries and growth stages" />
        <SegmentExplorer />
      </Section>

      {/* 7 · NUMBERS */}
      <Section>
        <SectionHead eyebrow="Track record" title="A decade of delivery" />
        {/* Company numbers only; AWS detail lives on /partnerships/aws */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {stats.slice(0, 3).map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </Section>

      {/* 8 · RESULTS: one big number per story */}
      <Section tone="surface">
        <SectionHead eyebrow="Results" title="Proof, not promises" />
        <div className="grid gap-4 md:grid-cols-3">
          {proof.map((p) => (
            <Link key={p.href} href={p.href} className="card block">
              <div className="flex items-center justify-between">
                <IconTile name={p.icon} />
                <span className="tag">{p.who.split(" · ")[1]}</span>
              </div>
              <div className="bg-grid mt-5 rounded-md border border-line bg-surface p-3">
                <ProofArt kind={p.art} value={p.value} />
              </div>
              <p className="mt-5 text-5xl font-semibold tabular-nums text-ink">{p.metric}</p>
              <p className="mt-1 text-ink-2">{p.what}</p>
              <p className="mt-4 font-mono text-xs text-muted">{p.who.split(" · ")[0]} · read the story <span className="go">→</span></p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/case-studies" variant="ghost">All case studies →</Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
