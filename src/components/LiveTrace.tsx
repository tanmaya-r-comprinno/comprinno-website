"use client";

import { useEffect, useState } from "react";

const LINES = [
  { dot: "●", text: "alert received · api latency high" },
  { dot: "●", text: "agent gathered logs, metrics, recent deploys" },
  { dot: "●", text: "probable cause found · evidence attached" },
  { dot: "◐", text: "restart proposed · awaiting human sign-off", approve: true },
  { dot: "●", text: "approved by human · action executed" },
  { dot: "○", text: "logged · handover kept" },
];

/**
 * Illustrative "agent trace" that replays on a loop.
 * Initial render shows the full trace (no-JS / SSR friendly); after hydration
 * it replays line by line. Skipped for reduced-motion users.
 */
export default function LiveTrace() {
  const [step, setStep] = useState(LINES.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      setStep(n);
      if (n < LINES.length) {
        n += 1;
        timer = setTimeout(run, n === 5 ? 1700 : 950); // longer pause = "human thinking"
      } else {
        n = 0;
        timer = setTimeout(run, 4000);
      }
    };
    run();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="card min-h-[18.5rem] font-mono text-xs leading-7 sm:text-sm"
      role="img"
      aria-label="Illustrative example of an agent trace: alert received, agent investigates, finds cause, a human approves, action is logged."
    >
      <p className="text-muted">{"// illustrative trace · tevico"}</p>
      <div className="min-h-[11.5rem]" aria-hidden="true">
        {LINES.slice(0, step).map((l, i) => {
          const approved = l.approve && step > i + 1;
          return (
            <p key={l.text} className="trace-line">
              <span className={l.dot === "◐" && !approved ? "text-accent" : "text-ok"}>
                {approved ? "●" : l.dot}
              </span>{" "}
              {l.text}
              {l.approve && (
                <span
                  className={`ml-2 rounded-md border px-2 py-0.5 text-[0.7rem] ${
                    approved ? "border-ok text-ok" : "border-line-strong text-ink-2"
                  }`}
                >
                  {approved ? "✓ approved" : "approve"}
                </span>
              )}
            </p>
          );
        })}
        {step < LINES.length && <span className="caret text-muted">▍</span>}
      </div>
    </div>
  );
}
