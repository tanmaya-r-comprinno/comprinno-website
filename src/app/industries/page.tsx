import type { Metadata } from "next";
import Link from "next/link";
import { Br } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Industries: enterprise AI and cloud expertise",
  description:
    "We help fintech, healthcare, life sciences and retail companies put AI to work, modernize their cloud environments and manage operations—with security and governance aligned to their business needs.",
  alternates: { canonical: "/industries" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Compliance complexity", desc: "Industry regulations and security standards create requirements for data protection, access, logging and incident response.", icon: "shield" },
  { title: "Legacy systems", desc: "Legacy platforms can limit real-time processing, product development and AI adoption.", icon: "layers" },
  { title: "Data silos", desc: "Data spread across systems slows research, underwriting and reporting.", icon: "database" },
  { title: "Peak load", desc: "Sales events, payroll cycles and market events can create traffic spikes that strain legacy infrastructure.", icon: "chart" },
];

const industries = [
  { k: "01 · Fintech & Financial Services", mark: "BFSI", title: "Payments, lending and insurance", desc: "Build and scale payments, lending and insurance platforms with secure cloud operations, governed data access and AI applications aligned to your business needs.", proof: "Our PCI DSS-audited setup supports a POS leader serving nearly 153,000 merchants.", tags: ["RBI, SEBI and IRDAI", "PCI DSS v4.0.1"] },
  { k: "02 · Healthcare", mark: "Health", title: "Patient platforms and health data", desc: "Support patient platforms and healthcare workflows with secure cloud infrastructure, controlled data access and AI applications designed around applicable privacy requirements.", proof: "Portea moved 40+ workloads and a 4 TB+ database to the AWS Mumbai Region.", tags: ["HIPAA-ready architecture", "India data residency"] },
  { k: "03 · Life sciences", mark: "Labs", title: "Research and clinical documentation", desc: "Apply generative AI and scalable data platforms to research, bioinformatics and clinical documentation workflows.", proof: "Sirovate cut compliance-related errors in clinical summaries by 50%, and Quandle Labs speeds up bioinformatics analysis.", tags: ["GenAI for research", "Scalable data platforms"] },
  { k: "04 · Retail & consumer", mark: "Retail", title: "Scale for sales events. Keep costs under control.", desc: "Handle traffic spikes, personalize customer experiences and manage cloud costs while applying AI to relevant business workflows.", proof: "For boAt, we cut daily DynamoDB costs by 65% within two weeks, and automatic scaling handled its sales-event surge.", tags: ["Peak-ready scaling", "Cost governance"] },
];

const scope: { title: string; icon: IconName }[] = [
  { title: "Cloud infrastructure & migration", icon: "cloud" },
  { title: "AI & predictive analytics", icon: "spark" },
  { title: "Compliance automation", icon: "check" },
  { title: "EHR, LIMS, ERP & POS integration", icon: "puzzle" },
  { title: "Real-time analytics & personalization", icon: "chart" },
  { title: "Disaster recovery & high availability", icon: "database" },
  { title: "Security posture & identity governance", icon: "lock" },
  { title: "Application modernization with microservices", icon: "layers" },
];

const numbers = [
  { value: "1,000", suffix: "+", label: "Cloud and AI projects" },
  { value: "750", suffix: "+", label: "Clients" },
  { value: "200", suffix: "+", label: "Compliance projects" },
  { value: "98", suffix: "%", label: "Client satisfaction (CSAT)" },
];

const steps = [
  { title: "Assess & align", desc: "Map applicable requirements, data flows and current controls, and agree on the scope of our support." },
  { title: "Architect for compliance", desc: "Define where data is stored and processed, what is logged and how incidents are reported before implementation begins." },
  { title: "Build & migrate", desc: "Build or move workloads into a cloud environment with security and governance controls in place from day one." },
  { title: "Secure & prove", desc: "Run security operations and collect audit evidence continuously to support audit preparation and identify gaps earlier." },
  { title: "Scale & optimize", desc: "Handle peak traffic, control cost and add AI where it makes a measurable difference." },
];

const included = [
  "Controls mapped to applicable regulatory and compliance requirements",
  "Data residency and deployment locations aligned with applicable requirements",
  "Designed for SOC 2, PCI DSS v4.0.1 and HIPAA",
  "Audit evidence collected continuously, rather than only before an audit",
  "Tamper-resistant logs via CloudTrail and S3 Object Lock",
  "Incident response playbooks with SIEM integration",
  "Human-reviewed, auditable AI for regulated decisions",
  "Automatic scaling for peak traffic",
  "ISO 27001 certified, SOC 2 Type II attested partner",
];

const credentials = ["AWS Premier Tier Partner", "AWS Security Competency", "AWS Resilience Competency", "AWS Level 1 MSSP Competency"];

// Real stories; each figure is quoted from that story's results
const outcomes = [
  { slug: "fibe-collaborates-with-comprinno-to-build-a-resilient-architecture" },
  { slug: "pococare-cloud-migration-migrating-from-azure-cosmos-db-to-aws-with-near-real-time-mongodb-synchronization", metric: "Near-real-time", what: "MongoDB sync from Azure Cosmos DB to AWS" },
  { slug: "sirovate-genai-accelerating-speed-accuracy-of-clinical-research-summary-reports-csrs-with-gen-ai", metric: "50%", what: "fewer compliance-related errors in clinical research summaries" },
];

