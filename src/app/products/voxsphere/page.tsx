import type { Metadata } from "next";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import GridGlow from "@/components/GridGlow";
import RainField from "@/components/RainField";

export const metadata: Metadata = {
  title: "VoxSphere AI voice agents on AWS | Comprinno",
  description:
    "Automate post-sales support and outbound calls with real-time, multilingual AI voice agents grounded in your own knowledge, deployed by Comprinno in your AWS account.",
  alternates: { canonical: "/products/voxsphere" },
};

/** Framed product-screen placeholder (swap for real screenshots later). */
function Screen({ name, label }: { name: string; label: string }) {
  return (
    <figure className="border border-line-strong bg-bg">
      <figcaption className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 border border-line-strong" />)}</span>
        VoxSphere · {name}
      </figcaption>
      <div className="bg-grid flex aspect-[16/10] items-center justify-center p-4">
        <span className="border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">Screenshot needed: {label}</span>
      </div>
    </figure>
  );
}

const numbers = [
  { value: "Real-time", label: "Answers drawn from your own knowledge" },
  { value: "24/7", label: "Every call picked up, no queue" },
  { value: "Two-way", label: "Inbound support and outbound campaigns" },
  { value: "Multilingual", label: "Hindi and English, with more on the modular pipeline" },
];

const model: { title: string; desc: string; icon: IconName }[] = [
  { title: "Comprinno delivers", desc: "Our team deploys VoxSphere in your AWS account and sets up the integrations, agent workflows and rollout included in your engagement.", icon: "users" },
  { title: "VoxSphere runs the conversations", desc: "The platform handles real-time calls, grounds answers in your knowledge, escalates when needed and captures post-call analytics.", icon: "agent" },
  { title: "Your team sets the rules", desc: "Business users configure personas, workflows and negotiation boundaries, manage knowledge documents and review call analytics.", icon: "eye" },
];

const capabilities: { title: string; desc: string; icon: IconName }[] = [
  { title: "Workflow orchestration", desc: "Multistep conversation flows with conditional branching, tool calls, automated escalation and agent handover, from first contact through resolution.", icon: "layers" },
  { title: "Context-aware negotiation", desc: "Agents adapt tone, offers and strategy in real time, based on conversation signals and customer history.", icon: "spark" },
  { title: "Smart nudges", desc: "Timely prompts that guide outcomes, such as payment commitments, confirmations and upsells.", icon: "alert" },
  { title: "Retry optimization", desc: "Works out the best retry timing, channel and approach from earlier interaction outcomes.", icon: "loop" },
  { title: "Automated outbound workflows", desc: "Scheduling, sequencing and follow-up for outbound campaigns at scale.", icon: "clock" },
  { title: "Human-in-the-loop", desc: "Escalation to a human agent with full context, plus configurable review checkpoints.", icon: "users" },
  { title: "Guardrails and audit trail", desc: "Compliance boundaries enforced in real time, with every agent decision logged for governance.", icon: "shield" },
  { title: "Evaluation framework", desc: "Conversation scoring, A/B tests across personas and scripts, and drift detection for continuous improvement.", icon: "chart" },
];

const alsoIncluded = ["Post-call analytics", "Keyword extraction", "Voice persona and brand identity", "Smart interruption handling", "Automated document ingestion", "Business dashboards"];

const inside = [
  { k: "01 · Dashboards and analytics", title: "See how every call performs.", points: ["Business dashboards for call volume, latency and quality", "Post-call analytics with summaries and keyword extraction", "Every conversation turn, tool call and agent decision logged to Amazon CloudWatch"], screen: ["Dashboard", "VoxSphere dashboard and post-call analytics view"], caption: "Call analytics to support reviews of agent performance and outcomes." },
  { k: "02 · Two voice pipelines", title: "Pick the pipeline that fits the call.", points: ["Unified speech-to-speech: Amazon Nova Sonic 2 listens, reasons and speaks in one bidirectional stream, in Hindi and English", "Modular pipeline: Deepgram Nova-3, Amazon Nova 2 Lite and ElevenLabs Flash 3 as separate stages, for more languages and mid-call language switching", "Both share the same knowledge base, tools, memory, guardrails and configuration"], screen: ["Pipelines", "pipeline configuration view"], caption: "Two interchangeable architectures on the same AWS foundation." },
  { k: "03 · Self-service configuration", title: "Launch new use cases without rebuilding.", points: ["Configure agent personas, workflows and negotiation boundaries", "Upload knowledge documents; ingestion keeps answers current", "Natural turn-taking with barge-in handling and filler-word filtering"], screen: ["Admin", "administration interface (personas and knowledge)"], caption: "Self-service setup to speed up new use cases." },
];

