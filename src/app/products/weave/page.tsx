import type { Metadata } from "next";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead, contactHref } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import GridGlow from "@/components/GridGlow";
import IndustryUseCases, { type IndustryGroup } from "./IndustryUseCases";
import UseCaseTabs, { type UseCase } from "./UseCaseTabs";
import RainField from "@/components/RainField";
import { WeaveHero, IntakeView, ExecutionView, IntegrationView, GovernanceView } from "./Art";

const INSIDE_VIEWS = [IntakeView, ExecutionView, IntegrationView, GovernanceView];

export const metadata: Metadata = {
  title: "Weave enterprise agentic process transformation",
  description:
    "Turn business processes into AI-powered operations. Weave coordinates AI-agent workflows with human oversight, in your cloud, with engineers from discovery to production.",
  alternates: { canonical: "/products/weave" },
};

// Hidden for now (kept, not deleted): "What Weave enables", "Use cases by function", "Expand across the enterprise".
const SHOW_HIDDEN = false as boolean;

// Use cases from the Comprinno GenAI use-case sheet, grouped by industry.
const industryUseCases: IndustryGroup[] = [
  { industry: "BFSI", items: [
    { title: "Policy and product query resolution", desc: "Agents get accurate answers on complex insurance policies, loan products and investment schemes without searching long documents.", icon: "search" },
    { title: "KYC and AML document validation", desc: "Check customer documents and pull the information reviewers need, with exceptions flagged.", icon: "user" },
    { title: "Loan underwriting document analysis", desc: "Read and analyze underwriting documents so credit teams decide faster.", icon: "bank" },
    { title: "Claims process automation", desc: "Move claims and hospitalization intimations through intake, checks and routing with less manual work.", icon: "layers" },
    { title: "Account and transaction inquiries", desc: "Customers check balances, transactions and account details through natural conversation.", icon: "card" },
    { title: "Vendor and third-party risk", desc: "Run vendor risk assessments consistently, with evidence for every answer.", icon: "shield" },
  ] },
  { industry: "Life sciences", items: [
    { title: "Medical information desk", desc: "Medical affairs teams answer healthcare professional queries with approved product information.", icon: "flask" },
    { title: "Vendor and CRO qualification", desc: "Structure qualification workflows for vendors and contract research organizations.", icon: "check" },
    { title: "Appointment scheduling and reminders", desc: "Book appointments and send patient reminders automatically.", icon: "clock" },
    { title: "Pre-consultation triage", desc: "Gather symptoms and assess patients before the doctor visit.", icon: "heart" },
    { title: "Medical equipment operation", desc: "Staff get step-by-step guidance and safety protocols for complex medical devices.", icon: "dna" },
    { title: "Medical content analytics", desc: "Understand how clinical resources and e-learning content are used across portals.", icon: "chart" },
  ] },
  { industry: "Manufacturing", items: [
    { title: "Technical support and troubleshooting", desc: "Field engineers get resolution steps from equipment manuals, maintenance guides and fault codes.", icon: "puzzle" },
    { title: "Quality and SOP compliance", desc: "Shop-floor supervisors check procedures and quality standards on demand.", icon: "check" },
    { title: "Safety compliance assistant", desc: "Workers ask safety questions by voice or text and get immediate guidance.", icon: "shield" },
    { title: "Maintenance guidance", desc: "Technicians get step-by-step repair and troubleshooting instructions.", icon: "cube" },
    { title: "Production recipe and parameters", desc: "Operators get recommended machine settings for each product.", icon: "chart" },
    { title: "Contract and procurement due diligence", desc: "Review supplier contracts and procurement documents against your requirements.", icon: "building" },
  ] },
  { industry: "Retail", items: [
    { title: "Customer service agent assist", desc: "Contact-center agents resolve returns, warranty and shipping questions without escalation.", icon: "users" },
    { title: "Store associate enablement", desc: "In-store staff get instant answers on products and policies.", icon: "store" },
    { title: "Order status and delivery tracking", desc: "Customers check orders and deliveries through natural conversation, no agent needed.", icon: "cart" },
    { title: "Product availability checks", desc: "Customers and staff check stock and availability across stores and channels instantly.", icon: "bag" },
    { title: "Peak-sale storefront monitoring", desc: "During flash sales, delivery logs are processed automatically and failures flagged in real time.", icon: "chart" },
    { title: "In-store inventory tracking", desc: "Detect stockouts from shelf data and trigger replenishment.", icon: "card" },
  ] },
];

