import type { Metadata } from "next";
import Link from "next/link";
import { Br, contactHref } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Migrate: move to the cloud in planned waves",
  description:
    "We migrate data centers, VMware estates, databases and AI workloads through a structured migration factory, with a tested rollback plan for every cutover and a funding eligibility check before you commit.",
  alternates: { canonical: "/services/migrate" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "No clear starting point", desc: "Without a full inventory of applications and dependencies, you can't decide what moves first or what it will cost.", icon: "database" },
  { title: "Deadline pressure", desc: "Data center lease renewals, VMware licensing changes and hardware refreshes force decisions before you're ready.", icon: "clock" },
  { title: "Cutover risk", desc: "One failed cutover can mean lost data and downtime, so migrations stall in planning.", icon: "cloud" },
  { title: "Costs of running both environments", desc: "Every additional month of running old and new environments side by side adds cost and erodes the business case.", icon: "coin" },
];

const disciplines = [
  { k: "01 · Solves: cutover risk", mark: "Waves", title: "Migration Factory", desc: "Servers, VMs and applications moved in planned waves, with standard runbooks, automation and AWS Application Migration Service.", tags: ["Wave-based cutovers", "Runbook-driven"] },
  { k: "02 · Solves: no starting point", mark: "Ground", title: "Landing Zone Accelerator", desc: "A secure, multi-account foundation with identity, networking, logging, guardrails and cost controls in place before the first workload moves. Built on 100+ landing zone projects.", tags: ["Multi-account setup", "Guardrails from day one"] },
  { k: "03 · Solves: data-loss fear", mark: "Data", title: "Data & Storage Migration", desc: "Databases, object storage and file systems moved with change data capture and checksum validation, so data stays intact. AWS DMS Delivery designation.", tags: ["Data validated", "Planned cutover windows"] },
  { k: "04 · Ready for Maximize", mark: "AI", title: "AI/ML Stack Migration", desc: "ML pipelines, models and GPU workloads replatformed onto cloud-native stacks such as Amazon SageMaker AI and Amazon EKS. Backed by 40+ AI/ML projects.", tags: ["MLOps-ready", "GPU workloads"] },
];

const moves: { title: string; icon: IconName }[] = [
  { title: "VMware to the cloud", icon: "layers" },
  { title: "Data center exit", icon: "building" },
  { title: "Windows & SQL Server", icon: "code" },
  { title: "SQL & NoSQL databases", icon: "database" },
  { title: "Cross-cloud migration", icon: "cloud" },
  { title: "Object storage & file systems", icon: "cube" },
  { title: "Application migration", icon: "migrate" },
  { title: "AI/ML pipelines & models", icon: "spark" },
];

const numbers = [
  { value: "1,000", suffix: "+", label: "Projects delivered" },
  { value: "200", suffix: "+", label: "Businesses migrated" },
  { value: "300", suffix: "+", label: "Workloads moved" },
  { value: "98", suffix: "%", label: "Client satisfaction (CSAT)" },
];

const steps = [
  { title: "Plan", desc: "Assess workloads, map dependencies and risks, build the roadmap and business case, and check funding." },
  { title: "Prepare", desc: "Stand up a secure, multi-account landing zone with guardrails and cost controls." },
  { title: "Migrate", desc: "Move workloads in automated, phased waves, each with a tested rollback plan." },
  { title: "Validate", desc: "Check performance, data integrity and security after every wave." },
  { title: "Optimize", desc: "Tune performance, cost and resilience after cutover, with up to 24/7 managed operations." },
];

const included = [
  "A business case and TCO model before you commit",
  "Funding eligibility checked during the assessment",
  "A dependency map and phased migration roadmap",
  "Tested runbooks and a rollback plan for every cutover",
  "Data integrity checks for every database and storage move",
  "A secure, multi-account landing zone from day one",
  "Resource tagging so eligible workloads earn migration credits",
  "Right-sizing and Savings Plans review after cutover",
  "Controls mapped to applicable regulatory and compliance requirements",
  "One team from assessment to managed operations",
];

const credentials = ["AWS Migration and Modernization Consulting", "AWS Database Migration Service Delivery", "AWS Resilience Services Competency", "AWS Well-Architected Partner Program"];

// Real stories; each figure is quoted from that story's results
const outcomes = [
  { slug: "blockchain-aws-migration-consolidating-azure-and-gcp-workloads-into-a-governed-ai-ready-aws-environment-for-roxonn" },
  { slug: "ai-powered-data-governance-and-control-services-aws-migration-standardizing-produktivs-cloud-environment-to-securely-scale-a-governed-rag-ai-agent-platform" },
  { slug: "liquidmind-aws-migration-aws-migration-for-liquidmind-a-multi-product-cloud-infrastructure-on-aws" },
];

