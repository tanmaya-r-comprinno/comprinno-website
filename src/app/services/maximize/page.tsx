import type { Metadata } from "next";
import Link from "next/link";
import { Br } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Maximize: move AI beyond pilots and put it to work in production",
  description:
    "We build AI agents and generative AI applications that handle real workflows, with guardrails, evaluation and cost controls built in. Then we help you run them.",
  alternates: { canonical: "/services/maximize" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Pilots that never ship", desc: "Many AI pilots stall on data access, permissions and evaluation, so they never reach production.", icon: "rocket" },
  { title: "Unclear value", desc: "Use cases chosen for novelty rather than measurable business value are difficult to evaluate.", icon: "search" },
  { title: "Runaway costs", desc: "Unoptimized model calls, vector stores and infrastructure drive costs up faster than value.", icon: "coin" },
  { title: "Siloed data", desc: "AI is only as good as the data it can reach, and much of that data sits in separate systems.", icon: "database" },
];

const disciplines = [
  { k: "01 · Solves: siloed data", mark: "Data", title: "Data Analytics & ML Foundations", desc: "Data lakes, pipelines, governance and analytics in the cloud, with AWS Glue, Amazon Redshift and Amazon QuickSight validations. AWS Data Services Competency.", tags: ["Data lakes and pipelines", "Governed access"] },
  { k: "02 · Solves: unclear value", mark: "KPI", title: "Applied AI for Business", desc: "Computer vision, NLP, predictive analytics, fraud detection and recommendation models, each tied to a business KPI and built on services such as Amazon SageMaker AI.", tags: ["Amazon SageMaker AI", "KPI-linked models"] },
  { k: "03 · Solves: pilots that never ship", mark: "GenAI", title: "Generative AI Applications", desc: "Assistants and copilots grounded in your own data with retrieval-augmented generation (RAG), fine-tuned where it helps, and tested for accuracy and safety before launch.", tags: ["RAG and fine-tuning", "Amazon Bedrock Guardrails"] },
  { k: "04 · AI that acts", mark: "Agents", title: "Agentic AI Solutions", desc: "AI agents that plan and complete multistep work across your systems, such as investigating incident root causes or classifying and summarizing service tickets. Built on Amazon Bedrock AgentCore with scoped access, guardrails and tracing.", tags: ["Amazon Bedrock AgentCore", "Multi-agent orchestration"] },
];

const scope: { title: string; icon: IconName }[] = [
  { title: "AI agents & multi-agent workflows", icon: "agent" },
  { title: "RAG & knowledge assistants", icon: "search" },
  { title: "LLM fine-tuning", icon: "spark" },
  { title: "Intelligent document processing", icon: "layers" },
  { title: "Predictive analytics & ML", icon: "chart" },
  { title: "Computer vision & NLP", icon: "eye" },
  { title: "AI guardrails & evaluation", icon: "shield" },
  { title: "Cost-optimized AI deployment", icon: "coin" },
];

const numbers = [
  { value: "19", suffix: "+", label: "Applied AI projects" },
  { value: "14", suffix: "×", label: "Faster image processing" },
  { value: "2–3", suffix: " weeks", label: "To a working prototype" },
  { value: "1,000", suffix: "+", label: "Projects delivered" },
];

const steps = [
  { title: "Discover", desc: "Pick the use cases worth doing, tie each to a business KPI, and check funding eligibility." },
  { title: "Design", desc: "Choose the model, data sources, guardrails and success measures for each use case." },
  { title: "Prototype", desc: "Build a GenAI proof of concept on your data in 2 to 3 weeks, with measured accuracy, response time and cost." },
  { title: "Scale", desc: "Harden it for production: security, evaluation, monitoring and cost controls." },
  { title: "Operate", desc: "Monitor quality, cost and usage after launch, and keep improving it." },
];

const included = [
  "Every use case tied to a business KPI",
  "Funding eligibility checked at the start",
  "Accuracy, response time and cost tested before launch",
  "Amazon Bedrock Guardrails for safe, compliant outputs",
  "Scoped permissions and tenant isolation for agents",
  "Logging and tracing of agent and model activity",
  "Encryption, least privilege and private networks",
  "A choice of models across providers, without dependence on a single model",
  "Cost controls for model calls and infrastructure",
  "Monitoring and support after launch",
];

const credentials = ["AWS AI Services Competency", "AWS Data Services Competency", "AWS Strategic Collaboration Agreement for generative AI", "OpenAI Select Partner"];

