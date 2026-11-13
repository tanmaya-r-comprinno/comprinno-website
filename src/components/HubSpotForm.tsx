"use client";

import { useId } from "react";
import Script from "next/script";

type HubSpotForms = {
  forms: {
    create: (options: {
      region: string;
      portalId: string;
      formId: string;
      target: string;
      onFormReady?: () => void;
    }) => void;
  };
};

declare global {
  interface Window {
    hbspt?: HubSpotForms;
  }
}

/**
 * Site styles for the HubSpot form. HubSpot renders the form inside a
 * same-origin iframe, so page CSS can't reach it; this is injected into the
 * iframe once the form is ready. Values mirror the site's .brand tokens
 * (src/app/brand.css) and .btn (src/app/globals.css).
 */
const FORM_CSS = `
  :root {
    --ink: #1c1c1c; --ink-2: #3d3d3d; --muted: #6b6b6b;
    --line-strong: #c8d5e8; --blue: #006bc9; --yellow: #ffbb00; --ochre: #d89f04; --error: #c62828;
  }
  html, body, .hs-form, .hs-form * { font-family: var(--site-font) !important; }
  *, *::before, *::after { border-radius: 0 !important; } /* site uses sharp edges everywhere */
  body { margin: 0; color: var(--ink-2); -webkit-font-smoothing: antialiased; }
  .hs-form fieldset { max-width: none !important; }
  .hs-form fieldset.form-columns-2 .hs-form-field { padding-right: 0.75rem; }
  .hs-form fieldset.form-columns-2 .hs-form-field:last-child { padding-right: 0; }
  .hs-form .hs-form-field { margin-bottom: 0.875rem; }
  .hs-form .hs-form-field > label {
    display: block; margin: 0 0 0.25rem; font-size: 0.875rem !important; font-weight: 500 !important;
    color: var(--ink) !important; line-height: 1.4;
  }
  .hs-form .hs-form-required { color: var(--error) !important; margin-left: 0.125rem; }
  .hs-form .input { margin-right: 0 !important; }
  .hs-form .hs-input:not([type="checkbox"]):not([type="radio"]) {
    box-sizing: border-box; width: 100% !important; height: auto !important; min-height: 2.5rem;
    padding: 0.5rem 0.75rem !important; border: 1px solid var(--line-strong) !important; border-radius: 0 !important;
    background: #fff !important; box-shadow: none !important;
    font-size: 0.875rem !important; line-height: 1.4 !important; color: var(--ink) !important;
    transition: border-color 0.15s ease;
  }
  .hs-form .hs-input::placeholder { color: var(--muted); opacity: 1; }
  .hs-form .hs-input:focus { border-color: var(--blue) !important; outline: none !important; }
  .hs-form select.hs-input {
    appearance: none; -webkit-appearance: none; padding-right: 2.25rem !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%233d3d3d' stroke-width='1.5'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important; background-position: right 0.75rem center !important;
  }
  .hs-form select.hs-input.is-placeholder { color: var(--muted) !important; }
  .hs-form textarea.hs-input { min-height: 4.5rem; resize: vertical; }
  .hs-form .hs-input.invalid.error { border-color: var(--error) !important; }
  .hs-form .hs-error-msgs { margin: 0.25rem 0 0; padding: 0; list-style: none; }
  .hs-form .hs-error-msgs label, .hs-form .hs-error-msg { font-size: 0.75rem !important; color: var(--error) !important; font-weight: 400 !important; }
  .hs-form .legal-consent-container, .hs-form .hs-richtext,
  .hs-form .legal-consent-container .hs-form-booleancheckbox-display > span {
    font-size: 0.75rem !important; line-height: 1.5 !important; color: var(--ink-2) !important;
  }
  .hs-form .legal-consent-container .hs-form-booleancheckbox-display { display: flex; gap: 0.625rem; align-items: flex-start; }
  .hs-form .legal-consent-container .hs-form-booleancheckbox-display > span { margin-left: 0 !important; }
  .hs-form .legal-consent-container ul { margin: 0; padding: 0; list-style: none; }
  .hs-form .legal-consent-container .hs-form-booleancheckbox { margin-bottom: 0.375rem; }
  .hs-form input[type="checkbox"] { width: 1rem; height: 1rem; margin: 0.1rem 0 0; flex-shrink: 0; accent-color: var(--blue); }
  .hs-form a { color: var(--ink) !important; text-decoration: underline; text-underline-offset: 2px; }
  .hs-form .hs_submit { margin-top: 0.5rem; }
  .hs-form .actions { margin: 0 !important; padding: 0 !important; }
  .hs-form .hs-button, .hs-form input[type="submit"] {
    display: inline-flex; align-items: center; justify-content: center; min-height: 2.9rem;
    padding: 0 1.25rem !important; border: 1.5px solid var(--yellow) !important;
    background: var(--yellow) !important; color: var(--ink) !important; box-shadow: none !important;
    font-size: 0.95rem !important; font-weight: 600 !important; line-height: 1 !important;
    cursor: pointer; transition: background-color 0.15s ease, transform 0.15s ease;
  }
  .hs-form .hs-button:hover, .hs-form input[type="submit"]:hover { background: var(--ochre) !important; border-color: var(--ochre) !important; }
  .hs-form .hs-button:active { transform: translateY(1px); }
  .hs-form .hs-button:focus-visible { outline: 2px solid var(--blue) !important; outline-offset: 2px; }
  .hs-form__virality-link, iframe[src*="embedded-viral-link"] { display: none !important; } /* HubSpot free-plan branding */
  .submitted-message { font-size: 1rem; line-height: 1.6; color: var(--ink); }
`;

