---
name: comprinno-content
description: Add or edit Comprinno website blog posts, case studies, newsroom releases, and typed marketing content. Use for content publishing or diagnosing differences between source copy and rendered pages in the comprinno-website repo.
---

# Comprinno content

Work from the repository root. Read `AGENTS.md` for shared checkout, Next.js, and deployment requirements, and `README.md` for the project overview. Confirm implementation details against the current source.

## Find the source and its consumers

- Blog: `src/content/blog/` → `src/lib/blog.ts` → `src/app/resources/blog/`.
- Case studies: `src/content/case-studies/` → `src/lib/caseStudies.ts` → `src/app/resources/case-studies/`.
- News: `src/content/news/` → `src/lib/news.ts` → `src/app/resources/newsroom/`.
- Service, product, company, credential, partner and privacy copy lives in typed files under `src/content/`. Read the importing page as well: some copy and page-specific structures are inline.
- Navigation, contact details and the site origin live in `src/lib/site.ts`.

Use the corresponding existing MDX file or typed record as the shape. `PostFrontmatter` in `src/lib/content.ts` describes shared fields; it is a TypeScript assertion, not runtime validation. Supply valid title, description and quoted ISO publication date, and applicable author/category or client/industry/solutions fields.

## Account for transformations

The filename determines the lookup slug and public URL, even when frontmatter contains a different `slug`. Keep them aligned for new files. Renaming an existing file changes its URL; inspect inbound links and `src/content/wordpressRedirects.json` when a rename is requested.

Production hides records with `draft: true`; development can expose them. Blog bodies with at most 300 non-whitespace characters and case-study bodies with at most 200 are filtered out by their respective adapters. Check these filters when content appears in raw readers or the sitemap but has no detail page.

Blog cleanup derives topics from category/title, normalizes headings and strips old CTA banners. Case-study cleanup derives client names, service, metrics and AWS technologies from the imported content. Use `## Overview`, `## The Challenge`, `## The Solution`, and `## Results` for new case-study sections. Keep reported results supported by the source story; inspect `metricsOf` before changing how results appear.

News parsing can override the frontmatter date with a date found in the body. It extracts the lead, location, badge and quote and omits inline images. For release-date or quote problems, inspect the parser and rendered result together.

Restored blog/case-study diagrams use `src/content/images.json`, keyed by `blog/<filename-slug>` or `case-studies/<filename-slug>`, with assets under `public/images/content/`. `src/lib/contentImages.ts` inserts them after matching headings; unmatched images are appended. Check this map before adding an image that may already be restored.

Adapters use process-local caches. Restart the local server when checking source changes that appear stale.

## Verify the published representation

For content or reader changes, build and check the affected listing and detail URL. Inspect the rendered title, sections, date, images, canonical URL and relevant filters; a successful MDX parse alone is insufficient. For route/API changes, first read the relevant installed guide in `node_modules/next/dist/docs/`.

The sitemap reads raw content while agent search and Markdown use adapters. Check `src/app/sitemap.ts`, `src/lib/agentDocs.ts` and `src/lib/agentApi.ts` when adding a new content family or changing visibility rules. Ordinary posts in an existing family should flow through existing readers without adding separate route code.

Follow the existing redirect approach for moved resources, including the `MOVED` map in the case-study detail page. Leave unrelated imported content untouched.
