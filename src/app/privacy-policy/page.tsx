import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy-policy" },
};

// TODO(content): paste the approved policy text from comprinno.net/privacy-policy (legal must sign off).
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <Section>
        <p className="max-w-2xl text-muted">The policy text will be migrated from our current site after legal review.</p>
      </Section>
    </>
  );
}
