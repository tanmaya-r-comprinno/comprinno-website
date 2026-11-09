import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press, announcements and milestones from Comprinno.",
  alternates: { canonical: "/newsroom" },
};

// TODO(content): import from comprinno.net/newsroom (add a SectionHead + .card grid once items exist).
export default function NewsroomPage() {
  return (
    <>
      <PageHero eyebrow="Newsroom" title="Press and announcements" desc="Milestones, partnerships and press coverage. News items are being moved over from our current site." />
      <CtaBand title={<>Writing about <strong>Comprinno</strong>?</>} desc="Get in touch and we'll connect you with the right person." label="Contact us" />
    </>
  );
}
