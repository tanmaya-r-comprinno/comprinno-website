import type { Metadata } from "next";
import Link from "next/link";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import GridGlow from "@/components/GridGlow";
import RainField from "@/components/RainField";

export const metadata: Metadata = {
  title: "Tevico-powered managed cloud services | Comprinno",
  description:
    "Keep your AWS environment secure, reliable and cost-efficient with Comprinno's managed cloud services, supported by Tevico's monitoring, governance and automation capabilities.",
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
        <span className="border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">Screenshot needed: {label}</span>
      </div>
    </figure>
  );
}

const numbers = [
  { value: "60", suffix: "%", label: "Average cost reduction from Tevico recommendations" },
  { value: "80", suffix: "%", label: "Less manual effort, approx., from workflow automation" },
  { value: "250", suffix: "+", label: "Security checks in the security rating" },
  { value: "24/7", suffix: "", label: "Automated platform monitoring" },
];

const model: { title: string; desc: string; icon: IconName }[] = [
  { title: "Comprinno operates", desc: "Engineers manage the operational activities, investigations and improvements included in your service plan.", icon: "users" },
  { title: "Tevico enables", desc: "The platform consolidates visibility, findings and automation to support service delivery and reporting.", icon: "chart" },
  { title: "You retain oversight", desc: "Your engagement defines responsibilities, access permissions and approval requirements.", icon: "eye" },
];

const capabilities: { title: string; desc: string; icon: IconName }[] = [
  { title: "Cloud cost management", desc: "Tevico consolidates spending information and savings recommendations. Comprinno reviews opportunities and implements approved optimizations within the agreed scope.", icon: "coin" },
  { title: "Security and governance", desc: "Tevico surfaces security findings and trends. Comprinno investigates relevant findings and coordinates remediation under the agreed service and approval process.", icon: "shield" },
  { title: "Reliability and operations", desc: "Tevico provides monitoring, alerts and recovery information. Comprinno responds to incidents and manages the operational activities covered by your plan.", icon: "alert" },
  { title: "Inventory and reporting", desc: "Tevico consolidates resource inventory and governance findings. Comprinno uses this information to support reviews, reporting and agreed corrective actions.", icon: "cube" },
];

const alsoSupported = ["AWS security assessments", "AWS Well-Architected Reviews", "Incident workflow integrations", "Compliance findings and reporting"];

const inside = [
  { k: "01 · Cost view", title: "Understand spending and savings opportunities.", points: ["Spending by account, service, usage type and AWS Region", "Daily cost trends and highest-spend AWS Regions", "Savings recommendations, such as rightsizing overprovisioned Amazon EC2 instances"], screen: ["Cost Dashboard", "Tevico cost dashboard view"], caption: "Cost visibility and recommendations to support Comprinno’s optimization reviews." },
  { k: "02 · Security view", title: "Track findings and security trends.", points: ["Findings organized by severity and affected resources", "Security score history to show changes over time", "Information to support investigation and remediation prioritization"], screen: ["Security", "Tevico security view"], caption: "Security findings and trends to support agreed operational reviews." },
  { k: "03 · AWS Well-Architected Review view", title: "Keep review findings and remediation progress visible.", points: ["Automatically identified findings where supported", "Remediation planning and progress tracking", "Architecture documentation alongside review information"], screen: ["AWS Well-Architected Review", "Tevico AWS Well-Architected Review view"], caption: "Review information and progress tracking to support engineering follow-through." },
];

const steps = [
  { title: "Assess", desc: "Review your AWS environment, priorities and operational gaps." },
  { title: "Agree", desc: "Define service scope, coverage, responsibilities, access and approval requirements." },
  { title: "Onboard", desc: "Connect accounts, configure agreed tooling and establish runbooks and escalation paths." },
  { title: "Operate and improve", desc: "Deliver the agreed operations, reporting and optimization activities." },
];

const access: { title: string; desc: string; icon: IconName }[] = [
  { title: "Platform visibility", desc: "Define the configuration and resource information collected for the enabled platform features.", icon: "eye" },
  { title: "Operational access", desc: "Agree on permissions needed for the activities Comprinno is authorized to perform.", icon: "lock" },
  { title: "Change approvals", desc: "Establish how changes are reviewed, approved and recorded within the service scope.", icon: "check" },
];

const results = [
  { metric: "$8,500–$9,000", what: "monthly savings, with approximately 80% less effort", name: "Ashok Ranadive", role: "Co-founder & CEO, Enerlly" },
  { metric: "$7,000+", what: "saved, with more than 65% less effort", name: "Kamal Aggarwal", role: "Co-founder & CEO, Autowiz" },
];

// TODO: answers drafted from page copy — confirm with the managed services team.
const faqs = [
  { q: "What is Tevico’s role in Comprinno’s managed services?", a: "Tevico is the platform that consolidates cost information, security findings, monitoring, inventory and review progress. Comprinno’s engineers use it to support the operational work in your plan, and it gives you visibility into your environment." },
  { q: "What does Comprinno manage?", a: "Comprinno manages the operational activities, investigations and improvements defined in your managed services plan. The exact scope, coverage and responsibilities are agreed before onboarding." },
  { q: "Does continuous monitoring mean 24/7 engineer support?", a: "No. Tevico monitors your environment continuously. Engineer coverage and response commitments are defined separately in your managed services plan." },
  { q: "What access is required?", a: "Access depends on the platform features enabled and the activities Comprinno is authorized to perform. Platform visibility access and operational access are defined separately as part of the engagement." },
  { q: "How are changes to our environment approved?", a: "Change review, approval and recording requirements are agreed during onboarding. Comprinno implements changes within the agreed scope and approval process." },
  { q: "Can you work with our existing engineering team?", a: "Yes. Responsibilities and escalation paths between your team and Comprinno are established during onboarding, so both teams know who does what." },
  { q: "How do we get started?", a: "Start with an operational review of your AWS environment and priorities. We then agree on the service scope, onboard your accounts and move into ongoing operations." },
  { q: "How are service fees and AWS charges handled?", a: "Comprinno’s managed services fees are defined in your plan. AWS usage, including any AWS services enabled for monitoring, is billed by AWS at its standard rates." },
];

