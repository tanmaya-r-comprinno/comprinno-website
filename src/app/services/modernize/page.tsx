import type { Metadata } from "next";
import Link from "next/link";
import { Br } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Modernize: make your apps AI-ready, without a risky rewrite",
  description:
    "Monoliths broken down step by step, workloads moved to containers and serverless, databases freed from legacy licenses and releases automated. So AI has something solid to run on.",
  alternates: { canonical: "/services/modernize" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Monoliths slow every release", desc: "One codebase, one deploy. A small change means a full regression cycle, so new features wait weeks.", icon: "layers" },
  { title: "Legacy costs that never shrink", desc: "Commercial database licenses and always-on servers keep the bill high, even after the move to the cloud.", icon: "coin" },
  { title: "Manual releases, fragile environments", desc: "Hand-run deployments and environments that drift apart make every release a risk.", icon: "alert" },
  { title: "Data that AI can't reach", desc: "Data locked inside application databases and silos can't feed analytics, models or agents.", icon: "database" },
];

const disciplines = [
  { k: "01 · Solves: slow releases", mark: "Apps", title: "Application Modernization", desc: "Monoliths split into services one piece at a time, using the strangler pattern, so nothing has to be rewritten in a single leap.", tags: ["Microservices", "Incremental, no big bang"] },
  { k: "02 · Solves: legacy costs", mark: "Run", title: "Containers & Serverless", desc: "Workloads moved from always-on servers to Amazon EKS, Amazon ECS and AWS Lambda, so you pay for what runs, and scale when demand does.", tags: ["Pay for use", "Auto-scaling"] },
  { k: "03 · Solves: manual releases", mark: "Ship", title: "DevOps & Platform Engineering", desc: "CI/CD pipelines, infrastructure as code and a shared platform your developers self-serve from, so releases become routine.", tags: ["CI/CD", "Infrastructure as code"] },
  { k: "04 · Ready for Maximize", mark: "Data", title: "Database & Data Modernization", desc: "Commercial databases moved to open-source engines such as Amazon Aurora, and silos joined into a data platform that analytics and AI can use.", tags: ["Off legacy licenses", "AI-ready data"] },
];

const scope: { title: string; icon: IconName }[] = [
  { title: "Monoliths to microservices", icon: "puzzle" },
  { title: "VMs to containers", icon: "cube" },
  { title: ".NET Framework to modern .NET", icon: "code" },
  { title: "Legacy Java applications", icon: "layers" },
  { title: "Oracle & SQL Server to open source", icon: "database" },
  { title: "Batch jobs to serverless", icon: "clock" },
  { title: "Manual deploys to CI/CD", icon: "rocket" },
  { title: "Data silos to a data platform", icon: "chart" },
];

const numbers = [
  { value: "1,000", suffix: "+", label: "Projects delivered" },
  { value: "[X]", suffix: "+", label: "Applications modernized" },
  { value: "[X]", suffix: "+", label: "CI/CD pipelines automated" },
  { value: "98", suffix: "%", label: "Client satisfaction (CSAT)" },
];

const steps = [
  { title: "Assess", desc: "Review the application portfolio, score each app on value and effort, and check funding." },
  { title: "Design", desc: "Define the target architecture and the order services will be carved out." },
  { title: "Modernize", desc: "Rebuild in small increments, each one tested and shipped to production." },
  { title: "Automate", desc: "Put every service behind CI/CD and infrastructure as code." },
  { title: "Optimize", desc: "Tune cost, performance and resilience, then hand over to managed operations." },
];

const included = [
  "A portfolio review that scores every app on value and effort",
  "Funding eligibility checked during the assessment",
  "A target architecture and a step-by-step roadmap",
  "Incremental releases, so the business never stops",
  "CI/CD pipelines and infrastructure as code for every service",
  "Automated tests before anything reaches production",
  "Monitoring and logging built into every new service",
  "Cost review before and after, so savings are measured",
  "Security and compliance controls built in, not bolted on",
  "Handover and training for your engineering team",
];

const credentials = ["[Modernization / DevOps credential]", "AWS Premier Tier Partner", "AWS MSP & Level 1 MSSP", "ISO 27001 & SOC 2 Type II"];

