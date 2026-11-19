"use client";

import { useRef, useState } from "react";
import { iconPath, type IconName } from "@/components/Icon";

/**
 * About hero: a bento mosaic of award photos and milestone tiles in mixed sizes.
 * The grid tilts gently towards the mouse; hovering a tile lifts it forward with a soft
 * light sweep, photos reveal their caption bar, data tiles reveal a one-line description.
 * Keyboard focus does the same. Static for reduced-motion users.
 */
type Photo = { kind: "photo"; src: string; caption: string; area: string };
type Fact = { kind: "fact"; tag: string; value: string; label: string; desc: string; icon: IconName; tone: "blue" | "navy" | "sky"; area: string };
type Tile = Photo | Fact;

const TILES: Tile[] = [
  { kind: "photo", src: "/about/award-gala-2026.webp", caption: "AWS India Partner Gala 2026", area: "col-start-1 row-start-1 row-span-2" },
  { kind: "fact", tag: "AWS", value: "8", label: "AWS competencies", desc: "Security, Migration, Resilience, GenAI, Cloud Ops, DevOps, MSSP and Data.", icon: "shield", tone: "blue", area: "col-start-2 row-start-1" },
  { kind: "fact", tag: "Delivered", value: "1,000+", label: "Projects delivered", desc: "Migrations, modernizations and AI builds in production.", icon: "rocket", tone: "navy", area: "col-start-3 row-start-1" },
  { kind: "photo", src: "/about/award-ambassador-stage.webp", caption: "AWS Ambassador recognition", area: "col-start-2 col-span-2 row-start-2 row-span-2" },
  { kind: "fact", tag: "Award", value: "2022", label: "AWS Emerging Star Partner Award", desc: "Recognised by AWS as an Emerging Star Partner in 2022.", icon: "spark", tone: "sky", area: "col-start-1 row-start-3 row-span-2" },
  { kind: "fact", tag: "Trusted by", value: "750+", label: "Brands served", desc: "High-growth and enterprise teams worldwide.", icon: "users", tone: "blue", area: "col-start-2 row-start-4" },
  { kind: "fact", tag: "Locations", value: "4", label: "India · US · UK", desc: "Offices in Bengaluru and Pune, with a presence in the US and UK.", icon: "pin", tone: "navy", area: "col-start-3 row-start-4" },
];

/** icon drawn at a bolder stroke than the site default, for small tiles */
function Glyph({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={iconPath(name)} />
    </svg>
  );
}

export default function BentoHero() {
  const grid = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  // gentle tilt towards the pointer
  const tilt = (e: React.PointerEvent) => {
    const el = grid.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  };
  const reset = () => {
    grid.current?.style.setProperty("--rx", "0deg");
    grid.current?.style.setProperty("--ry", "0deg");
    setHover(null);
  };

  return (
    <div className="bento-stage" onPointerMove={tilt} onPointerLeave={reset}>
      <div ref={grid} className="bento-grid grid grid-cols-3 grid-rows-[repeat(4,minmax(0,1fr))] gap-2.5 sm:gap-3">
        {TILES.map((t, i) => (
          <div
            key={i}
            className={`bento-tile ${t.area} ${t.kind === "fact" ? `bento-fact bento-${t.tone}` : "bento-photo"} ${hover === i ? "is-up" : ""} ${hover !== null && hover !== i ? "is-back" : ""}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            tabIndex={0}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            aria-label={t.kind === "photo" ? t.caption : `${t.value}, ${t.label}. ${t.desc}`}
          >
            {t.kind === "photo" ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.src} alt="" className="h-full w-full object-cover" />
                <span className="bento-cap">
                  <span className="bento-cap-dot" aria-hidden="true" />
                  {t.caption}
                </span>
              </>
            ) : (
              <div className="relative flex h-full flex-col p-3.5 sm:p-4">
                <div className={`items-center gap-2 ${t.area.includes("row-span") ? "flex" : "hidden xl:flex"}`}>
                  <span className="bento-icon"><Glyph name={t.icon} /></span>
                  <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/75">{t.tag}</span>
                </div>
                {/* one-row tiles are short: value and label only; tall tiles also reveal the description */}
                {t.area.includes("row-span") ? (
                  <div className="mt-auto">
                    <span className="bento-bar" aria-hidden="true" />
                    <p className="mt-2.5 text-[clamp(1.25rem,1.95vw,1.6rem)] font-semibold leading-[1.02] tracking-tight text-white" style={{ whiteSpace: "nowrap" }}>{t.value}</p>
                    <p className="mt-1.5 text-[0.78rem] font-medium leading-snug text-white">{t.label}</p>
                    <p className="bento-desc text-[0.78rem] leading-snug text-white/85">{t.desc}</p>
                  </div>
                ) : (
                  <div className="mt-auto">
                    <p className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-none tracking-tight text-white">{t.value}</p>
                    <p className="mt-1 truncate text-[0.72rem] font-medium leading-snug text-white/95">{t.label}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