export default function TevicoPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <Eyebrow>Tevico-powered managed cloud services</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                <strong className="sweep">Powered by Tevico.</strong><br /> Managed by Comprinno.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                A secure, reliable, cost-efficient AWS cloud, run by our engineers.
              </p>
              <div className="mt-8">
                <Button href="https://tevi.co">Explore Tevico →</Button>
              </div>
            </div>
            <div className="relative pb-12 pr-10 sm:pb-16 sm:pr-16">
              <Screen name="Cost Dashboard" label="Tevico cost dashboard" />
              <div className="absolute bottom-0 right-0 w-[62%] shadow-xl">
                <Screen name="Security" label="Tevico security view" />
              </div>
            </div>
          </div>
        </Container>
      </section>

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
        <p className="mt-4 text-xs text-muted">Tevico platform figures. Results vary by environment and the actions taken.</p>
      </Section>

      {/* OPERATING MODEL */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="Comprinno operates. Tevico enables." title={<>One operating team. <strong>A platform that keeps you informed.</strong></>} desc="Comprinno manages the operational work within your agreed service scope. Tevico brings together the findings, dashboards and automation that support delivery and give you visibility into your environment." />
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
        <p className="mt-10 text-center font-mono text-xs text-muted">
          Every Comprinno managed services plan includes Tevico Premium · <Link href="/services/manage#plans" className="text-ink underline underline-offset-4">See plans</Link>
        </p>
      </Section>

      {/* CAPABILITIES */}
      <Section>
        <SectionHead eyebrow="Operational capabilities" title={<>Platform visibility. <strong>Engineering action.</strong></>} desc="Tevico helps surface the information that matters. Comprinno uses it to support the operational work and improvements agreed in your managed services plan." />
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
          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">Also supported</span>
          {alsoSupported.map((a) => <span key={a} className="font-medium">{a}</span>)}
        </div>
      </Section>

      {/* INSIDE TEVICO */}
      <Section tone="surface" id="inside-tevico">
        <SectionHead eyebrow="Inside Tevico" title={<>Visibility into your cloud <strong>and the work behind it.</strong></>} desc="Explore how Tevico brings together cost information, security findings and review progress to support informed operational decisions." />
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
      </Section>

      {/* ONBOARDING */}
      <Section>
        <SectionHead eyebrow="Onboarding and ongoing delivery" title={<>From operational review <strong>to ongoing management</strong>.</>} desc="Start with your environment and priorities. Define the service, establish access and transition into agreed operations." />
        <FlowLoop items={steps} icons={["search", "layers", "code", "chart"]} caption="Repeat again: every review cycle improves your cloud operations" />
        <div className="mt-10 grid gap-6 border border-line-strong bg-surface p-6 lg:grid-cols-[1fr_2fr]">
          <h3 className="text-xl font-semibold text-ink">The engineers behind your cloud operations.</h3>
          <div>
            <p className="text-sm leading-relaxed text-ink-2 sm:text-base">Comprinno’s cloud operations team uses Tevico alongside agreed tools and runbooks to deliver your managed services scope. Responsibilities, escalation paths and support coverage are established during onboarding.</p>
            <p className="mt-3 font-mono text-xs text-muted">Additional specialist work can be scoped separately where needed.</p>
          </div>
        </div>
      </Section>

      {/* ACCESS */}
      <Section tone="surface">
        <SectionHead eyebrow="Access, approvals and control" title={<>Access aligned with <strong>the work you authorize.</strong></>} desc="Platform assessment and monitoring access should be distinguished from the permissions needed to operate or change your environment. Access, responsibilities and approval requirements are defined as part of the engagement." />
        <div className="grid gap-4 md:grid-cols-3">
          {access.map((p) => (
            <div key={p.title} className="card">
              <IconTile name={p.icon} />
              <h3 className="mt-4 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CUSTOMER OUTCOMES */}
      <Section>
        <SectionHead eyebrow="Customer outcomes" title={<><strong>Evidence</strong> from customer environments.</>} desc="Selected customer results involving Tevico. Outcomes depend on the environment, actions taken and scope of engagement." />
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((r) => (
            <figure key={r.name} className="card">
              <span className="tag">Tevico customer</span>
              <p className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">{r.metric}</p>
              <p className="mt-1 text-ink-2">{r.what}</p>
              <figcaption className="mt-5 border-t border-line pt-4">
                <span className="block font-semibold text-ink">{r.name}</span>
                <span className="mt-1 block font-mono text-[0.7rem] uppercase tracking-widest text-muted">{r.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Questions about <strong className="font-semibold">Tevico-powered managed services</strong>?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Understand the platform, the service and your next step.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Ready to put your cloud operations<Br /> in <strong>experienced hands</strong>?</>}
        desc="Discuss your AWS environment, priorities and support needs. We'll define a managed services approach supported by Tevico."
        steps={["30-minute operational review", "Scope, access and approvals agreed", "Onboarding into managed operations"]}
        label="Discuss your cloud operations"
      />
    </>
  );
}