const outcomes = [
  { tag: "Agentic AI", metric: "[X%]", what: "faster root-cause analysis", title: "An IT operations platform automates root cause analysis with Amazon Bedrock AgentCore", href: "/resources/case-studies/it-ops-rca-agentcore", icon: "agent" as IconName },
  { tag: "Generative AI", metric: "50% fewer", what: "compliance errors · months → weeks", title: "Sirovate cuts plain-language summary production from months to weeks", href: "/resources/case-studies/sirovate-genai-csr", icon: "spark" as IconName },
  { tag: "Computer vision", metric: "14×", what: "faster image processing", title: "[Customer] processes images 14× faster with computer vision in the cloud", href: "/resources/case-studies", icon: "eye" as IconName },
];

const faqs = [
  { q: "How is an AI agent different from a chatbot?", a: "Agents plan and carry out tasks across your systems within set permissions. Chatbots mainly answer questions." },
  { q: "Where should we start?", a: "With one frequent, measurable workflow that has accessible data. The AI readiness assessment reviews data, governance and architecture, then delivers a roadmap and business case." },
  { q: "How long does it take to reach production?", a: "A GenAI proof of concept takes 2 to 3 weeks, and the goal is measurable ROI within 12 weeks. Timing depends on the use case and data readiness." },
  { q: "How do you protect our data?", a: "Your prompts and outputs are not used to train the underlying models. Processing stays in your chosen region, with encryption using managed keys, least-privilege access and private network subnets." },
  { q: "How do you keep agents under control?", a: "Agents get only the access they need through scoped roles and temporary credentials. Guardrails filter unsafe output, and every agent and model action is logged and traced." },
  { q: "How do you measure accuracy and limit hallucinations?", a: "We test accuracy, response time and cost per request before launch, ground answers with RAG and source citations, and track production accuracy on dashboards." },
  { q: "Are we locked into one model?", a: "No. We select models from multiple providers to suit each use case." },
  { q: "Can our AI project qualify for funding?", a: "Often, yes. We assess eligibility for relevant funding programs at the start, during the AI readiness assessment. Availability depends on the program, project, geography and provider approval." },
  { q: "Who runs the system after launch?", a: "Comprinno can operate it, or hand it to your team with documentation and knowledge transfer." },
];

export default function MaximizePage() {
  return (
    <ServiceStory
      d={{
        hero: {
          eyebrow: "Maximize",
          title: <><span className="lg:whitespace-nowrap">Move AI beyond <strong className="font-bold">pilots</strong> and put it</span><Br /> to work in <strong className="sweep font-bold">production</strong>.</>,
          lines: [
            "We build AI agents and generative AI applications that handle real workflows,",
            "with guardrails, evaluation and cost controls built in. Then we help you run them.",
          ],
          cta: "Book an AI readiness assessment",
        },
        problem: { title: <>AI isn&apos;t one problem. <strong>It&apos;s four.</strong></>, desc: "Any one of them keeps AI stuck in a demo. Each one is fixable.", items: problems },
        path: { title: <><strong>One partner.</strong> Four ways to put AI to work.</>, desc: "From the data underneath to agents that act, each piece is built to reach production and stay there.", items: disciplines },
        scope: { eyebrow: "Capabilities", title: <>Start with <strong>your use case.</strong></>, desc: "Pick one use case to start, then build on the same foundation.", items: scope },
        numbers,
        steps: { eyebrow: "From use case to production", title: <>Five steps, with <strong>real numbers</strong> before you scale.</>, desc: "You see accuracy, response time and cost on your own data before committing further.", items: steps, icons: ["search", "layers", "spark", "rocket", "eye"], caption: "→ every new use case builds on the same foundation, so value compounds" },
        included: {
          eyebrow: "What you get",
          title: <>What <strong>every AI engagement</strong><Br /> includes.</>,
          desc: "Governed from day one, on the same secure cloud foundation we migrate, modernize and run.",
          items: included,
        },
        credentials: { title: <>AI credentials you can <strong>trust</strong>.</>, items: credentials },
        outcomes: { title: <><strong>Production results</strong>, not pilots.</>, desc: "AI that's live and doing real work for our clients.", more: "All AI stories", items: outcomes, art: 1 },
        faq: { title: <>Questions before you<Br /> <strong>build</strong>?</>, desc: "Quick answers to what teams ask us before an AI project.", items: faqs },
        cta: {
          title: <>Have an AI use case that needs<Br /> to reach <strong>production</strong>?</>,
          desc: "Start with an AI readiness assessment. You’ll have a prioritized use case, defined success measures and a funding eligibility assessment before development begins.",
          steps: ["AI readiness assessment", "Use case, KPI + funding check", "A working prototype in 2–3 weeks"],
          label: "Book an AI readiness assessment",
          next: <>Need the foundation first? <Link href="/services/migrate">Migrate</Link> · <Link href="/services/modernize">Modernize</Link> · <Link href="/services/manage">Manage</Link></>,
        },
      }}
    />
  );
}
