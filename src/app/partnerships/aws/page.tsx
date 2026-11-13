import type { Metadata } from "next";
import ProductDiagram from "@/components/ProductDiagram";
import OutcomeCards from "@/components/OutcomeCards";
import AwsPremierBadge from "@/components/AwsPremierBadge";
import TiltBadge from "@/components/TiltBadge";
import ParticleWave from "@/components/ParticleWave";
import Link from "next/link";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import FlowLoop from "@/components/FlowLoop";
import LogoMarquee from "@/components/LogoMarquee";
import RainField from "@/components/RainField";
import JourneyClimb from "@/app/company/about/JourneyClimb";
import { journey } from "@/content/journey";
import { awsCompetencies, awsHeadline } from "@/content/aws";
import { badgesFor } from "@/content/badges";

export const metadata: Metadata = {
  title: "AWS Premier Tier Services Partner",
  description:
    "Comprinno is an AWS Premier Tier Services Partner. One team to plan, build and run your AWS work, with credentials you can check on AWS.",
  alternates: { canonical: "/partnerships/aws" },
};

const certs = awsHeadline.find((h) => h.label === "AWS Certifications")?.value ?? "150+";

const APN_PROFILE_URL = "https://partners.amazonaws.com/partners/001E000000fdzeRIAQ/Comprinno%20Technologies%20Pvt.%20Ltd.";

const credentials: { kind: string; name: string; badge?: string }[] = [
  { kind: "Competency", name: "Migration", badge: "Migration and Modernization" },
  { kind: "Competency", name: "Security" },
  { kind: "Competency", name: "Resilience" },
  { kind: "Competency", name: "AI Services" },
  { kind: "Competency", name: "Data Services" },
  { kind: "Competency", name: "DevOps Consulting" },
  { kind: "Competency", name: "Cloud Operations" },
  { kind: "Service Delivery", name: "AWS Database Migration Service" },
  { kind: "Program", name: "Managed Service Provider (MSP)" },
  { kind: "Program", name: "Level 1 MSSP" },
  { kind: "Program", name: "AWS Well-Architected Partner" },
  { kind: "Agreement", name: "Strategic Collaboration Agreement for generative AI" },
];

const numbers = [
  { value: "Premier", label: "AWS partner tier" },
  { value: certs, label: "AWS certifications" },
  { value: "1,000+", label: "Projects delivered" },
  { value: "750+", label: "Clients" },
];

const pillars: { title: string; desc: string; icon: IconName; link: string; href: string }[] = [
  { title: "Plan it right", desc: "We assess your workloads, shape the roadmap and check which AWS programs can support it, so you start with a clear plan.", icon: "coin", link: "AWS programs we use", href: "#programs" },
  { title: "Build it well", desc: "Migration, modernization, security and AI on AWS, delivered by a Premier Tier team with the competencies to match.", icon: "building", link: "Migrate · Modernize · Maximize", href: "/services/migrate" },
  { title: "Run it reliably", desc: "24/7 managed operations, security operations and cost control on AWS, so what we build keeps performing.", icon: "chart", link: "Managed services plans", href: "/services/manage#plans" },
];

const funding = [
  { best: "Migrating to AWS", title: "Migration programs", desc: "For moving workloads to AWS: support with assessment, planning and the move itself." },
  { best: "Trying a new workload", title: "Pilots and proofs of concept", desc: "For a first generative AI or modernization pilot, so you can prove value before committing a full budget." },
  { best: "Early-stage startups", title: "Credits for startups", desc: "AWS credits and startup programs for young companies building on AWS." },
  { best: "Any AWS workload", title: "Well-Architected reviews", desc: "A structured review of your workloads against AWS best practice, with a plan to fix what matters." },
];

const fundingSteps = [
  { title: "Check eligibility", desc: "We review your workloads and plans against current AWS programs." },
  { title: "Build the case", desc: "We prepare the assessment and business case AWS asks for." },
  { title: "Apply together", desc: "We submit with you and track it through AWS approval." },
  { title: "Deliver and claim", desc: "We deliver the work and handle the program milestones." },
];

const stages: { title: string; desc: string; icon: IconName }[] = [
  { title: "Startups", desc: "Launch on a secure baseline, with the credits and startup programs you qualify for.", icon: "rocket" },
  { title: "SaaS and ISVs", desc: "Multi-tenant architecture, CI/CD and readiness to sell through AWS Marketplace.", icon: "cube" },
  { title: "Enterprises", desc: "Large migrations and modernization, with governance and 24/7 operations.", icon: "building" },
  { title: "AI-first teams", desc: "Production generative AI on Amazon Bedrock, governed from the first sprint.", icon: "spark" },
];

// Billing section parked for a couple of months; flip to true to show it again.
const SHOW_BILLING = false as boolean;

