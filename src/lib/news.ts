/**
 * Newsroom releases, cleaned up for display.
 * The WordPress import put most of each release's metadata inside the body
 * ("## Announcement", the date line "23rd Dec, 2024", "Bengaluru, IN", a badge
 * image, a quote image and the speaker's name as a heading), and the frontmatter
 * date is often a placeholder. This pulls those parts out so the page can lay
 * them out properly.
 */
import { getAllNews } from "@/lib/content";
import { fixBold, stripBold } from "@/lib/markdownFix";

export type Kind = "Competency" | "Service delivery" | "Partnership" | "Agreement" | "Certification" | "Product";
export const KINDS: Kind[] = ["Competency", "Service delivery", "Partnership", "Agreement", "Certification", "Product"];

export type Release = {
  slug: string;
  title: string;
  kind: Kind;
  date: string; // ISO
  place: string;
  image?: string;
  lead: string;
  body: string;
  quote?: { text: string; name: string; role: string };
  minutes: number;
};

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const decode = (s = "") => s.replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "’").replace(/&#8220;|&#8221;|&quot;/g, '"').replace(/&nbsp;| /g, " ").replace(/\s+/g, " ").trim();

function dateIn(body: string, fallback: string) {
  const m = body.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+([A-Z][a-z]{2,8})\s*,?\s*(\d{4})\b/);
  if (!m) return fallback;
  const mon = MONTHS.indexOf(m[2].slice(0, 3).toLowerCase());
  return mon < 0 ? fallback : `${m[3]}-${String(mon + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

function kindOf(title: string, type: string): Kind {
  const t = title.toLowerCase();
  if (/collaboration agreement|\bsca\b/.test(t)) return "Agreement";
  if (/partner network|joins/.test(t)) return "Partnership";
  if (/service delivery|delivery program|delivery badge/.test(t)) return "Service delivery";
  if (/iso|soc ?2/.test(t) || type === "certification") return "Certification";
  if (/^tevico/.test(t)) return "Product";
  return "Competency";
}

function parse(raw: string) {
  // drop every inline image (badges are shown in the hero; people photos are not shown)
  const lines = raw.replace(/\r/g, "").replace(/!\[[^\]]*\]\([^)]+\)/g, "").split("\n").map((l) => l.trim());
  const imgs = [...raw.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1]);
  const image = imgs.find((s) => !/\/1\.png$|prasad|bhupali/i.test(s));
  const place = raw.match(/\b(Bengaluru|Bangalore|Pune),\s*(IN|India)\b/)?.[0].replace("Bangalore", "Bengaluru").replace(/IN$/, "India") ?? "Bengaluru, India";

  // speaker: a "## Name" heading followed by a role line
  let quote: Release["quote"];
  const keep: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l || /^!\[/.test(l)) continue;
    if (/^##\s+(Announcement|Comprinno .*)$/i.test(l) && i < 6) continue; // repeated title / label
    if (/\d{1,2}(st|nd|rd|th)?\s+[A-Z][a-z]+\s*,?\s*\d{4}$/.test(l) || /^(Bengaluru|Bangalore|Pune),\s*(IN|India)$/i.test(l)) continue;
    const h = l.match(/^##\s+(.+)$/);
    if (h && i + 1 < lines.length) {
      const role = lines.slice(i + 1).find(Boolean) ?? "";
      const prev = keep.length ? keep[keep.length - 1] : "";
      if (/^[“"]/.test(prev) && /(CEO|CTO|Founder|Head|Director|Officer|Leader|Manager)/i.test(role)) {
        keep.pop();
        quote = { text: stripBold(decode(prev.replace(/^[“"]|[”"]$/g, ""))), name: stripBold(decode(h[1])), role: stripBold(decode(role)) };
        i = lines.indexOf(role, i + 1);
        continue;
      }
    }
    keep.push(l);
  }
  // skip leftover fragments (short label lines) when choosing the lead paragraph
  const paras = keep.filter((l) => !/^#/.test(l) && l.replace(/[*_]/g, "").length > 50);
  return { image, place, quote, lead: stripBold(fixBold(decode(paras[0] ?? ""))), rest: paras.slice(1).map((l) => fixBold(decode(l))).join("\n\n") };
}

let cache: Release[] | null = null;
export function releases(): Release[] {
  if (cache) return cache;
  cache = getAllNews()
    .map((n) => {
      const p = parse(n.content);
      const title = decode(n.frontmatter.title).replace(/\s+/g, " ");
      return {
        slug: n.slug,
        title,
        kind: kindOf(title, n.frontmatter.newsType ?? ""),
        date: dateIn(n.content, n.frontmatter.publishedAt),
        place: p.place,
        image: p.image,
        lead: p.lead.replace(/\*\*/g, ""),
        body: p.rest,
        quote: p.quote,
        minutes: Math.max(1, Math.round(n.content.split(/\s+/).length / 220)),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export const release = (slug: string) => releases().find((r) => r.slug === slug) ?? null;
export const newsDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
