import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy-policy" },
};

// TODO(content): paste the approved policy text from comprinno.net/privacy-policy (legal must sign off).
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" desc="The policy text will be moved over from our current site after legal review." />
      <CtaBand title={<>Questions about <strong>your data</strong>?</>} desc="Write to us and we'll answer them directly." label="Contact us" />
    </>
  );
}
