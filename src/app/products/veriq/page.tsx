import type { Metadata } from "next";
import { Br, Button, Container, CtaBand, Eyebrow, Faq, Section, SectionHead } from "@/components/ui";
import { Icon, IconTile, type IconName } from "@/components/Icon";
import LogoMarquee from "@/components/LogoMarquee";
import FlowLoop from "@/components/FlowLoop";
import GridGlow from "@/components/GridGlow";
import RainField from "@/components/RainField";

export const metadata: Metadata = {
  title: "VeriQ agentic due-diligence workspace | Comprinno",
  description:
    "VeriQ reads your questionnaire, drafts every answer from your own evidence with citations, and hands it to your team to review and approve.",
  alternates: { canonical: "/products/veriq" },
};

/** Illustrative drafted-answer card for the hero. */
function DraftCard() {
  return (
    <figure className="border border-line-strong bg-bg shadow-xl">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span>VeriQ · Vendor security questionnaire · Q14 of 212</span>
        <span className="uppercase tracking-widest">Illustrative</span>
      </figcaption>
      <div className="grid gap-4 p-5">
        <p className="ml-auto max-w-[85%] bg-surface px-4 py-2.5 text-sm text-ink">Do you encrypt customer data at rest? Describe the controls.</p>
        <div className="border border-line p-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Draft answer</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">Yes. Customer data at rest is encrypted using managed keys, with access restricted by role and reviewed quarterly, as set out in our security policy.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Security Policy v4.pdf · §3.2", "SOC 2 Report 2026.pdf · p.18"].map((c) => <span key={c} className="tag">{c}</span>)}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm" aria-hidden="true">
          <span className="border border-ink bg-surface px-3 py-1.5 font-medium text-ink">Approve</span>
          <span className="border border-line-strong px-3 py-1.5 text-ink">Edit</span>
          <span className="border border-line-strong px-3 py-1.5 text-ink">Flag for review</span>
        </div>
      </div>
    </figure>
  );
}

function Screen({ name, label }: { name: string; label: string }) {
  return (
    <figure className="border border-line-strong bg-bg">
      <figcaption className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
        <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 border border-line-strong" />)}</span>
        VeriQ · {name}
      </figcaption>
      <div className="bg-grid flex aspect-[16/10] items-center justify-center p-4">
        <span className="border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">Screenshot needed: {label}</span>
      </div>
    </figure>
  );
}

const inside = [
  { k: "01 · Questionnaire workspace", title: "Every question, drafted and sourced.", points: ["Upload Excel, Word, PDF or CSV questionnaires and see every question parsed into one list", "Each draft shows its confidence and the exact passages it was built from", "Click a citation to open the source document at that passage"], screen: ["Workspace", "questionnaire view with drafts and citations"], caption: "Drafts and their evidence side by side, ready for review." },
  { k: "02 · Review queue", title: "People decide what ships.", points: ["Low-confidence drafts rise to the top so reviewers start where it matters", "Edit, approve or send back any answer, with a full history of changes", "Approved answers feed back in and sharpen future drafts"], screen: ["Review", "review queue sorted by confidence"], caption: "A review flow that keeps a person accountable for every answer." },
  { k: "03 · Knowledge and agents", title: "Your evidence, organized and in date.", points: ["Tag policies, reports and certificates, and set expiry and exclusion rules", "Schedule documents to move between Include and Exclude references", "Build agents per team, client or topic, each with its own scope"], screen: ["Knowledge", "knowledge base and agent settings"], caption: "One place to control what VeriQ is allowed to cite." },
];

const highlights = [
  { value: "Minutes", label: "From upload to a full first draft" },
  { value: "Cited", label: "Each answer linked to its source passage" },
  { value: "Reviewed", label: "A person approves before anything ships" },
  { value: "Current", label: "Only approved, in-date evidence is used" },
];

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Hundreds of questions, every time", desc: "Security reviews, vendor assessments and RFPs ask the same things in different words, and someone has to answer each one.", icon: "layers" },
  { title: "Evidence scattered everywhere", desc: "Policies, reports and certificates live across drives, wikis and ticketing tools, so every answer starts with a search.", icon: "search" },
  { title: "Answers that go stale", desc: "Last year's report or an expired certificate slips into a reply, and a reviewer has to catch it.", icon: "clock" },
];

