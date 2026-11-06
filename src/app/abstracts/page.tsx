import type { Metadata } from "next";
import Abstract, { abstractNames } from "@/components/Abstracts";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = { title: "Abstract set", robots: { index: false } };

/** Internal preview of the 20 abstract line vectors. Not linked from the nav. */
export default function AbstractsPage() {
  return (
    <Container className="py-14 sm:py-20">
      <Eyebrow>Internal · abstract set</Eyebrow>
      <h1 className="mt-5 text-3xl font-semibold">20 abstract line vectors</h1>
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
