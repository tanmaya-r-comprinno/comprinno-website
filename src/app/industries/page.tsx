import type { Metadata } from "next";
import Link from "next/link";
import { Br } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Industries: cloud and AI for regulated and fast-growing industries",
  description:
    "We help fintech, healthcare, life sciences and retail companies run in the cloud with the controls their regulators expect, and add AI where it makes a measurable difference.",
  alternates: { canonical: "/industries" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Compliance complexity", desc: "RBI, SEBI, IRDAI, PCI DSS and HIPAA set strict rules for data, logs and incidents.", icon: "shield" },
  { title: "Legacy systems", desc: "Older core platforms block real-time processing, new products and AI.", icon: "layers" },
  { title: "Data silos", desc: "Data spread across systems slows research, underwriting and reporting.", icon: "database" },
  { title: "Peak load", desc: "Sale days, salary days and market events bring traffic spikes that legacy setups can't absorb.", icon: "chart" },
];

const industries = [
  { k: "01 · Fintech & BFSI", mark: "BFSI", title: "Payments, lending and insurance", desc: "Launch and scale in the cloud with controls mapped to RBI, SEBI, IRDAI, SOC 2 and PCI DSS, as in our PCI DSS-audited setup for a POS leader serving nearly 153,000 merchants.", tags: ["RBI, SEBI and IRDAI", "PCI DSS v4.0.1"] },
  { k: "02 · Healthcare", mark: "Health", title: "Patient platforms and health data", desc: "Encryption, access controls and audit trails designed for HIPAA. Portea moved 40+ workloads and a 4 TB+ database to the AWS Mumbai Region ahead of India's proposed data protection law.", tags: ["HIPAA-ready architecture", "India data residency"] },
  { k: "03 · Life sciences", mark: "Labs", title: "Research and clinical documentation", desc: "Generative AI for research and clinical work. Sirovate cut compliance-related errors in clinical summaries by 50%, and Quandle Labs speeds up bioinformatics analysis.", tags: ["GenAI for research", "Scalable data platforms"] },
  { k: "04 · Retail & consumer", mark: "Retail", title: "Sale-day scale, lower cost", desc: "Handle sale-day traffic, personalize experiences and keep cloud costs in check. For boAt, we cut daily DynamoDB costs by 65% within two weeks, and auto scaling handled its sale-event surge.", tags: ["Peak-ready scaling", "Cost governance"] },
];

const scope: { title: string; icon: IconName }[] = [
  { title: "Cloud infrastructure & migration", icon: "cloud" },
  { title: "AI & predictive analytics", icon: "spark" },
  { title: "Compliance automation", icon: "check" },
  { title: "EHR, LIMS, ERP & POS integration", icon: "puzzle" },
  { title: "Real-time analytics & personalization", icon: "chart" },
  { title: "Disaster recovery & high availability", icon: "database" },
  { title: "Security posture & identity governance", icon: "lock" },
  { title: "Microservices modernization", icon: "layers" },
];

const numbers = [
  { value: "1,000", suffix: "+", label: "Cloud and AI projects" },
  { value: "750", suffix: "+", label: "Clients" },
  { value: "200", suffix: "+", label: "Compliance projects" },
  { value: "98", suffix: "%", label: "Client satisfaction (CSAT)" },
];

const steps = [
  { title: "Assess & align", desc: "Map your regulators, data flows and current controls, and agree what \"compliant\" means for you." },
  { title: "Architect for compliance", desc: "Design where data lives, what gets logged and how incidents are reported, before anything is built." },
  { title: "Build & migrate", desc: "Build or move workloads into a guardrailed cloud environment, with controls in place from day one." },
  { title: "Secure & prove", desc: "Run security operations and collect audit evidence continuously, so audits hold no surprises." },
  { title: "Scale & optimize", desc: "Handle peak traffic, control cost and add AI where it makes a measurable difference." },
];

const included = [
  "Controls mapped to RBI, SEBI and IRDAI cloud rules",
  "Data kept in cloud regions in India where rules require it",
  "In-country disaster recovery: Mumbai and Hyderabad",
  "Designed for SOC 2, PCI DSS v4.0.1 and HIPAA",
  "Audit evidence collected continuously, not pre-audit",
  "Tamper-resistant logs via CloudTrail and S3 Object Lock",
  "Incident response playbooks with SIEM integration",
  "Human-reviewed, auditable AI for regulated decisions",
  "Autoscaling for peak traffic",
  "ISO 27001 certified, SOC 2 Type II attested partner",
];

const credentials = ["AWS Premier Tier Partner", "AWS Security Competency", "AWS Resilience Competency", "AWS Level 1 MSSP Competency"];

