"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { Icon, type IconName } from "./Icon";
import {
  EnterpriseScene,
  FintechScene,
  HealthcareScene,
  IsvScene,
  LifeScienceScene,
  RetailScene,
  StartupScene,
} from "./SegmentScenes";

// Segment names and lines from comprinno.net "Who we serve". Icons and scenes are our own.
const segments: { name: string; line: string; icon: IconName; Scene: ComponentType; href: string }[] = [
  { name: "Life Science", line: "Generative AI and data platforms that speed up research", icon: "dna", Scene: LifeScienceScene, href: "/industries#life-sciences" },
  { name: "Retail", line: "Peak-ready commerce with personalization and cost control", icon: "bag", Scene: RetailScene, href: "/industries#retail" },
  { name: "Healthcare", line: "Secure patient platforms and health data, designed for HIPAA", icon: "heart", Scene: HealthcareScene, href: "/industries#healthcare" },
  { name: "Fintech", line: "Payments, lending, insurance, with RBI, SEBI, IRDAI controls", icon: "card", Scene: FintechScene, href: "/industries#fintech-bfsi" },
  { name: "SaaS Startups", line: "Launch fast on a secure baseline, with the credits you qualify for.", icon: "rocket", Scene: StartupScene, href: "/industries#saas-isv" },
  { name: "ISVs", line: "Multi-tenant SaaS, CI/CD and AWS Marketplace readiness.", icon: "store", Scene: IsvScene, href: "/industries#saas-isv" },
  { name: "Tech-led Enterprises", line: "Modernize legacy platforms and scale AI across teams.", icon: "building", Scene: EnterpriseScene, href: "/industries#tech-enterprises" },
];

/**
 * Who we serve: pick a segment on the left, watch what we do for it on the right.
 * Auto-advances until the visitor interacts; first segment is server-rendered.
 */
export default function SegmentExplorer() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const paused = useRef(false);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % segments.length);
    }, 4500);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (i: number) => {
    setActive(i);
    setAuto(false);
  };
  const s = segments[active];
  const Scene = s.Scene;

  return (
    <>
    {/* Phones & tablets: simple square tiles, no scenes */}
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
      {segments.map((g) => (
        <li key={g.name}>
          <Link href={g.href} className="seg-square">
            <span className="seg-ico !h-16 !w-16"><Icon name={g.icon} className="h-9 w-9" /></span>
            <span className="mt-3 text-center text-sm font-semibold leading-snug text-ink">{g.name}</span>
          </Link>
        </li>
      ))}
    </ul>

    {/* Desktop: interactive explorer */}
    <div
      className="hidden gap-6 lg:grid lg:grid-cols-[1fr_1.3fr]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <ul className="seg-list" role="tablist" aria-label="Who we serve">
        {segments.map((g, i) => (
          <li key={g.name}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="seg-stage"
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
              className={`seg-row ${i === active ? "is-active" : ""}`}
            >
              <span className="seg-ico"><Icon name={g.icon} className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block font-semibold text-ink">{g.name}</span>
                <span className="block truncate text-xs text-muted">{g.line}</span>
              </span>
              <span className="seg-arrow" aria-hidden="true">→</span>
              {i === active && auto && <span className="seg-progress" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ul>

      <div id="seg-stage" role="tabpanel" className="seg-stage">
        <div key={s.name} className="seg-hero">
          <div className="seg-scene bg-grid"><Scene /></div>
          <h3 className="mt-6 text-2xl font-semibold sm:text-3xl">{s.name}</h3>
          <p className="mt-2 max-w-md text-base text-muted">{s.line}</p>
          <Link href={s.href} className="mt-5 inline-block text-sm font-medium text-ink">
            See how we help <span className="go">→</span>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
