import type { Metadata } from "next";
import Link from "next/link";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import OutcomeArt from "@/components/OutcomeArt";

export const metadata: Metadata = {
  title: "Migrate: move to the cloud in planned waves",
  description:
    "Data centers, VMware estates, databases and AI workloads, moved by a migration factory. A tested rollback plan behind every cutover, and funding checked before you spend.",
  alternates: { canonical: "/services/migrate" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "No clear starting point", desc: "Without a full inventory of applications and dependencies, you can't decide what moves first or what it will cost.", icon: "database" },
  { title: "Deadline pressure", desc: "Data center lease renewals, VMware licensing changes and hardware refreshes force decisions before you're ready.", icon: "clock" },
  { title: "Cutover risk", desc: "One failed cutover can mean lost data and downtime, so migrations stall in planning.", icon: "cloud" },
  { title: "Dual-running costs", desc: "Every month old and new environments run side by side adds cost and erodes the business case.", icon: "coin" },
];

const disciplines = [
  { k: "01 · Solves: cutover risk", mark: "Waves", title: "Migration Factory", desc: "Servers, VMs and applications moved in planned waves, with standard runbooks, automation and AWS Application Migration Service.", tags: ["Wave-based cutovers", "Runbook-driven"] },
  { k: "02 · Solves: no starting point", mark: "Ground", title: "Landing Zone Accelerator", desc: "A secure, multi-account foundation with identity, networking, logging, guardrails and cost controls in place before the first workload moves. Built on 100+ landing zone projects.", tags: ["Multi-account setup", "Guardrails from day one"] },
  { k: "03 · Solves: data-loss fear", mark: "Data", title: "Data & Storage Migration", desc: "Databases, object storage and file systems moved with change data capture and checksum validation, so data stays intact. AWS DMS Delivery designation.", tags: ["Data validated", "Planned cutover windows"] },
  { k: "04 · Ready for Maximize", mark: "AI", title: "AI/ML Stack Migration", desc: "ML pipelines, models and GPU workloads re-platformed onto cloud-native stacks such as Amazon SageMaker AI and Amazon EKS. Backed by 40+ AI/ML projects.", tags: ["MLOps ready", "GPU workloads"] },
];

const moves: { title: string; icon: IconName }[] = [
  { title: "VMware to the cloud", icon: "layers" },
  { title: "Data center exit", icon: "building" },
  { title: "Windows & SQL Server", icon: "code" },
  { title: "SQL & NoSQL databases", icon: "database" },
  { title: "Azure & Google Cloud to AWS", icon: "cloud" },
  { title: "Object storage & file systems", icon: "cube" },
  { title: "SAP & ERP workloads", icon: "chart" },
  { title: "AI/ML pipelines & models", icon: "spark" },
];

const numbers = [
  { value: "1,000", suffix: "+", label: "Projects delivered" },
  { value: "200", suffix: "+", label: "Businesses migrated" },
  { value: "300", suffix: "+", label: "Workloads moved" },
  { value: "98", suffix: "%", label: "Client satisfaction (CSAT)" },
];

const steps = [
  { title: "Plan", desc: "Assess workloads, map dependencies and risks, build the roadmap and business case, and check funding." },
  { title: "Prepare", desc: "Stand up a secure, multi-account landing zone with guardrails and cost controls." },
  { title: "Migrate", desc: "Move workloads in automated, phased waves, each with a tested rollback plan." },
  { title: "Validate", desc: "Check performance, data integrity and security after every wave." },
  { title: "Optimize", desc: "Tune performance, cost and resilience after cutover, with up to 24×7 managed operations." },
];

const included = [
  "A business case and TCO model before you commit",
  "Funding eligibility checked during the assessment",
  "A dependency map and phased migration roadmap",
  "Tested runbooks and a rollback plan for every cutover",
  "Data integrity checks for every database and storage move",
  "A secure, multi-account landing zone from day one",
  "Resource tagging so eligible workloads earn migration credits",
  "Right-sizing and Savings Plans review after cutover",
  "Controls mapped to your regulator's requirements",
  "One team from assessment to managed operations",
];

