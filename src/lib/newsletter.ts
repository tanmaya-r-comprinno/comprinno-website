/** Hosted HubSpot newsletter form: the provider owns consent and subscription confirmation. */
export function newsletterSignupUrl(): string | null {
  const configured = process.env.NEWSLETTER_SIGNUP_URL?.trim();
  if (!configured) return null;
  try {
    const url = new URL(configured);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
