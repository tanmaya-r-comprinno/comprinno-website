import { NextResponse } from "next/server";

/**
 * CloudScape newsletter sign-up.
 * Forwards the email to a HubSpot form (portal 4699526, region na2) through HubSpot's public
 * Forms submission API: no API key needed, and HubSpot applies the form's own settings
 * (double opt-in, notifications, list membership).
 *
 * Set HUBSPOT_NEWSLETTER_FORM_ID in Vercel (Project → Settings → Environment Variables).
 * Until it is set, sign-ups are NOT stored, and the visitor is told so instead of being thanked.
 *
 * The visitor is sent back to the page they came from with ?subscribed=<status>&nl=<form>,
 * which <NewsletterStatus> turns into a message under the right form.
 *   ok       saved in HubSpot
 *   invalid  not an email address
 *   error    HubSpot rejected it or could not be reached
 *   off      no form ID configured yet
 */
const PORTAL = "4699526";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const where = String(form.get("nl") ?? "footer").replace(/[^a-z]/g, "") || "footer";
  const referer = request.headers.get("referer");
  const origin = new URL(request.url).origin;
  let back = new URL("/resources/blog", origin);
  if (referer) {
    try {
      const candidate = new URL(referer);
      if (candidate.origin === origin) back = candidate;
    } catch { /* Keep the local fallback for invalid referrers. */ }
  }

  let status = "ok";
  const formId = process.env.HUBSPOT_NEWSLETTER_FORM_ID;
  if (!EMAIL.test(email)) status = "invalid";
  else if (!formId) status = "off";
  else {
    try {
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [{ objectTypeId: "0-1", name: "email", value: email }],
          context: { pageUri: back.href, pageName: "CloudScape newsletter" },
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        status = res.status === 400 ? "invalid" : "error";
        console.error("newsletter: HubSpot responded", res.status);
      }
    } catch (e) {
      status = "error";
      console.error("newsletter: HubSpot unreachable", e);
    }
  }

  back.searchParams.set("subscribed", status);
  back.searchParams.set("nl", where);
  back.hash = where === "blog" ? "newsletter" : "footer-newsletter";
  return NextResponse.redirect(back, 303);
}
