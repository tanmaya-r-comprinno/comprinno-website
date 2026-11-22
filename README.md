# Comprinno website

Marketing website for Comprinno, an AWS Premier Tier cloud and AI partner. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 and Node.js 24. Typed data and MDX supply both the website and its public agent interfaces.

## Local development

Use Node.js 24 and install dependencies from the lockfile:

```bash
npm ci
npm run dev     # http://localhost:3000
```

Validation and production preview:

```bash
npm run lint
npx tsc --noEmit -p .
npm run build
npm run start   # serves the production build on port 3000
```

There is no test framework configured. Verify changes with a production build and inspect the affected page or endpoint using a browser or curl. Build before every commit. Next.js generates route types during development and builds; a fresh checkout may need a build before a standalone type check.

Cache Components and partial prefetching are enabled. Many pages are prerendered, while APIs and other routes can render at request time. Request-independent GET handlers may be prerendered too, so their environment values can be baked in during the build.

Before using Next.js APIs, read the relevant version-specific guide in `node_modules/next/dist/docs/`. See [AGENTS.md](AGENTS.md) for repository conventions and operational constraints.

## Configuration

Set local overrides in `.env.local`; environment files are gitignored.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Origin for canonical URLs, sitemap, agent documents and indexing rules. Defaults to `https://comprinno.net`. Set `http://localhost:3000` for local URLs. |
| `OAUTH_SIGNING_KEY` | Optional sensitive OAuth signing key. Without it, OAuth endpoints and metadata return 404; anonymous public agent access remains available. See `src/lib/oauth.ts` for its format. |
| `DEPLOY_SHA` | Commit identifier injected by deployment and returned in `X-Deploy-Sha`; defaults to `dev` locally. |
| `NEXT_PUBLIC_GTM_ID` | Optional Google Tag Manager web container ID (`GTM-…`). Takes precedence over a direct GA4 tag; publish the Google Analytics tag inside this container. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (`G-…`). Targets confirmed contact lead events; also loads the Google tag directly when no valid GTM container ID is set. |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO` | Optional direct Google Ads lead action (`AW-…/conversion-label`). Use an actual Ads action label; leave unset when importing the GA4 lead conversion instead. |
| `HUBSPOT_NEWSLETTER_FORM_ID` | Optional override for the CloudScape newsletter form ID (default `85f10c31-7700-4a1d-8e99-fd6f3deaeb57`, portal `4699526`). Footer/blog forms submit through `/api/subscribe`. |
| `GOOGLE_SITE_VERIFICATION` | Optional Search Console HTML verification token, rendered as a meta tag on production only. Obtain the token from the intended Search Console property. |
| `VOXSPHERE_API_URL` | VoxSphere base URL for the SDR campaign voice calls. |
| `VOXSPHERE_API_KEY` | Server-only VoxSphere key with access to the five fictional SDR buyers. |
| `VISITOR_ID_SALT` | Stable server-only random secret used to hash visitor identifiers and sign private call-report access. |

Only the exact production origin, `https://comprinno.net`, permits indexing. Other configured origins send `X-Robots-Tag: noindex, nofollow`, disable indexing in page metadata and serve a disallow-all `robots.txt`. Set the intended configuration before building.

## Repository structure

```text
src/app/           App Router pages, API handlers, metadata routes and styles
src/components/    Shared UI, navigation, illustrations and client interactions
src/content/       Typed marketing data, MDX and legacy redirect/image maps
src/lib/           Content readers, site configuration, agent interfaces and OAuth
src/proxy.ts       Accept: text/markdown negotiation for page requests
public/            Images, partner logos, badges and other static assets
scripts/           Content extraction utility
.agents/skills/    Repository-specific Codex skills
.github/workflows/ Deployment to Vercel through GitHub Actions
```

Main page families:

- Services: `/services/migrate`, `/services/modernize`, `/services/manage`, `/services/maximize`.
- Products: `/platform`, `/products/veriq`, `/products/voxsphere`, `/products/weave`.
- Resources: `/resources/blog`, `/resources/case-studies`, `/resources/newsroom`, `/resources/free-genai-consulting`, `/resources/aws-lift`.
- Partnerships: `/partnerships/aws`, `/partnerships/openai`, `/partnerships/anthropic`. The `/partnerships` index is intentionally hidden and returns 404.
- Company and general pages: `/company/about`, `/company/careers`, `/industries`, `/contact`, `/privacy-policy`.

Legacy routes redirect through `next.config.ts` and `src/content/wordpressRedirects.json`.

## Content and UI

Edit shared copy in `src/content/`; some page-specific copy remains inline in page components. Blog posts, case studies and newsroom releases live in their respective MDX directories. `src/lib/content.ts` reads frontmatter, and `blog.ts`, `caseStudies.ts` and `news.ts` clean imported WordPress content for display.

MDX filenames determine public slugs. Production excludes drafts, and the blog/case-study adapters also filter very short imported bodies. Check the adapter when source content differs from the page. Restored diagrams use `src/content/images.json` and assets under `public/images/content/`.

Shared primitives live in `src/components/ui.tsx`. Base tokens and shared rules are in `src/app/globals.css`; `.brand` wrappers activate the palette and overrides in `src/app/brand.css`. Shared animations are in `src/app/motion.css`. The site uses a light color scheme with deliberate dark brand bands and globally enforced sharp corners. Preserve keyboard navigation, focus visibility, responsive layouts and reduced-motion behavior.

Navigation, contact information and site-origin logic live in `src/lib/site.ts`. Check sitemap, canonical metadata, redirects and agent Markdown coverage when adding or moving pages.

