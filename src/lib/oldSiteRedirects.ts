/**
 * Old WordPress comprinno.net URLs → new pages (from "Comprinno old URL redirects.csv").
 * Next.js strips the trailing slash first (/about-us/ → /about-us), then these apply.
 * Specific entries come before the catch-all patterns at the bottom.
 */
type R = { source: string; destination: string; permanent: true };
const r = (source: string, destination: string): R => ({ source, destination, permanent: true });

const pages: [string, string][] = [
  ["/about-us", "/company/about"],
  ["/agentic-ai-solutions", "/services/maximize"],
  ["/ai-migration-stacks-architecture", "/services/migrate"],
  ["/applied-ai-solutions", "/services/maximize"],
  ["/aws-cloud-architecture-review", "/services/modernize"], // CSV: check, Well-Architected review has no own page
  ["/aws-cloud-managed-services", "/services/manage"],
  ["/aws-cloud-migration-solutions", "/services/migrate"],
  ["/aws-cost-management-services", "/services/manage"],
  ["/aws-landing-zone-accelerator", "/services/migrate"], // CSV: check
  ["/aws-marketplace-accelerator-isv-boost", "/partnerships/aws"],
  ["/aws-modernization-pathways", "/services/modernize"],
  ["/aws-premier-partner-marketing", "/partnerships/aws"],
  ["/aws-premier-tier-partner", "/partnerships/aws"],
  ["/aws-startup-security-baseline", "/services/manage"], // CSV: check
  ["/aws-tech-accelerators-eks-ecs-fargate", "/services/modernize"],
  ["/billing-discount", "/services/manage"], // CSV: check
  ["/blogs-and-articles", "/resources/blog"],
  ["/cloud-migration-services", "/services/migrate"],
  ["/cloud-native-serverless-architectures-ci-cd-iac", "/services/modernize"],
  ["/compliance-compliance-as-a-service", "/services/manage"],
  ["/contact-us", "/contact"],
  ["/crowdstrike", "/services/manage"], // CSV: check, no CrowdStrike page
  ["/da-ml-services", "/services/maximize"],
  ["/datamotive-cloud-migration-disaster-recovery", "/services/migrate"],
  ["/devops-as-a-service", "/services/modernize"],
  ["/draas-disaster-recovery-as-a-service", "/services/manage"],
  ["/elementor-28200", "/"], // leftover WordPress page
  ["/form-submitted", "/contact"], // old thank-you page
  ["/free-genai-consulting-services", "/resources/free-genai-consulting"],
  ["/gen-ai-solutions", "/services/maximize"],
  ["/healthcare", "/industries"],
  ["/isv-boost", "/partnerships/aws"],
  ["/isvs", "/industries"],
  ["/legacy-migration-objects-storage", "/services/migrate"],
  ["/managed-cloud-service-provider", "/services/manage"],
  ["/managed-security-mssp", "/services/manage"],
  ["/migration-factory-service", "/services/migrate"], // used by a live Google Ads sitelink
  ["/mongodb-consulting-services", "/services/modernize"], // CSV: check
  ["/news", "/resources/newsroom"],
  ["/partnerships", "/partnerships/aws"],
  ["/saas-startups", "/industries"],
  ["/stacked-cards-design", "/"], // leftover WordPress page
  ["/startups-saas-isv", "/industries"],
  ["/tech-led-enterprises", "/industries"],
  ["/tevico-autopilot-for-cloud-operations", "/platform"],
  ["/veriq-comprinno", "/products/veriq"],
  ["/vidmentor", "/"], // CSV: check, product not on the new site
  ["/viewpulse", "/"], // CSV: check, product not on the new site
  ["/vmware-to-aws-migration", "/services/migrate"],
  ["/voxsphere-comprinno", "/products/voxsphere"],
];

