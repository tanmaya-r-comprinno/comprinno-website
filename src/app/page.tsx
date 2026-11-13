import Link from "next/link";
import GridGlow from "@/components/GridGlow";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import { services } from "@/content/services";
import { phases } from "@/content/company";
import { partnerPages } from "@/content/products";
import { partnerLogo } from "@/content/partnerLogos";
import { caseStudy } from "@/lib/caseStudies";
import { serviceIcon } from "@/lib/caseStudyIcons";
import LogoMarquee from "@/components/LogoMarquee";
import ProductDiagram from "@/components/ProductDiagram";
import { badges } from "@/content/badges";
import ArtTile, { tileFor, ART_TILE_COUNT } from "@/components/ArtTile";
import FlowLoop from "@/components/FlowLoop";
import ParticleWave from "@/components/ParticleWave";
import RainField from "@/components/RainField";



// Results told as one big number each (from comprinno.net case studies)
// Outcomes: three real stories from src/content/case-studies. Figures are quoted from each story's results.
const proofPicks: { slug: string; metric: string; what: string }[] = [
  { slug: "sirovate-genai-accelerating-speed-accuracy-of-clinical-research-summary-reports-csrs-with-gen-ai", metric: "50%", what: "fewer compliance-related errors in clinical research summaries" },
  { slug: "highway-delite-adopts-a-resilient-aws-architecture", metric: "99.99%", what: "data durability on AWS, with 99.5% availability" },
  { slug: "achieving-cost-optimization-and-operational-efficiency-for-the-financial-services-company", metric: "15%", what: "lower cloud costs in the first month of optimization" },
];
const proof = proofPicks.flatMap((p) => {
  const c = caseStudy(p.slug);
  return c ? [{ ...p, title: c.title, client: c.client, track: `${c.industry} · ${c.service}`, href: `/resources/case-studies/${c.slug}`, icon: serviceIcon[c.service], art: tileFor(c.slug) }] : [];
});
// keep the three pictures different from each other
proof.forEach((p, i) => { while (proof.slice(0, i).some((q) => q.art === p.art)) p.art = (p.art + 1) % ART_TILE_COUNT; });

const homeProducts: { name: string; line: string; href: string; screen: string; img?: string }[] = [
  { name: "Tevico", line: "Autopilot for cloud operations. AI SRE agents manage costs, security and operations under engineering oversight.", href: "/products/tevico", screen: "Tevico dashboard screen", img: "/products/tevico-dashboard.webp" },
  { name: "VeriQ", line: "[One-line promise: what VeriQ does and for whom]", href: "/products/veriq", screen: "VeriQ product screen", img: "/products/veriq-dashboard.webp" },
  { name: "VoxSphere", line: "[One-line promise: what VoxSphere does and for whom]", href: "/products/voxsphere", screen: "VoxSphere product screen", img: "/products/voxsphere-dashboard.webp" },
  { name: "Weave", line: "Agentic workflows for document-heavy finance and procurement processes, exceptions included.", href: "/products/weave", screen: "Weave run outcome screen", img: "/products/weave-dashboard.webp" },
];

const segments: { name: string; desc: string; icon: IconName; href: string }[] = [
  { name: "SaaS Startups", desc: "Launch fast on a secure baseline, with the credits you qualify for.", icon: "rocket", href: "/industries#saas-isv" },
  { name: "ISVs", desc: "Multi-tenant SaaS, CI/CD and AWS Marketplace readiness.", icon: "store", href: "/industries#saas-isv" },
  { name: "Tech-led Enterprises", desc: "Modernize legacy platforms and scale AI across teams.", icon: "building", href: "/industries#tech-enterprises" },
];

const heroStats = [
  { value: "750+", label: "Clients" },
  { value: "1,000+", label: "Projects delivered" },
  { value: "98%", label: "CSAT" },
  { value: "150+", label: "AWS certifications" },
];

