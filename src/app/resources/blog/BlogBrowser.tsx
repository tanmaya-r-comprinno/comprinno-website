"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { PostCardView, type PostCard } from "./BlogParts";

const PAGE = 9;

/** All articles: topic filter, search, load more */
export default function BlogBrowser({ cards, topics }: { cards: PostCard[]; topics: string[] }) {
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return cards.filter((c) => (topic === "All" || c.topic === topic) && (!t || `${c.title} ${c.author} ${c.topic}`.toLowerCase().includes(t)));
  }, [cards, topic, q]);

  return (
    <div>
      {/* heading + search on one line, topics on the line below */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] font-normal leading-tight">All <strong className="font-semibold">articles</strong></h2>
        <label className="flex w-full items-center gap-2 border border-line-strong bg-bg px-3 py-2.5 text-sm text-muted focus-within:border-ink lg:w-80">
          <Icon name="search" className="h-4 w-4 shrink-0" />
          <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search articles or authors" className="min-w-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent text-ink outline-none focus-visible:outline-none placeholder:text-muted" />
        </label>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by topic">
        {["All", ...topics].map((t) => (
          <button key={t} type="button" aria-pressed={topic === t} onClick={() => { setTopic(t); setShown(PAGE); }} className={`cs-filter !px-3 !text-[0.82rem] ${topic === t ? "is-on" : ""}`}>
            {t}
            <span className="cs-count">{t === "All" ? cards.length : cards.filter((c) => c.topic === t).length}</span>
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, shown).map((c, i) => <PostCardView key={c.slug} p={c} art={(i * 3) % 10} />)}
        </div>
      ) : (
        <p className="mt-10 border border-dashed border-line-strong p-10 text-center text-sm text-muted">No articles match that search. Try another topic or author.</p>
      )}

      {shown < list.length && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-ghost">
            Load more articles <span className="text-muted">({list.length - shown})</span>
          </button>
        </div>
      )}
    </div>
  );
}