// news stories whose slug changed on the new site
const news: [string, string][] = [
  ["comprinno-acquires-aws-gen-ai-competency-partner-status", "comprinno-achieves-aws-gen-ai-competency-partner-status"],
  ["comprinno-attains-aws-level-1-managed-security-service-provider-competency-2", "comprinno-achieves-aws-level-1-managed-security-service-provider-competency"],
  ["comprinno-earns-aws-cloud-operations-software-competency-for-tevico-platform", "comprinno-achieves-aws-cloud-operations-software-competency-for-tevico-platform"],
  ["comprinno-earns-aws-lambda-and-amazon-elastic-container-service-ecs-service-delivery-program-badge", "comprinno-achieves-aws-lambda-and-amazon-elastic-container-service-ecs-service-delivery-program-badge"],
  ["comprinno-earns-aws-managed-services-msp-partner-status", "comprinno-achieves-aws-managed-services-msp-partner-status"],
  ["comprinno-gains-aws-database-migration-service-aws-config-service-delivery-badges", "comprinno-achieves-aws-database-migration-service-aws-config-service-delivery-badges"],
  ["comprinno-technologies-achieves-amazon-rds-service-delivery-badge-2", "comprinno-technologies-achieves-amazon-rds-service-delivery-badge"],
  ["comprinno-technologies-attains-aws-web-application-firewall-waf-service-delivery-badge", "comprinno-technologies-achieves-aws-web-application-firewall-waf-service-delivery-badge"],
  ["comprinno-technologies-gains-amazon-cloudfront-service-delivery-badge", "comprinno-technologies-achieves-amazon-cloudfront-service-delivery-badge"],
];

// case studies: renamed, or with no matching page (→ the listing)
const cases: [string, string][] = [
  ["mantle-labs", "/resources/case-studies/mantle-labs-building-a-gen-ai-infrastructure-for-carbon-credit-calculation"],
  // these now have pages (published from the Google Docs), so they go to the story, not the listing
  ["social-media-community-platform-aws-migration-a-governed-highly-available-aws-foundation-for-an-ai-conversational-platform", "/resources/case-studies/governed-highly-available-aws-foundation-for-an-ai-conversational-platform"],
  ["travel-app-aws-migration-engineering-a-resilient-multi-account-foundation-for-a-mobility-platform-on-aws", "/resources/case-studies/resilient-multi-account-foundation-for-a-mobility-platform-on-aws"],
  ["agri-tech-aws-migration-building-a-kubernetes-native-cloud-foundation-for-an-agri-tech-platform-on-aws", "/resources/case-studies"],
  ["healthtech-aws-migration-engineering-a-secure-and-scalable-data-platform-on-aws-for-a-genomics-diagnostics-company", "/resources/case-studies"],
  ["industrial-technology-provider-aws-migration-aws-migration-for-an-industrial-intelligence-provider-building-a-secure-and-resilient-production-environment", "/resources/case-studies"],
  ["iot-aws-migration-zero-downtime-aws-migration-for-a-leading-industrial-intelligence-technology-provider", "/resources/case-studies"],
  ["it-operations-genai-enabling-agentic-ai-powered-root-cause-analysis-and-intelligent-it-operations-with-amazon-bedrock-agentcore-for-an-it-operations-management-platform", "/resources/case-studies/agentic-ai-root-cause-analysis-with-amazon-bedrock-agentcore-for-an-it-operations-platform"],
  ["media-tech-cloud-migration-engineering-a-secure-multi-az-foundation-for-contentlenss-ai-driven-platform-on-aws", "/resources/case-studies"],
];

export const oldSiteRedirects: R[] = [
  ...pages.map(([s, d]) => r(s, d)),
  ...news.flatMap(([s, d]) => [r(`/news/${s}`, `/resources/newsroom/${d}`), r(`/newsroom/${s}`, `/resources/newsroom/${d}`)]),
  ...cases.map(([s, d]) => r(`/case-study/${s}`, d)),
  r("/blog/schema-agnostic-migration-from-bigquery-to-redshift-serverless", "/resources/blog"), // article is in draft
  // everything else keeps its slug under the new section
  r("/news/:slug", "/resources/newsroom/:slug"),
  r("/newsroom/:slug", "/resources/newsroom/:slug"),
  r("/blog/:slug", "/resources/blog/:slug"),
];
