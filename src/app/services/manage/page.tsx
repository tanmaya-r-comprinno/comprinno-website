import type { Metadata } from "next";
import Link from "next/link";
import { Br } from "@/components/ui";
import type { IconName } from "@/components/Icon";
import ServiceStory from "@/components/ServiceStory";

export const metadata: Metadata = {
  title: "Manage: your AWS environment, run, secured and audit-ready",
  description:
    "One accountable team runs your AWS environment, with coverage up to 24×7: monitoring, patching, incident response, security operations, compliance evidence, disaster recovery and cost control. Every plan includes Tevico Premium.",
  alternates: { canonical: "/services/manage" },
};

const problems: { title: string; desc: string; icon: IconName }[] = [
  { title: "Operations overload", desc: "Teams struggle with 24×7 monitoring, patching and incident response while trying to ship product faster.", icon: "users" },
  { title: "Security gaps", desc: "Without continuous monitoring and response, threats are found late, often by someone else.", icon: "shield" },
  { title: "Compliance burden", desc: "Manual evidence collection and scattered controls slow audits and delay launches.", icon: "check" },
  { title: "Downtime risk", desc: "Untested recovery plans leave critical workloads exposed to data loss and long outages.", icon: "clock" },
];

const disciplines = [
  { k: "01 · Solves: operations overload", mark: "Ops", title: "Managed Cloud Operations (MSP)", desc: "Infrastructure monitoring, patch and change management, backup and restore, and incident response for your AWS accounts, with proactive alerting and RCA reports. Delivered by an AWS MSP Partner.", tags: ["Proactive monitoring", "Root cause reports"] },
  { k: "02 · Solves: security gaps", mark: "SOC", title: "Managed Security (MSSP)", desc: "Threat monitoring, alert triage and incident response from a 24×7 Security Operations Center, with AWS Security Hub, Amazon GuardDuty and SIEM integration. AWS Level 1 MSSP Competency.", tags: ["24×7 SOC", "Level 1 MSSP"] },
  { k: "03 · Solves: compliance burden", mark: "Audit", title: "Compliance as a Service", desc: "Continuous compliance monitoring, policy-as-code guardrails and audit-ready evidence packs for SOC 2, ISO 27001, PCI DSS and HIPAA, and for RBI, SEBI and IRDAI guidelines.", tags: ["Audit-ready evidence", "Continuous checks"] },
  { k: "04 · Solves: downtime risk", mark: "DR", title: "Disaster Recovery as a Service (DRaaS)", desc: "Pilot light, warm standby or active-active recovery on AWS, with automated failover, regular DR drills and RPO and RTO targets under 15 minutes where required. AWS Resilience Competency.", tags: ["Tested failover", "Agreed RTO and RPO"] },
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
  { value: "260", suffix: "+", label: "AWS accounts on Tevico" },
  { value: "52", suffix: "+", label: "Compliance projects" },
  { value: "100", suffix: "+", label: "Managed services clients" },
];

const steps = [
  { title: "Assess", desc: "Review your AWS accounts, tooling, security posture and gaps against the plan you need." },
  { title: "Design", desc: "Agree runbooks, escalation paths, coverage hours and reporting cadence." },
  { title: "Transition", desc: "Onboard your accounts into Tevico, monitoring and alerting, with your team alongside." },
  { title: "Run", desc: "Monitor, patch, respond to incidents and manage cost, within the hours your plan covers." },
  { title: "Report", desc: "Share service reports, compliance evidence and cost reviews on a set cadence, from weekly to quarterly." },
];

const included = [
  "Monitoring and incident response, 8×5 to 24×7 by plan",
  "Infrastructure operations, patching and AWS cost management",
  "RCA reports and post-incident reviews",
  "Tevico Premium, with Security Hub and GuardDuty findings",
  "Cost reviews with right-sizing and Savings Plans",
  "A dedicated technical account manager (TAM)",
  "Support via Slack, Jira, email and phone escalation",
  { text: "Backup, recovery and DR drills", plan: "Pro, Elite" },
  { text: "Change and access management", plan: "Elite" },
  { text: "Security and compliance posture management", plan: "Elite" },
];

const plans = [
  { k: "8×5 · Business hours", name: "Essential", desc: "Business-hours coverage for infrastructure monitoring, incident and availability management, and AWS cost management, with quarterly reports." },
  { k: "12×7 · Extended hours", name: "Pro", desc: "Extended hours, seven days, adding application monitoring, capacity management and backup and recovery. Monthly reports and one Well-Architected review a year." },
  { k: "24×7 · Round the clock", name: "Elite", desc: "Round-the-clock coverage adding change, access and vendor management and cloud security posture management. Weekly reports and two Well-Architected reviews a year.", featured: true },
];

const credentials = ["AWS Managed Service Provider (MSP)", "AWS Level 1 MSSP Competency", "AWS Resilience Competency", "ISO 27001 & SOC 2 Type II"];

