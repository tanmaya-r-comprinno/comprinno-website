# Comprinno website

Next.js (App Router, TypeScript, Tailwind v4). Deploys to Vercel with zero config: push the repo, import it, done.

```bash
npm run dev     # http://localhost:3000
npm run build   # every page is prerendered static
npm run lint
```

## Principles

- **Fast on slow networks.** All pages are static. No images yet (inline SVG only), one self-hosted font (Inter, latin subset), about 6 KB gzipped CSS. The only client component is the mobile menu. Desktop dropdowns, FAQs and the mobile toggle use CSS and native `<details>`. The contact form works without JavaScript.
- **Light only.** `color-scheme: light`, and the darkest tone is slate-700 text. No dark sections, no images with dark backgrounds.
- **Low fidelity first.** All colour lives in `@theme` at the top of `src/app/globals.css`. Swap `--color-accent*` for brand colour later and everything follows.
- **Agentic-first design language** (deliberately different from the reference site): a dot-grid "blueprint" canvas, live-status eyebrow chips (instead of bracket labels), agent pipeline and trace motifs, numbered steps, and human-sign-off as a recurring idea.
- **Accessible and responsive.** Mobile-first, 44px+ touch targets, skip link, focus rings, and animations that switch off for `prefers-reduced-motion` and `prefers-reduced-data`.

## Structure

```
src/content/    copy as typed data (services, industries, cases, company). Edit words here.
src/components/ ui primitives, Header (+ MobileNav), Footer, AgentFlow hero diagram
src/app/        routes: /, /services/[slug], /industries, /tevico, /case-studies/[slug],
                /blog, /newsroom, /partnerships/aws, /about, /careers, /contact, /privacy-policy
```

## Open TODOs

- `src/app/api/contact/route.ts` validates the form but does not send it anywhere yet.
- Blog, newsroom, careers roles and privacy policy text still need migrating from comprinno.net.
- Case studies show a summary only. Full write-ups are needed.
- Logo is a placeholder paper-plane mark. Leadership portraits are placeholder boxes.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel (used for sitemap and canonical URLs).
- The source site's stat counters rendered as placeholders when crawled, so only figures stated in body text are used. Confirm them.
