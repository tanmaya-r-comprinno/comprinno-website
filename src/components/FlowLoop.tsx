"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";

const ICONS: IconName[] = ["search", "layers", "eye", "loop"];
const STEP_MS = 3200;

/**
 * "How we work" as a live run: a signal travels along the track and each phase
 * runs in turn (done ✓ → running → queued), then a return arc carries it back
 * to the start, because the work loops. Every phase's text is always visible.
 * Hover or focus a phase to jump to it and pause. Reduced motion: static, all done.
 */
export default function FlowLoop({ items }: { items: { title: string; desc: string }[] }) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setStill(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    const t = setInterval(() => {
      if (!paused && visible.current && !document.hidden) setActive((a) => (a + 1) % n);
    }, STEP_MS);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, [paused, n]);

  const pct = still ? 100 : (active / (n - 1)) * 100;

  return (
    <div ref={ref} className="loop" onMouseLeave={() => setPaused(false)} style={{ "--pct": `${pct}%` } as CSSProperties}>
      {/* track with progress fill and travelling signal (desktop) */}
      <div className="loop-track" aria-hidden="true">
        <span className="loop-fill" />
        <span className="loop-signal" />
      </div>

      <ol className="loop-steps">
        {items.map((s, i) => {
          const state = still || i < active ? "done" : i === active ? "run" : "wait";
          return (
            <li
              key={s.title}
              className={`loop-step is-${state}`}
              tabIndex={0}
              onMouseEnter={() => { setActive(i); setPaused(true); }}
              onFocus={() => { setActive(i); setPaused(true); }}
            >
              <span className="loop-node"><Icon name={ICONS[i % ICONS.length]} className="h-6 w-6" /></span>
              <span className="loop-status" aria-hidden="true">
                {state === "done" ? "✓ done" : state === "run" ? "running" : "queued"}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              {state === "run" && <span className="loop-bar" aria-hidden="true" key={active} />}
            </li>
          );
        })}
      </ol>

      {/* return arc: optimize feeds the next assessment */}
      <svg className="loop-return" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M875 4 V30 Q875 50 855 50 H145 Q125 50 125 30 V4" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="loop-caption" aria-hidden="true">↺ and again: every cycle starts smarter than the last</p>
    </div>
  );
}
