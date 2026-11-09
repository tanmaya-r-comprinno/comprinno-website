import type { Metadata } from "next";
import { Button, CtaBand, PageHero, Section, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";
import { values } from "@/content/company";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Comprinno: certified cloud architects, DevOps and security experts, and AI/ML engineers.",
  alternates: { canonical: "/company/careers" },
};

// TODO(content): the current site has no career details; add open roles and culture copy once supplied.
export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Build the agentic cloud with us" desc="We hire certified cloud architects, security and DevOps engineers, and AI/ML engineers who work with generative AI.">
        <Button href={`mailto:${site.emails.careers}`}>Email {site.emails.careers} →</Button>
      </PageHero>
      <Section>
        <SectionHead
          eyebrow="What we value"
          title={<>The values we <strong>hire for</strong>.</>}
          desc="Open roles will be listed here soon. Until then, write to us directly."
        />
        <ul className="flex flex-wrap justify-center gap-2">
          {values.map((v) => (
            <li key={v} className="tag">{v}</li>
          ))}
        </ul>
      </Section>
      <CtaBand title={<>Not hiring? <strong>Still building</strong>?</>} desc="If you're a team with a cloud or AI project, we'd love to hear about it too." />
    </>
  );
}
