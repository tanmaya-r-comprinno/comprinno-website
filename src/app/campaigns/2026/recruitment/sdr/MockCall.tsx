"use client";

import { useCallback, useState } from "react";
import CallPanel from "./CallPanel";
import CallReview from "./CallReview";
import { mmss, type Buyer, type BuyerId, type CallResult } from "@/lib/sdrVoice";
import { useVoiceCall, type EndedCall } from "./useVoiceCall";

const buyers: Buyer[] = [
  {
    id: "ananya", seg: "Series B fintech", mood: "Busy", name: "Ananya Rao", role: "CTO", initials: "AR",
    co: "PayLattice · payments platform (fictional)",
    found: ["Hiring 4 platform engineers this quarter", "Core ledger still runs on-premise", "Regulatory audit due in six months"],
    goal: "Book a 30-minute assessment call", watch: "We already have a cloud partner.",
  },
  {
    id: "rohan", seg: "SaaS ISV", mood: "Skeptical", name: "Rohan Mehta", role: "VP Engineering", initials: "RM",
    co: "StackNimbus · B2B analytics SaaS (fictional)",
    found: ["AWS bill grew 60% in the last year", "Planning an AI assistant inside the product", "Two senior DevOps engineers left recently"],
    goal: "Book a 30-minute cost and architecture review", watch: "We can do this ourselves.",
  },
  {
    id: "meera", seg: "Healthcare", mood: "Curious", name: "Meera Iyer", role: "Head of Data", initials: "MI",
    co: "CareGrid · diagnostics network (fictional)",
    found: ["Opening 40 new collection centres this year", "Reports still compiled by hand each week", "Exploring GenAI for report summaries"],
    goal: "Book a 30-minute data and AI discovery call", watch: "Patient data can't leave our systems.",
  },
  {
    id: "vikram", seg: "Logistics", mood: "Guarded", name: "Vikram Sethi", role: "CFO", initials: "VS",
    co: "Ironwood Freight · freight and warehousing (fictional)",
    found: ["Fuel costs cut margins by 2 points this year", "Locked into a 3-year cloud contract, review clause at month 20", "Board wants predictable costs before IPO prep"],
    goal: "Book a 30-minute cost model review with finance", watch: "We're locked into a contract with another partner.",
  },
  {
    id: "karan", seg: "Insurance", mood: "Hostile", name: "Karan Malhotra", role: "CISO", initials: "KM",
    co: "NovaShield · digital insurer (fictional)",
    found: ["A competitor had a public data breach last month", "New IRDAI security guidelines due this year", "11 security tools, 4 analysts, constant alert noise"],
    goal: "Book a 30-minute read-only security review", watch: "We don't let vendors near our environment.",
  },
];

const mono = "font-mono text-[.62rem] uppercase tracking-[.12em] text-neutral-500";
// each buyer's temperament gets its own colour so it reads at a glance
const MOOD: Record<string, string> = {
  Busy: "border-amber-300 bg-amber-50 text-amber-800",
  Skeptical: "border-rose-300 bg-rose-50 text-rose-700",
  Curious: "border-emerald-300 bg-emerald-50 text-emerald-700",
  Guarded: "border-violet-300 bg-violet-50 text-violet-700",
  Hostile: "border-red-400 bg-red-50 text-red-700",
};

