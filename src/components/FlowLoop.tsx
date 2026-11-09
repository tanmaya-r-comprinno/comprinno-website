"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";

const ICONS: IconName[] = ["search", "layers", "eye", "loop"];
const DWELL = 2200; // ms a phase stays "running"
const MOVE = 1500; // ms to glide to the next phase
const RETURN = 3000; // ms to glide back along the dashed return loop
const TRACK_Y = 28; // px: centre of the 3.5rem nodes

type Pt = [number, number];
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Point at fraction f (0..1) along a polyline. */
function along(pts: Pt[], f: number): Pt {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let d = f * seg.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const k = seg[i] ? Math.min(1, d / seg[i]) : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    d -= seg[i];
  }
  return pts[pts.length - 1];
}

/**
 * "How we work" as a live run. One square glides node to node along the track
 * (each phase runs in turn: done ✓ → running → queued). After the last phase it
 * slips behind the phase cards, runs back along the dashed "repeat" line and
 * comes up behind the first icon. It always travels behind the icons, never on top.
 * Hover or focus a phase to jump there and pause. Reduced motion: static, all done.
 */
export default function FlowLoop({
  items,
  icons = ICONS,
  caption = "Repeat again: every cycle starts smarter than the last",
}: {
  items: { title: string; desc: string }[];
  icons?: IconName[];
  caption?: string;
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [still, setStill] = useState(false);
  const [size, setSize] = useState({ w: 1000, h: 400, by: 360 });
  const ref = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const paused = useRef(false);
  const jumpTo = useRef<number | null>(null);

  // measure: width, and the y of the return loop's bottom edge (just above the caption)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const cap = capRef.current;
      setSize({ w: el.clientWidth, h: el.clientHeight, by: cap ? cap.offsetTop - 14 : el.clientHeight - 30 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, by } = size;
  const nodeX = (i: number) => (w * (i + 0.5)) / n; // centre of column i
  const r = 14; // corner radius of the loop
  const loopD = `M${nodeX(n - 1)} ${TRACK_Y}V${by - r}Q${nodeX(n - 1)} ${by} ${nodeX(n - 1) - r} ${by}H${nodeX(0) + r}Q${nodeX(0)} ${by} ${nodeX(0)} ${by - r}V${TRACK_Y}`;

  // sequencer: one clock drives the square, the fill and the active phase
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setStill(true));
      return () => cancelAnimationFrame(id);
    }
    const X = (i: number) => (w * (i + 0.5)) / n;
    const R = 14;
    const route: Pt[] = [
      [X(n - 1), TRACK_Y], [X(n - 1), by - R], [X(n - 1) - R, by], [X(0) + R, by], [X(0), by - R], [X(0), TRACK_Y],
    ];
    const cycle = n * DWELL + (n - 1) * MOVE + RETURN;
    const startOf = (i: number) => i * (DWELL + MOVE);
    let clock = 0;
    let last = performance.now();
    let raf = 0;
    let shown = -1;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(100, now - last);
      last = now;
      if (jumpTo.current !== null) {
        clock = startOf(jumpTo.current) + 1;
        jumpTo.current = null;
      } else if (!paused.current && !document.hidden) clock = (clock + dt) % cycle;

      let pos: Pt;
      let phase: number;
      let fillX: number;
      const tail = startOf(n - 1) + DWELL; // last phase finished
      if (clock >= tail) {
        const f = ease((clock - tail) / RETURN);
        pos = along(route, f);
        fillX = f > 0.15 ? X(0) : X(n - 1); // fill clears once the square heads home
        phase = f > 0.97 ? 0 : n - 1;
      } else {
        const i = Math.floor(clock / (DWELL + MOVE));
        const t = clock - startOf(i);
        if (t < DWELL) {
          phase = i;
          pos = [X(i), TRACK_Y];
        } else {
          const f = ease((t - DWELL) / MOVE);
          pos = [X(i) + (X(i + 1) - X(i)) * f, TRACK_Y];
          phase = f > 0.85 ? i + 1 : i;
        }
        fillX = pos[0];
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos[0] - 5.5}px, ${pos[1] - 5.5}px)`;
        dotRef.current.style.opacity = "1";
      }
      if (fillRef.current) fillRef.current.style.width = `${Math.max(0, fillX - X(0))}px`;
      if (phase !== shown) {
        shown = phase;
        setActive(phase);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [n, w, by]);

  return (
    <div ref={ref} className="loop" style={{ "--n": n } as CSSProperties} onMouseLeave={() => (paused.current = false)}>
      {/* desktop: track, dashed return loop and the gliding square */}
      <svg className="loop-lines" width={w} height={size.h} aria-hidden="true">
        <path d={loopD} className="loop-back" fill="none" />
        <path d={`M${nodeX(0)} ${TRACK_Y}H${nodeX(n - 1)}`} className="loop-base" />
      </svg>
      <span ref={fillRef} className="loop-fill" style={{ left: nodeX(0), width: still ? nodeX(n - 1) - nodeX(0) : 0 }} aria-hidden="true" />
      {!still && <span ref={dotRef} className="loop-signal" style={{ opacity: 0 }} aria-hidden="true" />}

      <ol className="loop-steps">
        {items.map((s, i) => {
          const state = still || i < active ? "done" : i === active ? "run" : "wait";
          return (
            <li
              key={s.title}
              className={`loop-step is-${state}`}
              tabIndex={0}
              onMouseEnter={() => { jumpTo.current = i; paused.current = true; }}
              onFocus={() => { jumpTo.current = i; paused.current = true; }}
            >
              <span className="loop-node"><Icon name={icons[i % icons.length]} className="h-6 w-6" /></span>
              <span className="loop-status" aria-hidden="true">
                {state === "done" ? "✓ done" : state === "run" ? "running" : "queued"}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </li>
          );
        })}
      </ol>

      <p ref={capRef} className="loop-caption" aria-hidden="true">{caption}</p>
    </div>
  );
}
