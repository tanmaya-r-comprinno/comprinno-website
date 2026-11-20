"use client";

import { useMemo, useState } from "react";
import type { CallResult } from "./CallPanel";
import ApplyModal from "./ApplyModal";
import { reviewCall, type Buyer, type Score } from "./voiceAgent";

const mono = "font-mono text-[.6rem] uppercase tracking-[.12em]";
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const SHORT = ["Opening", "Discovery", "Objection", "Value", "Next step"];

/** Five-skill radar: the shape of the call at a glance. */
function Radar({ scores, size = 200 }: { scores: Score[]; size?: number }) {
  const c = size / 2, R = size * 0.32;
  const pt = (i: number, v: number) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return [c + Math.cos(a) * R * (v / 5), c + Math.sin(a) * R * (v / 5)];
  };
  const poly = (v: (i: number) => number) => scores.map((_, i) => pt(i, v(i)).join(",")).join(" ");
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="vox-radar shrink-0" role="img"
      aria-label={scores.map((s) => `${s.label} ${s.score} of 5`).join(", ")}>
      <defs>
        <linearGradient id="vox-radar-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c4cf1" stopOpacity=".55" />
          <stop offset="1" stopColor="#d9559a" stopOpacity=".45" />
        </linearGradient>
      </defs>
      {[1, 2, 3, 4, 5].map((r) => <polygon key={r} points={poly(() => r)} fill="none" stroke="#6c4cf1" strokeOpacity={r === 5 ? 0.22 : 0.1} />)}
      {scores.map((_, i) => { const [x, y] = pt(i, 5); return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#6c4cf1" strokeOpacity=".1" />; })}
      <polygon className="vox-radar-shape" points={poly((i) => scores[i].score)} fill="url(#vox-radar-fill)" stroke="#6c4cf1" strokeWidth="1.5" strokeLinejoin="round" />
      {scores.map((s, i) => { const [x, y] = pt(i, s.score); return <circle key={i} cx={x} cy={y} r="3" fill="#fff" stroke={s.score <= 2 ? "#d9559a" : "#6c4cf1"} strokeWidth="1.5" />; })}
      {scores.map((s, i) => {
        const [x, y] = pt(i, 6.35);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-[#77738f] text-[9px] font-medium">
            {SHORT[i]} <tspan className={s.score <= 2 ? "fill-[#d9559a]" : "fill-[#15122e]"} fontWeight="700">{s.score}</tspan>
          </text>
        );
      })}
    </svg>
  );
}

/** Shown after the call ends: the real transcript, read back as skills, moments and one line to try next. */
export default function CallReview({ buyer, result, onRetry, onPickAnother }: {
  buyer: Buyer; result: CallResult; onRetry: () => void; onPickAnother: () => void;
}) {
  const r = useMemo(() => reviewCall(buyer, result.lines, result.booked), [buyer, result]);
  const first = buyer.name.split(" ")[0];
  const [applying, setApplying] = useState(false);
  const talk = Math.round(r.talk * 100);

  return (
    <div className="vox relative flex h-full min-h-[40rem] flex-col overflow-hidden">
      <div className="relative flex flex-wrap items-center justify-between gap-2 px-5 pt-5 sm:px-6">
        <p className={`${mono} text-[#77738f]`}>03 · Your call, reviewed</p>
        <span className="vox-chip r-full">Instant feedback</span>
      </div>

      {/* everything between header and buttons scrolls if a small screen needs it; the card never grows */}
      <div className="vox-log relative min-h-0 flex-1 overflow-y-auto px-5 pb-4 sm:px-6">
        {/* summary: the shape of the call, the verdict, three numbers */}
        <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-5">
          <Radar scores={r.scores} />
          <div className="w-full min-w-0 text-center sm:text-left">
            <p className="text-xs text-[#77738f]">Call with {buyer.name} · <span className="tabular-nums">{mmss(result.seconds)}</span></p>
            <p className="vox-name-agent mt-1 text-2xl font-bold tracking-tight">{r.verdict}</p>
            <p className="mt-1 text-sm text-[#2a2550]">
              <b className="tabular-nums">{r.total}</b><span className="text-[#77738f]">/25</span>
              {" · "}{result.booked ? <b className="text-[#6c4cf1]">✓ Meeting booked</b> : <span className="text-[#77738f]">No meeting yet</span>}
            </p>
            <dl className="mt-3 grid grid-cols-3 gap-2">
              <div className="vox-stat r-lg">
                <dt className={mono}>You talked</dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums">{talk}%</dd>
                <span className="vox-meter r-full" aria-hidden="true"><span className="r-full" style={{ width: `${talk}%` }} /><i style={{ left: "45%" }} /></span>
              </div>
              <div className="vox-stat r-lg">
                <dt className={mono}>Questions</dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums">{r.questions}</dd>
              </div>
              <div className="vox-stat r-lg">
                <dt className={mono}>Brief used</dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums">{r.facts}<span className="text-sm text-[#77738f]">/3</span></dd>
              </div>
            </dl>
          </div>
        </div>

        {/* key moments, in your own words */}
        <p className={`${mono} mt-5 text-[#77738f]`}>Key moments</p>
        <ol className="mt-2 grid gap-2">
          {r.moments.map((m) => (
            <li key={m.label} className="vox-moment r-lg grid grid-cols-[1.5rem_1fr] gap-x-3 p-3">
              <span className={`vox-mark r-full ${m.good ? "is-good" : "is-fix"}`} aria-label={m.good ? "Went well" : "To work on"}>{m.good ? "✓" : "!"}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#15122e]">{m.label}</p>
                {m.quote && <p className="mt-0.5 truncate text-sm italic text-[#2a2550]">“{m.quote}”</p>}
                <p className="mt-0.5 text-xs text-[#77738f]">{m.comment}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* one better line, aimed at the weakest skill and this buyer */}
        <div className="vox-next r-lg mt-4 p-4">
          <p className={`${mono} text-[#6c4cf1]`}>Try this next · {r.tryNext.skill}</p>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#15122e]">“{r.tryNext.line}”</p>
        </div>
      </div>

      {/* phone: two equal secondaries, full-width primary below. sm+: one row, primary on the right */}
      <div className="vox-dock relative grid shrink-0 grid-cols-2 gap-2 px-4 py-3 sm:flex sm:items-center sm:justify-end sm:px-5">
        <button type="button" onClick={onRetry} className="vox-btn r-full truncate px-3 py-2.5 text-sm font-medium sm:mr-auto sm:px-4">↻ Call {first} again</button>
        <button type="button" onClick={onPickAnother} className="vox-btn r-full truncate px-3 py-2.5 text-sm font-medium sm:px-4">Another buyer</button>
        <button type="button" onClick={() => setApplying(true)} className="vox-send r-full col-span-2 px-5 py-3 text-sm font-semibold sm:py-2.5">Apply with this call →</button>
      </div>
      <ApplyModal open={applying} onClose={() => setApplying(false)}
        call={{ buyer: buyer.name, verdict: r.verdict, total: r.total, seconds: result.seconds, booked: result.booked }} />
    </div>
  );
}
