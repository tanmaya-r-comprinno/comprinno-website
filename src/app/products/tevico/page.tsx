import type { Metadata } from "next";
import { Br, Button, CtaBand, Faq, PageHero, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import TabbedScreen from "@/components/TabbedScreen";
import RoleTabs from "@/components/RoleTabs";

export const metadata: Metadata = {
  title: "Tevico: autopilot for cloud operations",
  description:
    "AI-native managed cloud services, run by the Tevico platform and its portfolio of SRE agents. Your engineers stay in charge of the decisions that matter.",
  alternates: { canonical: "/products/tevico" },
};

/** Framed product-screen placeholder (swap for real screenshots later). */
function Screen({ name, label, ratio = "aspect-[16/9]" }: { name: string; label: string; ratio?: string }) {
  return (
    <figure className="border border-line-strong bg-bg">
      <figcaption className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 border border-line-strong" />)}</span>
        Tevico · {name}
      </figcaption>
      <div className={`bg-grid flex ${ratio} items-center justify-center p-4`}>
        <span className="border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">Product screen: {label}</span>
      </div>
    </figure>
  );
}

const gaps: { title: string; desc: string; icon: IconName }[] = [
  { title: "Too many signals. Too little context.", desc: "Alerts show symptoms. Engineers still have to gather the evidence and decide what matters.", icon: "alert" },
  { title: "One incident. A dozen places to look.", desc: "Logs, cloud consoles, tickets and conversations pull every investigation in different directions.", icon: "search" },
  { title: "Growing infrastructure. The same hours in the day.", desc: "Repetitive operations take time away from the engineering work that moves your business forward.", icon: "clock" },
];

const domains: { title: string; desc: string; icon: IconName }[] = [
  { title: "Reliability", desc: "Incidents and operational continuity", icon: "chart" },
  { title: "Security", desc: "Findings, investigation and escalation", icon: "shield" },
  { title: "Cost", desc: "Savings with operational context", icon: "coin" },
  { title: "Inventory", desc: "Your cloud resources in one view", icon: "cube" },
  { title: "Service requests", desc: "Routine work, handled", icon: "check" },
];

const samantha = [
  { title: "Know where you're needed.", desc: "Start with priorities, SLA risks and the decisions that need human attention.", screen: "priorities and SLA risks" },
  { title: "Understand before you act.", desc: "See agent findings, evidence and probable causes right in the ticket context.", screen: "findings and evidence in the ticket" },
  { title: "Move forward with control.", desc: "Review the recommended options, required sign-offs, risk and effort before anything changes.", screen: "options, sign-offs, risk and effort" },
  { title: "Keep the whole story.", desc: "Preserve ownership, progress and communication across the work and every handover.", screen: "ticket history and handovers" },
];

const accountability = [
  { title: "Understand the recommendation.", desc: "Follow the investigation as it progresses, along with the findings and the evidence behind them." },
  { title: "Keep consequential decisions visible.", desc: "The workflow flags actions that need human sign-off before they run." },
  { title: "Make quality review part of operations.", desc: "Evaluate how agents handled each ticket and compare it with similar past resolutions." },
];

const levels: { role: string; title: string; desc: string; icon: IconName; screen: string }[] = [
  { role: "Engineers", title: "Focus on the next useful action.", desc: "Prioritized tickets, investigation context, recommendations and handovers, so every engineer knows what to pick up next.", icon: "code", screen: "engineer's prioritized ticket queue" },
  { role: "Managers", title: "Keep customers and engineers connected.", desc: "Customer health, SLA risks, workload balance, stuck tickets and shift coverage, in one view.", icon: "users", screen: "customer health and SLA risks" },
  { role: "Supervisors", title: "See the risks across teams.", desc: "Oversight of managers and customer portfolios, with service health compared across teams.", icon: "eye", screen: "portfolio and service health comparison" },
  { role: "Evaluators", title: "Make resolution quality visible.", desc: "Rate how agents handled tickets, add review comments and compare similar tickets with earlier evaluations.", icon: "check", screen: "ticket evaluation view" },
];

const managed: { title: string; desc: string; icon: IconName }[] = [
  { title: "Cloud operations", desc: "Reliability, incident handling and operational continuity.", icon: "cloud" },
  { title: "Security operations", desc: "Findings, investigation and accountable escalation.", icon: "shield" },
  { title: "Cost visibility", desc: "Cloud cost opportunities, with the operational context behind them.", icon: "coin" },
  { title: "Engineering expertise", desc: "Experienced engineers for exceptions and ongoing improvement.", icon: "users" },
];

const faqs = [
  { q: "What does “autopilot” mean for cloud operations?", a: "SRE agents handle the routine groundwork: triaging alerts, gathering evidence and proposing next steps. High-impact actions wait for an engineer's sign-off, so your team stays in charge." },
  { q: "Is Tevico a platform or a managed service?", a: "Both. Tevico is the platform and its portfolio of SRE agents, and Comprinno delivers it as an AI-native managed cloud service, with experienced engineers behind it." },
  { q: "Who is Tevico designed for?", a: "Teams running production cloud environments that want fewer alerts to chase and more time for engineering, from fast-growing startups to enterprises." },
  { q: "Can we keep our existing operational tools?", a: "Yes. Tevico works alongside the tools you already use. Supported integrations are confirmed during a walkthrough." },
];

export default function TevicoPage() {
  return (
    <>
      <PageHero eyebrow="Tevico · AI-native managed cloud services" title="Autopilot for cloud operations." desc="AI-native managed cloud services, run by the Tevico platform and its portfolio of SRE agents. Your engineers stay in charge of the decisions that matter.">
        <Button href="/contact">See Tevico in action →</Button>
      </PageHero>

      <LogoMarquee />

      {/* THE OPERATIONAL GAP */}
      <Section tone="surface">
        <SectionHead eyebrow="The operational gap" title={<>Your cloud keeps moving.<Br /> <strong>Your team shouldn&apos;t have to chase it.</strong></>} desc="As cloud complexity grows, so do the alerts, investigations and handovers that compete for your engineers' attention." />
        <div className="grid gap-4 md:grid-cols-3">
          {gaps.map((g) => (
            <div key={g.title} className="card">
              <IconTile name={g.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink lg:min-h-[2.75em]">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ONE OPERATING MODEL */}
      <Section>
        <SectionHead eyebrow="One operating model" title={<>One operating model. <strong>Across your cloud.</strong></>} desc="Five domains of cloud operations, run the same way and seen in one place." />
        <ul className="grid gap-0 border border-line-strong sm:grid-cols-2 lg:grid-cols-5" style={{ borderTop: "2px solid var(--color-ink)" }}>
          {domains.map((d) => (
            <li key={d.title} className="border-b border-line p-5 last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
              <IconTile name={d.icon} />
              <h3 className="mt-4 font-semibold text-ink">{d.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{d.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* SAMANTHA */}
      <Section tone="surface" className="bg-grid" id="samantha">
        <SectionHead eyebrow="Meet your operational copilot" title={<>Samantha brings <strong>it all together.</strong></>} desc="One interface to coordinate specialized SRE agents, understand their findings and move operational work forward." />
        <TabbedScreen name="Action Space" items={samantha} />
      </Section>

      {/* AUTOPILOT, WITH ACCOUNTABILITY */}
      <Section>
        <SectionHead eyebrow="Autopilot, with accountability" title={<>AI does the groundwork.<Br /> <strong>Expertise guides the decisions.</strong></>} desc="Every step the agents take is visible, and every consequential action waits for a person." />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
          <ul className="grid gap-6">
            {accountability.map((a) => (
              <li key={a.title} className="flex gap-3">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <span>
                  <span className="block font-semibold text-ink">{a.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{a.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          <Screen name="Investigation" label="investigation steps + sign-off" ratio="aspect-[16/10]" />
        </div>
      </Section>

      {/* CONNECTED OPERATIONS */}
      <Section tone="surface">
        <SectionHead eyebrow="Connected operations" title={<>Clarity for <strong>every level of your team.</strong></>} desc="From an engineer's next ticket to a manager's customer portfolio, the Command Center gives each role a relevant view of operations." />
        <RoleTabs name="Command Center" items={levels} />
      </Section>

      {/* MANAGED LAYER */}
      <Section>
        <SectionHead eyebrow="The platform. The agents. The people." title={<>Managed cloud services,<Br /> <strong>built around Tevico.</strong></>} desc="Comprinno brings cloud engineering and managed services expertise to the Tevico operating model, so your team gets support for the work that competes with building your business." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {managed.map((m) => (
            <div key={m.title} className="card">
              <IconTile name={m.icon} />
              <h3 className="mt-4 font-semibold text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
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
        title={<>Let your engineers <strong>build</strong>.<Br /> Give cloud operations an <strong>autopilot</strong>.</>}
        desc="See what Tevico could look like in your cloud environment."
        steps={[]}
        label="Book a Tevico walkthrough"
      />
    </>
  );
}
