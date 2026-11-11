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

/** Simple left → core → right block diagram for "Inside Decivo". */
function Diagram({ title, left, core, right }: { title: string; left: string[]; core: string; right: { label: string; planned?: boolean }[] }) {
  const box = "border border-line-strong bg-bg px-3 py-1.5 text-xs text-ink sm:text-sm";
  return (
    <figure className="border border-line-strong bg-bg">
      <figcaption className="border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">Decivo · {title}</figcaption>
      <div className="bg-grid grid grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-2 p-5 sm:gap-3 sm:p-8">
        <div className="grid gap-2">{left.map((l) => <span key={l} className={box}>{l}</span>)}</div>
        <span className="text-muted" aria-hidden="true">→</span>
        <span className="bg-ink px-3 py-3 text-center text-xs font-semibold text-white sm:px-5 sm:text-sm">{core}</span>
        <span className="text-muted" aria-hidden="true">→</span>
        <div className="grid gap-2">
          {right.map((r) => (
            <span key={r.label} className={`${box} flex items-center justify-between gap-2`}>
              {r.label}
              {r.planned && <Badge tone="wait">Planned</Badge>}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}

const inside: { k: string; title: string; points: string[]; diagram: Parameters<typeof Diagram>[0]; caption: string }[] = [
  { k: "01 · Intake", title: "Bring work in from every channel.", points: ["Documents and email, APIs and events, portals and forms, and human requests", "A workflow state store and document storage keep every case in one place", "Knowledge base, vector memory and a prompt and schema registry give agents the right context"], diagram: { title: "Channels and intake", left: ["Documents and email", "APIs and events", "Portals and forms", "Human requests"], core: "Workflow state", right: [{ label: "Document storage" }, { label: "Knowledge base" }, { label: "Schema registry" }] }, caption: "Every input lands in one tracked workflow, with the context agents need." },
  { k: "02 · Execution", title: "Let agents do the work, within the rules.", points: ["Orchestration moves each case through the right steps", "Memory and context carry information across the whole process", "Tool calling, guardrails and observability keep every action controlled and visible"], diagram: { title: "Agentic execution layer", left: ["Orchestration", "Memory and context"], core: "Agentic execution", right: [{ label: "Tool calling" }, { label: "Guardrails" }, { label: "Observability" }] }, caption: "Agents read and reason. Rules decide what happens next." },
  { k: "03 · Integration", title: "Connect results to the systems you run on.", points: ["A model gateway, workflow engine and event queues run every workflow", "Human-in-the-loop routes exceptions to the right person", "Connectors to ERP, CRM, procurement and internal tools are planned"], diagram: { title: "Runtime and integration fabric", left: ["Model gateway", "Workflow engine", "Event bus and queues"], core: "Runtime", right: [{ label: "Human-in-the-loop" }, { label: "ERP and CRM", planned: true }, { label: "Connector services", planned: true }] }, caption: "One runtime underneath. Business-system connectors are on the roadmap." },
  { k: "04 · Governance", title: "Keep every step secure and auditable.", points: ["Identity and access control on every action", "A full audit trail to support compliance reviews", "Monitoring and alerts, plus policies, secrets and approvals"], diagram: { title: "Security, ops and governance", left: ["Identity and access", "Policies and secrets", "Approvals"], core: "Governance", right: [{ label: "Audit trail" }, { label: "Monitoring and alerts" }] }, caption: "Built so teams can see who did what, when and why." },
];

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
  { q: "Is Decivo available today?", a: "Yes. We're working with teams to take their first workflows to production." },
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

      {/* INSIDE DECIVO */}
      <Section tone="surface">
        <SectionHead eyebrow="Inside Decivo" title={<>One reusable backend. <strong>Many business workflows.</strong></>} desc="See how Decivo takes work in, runs it with agents, connects the results and keeps every step governed." />
        <div className="grid gap-16">
          {inside.map((x, i) => (
            <div key={x.k} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">{x.k}</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{x.title}</h3>
                <ul className="mt-5 grid gap-3">
                  {x.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ink sm:text-base">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}>
                <Diagram {...x.diagram} />
                <p className="mt-3 text-sm text-muted">{x.caption}</p>
              </div>
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
