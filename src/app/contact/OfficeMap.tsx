"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/*
 * A light dotted world map, drawn as plain SVG (no map library, ~1 KB of data).
 * Each row is a 5° band of latitude (75°N down to 55°S); each [from, to] range is
 * a run of land in 5° longitude columns (0 = 180°W, 36 = 0°, 71 = 175°E).
 */
const LAND: [number, [number, number][]][] = [
  [75, [[12, 21], [22, 32], [48, 58]]],
  [70, [[3, 8], [9, 22], [25, 31], [39, 42], [43, 71]]],
  [65, [[3, 8], [9, 16], [20, 23], [26, 28], [32, 32], [38, 42], [43, 71]]],
  [60, [[4, 7], [9, 16], [20, 23], [27, 27], [37, 38], [39, 42], [43, 68]]],
  [55, [[10, 16], [19, 24], [34, 35], [38, 44], [45, 64], [68, 68]]],
  [50, [[11, 25], [34, 35], [36, 44], [45, 64]]],
  [45, [[11, 23], [36, 41], [44, 63], [64, 64]]],
  [40, [[11, 21], [34, 36], [39, 40], [41, 45], [48, 60], [61, 61], [64, 64]]],
  [35, [[12, 20], [35, 38], [43, 51], [52, 60], [63, 63]]],
  [30, [[13, 16], [19, 19], [34, 42], [43, 48], [49, 54], [55, 60]]],
  [25, [[14, 16], [20, 20], [33, 42], [44, 47], [48, 54], [55, 60]]],
  [20, [[15, 18], [20, 21], [32, 43], [44, 47], [50, 53], [55, 57], [60, 60]]],
  [15, [[17, 19], [32, 44], [45, 45], [50, 52], [55, 57], [60, 60]]],
  [10, [[20, 23], [33, 46], [51, 51], [52, 52], [56, 56], [61, 61]]],
  [5, [[20, 26], [34, 45], [56, 59]]],
  [0, [[20, 26], [37, 44], [56, 56], [58, 59], [60, 60]]],
  [-5, [[20, 29], [38, 44], [57, 58], [62, 65]]],
  [-10, [[20, 29], [38, 44], [45, 46], [61, 61], [62, 64]]],
  [-15, [[21, 28], [38, 44], [45, 46], [61, 65]]],
  [-20, [[22, 28], [38, 43], [45, 45], [59, 66]]],
  [-25, [[22, 27], [39, 42], [58, 66]]],
  [-30, [[21, 26], [39, 42], [59, 66]]],
  [-35, [[21, 24], [40, 40], [59, 65], [70, 70]]],
  [-40, [[21, 23], [65, 65], [70, 70]]],
  [-45, [[21, 22], [69, 69]]],
  [-50, [[21, 22]]],
  [-55, [[22, 22]]],
];

const W = 72;
const H = LAND.length;
const x = (lon: number) => (lon + 180) / 5;
const y = (lat: number) => (75 - lat) / 5;

// One pin per city (both Bengaluru offices share a pin).
const pins = site.offices.filter((o, i, all) => all.findIndex((p) => p.city === o.city) === i);

const directions = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/** Map + office list, linked: hover an office to light its pin, or a pin to light its offices. */
export default function OfficeMap() {
  // active office index: a card lights only itself; its city's pin lights with it
  const [active, setActive] = useState<number | null>(null);
  const activeCity = active === null ? null : site.offices[active].city;
  return (
    <div onMouseLeave={() => setActive(null)}>
    <div className="relative mx-auto max-w-5xl">
      <svg viewBox={`-0.5 -0.5 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
        {LAND.flatMap(([, runs], r) =>
          runs.flatMap(([a, b]) =>
            Array.from({ length: b - a + 1 }, (_, k) => <circle key={`${r}-${a + k}`} cx={a + k} cy={r} r={0.2} className="fill-line-strong" />),
          ),
        )}
      </svg>
      {pins.map((o) => {
        const hq = o.label === "Headquarters";
        const on = activeCity === o.city;
        // labels sit to the right; Pune goes left so it never overlaps Bengaluru
        const side = o.city === "Pune" ? "right-full mr-1.5" : "left-full ml-1.5";
        return (
          <span
            key={o.city}
            onMouseEnter={() => setActive(site.offices.indexOf(o))}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-default transition-opacity duration-300 ${activeCity && activeCity !== o.city ? "opacity-40" : ""} ${on ? "z-10" : ""}`}
            style={{ left: `${((x(o.lon) + 0.5) / W) * 100}%`, top: `${((y(o.lat) + 0.5) / H) * 100}%` }}
          >
            <span className={`block border-2 border-white bg-ink shadow transition-transform duration-300 h-3 w-3 ${on ? "scale-150" : ""}`}>
              {on && <span className="absolute inset-0 bg-ink motion-safe:animate-[ping-soft_1.8s_ease-out_infinite]" />}
            </span>
            <span className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap border px-2 py-0.5 font-mono text-[0.65rem] shadow-sm transition-colors duration-300 ${side} ${on ? "border-ink bg-ink text-white" : "border-line bg-bg text-ink"}`}>
              {o.city}{o.region !== "India" || hq ? <span className={on ? "text-white/70" : "text-muted"}> · {hq ? "HQ" : o.region}</span> : null}
            </span>
          </span>
        );
      })}
    </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {site.offices.map((o, i) => {
          const on = active === i;
          return (
            <li
              key={o.address}
              onMouseEnter={() => setActive(i)}
              className={`border-t-2 p-4 transition duration-300 ${on ? "-translate-y-1 border-ink bg-bg shadow-md" : "border-line-strong"} ${active !== null && !on ? "opacity-50" : ""}`}
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">{o.label}</p>
              <h3 className="mt-1 font-semibold text-ink">{o.city}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{o.address}</p>
              <a href={directions(o.address)} target="_blank" rel="noopener noreferrer" onFocus={() => setActive(i)} onBlur={() => setActive(null)} className="mt-3 inline-block text-sm font-medium text-ink underline underline-offset-2">Directions →</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
