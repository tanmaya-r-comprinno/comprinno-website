import { NextResponse } from "next/server";
import { newsletterSignupUrl } from "@/lib/newsletter";

/**
 * Compatibility for the old signup action. Complete signup on the hosted form;
 * never acknowledge a subscription that has not been saved by the provider.
 */
export async function POST() {
  const url = newsletterSignupUrl();
  if (!url) return NextResponse.json({ error: "Newsletter signup is temporarily unavailable." }, { status: 503 });
  return NextResponse.redirect(url, 303);
}