const credentials = ["AWS Migration Competency", "AWS DMS Delivery designation", "AWS Premier Tier Partner", "ISO 27001 & SOC 2 Type II"];

const outcomes = [
  { tag: "Cloud to cloud · Data", metric: "Near real-time", what: "MongoDB sync through cutover", title: "PocoCare moves from Azure Cosmos DB to AWS", href: "/case-studies/pococare-azure-cosmos-db-to-aws", icon: "database" as IconName },
  { tag: "Cloud to cloud", metric: "Zero downtime", what: "validated cutover", title: "An industrial intelligence provider moves from Google Cloud to AWS", href: "/case-studies/industrial-intelligence-gcp-to-aws", icon: "migrate" as IconName },
  { tag: "Data center exit", metric: "95%+", what: "of services now serverless or managed", title: "MediBuddy moves from its data center to AWS", href: "/case-studies/medibuddy-data-center-to-aws", icon: "building" as IconName },
];

const faqs = [
  { q: "How long does a migration take?", a: "Simple migrations take about 2 to 4 weeks. Complex estates take 6 to 12 weeks or more. The free assessment usually takes 5 to 7 business days." },
  { q: "Will our applications have downtime?", a: "Databases replicate continuously, so the final switch is brief. VMware workloads can use a 10-minute cutover SLA through Datamotive EasyMigrate. Every cutover has a pre-validated rollback plan." },
  { q: "Can we get funding for our migration?", a: "Often, yes. Migration funding may be available across three phases, and a free licensing assessment reviews your IT assets and licenses. Funding is subject to provider approval." },
  { q: "What is a migration factory?", a: "A repeatable, wave-based approach with standard runbooks and automation. It suits estates with dozens or hundreds of servers." },
  { q: "How do you decide whether to rehost, re-platform or refactor?", a: "Each application is assessed and given a path: rehost, re-platform, refactor, repurchase or retire. Many estates rehost first and modernize later." },
  { q: "Can you migrate us from Azure or Google Cloud?", a: "Yes. We've moved 300+ production workloads from Azure, Google Cloud and on-premises environments, including Liquidmind (Azure) and Skill-Lync (DigitalOcean)." },
  { q: "How do you handle security and compliance during migration?", a: "Guardrails, logging and encryption are set up before the move, and controls are mapped to regulators such as RBI, SEBI and IRDAI." },
  { q: "What happens after cutover?", a: "Workloads can move straight into managed operations (up to 24×7): monitoring, patching, security operations and cost reviews." },
];

