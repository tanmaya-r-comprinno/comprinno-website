import type { Metadata } from "next";
import Link from "next/link";
import { Br } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Migrate: move to the cloud in planned waves",
  description:
    "Data centers, VMware estates, databases and AI workloads, moved by a migration factory. A tested rollback plan behind every cutover, and funding checked before you spend.",
  alternates: { canonical: "/services/migrate" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "No clear starting point", desc: "Without a full inventory of applications and dependencies, you can't decide what moves first or what it will cost.", icon: "database" },
  { title: "Deadline pressure", desc: "Data center lease renewals, VMware licensing changes and hardware refreshes force decisions before you're ready.", icon: "clock" },
  { title: "Cutover risk", desc: "One failed cutover can mean lost data and downtime, so migrations stall in planning.", icon: "cloud" },
  { title: "Dual-running costs", desc: "Every month old and new environments run side by side adds cost and erodes the business case.", icon: "coin" },
];

const disciplines = [
  { k: "01 · Solves: cutover risk", mark: "Waves", title: "Migration Factory", desc: "Servers, VMs and applications moved in planned waves, with standard runbooks, automation and AWS Application Migration Service.", tags: ["Wave-based cutovers", "Runbook-driven"] },
  { k: "02 · Solves: no starting point", mark: "Ground", title: "Landing Zone Accelerator", desc: "A secure, multi-account foundation with identity, networking, logging, guardrails and cost controls in place before the first workload moves. Built on 100+ landing zone projects.", tags: ["Multi-account setup", "Guardrails from day one"] },
  { k: "03 · Solves: data-loss fear", mark: "Data", title: "Data & Storage Migration", desc: "Databases, object storage and file systems moved with change data capture and checksum validation, so data stays intact. AWS DMS Delivery designation.", tags: ["Data validated", "Planned cutover windows"] },
  { k: "04 · Ready for Maximize", mark: "AI", title: "AI/ML Stack Migration", desc: "ML pipelines, models and GPU workloads re-platformed onto cloud-native stacks such as Amazon SageMaker AI and Amazon EKS. Backed by 40+ AI/ML projects.", tags: ["MLOps ready", "GPU workloads"] },
];

const moves: { title: string; icon: IconName }[] = [
  { title: "VMware to the cloud", icon: "layers" },
  { title: "Data center exit", icon: "building" },
  { title: "Windows & SQL Server", icon: "code" },
  { title: "SQL & NoSQL databases", icon: "database" },
  { title: "Azure & Google Cloud to AWS", icon: "cloud" },
  { title: "Object storage & file systems", icon: "cube" },
  { title: "SAP & ERP workloads", icon: "chart" },
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
  { title: "Optimize", desc: "Tune performance, cost and resilience after cutover, with up to 24×7 managed operations." },
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
  "Controls mapped to your regulator's requirements",
  "One team from assessment to managed operations",
];

const credentials = ["AWS Migration Competency", "AWS DMS Delivery designation", "AWS Premier Tier Partner", "ISO 27001 & SOC 2 Type II"];

const outcomes = [
  { tag: "Cloud to cloud · Data", metric: "Near real-time", what: "MongoDB sync through cutover", title: "PocoCare moves from Azure Cosmos DB to AWS", href: "/case-studies/pococare-azure-cosmos-db-to-aws", icon: "database" as IconName },
  { tag: "Cloud to cloud", metric: "Zero downtime", what: "validated cutover", title: "An industrial intelligence provider moves from Google Cloud to AWS", href: "/case-studies/industrial-intelligence-gcp-to-aws", icon: "migrate" as IconName },
  { tag: "Data center exit", metric: "95%+", what: "of services now serverless or managed", title: "MediBuddy moves from its data center to AWS", href: "/case-studies/medibuddy-data-center-to-aws", icon: "building" as IconName },
];