const outcomes = [
  { tag: "Fintech · Disaster recovery", metric: "1 TB+", what: "database replicated for RBI requirements", title: "Fibe sets up disaster recovery in the Hyderabad region", href: "/resources/case-studies", icon: "bank" as IconName },
  { tag: "Healthcare · Migration", metric: "Near real-time", what: "MongoDB sync through cutover", title: "PocoCare moves from Azure Cosmos DB to AWS", href: "/resources/case-studies/pococare-azure-cosmos-db-to-aws", icon: "heart" as IconName },
  { tag: "Life sciences · GenAI", metric: "−50%", what: "compliance errors · months → weeks", title: "Sirovate cuts plain-language summary production from months to weeks", href: "/resources/case-studies/sirovate-genai-csr", icon: "flask" as IconName },
];

const faqs = [
  { q: "Can you keep our payment data in India while we use the cloud?", a: "Yes. Workloads can run in the Mumbai and Hyderabad regions, including disaster recovery between them. One fintech setup cleared an RBI data localization audit." },
  { q: "How do you support RBI, SEBI and IRDAI requirements?", a: "Controls are mapped to each regulator's cloud rules before anything is built, and audit evidence is collected continuously. We also publish RBI, SEBI and IRDAI guidance." },
  { q: "How do you handle CERT-In requirements?", a: "CERT-In requires 180-day log retention and incident reporting within 6 hours. We propose CloudTrail, S3 Object Lock, CloudWatch alarms and SIEM-integrated playbooks." },
  { q: "Can you help us prepare for the DPDP Act?", a: "Yes. We map where personal data lives and flows, keep it in India where needed, and put access controls and audit trails in place, so you're ready as the rules take effect." },
  { q: "Who is responsible for PCI DSS when we run in the cloud?", a: "Responsibility is shared. The cloud provider secures the underlying infrastructure; you remain responsible for your applications, data and access. We design and run your side of the controls, as in our PCI DSS-audited setups." },
  { q: "What security certifications does Comprinno hold?", a: "Comprinno is ISO 27001 certified and SOC 2 Type II attested, with AWS Security, Resilience and Level 1 MSSP competencies." },
  { q: "How do you keep AI decisions explainable for credit, fraud or claims?", a: "AI is grounded in approved sources, uses human review for sensitive workflows and keeps audit logs." },
];

export default function IndustriesPage() {
  return (
    <ServiceStory
      d={{
        hero: {
          eyebrow: "Industries",
          title: <><span className="lg:whitespace-nowrap">Cloud and AI for <strong className="sweep font-bold">regulated</strong> and</span><Br /> <strong className="font-bold">fast-growing</strong> industries.</>,
          lines: [
            "We help fintech, healthcare, life sciences and retail companies run in the cloud with the controls",
            "their regulators expect, and add AI where it makes a measurable difference.",
          ],
          cta: "Talk to an industry expert",
        },
        problem: { title: <>Every industry has its own cloud challenges. <strong>We know them.</strong></>, desc: "Four come up again and again. Each one is fixable.", items: problems },
        path: { eyebrow: "By industry", title: <><strong>Built for your industry.</strong> Ready for your auditors.</>, desc: "Each industry gets the controls its regulator expects, proven with real customers.", items: industries },
        scope: { eyebrow: "Capabilities", title: <>What we can <strong>help you with.</strong></>, desc: "Pick one area to start, or bring us the whole platform.", items: scope },
        numbers,
        steps: { eyebrow: "How we work with regulated teams", title: <>Five steps, <strong>compliance first</strong>.</>, desc: "Every design starts from your obligations: where data must live, what must be logged, and how fast incidents must be reported.", items: steps, icons: ["search", "layers", "migrate", "shield", "chart"], caption: "→ audit evidence is collected all along, not just before the audit" },
        included: {
          eyebrow: "What you get",
          title: <>What <strong>regulated teams</strong><Br /> get with Comprinno.</>,
          desc: "Delivered for Fibe (fintech), Pibit Technologies (insurance) and Portea (healthcare). We also publish RBI, SEBI and IRDAI guidance.",
          items: included,
        },
        credentials: { title: <>Credentials your auditors will <strong>recognize</strong>.</>, desc: "Independently validated, plus our own certifications.", items: credentials },
        outcomes: { title: <><strong>Industry results</strong>, audit-ready.</>, desc: "Real outcomes from regulated and fast-growing teams.", more: "All industry stories", items: outcomes, art: 4 },
        faq: { title: <>Questions from<Br /> <strong>regulated teams</strong>?</>, desc: "Quick answers on data residency, regulators and audits.", items: faqs },
        cta: {
          title: <>Building in a <strong>regulated industry</strong>?</>,
          desc: "Talk to someone who knows your regulator. You'll leave with a plan mapped to your obligations.",
          steps: ["Call with an industry expert", "Compliance + architecture review", "A plan mapped to your regulators"],
          label: "Talk to an industry expert",
          next: <>Explore by stage: <Link href="/services/migrate">Migrate</Link> · <Link href="/services/modernize">Modernize</Link> · <Link href="/services/manage">Manage</Link> · <Link href="/services/maximize">Maximize</Link></>,
        },
      }}
    />
  );
}
