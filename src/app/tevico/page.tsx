import type { Metadata } from "next";
import { Button, CtaBand, FeatureCard, PageHero, Section, SectionHead, StackCards, Steps } from "@/components/ui";
import { IconTile } from "@/components/Icon";
import LiveTrace from "@/components/LiveTrace";
import { ImageSlot } from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Tevico: autopilot for cloud operations",
  description: "An AI-native managed cloud service run by SRE agents, with human-governed decisions.",
  alternates: { canonical: "/tevico" },
};

const problems = [
  { title: "Too many signals, too little context", desc: "Alerts show symptoms. Engineers still have to gather evidence and judge what matters." },
  { title: "Scattered investigations", desc: "Logs, cloud consoles, tickets and chat pull incidents in different directions." },
  { title: "Repetitive workload", desc: "Routine operations eat the time engineers could spend on core business work." },
];

const steps = [
  { title: "Know where you're needed", desc: "Start with priorities, SLA risks and the decisions that need a human." },
  { title: "Understand before you act", desc: "Agent findings, evidence and probable causes arrive inside the ticket." },
  { title: "Move forward with control", desc: "Review options, required sign-offs, risk and effort." },
  { title: "Keep the whole story", desc: "Ownership, progress and communication survive every handover." },
];

const roles = [
  { title: "Engineers", desc: "Prioritized tickets, investigation context, recommendations and handovers." },
  { title: "Managers", desc: "Customer health, SLA risks, workload balance, stuck tickets and shift coverage." },
  { title: "Supervisors", desc: "Oversight of managers and customer portfolios, with service health comparisons." },
  { title: "Evaluators", desc: "Ratings and review comments on agent handling, compared with similar past tickets." },
];

export default function TevicoPage() {
  return (
    <>
      <PageHero
        eyebrow="Product / Tevico"
        title="Autopilot for cloud operations"
        desc="SRE agents run the routine. Humans approve the big calls."
        visual={<LiveTrace />}
      >
        <Button href="/contact">Book a Tevico walkthrough →</Button>
      </PageHero>

      <Section>
        <SectionHead eyebrow="The problem" title="Operations shouldn't mean drowning in alerts" />
        <div className="grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <FeatureCard key={p.title} icon={(["alert", "search", "loop"] as const)[i]} title={p.title} desc={p.desc} />
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <SectionHead
          eyebrow="Meet Samantha"
          title="One copilot for your SRE agents"
          desc="Samantha is the operational copilot: a single interface that coordinates the SRE agents, summarizes their findings and helps move work forward."
        />
        <Steps items={steps} icons={["alert", "search", "check", "loop"]} />
      </Section>

      <Section>
        <SectionHead eyebrow="Command center" title="Role-specific views" desc="Reliability, security, cost, inventory and service requests, all under one operating model." />
        <div className="mb-8"><ImageSlot label="command center screenshot" ratio="aspect-[16/8]" /></div>
        <StackCards>
          {roles.map((r, i) => (
            <FeatureCard key={r.title} icon={(["code", "users", "eye", "check"] as const)[i]} title={r.title} desc={r.desc} />
          ))}
        </StackCards>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Managed layer" title="Backed by people, not just agents" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {["Cloud operations: reliability, incidents and continuity", "Security operations: findings, investigation and escalation", "Cost visibility: operational context for cost opportunities", "Engineering expertise: experienced staff for exceptions and improvement"].map((t, i) => (
            <li key={t} className="card flex items-center gap-4 text-sm">
              <IconTile name={(["cloud", "shield", "coin", "users"] as const)[i]} className="shrink-0" />
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">
          Automation level depends on the capability, environment and agreed service scope. Supported integrations are confirmed during a walkthrough.
        </p>
      </Section>

      <CtaBand title="See Tevico on your estate" label="Book a walkthrough" />
    </>
  );
}
