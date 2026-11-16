---
name: comprinno-ui
description: Implement or adjust pages, shared components, brand styling, and embedded forms in the Comprinno Next.js website. Use for frontend work in comprinno-website that must match its existing UI and integrations.
---

# Comprinno UI

Read `AGENTS.md` and the relevant installed Next.js guide in `node_modules/next/dist/docs/` before using framework APIs. Use `README.md` for the project overview and inspect a neighboring current page for implementation patterns.

## Extend the existing page system

`src/app/layout.tsx` supplies the header, footer, skip link, main landmark, analytics and browser agent tools. Page content goes inside that existing main landmark. Shared navigation and contact information come from `src/lib/site.ts`.

Reuse the primitives in `src/components/ui.tsx`: `Container`, `Section`, `SectionHead`, `PageHero`, `Button`, `Faq`, and `CtaBand`. Inspect their props rather than creating parallel primitives. Use typed content in `src/content/` where the existing page already draws from it.

Styling has three layers:

- `src/app/globals.css`: Tailwind v4 imports, base tokens, shared classes and a global sharp-corner override.
- `src/app/brand.css`: brand tokens and component overrides activated by a `.brand` page wrapper; includes deliberate dark bands.
- `src/app/motion.css`: shared animation behavior.

Match the affected page's wrapper and tokens. Adding rounded utilities will not overcome the global `border-radius: 0 !important`. Avoid changing global styles to solve a local layout issue. Reuse existing art or illustration components where they fit, and preserve reduced-motion behavior when editing animation.

Use server components for static page composition and small client components for interactions, following current neighboring implementations. Dynamic content pages use promised route params, generated static params, metadata and sometimes `instant = false`; read the installed documentation and the specific route before changing those settings.

## Work with the actual integrations

The contact page uses `src/components/HubSpotForm.tsx`. HubSpot owns fields, consent, captcha and the submitted message. Styling is injected into its same-origin iframe; parent-page CSS cannot reach the form. Inspect its `FORM_CSS`, font injection and resize behavior together for visual fixes. Keep the embedded form identity and integration unless the task explicitly changes them.

`contactHref(topic, from)` adds context query parameters, but the existing form does not consume them. Do not claim a selected service or topic is prefilled without implementing and verifying that behavior.

Newsletter links use the HTTPS hosted HubSpot form configured by `NEWSLETTER_SIGNUP_URL`. When missing, `NewsletterSignup.tsx` displays an unavailable message and collects no email. The legacy POST redirects to the hosted form or returns 503; it never claims a subscription has been saved. Verify the provider's newsletter consent and confirmation separately.

Contact conversions use `src/lib/analytics.ts` through HubSpot's `onFormSubmitted`, once per form instance. Keep submitted field values out of tracking. GA4 key-event and Ads action configuration are separate account-side steps; never count both a direct Ads action and an imported GA4 lead as primary conversions for the same submission.

Careers data comes from `src/lib/keka.ts`, cached with `cacheLife("hours")`, and renders through the careers page and `JobsBoard.tsx`; an empty list can reflect a feed failure.

## Verify the changed experience

Run the checks specified in `AGENTS.md` as appropriate to the change. For UI changes, inspect the affected page in a browser at narrow and wide widths, including navigation, keyboard focus, overflow and changed interactions. For iframe changes, wait for the actual HubSpot form and check its height and controls without submitting a real lead unless requested.

For new or renamed routes, inspect canonical metadata, navigation, sitemap, redirects and `src/lib/agentDocs.ts` coverage. Preserve staging noindex behavior in `src/lib/site.ts`, metadata and `next.config.ts`. Commit, push and deployment actions follow the user's requested scope and the shared-checkout rules in `AGENTS.md`.
