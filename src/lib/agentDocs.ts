/**
 * Plain-text views of the site for AI agents:
 *  - llmsTxt(): the /llms.txt index (https://llmstxt.org)
 *  - pageMarkdown(path): a Markdown version of a page, served when a request
 *    sends `Accept: text/markdown` (see src/proxy.ts and /api/md).
 * Everything is built from the same content files the pages use, so it stays in sync.
 */
import { site, nav } from "@/lib/site";
import { services } from "@/content/services";
import { products, partnerPages } from "@/content/products";
import { posts, post, formatDate } from "@/lib/blog";
import { caseStudies, caseStudy } from "@/lib/caseStudies";
import { releases, release, newsDate } from "@/lib/news";
import * as privacy from "@/content/privacy";

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const link = (label: string, path: string) => `[${label}](${abs(path)})`;
/** Image markdown is useless to text agents; keep the alt text only. */
const stripImages = (md: string) => md.replace(/!\[([^\]]*)\]\([^)]*\)/g, (_m, alt: string) => (alt ? `(Image: ${alt})` : ""));
/** Privacy text writes links as [[text]](url). */
const privacyLinks = (s: string) => s.replace(/\[\[([^\]]+)\]\]\(([^)]+)\)/g, "[$1]($2)");

const visibleNav = (label: string) => nav.find((g) => g.label === label)?.items?.filter((i) => !i.hidden) ?? [];
const footer = () =>
  `\n\n---\n${site.name}: ${site.tagline} Contact: ${site.emails.sales}, ${site.phone}. Site index for agents: ${abs("/llms.txt")}\n`;

export function llmsTxt(): string {
  const out: string[] = [];
  out.push(`# ${site.name}`, "", `> ${site.description}`, "");
  out.push(
    `${site.name} is an AWS Premier Tier Services Partner with offices in India, the United States and the United Kingdom.`,
    `Every page below is also available as Markdown: request it with the header \`Accept: text/markdown\`.`,
    "",
  );

  out.push("## Services", "");
  for (const s of services) out.push(`- ${link(s.title, `/services/${s.slug}`)}: ${s.tagline}`);

  out.push("", "## Products", "");
  for (const p of products.filter((p) => p.status !== "placeholder" && p.href.startsWith("/products/")))
    out.push(`- ${link(p.name, p.href)}: ${p.tagline}. ${p.desc}`);

  out.push("", "## Partnerships", "");
  for (const p of partnerPages.filter((p) => !p.hidden)) out.push(`- ${link(p.name, p.href)}: ${p.badge}. ${p.desc}`);

  out.push("", "## Company", "");
  out.push(`- ${link("About us", "/company/about")}`);
  out.push(`- ${link("Careers", "/company/careers")}`);
  out.push(`- ${link("Industries", "/industries")}`);
  out.push(`- ${link("Talk to an expert", "/contact")}: ${site.emails.sales}, ${site.phone}`);
  out.push(`- ${link("Privacy policy", "/privacy-policy")}`);

  out.push("", "## Case studies", "");
  for (const c of caseStudies()) out.push(`- ${link(c.title, `/resources/case-studies/${c.slug}`)}: ${c.description}`);

  out.push("", "## Newsroom", "");
  for (const r of releases()) out.push(`- ${link(r.title, `/resources/newsroom/${r.slug}`)} (${newsDate(r.date)})`);

  out.push("", "## Optional", "");
  for (const p of posts()) out.push(`- ${link(p.title, `/resources/blog/${p.slug}`)}: ${p.description}`);

  return out.join("\n") + "\n";
}

function homeMd(): string {
  const lines = [`# ${site.name}: ${site.tagline}`, "", site.description, "", "## Services", ""];
  for (const s of services) lines.push(`- **${s.verb ?? s.title}** (${link(s.title, `/services/${s.slug}`)}): ${s.tagline}`);
  lines.push("", "## Products", "");
  for (const i of visibleNav("Products")) lines.push(`- ${link(i.label, i.href)}: ${i.hint ?? ""}`);
  lines.push("", "## Partnerships", "");
  for (const i of visibleNav("Partnerships")) lines.push(`- ${link(i.label, i.href)}: ${i.hint ?? ""}`);
  lines.push("", "## Resources", "");
  for (const i of visibleNav("Resources")) lines.push(`- ${link(i.label, i.href)}: ${i.hint ?? ""}`);
  lines.push("", `Talk to an expert: ${link("contact form", "/contact")} or ${site.emails.sales}.`);
  return lines.join("\n");
}

function serviceMd(slug: string): string | null {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  const l = [`# ${s.title}`, "", `> ${s.tagline}`, "", s.intro, "", "## What we offer", ""];
  for (const o of s.offerings) l.push(`- **${o.title}**: ${o.desc}`);
  l.push("", "## Challenges we solve", "");
  for (const c of s.challenges) l.push(`- **${c.title}**: ${c.desc}`);
  l.push("", "## How we work", "");
  s.process.forEach((p, i) => l.push(`${i + 1}. **${p.title}**: ${p.desc}`));
  if (s.includes.length) l.push("", "## What's included", "", ...s.includes.map((x) => `- ${x}`));
  if (s.plans?.length) {
    l.push("", "## Plans", "");
    for (const p of s.plans) l.push(`- **${p.name}**: ${p.coverage}. ${p.adds}. Reporting: ${p.reporting}`);
  }
  if (s.faqs.length) {
    l.push("", "## FAQ", "");
    for (const f of s.faqs) l.push(`### ${f.q}`, "", f.a, "");
  }
  return l.join("\n");
}

