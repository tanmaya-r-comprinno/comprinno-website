/**
 * Blog posts, cleaned up for display (same idea as caseStudies.ts).
 * The MDX came over from WordPress: entities are escaped, headings are "### **Title**",
 * bold markers have stray spaces, categories are inconsistent and some posts end
 * with an old "CTA" banner image. This turns each file into a tidy record.
 */
import { dedupeHeadings, fixBold } from "@/lib/markdownFix";
import { imgMarkdown, withImages } from "@/lib/contentImages";
import { getAllPosts } from "@/lib/content";

export type Topic = "Migration" | "Modernization" | "Security and compliance" | "Cost and FinOps" | "Resilience" | "Generative AI" | "Industry insights";
export const TOPICS: Topic[] = ["Migration", "Modernization", "Security and compliance", "Cost and FinOps", "Resilience", "Generative AI", "Industry insights"];

export type Heading = { id: string; text: string };
export type Post = {
  slug: string;
  title: string;
  description: string;
  topic: Topic;
  category: string;
  author: string;
  role: string;
  initials: string;
  publishedAt: string;
  minutes: number;
  headings: Heading[];
  body: string;
};

const decode = (s = "") =>
  s.replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&#8216;|&lsquo;/g, "‘").replace(/&#8220;|&#8221;|&quot;/g, '"').replace(/&nbsp;| /g, " ").replace(/​/g, "").replace(/\s+/g, " ").trim();

function topicOf(category: string, title: string): Topic {
  const s = `${category} ${title}`.toLowerCase();
  if (/gen ?ai|generative|llm|bedrock|agent/.test(s)) return "Generative AI";
  if (/resilien|disaster|backup|\bdr\b|high availability/.test(s)) return "Resilience";
  if (/cost|finops|bill|saving/.test(s)) return "Cost and FinOps";
  if (/secur|complian|governance|regtech|irdai|sebi|rbi|pci|iso|soc|well-architected|wafr/.test(s)) return "Security and compliance";
  if (/migrat/.test(s)) return "Migration";
  if (/moderni|eks|kubernetes|devops|ci\/cd|serverless|container|database/.test(s)) return "Modernization";
  return "Industry insights";
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");


function clean(raw: string) {
  const lines = raw.replace(/\r/g, "").split("\n");
  // the biggest heading level used becomes h2, the next one h3
  const levels = [...new Set(lines.map((l) => l.match(/^(#{1,6})\s/)?.[1].length).filter(Boolean) as number[])].sort();
  const top = levels[0] ?? 2;
  const headings: Heading[] = [];
  const out = lines
    .filter((l) => !/!\[[^\]]*\]\([^)]*CTA[^)]*\)/i.test(l)) // old WordPress CTA banners
    .filter((l) => !/^\s*(\d+\.|[-*])\s*\$1\s*$/.test(l)) // empty list items left by the import ("1. $1")
    .map((l) => {
      const h = l.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
      if (!h) return fixBold(l.replace(/&nbsp;| /g, " "));
      const text = decode(h[2].replace(/\*+/g, "")).replace(/:$/, "");
      if (!text) return "";
      const level = Math.min(4, 2 + (h[1].length - top));
      if (level === 2) {
        headings.push({ id: slugify(text), text });
        return `\n## ${text}\n`;
      }
      return `\n${"#".repeat(level)} ${text}\n`;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { body: out, headings };
}

const initialsOf = (name: string) => name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

let cache: Post[] | null = null;
export function posts(): Post[] {
  if (cache) return cache;
  cache = getAllPosts()
    .filter((p) => p.content.replace(/\s/g, "").length > 300)
    .map((p) => {
      const fm = p.frontmatter;
      const title = decode(fm.title);
      const category = decode(fm.category ?? "Insights");
      const author = decode(fm.author ?? "Comprinno team");
      const roleRaw = decode(fm.authorDesignation ?? "");
      const role = !roleRaw || roleRaw === "Team" ? "Comprinno" : roleRaw.replace(/\s*(\||at)\s*Comprinno$/i, ", Comprinno");
      const restored = withImages(`blog/${p.slug}`, dedupeHeadings(p.content).replace(/^(#{1,4})\s+\**\s*(.+?)\s*\**\s*$/gm, "$1 $2"));
      const { body, headings } = clean(restored.body + (restored.unplaced.length ? `\n\n${imgMarkdown(restored.unplaced)}` : ""));
      const words = p.content.split(/\s+/).length;
      let description = decode(fm.description).replace(/\*+/g, "");
      if (description.length > 180) description = description.slice(0, description.lastIndexOf(" ", 176)) + "…";
      return {
        slug: p.slug,
        title,
        description,
        topic: topicOf(category, title),
        category: category === "Uncategorized" ? "Insights" : category,
        author,
        role,
        initials: initialsOf(author) || "C",
        publishedAt: fm.publishedAt,
        minutes: Math.max(2, Math.round(words / 220)),
        headings,
        body,
      };
    });
  return cache;
}

export const post = (slug: string) => posts().find((p) => p.slug === slug) ?? null;

export const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
