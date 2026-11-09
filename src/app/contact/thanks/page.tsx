import type { Metadata } from "next";
import { Br, Button, CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function ThanksPage() {
  return (
    <>
      <PageHero eyebrow="Message received" title="Thanks. We'll be in touch." desc="A certified cloud expert will reply within 24 to 48 hours.">
        <Button href="/" variant="ghost">Back to home</Button>
      </PageHero>
      <CtaBand title={<>What happens <strong>next</strong>,<Br /> in three steps.</>} desc="Here is what to expect after you hear back from us." label="Send another message" />
    </>
  );
}
