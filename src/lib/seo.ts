import type { Metadata } from "next";
import type { Topic } from "@/lib/blog";
import type { Service } from "@/lib/caseStudies";
import { site } from "@/lib/site";

export const organizationId = `${site.url}/#organization`;

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": organizationId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/comprinno-logo.webp`,
  description: site.description,
  telephone: site.phone,
  email: site.emails.general,
  sameAs: Object.values(site.social),
};

export const serviceSeo = {
  migrate: {
    title: "AWS Cloud Migration Services",
    description: "Migrate applications, databases and VMware workloads to AWS with Comprinno, an AWS Premier Tier partner. Planned migration waves and tested rollback plans.",
  },
  modernize: {
    title: "Cloud Application Modernization & DevOps Services",
    description: "Modernize applications on AWS with Comprinno. Adopt containers, Kubernetes, serverless and automated delivery while reducing legacy database dependencies.",
  },
  manage: {
    title: "AWS Managed Services & Cloud Security",
    description: "Run your AWS cloud with Comprinno's managed operations, security monitoring, compliance support, disaster recovery and cost governance. Coverage by plan.",
  },
  maximize: {
    title: "Generative AI & AI Agent Development Services",
    description: "Build production AI agents and generative AI applications with Comprinno. Connect enterprise data with guardrails, evaluation and cost controls built in.",
  },
};

export type ServiceSlug = keyof typeof serviceSeo;

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const { title, description } = serviceSeo[slug];
  const url = `/services/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: `${title} | ${site.name}`, description, url },
    twitter: { card: "summary", title: `${title} | ${site.name}`, description },
  };
}

export const caseStudyServices: Record<Service, ServiceSlug> = {
  Migration: "migrate",
  Modernization: "modernize",
  "Generative AI": "maximize",
  "Security and resilience": "manage",
  "Cost and operations": "manage",
};

export const topicServices: Record<Topic, ServiceSlug | null> = {
  Migration: "migrate",
  Modernization: "modernize",
  "Security and compliance": "manage",
  "Cost and FinOps": "manage",
  Resilience: "manage",
  "Generative AI": "maximize",
  "Industry insights": null,
};

/** Use the same title, description, author and dates that the page displays. */
export function articleStructuredData({ title, description, path, section, author, publishedAt }: {
  title: string;
  description: string;
  path: string;
  section: { name: string; path: string };
  author?: string;
  publishedAt?: string;
}) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        mainEntityOfPage: url,
        publisher: { "@id": organizationId },
        ...(author ? { author: ["Comprinno team", "Web Admin"].includes(author)
          ? { "@id": organizationId }
          : { "@type": "Person", name: author } } : {}),
        ...(publishedAt && Number.isFinite(Date.parse(publishedAt)) ? { datePublished: publishedAt } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: section.name, item: `${site.url}${section.path}` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
    ],
  };
}
