import type { Metadata } from "next";
import Link from "next/link";
import { Br, Button, CtaBand, Eyebrow, Faq, PageHero, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";

export const metadata: Metadata = {
  title: "Tevico: enterprise-grade CloudOps, Security, FinOps and Compliance for lean AWS teams",
  description:
    "You focus on your business. Tevico handles cloud cost, security, reliability and compliance across your AWS accounts.",
  alternates: { canonical: "/products/tevico" },
};

/** Framed product-screen placeholder (swap for real screenshots later). */
function Screen({ name, label }: { name: string; label: string }) {
  return (
    <figure className="border border-line-strong bg-bg">
      <figcaption className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 border border-line-strong" />)}</span>
        Tevico · {name}
      </figcaption>
      <div className="bg-grid flex aspect-[16/10] items-center justify-center p-4">
        <span className="border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">Product screen: {label}</span>
      </div>
    </figure>
  );
}

const numbers = [
  { value: "60", suffix: "%", label: "Average cost reduction" },
  { value: "80", suffix: "%", label: "Less manual effort" },
  { value: "250", suffix: "+", label: "Security checks" },
  { value: "24×7", suffix: "", label: "AWS monitoring" },
];

const solutions: { title: string; desc: string; icon: IconName }[] = [
  { title: "Cloud Financial Management", desc: "A cost dashboard to track spend across accounts and services, and catch cost leaks.", icon: "coin" },
  { title: "Cloud Security", desc: "24×7 monitoring for anomalies, with remediation workflows to restore a normal state.", icon: "shield" },
  { title: "AWS Security Assessment", desc: "A free, one-click assessment of your AWS account.", icon: "search" },
  { title: "Well-Architected Framework Review", desc: "A gamified review with auto-discovered issues and a remediation plan.", icon: "layers" },
  { title: "Cloud Reliability", desc: "Backups for self-hosted workloads, failure alerts and backup history for recovery.", icon: "chart" },
  { title: "Cloud Inventory", desc: "A real-time view of every AWS resource you run.", icon: "cube" },
  { title: "Platform Integrations", desc: "Jira and Slack, with incident tickets logged automatically when threats are found.", icon: "puzzle" },
  { title: "Compliance Reports", desc: "Findings grouped by resource, status and severity, scored against recognized standards.", icon: "check" },
];

const inside = [
  { k: "FinOps", title: "Know where every dollar goes.", points: ["Spend by account, service, usage type and region", "Daily cost trends and your top five costliest regions", "Savings recommendations, like right-sizing over-provisioned EC2"], screen: ["Cost Dashboard", "cost trends + savings recommendations"] },
  { k: "Security & compliance", title: "A security score you can track.", points: ["250+ checks behind one AWS security score", "Scored against CIS AWS Foundations Benchmark v1.2.0 and AWS Foundational Security Best Practices v1.0.0", "Score history, so you can show progress over time"], screen: ["Security Score", "score + findings by severity"] },
  { k: "Well-Architected", title: "A WAFR your team will actually finish.", points: ["Issues discovered automatically", "A remediation plan with progress tracking", "Upload architecture diagrams alongside the review"], screen: ["WAFR", "review progress + remediation plan"] },
];

const steps = [
  { title: "Sign up", desc: "Create a free account and connect your AWS account with read-only access." },
  { title: "Analyze", desc: "Tevico reviews your current infrastructure and picks the metrics worth tracking." },
  { title: "Monitor", desc: "Tevico watches your AWS environment continuously, 24×7." },
];

const onDemand = [
  "A hassle-free alternative to onboarding consultants during a crisis",
  "A fraction of the cost of full-time support staff",
  "A subject matter expert for design, scaling or complex problems",
  "Predefined templates to get common work done fast",
];

const privacy: { title: string; desc: string; icon: IconName }[] = [
  { title: "Read-only access", desc: "Tevico reads only the data you authorize, through standard read-only APIs.", icon: "eye" },
  { title: "Metadata, not data", desc: "It monitors configurations and metadata. It can't see what's inside your systems, like data on EBS volumes.", icon: "layers" },
  { title: "Your code stays yours", desc: "Insights come from metadata, so your code and IP are never touched.", icon: "code" },
  { title: "You stay in control", desc: "You enable services like Security Hub and AWS Config yourself. Tevico doesn't switch anything on.", icon: "user" },
];

const results = [
  { metric: "$8.5–9k", what: "saved per month, with about 80% less effort", name: "Ashok Ranadive", role: "Co-founder & CEO, Enerlly" },
  { metric: "$7k+", what: "saved, with more than 65% less effort", name: "Kamal Aggarwal", role: "Co-founder & CEO, Autowiz" },
];

const faqs = [
  { q: "What is Tevico?", a: "Tevico is a cloud governance platform for AWS. It brings cost, security, reliability, inventory and compliance into one place, for lean teams that need enterprise-grade CloudOps without a large team." },
  { q: "What is cloud governance?", a: "The practices and controls that keep your cloud cost-efficient, secure, reliable and compliant: knowing what you run, what it costs, what risks it carries and whether it meets the standards you're held to." },
  { q: "Why use Tevico when AWS already has dashboards?", a: "AWS tools each cover one area. Tevico brings cost, security, inventory, reliability and compliance together in one view, adds a single security score with history, savings recommendations and a guided Well-Architected review, and logs incidents into Jira and Slack." },
  { q: "What will logging cost?", a: "Tevico itself reads metadata through read-only APIs. Any additional cost comes from AWS services you choose to enable, such as AWS Config or Security Hub, and is billed by AWS at its standard rates." },
  { q: "Is Tevico safe for regulated industries?", a: "Yes. It's low-footprint and privacy-conscious: read-only access, metadata only, and nothing is switched on without you. It never sees the data inside your systems." },
  { q: "Does Tevico see my code?", a: "No. Insights come from configurations and metadata, so your code and IP are never touched.", icon: "code" },
  { q: "Does Tevico do CI/CD or infrastructure orchestration?", a: "No. Tevico governs and monitors your AWS environment. For CI/CD and infrastructure work, our on-demand DevOps and SRE engineers can help." },
];

export default function TevicoPage() {
  return (
    <>
      <PageHero
        eyebrow="Tevico · Cloud governance for AWS"
        title={<>Cloud governance <strong className="sweep">on autopilot</strong>,<Br /> for <strong>lean AWS teams</strong>.</>}
        desc={<><span className="lg:block lg:whitespace-nowrap">You focus on your business. Tevico handles cloud cost, security,</span>{" "}<span className="lg:block lg:whitespace-nowrap">reliability and compliance across your AWS accounts.</span></>}
      >
        <Button href="/contact">Create free account →</Button>
      </PageHero>

      <LogoMarquee />

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

      {/* SOLUTIONS */}
      <Section tone="surface">
        <SectionHead eyebrow="Solutions" title={<>One platform to <strong>govern your AWS cloud.</strong></>} desc="Cost, security, reliability and inventory in one place, with the reports and automation lean teams need." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s) => (
            <div key={s.title} className="card">
              <IconTile name={s.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink lg:min-h-[2.75em]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* INSIDE TEVICO */}
      <Section>
        <SectionHead eyebrow="Inside Tevico" title={<>See it. Fix it. <strong>Prove it.</strong></>} desc="Three views your team will use every week." />
        <div className="grid gap-16">
          {inside.map((x, i) => (
            <div key={x.k} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{x.k}</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{x.title}</h3>
                <ul className="mt-5 grid gap-3">
                  {x.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink sm:text-base">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}><Screen name={x.screen[0]} label={x.screen[1]} /></div>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section tone="surface">
        <SectionHead eyebrow="How it works" title={<>Three steps to <strong>a governed cloud</strong>.</>} desc="From sign-up to 24×7 monitoring, without touching your workloads." />
        <FlowLoop items={steps} icons={["rocket", "search", "eye"]} caption="Repeat again: Tevico keeps watching, so your cloud stays governed" />
      </Section>

      {/* ON-DEMAND SERVICES */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <div>
            <Eyebrow>On-demand services</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Experts when you need them,<Br /> <strong className="font-semibold">not on payroll.</strong></h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">AWS-certified DevOps and SRE engineers, solution architects and security specialists, with ready-made infrastructure templates.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["SysOps", "DevOps", "SecOps", "DataOps", "MLOps", "NetOps"].map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {onDemand.map((x) => (
              <li key={x} className="flex gap-3 border border-line bg-bg p-4 text-sm leading-relaxed text-ink">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* SECURITY & PRIVACY */}
      <Section tone="surface">
        <SectionHead eyebrow="Security & privacy" title={<>Reads metadata. <strong>Never your data.</strong></>} desc="Low-footprint and privacy-conscious, so it fits regulated environments." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {privacy.map((p) => (
            <div key={p.title} className="card">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CUSTOMER RESULTS */}
      <Section>
        <SectionHead eyebrow="Customer results" title={<><strong>Real savings</strong>, every month.</>} desc="What lean teams save once Tevico governs their AWS accounts." />
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((r) => (
            <figure key={r.name} className="card">
              <p className="text-4xl font-semibold text-ink sm:text-5xl">{r.metric}</p>
              <p className="mt-1 text-ink-2">{r.what}</p>
              <figcaption className="mt-5 border-t border-line pt-4">
                <span className="block font-semibold text-ink">{r.name}</span>
                <span className="mt-1 block font-mono text-[0.7rem] uppercase tracking-widest text-muted">{r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-line-strong bg-surface p-5 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-2 sm:text-base"><strong className="text-ink">Want us to run it for you?</strong> Every Comprinno managed services plan includes Tevico Premium.</p>
          <Button href="/services/manage#plans" variant="ghost">See managed services plans →</Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions <strong className="font-semibold">worth asking</strong>.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Quick answers about Tevico and how it works.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Onboard on Tevico <strong>for free</strong>.</>}
        desc="Connect your AWS account and see your cost, security and inventory in one place."
        steps={[]}
        label="Create free account"
      >
        <p className="mt-6 font-mono text-xs text-muted [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">
          <Link href="/contact">Run a free AWS security assessment</Link> · Also on AWS Marketplace · Brought to you by Comprinno
        </p>
      </CtaBand>
    </>
  );
}
