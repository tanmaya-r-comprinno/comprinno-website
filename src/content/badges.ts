/**
 * Credential badges (public/badges). AWS badges are redrawn as vector from the official
 * artwork (black border, colour AWS logo) and exported at 800 x 800 webp.
 */
export type Badge = { src: string; alt: string; w: number; h: number };

const aws = (file: string, name: string): Badge => ({ src: `/badges/${file}.webp`, alt: `AWS Partner, ${name} badge`, w: 800, h: 800 });

export const badges = {
  premier: aws("aws-premier-tier-services", "Premier Tier Services"),
  msp: aws("aws-managed-service-provider", "Managed Service Provider"),
  mssp: aws("aws-mssp-competency", "MSSP Services Competency"),
  security: aws("aws-security-competency", "Security Services Competency"),
  resilience: aws("aws-resilience-competency", "Resilience Services Competency"),
  devops: aws("aws-devops-competency", "DevOps Services Competency"),
  migration: aws("aws-migration-modernization-competency", "Migration and Modernization Services Competency"),
  dms: aws("aws-dms-delivery", "AWS Database Migration Service Delivery"),
  ai: aws("aws-ai-services-competency", "AI Services Competency"),
  wellArchitected: aws("aws-well-architected-partner", "Well-Architected Partner Program"),
  cloudOps: aws("aws-cloud-operations-competency", "Cloud Operations Services Competency"),
  genAI: aws("aws-generative-ai-competency", "Generative AI Services Competency"),
  data: aws("aws-data-analytics-competency", "Data & Analytics Services Competency"),
  iso: { src: "/badges/iso-27001.webp", alt: "ISO 27001 Information Security Management certified", w: 252, h: 250 },
  soc: { src: "/badges/soc-2.webp", alt: "AICPA SOC 2", w: 248, h: 250 },
} satisfies Record<string, Badge>;

/** Badges that match a credential label, e.g. "AWS Security Competency" or "ISO 27001 & SOC 2 Type II". */
export function badgesFor(label: string): Badge[] {
  const l = label.toLowerCase();
  const out: Badge[] = [];
  if (l.includes("premier")) out.push(badges.premier);
  if ((/\bmsp\b/.test(l) || l.includes("managed service provider")) && !l.includes("mssp")) out.push(badges.msp);
  if (l.includes("mssp")) out.push(badges.mssp);
  if (l.includes("security") && !l.includes("mssp")) out.push(badges.security);
  if (l.includes("resilience")) out.push(badges.resilience);
  if (l.includes("devops")) out.push(badges.devops);
  if (/\bdms\b|database migration/.test(l)) out.push(badges.dms);
  else if (l.includes("migration")) out.push(badges.migration);
  if (l.includes("generative ai") || l.includes("strategic collaboration")) out.push(badges.genAI);
  else if (/\bai services\b/.test(l)) out.push(badges.ai);
  if (/data (services|& analytics|and analytics)/.test(l)) out.push(badges.data);
  if (l.includes("well-architected")) out.push(badges.wellArchitected);
  if (l.includes("cloud operations")) out.push(badges.cloudOps);
  if (l.includes("iso 27001")) out.push(badges.iso);
  if (l.includes("soc 2")) out.push(badges.soc);
  return out;
}
