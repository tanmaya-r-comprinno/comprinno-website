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

export const awsPrograms = [
  "AWS Managed Service Provider (MSP)",
  "Level 1 MSSP",
  "AWS Well-Architected Partner",
  "Authorized Commercial Reseller",
  "Strategic Collaboration Agreement (Dec 2025)",
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

export const awsValidations = [
  "Amazon API Gateway", "Amazon CloudFront", "Amazon DynamoDB", "Amazon EC2 for Windows Server",
  "Amazon ECS", "Amazon EKS", "Amazon MSK", "Amazon OpenSearch Service", "Amazon QuickSight",
  "Amazon RDS", "Amazon Redshift", "AWS CloudFormation", "AWS Config", "AWS Control Tower",
  "AWS Database Migration Service", "AWS Glue", "AWS Lambda", "AWS Systems Manager", "AWS WAF",
];

export const awsCertifications = [
  "Solutions Architect Professional",
  "DevOps Engineer Professional",
  "Security Specialty",
  "CloudOps Engineer Associate",
  "AI Practitioner",
];
