"use client";

import { useEffect, useState } from "react";

/** Live countdown to the dinner. Renders dashes until mounted so server and client markup match. */
export default function Countdown({ to }: { to: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(to).getTime();
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    const id = setInterval(tick, 1000);
    const first = setTimeout(tick, 0);
    return () => { clearInterval(id); clearTimeout(first); };
  }, [to]);

  const s = left === null ? null : Math.floor(left / 1000);
  const parts: [string, number | null][] = [
    ["Days", s === null ? null : Math.floor(s / 86400)],
    ["Hrs", s === null ? null : Math.floor((s % 86400) / 3600)],
    ["Min", s === null ? null : Math.floor((s % 3600) / 60)],
    ["Sec", s === null ? null : s % 60],
  ];

  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-live="off">
      {parts.map(([label, v]) => (
        <div key={label} className="border border-[#c8d5e8] bg-white px-2 py-3 text-center">
          <span className="block font-mono text-2xl tabular-nums text-[#006bc9] sm:text-3xl">{v === null ? "--" : String(v).padStart(2, "0")}</span>
          <span className="mt-1 block font-mono text-[.6rem] uppercase tracking-[.12em] text-neutral-500">{label}</span>
        </div>
      ))}
    </div>
  );
}
