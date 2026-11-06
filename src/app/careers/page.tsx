import type { Metadata } from "next";
import { Button, PageHero, Section } from "@/components/ui";
import { site } from "@/lib/site";
import { values } from "@/content/company";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Comprinno: certified cloud architects, DevOps and security experts, and AI/ML engineers.",
  alternates: { canonical: "/careers" },
};

// TODO(content): the current site has no career details; add open roles and culture copy once supplied.
export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Company / careers" title="Build the agentic cloud with us" desc="We hire certified cloud architects, security and DevOps engineers, and AI/ML engineers who work with managed ML and generative AI platforms.">
        <Button href={`mailto:${site.emails.careers}`}>Email {site.emails.careers} →</Button>
      </PageHero>
      <Section>
        <p className="mb-4 label">What we value</p>
        <ul className="flex flex-wrap gap-2">
          {values.map((v) => (
            <li key={v} className="tag">{v}</li>
          ))}
        </ul>
        <p className="mt-8 max-w-xl text-sm text-muted">Open roles will be listed here soon.</p>
      </Section>
    </>
  );
}