const builtOn = ["Amazon Bedrock AgentCore Runtime", "Amazon Bedrock", "Amazon Bedrock Knowledge Bases", "Amazon Nova Sonic 2", "Amazon Nova 2 Lite", "Amazon ECS (Fargate)", "Amazon ECR", "Elastic Load Balancing", "Amazon S3", "AWS Lambda", "Amazon DynamoDB", "AWS KMS", "Amazon CloudWatch", "Deepgram Nova-3 (AWS Marketplace)"];

const steps = [
  { title: "Assess", desc: "Review your use case, call types, volumes, languages and the systems agents need to reach." },
  { title: "Agree", desc: "Define scope, integrations, guardrails, escalation paths, access and success measures." },
  { title: "Deploy and configure", desc: "Deploy in your AWS account, connect telephony and business systems, load knowledge and set up personas." },
  { title: "Go live and improve", desc: "Launch on agreed call flows, then use scoring, A/B tests and post-call analytics to keep improving." },
];

const security: { title: string; desc: string; icon: IconName }[] = [
  { title: "Hosted in your AWS account", desc: "The whole platform runs inside your own AWS account, so your data stays in your environment.", icon: "cloud" },
  { title: "Isolated and encrypted", desc: "Each business unit or tenant keeps its documents and knowledge separate, and data is encrypted at rest with AWS KMS.", icon: "lock" },
  { title: "PII handling", desc: "Personal information in calls and transcripts is handled with dedicated safeguards.", icon: "shield" },
  { title: "Guardrails and full observability", desc: "Compliance boundaries are enforced in real time, and every turn, tool call and decision is logged.", icon: "eye" },
];

const engagements = [
  { status: "In production", name: "Vomyra AI Solutions", what: "AI-powered real-time voicebot platform" },
  { status: "Proof of concept", name: "Zealopia", what: "Voicebot for mental health" },
];

const aims = ["Lower cost per interaction on high-volume, repetitive calls", "24/7 availability with instant answers and no wait", "A consistent experience, without variation between agents and shifts", "Structured post-call intelligence for better decisions"];

// TODO: answers drafted from page copy — confirm with the VoxSphere team.
const faqs = [
  { q: "What is VoxSphere?", a: "VoxSphere is a platform for real-time, multilingual AI voice agents. It runs serverless in your AWS account, grounds answers in your own knowledge and handles post-sales support and outbound calls." },
  { q: "What does Comprinno do in a VoxSphere engagement?", a: "Comprinno deploys VoxSphere in your AWS account and sets up the integrations, agent workflows and rollout included in your engagement. Support and escalation paths are agreed up front." },
  { q: "Can it handle both inbound and outbound calls?", a: "Yes. Agents handle inbound post-sales support and run outbound campaigns with scheduling, sequencing, follow-up and retry optimization." },
  { q: "Which languages does it support?", a: "The unified speech-to-speech pipeline supports Hindi and English. The modular pipeline adds more languages and mid-call language switching." },
  { q: "Where do the answers come from?", a: "From the knowledge documents you upload, through Amazon Bedrock Knowledge Bases. Automated ingestion keeps answers current as documents change." },
  { q: "What happens when a call needs a person?", a: "The agent escalates to a human agent with the full conversation context. You can also configure review checkpoints." },
  { q: "Where is my data stored, and who can access it?", a: "In your own AWS account. Data is isolated per business unit or tenant and encrypted at rest with AWS KMS. The access Comprinno needs is defined as part of the engagement." },
  { q: "How are platform, service and AWS charges handled?", a: "Platform and Comprinno service fees are defined in your engagement. AWS usage runs in your account and is billed by AWS at its standard rates." },
];

