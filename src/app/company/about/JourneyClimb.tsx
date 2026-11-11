"use client";

import { useEffect, useRef, useState } from "react";

export type Kind = "tier" | "program" | "competency" | "award" | "recognition";
export type Year = { year: string; short: string; items: { k: Kind; text: string }[] };

const kinds: Record<Kind, { label: string; dot: string }> = {
  tier: { label: "Partner tier", dot: "bg-blue-500" },
  program: { label: "Program", dot: "bg-teal-500" },
  competency: { label: "Competency", dot: "bg-violet-500" },
  award: { label: "Award", dot: "bg-amber-500" },
  recognition: { label: "Recognition", dot: "bg-rose-500" },
};

/** The AWS journey as a climb: each year a step higher, tier upgrades marked, the plane landing on today. */
export default function JourneyClimb({ years }: { years: Year[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [hop, setHop] = useState(-1); // which step the plane is on
  const [hover, setHover] = useState<number | null>(null);
  const [introDone, setIntroDone] = useState(false); // stagger only on first reveal

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setOn(true);
      io.disconnect();
      setTimeout(() => setIntroDone(true), years.length * 140 + 900);
      // after the steps grow, the plane hops up the staircase to today
      setTimeout(() => {
        let i = 0;
        setHop(0);
        timer = setInterval(() => {
          i += 1;
          setHop(i);
          if (i >= years.length - 1) clearInterval(timer);
        }, 260);
      }, 1500);
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); if (timer) clearInterval(timer); };
  }, [years.length]);

  const n = years.length;

  return (
    <div ref={ref}>
      {/* Desktop: the climb */}
      <ol className="hidden h-[27rem] items-end gap-2 lg:grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {years.map((y, i) => {
          const today = i === n - 1;
          const h = 4.5 + i * 1.5; // rem, a steady climb
          const delay = i * 140;
          const tierUp = y.items.some((x) => x.k === "tier");
          return (
            <li key={y.year} className="flex cursor-default flex-col justify-end" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
              <ul
                className="mb-6 grid gap-2 transition duration-500"
                style={{ transitionDelay: introDone ? "0ms" : `${delay + 350}ms`, opacity: on ? (hover === null || hover === i ? 1 : 0.35) : 0, transform: on ? (hover === i ? "translateY(-4px)" : "none") : "translateY(6px)" }}
              >
                <li className="flex gap-1" aria-hidden="true">
                  {y.items.map((it) => <span key={it.text} className={`h-1.5 w-4 ${kinds[it.k].dot}`} />)}
                </li>
                <li className={`text-xs leading-snug ${today || tierUp ? "font-semibold text-ink" : "text-ink-2"}`}>
                  {hover === i ? y.items.map((it) => it.text).join(" · ") : y.short}
                  <span className="sr-only">: {y.items.map((it) => `${kinds[it.k].label}: ${it.text}`).join("; ")}</span>
                </li>
              </ul>
              <div
                className={`relative origin-bottom border-t-2 ${hover === i && !today ? "!bg-white shadow-md" : ""} transition-transform duration-700 motion-reduce:transition-none ease-out ${today ? "border-ink bg-ink" : tierUp ? "border-blue-500 bg-blue-50" : "border-ink bg-surface"}`}
                style={{ height: `${h}rem`, transitionDelay: `${delay}ms`, transform: on ? "scaleY(1)" : "scaleY(0)" }}
              >
                {hop === i && (
                  <span className="absolute -top-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-bg motion-safe:animate-[ping-soft_1.6s_ease-out_infinite]" aria-hidden="true" />
                )}
                {hop > i && <span className="absolute -top-[5px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />}
                {tierUp && (
                  <span className={`absolute left-2 top-2 border px-1.5 py-px font-mono text-[0.58rem] font-semibold uppercase tracking-widest ${today ? "border-white/40 text-white" : "border-blue-400 bg-white text-blue-700"}`}>
                    {y.items.find((x) => x.k === "tier")!.text.replace("AWS ", "").replace(/ (Services|Consulting) Partner$/, "").replace(" Tier", "")}
                  </span>
                )}
                <span className={`absolute bottom-2 left-2 font-mono text-sm font-semibold ${today ? "text-white" : "text-ink"}`}>{y.year}</span>
                {today && <span className="absolute bottom-2.5 right-2 font-mono text-[0.55rem] uppercase tracking-widest text-white/60">Today</span>}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Mobile and tablet: vertical climb */}
      <ol className="relative grid gap-5 border-l-2 border-ink pl-6 lg:hidden">
        {years.map((y, i) => {
          const today = i === n - 1;
          return (
            <li key={y.year} className="relative">
              <span className={`absolute -left-[1.95rem] top-1 h-3 w-3 border-2 border-ink ${today ? "bg-ink" : "bg-bg"}`} aria-hidden="true" />
              <p className="flex items-center gap-2 font-mono text-lg font-semibold text-ink">
                {y.year}
                {today && <span className="text-[0.6rem] font-normal uppercase tracking-widest text-muted">Today</span>}
              </p>
              <ul className="mt-1.5 grid gap-1.5">
                {y.items.map((it) => (
                  <li key={it.text} className={`flex gap-2 text-sm leading-snug ${it.k === "tier" || today ? "font-semibold text-ink" : "text-ink-2"}`}>
                    <span className={`mt-1.5 h-2 w-2 shrink-0 ${kinds[it.k].dot}`} aria-hidden="true" />
                    <span><span className="sr-only">{kinds[it.k].label}: </span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      {/* Legend */}
      <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {(Object.keys(kinds) as Kind[]).map((k) => (
          <li key={k} className="flex items-center gap-2 text-xs text-muted">
            <span className={`h-2 w-2 ${kinds[k].dot}`} aria-hidden="true" />
            {kinds[k].label}
          </li>
        ))}
      </ul>
    </div>
  );
}