/** Buyer picker + AI brief; starting the call swaps the brief for the live call screen (CallPanel). */
export default function MockCall() {
  const [id, setId] = useState(buyers[0].id);
  const [calls, setCalls] = useState<Partial<Record<BuyerId, { session: EndedCall; result?: CallResult }>>>({});
  const [reviewing, setReviewing] = useState(false);
  const b = buyers.find((x) => x.id === id)!;
  const ended = useCallback((session: EndedCall) => {
    setCalls((previous) => ({ ...previous, [id]: { session } }));
    setReviewing(true);
  }, [id]);
  const onReport = useCallback((result: CallResult) => {
    setCalls((previous) => {
      const last = previous[id];
      if (last?.session.callId !== result.callId) return previous;
      return { ...previous, [id]: { ...last, result } };
    });
  }, [id]);
  const call = useVoiceCall(ended);
  const inCall = call.phase !== "idle";
  const last = calls[id];
  const showReview = !inCall && reviewing && !!last;
  const start = () => {
    setReviewing(false);
    void call.start(id);
  };

  return (
    <div className="grid border border-neutral-300 bg-white lg:grid-cols-[2fr_3fr]">
      <div className="border-b border-neutral-300 p-5 lg:border-b-0 lg:border-r">
        <p className={mono}>01 · Pick your buyer</p>
        <div className="mt-4 grid gap-2">
          {buyers.map((x) => (
            <button key={x.id} type="button" onClick={() => { setId(x.id); setReviewing(false); }} disabled={inCall}
              className={`border p-3 text-left transition ${x.id === id ? "border-[#006bc9] bg-[#e3f0fc] [box-shadow:inset_3px_0_0_#006bc9]" : "border-neutral-300 hover:border-[#006bc9]"} ${inCall && x.id !== id ? "opacity-45" : ""} disabled:cursor-not-allowed`}>
              <span className="flex items-center justify-between gap-2">
                <span className={mono}>{x.seg}</span>
                <span className={`inline-flex shrink-0 items-center gap-1.5 border px-2 py-0.5 text-[.68rem] font-semibold uppercase tracking-[.06em] ${MOOD[x.mood] ?? "border-neutral-300 bg-white text-neutral-700"}`}>
                  <svg viewBox="0 0 6 6" className="h-1.5 w-1.5" aria-hidden="true"><circle cx="3" cy="3" r="3" fill="currentColor" /></svg>{x.mood}
                </span>
              </span>
              <span className="mt-1 block text-sm font-semibold text-neutral-900">{x.name} · {x.role}</span>
              <span className="block text-xs text-neutral-500">{x.co}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">Fictional buyers and companies, played by our voice agent. Each one has a real objection waiting for you.</p>
      </div>

      {/* the brief always stays in the layout (hidden during a call) and the call screen sits over it,
          so the card keeps one height: no jump when a call starts or ends */}
      <div className="relative flex min-h-[40rem] flex-col">
      {inCall && <div className="absolute inset-0 z-10"><CallPanel buyer={b} call={call} /></div>}
      {showReview && last && (
        <div className="absolute inset-0 z-10">
          <CallReview key={last.session.callId} buyer={b} session={last.session} result={last.result}
            onReport={onReport} onRetry={start} onPickAnother={() => setReviewing(false)} />
        </div>
      )}
      <div className={`flex flex-1 flex-col p-5 ${inCall || showReview ? "invisible" : ""}`} aria-hidden={inCall || showReview}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={mono}>02 · Your AI-prepared brief</p>
          <span className="border border-[#b7e4c7] bg-[#e3f6ec] px-2 py-0.5 font-mono text-[.58rem] uppercase tracking-[.1em] text-[#11804a]">Research done in seconds, not hours</span>
        </div>
        {/* every buyer's brief sits in the same grid cell, so the card keeps the height of the longest one */}
        <div className="grid">
          {buyers.map((x) => (
            <div key={x.id} className={`[grid-area:1/1] ${x.id === id ? "" : "invisible"}`} aria-hidden={x.id !== id}>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#c9e0f6] bg-[#e3f0fc] text-sm font-semibold text-[#006bc9]">{x.initials}</span>
                <div>
                  <p className="text-lg font-semibold text-neutral-900">{x.name}, {x.role}</p>
                  <p className="text-sm text-neutral-500">{x.co}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="border border-neutral-300 p-4">
                  <p className={mono}>What the AI found</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-neutral-800">{x.found.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
                <div className="border border-neutral-300 p-4">
                  <p className={mono}>Your goal</p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">{x.goal}</p>
                  <p className={`${mono} mt-3`}>Watch out for</p>
                  <p className="mt-1 text-sm italic text-[#c0362c]">“{x.watch}”</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-neutral-200 pt-4 lg:mt-6">
          <p className="text-xs text-neutral-500">About 5 minutes. Uses your microphone. By starting, you agree to recording and transcription for review with your application.</p>
          <button type="button" onClick={start} className="btn btn-primary mt-3">
            ☏ {last ? "Call" : "Start the call with"} {b.name.split(" ")[0]}{last ? " again" : ""}
          </button>
          <div className="mt-3 min-h-[4.5rem]">
            {last && (
              <button type="button" onClick={() => setReviewing(true)}
                className="w-full border border-neutral-300 p-3 text-left text-sm hover:border-[#006bc9]">
                <span className={mono}>Last call · {mmss(last.result?.durationSec ?? last.session.seconds)}</span><br />
                <span className="font-semibold text-[#006bc9]">View call review →</span>
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