const outcomes = [
  { tag: "Monolith to microservices", metric: "[X%]", what: "faster release cycles", title: "[Customer] breaks its monolith into services on Amazon EKS", href: "/resources/case-studies", icon: "puzzle" as IconName },
  { tag: "Database", metric: "[X%]", what: "lower database licensing cost", title: "[Customer] moves from a commercial database to Amazon Aurora", href: "/resources/case-studies", icon: "database" as IconName },
  { tag: "Serverless · DevOps", metric: "[X×]", what: "more deployments per week", title: "[Customer] moves to serverless and automated releases", href: "/resources/case-studies", icon: "rocket" as IconName },
];

const faqs = [
  { q: "Do we have to rewrite everything?", a: "No. We modernize in increments using the strangler pattern: one service is carved out, tested and shipped at a time, while the rest of the application keeps running." },
  { q: "How long does a modernization take?", a: "It depends on the size of the portfolio. Because the work runs in increments, the first modernized service reaches production early and value builds from there. The assessment gives you a timeline before you commit." },
  { q: "Can we get funding for modernization?", a: "Some projects qualify, especially when modernization is part of a migration, including Microsoft workloads. We check eligibility during the assessment. Funding is subject to provider approval." },
  { q: "Should we use containers or serverless?", a: "It depends on the workload. Amazon ECS is simpler for teams new to containers, Amazon EKS suits teams that want Kubernetes, and AWS Lambda suits event-driven and batch work. We recommend one based on your team, workloads and cost." },
  { q: "Can you move us off Oracle or SQL Server?", a: "Yes. We move commercial databases to open-source engines such as Amazon Aurora, with schema conversion, data validation and a planned cutover." },
  { q: "Will our team be able to run the new platform?", a: "Yes. Every engagement includes handover and training, and the platform is built with CI/CD and infrastructure as code your engineers can self-serve from. If you'd rather not run it, we can." },
  { q: "How do you keep security and compliance intact?", a: "Security and compliance controls are built into every pipeline and service, not bolted on, and mapped to regulators such as RBI, SEBI and IRDAI." },
  { q: "What happens after modernization?", a: "We can run what we modernized, up to 24×7, as part of Manage: monitoring, patching, security operations and cost reviews." },
];

export default function ModernizePage() {
  return (
    <ServiceStory
      d={{
        hero: {
          eyebrow: "Modernize",
          title: <><span className="lg:whitespace-nowrap">Make your apps <strong className="sweep font-bold">AI-ready</strong>, without</span><Br /> a <strong className="font-bold">risky rewrite</strong>.</>,
          lines: [
            "Monoliths broken down step by step, workloads moved to containers and serverless,",
            "databases freed from legacy licenses and releases automated. So AI has something solid to run on.",
          ],
          cta: "Get a free modernization assessment",
        },
        problem: { title: <>Being in the cloud isn&apos;t the same as <strong>being cloud-native.</strong></>, desc: "Four things keep applications stuck in the past. Each one is fixable.", items: problems },
        path: { title: <><strong>One team.</strong> Four modernization disciplines.</>, desc: "We modernize in increments, one service at a time, so the business keeps running while the platform underneath gets better.", items: disciplines },
        scope: { eyebrow: "What we modernize", title: <>Start from <strong>what you run today.</strong></>, desc: "Whatever you run today, there's a step-by-step path forward.", items: scope },
        numbers,
        steps: { eyebrow: "How modernization runs", title: <>Five steps, <strong>one service at a time</strong>.</>, desc: "Each increment ships to production before the next one starts.", items: steps, icons: ["search", "layers", "code", "loop", "chart"], caption: "→ then on to Manage: we run what we modernized, 24×7" },
        included: { title: <>What <strong>every modernization</strong><Br /> includes.</>, items: included },
        credentials: { title: <>Modernization credentials you can <strong>trust</strong>.</>, items: credentials },
        outcomes: { title: <><strong>Platforms rebuilt</strong>, not just re-hosted.</>, desc: "Real results from teams that modernized with us.", more: "All modernization stories", items: outcomes, art: 0 },
        faq: { title: <>Questions before you<Br /> <strong>modernize</strong>?</>, desc: "Quick answers to what teams ask us before a modernization.", items: faqs },
        cta: {
          title: <>Stuck on a <strong>monolith</strong><Br /> or <strong>legacy licenses</strong>?</>,
          desc: "Start with a free assessment. You'll know the path, the cost and the funding before you commit.",
          steps: ["Free application portfolio assessment", "Target architecture, cost + funding check", "A step-by-step roadmap you can act on"],
          label: "Get a free modernization assessment",
          next: <>Not in the cloud yet? <Link href="/services/migrate">Migrate</Link> · Already modern? Next stage → <Link href="/services/manage">Manage</Link></>,
        },
      }}
    />
  );
}