const billing = [
  { title: "One partner, one bill", desc: "Buy AWS through Comprinno and get your usage invoiced by the same team that supports it." },
  { title: "Cost visibility built in", desc: "Track spend by account and service, and act on savings recommendations." },
  { title: "Support when it matters", desc: "Escalations go to engineers who know your environment, not a generic queue." },
];

const ownProducts = [
  { tag: "On AWS Marketplace", name: "Tevico", desc: "Cloud governance for AWS: cost, security, reliability and inventory in one place.", href: "/products/tevico" },
  { tag: "Amazon Bedrock", name: "VoxSphere", desc: "Real-time AI voice agents on Amazon Bedrock AgentCore, deployed in your AWS account.", href: "/products/voxsphere" },
  { tag: "Agentic AI", name: "VeriQ", desc: "Due-diligence questionnaires answered from your own evidence, with citations.", href: "/products/veriq" },
  { tag: "Multi-agent", name: "Weave", desc: "Multi-agent workflows that run your business processes in your own AWS account, with people supervising.", href: "/products/weave" },
];

// Real stories from src/content/case-studies; each figure is quoted from that story's results
const outcomes = [
  { slug: "medibuddy", metric: "95%+", what: "of services now serverless or managed" },
  { slug: "pococare-cloud-migration-migrating-from-azure-cosmos-db-to-aws-with-near-real-time-mongodb-synchronization", metric: "Near-real-time", what: "MongoDB sync from Azure Cosmos DB to AWS" },
  { slug: "boats-strategic-alliance-with-comprinno-for-robust-infrastructure-management", metric: "40%", what: "lower cloud costs over a year" },
];

const starts = ["Moving to AWS", "A generative AI pilot", "Managed services", "AWS billing transfer", "A Well-Architected review", "Something else"];

// TODO: answers drafted from page copy — confirm with the AWS alliance team.
const faqs = [
  { q: "What does AWS Premier Tier mean?", a: "Premier Tier is the highest tier in the AWS Partner Network for services partners. AWS awards it based on validated expertise, certified people, customer outcomes and delivery track record." },
  { q: "Which AWS programs could support our project?", a: "We review your workloads and plans against current AWS programs and tell you which are likely to fit. Programs and credits are subject to AWS eligibility and approval." },
  { q: "Do we have to change our AWS accounts to work with you?", a: "No. You keep your existing AWS accounts and services. If you move billing to Comprinno, only the invoicing changes." },
  { q: "Can you work with our existing team or another partner?", a: "Yes. We agree responsibilities and escalation paths up front, so we can work alongside your engineers or another partner." },
  { q: "Which AWS services do you specialize in?", a: `We hold ${awsCompetencies.length} AWS Competencies, including migration, security, resilience, AI and data services, plus AWS Service Validations across compute, containers, databases, analytics and security.` },
  { q: "Do you only work with companies in India?", a: "No. We're based in Pune and Bangalore, with teams serving customers in the US and UK as well." },
];

