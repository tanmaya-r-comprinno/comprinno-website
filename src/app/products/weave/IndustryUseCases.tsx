"use client";

import { useState } from "react";
import { IconTile, type IconName } from "@/components/Icon";

export type IndustryGroup = { industry: string; items: { title: string; desc: string; icon: IconName }[] };

/** Use cases grouped by industry, switchable with tabs. */
export default function IndustryUseCases({ groups }: { groups: IndustryGroup[] }) {
  const [active, setActive] = useState(0);
  const g = groups[active];
  return (
    <div>
      <div role="tablist" aria-label="Industry" className="flex flex-wrap justify-center gap-2">
        {groups.map((it, i) => (
          <button
            key={it.industry}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`border px-4 py-2 text-sm font-medium transition ${i === active ? "border-[#006bc9] bg-[#006bc9] text-white" : "border-line-strong bg-bg text-ink hover:bg-surface"}`}
          >
            {it.industry}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {g.items.map((u) => (
          <div key={u.title} className="card">
            <IconTile name={u.icon} />
            <h3 className="mt-4 font-semibold leading-snug text-ink">{u.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
