import type { Metadata } from "next";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import GridGlow from "@/components/GridGlow";
import Pronounce from "./Pronounce";
import RainField from "@/components/RainField";

export const metadata: Metadata = {
  title: "Decivo multi-agent orchestration platform | Comprinno",
  description:
    "Decivo turns business processes into production AI-agent workflows: specialized agents orchestrated together, people supervising approvals and exceptions, deployed in your own cloud.",
  alternates: { canonical: "/products/decivo" },
};

const statusCls: Record<string, string> = {
  ok: "border-emerald-300 bg-emerald-50 text-emerald-700",
  wait: "border-amber-300 bg-amber-50 text-amber-700",
  muted: "border-line-strong text-muted",
};

function Badge({ children, tone }: { children: string; tone: keyof typeof statusCls }) {
  return <span className={`border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest ${statusCls[tone]}`}>{children}</span>;
}

/** Illustrative multi-agent workflow for the hero. */
function WorkflowCard() {
  const agents: { name: string; task: string; tone: keyof typeof statusCls; status: string }[] = [
    { name: "Intake agent", task: "Classifies incoming documents", tone: "ok", status: "Done" },
    { name: "Extraction agent", task: "Pulls fields with source evidence", tone: "ok", status: "Done" },
    { name: "Validation agent", task: "Checks against your rules and systems", tone: "ok", status: "Done" },
  ];
  return (
    <figure className="border border-line-strong bg-bg shadow-xl">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span>Workflow · Supplier invoice approval</span>
        <span className="uppercase tracking-widest">Illustrative</span>
      </figcaption>
      <ol className="grid gap-2 p-5">
        {agents.map((a) => (
          <li key={a.name} className="flex items-center justify-between gap-3 border border-line p-3">
            <span className="flex items-center gap-3">
              <IconTile name="agent" />
              <span>
                <span className="block text-sm font-semibold text-ink">{a.name}</span>
                <span className="block text-xs text-muted">{a.task}</span>
              </span>
            </span>
            <Badge tone={a.tone}>{a.status}</Badge>
          </li>
        ))}
        <li className="flex items-center justify-between gap-3 border border-ink bg-surface p-3">
          <span className="flex items-center gap-3">
            <IconTile name="user" />
            <span>
              <span className="block text-sm font-semibold text-ink">Finance reviewer</span>
              <span className="block text-xs text-muted">1 exception needs a decision</span>
            </span>
          </span>
          <Badge tone="wait">Your call</Badge>
        </li>
        <li className="flex items-center gap-2 pt-1 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
          <Icon name="cloud" className="h-3.5 w-3.5" /> Running in your cloud account
        </li>
      </ol>
    </figure>
  );
}

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Manual by default", desc: "Large teams still copy data between systems, chase approvals and check documents by hand.", icon: "users" },
  { title: "Fragmented across systems", desc: "One process touches email, spreadsheets, ERPs and portals, with people stitching the steps together.", icon: "puzzle" },
  { title: "Expensive to scale", desc: "More volume means more people, and accuracy and speed slip as the work grows.", icon: "coin" },
];

const howSteps = [
  { title: "Discover", desc: "Map how the process runs today and where people spend their time." },
  { title: "Design", desc: "Redesign it as a workflow of specialized agents, with review points where judgment matters." },
  { title: "Validate", desc: "Prove accuracy, controls and value on a working prototype with your data." },
  { title: "Deploy", desc: "Move the validated workflow to production in your own cloud." },
  { title: "Expand", desc: "Take the next workflow onto the same platform, team by team." },
];

// TODO [VALIDATE]: confirm each capability is supported today before publishing.
const capabilities: { title: string; desc: string; icon: IconName }[] = [
  { title: "Multi-agent orchestration", desc: "Specialized agents work together like a team, passing information and coordinating tasks through a defined workflow.", icon: "agent" },
  { title: "Enterprise integrations", desc: "Agents read from and act in the systems your process already depends on.", icon: "puzzle" },
  { title: "Human-in-the-loop controls", desc: "People handle approvals, judgment calls and exceptions, and every decision is recorded.", icon: "user" },
  { title: "Workflow execution", desc: "Design, run and version workflows in one place, from first prototype to production.", icon: "loop" },
  { title: "Monitoring and governance", desc: "See what each agent did, what it returned and what it cost, run by run.", icon: "eye" },
  { title: "Built to reuse", desc: "Every new workflow runs on the same engine, controls and review flow, not a new build.", icon: "layers" },
];

