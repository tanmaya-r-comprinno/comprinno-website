"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { NewsRowView, type NewsRow } from "./NewsParts";

const PAGE = 8;

export default function NewsBrowser({ rows, kinds }: { rows: NewsRow[]; kinds: string[] }) {
  const [kind, setKind] = useState("All");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => (kind === "All" || r.kind === kind) && (!t || r.title.toLowerCase().includes(t)));
  }, [rows, kind, q]);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal leading-tight">All <strong className="font-semibold">news</strong></h2>
        <label className="flex w-full items-center gap-2 border border-line-strong bg-bg px-3 py-2.5 text-sm text-muted focus-within:border-ink sm:w-64">
          <Icon name="search" className="h-4 w-4 shrink-0" />
          <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search news" className="min-w-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent text-ink outline-none placeholder:text-muted" />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        {["All", ...kinds].map((k) => (
          <button key={k} type="button" aria-pressed={kind === k} onClick={() => { setKind(k); setShown(PAGE); }} className={`cs-filter !px-3 !text-[0.82rem] ${kind === k ? "is-on" : ""}`}>
            {k}
            <span className="cs-count">{k === "All" ? rows.length : rows.filter((r) => r.kind === k).length}</span>
          </button>
        ))}
      </div>
      {list.length ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.slice(0, shown).map((r) => <NewsRowView key={r.slug} r={r} />)}</ul>
      ) : (
        <p className="mt-8 border border-dashed border-line-strong p-8 text-center text-sm text-muted">No news matches that search.</p>
      )}
      {shown < list.length && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-ghost">Load older news <span className="text-muted">({list.length - shown})</span></button>
        </div>
      )}
    </div>
  );
}