export default function VoxSpherePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <Eyebrow>AI voice agents on AWS</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                AI voice agents that <strong className="sweep">talk, act and close the loop.</strong>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                VoxSphere picks up support calls and runs outbound campaigns in Hindi and English, inside your own AWS account.
              </p>
              <div className="mt-8">
                <Button href="/contact">Discuss your voice AI use case →</Button>
              </div>
            </div>
            <div className="relative pb-12 pr-10 sm:pb-16 sm:pr-16">
              <Screen name="Dashboard" label="VoxSphere dashboard (latency, quality, tool calls)" />
              <div className="absolute bottom-0 right-0 w-[62%] shadow-xl">
                <Screen name="Admin" label="personas and knowledge" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* HIGHLIGHTS */}
      <Section>
        <dl className="stats stats-words">
          {numbers.map((st) => (
            <div key={st.label} className="stat">
              <dt className="stat-label">{st.label}</dt>
              <dd className="stat-num">{st.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* DELIVERY MODEL */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Who does what" title={<>We build it. It talks. <strong>You set the rules.</strong></>} desc="Our engineers stand VoxSphere up and wire it into your systems. The agents handle the conversations, and your business users shape how they behave." />
        <div className="grid border-t-2 border-ink md:grid-cols-3">
          {model.map((m, i) => (
            <div key={m.title} className="card">
              <IconTile name={m.icon} />
              <p className="mt-4 font-mono text-[0.7rem] text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-semibold text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CAPABILITIES */}
      <Section>
        <SectionHead eyebrow="Agentic capabilities" title={<>Agents that act, <strong>not just answer.</strong></>} desc="Scripted bots answer questions. VoxSphere agents negotiate, retry, escalate and drive multistep workflows toward an outcome." />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((s) => (
            <div key={s.title} className="card">
              <IconTile name={s.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-ink">
          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Also included</span>
          {alsoIncluded.map((a) => <span key={a} className="font-medium">{a}</span>)}
        </div>
      </Section>

      {/* INSIDE VOXSPHERE */}
      <Section tone="surface">
        <SectionHead eyebrow="Inside VoxSphere" title={<>Built for real calls, <strong>end to end on AWS.</strong></>} desc="A serverless platform that scales from a single call to hundreds of concurrent calls, with telephony-grade latency." />
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
              <div className={i % 2 ? "lg:order-1" : ""}>
                <Screen name={x.screen[0]} label={x.screen[1]} />
                <p className="mt-3 text-sm text-muted">{x.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-line pt-8 text-center">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Built on</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {builtOn.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </Section>

      {/* ENGAGEMENT AND ROLLOUT */}
      <Section>
        <SectionHead eyebrow="Engagement and rollout" title={<>From use case <strong>to live calls</strong>.</>} desc="Start with the calls you want to automate. Define the scope, deploy in your account and roll out with measures you agree up front." />
        <FlowLoop items={steps} icons={["search", "layers", "code", "chart"]} caption="Every scored call feeds the next round of tuning" />
        <div className="mt-10 grid gap-6 border border-line-strong bg-surface p-6 lg:grid-cols-[1fr_2fr]">
          <h3 className="text-xl font-semibold text-ink">Built by the team that deploys it.</h3>
          <div>
            <p className="text-sm leading-relaxed text-ink-2 sm:text-base">The AI and cloud engineers who designed VoxSphere on AWS are the ones who roll it out for you. You know from day one who answers when something needs attention.</p>
            <p className="mt-3 font-mono text-xs text-muted">Got more call types in mind? Add them as new use cases once the first one is live.</p>
          </div>
        </div>
      </Section>

      {/* SECURITY */}
      <Section tone="surface">
        <SectionHead eyebrow="Security and control" title={<>Your account. <strong>Your data. Your rules.</strong></>} desc="Calls, transcripts and knowledge never leave your AWS account. You decide what our engineers can reach and which changes need your sign-off." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {security.map((p) => (
            <div key={p.title} className="card">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CUSTOMER ENGAGEMENTS */}
      <Section>
        <SectionHead eyebrow="Customer engagements" title={<><strong>Where VoxSphere</strong> is in use.</>} desc="Teams already putting VoxSphere on the phone, from live production to early pilots." />
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.2fr]">
          {engagements.map((e) => (
            <figure key={e.name} className="card flex flex-col">
              <span className="tag self-start">{e.status}</span>
              <p className="mt-4 text-2xl font-semibold text-ink">{e.name}</p>
              <p className="mt-1 text-ink-2">{e.what}</p>
              <figcaption className="mt-auto border-t border-line pt-4 font-mono text-[0.7rem] uppercase tracking-widest text-muted">Generative AI · Ongoing</figcaption>
            </figure>
          ))}
          <div className="border border-line-strong bg-surface p-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">What teams aim for</p>
            <ul className="mt-4 grid gap-3">
              {aims.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Before you <strong className="font-semibold">pick up the phone</strong>.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">What buyers usually ask about voice agents, languages and data.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Ready to put an <strong>AI voice agent</strong><Br /> on your next call?</>}
        desc="Bring one call type you want off your team's plate. We'll show you what an agent would sound like on it."
        steps={["30-minute use case review", "Scope, integrations and guardrails agreed", "Deployment in your AWS account"]}
        label="Discuss your voice AI use case"
      />
    </>
  );
}