const faqs = [
  { q: "How long does a migration take?", a: "Simple migrations take about 2 to 4 weeks. Complex estates take 6 to 12 weeks or more. The free assessment usually takes 5 to 7 business days." },
  { q: "Will our applications have downtime?", a: "Databases replicate continuously, so the final switch is brief. VMware workloads can use a 10-minute cutover SLA through Datamotive EasyMigrate. Every cutover has a pre-validated rollback plan." },
  { q: "Can we get funding for our migration?", a: "Often, yes. Migration funding may be available across three phases, and a free licensing assessment reviews your IT assets and licenses. We assess eligibility for relevant funding programs. Availability depends on the program, project, geography and provider approval." },
  { q: "What is a migration factory?", a: "A repeatable, wave-based approach with standard runbooks and automation. It suits estates with dozens or hundreds of servers." },
  { q: "How do you decide whether to rehost, replatform or refactor?", a: "Each application is assessed and given a path: rehost, replatform, refactor, repurchase or retire. Many estates rehost first and modernize later." },
  { q: "Can you migrate us from Azure or Google Cloud?", a: "Yes. We've moved 300+ production workloads from Azure, Google Cloud and on-premises environments, including Liquidmind (Azure) and Skill-Lync (DigitalOcean)." },
  { q: "How do you handle security and compliance during migration?", a: "Guardrails, logging and encryption are configured before migration, and controls are mapped to the regulatory and compliance requirements applicable to your industry and operating markets." },
  { q: "What happens after cutover?", a: "Workloads can move straight into managed operations (up to 24/7): monitoring, patching, security operations and cost reviews." },
];

export default function MigratePage() {
  return (
    <ServiceStory
      d={{
        contact: contactHref("Migrate to the cloud", "/services/migrate"),
        stories: "/resources/case-studies?service=Migration#stories",
        hero: {
          eyebrow: "Migrate",
          title: <><span className="lg:whitespace-nowrap">Move to the cloud in <strong className="sweep font-bold">planned waves</strong>,</span><Br /> not <strong className="font-bold">one risky leap</strong>.</>,
          lines: ["We migrate data centers, VMware estates, databases and AI workloads through a structured migration factory,", "with a tested rollback plan for every cutover and a funding eligibility check before you commit."],
          cta: "Get a free migration assessment",
        },
        problem: { title: <>Migration isn&apos;t one problem. <strong>It&apos;s four.</strong></>, desc: "Any one of them can stall a move. Each one is fixable.", items: problems },
        path: { title: <><strong>One factory.</strong> Four migration disciplines.</>, desc: "One team addresses these migration challenges using standard runbooks and automation to improve consistency and predictability across migration waves.", items: disciplines },
        scope: { eyebrow: "What we migrate", title: <>Whatever you&apos;re moving, <strong>we&apos;ve moved it before.</strong></>, desc: "From a single server to a whole data center, across every major platform.", items: moves, style: "icons" },
        numbers,
        steps: { eyebrow: "How a migration runs", title: <>Five steps, <strong>one team</strong>, <strong>no surprises</strong>.</>, desc: "The team that plans your migration waves also migrates and operates your workloads.", items: steps, icons: ["search", "layers", "migrate", "shield", "chart"], caption: "→ then on to Modernize: your workloads arrive ready for the next stage" },
        included: { title: <>What <strong>every migration</strong><Br /> includes.</>, items: included },
        credentials: { title: <>Migration credentials you can <strong>trust</strong>.</>, items: credentials },
        outcomes: { title: <><strong>Migrations delivered</strong>, not just planned.</>, desc: "Real cutovers from teams that moved with us.", more: "All migration stories", picks: outcomes },
        faq: { title: <>Questions before you<Br /> <strong>move</strong>?</>, desc: "Quick answers to what teams ask us before a migration.", items: faqs },
        cta: {
          title: <>Planning a <strong>data center</strong><Br /> or <strong>VMware exit</strong>?</>,
          desc: "Start with a free assessment. You’ll understand the proposed timeline, estimated cost and funding eligibility before you commit.",
          steps: ["Free assessment, 5–7 business days", "Timeline, cost estimate + funding check", "A wave plan you can act on"],
          label: "Get a free migration assessment",
          next: <>Already moved? Next stage → <Link href="/services/modernize">Modernize</Link> · <Link href="/services/manage">Manage</Link></>,
        },
      }}
    />
  );
}
