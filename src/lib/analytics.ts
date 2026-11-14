"use client";

import { isProduction } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (command: "event", name: string, parameters: Record<string, string>) => void;
  }
}

/** One callback per form instance, called only after HubSpot persists a submission. */
export function createContactLeadTracker(formId: string) {
  let sent = false;
  return () => {
    if (sent || typeof window === "undefined" || !window.gtag || !isProduction || process.env.NODE_ENV !== "production") return;
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
    const adsDestination = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_SEND_TO?.trim();
    const gaEnabled = gaId && /^G-[A-Z0-9]+$/.test(gaId);
    const adsEnabled = adsDestination && /^AW-\d+\/[A-Za-z0-9_-]+$/.test(adsDestination);
    if (!gaEnabled && !adsEnabled) return;

    sent = true;
    // Deliberately exclude submitted fields, email addresses and other lead data.
    if (gaEnabled) window.gtag("event", "generate_lead", { send_to: gaId, form_id: formId, method: "HubSpot" });
    if (adsEnabled) window.gtag("event", "conversion", { send_to: adsDestination });
  };
}