// Official badges live in /public/badges. OpenAI shows its logo (from partnerLogos).
const credentials: { label: string; badges: { src: string; alt: string; w: number; h: number }[] }[] = [
  { label: "AWS Premier Tier Partner", badges: [badges.premier] },
  { label: "AWS MSP", badges: [badges.msp] },
  { label: "ISO 27001", badges: [{ src: "/badges/iso-27001.webp", alt: "ISO 27001 Information Security Management certified", w: 252, h: 250 }] },
  { label: "SOC 2 Type II", badges: [{ src: "/badges/soc-2.webp", alt: "AICPA SOC 2", w: 248, h: 250 }] },
];

const stages: Record<string, { title: string; desc: string; includes: string[] }> = {
  migrate: { title: "Move to the cloud", desc: "Assess, plan, and tap the funding you qualify for.", includes: ["Cloud Migration", "Security & Compliance"] },
  modernize: { title: "Make it AI-ready", desc: "Re-architect apps and data so AI has something solid to run on.", includes: ["Application Modernization", "DevOps & Platform Engineering"] },
  manage: { title: "Run it reliably", desc: "24/7 operations and cost control, so your team can focus on building.", includes: ["Managed Cloud Services", "FinOps & Cost Optimization"] },
  maximize: { title: "Compound with AI", desc: "Build, govern and scale agents and analytics on the foundation.", includes: ["Agentic & Generative AI", "Data Analytics & ML"] },
};

const faqs = [
  { q: "Can we get funding support for our project?", a: "Often, yes. As a Premier Tier cloud partner, we help you apply for the provider's migration, modernization and AI funding programs and startup credits, and handle the paperwork with you. We assess eligibility for relevant funding programs. Availability depends on the program, project, geography and provider approval." },
  { q: "What does a typical engagement look like?", a: "Four stages: we assess your environment and build a plan, migrate and modernize what matters most, run it 24/7 with clear SLAs, then keep optimizing cost, security and performance as you grow. Most clients start with a short assessment and expand from there." },
  { q: "How can we work with Comprinno?", a: "Three ways: a fixed-scope project such as migration, modernization or AI development; an ongoing managed services partnership; or an advisory engagement such as an AWS Well-Architected Review or AI readiness assessment. Many clients start with one and grow into the others." },
  { q: "Which industries do you serve?", a: "We serve fintech, healthcare, life sciences and retail, with security and compliance support tailored to each engagement. By stage, we work with SaaS startups, ISVs and tech-led enterprises, with a focus on startups and the mid-market." },
  { q: "Where is Comprinno based, and where do you work?", a: "We're headquartered in India with offices in Pune and Bangalore, plus teams in the US and UK. We work with customers across these regions and beyond, remotely or on-site." },
];

// The gap: why AI stalls. Each item is answered by a move in "What we do".
const gaps: { title: string; desc: string; icon: IconName }[] = [
  { title: "Legacy that won't scale", desc: "Monolithic applications and on-premises data that AI systems cannot readily access or use.", icon: "layers" },
  { title: "Security & compliance gaps", desc: "Weak security and compliance controls can delay AI approval and deployment.", icon: "shield" },
  { title: "No one to run it", desc: "Lean teams managing operational issues and rising costs have little time to deploy AI.", icon: "users" },
];

