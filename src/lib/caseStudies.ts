/**
 * Case studies, cleaned up for display.
 *
 * The MDX files came over from WordPress and are uneven: titles often read
 * "Client | Service | Headline", client fields are sometimes just the first
 * word of the title, entities are escaped, and each body repeats the old tab
 * headings ("## Overview" then "## **Overview**"). This module turns each file
 * into a tidy record the listing and detail pages can rely on.
 */
import { dedupeHeadings, fixBold } from "@/lib/markdownFix";
import { imgMarkdown, withImages } from "@/lib/contentImages";
import { getAllCaseStudies } from "@/lib/content";

export type Service = "Migration" | "Modernization" | "Generative AI" | "Security and resilience" | "Cost and operations";
export const SERVICES: Service[] = ["Migration", "Modernization", "Generative AI", "Security and resilience", "Cost and operations"];

export type Section = { id: string; label: string; body: string };
export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  client: string;
  named: boolean; // true when the client is a real name, not "A fintech company"
  industry: string;
  service: Service;
  publishedAt: string;
  sections: Section[];
  metrics: Metric[];
  builtWith: string[];
};

const decode = (s = "") =>
  s.replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&quot;/g, '"').replace(/​/g, "").replace(/\s+/g, " ").trim();

// Title prefixes that describe a sector or service, not a client
const GENERIC = /^(fin ?tech|ad-?tech|prop ?tech|consumer (tech|electronics)|security saas|digital printing tech|supply chain tech|esg tech|genai|gen ai|aws (cloud )?(migration|modernization)|cloud migration)$/i;
// Client fields that are really the first word of a sentence
const NOT_A_CLIENT = new Set(["driving", "enabling", "enhancing", "accelerating", "intelligent", "modernizing", "establishing", "scalable", "from", "empowering", "cloud", "cloud-native", "ai-enabled", "a", "secure", "iso", "fintech", "consumer tech", "consumer electronics", "security saas", "proptech", "printing tech", "ad-tech", "building"]);

// Client fields cut short by the import
const FULL_NAME: Record<string, string> = { Highway: "Highway Delite", Neural: "Neural Hive" };

/** "A fintech company", "An IoT company", "An HR technology company" */
function anonymous(industry: string) {
  const words = industry.split(" ").map((w) => (/[A-Z].*[A-Z]/.test(w) ? w : w.toLowerCase()));
  const first = words[0];
  const vowelSound = /^[aeiou]/i.test(first) || (/^[A-Z]{2}|^[A-Z][a-z]?[A-Z]/.test(first) && /^[AEFHILMNORSX]/.test(first));
  return `${vowelSound ? "An" : "A"} ${words.join(" ")} company`;
}

