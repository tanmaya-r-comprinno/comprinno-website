/**
 * The site's public, read-only agent interface: one set of tools used by the
 * MCP server (/mcp), WebMCP (in the browser) and the discovery documents
 * (server card, API catalog, AI catalog, Agent Skills, auth.md).
 * Everything here returns content that is already public on the website.
 * No tool writes data, sends messages or calls third-party services.
 */
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { posts } from "@/lib/blog";
import { caseStudies } from "@/lib/caseStudies";
import { releases } from "@/lib/news";
import { llmsTxt, pageMarkdown } from "@/lib/agentDocs";

export const SERVER_INFO = { name: "comprinno-website", title: "Comprinno website", version: "1.0.0" };
export const MCP_PATH = "/mcp";
export const abs = (path: string) => `${site.url}${path}`;
export const hostname = () => new URL(site.url).hostname;

type JsonSchema = Record<string, unknown>;
export type Tool = {
  name: string;
  title: string;
  description: string;
  inputSchema: JsonSchema;
  run: (args: Record<string, unknown>) => string;
};

const KINDS = ["all", "service", "product", "case-study", "blog", "news"] as const;
type Kind = (typeof KINDS)[number];
type Hit = { kind: Exclude<Kind, "all">; title: string; url: string; summary: string };

function corpus(): Hit[] {
  return [
    ...services.map((s) => ({ kind: "service" as const, title: s.title, url: abs(`/services/${s.slug}`), summary: `${s.tagline} ${s.intro}` })),
    ...products.filter((p) => p.href.startsWith("/products/")).map((p) => ({ kind: "product" as const, title: p.name, url: abs(p.href), summary: `${p.tagline}. ${p.desc}` })),
    ...caseStudies().map((c) => ({ kind: "case-study" as const, title: c.title, url: abs(`/resources/case-studies/${c.slug}`), summary: `${c.description} Industry: ${c.industry}. Service: ${c.service}.` })),
    ...posts().map((p) => ({ kind: "blog" as const, title: p.title, url: abs(`/resources/blog/${p.slug}`), summary: p.description })),
    ...releases().map((r) => ({ kind: "news" as const, title: r.title, url: abs(`/resources/newsroom/${r.slug}`), summary: r.lead })),
  ];
}

/** Simple keyword search: every query word must appear; title matches rank higher. */
export function searchContent(query: string, kind: Kind = "all", limit = 10): Hit[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 1).slice(0, 12);
  if (!words.length) return [];
  return corpus()
    .filter((h) => kind === "all" || h.kind === kind)
    .map((h) => {
      const title = h.title.toLowerCase();
      const text = `${title} ${h.summary.toLowerCase()}`;
      if (!words.every((w) => text.includes(w))) return null;
      return { h, score: words.reduce((n, w) => n + (title.includes(w) ? 3 : 1), 0) };
    })
    .filter((x): x is { h: Hit; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.h);
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const tools: Tool[] = [
  {
    name: "search_content",
    title: "Search Comprinno content",
    description: "Search Comprinno's services, products, case studies, blog posts and press releases by keyword. Returns titles, URLs and short summaries.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keywords, e.g. 'EKS migration fintech'", maxLength: 200 },
        type: { type: "string", enum: [...KINDS], description: "Limit to one content type (default: all)" },
        limit: { type: "integer", minimum: 1, maximum: 25, description: "Maximum results (default 10)" },
      },
      required: ["query"],
      additionalProperties: false,
    },
    run: (a) => {
      const query = str(a.query, 200);
      if (!query) throw new Error("query is required");
      const kind = (KINDS as readonly string[]).includes(String(a.type)) ? (a.type as Kind) : "all";
      const limit = Math.min(25, Math.max(1, Number(a.limit) || 10));
      const hits = searchContent(query, kind, limit);
      if (!hits.length) return `No results for "${query}". Try fewer or broader keywords, or read the site index with get_site_index.`;
      return hits.map((h, i) => `${i + 1}. [${h.kind}] ${h.title}\n   ${h.url}\n   ${h.summary.slice(0, 280)}`).join("\n\n");
    },
  },
  {
    name: "get_page",
    title: "Read a page as Markdown",
    description: "Get any page of comprinno.net as Markdown, by path (e.g. '/services/migrate' or '/resources/case-studies/<slug>') or full URL.",
    inputSchema: {
      type: "object",
      properties: { path: { type: "string", description: "Site path or full comprinno.net URL", maxLength: 300 } },
      required: ["path"],
      additionalProperties: false,
    },
    run: (a) => {
      let path = str(a.path, 300);
      if (!path) throw new Error("path is required");
      if (/^https?:\/\//i.test(path)) path = new URL(path).pathname;
      if (!path.startsWith("/")) path = `/${path}`;
      return pageMarkdown(path) ?? `No page at ${path}. Use get_site_index or search_content to find pages.`;
    },
  },
  {
    name: "get_site_index",
    title: "Site index",
    description: "The full index of comprinno.net (the same as /llms.txt): every service, product, partnership, case study, press release and blog post, with URLs.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () => llmsTxt(),
  },
  {
    name: "get_contact_info",
    title: "How to contact Comprinno",
    description: "Comprinno's sales, support and careers contacts, phone number, offices and the enquiry form URL. Read-only: it does not send anything.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    run: () => pageMarkdown("/contact") ?? "",
  },
];

export const toolByName = (name: string) => tools.find((t) => t.name === name);
