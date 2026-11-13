"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon, IconTile } from "@/components/Icon";
import { serviceIcon } from "@/lib/caseStudyIcons";
import ArtTile, { tileFor } from "@/components/ArtTile";

export type CaseCard = { slug: string; title: string; client: string; industry: string; service: string };

const PAGE = 9;

/** Coloured square inside a tag, one colour per service */
export const serviceDot: Record<string, string> = {
  Migration: "bg-[#006bc9]",
  Modernization: "bg-teal-500",
  "Generative AI": "bg-violet-500",
  "Security and resilience": "bg-rose-500",
  "Cost and operations": "bg-[#ffbb00]",
};

export function CaseTags({ industry, service }: { industry: string; service: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="cs-tag"><i className="bg-[#9aa8c4]" />{industry}</span>
      <span className="cs-tag cs-tag-svc"><i className={serviceDot[service] ?? "bg-[#006bc9]"} />{service}</span>
    </div>
  );
}

/** Same card as the home page Outcomes section */
export function CaseCardView({ c }: { c: CaseCard }) {
  return (
    <Link href={`/resources/case-studies/${c.slug}`} className="card group flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <IconTile name={serviceIcon[c.service] ?? "cloud"} />
        <span className="tag truncate">{c.industry} · {c.service}</span>
      </div>
      <ArtTile variant={tileFor(c.slug)} className="mt-5" />
      <h3 className="mt-5 font-semibold leading-snug text-ink">{c.title}</h3>
      <p className="mt-2 text-sm text-muted">{c.client}</p>
      <p className="mt-auto pt-5 text-sm font-medium text-ink">Read the story <span className="go">→</span></p>
    </Link>
  );
}

type Props = { cards: CaseCard[]; services: string[] };

/** Reads ?service=… so service pages can link straight to their own stories. */
function FromUrl(props: Props) {
  const want = useSearchParams().get("service");
  return <Browser {...props} initial={want && props.services.includes(want) ? want : "All"} />;
}

/** "All customer stories": filter by service, search, load more. */
export default function CaseStudyBrowser(props: Props) {
  return (
    <Suspense fallback={<Browser {...props} initial="All" />}>
      <FromUrl {...props} />
    </Suspense>
  );
}

function Browser({ cards, services, initial }: Props & { initial: string }) {
  const [svc, setSvc] = useState(initial);
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return cards.filter((c) => (svc === "All" || c.service === svc) && (!t || `${c.title} ${c.client} ${c.industry} ${c.service}`.toLowerCase().includes(t)));
  }, [cards, svc, q]);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal leading-tight">All <strong className="font-semibold">customer stories</strong></h2>
        <label className="flex w-full items-center gap-2 border border-line-strong bg-bg px-3 py-2.5 text-sm text-muted focus-within:border-ink lg:w-80">
          <Icon name="search" className="h-4 w-4 shrink-0" />
          <input
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
            placeholder="Search by company, service or industry"
            className="min-w-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent text-ink outline-none focus-visible:outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by service">
        <span className="mr-1 font-mono text-[0.7rem] uppercase tracking-widest text-muted">Service</span>
        {["All", ...services].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={svc === s}
            onClick={() => { setSvc(s); setShown(PAGE); }}
            className={`cs-filter ${svc === s ? "is-on" : ""}`}
          >
            {s}
            <span className="cs-count">{s === "All" ? cards.length : cards.filter((c) => c.service === s).length}</span>
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, shown).map((c) => <CaseCardView key={c.slug} c={c} />)}
        </div>
      ) : (
        <p className="mt-10 border border-dashed border-line-strong p-10 text-center text-sm text-muted">No stories match that search. Try another company, service or industry.</p>
      )}

      {shown < list.length && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-ghost">
            Load more stories <span className="text-muted">({list.length - shown})</span>
          </button>
        </div>
      )}
    </div>
  );
}
