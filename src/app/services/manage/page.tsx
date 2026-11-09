import type { Metadata } from "next";
import Link from "next/link";
import { Br } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Manage: your cloud environment, run, secured and audit-ready",
  description:
    "One accountable team runs your cloud environment 24×7: monitoring, patching, incident response, security operations, compliance evidence, disaster recovery and cost control. Every plan includes Tevico Premium.",
  alternates: { canonical: "/services/manage" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Operations overload", desc: "Teams struggle with 24×7 monitoring, patching and incident response while trying to ship product faster.", icon: "users" },
  { title: "Security gaps", desc: "Without continuous monitoring and response, threats are found late, often by someone else.", icon: "shield" },
  { title: "Compliance burden", desc: "Manual evidence collection and scattered controls slow audits and delay launches.", icon: "check" },
  { title: "Downtime risk", desc: "Untested recovery plans leave critical workloads exposed to data loss and long outages.", icon: "clock" },
];

const disciplines = [
  { k: "01 · Solves: operations overload", mark: "Ops", title: "Managed Cloud Operations (MSP)", desc: "Infrastructure monitoring, patch and change management, backup and restore, and incident response for your cloud accounts, with proactive alerting and RCA reports. Delivered by a validated MSP Partner.", tags: ["Proactive monitoring", "Root cause reports"] },
  { k: "02 · Solves: security gaps", mark: "SOC", title: "Managed Security (MSSP)", desc: "Threat monitoring, alert triage and incident response from a 24×7 Security Operations Center, with AWS Security Hub, Amazon GuardDuty and SIEM integration. Level 1 MSSP Competency.", tags: ["24×7 SOC", "Level 1 MSSP"] },
  { k: "03 · Solves: compliance burden", mark: "Audit", title: "Compliance as a Service", desc: "Continuous compliance monitoring, policy-as-code guardrails and audit-ready evidence packs for SOC 2, ISO 27001, PCI DSS and HIPAA, and for RBI, SEBI and IRDAI guidelines.", tags: ["Audit-ready evidence", "Continuous checks"] },
  { k: "04 · Solves: downtime risk", mark: "DR", title: "Disaster Recovery as a Service (DRaaS)", desc: "Pilot light, warm standby or active-active recovery in the cloud, with automated failover, regular DR drills and RPO and RTO targets under 15 minutes where required.", tags: ["Tested failover", "Agreed RTO and RPO"] },
];

const scope: { title: string; icon: IconName }[] = [
  { title: "Monitoring & patch management", icon: "eye" },
  { title: "Security Operations Center (SOC)", icon: "shield" },
  { title: "SIEM integration & tuning", icon: "chart" },
  { title: "Compliance automation", icon: "check" },
  { title: "Backup & disaster recovery", icon: "database" },
  { title: "FinOps & cost governance", icon: "coin" },
  { title: "Vulnerability management", icon: "alert" },
  { title: "Identity & zero-trust access", icon: "lock" },
];

const numbers = [
  { value: "24×7", suffix: "", label: "Elite-plan coverage" },
  { value: "260", suffix: "+", label: "Cloud accounts on Tevico" },
  { value: "52", suffix: "+", label: "Compliance projects" },
  { value: "100", suffix: "+", label: "Managed services clients" },
];

const steps = [
  { title: "Assess", desc: "Review your cloud accounts, tooling, security posture and gaps against the plan you need." },
  { title: "Design", desc: "Agree runbooks, escalation paths, coverage hours and reporting cadence." },
  { title: "Transition", desc: "Onboard your accounts into Tevico, monitoring and alerting, with your team alongside." },
  { title: "Run", desc: "Monitor, patch, respond to incidents and manage cost, within the hours your plan covers." },
  { title: "Report", desc: "Share service reports, compliance evidence and cost reviews on a set cadence, from weekly to quarterly." },
];

const included = [
  "Tevico Premium: Cost, Security, Inventory and Reliability dashboards",
  "Managed support from 8×5 to 24×7, by plan",
  "Proactive monitoring, alerts, OS patching and updates",
  "Provisioning through change management",
  "SLA-driven incident and availability management",
  "Cloud cost management: budgets, tagging, cost reports and forecasts",
  "Service desk, email and phone support",
  { text: "Application monitoring, incidents and RCA", plan: "Pro, Elite" },
  { text: "Backup, recovery and DR drills", plan: "Pro, Elite" },
  { text: "Vendor, access and security posture management", plan: "Elite" },
];

const plans = [
  { k: "8×5 · Business hours", name: "Essential", desc: "For businesses that run in regular business hours. Infrastructure monitoring, incident and availability management, and cloud cost management, with quarterly reports." },
  { k: "12×7 · Extended hours", name: "Pro", desc: "For businesses that run seven days with extended hours. Adds application monitoring, capacity management and backup and recovery, with monthly reports and one Well-Architected review a year." },
  { k: "24×7 · Round the clock", name: "Elite", desc: "For businesses that run 24×7 with high customer expectations. Adds vendor, access and security posture management, with weekly reports and two Well-Architected reviews a year.", featured: true },
];

const credentials = ["AWS Managed Service Provider (MSP)", "AWS Level 1 MSSP Competency", "AWS Resilience Competency", "ISO 27001 & SOC 2 Type II"];

const outcomes = [
  { tag: "Fintech · Compliance", metric: "Audit cleared", what: "RBI data localization, ~37 million customers", title: "A fintech with about 37 million customers clears its RBI data localization audit in the cloud", href: "/resources/case-studies/fintech-rbi-data-localization", icon: "bank" as IconName },
  { tag: "Consumer · Cost", metric: "−40%", what: "cloud costs in one year", title: "boAt cuts cloud costs by 40% in a year with Comprinno managed services", href: "/resources/case-studies/boat-aws-cost-reduction", icon: "coin" as IconName },
  { tag: "IoT · Monitoring", metric: "24×7", what: "highly available monitoring and on-call alerting", title: "LightMetrics gets highly available monitoring and on-call alerting for its 24×7 dashcam platform", href: "/resources/case-studies/lightmetrics-24x7-monitoring", icon: "eye" as IconName },
];

