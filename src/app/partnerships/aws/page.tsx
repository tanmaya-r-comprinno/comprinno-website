import type { Metadata } from "next";
import Link from "next/link";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import FlowLoop from "@/components/FlowLoop";
import LogoMarquee from "@/components/LogoMarquee";
import RainField from "@/components/RainField";
import { awsCompetencies, awsHeadline } from "@/content/aws";

export const metadata: Metadata = {
  title: "AWS Premier Tier Services Partner",
  description:
    "Comprinno is an AWS Premier Tier Services Partner. One team to plan, build and run your AWS work, with credentials you can check on AWS.",
  alternates: { canonical: "/partnerships/aws" },
};

const certs = awsHeadline.find((h) => h.label === "AWS Certifications")?.value ?? "150+";

const APN_PROFILE_URL = "https://partners.amazonaws.com/partners/001E000000fdzeRIAQ/Comprinno%20Technologies%20Pvt.%20Ltd.";

const credentials = [
  { kind: "Partner tier", name: "AWS Premier Tier Services Partner" },
  { kind: "Competency", name: "Migration" },
  { kind: "Competency", name: "Security" },
  { kind: "Competency", name: "Resilience" },
  { kind: "Competency", name: "AI Services" },
  { kind: "Competency", name: "Data Services" },
  { kind: "Program", name: "Managed Service Provider (MSP)" },
  { kind: "Program", name: "Level 1 MSSP" },
  { kind: "Service delivery", name: "AWS DMS Delivery" },
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

const billing = [
  { title: "One partner, one bill", desc: "Buy AWS through Comprinno and get your usage invoiced by the same team that supports it." },
  { title: "Cost visibility built in", desc: "Track spend by account and service, and act on savings recommendations." },
  { title: "Support when it matters", desc: "Escalations go to engineers who know your environment, not a generic queue." },
];

const ownProducts = [
  { tag: "On AWS Marketplace", name: "Tevico", desc: "Cloud governance for AWS: cost, security, reliability and inventory in one place.", href: "/products/tevico" },
  { tag: "Amazon Bedrock", name: "VoxSphere", desc: "Real-time AI voice agents on Amazon Bedrock AgentCore, deployed in your AWS account.", href: "/products/voxsphere" },
  { tag: "Agentic AI", name: "VeriQ", desc: "Due-diligence questionnaires answered from your own evidence, with citations.", href: "/products/veriq" },
  { tag: "Beta", name: "Decivo", desc: "Multi-agent workflows that run your business processes in your own AWS account, with people supervising.", href: "/products/decivo" },
];

const outcomes = [
  { tag: "Data center exit", metric: "95%+", what: "of services now serverless or managed", title: "MediBuddy moves from its data center to AWS", href: "/resources/case-studies/medibuddy-data-center-to-aws" },
  { tag: "Cloud to cloud", metric: "Near real-time", what: "MongoDB sync through cutover", title: "PocoCare moves from Azure Cosmos DB to AWS", href: "/resources/case-studies/pococare-azure-cosmos-db-to-aws" },
  { tag: "Resilience · Fintech", metric: "RBI", what: "data localization audit cleared", title: "A fintech with about 37M customers keeps its data in India", href: "/resources/case-studies/fintech-rbi-data-localization" },
  { tag: "Managed services", metric: "−40%", what: "AWS costs in one year", title: "boAt cuts AWS costs by 40% with Comprinno managed services", href: "/resources/case-studies/boat-aws-cost-reduction" },
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
    <>
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
              {/* TODO: hero visual placeholder, replace with final artwork */}
              <div className="grid aspect-[3/4] w-56 place-items-center border border-dashed border-line-strong bg-bg/60 font-mono text-[0.65rem] uppercase tracking-widest text-muted sm:w-64 lg:w-72">Hero visual</div>
            </div>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* WHAT YOU GET */}
      <Section>
        <SectionHead eyebrow="What the partnership gets you" title={<>Three things teams need from AWS.<Br /> <strong>One partner for all three.</strong></>} desc="Many partners only plan, or build, or run. We stay with you across all three, so nothing is lost between handovers." />
        <div className="grid border-t-2 border-ink md:grid-cols-3">
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
        <SectionHead eyebrow="Verified on AWS" title={<>Credentials you can <strong>trust.</strong></>} desc="Every tier, competency and designation below is validated by AWS and listed on our AWS Partner profile. Don't take our word for it." />
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {credentials.map((c) => (
            <li key={c.name} className="flex flex-col items-center border border-line bg-bg p-4 text-center">
              {/* TODO: swap the placeholder for the official AWS badge artwork */}
              <div className="grid aspect-square w-full max-w-[7.5rem] place-items-center border border-dashed border-line-strong font-mono text-[0.55rem] uppercase tracking-widest text-muted">Official badge</div>
              <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-widest text-muted">{c.kind}</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-ink">{c.name}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Button href={APN_PROFILE_URL}>View Comprinno on the AWS Partner Network ↗</Button>
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

      {/* BILLING */}
      <Section>
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
          <figure className="bg-grid border border-line-strong p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">How it works · Illustrative</p>
            <div className="mt-4 flex items-center justify-between border border-line bg-bg p-4">
              <span className="font-semibold text-ink">Your AWS accounts</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Unchanged</span>
            </div>
            <p className="my-3 text-center text-sm text-muted">↓ billing transfer</p>
            <div className="flex flex-wrap items-center justify-between gap-2 border border-ink bg-surface p-4">
              <span className="font-semibold text-ink">Comprinno</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Invoice · Cost reviews · Support</span>
            </div>
            <p className="my-3 text-center text-sm text-muted" aria-hidden="true">↓</p>
            <div className="border border-line bg-bg p-4 font-semibold text-ink">One invoice, one accountable partner</div>
          </figure>
        </div>
      </Section>

      {/* OUR PRODUCTS */}
      <Section tone="surface">
        <SectionHead eyebrow="Built on AWS, by us" title={<>We don’t just deploy AWS. <strong>We build products on it.</strong></>} desc="Our own platforms run on the same AWS services we recommend to you, so our advice comes from production, not slides." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ownProducts.map((p) => (
            <Link key={p.name} href={p.href} className="card group flex flex-col">
              <span className={`self-start ${p.tag === "Beta" ? "border border-amber-400 bg-amber-50 px-1.5 py-px font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-amber-700" : "tag"}`}>{p.tag}</span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              <span className="mt-auto pt-5 text-sm font-medium text-ink group-hover:underline">Explore {p.name} →</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* OUTCOMES */}
      <Section>
        <SectionHead eyebrow="Outcomes on AWS" title={<><strong>Results on AWS</strong>, not just badges.</>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <Link key={o.href} href={o.href} className="card group flex flex-col">
              <span className="tag self-start">{o.tag}</span>
              <p className="mt-4 text-3xl font-semibold text-ink">{o.metric}</p>
              <p className="mt-1 text-sm text-muted">{o.what}</p>
              <p className="mt-3 font-semibold leading-snug text-ink">{o.title}</p>
              <span className="mt-auto pt-5 text-sm font-medium text-ink group-hover:underline">Read the story →</span>
            </Link>
          ))}
        </div>
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
    </>
  );
}
