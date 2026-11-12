/**
 * Diagrams (AWS architecture, flow charts) that the WordPress import dropped.
 * They are restored from public/images/content and listed in src/content/images.json:
 *   { "case-studies/<slug>": [{ "src": "/images/content/..", "heading": "Architecture Diagram", "alt": ".." }] }
 * Each image goes right after the heading it sat under on the old site; if that heading
 * isn't found, it goes at the end of the body (or the section named in `fallback`).
 */
import fs from "fs";
import path from "path";

type Img = { src: string; heading: string; alt: string };
let map: Record<string, Img[]> | null = null;
function all() {
  if (map) return map;
  const f = path.join(process.cwd(), "src", "content", "images.json");
  map = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf-8")) : {};
  return map!;
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Insert the restored images into a markdown body */
export function withImages(key: string, body: string): { body: string; unplaced: Img[] } {
  const imgs = all()[key] ?? [];
  if (!imgs.length) return { body, unplaced: [] };
  const lines = body.split("\n");
  const unplaced: Img[] = [];
  for (const img of [...imgs].reverse()) {
    const md = `\n![${img.alt || img.heading || "Diagram"}](${img.src})\n`;
    const h = norm(img.heading);
    const i = h ? lines.findIndex((l) => /^#{2,4}\s/.test(l) && norm(l.replace(/^#+\s*/, "")) === h) : -1;
    if (i >= 0) lines.splice(i + 1, 0, md);
    else unplaced.unshift(img);
  }
  return { body: lines.join("\n"), unplaced };
}

export const imgMarkdown = (imgs: Img[]) => imgs.map((i) => `![${i.alt || i.heading || "Diagram"}](${i.src})`).join("\n\n");