SEO helpers in `src/lib/seo.ts` supply service metadata, contextual service links and structured data. The layout includes Organization JSON-LD; blog, case-study and newsroom detail pages include Article and BreadcrumbList data. The sitemap uses the display readers, excludes moved case-study aliases and omits unverified modification dates.

## Integrations

- **Contact:** `/contact` embeds the existing HubSpot form through `src/components/HubSpotForm.tsx`. HubSpot owns fields, captcha, consent and the submitted message. The component injects styles into the same-origin iframe and adjusts its height. Context query parameters from `contactHref()` are not consumed by the form.
- **Careers:** `src/lib/keka.ts` reads the Keka jobs feed with an hourly cache profile. Feed errors return an empty list.
- **Newsletter:** Footer and blog email forms submit through `/api/subscribe` to the existing CloudScape HubSpot form `85f10c31-7700-4a1d-8e99-fd6f3deaeb57` (portal `4699526`), optionally overridden by `HUBSPOT_NEWSLETTER_FORM_ID`. Visitors return to the signup section with a success, invalid-email, unavailable or error message. Success is shown only after HubSpot accepts the submission. Configure newsletter consent, subscription and double opt-in in HubSpot; verify those account settings separately.
- **Analytics:** The root layout includes Vercel Analytics and Speed Insights. `src/components/GoogleTracking.tsx` adds optional Google Tag Manager / GA4 using the Google tag loader after hydration, without an additional dependency. Google tracking runs only in production builds configured for `https://comprinno.net`; staging and development are excluded. Missing or invalid IDs load no Google tag. Set the relevant public tracking IDs in Vercel's Production environment before building/deploying.

When GTM is configured, publish the GA4 Google tag and its page-view measurement in that container. The website does not also install GA4 directly. For direct GA4, configure enhanced measurement for browser-history navigation. For GTM, configure SPA page views in GTM and avoid also enabling automatic history page views for the same traffic. Verify one initial and one navigation `page_view` in Tag Assistant / GA4 DebugView after activation; loading a container alone does not prove GA4 is configured or receiving data.

The contact embed's `onFormSubmitted` callback sends `generate_lead` to the configured GA4 measurement ID only after HubSpot confirms persistence, once per form instance. No submitted field values are passed to analytics. Mark the event as a key event in GA4 and configure/import the intended Ads conversion in the account. A direct Ads `conversion` event is sent only when `NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO` is set; avoid counting both a direct Ads action and an imported GA4 lead as primary conversions for the same submission. Staging/development send neither event.

## Public agent interfaces

The site exposes public content through:

- `/llms.txt` for the site index.
- Page URLs requested with `Accept: text/markdown`, rewritten by `src/proxy.ts` to Markdown handlers.
- `/mcp`, a stateless JSON-RPC MCP endpoint accepting HTTP POST, with `search_content`, `get_page`, `get_site_index` and `get_contact_info`.
- Feature-detected WebMCP browser tools: `search_content`, `get_page`, `open_page` and `get_contact_info`.
- Explicit `/.well-known/` discovery aliases for catalogs, server metadata and generated public skill documents.
- `/auth.md` and optional OAuth supporting the `public:read` scope.

Shared implementation lives in `src/lib/agentApi.ts`, `agentDocs.ts`, `agentDiscovery.ts` and `oauth.ts`. Page Markdown uses explicit mappings; new pages do not automatically gain Markdown coverage. Public skill documents are generated separately from the development skills in `.agents/skills/`.

See [AGENTS.md](AGENTS.md) for OAuth security invariants, discovery routing and required browser verification after authentication changes.

## Deployment

The source repository is `github.com/comprinnotech/comprinno-website`. Deployments run through [the GitHub Actions workflow](.github/workflows/deploy.yml); native Vercel Git deployments are disabled in `vercel.json`.

| Branch | Vercel environment | Site |
| --- | --- | --- |
| `dev` | Preview, aliased after deployment | `https://staging.comprinno.net` |
| `main` | Production | `https://comprinno.net` |

Production changes go through a `dev` → `main` pull request. The workflow uses repository secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`. Configure `NEXT_PUBLIC_SITE_URL` and separate OAuth signing keys in the appropriate Vercel environments; never commit their sensitive values.

[Validate and deploy](.github/workflows/deploy.yml) runs once per push to `dev`/`main` (or manual dispatch), in one job named `Validate`. To minimize Actions minutes, the runner only installs the cached Vercel CLI, deploys and verifies the live commit. Vercel installs app dependencies, builds and checks TypeScript remotely. Run lint locally; there is no lint check in Actions. There is no separate pull-request run, so an open `dev` → `main` PR does not duplicate validation. Keep `Validate` required in `main` branch protection; the required check confirms a successful deployment.

The workflow re-authors HEAD only inside its runner so Vercel accepts the deployment; the repository commit keeps its original author. It verifies the live site's `X-Deploy-Sha` against the GitHub commit and tags verified production deployments as `prod-YYYY.MM.DD.N` using the UTC date.

Several people and agents share this checkout. Before committing, check the current branch, fetch origin and inspect status; stage only your own files or hunks. Detailed deployment, DNS and collaboration rules are maintained in [AGENTS.md](AGENTS.md).

## Repository skills

- [comprinno-content](.agents/skills/comprinno-content/SKILL.md): content publishing, import cleanup and rendered-content checks.
- [comprinno-ui](.agents/skills/comprinno-ui/SKILL.md): page composition, brand styling and embedded integrations.
- [comprinno-agent-interfaces](.agents/skills/comprinno-agent-interfaces/SKILL.md): MCP, WebMCP, Markdown, discovery and OAuth maintenance.