export default function MigratePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <Eyebrow>Migrate · Stage 01 of 04</Eyebrow>
            <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.6rem)] font-normal leading-[1.1]">
              <span className="lg:whitespace-nowrap">Move to the cloud in <strong className="sweep font-bold">planned waves</strong>,</span><Br /> not <strong className="font-bold">one risky leap</strong>.
            </h1>
            <p className="mt-5 max-w-5xl text-base leading-relaxed text-muted sm:text-lg">
              <span className="lg:block lg:whitespace-nowrap">Data centers, VMware estates, databases and AI workloads, moved by a migration factory.</span>{" "}
              <span className="lg:block lg:whitespace-nowrap">A tested rollback plan behind every cutover, and funding checked before you spend.</span>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Get a free migration assessment →</Button>
            </div>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* PROBLEM */}
      <Section tone="surface">
        <SectionHead eyebrow="The problem" title={<>Migration isn&apos;t one problem. <strong>It&apos;s four.</strong></>} desc="Any one of them can stall a move. Each one is fixable." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div key={p.title} className="card">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PATH: four disciplines */}
      <Section>
        <SectionHead eyebrow="The path" title={<><strong>One factory.</strong> Four migration disciplines.</>} desc="One team answers all four problems, with standard runbooks and automation, so every wave is faster and more predictable than the last." />
        <ol className="path-row">
          {disciplines.map((d) => (
            <li key={d.title}>
              <div className="path-card">
                <span className="path-mark" aria-hidden="true">{d.mark}</span>
                <span className="path-verb">{d.k}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.desc}</p>
                <span className="mt-auto flex flex-wrap gap-2 pt-5">
                  {d.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* WHAT WE MIGRATE */}
      <Section tone="surface" className="bg-grid">
        <SectionHead eyebrow="What we migrate" title={<>Whatever you&apos;re moving, <strong>we&apos;ve moved it before.</strong></>} desc="From a single server to a whole data center, across every major platform." />
        <ul className="grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {moves.map((m) => (
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
          {numbers.map((st) => (
            <div key={st.label} className="stat">
              <dt className="stat-label">{st.label}</dt>
              <dd className="stat-num">{st.value}<span className="stat-suffix">{st.suffix}</span></dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* HOW A MIGRATION RUNS */}
      <Section id="how" className="scroll-mt-16">
        <SectionHead eyebrow="How a migration runs" title={<>Five steps, <strong>one team</strong>, <strong>no surprises</strong>.</>} desc="The team that plans your waves also moves them and runs what lands." />
        <FlowLoop items={steps} icons={["search", "layers", "migrate", "shield", "chart"]} caption="→ then on to Modernize: your workloads arrive ready for the next stage" />
      </Section>

      {/* BUILT IN */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <Eyebrow>Built in, as standard</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">What <strong className="font-semibold">every migration</strong><Br /> includes.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Whatever your size, you get the same team and the same standards. None of this is an add-on.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {included.map((x) => (
              <li key={x} className="flex gap-3 border border-line bg-bg p-4 text-sm leading-relaxed text-ink">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* CREDENTIALS */}
      <Section>
        <SectionHead eyebrow="Credentials" title={<>Migration credentials you can <strong>trust</strong>.</>} desc="Independently validated for exactly this kind of work." />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {credentials.map((c) => (
            <li key={c} className="card flex items-center gap-3 text-sm font-semibold text-ink sm:text-base">
              <IconTile name="check" />
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {/* OUTCOMES */}
      <Section tone="surface">
        <SectionHead eyebrow="Outcomes" title={<><strong>Migrations delivered</strong>, not just planned.</>} desc="Real cutovers from teams that moved with us." />
        <div className="grid gap-4 md:grid-cols-3">
          {outcomes.map((o, i) => (
            <Link key={o.href} href={o.href} className="card block">
              <div className="flex items-center justify-between">
                <IconTile name={o.icon} />
                <span className="tag">{o.tag}</span>
              </div>
              <div className="mt-5 border border-line bg-surface p-3">
                <OutcomeArt variant={i + 3} />
              </div>
              <p className="mt-5 text-4xl font-semibold text-ink sm:text-5xl">{o.metric}</p>
              <p className="mt-1 text-ink-2">{o.what}</p>
              <p className="mt-4 font-semibold text-ink">{o.title}</p>
              <p className="mt-3 text-sm font-medium text-ink">Read the story <span className="go">→</span></p>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/case-studies" variant="ghost">All migration stories →</Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions before you<Br /> <strong className="font-semibold">move</strong>?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Quick answers to what teams ask us before a migration.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Planning a <strong>data center</strong><Br /> or <strong>VMware exit</strong>?</>}
        desc="Start with a free assessment. You'll know the timeline, the cost and the funding before you commit."
        steps={["Free assessment, 5–7 business days", "Timeline, cost estimate + funding check", "A wave plan you can act on"]}
        label="Get a free migration assessment"
      >
        <p className="mt-8 font-mono text-xs text-muted">
          Already moved? Next stage →{" "}
          <Link href="/services/modernize" className="text-ink underline underline-offset-4">Modernize</Link> ·{" "}
          <Link href="/services/manage" className="text-ink underline underline-offset-4">Manage</Link>
        </p>
      </CtaBand>
    </>
  );
}