function productMd(slug: string): string | null {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  const l = [`# ${p.name}: ${p.tagline}`, "", `Category: ${p.category}`, "", p.desc, ""];
  if (p.features.length) l.push("## Features", "", ...p.features.map((f) => `- **${f.title}**: ${f.desc}`));
  return l.join("\n");
}

function partnerMd(slug: string): string | null {
  const p = partnerPages.find((x) => x.href === `/partnerships/${slug}`);
  if (!p) return null;
  return [`# ${site.name} and ${p.name}`, "", `${p.badge}.`, "", p.desc].join("\n");
}

function blogMd(slug: string): string | null {
  const p = post(slug);
  if (!p) return null;
  return [`# ${p.title}`, "", `By ${p.author}, ${p.role}. Published ${formatDate(p.publishedAt)}. Topic: ${p.topic}.`, "", `> ${p.description}`, "", stripImages(p.body)].join("\n");
}

function caseMd(slug: string): string | null {
  const c = caseStudy(slug);
  if (!c) return null;
  const l = [`# ${c.title}`, "", `Client: ${c.client}. Industry: ${c.industry}. Service: ${c.service}.`, "", `> ${c.description}`, ""];
  if (c.metrics.length) l.push("## Results", "", ...c.metrics.map((m) => `- **${m.value}** ${m.label}`), "");
  for (const s of c.sections) l.push(`## ${s.label}`, "", stripImages(s.body), "");
  if (c.builtWith.length) l.push("## Built with", "", c.builtWith.join(", "));
  return l.join("\n");
}

function newsMd(slug: string): string | null {
  const r = release(slug);
  if (!r) return null;
  const l = [`# ${r.title}`, "", `${r.place}, ${newsDate(r.date)}. ${r.kind}.`, "", r.lead, "", stripImages(r.body)];
  if (r.quote) l.push("", `> ${r.quote.text}`, `> (${r.quote.name}, ${r.quote.role})`);
  return l.join("\n");
}

function privacyMd(): string {
  const l = ["# Privacy policy", "", `Last updated: ${privacy.updated}`, ""];
  const block = (b: privacy.Block) =>
    b.k === "li" ? `- ${privacyLinks(b.t)}` : b.k === "h3" ? `\n### ${b.t}\n` : b.k === "h4" ? `\n#### ${b.t}\n` : `${privacyLinks(b.t)}\n`;
  l.push(...privacy.intro.map(block));
  for (const s of privacy.sections) l.push("", `## ${s.title}`, "", ...s.blocks.map(block));
  return l.join("\n");
}

function contactMd(): string {
  const l = ["# Talk to an expert", "", "Tell us about your cloud or AI project. An AWS-certified expert replies within 24 to 48 hours.", ""];
  l.push(`- Sales: ${site.emails.sales}`, `- Support: ${site.emails.support}`, `- Careers: ${site.emails.careers}`, `- General: ${site.emails.general}`, `- Phone: ${site.phone}`);
  l.push("", "## Offices", "", ...site.offices.map((o) => `- **${o.city}** (${o.label}): ${o.address}`));
  l.push("", `Enquiry form: ${abs("/contact")}`);
  return l.join("\n");
}

const listMd = (title: string, items: string[]) => [`# ${title}`, "", ...items].join("\n");

/** Markdown for a site path, or null if the path isn't a known page. */
export function pageMarkdown(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  const [, a, b, c] = path.split("/");
  let md: string | null = null;

  if (path === "/") md = homeMd();
  else if (a === "services" && b && !c) md = serviceMd(b);
  else if (a === "products" && b && !c) md = productMd(b);
  else if (a === "partnerships" && b && !c) md = partnerMd(b);
  else if (path === "/resources/blog")
    md = listMd("Blog", posts().map((p) => `- ${link(p.title, `/resources/blog/${p.slug}`)}: ${p.description}`));
  else if (path === "/resources/case-studies")
    md = listMd("Case studies", caseStudies().map((x) => `- ${link(x.title, `/resources/case-studies/${x.slug}`)}: ${x.description}`));
  else if (path === "/resources/newsroom")
    md = listMd("Newsroom", releases().map((r) => `- ${link(r.title, `/resources/newsroom/${r.slug}`)} (${newsDate(r.date)})`));
  else if (a === "resources" && b === "blog" && c) md = blogMd(c);
  else if (a === "resources" && b === "case-studies" && c) md = caseMd(c);
  else if (a === "resources" && b === "newsroom" && c) md = newsMd(c);
  else if (path === "/privacy-policy") md = privacyMd();
  else if (path === "/contact") md = contactMd();
  else if (["/company/about", "/company/careers", "/industries", "/resources/aws-lift", "/resources/free-genai-consulting"].includes(path)) {
    // Pages whose copy lives in the page component: give agents the essentials and the page URL.
    const item = nav.flatMap((g) => g.items ?? [{ label: g.label, href: g.href ?? "", hint: undefined }]).find((i) => i.href === path);
    md = [`# ${item?.label ?? site.name}`, "", item?.hint ? `${item.hint}.` : site.description, "", `Full page: ${abs(path)}`].join("\n");
  }

  return md === null ? null : md.replace(/\n{3,}/g, "\n\n").trim() + footer();
}
