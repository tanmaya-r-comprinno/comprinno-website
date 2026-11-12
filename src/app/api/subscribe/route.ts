import { NextResponse } from "next/server";

/**
 * CloudScape newsletter sign-up (STUB).
 * TODO: forward the email to the newsletter tool (e.g. HubSpot) using env vars set in Vercel.
 * Until then the address is validated and the visitor is sent back with a thank-you flag.
 */
export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const back = new URL(request.headers.get("referer") ?? "/resources/blog", request.url);
  back.hash = "newsletter";
  back.searchParams.set("subscribed", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "1" : "0");
  return NextResponse.redirect(back, 303);
}
