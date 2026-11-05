import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press, announcements and milestones from Comprinno.",
  alternates: { canonical: "/newsroom" },
};

// TODO(content): import from comprinno.net/newsroom
export default function NewsroomPage() {
  return (
    <>
      <PageHero eyebrow="Resources / newsroom" title="Press and announcements" desc="Milestones, partnerships and press coverage." />
      <Section>
        <div className="card max-w-xl text-sm text-muted">News coming soon.</div>
      </Section>
    </>
  );
}
