/**
 * Content reader for MDX files.
 * Reads blog posts, case studies, and news from src/content/.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "src", "content");

export interface PostFrontmatter {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  authorDesignation?: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  coverImageAlt?: string;
  draft?: boolean;
  readingTime?: number;
  // case study specific
  client?: string;
  industry?: string;
  solutions?: string[];
  results?: string[];
  // news specific
  newsType?: string;
}

function readDir(dir: string): Array<{ frontmatter: PostFrontmatter; slug: string; content: string }> {
  const fullDir = path.join(contentRoot, dir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.(mdx|md)$/, "");
      return {
        frontmatter: { slug, ...data } as PostFrontmatter,
        slug,
        content,
      };
    })
    .filter((p) => !p.frontmatter.draft || process.env.NODE_ENV !== "production")
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt ?? "").getTime() -
        new Date(a.frontmatter.publishedAt ?? "").getTime()
    );
}

// ── Blog ──────────────────────────────────────────────────────────────────
export const getAllPosts = () => readDir("blog");
export const getPost = (slug: string) => readDir("blog").find((p) => p.slug === slug) ?? null;
export const getBlogCategories = (): string[] => {
  const cats = getAllPosts().map((p) => p.frontmatter.category ?? "Uncategorized");
  return [...new Set(cats)].sort();
};

// ── Case Studies ──────────────────────────────────────────────────────────
export const getAllCaseStudies = () => readDir("case-studies");
export const getCaseStudy = (slug: string) => readDir("case-studies").find((p) => p.slug === slug) ?? null;
export const getCaseStudyIndustries = (): string[] => {
  const industries = getAllCaseStudies().map((cs) => cs.frontmatter.industry ?? "Technology");
  return [...new Set(industries)].sort();
};

// ── News ──────────────────────────────────────────────────────────────────
export const getAllNews = () => readDir("news");
export const getNewsItem = (slug: string) => readDir("news").find((p) => p.slug === slug) ?? null;