const faqs = [
  { q: "How long does a migration take?", a: "Simple migrations take about 2 to 4 weeks. Complex estates take 6 to 12 weeks or more. The free assessment usually takes 5 to 7 business days." },
  { q: "Will our applications have downtime?", a: "Databases replicate continuously, so the final switch is brief. VMware workloads can use a 10-minute cutover SLA through Datamotive EasyMigrate. Every cutover has a pre-validated rollback plan." },
  { q: "Can we get funding for our migration?", a: "Often, yes. Migration funding may be available across three phases, and a free licensing assessment reviews your IT assets and licenses. Funding is subject to provider approval." },
  { q: "What is a migration factory?", a: "A repeatable, wave-based approach with standard runbooks and automation. It suits estates with dozens or hundreds of servers." },
  { q: "How do you decide whether to rehost, re-platform or refactor?", a: "Each application is assessed and given a path: rehost, re-platform, refactor, repurchase or retire. Many estates rehost first and modernize later." },
  { q: "Can you migrate us from Azure or Google Cloud?", a: "Yes. We've moved 300+ production workloads from Azure, Google Cloud and on-premises environments, including Liquidmind (Azure) and Skill-Lync (DigitalOcean)." },
  { q: "How do you handle security and compliance during migration?", a: "Guardrails, logging and encryption are set up before the move, and controls are mapped to regulators such as RBI, SEBI and IRDAI." },
  { q: "What happens after cutover?", a: "Workloads can move straight into managed operations (up to 24×7): monitoring, patching, security operations and cost reviews." },
];

export default function MigratePage() {
  return (
    <ServiceStory
      d={{
        hero: {
          eyebrow: "Migrate · Stage 01 of 04",
          title: <><span className="lg:whitespace-nowrap">Move to the cloud in <strong className="sweep font-bold">planned waves</strong>,</span><Br /> not <strong className="font-bold">one risky leap</strong>.</>,
          lines: ["Data centers, VMware estates, databases and AI workloads, moved by a migration factory.", "A tested rollback plan behind every cutover, and funding checked before you spend."],
          cta: "Get a free migration assessment",
        },
        problem: { title: <>Migration isn&apos;t one problem. <strong>It&apos;s four.</strong></>, desc: "Any one of them can stall a move. Each one is fixable.", items: problems },
        path: { title: <><strong>One factory.</strong> Four migration disciplines.</>, desc: "One team answers all four problems, with standard runbooks and automation, so every wave is faster and more predictable than the last.", items: disciplines },
        scope: { eyebrow: "What we migrate", title: <>Whatever you&apos;re moving, <strong>we&apos;ve moved it before.</strong></>, desc: "From a single server to a whole data center, across every major platform.", items: moves },
        numbers,
        steps: { eyebrow: "How a migration runs", title: <>Five steps, <strong>one team</strong>, <strong>no surprises</strong>.</>, desc: "The team that plans your waves also moves them and runs what lands.", items: steps, icons: ["search", "layers", "migrate", "shield", "chart"], caption: "→ then on to Modernize: your workloads arrive ready for the next stage" },
        included: { title: <>What <strong>every migration</strong><Br /> includes.</>, items: included },
        credentials: { title: <>Migration credentials you can <strong>trust</strong>.</>, items: credentials },
        outcomes: { title: <><strong>Migrations delivered</strong>, not just planned.</>, desc: "Real cutovers from teams that moved with us.", more: "All migration stories", items: outcomes, art: 3 },
        faq: { title: <>Questions before you<Br /> <strong>move</strong>?</>, desc: "Quick answers to what teams ask us before a migration.", items: faqs },
        cta: {
          title: <>Planning a <strong>data center</strong><Br /> or <strong>VMware exit</strong>?</>,
          desc: "Start with a free assessment. You'll know the timeline, the cost and the funding before you commit.",
          steps: ["Free assessment, 5–7 business days", "Timeline, cost estimate + funding check", "A wave plan you can act on"],
          label: "Get a free migration assessment",
          next: <>Already moved? Next stage → <Link href="/services/modernize">Modernize</Link> · <Link href="/services/manage">Manage</Link></>,
        },
      }}
    />
  );
}