const steps = [
  { title: "Connect your data sources", desc: "Link S3, SharePoint, Confluence, Drive and more. Their documents become citable knowledge." },
  { title: "Upload and parse", desc: "Drop in an Excel, Word, PDF or CSV questionnaire. VeriQ reads and structures every question." },
  { title: "Agent drafts with evidence", desc: "Each answer is drafted from your knowledge, with the exact source passages attached." },
  { title: "Review and approve", desc: "Low-confidence drafts come first. Nothing is final until a person signs off." },
];

const capabilities: { title: string; desc: string; icon: IconName }[] = [
  { title: "Evidence-grounded answers", desc: "Agents answer only from the files you add, never from guesswork.", icon: "database" },
  { title: "Inline citations", desc: "Every draft shows the exact passage behind it, so reviewers can verify fast.", icon: "check" },
  { title: "Built-in connections", desc: "Connect directly to S3, SharePoint, Confluence, Drive, Box, Salesforce and more, with your evidence left in place.", icon: "cloud" },
  { title: "Data lifecycle management", desc: "Move documents between Include and Exclude references on a schedule, in plain language or from the UI.", icon: "loop" },
  { title: "Knowledge base", desc: "Upload policies, reports and certificates. Tag them and set expiry and exclusion rules.", icon: "layers" },
  { title: "Custom agents", desc: "Build agents per team, client or topic, each with its own voice and scope.", icon: "agent" },
];

const connections: { name: string; icon: IconName }[] = [
  { name: "Amazon S3", icon: "database" },
  { name: "SharePoint Online", icon: "users" },
  { name: "Confluence Cloud", icon: "puzzle" },
  { name: "Confluence Data Center", icon: "cube" },
  { name: "Google Drive", icon: "cloud" },
  { name: "OneDrive", icon: "migrate" },
  { name: "Box", icon: "layers" },
  { name: "Salesforce", icon: "building" },
  { name: "ServiceNow", icon: "alert" },
  { name: "Zendesk", icon: "mail" },
  { name: "Web crawler", icon: "search" },
  { name: "Custom source", icon: "code" },
];

const lifecycle = [
  { title: "Include and Exclude references", desc: "Curate two living libraries: an Include set the agent cites from, and an Exclude set it never touches." },
  { title: "Scheduled, hands-free governance", desc: "Set documents to move between references on a recurring schedule, so renewals and expirations are handled automatically." },
  { title: "Steer it in plain language", desc: "Tell VeriQ what to do, such as “move last year’s SOC 2 report to Exclude once the new one lands.”" },
  { title: "Or do it by hand", desc: "Promote, retire or reschedule any document directly from the UI." },
];

const trust = ["Data residency controls", "Audit and compliance trail", "End-to-end encryption", "Sensitive-data protection", "Role-based access control", "Expired and excluded files never cited"];

// TODO: answers drafted from page copy — confirm with the VeriQ team.
const faqs = [
  { q: "What is VeriQ?", a: "VeriQ is an agentic due-diligence workspace. It reads security questionnaires, vendor assessments and RFPs, drafts each answer from your own evidence with citations, and routes drafts to your team for approval." },
  { q: "Where do the answers come from?", a: "Only from the documents in your Include references, drawn from the files you upload and the sources you connect. Excluded and expired files are never cited." },
  { q: "What file types can I upload?", a: "Questionnaires in Excel, Word, PDF or CSV. Evidence can be uploaded directly or read in place from connected sources." },
  { q: "Does a person still review the answers?", a: "Yes. Every answer is a draft until someone on your team approves it, and low-confidence drafts are surfaced first." },
  { q: "Which systems can VeriQ connect to?", a: "Amazon S3, SharePoint Online, Confluence Cloud and Data Center, Google Drive, OneDrive, Box, Salesforce, ServiceNow, Zendesk, a web crawler and custom sources." },
  { q: "Can I create more than one agent?", a: "Yes. Build agents per team, client or topic, each with its own voice and scope." },
  { q: "How is sensitive data handled?", a: "With end-to-end encryption, role-based access control, data residency controls, sensitive-data protection and a full audit trail." },
];

