"use client";

import { useEffect, useRef } from "react";
import { mmss, type Buyer } from "@/lib/sdrVoice";
import type { useVoiceCall } from "./useVoiceCall";
import VoxOrb, { type OrbState } from "./VoxOrb";

const mono = "font-mono text-[.62rem] uppercase tracking-[.12em]";

export default function CallPanel({ buyer, call }: { buyer: Buyer; call: ReturnType<typeof useVoiceCall> }) {
  const { phase, lines, seconds, limit, muted, speaking, level, error, audioBlocked } = call;
  const first = buyer.name.split(" ")[0];
  const log = useRef<HTMLDivElement>(null);
  const live = phase === "live";
  const failed = phase === "error";
  const status = live
    ? speaking ? `${first} is speaking` : muted ? "You're muted" : "Your turn"
    : failed ? "Could not connect" : phase === "ringing" ? `Calling ${first}` : "Connecting";
  const orb: OrbState = live ? muted ? "muted" : speaking ? "agent" : "you" : failed ? "idle" : "ringing";
  const progress = Math.min(100, (seconds / limit) * 100);

  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [lines]);

  return (
    // fills the card's fixed-height slot, and nothing inside changes size during a call: the transcript scrolls. VoxSphere palette only.
    <div className="vox relative flex h-full min-h-[40rem] flex-col overflow-hidden">
      {/* header: live chip, timer, and a thin line showing time used of the five minutes */}
      <div className="relative flex items-center justify-between px-5 pt-5 sm:px-6">
        <span className={`vox-chip r-full ${live ? "is-live" : ""}`}>
          <span className="vox-dot r-full" aria-hidden="true" />
          {live ? "Live" : status}
        </span>
        <span className="vox-time" aria-label={`Call time ${mmss(seconds)}`}>{mmss(seconds)}</span>
      </div>
      <div className="vox-progress relative mx-5 mt-3 h-px sm:mx-6" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>

      {/* the particle voice orb: ripples with the buyer's voice, follows your mic level on your turn */}
      <div className="relative flex shrink-0 flex-col items-center text-center">
        <div className="relative grid place-items-center">
          <VoxOrb level={level} state={orb} size={176} />
          <span className="vox-initials r-full">{buyer.initials}</span>
        </div>
        <p className="-mt-3 text-base font-semibold tracking-tight text-[#15122e]">{buyer.name}</p>
        <p className="text-xs text-[#77738f]">{buyer.role} · {buyer.co}</p>
        <p role="status" className={`${mono} mt-2 h-4 text-[#6c4cf1]`}>{status}</p>
      </div>

      {/* transcript as a conversation: buyer on the left, you on the right; scrolls in place */}
      <div ref={log} className="vox-log relative mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto px-5 pb-3 pt-4 text-sm leading-relaxed sm:px-6" aria-live="polite" aria-label="Live transcript">
        {lines.length === 0 && !error && <p className={`${mono} pt-6 text-center text-[#a9a5c2]`}>Live transcript appears here</p>}
        {lines.map((l, i) => (
          <div key={i} className={`vox-msg ${l.who === "you" ? "is-you" : ""}`}>
            <span className="vox-bubble r-lg">{l.text}</span>
          </div>
        ))}
        {error && <p role="alert" className="text-center text-sm text-[#9c2558]">{error}</p>}
      </div>

      <div className="vox-dock relative flex shrink-0 items-center gap-2 px-4 py-3 sm:px-5">
        <button type="button" onClick={call.toggleMute} disabled={!live} aria-pressed={muted} aria-label={muted ? "Unmute" : "Mute"} title={muted ? "Unmute" : "Mute"}
          className="vox-btn r-full grid h-11 w-11 shrink-0 place-items-center disabled:opacity-40">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3" />
            {muted && <path d="M4 4l16 16" />}
          </svg>
        </button>
        <div className="vox-input r-full flex h-11 min-w-0 flex-1 items-center px-4 text-sm text-[#77738f]">
          {audioBlocked && live
            ? <button type="button" onClick={call.enableAudio} className="font-semibold text-[#6c4cf1]">Enable audio</button>
            : failed
              ? <button type="button" onClick={() => { void call.start(buyer.id); }} className="font-semibold text-[#6c4cf1]">Try again</button>
              : <span>{live ? (muted ? "Microphone muted" : "Speak into your microphone") : "Connecting voice and microphone…"}</span>}
        </div>
        <button type="button" onClick={call.finish} aria-label={live ? "End call" : "Back to the brief"}
          className="vox-end r-full flex h-11 shrink-0 items-center gap-2 px-4 text-sm font-semibold">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 9c-2.6 0-5.1.6-7.3 1.8-.7.4-1.1 1.1-1.1 1.9v2.1c0 .8.8 1.4 1.6 1.2l3-.8c.6-.2 1-.7 1-1.3v-1.6a12 12 0 0 1 5.6 0v1.6c0 .6.4 1.1 1 1.3l3 .8c.8.2 1.6-.4 1.6-1.2v-2.1c0-.8-.4-1.5-1.1-1.9A15 15 0 0 0 12 9z" /></svg>
          <span className="hidden sm:inline">{live ? "End" : "Back"}</span>
        </button>
      </div>
    </div>
  );
}
