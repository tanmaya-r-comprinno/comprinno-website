import PartnerPairArt from "@/components/PartnerPairArt";
import TiltBadge from "@/components/TiltBadge";
import type { Metadata } from "next";
import { Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import GridGlow from "@/components/GridGlow";
import FlowLoop from "@/components/FlowLoop";
import LogoMarquee from "@/components/LogoMarquee";
import RainField from "@/components/RainField";

export const metadata: Metadata = {
  title: "OpenAI Select Partner",
  description:
    "Comprinno is an OpenAI Select Partner. We help you pick use cases, build agents on OpenAI models, connect them to your systems and run them securely.",
  alternates: { canonical: "/partnerships/openai" },
};

const ways: { k: string; title: string; desc: string; icon: IconName; points: string[]; best: string }[] = [
  { k: "For your people", title: "ChatGPT across the company", desc: "Give teams a secure AI assistant for everyday work, and make sure they actually use it well.", icon: "users", points: ["Rollout plan by team and role", "Training and prompt playbooks for real tasks", "Usage rules and data controls agreed with security"], best: "Everyday productivity" },
  { k: "Inside your products", title: "Agents and apps on the OpenAI API", desc: "Build AI into your own workflows and customer-facing products, connected to your data and systems.", icon: "code", points: ["Agents that carry out multistep work", "Connected to your apps, data and identity", "Evaluated, monitored and cost-tracked in production"], best: "Process and product change" },
];

const lifecycle = [
  { title: "Strategy", desc: "Find and rank the use cases worth doing, with a business case and a roadmap.", includes: ["Use-case discovery workshops", "Value, risk and readiness scoring", "AI roadmap"] },
  { title: "Build", desc: "Agents and applications on OpenAI models, designed around how your teams work.", includes: ["AI agents and assistants", "Workflow automation", "Prototypes on your own data"] },
  { title: "Integrate", desc: "Connect AI to your data, identity and enterprise systems so it does real work.", includes: ["Data platform readiness", "Application and API integration", "Cloud modernization where needed"] },
  { title: "Operate", desc: "Run AI in production with security, governance and cost control, and keep improving it.", includes: ["Access and data controls", "Monitoring and cost tracking", "Managed AI operations"] },
];

const useCases: { title: string; desc: string; icon: IconName }[] = [
  { title: "Customer service", desc: "Assistants that resolve routine requests and hand over to people with context.", icon: "users" },
  { title: "Document-heavy work", desc: "Read, extract and check information from contracts, invoices and forms.", icon: "layers" },
  { title: "Knowledge assistants", desc: "Answers grounded in your policies, manuals and internal knowledge.", icon: "database" },
  { title: "Engineering productivity", desc: "AI that helps developers write, review and modernize code faster.", icon: "code" },
  { title: "Analytics and insight", desc: "Ask questions of your data in plain language and get answers you can trace.", icon: "chart" },
  { title: "Workflow automation", desc: "Agents that carry multistep work across your systems, with review points.", icon: "agent" },
];

const industries = ["Financial services", "Healthcare", "Manufacturing", "Retail", "Automotive", "SaaS", "Digital-native"];

const controls: { title: string; desc: string; icon: IconName }[] = [
  { title: "Data stays governed", desc: "We set clear rules for what data AI can use, where it goes and who can see it.", icon: "lock" },
  { title: "Access by role", desc: "AI apps respect your identity and permissions, so people only see what they should.", icon: "user" },
  { title: "Every action traceable", desc: "Logging of prompts, tool calls and decisions, so you can answer “why did it do that?”.", icon: "eye" },
  { title: "Quality you can measure", desc: "Evaluation against your own test cases before launch, and monitoring after it.", icon: "check" },
  { title: "Costs under control", desc: "Usage tracked per application and team, with limits agreed up front.", icon: "coin" },
  { title: "People stay in charge", desc: "Human review wherever a decision matters, built into the workflow.", icon: "heart" },
];

const engagement = [
  { title: "Discover", desc: "A workshop to shortlist and rank use cases, and check data and system readiness." },
  { title: "Prototype", desc: "A working prototype on your data, with real measures of quality, speed and cost." },
  { title: "Productionize", desc: "Integration, security, evaluation and rollout to the people who will use it." },
  { title: "Operate and scale", desc: "Monitoring, cost reviews and new use cases on the same foundation." },
];

const numbers = [
  { value: "Select", label: "OpenAI partner tier" },
  { value: "750+", label: "Migration and modernization engagements" },
  { value: "100+", label: "Active customers" },
];

const why: { title: string; desc: string; icon: IconName }[] = [
  { title: "AI and cloud, one team", desc: "OpenAI models only deliver when the data, apps and cloud underneath are ready. We modernize that foundation and build on it.", icon: "cloud" },
  { title: "We run what we build", desc: "Our managed services team operates production systems, so AI doesn't stall after launch.", icon: "loop" },
  { title: "Security credentials that count", desc: "ISO 27001 certified and SOC 2 Type II attested.", icon: "shield" },
  { title: "Builders, not just advisors", desc: "We build and run our own AI products, so our advice comes from production experience.", icon: "rocket" },
];

const starts = ["An AI use-case workshop", "Building an AI agent", "Connecting AI to our systems", "Governing and running AI", "Something else"];

// TODO: answers drafted from page copy — confirm with the OpenAI partnership team.
const faqs = [
  { q: "What does OpenAI Select Partner mean?", a: "It means OpenAI has admitted Comprinno to the OpenAI Partner Network at the Select tier, to help organizations plan, build and run solutions on OpenAI models." },
  { q: "Where should we start?", a: "Usually with a short discovery workshop. We shortlist use cases by value, feasibility and risk, check your data and systems, and pick one to prototype." },
  { q: "Can you work with our existing cloud and data?", a: "Yes. We connect OpenAI models to the data, identity and applications you already have, and modernize the foundation only where it holds the use case back." },
  { q: "How is our data handled?", a: "We agree data rules with you before anything goes live: what AI can use, where it goes and who can see it, with access tied to your existing roles." },
  { q: "How do you keep AI quality and costs in check?", a: "We evaluate against your own test cases before launch and monitor after it, and track usage per application and team against limits agreed up front." },
  { q: "Can you run the solution after launch?", a: "Yes. Our managed services team operates production systems, with monitoring, cost reviews and new use cases on the same foundation." },
];

export default function OpenAIPartnerPage() {
  return (
    <div className="brand">
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Eyebrow>OpenAI Select Partner · OpenAI Partner Network</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.4vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                OpenAI, from <strong className="sweep">first use case</strong> to <strong>production</strong>.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Use cases, agents, integration and operations on OpenAI models, built on a cloud foundation we already manage.
              </p>
              <div className="mt-8">
                <Button href="/contact">Talk to our OpenAI team →</Button>
              </div>
              <p className="mt-5 font-mono text-[0.7rem] text-muted">OpenAI Select Partner since July 2026</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[20rem] sm:w-[23rem] lg:w-[26rem]">
                {/* partnership plaques, same language as the AWS badge: sway, hover lean, stacked-shadow thickness */}
                <TiltBadge><PartnerPairArt partner="openai" className="award-sway badge-thick relative z-10 block h-auto w-full" /></TiltBadge>
                <span className="absolute -bottom-6 left-1/2 h-5 w-3/4 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(15_23_42/0.18),transparent_70%)]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* TWO WAYS */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Two ways to use OpenAI" title={<>For your people, <strong>and inside your products.</strong></>} desc="Most companies need both. We help with each, and make sure they share the same rules." />
        <div className="grid gap-4 md:grid-cols-2">
          {ways.map((w) => (
            <div key={w.k} className="card flex flex-col">
              <IconTile name={w.icon} />
              <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-widest text-muted">{w.k}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.desc}</p>
              <ul className="mt-5 grid gap-2.5">
                {w.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5"><span className="tag">Best for: {w.best.toLowerCase()}</span></p>
            </div>
          ))}
        </div>
      </Section>

      {/* LIFECYCLE */}
      <Section>
        <SectionHead eyebrow="What we do with OpenAI" title={<>Across the whole lifecycle, <strong>not just the pilot.</strong></>} />
        <ol className="path-row">
          {lifecycle.map((s, i) => (
            <li key={s.title}>
              <div className="path-card">
                <span className="path-mark" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                <span className="mt-auto flex flex-col gap-2 pt-5">
                  {s.includes.map((x) => <span key={x} className="path-inc">{x}</span>)}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* USE CASES */}
      <Section tone="surface">
        <SectionHead eyebrow="Where to start" title={<>Use cases that <strong>pay back early.</strong></>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <div key={u.title} className="card">
              <IconTile name={u.icon} />
              <h3 className="mt-4 font-semibold text-ink">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{u.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">For teams in</span>
          {industries.map((x) => <span key={x} className="tag">{x}</span>)}
        </div>
      </Section>

      {/* GOVERNANCE */}
      <Section>
        <SectionHead eyebrow="Governed from day one" title={<>Enterprise AI your security team <strong>can sign off.</strong></>} desc="The controls we agree with you before anything goes live." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map((c) => (
            <div key={c.title} className="card">
              <IconTile name={c.icon} />
              <h3 className="mt-4 font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ENGAGEMENT */}
      <Section tone="surface" id="engagement">
        <SectionHead eyebrow="How an engagement runs" title={<>Prove it small. <strong>Then scale it properly.</strong></>} />
        <FlowLoop items={engagement} />
      </Section>

      {/* WHY */}
      <Section>
        <SectionHead eyebrow="Why Comprinno" title={<>An OpenAI partner <strong>with the foundation to match.</strong></>} />
        <div className="border border-line bg-bg">
          <dl className="stats stats-words stats-3 border-x-0 border-t-0">
            {numbers.map((st) => (
              <div key={st.label} className="stat">
                <dt className="stat-label">{st.label}</dt>
                <dd className="stat-num">{st.value}</dd>
              </div>
            ))}
          </dl>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <div key={w.title} className={`flex flex-col p-6 border-line ${i ? "border-t" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i > 1 ? "lg:border-t-0" : ""} ${i % 2 ? "sm:border-l" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                <IconTile name={w.icon} />
                <h3 className="mt-4 font-semibold leading-snug text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions about working with us <strong className="font-semibold">on OpenAI</strong>?</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Ready to put OpenAI <strong>to work</strong>?</>}
        desc="Pick a starting point and we'll connect you with the right team."
        steps={[]}
        label="Talk to our OpenAI team"
      >
        <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
          {starts.map((s) => <li key={s} className="tag">{s}</li>)}
        </ul>
      </CtaBand>
    </div>
  );
}