const useCases: { fn: string; icon: IconName; items: string[] }[] = [
  { fn: "Finance", icon: "bank", items: ["Invoice processing and matching", "Reconciliations", "Close and reporting packs"] },
  { fn: "Procurement", icon: "cart", items: ["RFQ and quote evaluation", "Supplier onboarding checks", "Contract intake"] },
  { fn: "Marketing", icon: "chart", items: ["Campaign reporting", "Content review and approvals", "Data validation across channels"] },
  { fn: "Security", icon: "shield", items: ["Alert triage and enrichment", "Access review workflows", "Evidence collection for audits"] },
  { fn: "Operations", icon: "building", items: ["Document management", "Order and exception handling", "Approval routing"] },
];

const deployment: { title: string; desc: string; icon: IconName }[] = [
  { title: "Your cloud", desc: "Decivo runs inside your own cloud environment, not ours.", icon: "cloud" },
  { title: "Your data", desc: "Documents and records stay where they are, under your control.", icon: "database" },
  { title: "Your controls", desc: "Your security policies, identity and governance apply to every agent.", icon: "lock" },
];

const fdeSteps = [
  "Understand and document how the process runs today",
  "Find where agents and redesign can help",
  "Turn requirements into an agent-based workflow",
  "Prove feasibility with a fast prototype",
  "Validate outcomes, accuracy and controls",
  "Deploy the validated workflow to production",
  "Find the next workflow and repeat",
];

const expansion = [
  { k: "Start", title: "One workflow", desc: "One or two high-value processes in finance, procurement, marketing or operations." },
  { k: "Grow", title: "Several functions", desc: "Once the first runs in production, more workflows follow across teams." },
  { k: "Scale", title: "Enterprise-wide", desc: "Decivo becomes the shared layer that runs agent-led work across the business." },
];

const outcomes: { title: string; desc: string; icon: IconName }[] = [
  { title: "Time to production", desc: "How fast a process goes from discovery to a live workflow.", icon: "clock" },
  { title: "Process throughput", desc: "How much work flows through without waiting on people.", icon: "rocket" },
  { title: "Accuracy", desc: "How often outputs pass your checks the first time.", icon: "check" },
  { title: "Capacity freed", desc: "Hours your team moves from repetitive steps to higher-value work.", icon: "users" },
];

// TODO: answers drafted from the product brief — confirm with the Decivo team.
const faqs = [
  { q: "Is Decivo available today?", a: "Decivo is in beta. We're working with early teams to take their first workflows to production." },
  { q: "Is this a chatbot or a copilot?", a: "No. Decivo runs whole business processes as workflows of specialized agents, with people supervising approvals and exceptions." },
  { q: "Will it replace our team?", a: "It takes on repetitive digital steps so your people can focus on judgment, exceptions and higher-value work. People stay in charge of decisions." },
  { q: "Where does it run?", a: "Inside your own cloud environment, so your data, infrastructure and security policies stay under your control." },
  { q: "Can every process be automated?", a: "Not every process is a good fit. We assess suitability first and keep human review wherever a decision matters." },
  { q: "How do we get started?", a: "Bring us one workflow. Our forward-deployed engineers map it, build a prototype on your data and validate it with you before anything goes live." },
];

