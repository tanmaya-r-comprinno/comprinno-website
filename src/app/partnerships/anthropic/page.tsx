import type { Metadata } from "next";
import { Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import RainField from "@/components/RainField";

export const metadata: Metadata = {
  title: "Claude by Anthropic",
  description:
    "Comprinno helps you put Claude to work: long-document analysis, Claude Code for engineering and governed agents, run on Amazon Bedrock inside your own AWS account.",
  alternates: { canonical: "/partnerships/anthropic" },
};

/** Hero visual: where Claude sits in a Comprinno-built stack. */
function StackCard() {
  const layers: { k: string; v: string; icon: IconName; strong?: boolean }[] = [
    { k: "Your teams", v: "Legal, finance, engineering, support", icon: "users" },
    { k: "Claude", v: "Opus · Sonnet · Haiku, matched per task", icon: "spark", strong: true },
    { k: "MCP connectors", v: "Only the tools and actions you approve", icon: "puzzle" },
    { k: "Amazon Bedrock", v: "Inside your AWS account, run by Comprinno", icon: "cloud" },
  ];
  return (
    <figure className="border border-line-strong bg-bg shadow-xl">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span>How we deploy Claude</span>
        <span className="uppercase tracking-widest">Typical setup</span>
      </figcaption>
      <ol className="grid gap-2 p-5">
        {layers.map((l, i) => (
          <li key={l.k}>
            <div className={`flex items-center gap-3 border p-3 ${l.strong ? "border-ink bg-surface" : "border-line"}`}>
              <IconTile name={l.icon} />
              <span>
                <span className="block text-sm font-semibold text-ink">{l.k}</span>
                <span className="block text-xs text-muted">{l.v}</span>
              </span>
            </div>
            {i < layers.length - 1 && <p className="py-0.5 text-center font-mono text-xs text-muted" aria-hidden="true">↓</p>}
          </li>
        ))}
      </ol>
    </figure>
  );
}

const strengths: { title: string; desc: string; icon: IconName }[] = [
  { title: "Reads long material in depth", desc: "Contracts, policies, reports and whole codebases, analyzed end to end rather than skimmed.", icon: "layers" },
  { title: "Strong at code", desc: "Claude Code brings Claude into your engineering workflow, from the terminal to code review.", icon: "code" },
  { title: "Built to use tools", desc: "With the Model Context Protocol (MCP), Claude connects to your systems and acts on them, within the limits you set.", icon: "puzzle" },
  { title: "Designed with safety in mind", desc: "Anthropic builds Claude with a strong focus on safety and reliability, which matters for regulated work.", icon: "shield" },
];

const models = [
  { name: "Opus", tier: "Most capable", best: "Complex reasoning, deep analysis and demanding agentic work", example: "Reviewing a full contract set against your policy" },
  { name: "Sonnet", tier: "Balanced", best: "Strong capability at a speed and cost suited to most production work", example: "An agent that drafts, checks and files reports" },
  { name: "Haiku", tier: "Fastest", best: "High-volume, low-latency tasks", example: "Classifying and routing thousands of tickets a day" },
];

const useCases: { team: string; title: string; desc: string; icon: IconName }[] = [
  { team: "Legal and procurement", title: "Contract and document review", desc: "Read, compare and summarize long documents, with answers your reviewers can trace.", icon: "layers" },
  { team: "Risk and compliance", title: "Compliance and risk reviews", desc: "Check documents and processes against your rules, with every finding explained.", icon: "shield" },
  { team: "Operations", title: "Agentic workflows", desc: "Agents that carry multistep work across your systems, with review points.", icon: "agent" },
  { team: "Support", title: "Customer-facing assistants", desc: "Resolve routine requests and hand over to people with the context attached.", icon: "users" },
  { team: "Everyone", title: "Research and knowledge", desc: "Answers grounded in your policies, manuals and internal knowledge.", icon: "search" },
  { team: "Engineering", title: "Engineering with Claude Code", desc: "Help developers build, refactor and review code, and modernize older systems faster.", icon: "code" },
];

const codeWork = [
  "Rollout of Claude Code to your engineering teams, with guardrails agreed up front",
  "Legacy code explained, refactored and modernized, alongside our Modernize practice",
  "Code review and test generation built into your existing pipeline",
];

const controls: { title: string; desc: string; icon: IconName }[] = [
  { title: "Tools with limits", desc: "Claude only reaches the systems and actions you approve through MCP.", icon: "puzzle" },
  { title: "Data stays governed", desc: "Clear rules for what data Claude can use, where it goes and who sees it.", icon: "lock" },
  { title: "Every action traceable", desc: "Prompts, tool calls and decisions logged, so you can answer “why did it do that?”.", icon: "eye" },
  { title: "Quality you can measure", desc: "Evaluation against your own test cases before launch, monitoring after it.", icon: "check" },
  { title: "Costs under control", desc: "Usage tracked per application and team, with the right model for each task.", icon: "coin" },
  { title: "People stay in charge", desc: "Human review wherever a decision matters, built into the workflow.", icon: "user" },
];

const phases = [
  { title: "Discover", desc: "A workshop to shortlist and rank use cases, and pick the right Claude model for each." },
  { title: "Prototype", desc: "A working prototype on your data, with real measures of quality, speed and cost." },
  { title: "Productionize", desc: "MCP connectors, identity, security reviews and rollout to the people who will use it." },
  { title: "Operate and scale", desc: "Monitoring, cost reviews and new use cases on the same foundation." },
];

const industries = ["Financial services", "Healthcare", "Life sciences", "Retail", "SaaS"];

const why: { title: string; desc: string; icon: IconName }[] = [
  { title: "Claude on AWS, by an AWS Premier partner", desc: "We deploy Claude through Amazon Bedrock in your own AWS account, on infrastructure we already know how to secure and run.", icon: "cloud" },
  { title: "Production AI we run ourselves", desc: "Our own products run on Amazon Bedrock, so our advice on Claude comes from systems we operate, not slides.", icon: "rocket" },
  { title: "Engineering and modernization depth", desc: "Claude Code lands best with a team that modernizes code for a living. That's our Modernize practice.", icon: "code" },
  { title: "Security credentials that count", desc: "ISO 27001 certified and SOC 2 Type II attested.", icon: "lock" },
];

const starts = ["A Claude use-case workshop", "Building an AI agent", "Claude Code for our engineers", "Connecting Claude to our systems", "Something else"];

// TODO: answers drafted from page copy — confirm with the Anthropic partnership team.
const faqs = [
  { q: "Which Claude model should we use?", a: "It depends on the task. We test your use case on the models that fit and pick the one that balances quality, speed and cost, often mixing models within one workflow." },
  { q: "Can Claude connect to our systems?", a: "Yes. Through the Model Context Protocol (MCP) we connect Claude to the tools and data you approve, and nothing else." },
  { q: "Can you help our engineers use Claude Code?", a: "Yes. We help roll out Claude Code with agreed guardrails, and use it in modernization work on older systems." },
  { q: "How is our data handled?", a: "We can run Claude through Amazon Bedrock in your own AWS account, with data rules agreed before anything goes live and access tied to your existing roles." },
  { q: "Where should we start?", a: "Usually with a short workshop to rank use cases and pick one to prototype on your data." },
  { q: "Can you run the solution after launch?", a: "Yes. Our managed services team operates it in production, with monitoring, cost reviews and new use cases on the same foundation." },
];

export default function AnthropicPartnerPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <Eyebrow>Claude by Anthropic · On Amazon Bedrock</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                Claude, put to work <strong className="sweep">across your enterprise.</strong>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Agents, document work and engineering on Claude, run in your own AWS account by the team that manages it.
              </p>
              <div className="mt-8">
                <Button href="/contact">Talk to our Claude team →</Button>
              </div>
            </div>
            <StackCard />
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* WHY CLAUDE */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Why Claude" title={<>A model family built <strong>for serious work.</strong></>} desc="Claude is Anthropic's family of AI models. These are the places it tends to stand out in enterprise work." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((x) => (
            <div key={x.title} className="card">
              <IconTile name={x.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink">{x.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MODEL FIT */}
      <Section>
        <SectionHead eyebrow="Model fit" title={<>The right Claude model <strong>for each job.</strong></>} desc="Not every task needs the largest model. We match each workload to the model that balances quality, speed and cost." />
        <div className="grid auto-rows-fr gap-4 md:grid-cols-3">
          {models.map((m) => (
            <div key={m.name} className="card flex flex-col">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{m.tier}</p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.best}</p>
              <div className="mt-auto pt-5">
                <div className="border-t border-line pt-4">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">For example</p>
                  <p className="mt-1 min-h-[2.8rem] text-sm leading-relaxed text-ink">{m.example}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* USE CASES */}
      <Section tone="surface">
        <SectionHead eyebrow="Where to start" title={<>Use cases where Claude <strong>earns its place.</strong></>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((x) => (
            <div key={x.title} className="card">
              <IconTile name={x.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink">{x.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">For teams in</span>
          {industries.map((x) => <span key={x} className="tag">{x}</span>)}
        </div>
      </Section>

      {/* CLAUDE CODE */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Eyebrow>Engineering with Claude Code</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Faster engineering, <strong className="font-semibold">older systems included.</strong></h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Claude Code helps developers build, refactor and review code. We pair it with our modernization work, so legacy systems move forward too.</p>
            <ul className="mt-6 grid gap-3">
              {codeWork.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink sm:text-base">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/services/modernize" variant="ghost">Our Modernize practice →</Button>
            </div>
          </div>
          <figure className="border border-line-strong bg-bg shadow-xl" aria-label="Illustrative Claude Code session">
            <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
              <span>Claude Code · legacy billing module</span>
              <span className="uppercase tracking-widest">Illustrative</span>
            </figcaption>
            <div className="grid gap-3 p-5 text-sm">
              <p className="border border-line p-3 font-mono text-[0.78rem] text-ink">&gt; explain the billing module and list what blocks moving it to a service</p>
              <div className="border border-ink bg-surface p-3 text-ink">
                <p className="font-semibold">Read 42 files. 3 blockers found:</p>
                <p className="mt-1 text-muted">Shared database tables with orders · Tax rules hard-coded in 6 places · No tests on invoice rounding</p>
              </div>
              <p className="border border-line p-3 font-mono text-[0.78rem] text-ink">&gt; write tests for invoice rounding first</p>
              <p className="flex items-center justify-between border border-line p-3 text-ink">18 tests added <span className="border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-emerald-700">Ready for review</span></p>
            </div>
          </figure>
        </div>
      </Section>

      {/* GOVERNANCE */}
      <Section tone="surface">
        <SectionHead eyebrow="Governed from day one" title={<>Claude your security team <strong>can sign off.</strong></>} desc="The controls we agree with you before anything goes live." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map((x) => (
            <div key={x.title} className="card">
              <IconTile name={x.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink">{x.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ENGAGEMENT */}
      <Section>
        <SectionHead eyebrow="How an engagement runs" title={<>Prove it small. <strong>Then scale it properly.</strong></>} />
        <FlowLoop items={phases} icons={["search", "code", "puzzle", "loop"]} />
      </Section>

      {/* WHY COMPRINNO */}
      <Section tone="surface">
        <SectionHead eyebrow="Why Comprinno" title={<>Claude, backed by <strong>a team that runs AWS.</strong></>} desc="Claude delivered on the cloud we already secure and operate for you." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((x) => (
            <div key={x.title} className="card">
              <IconTile name={x.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink">{x.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions about working with us <strong className="font-semibold">on Claude</strong>?</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Ready to put Claude <strong>to work</strong>?</>}
        desc="Pick a starting point and we'll connect you with the right team."
        steps={[]}
        label="Talk to our Claude team"
      >
        <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
          {starts.map((s) => <li key={s} className="tag">{s}</li>)}
        </ul>
      </CtaBand>
    </>
  );
}
