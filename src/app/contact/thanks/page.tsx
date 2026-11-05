import type { Metadata } from "next";
import { Button, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function ThanksPage() {
  return (
    <PageHero eyebrow="Message received" title="Thanks. We'll be in touch." desc="An AWS-certified expert will reply within 24 to 48 hours.">
      <Button href="/" variant="ghost">Back to home</Button>
    </PageHero>
  );
}
