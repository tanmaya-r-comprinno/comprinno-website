import type { Metadata } from "next";
import { Br, Button, CtaBand, Faq, PageHero, Section, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Free GenAI Consulting",
  description:
    "Start with a free 2-hour GenAI consulting session. Identify the highest-impact AI use cases for your business and build a roadmap to production.",
  alternates: { canonical: "/resources/free-genai-consulting" },
};

const what = [
  { label: "Discovery", desc: "Understand your business goals, existing data sources, and AWS environment." },
  { label: "Use-case mapping", desc: "Identify and prioritise the highest-value GenAI opportunities for your team." },
  { label: "Feasibility check", desc: "Assess data readiness, model selection, and approximate build effort." },
  { label: "Roadmap", desc: "A practical next-step plan with timelines, AWS funding eligibility, and success metrics." },
];

const faq = [
  {
    q: "Is it really free?",
    a: "Yes. No strings attached. Around 60% of teams continue to work with us after the session, because they choose to, not because they have to.",
  },
  {
    q: "Who runs the session?",
    a: "A certified AWS Solutions Architect who specialises in GenAI and ML, alongside a business analyst. We come prepared with questions, not slides.",
  },
  {
    q: "How long does it take?",
    a: "Two hours for the consulting session itself. We typically share a written summary and next-step recommendations within 48 hours.",
  },
  {
    q: "What if we already have an AI initiative running?",
    a: "Even better. We can review what you have built, identify gaps, and recommend improvements, including cost and governance controls for production AI.",
  },
  {
    q: "Which AI platforms do you work with?",
    a: "OpenAI (we are an OpenAI Select Partner), Anthropic Claude via Amazon Bedrock, Amazon Nova, and Meta Llama. We recommend the right model for your use case, not the most expensive one.",
  },
];

export default function FreeGenAIConsultingPage() {
  return (
    <>
      <PageHero
        eyebrow="Free GenAI Consulting"
        title={
          <>
            Find your <strong>highest-value AI use case</strong>
            <Br /> in two hours, at no cost.
          </>
        }
        desc="A focused session with Comprinno's AI specialists. We help you identify the right use case, assess data readiness, and build a production roadmap. No sales pitch."
      >
        <Button href="/contact">Book your free session <span className="go">→</span></Button>
      </PageHero>

      {/* What is covered */}
      <Section tone="surface">
        <SectionHead
          eyebrow="What you get"
          title={<><strong>Four deliverables</strong> in two hours.</>}
          desc="We come with a structured agenda, not a demo. You leave with real outputs."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {what.map((item, i) => (
            <div key={item.label} className="card">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-2 text-base font-semibold">{item.label}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Use cases */}
      <Section>
        <SectionHead
          eyebrow="What we can help with"
          title={<><strong>AI that ships</strong>, not pilots that stall.</>}
          desc="We focus on use cases with a clear business KPI and a realistic path to production."
        />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Customer support automation",
            "Document understanding and extraction",
            "Intelligent ITSM and ops automation",
            "Clinical research summarisation (CSR)",
            "Sales and marketing personalisation",
            "Financial analysis and reporting",
            "Code generation and review",
            "Shop floor operations with AI at the edge",
            "GenAI-powered data analytics",
          ].map((uc) => (
            <li key={uc} className="card flex items-start gap-3">
              <span className="mt-0.5 text-sm text-muted" aria-hidden="true">▸</span>
              <span className="text-sm font-medium">{uc}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <SectionHead eyebrow="FAQ" title="Common questions" align="left" />
        <Faq items={faq} />
      </Section>

      <CtaBand
        eyebrow="Let's talk"
        title={<>Book your <strong>free GenAI session</strong> today.</>}
        desc="Limited spots available each week. Slots are first-come first-served."
        label="Book free session"
        href="/contact"
        steps={["Fill in the contact form", "30-minute scoping call", "Full 2-hour consulting session"]}
      />
    </>
  );
}
