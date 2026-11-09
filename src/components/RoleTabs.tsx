"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";

const DWELL = 6000;

/**
 * Role switcher: four role tabs sit directly on top of one product screen, like
 * tabs on a window. The active tab joins the screen (no border between them),
 * a progress bar runs along it, and it auto-advances to the next role.
 * Click/keyboard to choose a role (pauses the auto-advance). Reduced motion: no auto-advance.
 */
export default function RoleTabs({
  name,
  items,
}: {
  name: string;
  items: { role: string; title: string; desc: string; icon: IconName; screen: string }[];
}) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    const t = setInterval(() => {
      if (visible && !document.hidden) setActive((a) => (a + 1) % items.length);
    }, DWELL);
    return () => { clearInterval(t); io.disconnect(); };
  }, [auto, items.length]);

  const cur = items[active];
  return (
    <div ref={ref} className="roles">
      <div role="tablist" aria-label={`${name} views by role`} className="roles-tabs">
        {items.map((it, i) => (
          <button
            key={it.title}
            type="button"
            role="tab"
            id={`role-${i}`}
            aria-selected={active === i}
            aria-controls="role-screen"
            onClick={() => { setActive(i); setAuto(false); }}
            className={`role-tab ${active === i ? "is-active" : ""}`}
          >
            <span className="role-tab-top">
              <span className="role-icon" aria-hidden="true"><Icon name={it.icon} className="h-4 w-4" /></span>
              <span className="role-name">{it.role}</span>
            </span>
            <span className="role-title">{it.title}</span>
            {active === i && auto && <span key={active} className="role-progress" aria-hidden="true" style={{ animationDuration: `${DWELL}ms` }} />}
          </button>
        ))}
      </div>

      <figure id="role-screen" role="tabpanel" aria-labelledby={`role-${active}`} className="role-screen">
        <figcaption className="flex items-center gap-3 border-b border-line bg-surface px-4 py-2.5 font-mono text-[0.7rem] text-muted">
          <span className="flex gap-1" aria-hidden="true">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 border border-line-strong" />)}</span>
          Tevico · {name} · <span className="text-ink">{cur.role} view</span>
        </figcaption>
        <div className="grid lg:grid-cols-[1fr_2fr]">
          <div key={`d${active}`} className="reveal border-b border-line p-6 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">{cur.role}</p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">{cur.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{cur.desc}</p>
          </div>
          <div className="bg-grid flex aspect-[16/9] items-center justify-center p-4">
            <span key={`s${active}`} className="reveal border border-line-strong bg-bg px-3 py-1.5 font-mono text-[0.7rem] text-muted">Product screen: {cur.screen}</span>
          </div>
        </div>
      </figure>
    </div>
  );
}
