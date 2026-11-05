export type Service = {
  slug: string;
  verb: string;
  title: string;
  tagline: string;
  intro: string;
  cta: string;
  offerings: { title: string; desc: string }[];
  challenges: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  includes: string[];
  scope: string[];
  caseSlugs: string[];
  plans?: { name: string; coverage: string; adds: string; reporting: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "migrate",
    verb: "Migrate",
    title: "AWS migration, built like a factory",
    tagline: "Planned waves. Tested rollbacks. No guesswork.",
    intro:
      "We move data centers, VMware estates, databases and AI workloads to AWS in planned waves. Every cutover is rehearsed against a rollback plan, and eligible projects are checked for AWS funding from day one.",
    cta: "Get a free migration assessment",
    offerings: [
      { title: "Migration Factory", desc: "Servers, VMs and applications move in waves using standard runbooks, automation and AWS Application Migration Service." },
      { title: "Landing Zone Accelerator", desc: "A secure multi-account AWS foundation on AWS Control Tower: identity, networking, logging, guardrails and cost controls. 100+ landing zone projects delivered." },
      { title: "Data & Storage Migration", desc: "Databases, object storage and file systems move with AWS DMS and DataSync, using change data capture and checksum validation." },
      { title: "AI/ML Stack Migration", desc: "ML pipelines, models and GPU workloads re-platformed onto Amazon SageMaker AI and Amazon EKS. 40+ AI/ML projects delivered." },
    ],
    challenges: [
      { title: "No clear starting point", desc: "Without a full application and dependency inventory, nobody knows what to move first or what it costs." },
      { title: "Deadline pressure", desc: "Lease renewals, VMware licensing changes and hardware refreshes force decisions early." },
      { title: "Cutover risk", desc: "A failed cutover means data loss and downtime, and that stalls the whole plan." },
      { title: "Dual-running cost", desc: "Running old and new environments side by side adds cost every month." },
    ],
    process: [
      { title: "Plan", desc: "Assess workloads, map dependencies and risks, build the roadmap and business case, including a MAP funding check." },
      { title: "Prepare", desc: "Build the multi-account landing zone with guardrails and cost controls before any workload moves." },
      { title: "Migrate", desc: "Move workloads in phased, automated waves with tested rollback plans." },
      { title: "Validate", desc: "Verify performance, data integrity and security after each wave." },
      { title: "Optimize", desc: "Tune performance, cost and resilience after cutover, with up to 24×7 managed operations from go-live." },
    ],
    includes: [
      "Business case and TCO model before commitment",
      "AWS funding eligibility checked during assessment",
      "Dependency map and phased roadmap",
      "Tested runbooks and rollback plans for every cutover",
      "Data integrity checks for database and storage moves",
      "Multi-account landing zone from day one",
      "MAP tagging so eligible workloads can earn AWS credits",
      "Right-sizing and Savings Plans review after migration",
      "Controls mapped to regulatory requirements",
      "One team from assessment through managed operations",
    ],
    scope: ["VMware to AWS", "Data center exit", "Windows & SQL Server", "SQL & NoSQL databases", "Azure & Google Cloud to AWS", "Object storage & file systems", "SAP & ERP workloads", "AI/ML pipelines & models"],
    caseSlugs: ["pococare-azure-cosmos-db-to-aws", "medibuddy-data-center-to-aws", "industrial-intelligence-gcp-to-aws"],
    faqs: [
      { q: "How long does a migration take?", a: "Simple migrations take about 2 to 4 weeks. Complex estates take 6 to 12 weeks or more. The free assessment usually takes 5 to 7 business days." },
      { q: "How much downtime should we expect?", a: "Databases replicate continuously, so the final switch is brief. VMware workloads can use a 10-minute cutover SLA through Datamotive EasyMigrate. Every cutover has a pre-validated rollback plan." },
      { q: "Can AWS fund our migration?", a: "Often, yes. AWS Migration Acceleration Program (MAP) credits may be available across its three phases, and the free Optimization and Licensing Assessment reviews your IT assets and licensing. Funding is subject to AWS approval." },
      { q: "What is a migration factory?", a: "A repeatable, wave-based approach with standard runbooks and automation. It suits estates with dozens or hundreds of servers." },
      { q: "Which migration strategy will you use?", a: "Each application is assessed and given a path: rehost, re-platform, refactor, repurchase or retire. Many estates rehost first and modernize later." },
      { q: "What can you migrate from?", a: "300+ production workloads moved from Azure, Google Cloud and on-premises environments, including Liquidmind (Azure) and Skill-Lync (DigitalOcean)." },
      { q: "How do you handle security and compliance?", a: "Guardrails, logging and encryption are set up before the move, and controls are mapped to regulators such as RBI, SEBI and IRDAI." },
      { q: "What happens after cutover?", a: "Workloads can move straight into managed operations (up to 24×7): monitoring, patching, security operations and cost reviews." },
    ],
  },
  {
    slug: "modernize",
    verb: "Modernize",
    title: "DevOps as a service and app modernization",
    tagline: "Ship faster. Break less. Roll back in seconds.",
    intro:
      "We break up monoliths, automate delivery with CI/CD and infrastructure as code, and run workloads on Amazon EKS, ECS or AWS Lambda. Our AWS DevOps Competency team builds the platform with yours, then helps run it.",
    cta: "Book a DevOps assessment",
    offerings: [
      { title: "DevOps as a Service", desc: "An extended team that designs and runs CI/CD, infrastructure as code (Terraform, AWS CDK or CloudFormation) and the release process." },
      { title: "Containers & Amazon EKS", desc: "Containers on EKS, ECS or Fargate with autoscaling, security policies and observability. The EKS package goes live in two weeks." },
      { title: "Application Modernization", desc: "Legacy apps re-platformed or refactored into microservices and Lambda functions, with databases moved to Aurora or RDS." },
      { title: "Pathways & Funding", desc: "A modernization path for each application, from rehost to refactor, plus a check on AWS funding eligibility including MAP." },
    ],
    challenges: [
      { title: "Slow, risky releases", desc: "Manual deployments and fragile pipelines make every release a gamble." },
      { title: "Monoliths that won't scale", desc: "Features can't ship independently, and scaling means scaling everything." },
      { title: "Operations toil", desc: "Teams lose time to patching servers and repairing environments." },
      { title: "No clear pathway", desc: "Budget gets spent, but little of it reaches production." },
    ],
    process: [
      { title: "Assess", desc: "Review applications, pipelines and releases. Agree a target architecture and KPIs." },
      { title: "Package", desc: "Containerize services or package them as Lambda functions for consistent environments." },
      { title: "Automate", desc: "Build CI/CD, infrastructure as code and security checks that run on every change." },
      { title: "Deploy", desc: "Release often with blue-green or canary deployments and automatic rollback on failure." },
      { title: "Scale", desc: "Grow platforms, guardrails and observability with autoscaling as teams and traffic grow." },
    ],
    includes: [
      "KPIs agreed up front and measured against a baseline",
      "CI/CD pipelines with automated tests and releases",
      "Infrastructure as code with Terraform, CDK or CloudFormation",
      "Security scans and policy checks in every pipeline",
      "Blue-green and canary releases with fast rollback",
      "Production-ready platforms on EKS or ECS",
      "Serverless with Lambda where it fits",
      "Centralized logs, metrics, traces and alerts",
      "Right-sizing and autoscaling to control cost",
      "Built-in secrets and configuration management",
    ],
    scope: ["Monolith to microservices", "Amazon EKS & ECS", "Serverless with Lambda", "CI/CD & release automation", "Infrastructure as code", "DevSecOps & policy as code", "Observability", "Modernization funding"],
    caseSlugs: ["global-index-platform-ecs", "quantian-codepipeline", "latlong-ecs-aurora"],
    faqs: [
      { q: "What is included?", a: "A team that designs, builds and runs CI/CD, infrastructure as code, container or serverless runtimes, security checks and observability. 200+ DevOps projects delivered." },
      { q: "How is this different from consulting or managed services?", a: "It is an ongoing team that keeps improving delivery. It sits between one-time consulting and managed services that keep production running." },
      { q: "How is success measured?", a: "KPIs are agreed at the start with baselines and targets, and results are reported against them." },
      { q: "Can you improve our CI/CD without replacing our tools?", a: "Yes. We build on what you have, such as GitHub and Bitbucket." },
      { q: "ECS, EKS or Fargate?", a: "ECS is simpler for container newcomers, EKS suits teams that want Kubernetes, and Fargate removes server management. We recommend one based on your team, workloads and cost." },
      { q: "Can modernization avoid disrupting production?", a: "Yes. Changes are phased, releases are blue-green or canary, and every step has a rollback path." },
      { q: "Can AWS fund it?", a: "Some projects qualify, especially under MAP when modernization is part of a migration, including MAP for Microsoft workloads. Funding is subject to AWS approval." },
    ],
  },
  {
    slug: "manage",
    verb: "Manage",
    title: "Managed AWS operations, secured and compliant",
    tagline: "One accountable team. Up to 24×7. Tevico included.",
    intro:
      "One accountable team runs your AWS environment with coverage up to 24×7: monitoring, patching, incident response, security operations, compliance evidence, disaster recovery and cost control. Every plan includes Tevico Premium.",
    cta: "Talk to our CloudOps team",
    offerings: [
      { title: "Disaster Recovery as a Service", desc: "Pilot light, warm standby or active-active recovery with automated failover, regular drills and RPO/RTO under 15 minutes where required." },
      { title: "Compliance as a Service", desc: "Continuous monitoring, policy-as-code guardrails and audit-ready evidence for SOC 2, ISO 27001, PCI DSS, HIPAA, RBI, SEBI and IRDAI." },
      { title: "Managed Security (MSSP)", desc: "24×7 SOC with threat monitoring, alert triage and incident response on AWS Security Hub, GuardDuty and SIEM integrations. AWS Level 1 MSSP Competency." },
      { title: "Managed Cloud Operations (MSP)", desc: "Infrastructure monitoring, patch and change management, backup and restore, incident response, proactive alerting and RCA reports." },
    ],
    challenges: [
      { title: "Operations overload", desc: "24×7 monitoring, patching and incident response compete with shipping product." },
      { title: "Security gaps", desc: "Threats are found late, often by outsiders." },
      { title: "Compliance burden", desc: "Manual evidence collection and scattered controls slow audits and launches." },
      { title: "Downtime risk", desc: "Untested recovery plans expose workloads to data loss and long outages." },
    ],
    process: [
      { title: "Assess", desc: "Review accounts, security posture, compliance gaps and recovery readiness. Agree service levels." },
      { title: "Design", desc: "Plan monitoring, security operations, compliance automation and recovery for your workloads." },
      { title: "Transition", desc: "Set up guardrails, alerting, playbooks and Tevico, typically within days of assessment and access." },
      { title: "Run", desc: "Monitor and respond within the coverage window, patch on schedule and fix root causes." },
      { title: "Report", desc: "Deliver service reports, compliance evidence and cost reviews, weekly to quarterly." },
    ],
    includes: [
      "Monitoring and incident response",
      "Patching",
      "AWS cost management",
      "RCA reports and post-incident reviews",
      "Tevico Premium with Security Hub and GuardDuty findings",
      "Cost reviews with right-sizing and Savings Plans",
      "A dedicated technical account manager",
      "Support via Slack, Jira, email and phone escalation",
    ],
    scope: ["Monitoring & patching", "Security Operations Center", "SIEM integration & tuning", "Compliance automation", "Backup & disaster recovery", "FinOps & cost governance", "Vulnerability management", "Identity & zero-trust access"],
    caseSlugs: ["fintech-rbi-data-localization", "boat-aws-cost-reduction", "lightmetrics-24x7-monitoring"],
    plans: [
      { name: "Essential", coverage: "8×5 business hours", adds: "Infrastructure monitoring, incident and availability management, AWS cost management", reporting: "Quarterly" },
      { name: "Pro", coverage: "12×7", adds: "Application monitoring, capacity management, backup and recovery, one Well-Architected review a year", reporting: "Monthly" },
      { name: "Elite", coverage: "24×7", adds: "Change, access and vendor management, cloud security posture management, two Well-Architected reviews a year", reporting: "Weekly" },
    ],
    faqs: [
      { q: "Is this AWS Managed Services (AMS)?", a: "No. Comprinno is an independent, AWS-validated MSP Partner that works inside your own AWS accounts." },
      { q: "What are the coverage hours?", a: "Essential is 8×5, Pro is 12×7 and Elite is 24×7." },
      { q: "How fast do you respond to incidents?", a: "Targets are set by severity and plan in the service agreement, for example within 15 minutes for critical incidents on Elite. Alerts open ITSM tickets and reach engineers by Slack, Teams and phone." },
      { q: "Can you work alongside our in-house team?", a: "Yes, through a hybrid model covering operations, security or compliance." },
      { q: "How is access handled and revoked?", a: "Access follows least privilege and is agreed after assessment. Tevico uses a cross-account IAM role in your account that you can remove at any time." },
      { q: "Can you manage an environment you didn't build?", a: "Yes. We assess it first, then fix or rebuild it, based on your preference." },
      { q: "Which compliance frameworks are covered?", a: "SOC 2, ISO 27001, PCI DSS, HIPAA, HITRUST, GDPR and RBI, SEBI and IRDAI requirements. Comprinno is ISO 27001 certified and SOC 2 Type II attested." },
      { q: "How is pricing set?", a: "Tailored to environment size, plan and scope, with no hidden costs." },
    ],
  },
  {
    slug: "maximize",
    verb: "Maximize",
    title: "Agentic and generative AI on AWS",
    tagline: "From use case to production, with guardrails built in.",
    intro:
      "We build AI agents and generative AI applications on Amazon Bedrock and Bedrock AgentCore, with guardrails, evaluation and cost controls from the start. Then we run them after launch.",
    cta: "Book an AI readiness assessment",
    offerings: [
      { title: "Data Analytics & ML Foundations", desc: "Data lakes, pipelines, governance and analytics on AWS using Glue, Redshift and QuickSight." },
      { title: "Agentic AI Solutions", desc: "Agents that handle multistep work such as root-cause investigation or ticket triage, built on Bedrock AgentCore with scoped access, guardrails and tracing." },
      { title: "Applied AI for Business", desc: "Computer vision, NLP, predictive analytics, fraud detection and recommendations, each tied to a business KPI." },
      { title: "Generative AI Applications", desc: "Assistants and copilots grounded in your data through RAG, with optional fine-tuning and pre-launch accuracy and safety testing." },
    ],
    challenges: [
      { title: "Pilots that never ship", desc: "Most AI projects stall at proof of concept with no path to production." },
      { title: "Unclear value", desc: "Use cases aren't tied to a KPI, so ROI can't be shown." },
      { title: "Trust and control", desc: "Agents need scoped permissions, guardrails and an audit trail." },
      { title: "Runaway cost", desc: "Model calls and infrastructure cost grow faster than the value they deliver." },
    ],
    process: [
      { title: "Discover", desc: "Choose high-value workflows, link each to a KPI, and check data readiness and AWS funding eligibility." },
      { title: "Design", desc: "Define architecture, guardrails, evaluation criteria and a cost model before building." },
      { title: "Prototype", desc: "Build a GenAI proof of concept on your data in 2 to 3 weeks, with measured accuracy, latency and cost." },
      { title: "Scale", desc: "Deploy with guardrails, access controls, monitoring and versioning for safe rollback." },
      { title: "Operate", desc: "Monitor accuracy, latency and cost, and refine prompts, models and agents through feedback." },
    ],
    includes: [
      "Every use case tied to a business KPI",
      "Pre-launch testing of accuracy, response time and cost",
      "Guardrails, scoped permissions and tenant isolation for agents",
      "Logging and tracing of agent and model activity",
      "Encryption, least-privilege access and private networking",
      "Choice of models from multiple providers, no lock-in",
      "Cost controls for model calls and infrastructure",
      "Post-launch monitoring and support",
    ],
    scope: ["AI agents & multi-agent workflows", "RAG & knowledge assistants", "LLM fine-tuning", "Intelligent document processing", "Predictive analytics & ML", "Computer vision & NLP", "Guardrails & evaluation", "Cost-optimized deployment"],
    caseSlugs: ["sirovate-genai-csr", "it-ops-rca-agentcore", "wearable-brand-genai-marketing"],
    faqs: [
      { q: "What's the difference between an agent and a chatbot?", a: "Agents plan and carry out tasks across your systems within set permissions. Chatbots mainly answer questions." },
      { q: "Where should we start?", a: "With one frequent, measurable workflow that has accessible data. The AI Readiness Assessment reviews data, governance and architecture, then delivers a roadmap and business case." },
      { q: "How long until production?", a: "The goal is measurable ROI within 12 weeks, with a GenAI proof of concept in 2 to 3 weeks. Timing depends on the use case and data readiness." },
      { q: "Is our data protected?", a: "AWS does not use Bedrock prompts or outputs to train its models. Processing is Region-based, including India cross-Region inference for supported models, with KMS encryption, least-privilege IAM and private VPC subnets." },
      { q: "How do you keep agents under control?", a: "Agents get only the access they need through IAM roles and temporary credentials. Guardrails filter unsafe output, and activity is traced with AgentCore Observability, CloudWatch and X-Ray." },
      { q: "What about hallucinations?", a: "We test accuracy, response time and cost per request before launch, ground answers with RAG and source citations, and track production accuracy on dashboards." },
      { q: "Are we locked into one model?", a: "No. Models come from several providers, chosen per use case." },
      { q: "Who owns the system after launch?", a: "Comprinno can operate it, or hand it to your team with documentation and knowledge transfer." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