export default function VeriQPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-block relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden="true"><GridGlow /></div>
        <Container className="py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <Eyebrow>VeriQ · Agentic due-diligence workspace</Eyebrow>
              <h1 className="mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-normal leading-[1.1] [&_strong]:font-bold">
                Questionnaires answered in <strong className="sweep">minutes</strong>, not <strong>weeks</strong>.
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Cited drafts from your own evidence, ready for your team to approve.
              </p>
              <div className="mt-8">
                <Button href="/contact">Book a demo →</Button>
              </div>
              <p className="mt-6 font-mono text-xs text-muted">For fintech, healthcare, SaaS, life sciences, retail and manufacturing teams</p>
            </div>
            <DraftCard />
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* HIGHLIGHTS */}
      <Section>
        <dl className="stats stats-words">
          {highlights.map((st) => (
            <div key={st.label} className="stat">
              <dt className="stat-label">{st.label}</dt>
              <dd className="stat-num">{st.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* PROBLEM */}
      <Section tone="surface" background={<RainField />}>
        <SectionHead eyebrow="The problem" title={<>Questionnaires shouldn’t <strong>take weeks.</strong></>} />
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
        <SectionHead eyebrow="How it works" title={<>From connected to drafted, <strong>then approved.</strong></>} desc="Three steps get you a cited draft. The fourth keeps a person in charge of every answer." />
        <FlowLoop items={steps} icons={["cloud", "layers", "agent", "users"]} caption="Approved answers sharpen the drafts on your next questionnaire" />
      </Section>

      {/* INSIDE VERIQ */}
      <Section tone="surface">
        <SectionHead eyebrow="Inside VeriQ" title={<>From a blank questionnaire <strong>to an approved reply.</strong></>} desc="A look at the screens your team works in: drafting, review and the knowledge behind every answer." />
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
                <Screen name={x.screen[0]} label={x.screen[1]} />
                <p className="mt-3 text-sm text-muted">{x.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CAPABILITIES */}
      <Section>
        <SectionHead eyebrow="Core capabilities" title={<>Everything your due-diligence <strong>workflow needs.</strong></>} />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((s) => (
            <div key={s.title} className="card">
              <IconTile name={s.icon} />
              <h3 className="mt-4 font-semibold leading-snug text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CONNECTIONS */}
        <div className="mt-20">
        <SectionHead eyebrow="Connections" title={<>Answers grounded in <strong>your systems of record.</strong></>} desc="VeriQ connects to the places your evidence already lives, with no copying or manual exports. Point it at a source and its documents become citable knowledge." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {connections.map((c) => (
            <li key={c.name} className="flex items-center gap-3 border border-line bg-bg p-3 text-sm font-medium text-ink">
              <IconTile name={c.icon} />
              {c.name}
            </li>
          ))}
        </ul>
        </div>
      </Section>

      {/* DATA LIFECYCLE */}
      <Section tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <Eyebrow>Built-in data lifecycle</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Your knowledge <strong className="font-semibold">stays current.</strong></h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Evidence has a shelf life. VeriQ promotes fresh, approved material and retires anything outdated, so every answer reflects your latest position.</p>
            <ul className="mt-6 grid gap-4">
              {lifecycle.map((l) => (
                <li key={l.title} className="flex gap-3">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-semibold text-ink">{l.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{l.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <figure className="border border-line-strong bg-bg p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Illustrative</p>
            <p className="mt-3 bg-surface px-4 py-3 text-sm text-ink">“Move expired certificates to Exclude every quarter.”</p>
            <p className="my-3 text-center text-muted" aria-hidden="true">↓</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Include", files: ["SOC 2 Report 2026.pdf", "ISO 27001 Cert.pdf", "Security Policy v4.pdf"], cls: "border-ink bg-surface" },
                { k: "Exclude", files: ["SOC 2 Report 2025.pdf", "ISO 27001 (expired).pdf", "Security Policy v3.pdf"], cls: "border-line text-muted" },
              ].map((col) => (
                <div key={col.k} className={`border p-3 ${col.cls}`}>
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">■ {col.k}</p>
                  <ul className="mt-2 divide-y divide-line text-sm">
                    {col.files.map((f) => <li key={f} className="py-2">{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </figure>
        </div>
      </Section>

      {/* TRUST */}
      <Section>
        <SectionHead eyebrow="Built for trust" title={<>Security and compliance <strong>by design.</strong></>} desc="Your evidence is sensitive. VeriQ keeps it protected and every answer traceable." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map((t) => (
            <li key={t} className="flex items-center gap-3 border border-line bg-bg p-4 text-sm font-medium text-ink">
              <Icon name="check" className="h-4 w-4 shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.5rem)] font-normal leading-[1.2]">Asked before <strong className="font-semibold">your first draft</strong>.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">Quick answers about drafting, evidence and review.</p>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      <CtaBand
        title={<>Ready to answer your next questionnaire<Br /> in <strong>minutes</strong>?</>}
        desc="See VeriQ draft real answers from your own evidence, with every source cited."
        steps={["Share a sample questionnaire", "Watch VeriQ draft it from your evidence", "Review the cited answers with us"]}
        label="Book a demo"
      />
    </>
  );
}