function industryLabel(raw?: string) {
  const s = decode(raw || "Technology").replace(/^LifeSciences$/i, "Life sciences");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function serviceOf(solutions: string[] = [], title = ""): Service {
  const s = (solutions.join(" ") + " | " + title).toLowerCase();
  if (/gen ?ai|generative/.test(s)) return "Generative AI";
  if (/migration/.test(s)) return "Migration";
  if (/moderni|serverless|greenfield|infrastructure setup|vdi/.test(s)) return "Modernization";
  if (/secur|compliance|secops|locali|iso|disaster|resilien|wafr/.test(s)) return "Security and resilience";
  return "Cost and operations";
}

function splitTitle(rawTitle: string, rawClient: string, industry: string, description: string) {
  const parts = decode(rawTitle).split(/\s+\|\s+/).map((p) => p.trim()).filter(Boolean);
  let headline = parts[parts.length - 1] || "";
  let client = "";
  if (parts.length > 1 && !GENERIC.test(parts[0])) client = parts[0];
  const c = decode(rawClient);
  if (!client && c && !NOT_A_CLIENT.has(c.toLowerCase()) && decode(rawTitle).toLowerCase().includes(c.toLowerCase())) client = c;
  // titles that are only a client name: use the description as the headline
  if (parts.length === 1 && headline.split(" ").length <= 3) {
    client = client || headline;
    const first = decode(description).split(/(?<=\.)\s/)[0].replace(/\.$/, "");
    headline = first.length > 110 ? first.slice(0, first.lastIndexOf(" ", 107)) + "…" : first || headline;
  }
  headline = headline.replace(/^(\w)/, (m) => m.toUpperCase());
  client = FULL_NAME[client] ?? client;
  const named = Boolean(client);
  return { headline, client: client || anonymous(industry), named };
}

// The four WordPress tabs become the page sections
const TABS: Record<string, { id: string; label: string }> = {
  overview: { id: "overview", label: "Client overview" },
  "the challenge": { id: "challenge", label: "Challenge" },
  "the solution": { id: "solution", label: "Solution" },
  results: { id: "results", label: "Results" },
};
// inner headings that only repeat the tab name
const ECHO = /^(client )?overview$|^(the )?challenges?( faced)?$|^(the )?solutions?( provided)?$|^results?$|^executive summary$/i;

function parseSections(body: string): Section[] {
  const out: Section[] = [];
  let cur: Section | null = null;
  for (const line of body.replace(/\r/g, "").split("\n")) {
    const h = line.match(/^#{2,3}\s+(.+?)\s*$/);
    if (h) {
      const text = decode(h[1].replace(/\*+/g, "")).replace(/:$/, "").trim();
      const tab = TABS[text.toLowerCase()];
      if (tab) {
        cur = out.find((s) => s.id === tab.id) ?? null;
        if (!cur) { cur = { ...tab, body: "" }; out.push(cur); }
        continue;
      }
      if (ECHO.test(text)) continue;
      if (!cur) { cur = { ...TABS.overview, body: "" }; out.push(cur); }
      cur.body += `\n### ${text}\n`;
      continue;
    }
    if (!cur) { if (!line.trim()) continue; cur = { ...TABS.overview, body: "" }; out.push(cur); }
    cur.body += line + "\n";
  }
  return out
    .map((s) => ({
      ...s,
      body: s.body
        .replace(/&nbsp;| /g, " ")
        .replace(/^\s*\*\*(About (the )?Client|Overview|Challenges?|Solution)\*\*\s*$/gim, "")
        .replace(/\n{3,}/g, "\n\n")
        .split("\n").map(fixBold).join("\n")
        .trim(),
    }))
    .filter((s) => s.body.replace(/[#*\s]/g, "").length > 40);
}


// Pull up to four headline numbers from the results text
function metricsOf(sections: Section[]): Metric[] {
  const res = sections.find((s) => s.id === "results")?.body ?? "";
  const lines = res.split("\n").map((l) => l.replace(/^[-*]\s+/, "").replace(/\*\*/g, "").trim()).filter(Boolean);
  const out: Metric[] = [];
  for (const l of lines) {
    const m = l.match(/(\d+(?:\.\d+)?\s?%|\d+(?:\.\d+)?\s?[xX]\b|\d+\+)/);
    if (!m) continue;
    // drop a leading "Heading:" or "Heading – " so only the description remains
    let label = l.replace(/^[^:]{0,60}:\s*/, "").replace(/^[^–—]{0,70}\s?[–—]\s?(?=[A-Z0-9])/, "");
    label = label.charAt(0).toUpperCase() + label.slice(1);
    label = label.length > 90 ? label.slice(0, label.lastIndexOf(" ", 86)) + "…" : label;
    out.push({ value: m[1].replace(/\s/g, "").replace(/X$/, "x"), label });
    if (out.length === 4) break;
  }
  return out;
}

const AWS = ["Amazon Bedrock", "Amazon EKS", "Amazon ECS", "AWS Fargate", "AWS Lambda", "Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon Aurora", "Amazon DynamoDB", "Amazon DocumentDB", "Amazon OpenSearch", "Amazon SageMaker", "Amazon Kinesis", "Amazon QuickSight", "Amazon Athena", "AWS Glue", "Amazon Redshift", "Amazon CloudFront", "AWS WAF", "Amazon GuardDuty", "AWS Security Hub", "AWS KMS", "AWS IAM", "Amazon CloudWatch", "AWS CloudTrail", "AWS Config", "AWS Control Tower", "AWS Organizations", "AWS DMS", "Amazon API Gateway", "Amazon VPC", "AWS Backup", "Amazon ElastiCache", "Amazon Q", "Terraform"];

function builtWithOf(body: string) {
  const lower = body.toLowerCase();
  return AWS.filter((s) => lower.includes(s.toLowerCase()) || lower.includes(s.replace(/^(Amazon|AWS) /, "").toLowerCase() + " ")).slice(0, 8);
}

let cache: CaseStudy[] | null = null;

/** Every case study with real content, newest first. */
export function caseStudies(): CaseStudy[] {
  if (cache) return cache;
  cache = getAllCaseStudies()
    .filter((cs) => cs.content.replace(/\s/g, "").length > 200) // skip the empty imports
    .map((cs) => {
      const fm = cs.frontmatter;
      const industry = industryLabel(fm.industry);
      const description = decode(fm.description).replace(/\*+/g, "");
      const { headline, client, named } = splitTitle(fm.title, fm.client ?? "", industry, description);
      // restore architecture / flow diagrams the import dropped, under their original headings
      const { body: withDiagrams, unplaced } = withImages(`case-studies/${cs.slug}`, dedupeHeadings(cs.content).replace(/^(#{2,4})\s+\**\s*(.+?)\s*\**\s*$/gm, "$1 $2"));
      const sections = parseSections(withDiagrams);
      if (unplaced.length) {
        const sol = sections.find((x) => x.id === "solution") ?? sections[sections.length - 1];
        if (sol) sol.body += `\n\n${imgMarkdown(unplaced)}`;
      }
      return {
        slug: cs.slug,
        title: headline,
        description,
        client,
        named,
        industry,
        service: serviceOf(fm.solutions, decode(fm.title)),
        publishedAt: fm.publishedAt,
        sections,
        metrics: metricsOf(sections),
        builtWith: builtWithOf(cs.content),
      };
    });
  return cache;
}

export const caseStudy = (slug: string) => caseStudies().find((c) => c.slug === slug) ?? null;
