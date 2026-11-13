<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Comprinno website: guide for agents

Marketing site for Comprinno (AWS Premier Tier cloud and AI partner). Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Node 24. Content is MDX and typed data in `src/content`.

## Commands

```bash
npm run dev     # http://localhost:3000
npm run build   # production build; run before every commit
npm run lint    # eslint
npx tsc --noEmit -p .
```

No test framework is set up. Verify changes with a build, then check the page or endpoint with `curl` (or `npx next start -p <port>` after a build).

## Next.js 16 specifics used here

- `cacheComponents: true` in `next.config.ts`. GET route handlers that read no request data are prerendered at build time (shown as `○` in build output); env vars they read are baked in at build.
- Request interception lives in `src/proxy.ts` (`middleware.ts` is deprecated and renamed to `proxy`).
- Route handler context type: `RouteContext<"/path/[param]">` (global, generated at build).
- `robots.ts` supports non-standard lines via `rules.other` (used for `Content-Signal` and `Agentmap`).

## Repos, branches and who works here

- Source of truth: `github.com/comprinnotech/comprinno-website` (`origin`). Branches: `dev` (staging) and `main` (production). Production changes go in via PR `dev` -> `main`.
- Tanmaya also works in `github.com/tanmaya-r-comprinno/comprinno-website`. To pull that work in: fetch it into a temporary ref, merge `tanmaya/main` into `dev` with `--no-ff`, build, push, then delete the temporary refs. When it conflicts with `src/app/contact/page.tsx`, keep ours (the HubSpot embed).
- **Several people and agents share this checkout.** The branch is often switched (to `main`) and others commit staged files. Before any commit: `git branch --show-current`, `git fetch origin`, `git status --short`. Stage only your own files (or hunks). Never run status and commit in parallel tool calls.

## Deployment (Vercel)

- Vercel team `comprinno-tech` ("Website-Development", Pro), project `comprinno-website`, owner account marketing@comprinno.net.
- **Deploys only run from GitHub Actions** (`.github/workflows/deploy.yml`). Native Git deploys are off (`vercel.json` -> `git.deploymentEnabled: false`) because Vercel blocks deployments whose commit author isn't a team member. The workflow re-authors HEAD inside the runner only (never pushed) and deploys with the `VERCEL_TOKEN` secret.
- `dev` push: Preview deployment, then aliased to `staging.comprinno.net`.
- `main` push: Production (`comprinno.net`; `www` redirects to it).
- Every deploy passes `DEPLOY_SHA`; the site returns it in the `X-Deploy-Sha` header and the workflow waits until the live site serves that commit.
- Every verified production deploy is tagged `prod-YYYY.MM.DD.N` (UTC date, N per day) on the real GitHub commit.
- Repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- Vercel env vars: `NEXT_PUBLIC_SITE_URL` (Production `https://comprinno.net`, Preview `https://staging.comprinno.net`) and `OAUTH_SIGNING_KEY` (separate key per environment, sensitive). Never print or commit their values.
- Staging and production are both public (no Vercel login). Staging must stay out of search: anything not on the production URL sends `X-Robots-Tag: noindex, nofollow` and a disallow-all `robots.txt` (`isProduction` in `src/lib/site.ts`).

## DNS and email

- `comprinno.net` DNS is in AWS Route 53 (registrar DreamHost). Apex A records and the `www` and `staging` CNAMEs point at Vercel. The AWS profiles on dev machines generally can't reach this zone.
- Do not change: Google Workspace MX, SPF, DKIM (`google._domainkey`), DMARC, and `portal.comprinno.net` (CloudFront). Copies of these records also exist in Vercel DNS, but the nameservers are not on Vercel.

## Code map

- `src/content/`: words and data. `services.ts`, `products.ts`, `company.ts`, `badges.ts`, `privacy.ts`, MDX in `blog/`, `case-studies/`, `news/`. `wordpressRedirects.json` holds 301s for old WordPress URLs (spread into `redirects()` in `next.config.ts`).
- `src/lib/`: content readers and clean-up (`blog.ts`, `caseStudies.ts`, `news.ts`, `content.ts`), `site.ts` (site URL, nav, contacts, `isProduction`).
- `src/components/`: UI. `HubSpotForm.tsx` is the contact form.
- The whole site has sharp corners (`border-radius: 0 !important` globally); brand tokens are in `src/app/brand.css`.

