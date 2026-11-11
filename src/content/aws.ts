import type { IconName } from "@/components/Icon";

// Source: comprinno.net/aws-premier-tier-partner (Nov 2026).
// TODO(content): the source page says "150+" AWS certifications in one place and "100+" in its FAQ. Confirm.
export const awsHeadline = [
  { value: "Premier", label: "AWS Services Partner tier" },
  { value: "8", label: "AWS Competencies" },
  { value: "19", label: "AWS Service Validations" },
  { value: "150+", label: "AWS Certifications" },
  { value: "2017", label: "In the AWS Partner Network since" },
];

export const awsCompetencies: { name: string; icon: IconName }[] = [
  { name: "AI Services", icon: "spark" },
  { name: "Data Services", icon: "database" },
  { name: "Migration & Modernization", icon: "migrate" },
  { name: "Security Consulting", icon: "shield" },
  { name: "DevOps Consulting", icon: "loop" },
  { name: "Resilience Services", icon: "layers" },
  { name: "Cloud Operations Services", icon: "cloud" },
  { name: "MSSP Services", icon: "lock" },
];

