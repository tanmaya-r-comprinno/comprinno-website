import { NextResponse } from "next/server";

/**
 * Contact form handler (STUB).
 * TODO: forward to the real destination (email via Resend/SES, HubSpot, or CRM)
 * using env vars set in Vercel. Until then submissions are validated and dropped.
 */
export async function POST(request: Request) {
  const form = await request.formData();
  const get = (k: string) => String(form.get(k) ?? "").trim();

  // Honeypot: bots fill hidden fields. Pretend success.
  if (get("website")) return NextResponse.redirect(new URL("/contact/thanks", request.url), 303);

  const email = get("email");
  const required = ["name", "company", "country", "topic", "consent"];
  if (required.some((k) => !get(k)) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.redirect(new URL("/contact?error=1", request.url), 303);
  }

  // TODO: send message here.
  return NextResponse.redirect(new URL("/contact/thanks", request.url), 303);
}