export default function Home() {
  return (
    <div className="brand">
      {/* 1 · HERO: the diagram explains the promise */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <Eyebrow>AWS Premier Tier Partner</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,5vw,3.6rem)] font-normal leading-[1.1] lg:whitespace-nowrap">
              Turn <strong className="sweep font-bold">enterprise AI</strong> into
              <br />a lasting <strong className="font-bold">competitive advantage</strong>.
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted sm:text-lg">
              AI delivers increasing value when the cloud supporting it is ready to scale.
              <span className="block lg:whitespace-nowrap">We migrate, modernize and run your cloud, then build, govern and scale the AI agents on top.</span>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Talk to an expert →</Button>
            </div>
          </div>
        </Container>

        {/* Official partners: part of the hero, full width */}
        <div className="relative">
          <Container className="pb-10 sm:pb-14">
            <div className="text-center"><Eyebrow>Official partners</Eyebrow></div>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {partnerPages.map((p) => {
                const logo = (
                  <>
                    <svg viewBox="0 0 24 24" role="img" aria-label={`${partnerLogo[p.slug].title}, ${p.badge}`} className={`partner-mark ${p.slug === "aws" ? "partner-mark-lg" : ""}`}>
                      <path d={partnerLogo[p.slug].d} fill="currentColor" />
                    </svg>
                    {/* AWS logo already spells "aws", so it shows the logo only */}
                    {p.slug !== "aws" && <span className="partner-name">{p.name}</span>}
                  </>
                );
                return (
                  <li key={p.slug}>
                    {/* hidden partners keep their logo here but have no page to link to yet */}
                    {p.hidden
                      ? <div title={`${p.name}: ${p.badge}`} className="partner-tile">{logo}</div>
                      : <Link href={p.href} title={`${p.name}: ${p.badge}`} className="partner-tile">{logo}</Link>}
                  </li>
                );
              })}
            </ul>
          </Container>
        </div>
      </section>

      {/* 2 · TRUST */}
      <LogoMarquee />

      {/* 2b · THE GAP: why AI stalls, which the four moves then answer */}
      <Section tone="surface">
        <SectionHead
          eyebrow="The problem"
          title={<><strong>Most AI pilots stall</strong>, not because of the model,<Br />but because of the <strong>cloud underneath</strong>.</>}
          desc="Three gaps hold most teams back. Each one is fixable."
        />
        <ul className="grid gap-4 md:grid-cols-3">
          {gaps.map((g) => (
            <li key={g.title} className="card">
              <IconTile name={g.icon} />
              <h3 className="mt-4 text-lg font-semibold">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3 · FOUR MOVES: each card is mostly picture */}
      <Section id="services" className="scroll-mt-16">
        <SectionHead
          eyebrow="The path"
          title={<>One team, four stages:<Br /><strong>Migrate. Modernize. Manage. Maximize.</strong></>}
          desc="Start wherever you are today. One accountable partner plans, builds and operates your platform."
        />
        {/* Four stages, one row: monochrome cards joined by a single top rule */}
        <ol className="path-row">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="path-card group">
                <span className="path-mark" aria-hidden="true">{s.verb}</span>
                <h3 className=" text-xl font-semibold text-ink">{stages[s.slug].title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stages[s.slug].desc}</p>
                <span className="mt-auto flex flex-col gap-2 pt-5">
                  {stages[s.slug].includes.map((x) => <span key={x} className="path-inc">{x}</span>)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex justify-center">
          <Button href="/contact" variant="ghost">Which stage are you at? Take the 2-min check →</Button>
        </div>
      </Section>

      {/* 4 · PRODUCTS: animated particle-wave background (low-fi take on the AI landing-page reference) */}
      <Section tone="surface" background={<ParticleWave />}>
        <SectionHead
            eyebrow="Products"
            title={<><strong>Accelerators</strong> that take your use case<Br />live in <strong>days, not months</strong>.</>}
            desc="A hardened, production-ready stack you can adopt rather than build from scratch, so your team can focus on what makes your solution different."
          />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeProducts.map((p) => (
            <Link key={p.name} href={p.href} className="card group flex flex-col !p-0 overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden border-b border-line">
                <ProductDiagram product={p.name} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.line}</p>
                <span className="mt-auto pt-6 text-sm font-medium text-ink underline underline-offset-4">Explore {p.name} <span className="go">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* 4b · NUMBERS: just below products (dark navy anchor band) */}
      <Section className="brand-dark">
        <dl className="stats">
          {heroStats.map((st) => {
            const m = st.value.match(/^([\d,]+)(.*)$/);
            return (
              <div key={st.label} className="stat">
                <dt className="stat-label">{st.label}</dt>
                <dd className="stat-num">{m ? m[1] : st.value}<span className="stat-suffix">{m?.[2]}</span></dd>
              </div>
            );
          })}
        </dl>
      </Section>

      {/* 5 · HOW WE DELIVER: one animated loop instead of four text cards */}
      <Section>
        <SectionHead eyebrow="How we work" title={<>One team, from <strong>first use case</strong><Br />to <strong>agents at work</strong>.</>} desc="The team that plans your path also builds it and runs it. Nothing gets lost in a handover." />
        <FlowLoop items={phases} />
      </Section>

      {/* 6 · WHO WE SERVE: falling-light background (low-fi take on the green "rain" reference) */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Built for you" title={<>From <strong>first funding round</strong><Br />to <strong>scaled platform</strong>.</>} desc="Whatever your stage, you get the same team and the same standards." />
        <ul className="seg-grid">
          {segments.map((g) => (
            <li key={g.name}>
              <Link href={g.href} className="seg-card group">
                <span className="flow-node" aria-hidden="true"><Icon name={g.icon} className="h-6 w-6" /></span>
                <h3 className="mt-5 flex items-center text-xl font-semibold text-ink">{g.name}<span className="go ml-auto text-muted">→</span></h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{g.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-2 font-mono text-xs uppercase tracking-widest text-muted">Industries</span>
          {["Fintech", "Healthcare", "Life Sciences", "Retail"].map((x) => (
            <Link key={x} href="/industries" className="seg-chip">{x}</Link>
          ))}
        </div>
      </Section>

      {/* 7 · CREDENTIALS */}
      <Section>
        <SectionHead eyebrow="Credentials" title={<>Credentials you can <strong>trust</strong>.</>} desc="Independently audited, and backed by the partners we build with." />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {credentials.map((c) => (
            <li key={c.label} className="card flex flex-col items-center gap-4 text-center text-sm font-semibold text-ink sm:text-base">
              {c.badges.length ? (
                <span className="flex h-20 shrink-0 items-center gap-2">
                  {c.badges.map((b) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={b.src} src={b.src} alt={b.alt} width={b.w} height={b.h} loading="lazy" className="h-full w-auto" />
                  ))}
                </span>
              ) : (
                <span className="flex h-20 shrink-0 items-center gap-2 text-ink">
                  <svg viewBox="0 0 24 24" role="img" aria-label="OpenAI" className="h-11 w-11"><path d={partnerLogo.openai.d} fill="currentColor" /></svg>
                  <span className="text-xl font-semibold tracking-tight">OpenAI</span>
                </span>
              )}
              {c.label}
            </li>
          ))}
        </ul>
      </Section>

      {/* 8 · RESULTS: one big number per story */}
      <Section tone="surface">
        <SectionHead eyebrow="Outcomes" title={<><strong>Production results</strong>, not pilots.</>} desc="Customer outcomes across cloud transformation and enterprise AI." />
        <div className="grid gap-4 md:grid-cols-3">
          {proof.map((p) => (
            <Link key={p.href} href={p.href} className="card flex flex-col">
              <div className="flex items-center justify-between">
                <IconTile name={p.icon} />
                <span className="tag">{p.track}</span>
              </div>
              <ArtTile variant={p.art} className="mt-5" />
              <p className="mt-5 font-semibold leading-snug text-ink">{p.title}</p>
              <p className="mb-5 mt-1 text-sm text-muted">{p.client}</p>
              {/* the story's headline result, shown as a labelled data point */}
              <div className="outcome-result">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Key result</p>
                <p className="outcome-num mt-2">{p.metric}</p>
                <p className="mt-1.5 min-h-[2.75em] text-sm leading-snug text-ink-2">{p.what}</p>
              </div>
              <p className="mt-5 text-sm font-medium text-ink">Read the story <span className="go">→</span></p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/resources/case-studies" variant="ghost">All case studies →</Button>
        </div>
      </Section>

      {/* 9 · FAQ */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions before<Br />you <strong className="font-semibold">start</strong>?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Quick answers to what teams ask us most.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand title={<>Planning your next<Br /><strong>cloud or AI project</strong>?</>} desc="Three simple steps from first call to a plan you can act on." />
    </div>
  );
}
