import type { Metadata } from "next";
import Abstract, { abstractNames } from "@/components/Abstracts";
import OutcomeArt, { OUTCOME_ART_COUNT } from "@/components/OutcomeArt";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Abstract set", robots: { index: false } };

/** Internal preview of the 20 abstract line vectors. Not linked from the nav. */
export default function AbstractsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <Eyebrow>Internal · abstract set</Eyebrow>
      <h1 className="mt-5 text-3xl font-semibold">Outcome card images</h1>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: OUTCOME_ART_COUNT }, (_, i) => (
          <li key={i} className="border border-line bg-surface p-4">
            <OutcomeArt variant={i} />
            <p className="mt-3 font-mono text-xs text-muted">variant {i}</p>
          </li>
        ))}
      </ul>
      <h2 className="mt-16 text-3xl font-semibold">20 abstract line vectors</h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {abstractNames.map((n, i) => (
          <li key={n} className="border border-line bg-surface p-6">
            <Abstract index={i} />
            <p className="mt-4 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")} · {n}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