const inside: { k: string; title: string; points: string[] }[] = [
  { k: "01 · Intake", title: "Bring work in from every channel.", points: ["Documents and email, APIs and events, portals and forms, and human requests", "A workflow state store and document storage keep every case in one place", "Knowledge base, vector memory and a prompt and schema registry give agents the right context"] },
  { k: "02 · Execution", title: "Let agents do the work, within the rules.", points: ["Orchestration moves each case through the right steps", "Memory and context carry information across the whole process", "Tool calling, guardrails and observability keep every action controlled and visible"] },
  { k: "03 · Integration", title: "Connect results to the systems you run on.", points: ["A model gateway, workflow engine and event queues run every workflow", "Human-in-the-loop routes exceptions to the right person", "Connectors to ERP, CRM, procurement and internal tools are planned"] },
  { k: "04 · Governance", title: "Keep every step secure and auditable.", points: ["Identity and access control on every action", "A full audit trail to support compliance reviews", "Monitoring and alerts, plus policies, secrets and approvals"] },
];

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Repetitive handoffs", desc: "People copy information between systems, chase approvals and re-check the same documents.", icon: "migrate" },
  { title: "Inconsistent execution", desc: "The same process runs differently by team, person and day, which creates rework.", icon: "alert" },
  { title: "Slow change cycles", desc: "Changing how a process works takes months of tickets, training and manual workarounds.", icon: "clock" },
];

const howSteps = [
  { title: "Discover", desc: "Map the existing workflow with the people who own it." },
  { title: "Design", desc: "Identify where agents help, and where people must decide." },
  { title: "Validate", desc: "Prototype the new process and check its business controls." },
  { title: "Deploy", desc: "After business-owner sign-off, put the approved workflow live." },
  { title: "Expand", desc: "Add the next use case on the same platform." },
];

const enables: { title: string; desc: string; icon: IconName; kind: "system" | "agent" | "human" }[] = [
  { title: "Trigger", desc: "A document, request or event starts the run", icon: "mail", kind: "system" },
  { title: "Intake agent", desc: "Reads and classifies the input", icon: "agent", kind: "agent" },
  { title: "Validation agent", desc: "Checks data against source systems", icon: "agent", kind: "agent" },
  { title: "Business-rule agent", desc: "Applies your policy and thresholds", icon: "agent", kind: "agent" },
  { title: "Human approval", desc: "Where required, a person decides", icon: "user", kind: "human" },
  { title: "System update", desc: "The approved result is prepared for your systems", icon: "database", kind: "system" },
  { title: "Audit view", desc: "Every step logged and monitored", icon: "eye", kind: "system" },
];

// Illustrative examples, not live customer deployments.
const useCases: UseCase[] = [
  { fn: "Finance", title: "Supplier invoice processing", trigger: "Invoices arrive by email or upload", agents: ["Invoice intake", "Data extraction", "Matching and validation"], human: "Finance reviews exceptions before anything is posted", outcome: "Posting-ready output, with every exception explained" },
  { fn: "Procurement", title: "Supplier onboarding", trigger: "A new supplier submits documents", agents: ["Document intake", "Compliance checks", "Approval routing"], human: "Procurement approves the supplier", outcome: "Supplier record ready to update, with checks on file" },
  { fn: "Marketing", title: "Campaign requests", trigger: "A team submits a campaign request", agents: ["Request intake", "Asset and policy checks", "Review workflow"], human: "Brand or legal signs off", outcome: "Approved campaign and a reporting summary" },
  { fn: "Security", title: "Alert investigation", trigger: "A security alert is raised", agents: ["Alert enrichment", "Evidence gathering", "Ticket preparation"], human: "An analyst reviews and decides the response", outcome: "A response ticket ready for the analyst to act on" },
  { fn: "Operations", title: "Cross-system reconciliation", trigger: "Period-end or new documents arrive", agents: ["Document intake", "Cross-system reconciliation", "Exception queue"], human: "Ops leads clear the exception queue", outcome: "A management report with open items flagged" },
];

