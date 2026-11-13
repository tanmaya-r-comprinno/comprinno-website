import type { Year } from "@/app/company/about/JourneyClimb";

/** Comprinno's AWS partnership journey, shown on About and the AWS partner page. */
export const journey: Year[] = [
  { year: "2018", short: "Select Partner", items: [{ k: "tier", text: "AWS Select Consulting Partner" }] },
  { year: "2019", short: "Software · Public Sector", items: [{ k: "program", text: "AWS Software Partner" }, { k: "program", text: "AWS Public Sector Partner" }] },
  { year: "2020", short: "Advanced Partner", items: [{ k: "tier", text: "AWS Advanced Consulting Partner" }] },
  { year: "2021", short: "Well-Architected", items: [{ k: "program", text: "AWS Well-Architected Partner" }] },
  { year: "2022", short: "Emerging Star Award", items: [{ k: "award", text: "AWS Emerging Star Partner Award" }] },
  { year: "2023", short: "AWS Ambassador · 3 competencies", items: [{ k: "recognition", text: "AWS Ambassador (our CTO)" }, { k: "competency", text: "Security, Migration and Resilience Competencies" }] },
  { year: "2024", short: "MSP · 2 competencies", items: [{ k: "program", text: "AWS Managed Service Provider (MSP)" }, { k: "competency", text: "Generative AI and Cloud Operations Competencies" }] },
  { year: "2025", short: "DevOps · Level 1 MSSP", items: [{ k: "competency", text: "DevOps Competency" }, { k: "competency", text: "Level 1 MSSP Competency" }] },
  { year: "2026", short: "Premier Tier · Data and Analytics", items: [{ k: "competency", text: "Data and Analytics Competency" }, { k: "tier", text: "AWS Premier Tier Services Partner" }] },
];
