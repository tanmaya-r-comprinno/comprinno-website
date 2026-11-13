import { NextResponse, type NextRequest } from "next/server";

/**
 * "Talk to an expert" form handler.
 *
 * Submits to the same HubSpot form the WordPress site used, via the HubSpot
 * Forms Submissions API (no API key needed; portal and form IDs are public).
 * IDs can be overridden per environment with HUBSPOT_PORTAL_ID / HUBSPOT_FORM_ID.
 * Docs: https://developers.hubspot.com/docs/api/marketing/forms (v3 integration submit)
 */
const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? "4699526";
const FORM_ID = process.env.HUBSPOT_FORM_ID ?? "aa061395-24b5-4af9-b053-79820f06dd18";
const ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

// Subscription types configured on the HubSpot form's consent settings.
const SUBSCRIPTION_PRIVACY = 5213900;
const SUBSCRIPTION_MARKETING = 5917882;

// Our topic chips -> HubSpot "Area Of Interest" (service_interested) options.
// Topics without a matching option are still captured in the message.
const TOPIC_TO_SERVICE: Record<string, string> = {
  "Migrate to the cloud": "Cloud Migration",
  "Modernize applications": "Application Modernization",
  "Managed services": "Cloud Governance & Management",
  "Cost and performance": "Well-Architected Framework Review",
};

const MAX_LEN = 2000;

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, MAX_LEN);

  // Honeypot: bots fill hidden fields. Pretend success.
  if (get("website")) return redirect(request, "/contact/thanks");

  const email = get("email");
  const required = ["name", "company", "country", "topic", "consent"];
  if (required.some((k) => !get(k)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect(request, "/contact?error=1");
  }

  // HubSpot wants first/last name; our form collects a single full name.
  const [firstname, ...rest] = get("name").split(/\s+/);
  const lastname = rest.join(" ");
  const topic = get("topic");
  const service = TOPIC_TO_SERVICE[topic];
  const details = get("message");
  const message = [`Topic: ${topic}`, details].filter(Boolean).join("\n\n");

  const fields: { objectTypeId: string; name: string; value: string }[] = [
    { objectTypeId: "0-1", name: "firstname", value: firstname },
    { objectTypeId: "0-1", name: "lastname", value: lastname },
    { objectTypeId: "0-1", name: "email", value: email },
    { objectTypeId: "0-1", name: "phone", value: get("phone") },
    { objectTypeId: "0-2", name: "name", value: get("company") },
    { objectTypeId: "0-1", name: "country", value: get("country") },
    { objectTypeId: "0-1", name: "service_interested", value: service ?? "" },
    { objectTypeId: "0-1", name: "message", value: message },
  ].filter((f) => f.value);

  const hutk = request.cookies.get("hubspotutk")?.value;
  const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const pageUri = request.headers.get("referer") ?? new URL("/contact", request.url).toString();

  const payload = {
    submittedAt: Date.now().toString(),
    fields,
    context: {
      pageUri,
      pageName: "Talk to an expert",
      ...(hutk ? { hutk } : {}),
      ...(ipAddress ? { ipAddress } : {}),
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: "I agree to Comprinno processing my information in line with the Privacy policy.",
        communications: [
          {
            value: true,
            subscriptionTypeId: SUBSCRIPTION_PRIVACY,
            text: "By submitting, you consent to Comprinno processing your information in accordance with our Privacy Policy.",
          },
          {
            value: Boolean(get("marketing")),
            subscriptionTypeId: SUBSCRIPTION_MARKETING,
            text: "Yes, I would like to receive emails from Comprinno. I may unsubscribe or change my email preferences at any time.",
          },
        ],
      },
    },
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      // Logged to Vercel function logs; never includes the visitor's details.
      console.error("HubSpot submission failed", res.status, (await res.text()).slice(0, 500));
      return redirect(request, "/contact?error=1");
    }
  } catch (err) {
    console.error("HubSpot submission error", err instanceof Error ? err.message : err);
    return redirect(request, "/contact?error=1");
  }

  return redirect(request, "/contact/thanks");
}

function redirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}