## Contact form (HubSpot)

- `/contact` embeds HubSpot form `aa061395-24b5-4af9-b053-79820f06dd18` (portal `4699526`, region `na2`), the same form as the old WordPress site. HubSpot owns fields, captcha, consent and the thank-you message; change fields in HubSpot, not here.
- The form renders in a same-origin iframe, so page CSS can't style it. `HubSpotForm.tsx` injects site styles into the iframe on `onFormReady` and resizes the iframe to its content.
- Don't submit the form server-side: HubSpot rejects API submissions while its captcha is on.
- Links built with `contactHref(topic, from)` add `?topic=&from=`; HubSpot ignores them.
- `src/app/api/subscribe/route.ts` (newsletter) is still a stub: it validates and drops the address.

## AI agent interfaces

All public and read-only. Shared logic: `src/lib/agentDocs.ts` (llms.txt and page Markdown), `src/lib/agentApi.ts` (tools and search), `src/lib/agentDiscovery.ts` (discovery docs), `src/lib/oauth.ts`. Keep them describing only what really works.

- `/llms.txt`: site index generated from content.
- Markdown for agents: any page URL with `Accept: text/markdown` is rewritten by `src/proxy.ts` to `/api/md/...` and returns Markdown (`Vary: Accept`, `x-markdown-tokens`).
- `/mcp`: stateless MCP server (Streamable HTTP, JSON responses). Tools: `search_content`, `get_page`, `get_site_index`, `get_contact_info`. Tokens are optional; an invalid token gets 401 with `WWW-Authenticate`.
- WebMCP: `src/components/WebMcpTools.tsx` registers the same tools via `document.modelContext` (feature-detected).
- Discovery under `/.well-known/` is rewritten to `src/app/api/agents/[...doc]`: `mcp/server-card.json`, `api-catalog`, `ai-catalog.json`, `agent-skills/index.json` (+ `SKILL.md` files with sha256 digests), `poppy.json`, and the OAuth documents. Each path is listed explicitly in `next.config.ts` `rewrites()`; never add a `/.well-known/:path*` wildcard (it would capture certificate challenges).
- `/auth.md`: documents anonymous access and an `agent_auth` block.
- `robots.txt` carries `Content-Signal: search=yes, ai-input=yes, ai-train=yes` on production; every page sends `Link` headers for `llms.txt`, the API catalog and the AI catalog.

### OAuth (`src/lib/oauth.ts`, `src/app/oauth/*`)

- Minimal, real authorization server for the public scope `public:read` only: authorization code + PKCE S256, `client_credentials` for anonymous agents, stateless dynamic client registration. Tokens are ES256 JWTs (1 hour, no refresh), keys published at `/.well-known/jwks.json`.
- Without `OAUTH_SIGNING_KEY` every OAuth route and metadata document returns 404 and `auth.md` says there is no OAuth.
- Security rules that must stay: the consent page never redirects without a click; the consent POST is accepted only from our own page (Origin or `Sec-Fetch-Site: same-origin`); redirect URIs are https, loopback http or app schemes, never `javascript:`/`data:`/fragments; the consent page sends `frame-ancestors 'none'` and `Referrer-Policy: same-origin`. Don't add CSP `form-action` (Chrome applies it to the post-consent redirect) or `Referrer-Policy: no-referrer` (Chrome then sends `Origin: null`).
- After changing OAuth, test the flow in a real browser (click Continue), not only with scripted requests.

### Agent-readiness scan

`https://isitagentready.com/<domain>` (API: `POST https://isitagentready.com/api/scan`). Staging and production reach Level 5. Still failing: DNS-AID (needs `_mcp._agents` / `_index._agents` SVCB records in Route 53, plus DNSSEC, which is a separate and risky change). WebMCP sometimes shows "Browser session timed out"; that is the scanner, rescan.

## Conventions

- Match existing code style; no new dependencies without a clear need (crypto, JWT and MCP are hand-written with Node built-ins on purpose).
- Read `node_modules/next/dist/docs/` before using a Next.js API.
- Commit messages: `feat(...)`, `fix(...)`, `chore(...)`, `ci(...)`.
- Don't commit `.env*` or `.vercel/` (both gitignored).
