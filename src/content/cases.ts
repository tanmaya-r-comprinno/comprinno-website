export type Case = {
  slug: string;
  client: string;
  track: "AI & GenAI" | "Migrate" | "Modernize" | "Manage";
  title: string;
  result: string;
};

// Summaries come from comprinno.net. Full write-ups to be added per page.
export const cases: Case[] = [
  { slug: "sirovate-genai-csr", client: "Sirovate", track: "AI & GenAI", title: "GenAI speeds up clinical research summary reports", result: "Plain-language summaries in weeks instead of months, with 50% fewer compliance errors." },
  { slug: "it-ops-rca-agentcore", client: "IT operations platform", track: "AI & GenAI", title: "Root-cause analysis automated with Amazon Bedrock AgentCore", result: "Agents investigate incidents and surface probable causes with evidence." },
  { slug: "wearable-brand-genai-marketing", client: "Leading wearable brand", track: "AI & GenAI", title: "Marketing campaigns driven by generative AI", result: "A leading wearable brand partners with Comprinno to run campaigns with GenAI." },
  { slug: "pococare-azure-cosmos-db-to-aws", client: "PocoCare", track: "Migrate", title: "Azure Cosmos DB to AWS with near real-time MongoDB sync", result: "Database moved across clouds while staying synchronized." },
  { slug: "medibuddy-data-center-to-aws", client: "MediBuddy", track: "Migrate", title: "Data center to AWS", result: "More than 95% of services now serverless or managed." },
  { slug: "industrial-intelligence-gcp-to-aws", client: "Industrial intelligence provider", track: "Migrate", title: "Google Cloud to AWS", result: "Validated, zero-downtime cutover." },
  { slug: "global-index-platform-ecs", client: "Global index platform", track: "Modernize", title: "From a single EC2 instance to Amazon ECS", result: "Zero-downtime releases." },
  { slug: "quantian-codepipeline", client: "Quantian Technologies", track: "Modernize", title: "Automated deployments with AWS CodePipeline", result: "Servers moved into private subnets and deployments automated." },
  { slug: "latlong-ecs-aurora", client: "Latlong.ai (Onze Technologies)", track: "Modernize", title: "Amazon ECS and Aurora Serverless v2", result: "Workloads moved with zero data loss." },
  { slug: "fintech-rbi-data-localization", client: "Fintech, about 37M customers", track: "Manage", title: "RBI data localization audit cleared on AWS", result: "Audit passed with data kept in India." },
  { slug: "boat-aws-cost-reduction", client: "boAt", track: "Manage", title: "AWS cost reduction", result: "AWS costs cut by 40% in a year." },
  { slug: "lightmetrics-24x7-monitoring", client: "LightMetrics", track: "Manage", title: "24×7 monitoring for a dashcam platform", result: "Highly available monitoring and on-call alerting." },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
