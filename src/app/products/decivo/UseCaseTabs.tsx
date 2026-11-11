"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

export type UseCase = { fn: string; title: string; trigger: string; agents: string[]; human: string; outcome: string };

/** Use-case examples, switchable by business function. */
export default function UseCaseTabs({ items }: { items: UseCase[] }) {
  const [active, setActive] = useState(0);
  const u = items[active];
  const rows: { k: string; v: React.ReactNode }[] = [
    { k: "Trigger", v: u.trigger },
    {
      k: "Agent activities",
      v: (
        <ol className="flex flex-wrap items-center gap-2">
          {u.agents.map((a, i) => (
            <li key={a} className="flex items-center gap-2">
              <span className="border border-line-strong bg-bg px-2.5 py-1 text-sm text-ink">{a}</span>
              {i < u.agents.length - 1 && <span className="text-muted" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      ),
    },
    { k: "Human checkpoint", v: u.human },
    { k: "Business outcome", v: u.outcome },
  ];
  return (
    <div>
      <div role="tablist" aria-label="Business function" className="flex flex-wrap justify-center gap-2">
        {items.map((it, i) => (
          <button
            key={it.fn}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`border px-4 py-2 text-sm font-medium transition ${i === active ? "border-ink bg-ink text-white" : "border-line-strong bg-bg text-ink hover:bg-surface"}`}
          >
            {it.fn}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6 border border-line bg-bg">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-surface px-5 py-3">
          <h3 className="font-semibold text-ink">{u.title}</h3>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">Illustrative</span>
        </div>
        <dl className="divide-y divide-line">
          {rows.map((r) => (
            <div key={r.k} className="grid gap-2 p-5 sm:grid-cols-[12rem_1fr] sm:items-center">
              <dt className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-muted">
                {r.k === "Human checkpoint" && <Icon name="user" className="h-3.5 w-3.5" />}
                {r.k}
              </dt>
              <dd className="text-sm leading-relaxed text-ink sm:text-base">{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
