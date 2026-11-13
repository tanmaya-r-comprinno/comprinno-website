import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Comprinno handles personal information, and how to contact us about your data.",
  alternates: { canonical: "/privacy-policy" },
};

// TODO(legal): paste the approved policy text here. Do not write policy wording without legal sign-off.
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" desc="Our full privacy policy is being finalized. For any question about your personal information, or to access, correct or delete it, contact us directly." />
      <Section>
          <div className="mx-auto max-w-2xl border border-line bg-bg p-6 text-center">
            <p className="text-sm text-muted">Privacy questions and data requests</p>
            <a href={`mailto:${site.emails.general}?subject=Privacy%20request`} className="mt-2 inline-block text-lg font-semibold text-[#006bc9] underline underline-offset-4">{site.emails.general}</a>
          </div>
      </Section>
    </>
  );
}
