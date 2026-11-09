"use client";

import { useState } from "react";

/**
 * Clickable list on the left, product screen on the right. Selecting an item
 * highlights it and swaps the screen to match. Keyboard: Tab to an item, Enter/Space.
 */
export default function TabbedScreen({
  name,
  items,
}: {
  name: string;
  items: { title: string; desc: string; screen: string }[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.6fr]">
      <div role="tablist" aria-label={`${name} views`} className="grid gap-3">
        {items.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            id={`tab-${i}`}
            aria-selected={active === i}
            aria-controls="tab-screen"
            onClick={() => setActive(i)}
            className={`border p-4 text-left transition-colors hover:border-ink ${active === i ? "border-ink bg-surface-2" : "border-line bg-bg"}`}
          >
            <span className="block font-semibold text-ink">{s.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted">{s.desc}</span>
          </button>
        ))}
      </div>
      <figure id="tab-screen" role="tabpanel" aria-labelledby={`tab-${active}`} className="border border-line-strong bg-bg">
        <figcaption className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
          <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 border border-line-strong" />)}</span>
          Tevico · {name}
        </figcaption>
        <div className="bg-grid flex aspect-[16/10] items-center justify-center p-4">
          <span key={active} className="reveal border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">
            Product screen: {items[active].screen}
          </span>
        </div>
      </figure>
    </div>
  );
}