const outcomes = [
  { tag: "Fintech · Compliance", metric: "Audit cleared", what: "RBI data localization, ~37 million customers", title: "A fintech with about 37 million customers clears its RBI data localization audit on AWS", href: "/case-studies/fintech-rbi-data-localization", icon: "bank" as IconName },
  { tag: "Consumer · Cost", metric: "−40%", what: "AWS costs in one year", title: "boAt cuts AWS costs by 40% in a year with Comprinno managed services", href: "/case-studies/boat-aws-cost-reduction", icon: "coin" as IconName },
  { tag: "IoT · Monitoring", metric: "24×7", what: "highly available monitoring and on-call alerting", title: "LightMetrics gets highly available monitoring and on-call alerting for its 24×7 dashcam platform", href: "/case-studies/lightmetrics-24x7-monitoring", icon: "eye" as IconName },
];

const faqs = [
  { q: "What do Comprinno's managed services include?", a: "Monitoring, patching, incident response, security operations, compliance evidence, disaster recovery and cost control, run by one accountable team. Every plan includes Tevico Premium." },
  { q: "Is this the same as AWS Managed Services (AMS)?", a: "No. Comprinno is an independent, validated AWS MSP Partner that works inside your own AWS accounts. AWS Managed Services (AMS) is a separate offering from AWS." },
  { q: "What are your coverage hours?", a: "Essential is 8×5, Pro is 12×7 and Elite is 24×7." },
  { q: "How quickly do you respond to incidents?", a: "Targets are set by severity and plan in the service agreement, for example within 15 minutes for critical incidents on Elite. Alerts open ITSM tickets and reach engineers by Slack, Teams and phone." },
  { q: "Can you work alongside our in-house team?", a: "Yes, through a hybrid model covering operations, security or compliance." },
  { q: "What access do you need, and can we revoke it?", a: "Access follows least privilege and is agreed after assessment. Tevico uses a cross-account IAM role in your account that you can remove at any time." },
  { q: "Which tools do you use?", a: "Tevico for automated checks and AI SRE agents, AWS Security Hub and Amazon GuardDuty for security findings, your monitoring and SIEM stack, and ITSM tools such as Jira. Alerts reach engineers by Slack, Teams and phone." },
  { q: "Can you manage an environment you didn't build?", a: "Yes. We assess it first, then fix or rebuild it, based on your preference." },
  { q: "How does onboarding work?", a: "In five steps: assess, design, transition, run and report. We review your accounts, agree runbooks and escalation paths, then onboard your accounts into Tevico, monitoring and alerting with your team alongside." },
  { q: "Which compliance frameworks do you support?", a: "SOC 2, ISO 27001, PCI DSS, HIPAA, HITRUST, GDPR and RBI, SEBI and IRDAI requirements. Comprinno is ISO 27001 certified and SOC 2 Type II attested." },
  { q: "What is Tevico's role in managed services?", a: "Tevico runs automated checks across cost, security and operations, and its AI SRE agents handle routine work, with engineers signing off on high-impact actions. Every plan includes Tevico Premium." },
  { q: "Do you manage multi-account AWS environments?", a: "Yes. We run multi-account AWS environments, including AWS Organizations and Control Tower landing zones. 260+ AWS accounts are on Tevico today." },
  { q: "How is pricing set?", a: "Tailored to environment size, plan and scope, with no hidden costs." },
];

export default function ManagePage() {
  return (
    <ServiceStory
      d={{
        hero: {
          eyebrow: "Manage · Stage 03 of 04",
          title: <><span className="lg:whitespace-nowrap">Your AWS environment, <strong className="sweep font-bold">run</strong>,</span><Br /> <strong className="font-bold">secured</strong> and <strong className="font-bold">audit-ready</strong>.</>,
          lines: [
            "One accountable team runs your AWS environment, up to 24×7: monitoring, patching, incident response,",
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
          desc: "Three plans, one team. Pick the coverage hours you need; items marked with a plan name start at that plan.",
          items: included,
          plans,
        },
        credentials: { title: <>Managed services credentials you can <strong>trust</strong>.</>, items: credentials },
        outcomes: { title: <><strong>Environments run</strong>, not just watched.</>, desc: "Results from teams that hand their operations to us.", more: "All managed services stories", items: outcomes, art: 2 },
        faq: { title: <>Questions before you<Br /> <strong>hand over</strong>?</>, desc: "Quick answers to what teams ask us before managed services.", items: faqs },
        cta: {
          title: <>Want your AWS environment <strong>run, secured</strong><Br /> and <strong>audit-ready</strong>?</>,
          desc: "Start with a review of your accounts. You'll know the right plan and coverage before you commit.",
          steps: ["Call with our CloudOps team", "Account review + plan recommendation", "Onboarding and hand-over"],
          label: "Talk to our CloudOps team",
          next: <>Still modernizing? <Link href="/services/modernize">Modernize</Link> · Ready for AI? Next stage → <Link href="/services/maximize">Maximize</Link></>,
        },
      }}
    />
  );
}