const indiaFaqs = [
  { q: "Can you keep our payment data in India while we use the cloud?", a: "Yes. Workloads can run in the Mumbai and Hyderabad regions, including disaster recovery between them. One fintech setup cleared an RBI data localization audit." },
  { q: "How do you support RBI, SEBI and IRDAI requirements?", a: "Controls are mapped to each regulator's cloud rules before anything is built, and audit evidence is collected continuously. We also publish RBI, SEBI and IRDAI guidance." },
  { q: "How do you handle CERT-In requirements?", a: "CERT-In requires 180-day log retention and incident reporting within 6 hours. We propose CloudTrail, S3 Object Lock, CloudWatch alarms and SIEM-integrated playbooks." },
  { q: "Can you help us prepare for the DPDP Act?", a: "Yes. We map where personal data lives and flows, keep it in India where needed, and put access controls and audit trails in place, so you're ready as the rules take effect." },
  ];

const generalFaqs = [
  { q: "Who is responsible for PCI DSS when we run in the cloud?", a: "Responsibility is shared. The cloud provider secures the underlying infrastructure; you remain responsible for your applications, data and access. We design and run your side of the controls, as in our PCI DSS-audited setups." },
  { q: "What security credentials does Comprinno hold?", a: "Comprinno is ISO 27001 certified and SOC 2 Type II attested, with AWS Security, Resilience and Level 1 MSSP competencies." },
  { q: "How do you support oversight and traceability in AI workflows?", a: "We use approved data sources, human review for sensitive workflows and audit logs to support oversight and traceability." },
  { q: "How do you approach data residency requirements?", a: "We review your data flows, deployment locations and applicable requirements during discovery, then define the architecture and scope of support for your engagement." },
  { q: "Can the engagement be tailored to our industry and operating markets?", a: "We start by reviewing your use case, existing environment and relevant requirements. The proposed scope identifies the capabilities, responsibilities and next steps for your engagement." },
];

export default function IndustriesPage() {
  return (
    <ServiceStory
      d={{
        hero: {
          eyebrow: "Industries",
          title: <><span className="lg:whitespace-nowrap"><strong className="sweep font-bold">Enterprise AI</strong> and cloud expertise</span><Br /> for <strong className="font-bold">your industry</strong>.</>,
          lines: [
            "We help fintech, healthcare, life sciences and retail companies put AI to work, modernize their cloud environments",
            "and manage operations—with security and governance aligned to their business needs.",
          ],
          cta: "Talk to an industry expert",
        },
        problem: { title: <>Industry-specific challenges. <strong>Practical cloud and AI solutions.</strong></>, desc: "Four challenges frequently affect the organizations we work with. Each one is fixable.", items: problems },
        path: { eyebrow: "By industry", title: <><strong>Built around your industry’s needs.</strong></>, desc: "We align cloud and AI solutions with your industry’s operational, security and compliance requirements.", items: industries },
        scope: { eyebrow: "Capabilities", title: <>What we can <strong>help you with.</strong></>, desc: "Pick one area to start, or bring us the whole platform.", items: scope },
        numbers,
        steps: { eyebrow: "How we work with regulated teams", title: <>Five steps, <strong>compliance first</strong>.</>, desc: "Every design starts from your obligations: where data must live, what must be logged, and how fast incidents must be reported.", items: steps, icons: ["search", "layers", "migrate", "shield", "chart"], caption: "→ audit evidence is collected all along, not just before the audit" },
        included: {
          eyebrow: "What you get",
          title: <>Support aligned with your<Br /> <strong>industry requirements</strong>.</>,
          desc: "",
          items: included,
          regional: {
            label: "India-specific experience",
            items: ["Support for applicable RBI, SEBI and IRDAI requirements", "Disaster recovery across AWS Regions in India, where appropriate"],
            note: "Delivered for Fibe (fintech), Pibit Technologies (insurance) and Portea (healthcare). We also publish RBI, SEBI and IRDAI guidance.",
          },
        },
        credentials: { title: <>Credentials your auditors will <strong>recognize</strong>.</>, desc: "Relevant AWS partner credentials.", items: credentials },
        outcomes: { title: <><strong>Customer outcomes</strong> across industries.</>, desc: "Real outcomes from regulated and fast-growing teams.", more: "All industry stories", picks: outcomes },
        faq: { title: <>Questions about your<Br /> <strong>industry requirements</strong>?</>, desc: "Quick answers on data residency, security, compliance and AI oversight.", items: [...generalFaqs, ...indiaFaqs], groups: [{ label: "General", items: generalFaqs }, { label: "India-specific requirements", items: indiaFaqs }] },
        cta: {
          title: <>Building in a <strong>regulated industry</strong>?</>,
          desc: "Discuss your industry’s cloud and AI priorities. We’ll help identify the technical approach, relevant requirements and next steps.",
          steps: ["Call with an industry expert", "Compliance + architecture review", "Recommended next steps aligned with your requirements"],
          label: "Talk to an industry expert",
          next: <>Explore by stage: <Link href="/services/migrate">Migrate</Link> · <Link href="/services/modernize">Modernize</Link> · <Link href="/services/manage">Manage</Link> · <Link href="/services/maximize">Maximize</Link></>,
        },
      }}
    />
  );
}