const deployment: { title: string; desc: string; icon: IconName }[] = [
  { title: "Your cloud", desc: "Designed for deployment inside your own cloud environment.", icon: "cloud" },
  { title: "Your data", desc: "Built to support your ownership of data and data-handling policies.", icon: "database" },
  { title: "Your control", desc: "Orchestration, agents, connected systems and human review sit within your boundary.", icon: "lock" },
];

const fde: { title: string; desc: string; icon: IconName }[] = [
  { title: "Process discovery", desc: "They sit with your process owners and document how the work really runs today.", icon: "search" },
  { title: "Workflow design", desc: "They turn business requirements into an agent workflow, with review points where people decide.", icon: "puzzle" },
  { title: "Fast validation", desc: "They build a prototype on your data and prove accuracy, controls and value.", icon: "check" },
  { title: "Production and beyond", desc: "They deploy the approved workflow, then find the next one to automate.", icon: "rocket" },
];

const expansion = [
  { k: "Start", title: "1 workflow", desc: "Begin with a well-scoped use case and validate the outcome." },
  { k: "Grow", title: "1 function", desc: "Reuse the platform for more workflows in the same team." },
  { k: "Scale", title: "Multiple functions", desc: "Introduce workflows across teams and departments." },
];

const outcomes: { title: string; desc: string; icon: IconName }[] = [
  { title: "Time to production", desc: "From process discovery to a live workflow.", icon: "clock" },
  { title: "Workflows in production", desc: "How many processes run on the platform.", icon: "layers" },
  { title: "Process cycle time", desc: "How long one case takes, start to finish.", icon: "rocket" },
  { title: "Exception rate", desc: "How often a case needs a person to step in.", icon: "alert" },
  { title: "Accuracy and quality", desc: "How often outputs pass your checks first time.", icon: "check" },
  { title: "Hours redeployed", desc: "Time your team moves to higher-value work.", icon: "users" },
];

// TODO: answers drafted from the product brief: confirm with the Weave team.
const faqs = [
  { q: "Is Weave available today?", a: "Yes. We're working with teams to take their first workflows to production." },
  { q: "Is this a chatbot or a copilot?", a: "No. Weave runs whole business processes as workflows of specialized agents, with people supervising approvals and exceptions." },
  { q: "Where does it run?", a: "Weave is designed to be deployed inside your own cloud environment. We confirm the exact setup with your cloud and security teams." },
  { q: "Can every process be automated?", a: "Not every process is a good fit. We assess suitability first and keep human review wherever a decision matters." },
  { q: "How do we get started?", a: "Bring us one workflow. Our forward-deployed engineers map it, build a prototype on your data and validate it with you before anything goes live." },
];