export default function AwsPage() {
  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Eyebrow>AWS Premier Tier Services Partner</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.4vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                The AWS partner that helps you <strong className="sweep">plan</strong>, <strong>build</strong> and <strong>run</strong>.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                One team for the whole AWS relationship, with credentials you can check on AWS.
              </p>
              <div className="mt-8">
                <Button href="/contact">Talk to an AWS expert →</Button>
              </div>
              <dl className="stats stats-words stats-compact mt-10 bg-bg">
                {numbers.map((st) => (
                  <div key={st.label} className="stat">
                    <dt className="stat-label">{st.label}</dt>
                    <dd className="stat-num">{st.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[19.5rem] sm:w-[22rem] lg:w-[24.7rem]">
                {/* official AWS Partner badge, turned on the Y axis; stacked shadows give it physical thickness */}
                <TiltBadge><AwsPremierBadge className="award-sway badge-thick relative z-10 block h-auto w-full" /></TiltBadge>
                {/* soft floor shadow */}
                <span className="absolute -bottom-6 left-1/2 h-5 w-3/4 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(15_23_42/0.18),transparent_70%)]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* WHAT YOU GET */}
      <Section>
        <SectionHead eyebrow="What the partnership gets you" title={<>Three things teams need from AWS.<Br /> <strong>One partner for all three.</strong></>} desc="Many partners only plan, or build, or run. We stay with you across all three, so nothing is lost between handovers." />
        <div className="grid border-t-2 border-[#006bc9] md:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={p.title} className="card flex flex-col">
              <IconTile name={p.icon} />
              <p className="mt-4 font-mono text-[0.7rem] text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              <Link href={p.href} className="mt-auto pt-5 text-sm font-medium text-ink hover:underline">{p.link} →</Link>
            </div>
          ))}
        </div>
      </Section>

      {/* VERIFIED */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Verified on AWS" title={<>Credentials you can <strong>trust.</strong></>} desc="Every competency, program and designation below is validated by AWS and listed on our AWS Partner profile. Don't take our word for it." />
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {credentials.map((c) => {
            const badge = badgesFor(c.badge ?? c.name)[0];
            return (
              <li key={c.name} className="flex flex-col items-center border border-line bg-bg p-4 text-center">
                <div className="grid h-[7.5rem] w-full max-w-[7.5rem] place-items-center">
                  {badge ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={badge.src} alt={badge.alt} width={badge.w} height={badge.h} loading="lazy" className="h-full max-h-[7.5rem] w-full object-contain" />
                  ) : (
                    <IconTile name={c.name.includes("Data") ? "database" : "agent"} className="cred-tile" />
                  )}
                </div>
                <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-widest text-muted">{c.kind}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-ink">{c.name}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href={APN_PROFILE_URL} newTab>View Comprinno on the AWS Partner Network ↗</Button>
        </div>
      </Section>

      {/* FUNDING */}
      <Section id="programs">
        <SectionHead eyebrow="AWS programs, navigated" title={<>Make the most of <strong>AWS programs.</strong></>} desc="As a Premier Tier partner we know which AWS programs fit your plans and what each one asks for." />
        <ol className="path-row">
          {funding.map((f, i) => (
            <li key={f.title}>
              <div className="path-card">
                <span className="path-mark" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
                <span className="mt-auto flex flex-col gap-2 pt-5">
                  <span className="path-inc">Best for: {f.best.toLowerCase()}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-16">
          <SectionHead eyebrow="How it works" title={<>Four steps from <strong>idea</strong> to <strong>approved</strong>.</>} />
          <FlowLoop items={fundingSteps} />
        </div>
        <p className="mt-4 text-center text-xs text-muted">AWS programs and credits are subject to eligibility and approval.</p>
      </Section>

      {/* STAGES */}
      <Section tone="surface">
        <SectionHead eyebrow="Wherever you are on AWS" title={<>A different AWS path <strong>for every stage.</strong></>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s) => (
            <div key={s.title} className="card">
              <IconTile name={s.icon} />
              <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* OUR JOURNEY (same as About) */}
      <Section id="journey">
        <SectionHead eyebrow="Our journey" title={<>From Select <strong>to Premier.</strong></>} desc="Building on AWS, one tier, program and competency at a time." />
        <JourneyClimb years={journey} />
      </Section>

      {/* BILLING (parked) */}
      {SHOW_BILLING && <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Eyebrow>Buy AWS through Comprinno</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Your AWS bill, with <strong className="font-semibold">a partner behind it.</strong></h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Move your AWS billing to Comprinno and keep the same AWS accounts and services, with a partner accountable for cost, support and advice.</p>
            <ul className="mt-6 grid gap-4">
              {billing.map((b) => (
                <li key={b.title} className="flex gap-3">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-semibold text-ink">{b.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6"><Button href="/contact" variant="ghost">Ask about AWS billing →</Button></div>
          </div>
          {/* illustration in the same style as the home page product scenes */}
          <div className="overflow-hidden">
            <div className="mx-auto aspect-[300/304] w-full max-w-[34rem]"><ProductDiagram product="billing" /></div>
          </div>
        </div>
      </Section>}

      {/* OUR PRODUCTS: same treatment as the home page products section */}
      <Section tone="surface" background={<ParticleWave />}>
        <SectionHead eyebrow="Built on AWS, by us" title={<>We don’t just deploy AWS. <strong>We build products on it.</strong></>} desc="Our own platforms run on the same AWS services we recommend to you, so our advice comes from production, not slides." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ownProducts.map((p) => (
            <Link key={p.name} href={p.href} className="card group flex flex-col !p-0 overflow-hidden">
              {/* same product scene as the home page */}
              <div className="aspect-[16/10] w-full overflow-hidden border-b border-line">
                <ProductDiagram product={p.name} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="tag self-start">{p.tag}</span>
                <h3 className="mt-3 text-xl font-semibold text-ink">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                <span className="mt-auto pt-5 text-sm font-medium text-ink underline underline-offset-4">Explore {p.name} <span className="go">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* OUTCOMES */}
      <Section>
        <SectionHead eyebrow="Outcomes on AWS" title={<><strong>Results on AWS</strong>, not just badges.</>} />
        <OutcomeCards picks={outcomes} />
        <div className="mt-8 flex justify-center"><Button href="/resources/case-studies" variant="ghost">All case studies →</Button></div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Working with us <strong className="font-semibold">on AWS</strong>.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Tiers, programs, accounts and teams, answered.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>What do you want to do <strong>on AWS</strong>?</>}
        desc="Pick a starting point and we'll route you to the right AWS expert."
        steps={[]}
        label="Talk to an AWS expert"
      >
        <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
          {starts.map((s) => <li key={s} className="tag">{s}</li>)}
        </ul>
      </CtaBand>
    </div>
  );
}