const faqs = [
  { q: "What do Comprinno's managed services include?", a: "Monitoring, patching, incident response, security operations, compliance evidence, disaster recovery and cost control, run by one accountable team. Every plan includes Tevico Premium." },
  { q: "Is this the same as AWS Managed Services (AMS)?", a: "No. Comprinno is an independent, validated AWS MSP Partner that works inside your own cloud accounts. AWS Managed Services (AMS) is a separate offering from AWS." },
  { q: "What are your coverage hours?", a: "Essential is 8×5, Pro is 12×7 and Elite is 24×7." },
  { q: "How quickly do you respond to incidents?", a: "Targets are set by severity and plan in the service agreement, for example within 15 minutes for critical incidents on Elite. Alerts open ITSM tickets and reach engineers by Slack, Teams and phone." },
  { q: "Can you work alongside our in-house team?", a: "Yes, through a hybrid model covering operations, security or compliance." },
  { q: "What access do you need, and can we revoke it?", a: "Access follows least privilege and is agreed after assessment. Tevico uses a cross-account IAM role in your account that you can remove at any time." },
  { q: "Which tools do you use?", a: "Tevico for automated checks and AI SRE agents, AWS Security Hub and Amazon GuardDuty for security findings, your monitoring and SIEM stack, and ITSM tools such as Jira. Alerts reach engineers by Slack, Teams and phone." },
  { q: "Can you manage an environment you didn't build?", a: "Yes. We assess it first, then fix or rebuild it, based on your preference." },
  { q: "How does onboarding work?", a: "In five steps: assess, design, transition, run and report. We review your accounts, agree runbooks and escalation paths, then onboard your accounts into Tevico, monitoring and alerting with your team alongside." },
  { q: "Which compliance frameworks do you support?", a: "SOC 2, ISO 27001, PCI DSS, HIPAA, HITRUST, GDPR and RBI, SEBI and IRDAI requirements. Comprinno is ISO 27001 certified and SOC 2 Type II attested." },
  { q: "What is Tevico's role in managed services?", a: "Tevico runs automated checks across cost, security and operations, and its AI SRE agents handle routine work, with engineers signing off on high-impact actions. Every plan includes Tevico Premium." },
  { q: "Do you manage multi-account cloud environments?", a: "Yes. We run multi-account cloud environments, including AWS Organizations and Control Tower landing zones. 260+ cloud accounts are on Tevico today." },
  { q: "How is pricing set?", a: "Tailored to environment size, plan and scope, with no hidden costs." },
];

export default function ManagePage() {
  return (
    <ServiceStory
      d={{
        hero: {
          eyebrow: "Manage",
          title: <><span className="lg:whitespace-nowrap">Your cloud environment, <strong className="sweep font-bold">run</strong>,</span><Br /> <strong className="font-bold">secured</strong> and <strong className="font-bold">audit-ready</strong>.</>,
          lines: [
            "One accountable team runs your cloud environment 24×7: monitoring, patching, incident response,",
            "security operations, compliance evidence, disaster recovery and cost control. Every plan includes Tevico Premium.",
          ],
          cta: "Talk to our CloudOps team",
        },
        problem: { title: <>Running cloud isn&apos;t one problem. <strong>It&apos;s four.</strong></>, desc: "Any one of them pulls your team away from building product. Each one is fixable.", items: problems },
        path: { title: <><strong>One team.</strong> Four ways we keep you running.</>, desc: "Operations, security, compliance and recovery from one accountable team, so nothing falls between vendors.", items: disciplines },
        scope: { eyebrow: "Capabilities", title: <>Pick what you need, <strong>or hand us all of it.</strong></>, desc: "Take one capability or all eight, delivered by the same team.", items: scope },
        numbers,
        steps: { eyebrow: "How we take over operations", title: <>Five steps from <strong>hand-over</strong> to <strong>hands-off</strong>.</>, desc: "Whether we built your environment or not.", items: steps, icons: ["search", "layers", "migrate", "eye", "chart"], caption: "→ then on to Maximize: a stable, secure base for AI and analytics" },
        included: {
          eyebrow: "What you get",
          title: <>What our <strong>plans</strong><Br /> cover.</>,
          desc: "Three plans, one team, and Tevico Premium in every plan. Items marked with a plan name start at that plan.",
          items: included,
          plans,
        },
        credentials: { title: <>Managed services credentials you can <strong>trust</strong>.</>, items: credentials },
        outcomes: { title: <><strong>Environments run</strong>, not just watched.</>, desc: "Results from teams that hand their operations to us.", more: "All managed services stories", items: outcomes, art: 2 },
        faq: { title: <>Questions before you<Br /> <strong>hand over</strong>?</>, desc: "Quick answers to what teams ask us before managed services.", items: faqs },
        cta: {
          title: <>Want your cloud environment <strong>run, secured</strong><Br /> and <strong>audit-ready</strong>?</>,
          desc: "Start with a review of your accounts. You'll know the right plan and coverage before you commit.",
          steps: ["Call with our CloudOps team", "Account review + plan recommendation", "Onboarding and hand-over"],
          label: "Talk to our CloudOps team",
          next: <>Still modernizing? <Link href="/services/modernize">Modernize</Link> · Ready for AI? Next stage → <Link href="/services/maximize">Maximize</Link></>,
        },
      }}
    />
  );
}
