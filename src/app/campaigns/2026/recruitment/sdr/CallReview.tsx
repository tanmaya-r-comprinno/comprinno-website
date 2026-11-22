"use client";

import { useEffect, useState } from "react";
import { CALLS_PATH, mmss, type Buyer, type CallResult, type CriterionScore, type Verdict } from "@/lib/sdrVoice";
import ApplyModal from "./ApplyModal";
import type { EndedCall } from "./useVoiceCall";

const mono = "font-mono text-[.6rem] uppercase tracking-[.12em]";
const SHORT = ["Opening", "Discovery", "Objection", "Value", "Next step"];
const VERDICT: Record<Verdict, string> = {
  no_call: "No candidate speech detected",
  keep_practising: "Keep practising",
  one_fix_away: "Close. One fix away",
  ready: "Ready for the floor",
};
const POLL_INTERVAL_MS = 5_000;
const POLL_TIMEOUT_MS = 4 * 60_000;

/** Five-skill radar: the shape of the call at a glance. */
function Radar({ scores, size = 200 }: { scores: CriterionScore[]; size?: number }) {
  const c = size / 2, R = size * 0.32;
  const pt = (i: number, v: number) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return [c + Math.cos(a) * R * (v / 5), c + Math.sin(a) * R * (v / 5)];
  };
  const poly = (v: (i: number) => number) => scores.map((_, i) => pt(i, v(i)).join(",")).join(" ");
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="vox-radar shrink-0" role="img"
      aria-label={scores.map((s) => `${s.criterion} ${s.score} of 5`).join(", ")}>
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
export default function CallReview({ buyer, session, result, onReport, onRetry, onPickAnother }: {
  buyer: Buyer;
  session: EndedCall;
  result?: CallResult;
  onReport: (result: CallResult) => void;
  onRetry: () => void;
  onPickAnother: () => void;
}) {
  const first = buyer.name.split(" ")[0];
  const [applying, setApplying] = useState(false);
  const [pollAttempt, setPollAttempt] = useState(0);
  const [pollIssue, setPollIssue] = useState("");
  const seconds = result?.durationSec ?? session.seconds;
  const coaching = result?.coaching;
  const talk = result?.callerTalkShare === undefined ? undefined : Math.round(result.callerTalkShare * 100);
  const verdict = result?.verdict ? VERDICT[result.verdict] : undefined;
  const moments = coaching && [
    { label: "Your opening", ...coaching.moments.opening },
    { label: `${first}'s push-back`, ...coaching.moments.objection },
    { label: "The ask", ...coaching.moments.ask },
  ];
  const total = result?.status === "completed" && result.verdict !== "no_call" ? result.totalScore : undefined;
  const scored = result != null && total !== undefined;

  useEffect(() => {
    if (result?.status === "completed") return;
    const controller = new AbortController();
    const deadline = Date.now() + POLL_TIMEOUT_MS;
    let timer: number;
    const check = async () => {
      try {
        const response = await fetch(`${CALLS_PATH}/${encodeURIComponent(session.callId)}`, {
          headers: { Authorization: `Bearer ${session.reportToken}` },
          cache: "no-store",
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(25_000)]),
        });
        if (response.ok) {
          const report = (await response.json()) as CallResult;
          if (report.status === "completed" && !controller.signal.aborted) {
            onReport(report);
            return;
          }
        }
      } catch {
        // Try again until the deadline if the network or upstream is temporarily unavailable.
      }
      if (controller.signal.aborted) return;
      if (Date.now() < deadline) timer = window.setTimeout(check, POLL_INTERVAL_MS);
      else setPollIssue("Your review is taking longer than expected.");
    };
    timer = window.setTimeout(check, 1_000);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [session, result?.status, onReport, pollAttempt]);

  return (
    <div className="vox relative flex h-full min-h-[40rem] flex-col overflow-hidden">
      <div className="relative flex flex-wrap items-center justify-between gap-2 px-5 pt-5 sm:px-6">
        <p className={`${mono} text-[#77738f]`}>03 · Your call, reviewed</p>
        <span className="vox-chip r-full">{scored ? "Call feedback" : result ? "Call ended" : "Call review"}</span>
      </div>

      {/* everything between header and buttons scrolls if a small screen needs it; the card never grows */}
      <div className="vox-log relative min-h-0 flex-1 overflow-y-auto px-5 pb-4 sm:px-6">
        {!scored ? (
          <div className="mt-6 space-y-2">
            <p className="text-sm text-[#77738f]">Call with {buyer.name} · {mmss(seconds)}</p>
            <p role="status" className="font-semibold text-[#15122e]">
              {result ? (verdict ?? "A score is unavailable for this call.") : (pollIssue || "Scoring your call… this usually takes about a minute.")}
            </p>
            {result?.verdict === "no_call" && <p className="text-sm text-[#77738f]">Try another call and make sure your microphone is on.</p>}
            {pollIssue && (
              <button type="button" onClick={() => { setPollIssue(""); setPollAttempt((value) => value + 1); }}
                className="vox-btn r-full px-3 py-2 text-sm font-medium">Check again</button>
            )}
          </div>
        ) : (
          <>
            {/* summary: the shape of the call, the verdict, three numbers */}
            <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-5">
              {result.scorecard?.length === 5 && <Radar scores={result.scorecard} />}
              <div className="w-full min-w-0 text-center sm:text-left">
                <p className="text-xs text-[#77738f]">Call with {buyer.name} · <span className="tabular-nums">{mmss(seconds)}</span></p>
                <p className="vox-name-agent mt-1 text-2xl font-bold tracking-tight">{verdict}</p>
                <p className="mt-1 text-sm text-[#2a2550]">
                  <b className="tabular-nums">{total}</b><span className="text-[#77738f]">/{result.maxScore ?? 25}</span>
                  {" · "}{result.goalAchieved ? <b className="text-[#6c4cf1]">✓ Meeting booked</b> : <span className="text-[#77738f]">No meeting yet</span>}
                </p>
                <dl className="mt-3 grid grid-cols-3 gap-2">
                  <div className="vox-stat r-lg">
                    <dt className={mono}>You talked</dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">{talk === undefined ? "—" : `${talk}%`}</dd>
                    {talk !== undefined && <span className="vox-meter r-full" aria-hidden="true"><span className="r-full" style={{ width: `${talk}%` }} /><i style={{ left: "45%" }} /></span>}
                  </div>
                  <div className="vox-stat r-lg">
                    <dt className={mono}>Questions</dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">{coaching?.questionsAsked ?? "—"}</dd>
                  </div>
                  <div className="vox-stat r-lg">
                    <dt className={mono}>Brief used</dt>
                    <dd className="mt-1 text-lg font-semibold tabular-nums">{coaching?.briefUsed.length ?? "—"}{coaching && <span className="text-sm text-[#77738f]">/{coaching.briefTotal}</span>}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* key moments, in your own words */}
            {moments && (
              <>
                <p className={`${mono} mt-5 text-[#77738f]`}>Key moments</p>
                <ol className="mt-2 grid gap-2">
                  {moments.map((m) => (
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
              </>
            )}

            {/* one better line, aimed at the weakest skill and this buyer */}
            {coaching?.tryNext.line && <div className="vox-next r-lg mt-4 p-4">
              <p className={`${mono} text-[#6c4cf1]`}>Try this next · {coaching.tryNext.skill}</p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#15122e]">“{coaching.tryNext.line}”</p>
            </div>}
          </>
        )}
      </div>

      {/* phone: two equal secondaries, full-width primary below. sm+: one row, primary on the right */}
      <div className="vox-dock relative grid shrink-0 grid-cols-2 gap-2 px-4 py-3 sm:flex sm:items-center sm:justify-end sm:px-5">
        <button type="button" onClick={onRetry} className="vox-btn r-full truncate px-3 py-2.5 text-sm font-medium sm:mr-auto sm:px-4">↻ Call {first} again</button>
        <button type="button" onClick={onPickAnother} className="vox-btn r-full truncate px-3 py-2.5 text-sm font-medium sm:px-4">Another buyer</button>
        <button type="button" onClick={() => setApplying(true)} disabled={!scored} className="disabled:opacity-40 vox-send r-full col-span-2 px-5 py-3 text-sm font-semibold sm:py-2.5">Apply with this call →</button>
      </div>
      {scored && <ApplyModal open={applying} onClose={() => setApplying(false)}
        call={{ callId: session.callId, buyer: buyer.name, verdict: verdict ?? "Call reviewed", total,
          max: result.maxScore ?? 25, seconds, booked: result.goalAchieved === true }} />}
    </div>
  );
}