export default function DecivoPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>Decivo · Multi-agent orchestration</Eyebrow>
                <span className="border border-dashed border-amber-400 bg-amber-50 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-amber-700">Beta</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-3 border border-line bg-surface py-1 pl-3 pr-1 font-mono text-[0.7rem] uppercase tracking-widest">
                <span className="text-muted">Pronounced:</span>
                <span className="text-ink">Deh-see-voh (from “decide”)</span>
                <Pronounce />
              </div>
              <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                From business process to <strong className="sweep">production AI agents.</strong>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Orchestrate AI agents to run digital workflows, with people supervising and everything deployed in your own cloud.
              </p>
              <div className="mt-8">
                <Button href="/contact">Discuss a workflow →</Button>
              </div>
            </div>
            <WorkflowCard />
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* PROBLEM */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="The problem" title={<>Digital work, <strong>still done by hand.</strong></>} desc="Coordination, document checks, validations, approvals and reporting still eat operating budgets, and get harder to keep accurate as volume grows." />
        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((p) => (
            <div key={p.title} className="card">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <SectionHead eyebrow="How it works" title={<>Discover to deploy, <strong>then expand.</strong></>} desc="Each workflow follows the same path from a process on paper to agents in production." />
        <FlowLoop items={howSteps} icons={["search", "puzzle", "check", "cloud", "rocket"]} caption="Each live workflow makes the next one faster to build" />
      </Section>

      {/* CAPABILITIES */}
      <Section tone="surface">
        <SectionHead eyebrow="Core capabilities" title={<>One platform to design, run <strong>and govern agent workflows.</strong></>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="card">
              <IconTile name={c.icon} />
              <h3 className="mt-4 font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* USE CASES */}
      <Section>
        <SectionHead eyebrow="Where teams start" title={<>Workflows worth <strong>handing to agents.</strong></>} desc="Examples by function. We assess each process for fit before building anything." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {useCases.map((u) => (
            <div key={u.fn} className="card">
              <IconTile name={u.icon} />
              <h3 className="mt-4 font-semibold text-ink">{u.fn}</h3>
              <ul className="mt-3 grid gap-2">
                {u.items.map((x) => (
                  <li key={x} className="flex gap-2 text-sm leading-snug text-muted">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* DEPLOYMENT */}
      <Section tone="surface">
        <SectionHead eyebrow="Deployment model" title={<>Your cloud. Your data. <strong>Your controls.</strong></>} desc="Built for teams with data sovereignty, privacy and governance requirements." />
        <div className="grid border-t-2 border-ink md:grid-cols-3">
          {deployment.map((d, i) => (
            <div key={d.title} className="card">
              <IconTile name={d.icon} />
              <p className="mt-4 font-mono text-[0.7rem] text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FDE */}
      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Eyebrow>Forward-deployed engineering</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Engineers who turn real processes <strong className="font-semibold">into live workflows.</strong></h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Our forward-deployed engineers combine business analysis with engineering. They sit with your process owners and shorten the path from discovery to production.</p>
            <div className="mt-8">
              <Button href="/contact" variant="ghost">Meet the team →</Button>
            </div>
          </div>
          <ol className="border-t-2 border-ink">
            {fdeSteps.map((s, i) => (
              <li key={s} className="flex gap-4 border-b border-line py-3.5">
                <span className="font-mono text-[0.7rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium text-ink sm:text-base">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* EXPANSION */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Land and expand" title={<>Start with one workflow. <strong>Grow from there.</strong></>} />
        <ol className="path-row path-row-3">
          {expansion.map((e) => (
            <li key={e.k}>
              <div className="path-card">
                <span className="path-mark" aria-hidden="true">{e.k}</span>
                <h3 className="text-xl font-semibold text-ink">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* OUTCOMES */}
      <Section>
        <SectionHead eyebrow="Business outcomes" title={<>What we measure <strong>with you.</strong></>} desc="We agree the measures before building, and report against them once the workflow is live." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((o) => (
            <div key={o.title} className="card">
              <IconTile name={o.icon} />
              <h3 className="mt-4 font-semibold text-ink">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{o.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions about <strong className="font-semibold">Decivo</strong>?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">What it is, where it runs and how teams get started.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Identify your first<Br /> <strong>agentic workflow.</strong></>}
        desc="Bring one process. We'll map it with you and show what an agent-led version could look like."
        steps={["Walk us through the process", "See a prototype on your data", "Agree what goes to production"]}
        label="Discuss a workflow"
      />
    </>
  );
}