/** Copy the page's @font-face rules (self-hosted Inter) into the iframe, with absolute URLs. */
function fontFaceCss(): string {
  const rules: string[] = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let cssRules: CSSRuleList;
    try {
      cssRules = sheet.cssRules;
    } catch {
      continue; // cross-origin stylesheet
    }
    for (const rule of Array.from(cssRules)) {
      if (rule instanceof CSSFontFaceRule) {
        const base = sheet.href ?? document.baseURI;
        rules.push(rule.cssText.replace(/url\((['"]?)([^'")]+)\1\)/g, (_m, _q, u) => `url("${new URL(u, base).href}")`));
      }
    }
  }
  return rules.join("\n");
}

function styleIframe(target: HTMLElement) {
  const iframe = target.querySelector("iframe");
  const doc = iframe?.contentDocument;
  if (!iframe || !doc?.head || doc.getElementById("site-form-styles")) return;
  const style = doc.createElement("style");
  style.id = "site-form-styles";
  const font = getComputedStyle(document.body).fontFamily;
  style.textContent = `${fontFaceCss()}\n:root { --site-font: ${font}; }\n${FORM_CSS}`;
  doc.head.appendChild(style);

  // HubSpot sizes the iframe before our styles change the layout; keep it fitted to the content.
  const fit = () => {
    const h = doc.documentElement.scrollHeight;
    if (h > 0) iframe.style.height = `${h}px`;
  };
  fit();
  if (doc.body) new ResizeObserver(fit).observe(doc.body);
}

/**
 * HubSpot embedded form (same embed as the WordPress site), so HubSpot's own
 * captcha, validation, consent checkboxes and thank-you message all apply.
 */
export default function HubSpotForm({
  portalId,
  formId,
  region = "na2",
  fallbackEmail,
}: {
  portalId: string;
  formId: string;
  region?: string;
  fallbackEmail: string;
}) {
  // useId output contains ":" which isn't valid in a CSS selector.
  const targetId = `hs-form-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <>
      <div id={targetId} className="min-h-[28rem]">
        <noscript>
          <p className="text-sm text-muted">
            Our contact form needs JavaScript. Please email{" "}
            <a href={`mailto:${fallbackEmail}`} className="font-medium text-ink underline underline-offset-2">
              {fallbackEmail}
            </a>{" "}
            instead.
          </p>
        </noscript>
      </div>
      <Script
        id="hubspot-forms-embed"
        src={`https://js-${region}.hsforms.net/forms/embed/v2.js`}
        strategy="afterInteractive"
        onReady={() => {
          const el = document.getElementById(targetId);
          if (!el || !window.hbspt) return;
          el.innerHTML = ""; // avoid a duplicate form after client-side navigation
          window.hbspt.forms.create({
            region,
            portalId,
            formId,
            target: `#${targetId}`,
            onFormReady: () => styleIframe(el),
          });
        }}
      />
    </>
  );
}