export default function WeavePage() {
  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <Eyebrow>Weave · Enterprise agentic process transformation</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                Turn business processes into <strong className="sweep">AI-powered operations.</strong>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Move beyond AI experiments. Coordinated agent workflows for real processes, with human oversight, in your cloud, and engineers from discovery to production.
              </p>
              <div className="mt-8">
                <Button href={contactHref("Our products", "/products/weave")}>Explore your first workflow →</Button>
              </div>
            </div>
            <WeaveHero />
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* PROBLEM */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="The problem" title={<>Your processes are digital. <strong>Too much of the work is still manual.</strong></>} desc="Teams move information between systems, review documents, check exceptions, prepare reports and coordinate approvals. Fragmented execution slows throughput and creates avoidable rework." />
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

      {SHOW_HIDDEN && (
        <>
      {/* WHAT IT ENABLES */}
      <Section id="how-it-works">
        <SectionHead eyebrow="What Weave enables" title={<>One workflow. Multiple agents. <strong>Human accountability.</strong></>} desc="Specialized agents execute defined steps, work with your systems, validate outputs and route decisions to people when needed." />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {enables.map((e, i) => (
            <li key={e.title} className={`relative flex flex-col border p-4 ${e.kind === "human" ? "border-[#006bc9] bg-surface" : "border-line bg-bg"}`}>
              <span className="font-mono text-[0.65rem] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-3"><IconTile name={e.icon} /></span>
              <h3 className="mt-3 text-sm font-semibold leading-snug text-ink">{e.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{e.desc}</p>
              {i < enables.length - 1 && <span className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 bg-bg font-mono text-xs text-muted lg:block" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-center font-mono text-[0.65rem] uppercase tracking-widest text-muted">Conceptual workflow · steps vary by process</p>
      </Section>
        </>
      )}

      {/* PATH TO PRODUCTION */}
      <Section>
        <SectionHead eyebrow="How customers get to production" title={<>From process discovery <strong>to production deployment.</strong></>} desc="Forward-deployed engineers work with process owners to map the workflow, find automation opportunities, prototype the new process, validate business controls and deploy approved use cases." />
        <FlowLoop items={howSteps} icons={["search", "puzzle", "check", "cloud", "rocket"]} caption="Nothing deploys until the business owner signs off on validation" />
      </Section>

      {/* INSIDE WEAVE */}
      <Section tone="surface">
        <SectionHead eyebrow="Inside Weave" title={<>One reusable backend. <strong>Many business workflows.</strong></>} desc="See how Weave takes work in, runs it with agents, connects the results and keeps every step governed." />
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
                {(() => { const V = INSIDE_VIEWS[i]; return <V />; })()}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {SHOW_HIDDEN && (
        <>
      {/* USE CASES */}
      <Section tone="surface">
        <SectionHead eyebrow="Use cases by function" title={<>Explore workflows <strong>by business function.</strong></>} desc="Illustrative examples, not live customer deployments. Each shows where agents work and where people decide." />
        <UseCaseTabs items={useCases} />
      </Section>
        </>
      )}

      {/* INDUSTRY USE CASES */}
      <Section>
        <SectionHead eyebrow="Use cases" title={<>Where teams put <strong>agents to work.</strong></>} desc="Processes we help teams automate, by industry. Pick one to start the conversation." />
        <IndustryUseCases groups={industryUseCases} />
      </Section>

      {/* DEPLOYMENT */}
      <Section tone="surface">
        <SectionHead eyebrow="Customer-cloud deployment" title={<>Your cloud. Your data. <strong>Your control.</strong></>} desc="Weave is designed for deployment inside your cloud environment, supporting your ownership of infrastructure and data-handling policies." />
        <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
          {deployment.map((d) => (
            <div key={d.title} className="card">
              <IconTile name={d.icon} />
              <h3 className="mt-4 font-semibold text-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FDE */}
      <Section>
        <SectionHead eyebrow="Forward-deployed engineering" title={<>A platform backed by people <strong>who understand processes.</strong></>} desc="Our forward-deployed engineers combine process discovery with implementation. The goal is measurable production adoption, not another disconnected proof of concept." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fde.map((f) => (
            <div key={f.title} className="card">
              <IconTile name={f.icon} />
              <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {SHOW_HIDDEN && (
        <>
      {/* EXPANSION */}
      <Section background={<RainField />}>
        <SectionHead eyebrow="Expand across the enterprise" title={<>Start with a workflow. <strong>Build a transformation engine.</strong></>} desc="Validate one use case, then reuse the platform to add workflows across teams and departments." />
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
        <p className="mt-4 text-center font-mono text-[0.65rem] uppercase tracking-widest text-muted">Adoption model, not customer results</p>
      </Section>
        </>
      )}

      {/* OUTCOMES */}
      <Section tone="surface">
        <SectionHead eyebrow="Outcomes and measurement" title={<>Measure what goes live, <strong>and what improves.</strong></>} desc="We agree these measures with you before building, and report business impact against them once workflows are live." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions about <strong className="font-semibold">Weave</strong>?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">What it is, where it runs and how teams get started.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand href={contactHref("Our products", "/products/weave")}
        title={<>Which business process should<Br /> you <strong>transform first</strong>?</>}
        desc="Bring us a workflow with repetitive digital work, clear decision points and a measurable outcome. We'll help assess whether it suits agentic automation."
        steps={["Walk us through the process", "Assess its suitability together", "Agree a first workflow to validate"]}
        label="Discuss a workflow"
      />
    </div>
  );
}
