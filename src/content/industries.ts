export const industries = [
  {
    slug: "retail",
    name: "Retail & Consumer",
    focus: "Handle sale-day traffic, personalize experiences and keep cloud cost under control.",
    proof: "boAt: daily DynamoDB cost cut by 65% within two weeks, with autoscaling absorbing a sale-event surge.",
    caps: ["Peak-ready scaling", "Cost governance"],
  },
  {
    slug: "life-sciences",
    name: "Life Sciences",
    focus: "Speed up research and clinical documentation with generative AI on AWS.",
    proof: "Sirovate: compliance errors in clinical summaries down 50%, plain-language summaries in weeks, not months.",
    caps: ["GenAI for research", "Scalable data platforms"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    focus: "Run patient platforms and health data on AWS with encryption, access controls and audit trails designed for HIPAA.",
    proof: "Portea: 40+ workloads and a 4 TB+ database moved to the AWS Mumbai Region ahead of India's proposed data protection law.",
    caps: ["HIPAA-ready architecture", "India data residency"],
  },
  {
    slug: "fintech-bfsi",
    name: "Fintech & BFSI",
    focus: "Launch and scale payments, lending and insurance products with controls mapped to RBI, SEBI, IRDAI, SOC 2 and PCI DSS.",
    proof: "A PCI DSS-audited setup serving nearly 153,000 merchants, and RBI-aligned disaster recovery in AWS Hyderabad for Fibe.",
    caps: ["RBI, SEBI, IRDAI alignment", "PCI DSS v4.0.1 support"],
  },
  {
    slug: "saas-isv",
    name: "SaaS Startups & ISVs",
    focus: "A secure, funded and scalable AWS foundation that grows with the product.",
    proof: "Landing zones, DevOps platforms and managed operations for fast-growing product teams.",
    caps: ["Landing zone", "DevOps platform"],
  },
  {
    slug: "tech-enterprises",
    name: "Tech-led Enterprises",
    focus: "Migrate large estates, modernize applications and operate them with governed automation.",
    proof: "One team from assessment through managed operations.",
    caps: ["Migration factory", "Managed operations"],
  },
];

export const industryFaqs = [
  { q: "Can payment data stay in India?", a: "Yes. Workloads can run in the Mumbai and Hyderabad Regions, including disaster recovery between them. One fintech setup cleared an RBI data localization audit." },
  { q: "What about CERT-In requirements?", a: "CERT-In requires 180-day log retention and incident reporting within 6 hours. We propose CloudTrail, S3 Object Lock, CloudWatch alarms and SIEM-integrated playbooks." },
  { q: "Is AI safe for credit, fraud or claims?", a: "AI is grounded in approved sources, uses human review for sensitive workflows and keeps audit logs." },
];
