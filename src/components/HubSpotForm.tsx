"use client";

import { useId } from "react";
import Script from "next/script";

type HubSpotForms = {
  forms: {
    create: (options: { region: string; portalId: string; formId: string; target: string }) => void;
  };
};

declare global {
  interface Window {
    hbspt?: HubSpotForms;
  }
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
      <div id={targetId} className="hs-form-embed min-h-[28rem]">
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
          window.hbspt.forms.create({ region, portalId, formId, target: `#${targetId}` });
        }}
      />
    </>
  );
}
