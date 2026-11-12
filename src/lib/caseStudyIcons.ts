import type { IconName } from "@/components/Icon";

/** One icon per case study service, shared by the home page and the stories pages */
export const serviceIcon: Record<string, IconName> = {
  Migration: "migrate",
  Modernization: "layers",
  "Generative AI": "spark",
  "Security and resilience": "shield",
  "Cost and operations": "coin",
};
