import type { Metadata } from "next";
import { Br, Button, CtaBand, Faq, PageHero, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "AWS LIFT Program",
  description:
    "Get AWS promotional credits and migration funding. Comprinno manages MAP, POC funding, and other AWS incentive programs for eligible projects.",
  alternates: { canonical: "/resources/aws-lift" },
};

const programs = [
  {
    name: "Migration Acceleration Program (MAP)",
    desc: "AWS-funded program that provides migration credits, tooling, and dedicated AWS support for eligible migrations. Comprinno manages the application and milestone tracking.",
    badge: "Migration",
  },
  {
    name: "AWS Activate (Startup Credits)",
    desc: "Startup credits of up to $100,000 for qualifying early-stage companies building on AWS. Comprinno helps activate and maximise Activate benefits.",
    badge: "Startups",
  },
  {
    name: "Proof of Concept (POC) Funding",
    desc: "AWS funds eligible proof-of-concept projects for GenAI, data, and infrastructure modernisation. Typical funding: $5,000–$25,000.",
    badge: "POC",
  },
  {
    name: "ISV Accelerate",
    desc: "Co-sell and funding opportunities for independent software vendors listing on AWS Marketplace. Comprinno manages the ACE opportunity registration.",
    badge: "ISV",
  },
  {
    name: "Well-Architected Review Credits",
    desc: "AWS provides credits to teams that complete a Well-Architected Framework Review and address high-risk issues.",
    badge: "WAFR",
  },
  {
    name: "AWS Partner Funding",
    desc: "Partner development funds (PDFs) and marketing development funds (MDFs) available through the APN for eligible projects.",
    badge: "Partner",
  },
];

const faq = [
  {
    q: "How do I know if my project qualifies?",
    a: "Eligibility depends on workload type, cloud spend, company stage, and AWS region. Comprinno runs a quick eligibility check in the first conversation — no paperwork needed.",
  },
  {
    q: "Does AWS funding reduce our cost?",
    a: "Yes. MAP credits, for example, are applied directly to your AWS bill. POC funding typically covers 50–100% of the agreed project cost. Comprinno tracks and applies credits as milestones are completed.",
  },
  {
    q: "Can existing AWS customers apply?",
    a: "Yes, for most programs. MAP is available for teams migrating workloads even if some are already on AWS. WAFR credits apply to any team completing a formal review.",
  },
  {
    q: "How long does the application process take?",
    a: "MAP and POC applications typically take 1–2 weeks once documentation is submitted. Activate is faster — usually a few days.",
  },
  {
    q: "What is Comprinno's role?",
    a: "We identify eligible programs, prepare the technical documentation, submit the application to AWS on your behalf, and track milestone completion to ensure credits are released.",
  },
];

export default function AwsLiftPage() {
  return (
    <>
      <PageHero
        eyebrow="AWS LIFT Program"
        title={
          <>
            Reduce your AWS bill
            <Br /> with <strong>AWS funding programs.</strong>
          </>
        }
        desc="Comprinno manages the MAP, Activate, POC, and ISV Accelerate application processes so you get the credits you qualify for without the paperwork overhead."
      >
        <Button href="/contact">Check your eligibility <span className="go">→</span></Button>
      </PageHero>

      {/* Programs */}
      <Section tone="surface">
        <SectionHead
          eyebrow="Available programs"
          title={<><strong>Six AWS funding programs</strong><Br /> Comprinno can unlock for you.</>}
          desc="Most eligible customers qualify for more than one program. We identify and stack them."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div key={p.name} className="card flex flex-col">
              <span className="tag self-start">{p.badge}</span>
              <h3 className="mt-3 text-base font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHead
          eyebrow="Process"
          title="How we unlock your credits."
          align="left"
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", title: "Eligibility check", desc: "We review your workload type, company stage, and AWS spend against program requirements." },
            { step: "02", title: "Documentation", desc: "We prepare the technical documentation — architecture diagrams, migration plans, ROI estimates." },
            { step: "03", title: "Application", desc: "We submit to AWS and liaise directly with your AWS account team to accelerate approval." },
            { step: "04", title: "Milestone tracking", desc: "We track deliverables and submit evidence to ensure credits are released on schedule." },
          ].map((s) => (
            <li key={s.step} className="card">
              <span className="font-mono text-xs text-muted">{s.step}</span>
              <h3 className="mt-2 text-base font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <SectionHead eyebrow="FAQ" title="Common questions" align="left" />
        <Faq items={faq} />
      </Section>

      <CtaBand
        eyebrow="Let's talk"
        title={<>Check your <strong>AWS funding eligibility</strong> in 15 minutes.</>}
        desc="We run a quick eligibility check at no cost. Most teams qualify for at least one program."
        label="Check eligibility"
        href="/contact"
        steps={["Tell us about your project", "We identify eligible programs", "We manage the application"]}
      />
    </>
  );
}
