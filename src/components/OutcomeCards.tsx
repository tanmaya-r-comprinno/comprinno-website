/**
 * Outcomes: three real customer stories, same design as the home page.
 * Card details come from src/content/case-studies. The "Key result" is a figure
 * quoted from the story; when a story has no figure, the card shows the main
 * AWS service it was built on instead (never an invented number).
 */
import Link from "next/link";
import { IconTile } from "@/components/Icon";
import ArtTile from "@/components/ArtTile";
import { caseStudy } from "@/lib/caseStudies";
import { serviceIcon } from "@/lib/caseStudyIcons";

export type OutcomePick = { slug: string; metric?: string; what?: string };

export default function OutcomeCards({ picks }: { picks: OutcomePick[] }) {
  const cards = picks.flatMap((p) => {
    const c = caseStudy(p.slug);
    if (!c) return [];
    const result = p.metric
      ? { label: "Key result", metric: p.metric, what: p.what ?? "" }
      : { label: "Built on", metric: c.builtWith[0] ?? "AWS", what: `${c.service} in ${c.industry}` };
    return [{ ...c, result, art: { slug: c.slug, title: c.title, about: c.service, industry: c.industry } }];
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c) => (
        <Link key={c.slug} href={`/resources/case-studies/${c.slug}`} className="card flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <IconTile name={serviceIcon[c.service] ?? "cloud"} />
            <span className="tag truncate">{c.industry} · {c.service}</span>
          </div>
          <ArtTile art={c.art} className="mt-5" />
          <p className="mt-5 font-semibold leading-snug text-ink">{c.title}</p>
          <p className="mb-5 mt-1 text-sm text-muted">{c.client}</p>
          <div className="outcome-result">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{c.result.label}</p>
            <p className={`outcome-num mt-2 ${c.result.metric.length > 10 ? "!text-2xl" : ""}`}>{c.result.metric}</p>
            <p className="mt-1.5 min-h-[2.75em] text-sm leading-snug text-ink-2">{c.result.what}</p>
          </div>
          <p className="mt-5 text-sm font-medium text-ink">Read the story <span className="go">→</span></p>
        </Link>
      ))}
    </div>
  );
}
