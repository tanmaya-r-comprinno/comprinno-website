import { NextResponse } from "next/server";

/**
 * CloudScape newsletter sign-up.
 * Forwards the email to a HubSpot form (portal 4699526, region na2) through HubSpot's public
 * Forms submission API: no API key needed, and HubSpot applies the form's own settings
 * (double opt-in, notifications, list membership).
 *
 * Form: "CloudScape newsletter", ID below (public: it is also in HubSpot's embed code).
 * HUBSPOT_NEWSLETTER_FORM_ID in Vercel overrides it, e.g. to point at a different form.
 * Note: this HubSpot form accepts any value, so the email is validated here before sending.
 *
 * The visitor is sent back to the page they came from with ?subscribed=<status>&nl=<form>,
 * which <NewsletterStatus> turns into a message under the right form.
 *   ok       saved in HubSpot
 *   invalid  not an email address
 *   error    HubSpot rejected it or could not be reached
 *   off      no form ID configured yet
 */
const PORTAL = "4699526";
const NEWSLETTER_FORM = "85f10c31-7700-4a1d-8e99-fd6f3deaeb57";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const where = String(form.get("nl") ?? "footer").replace(/[^a-z]/g, "") || "footer";
  const referer = request.headers.get("referer");
  const back = new URL(referer ?? "/resources/blog", request.url);

  let status = "ok";
  const formId = process.env.HUBSPOT_NEWSLETTER_FORM_ID || NEWSLETTER_FORM;
  if (!EMAIL.test(email)) status = "invalid";
  else if (!formId) status = "off";
  else {
    try {
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL}/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [{ objectTypeId: "0-1", name: "email", value: email }],
          context: { pageUri: referer ?? back.href, pageName: "CloudScape newsletter" },
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) {
        status = res.status === 400 ? "invalid" : "error";
        console.error("newsletter: HubSpot responded", res.status, (await res.text()).slice(0, 300));
      }
    } catch (e) {
      status = "error";
      console.error("newsletter: HubSpot unreachable", e);
    }
  }

  // the forms submit with fetch (no page reload); a plain POST without JavaScript gets the redirect
  if (request.headers.get("accept")?.includes("application/json")) return NextResponse.json({ status });

  back.searchParams.set("subscribed", status);
  back.searchParams.set("nl", where);
  back.hash = where === "blog" ? "newsletter" : "footer-newsletter";
  return NextResponse.redirect(back, 303);
}
