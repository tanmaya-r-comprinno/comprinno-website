"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createAgent, type AgentSession, type Buyer } from "./voiceAgent";
import VoxOrb, { type OrbState } from "./VoxOrb";

/* Minimal Web Speech API types (not in TypeScript's DOM lib yet). */
type SRAlt = { transcript: string };
type SRResult = { isFinal: boolean; 0: SRAlt };
type SREvent = { resultIndex: number; results: ArrayLike<SRResult> };
type SR = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((e: SREvent) => void) | null; onend: (() => void) | null; onerror: ((e: { error: string }) => void) | null;
  start: () => void; stop: () => void; abort: () => void;
};
const getSR = (): (new () => SR) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

type Line = { who: "buyer" | "you"; text: string };
type Phase = "connecting" | "ringing" | "live" | "ended";
export type CallResult = { seconds: number; turns: number; booked: boolean };

const LIMIT = 5 * 60; // the call ends itself at five minutes
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
const mono = "font-mono text-[.62rem] uppercase tracking-[.12em]";

/**
 * The live call screen. Uses the microphone for your voice level, live speech-to-text where the
 * browser supports it (typing works everywhere), and speaks the buyer's lines aloud.
 */
export default function CallPanel({ buyer, onEnd }: { buyer: Buyer; onEnd: (r: CallResult) => void }) {
  const first = buyer.name.split(" ")[0];
  const [phase, setPhase] = useState<Phase>("connecting");
  const [lines, setLines] = useState<Line[]>([]);
  const [interim, setInterim] = useState("");
  const [typed, setTyped] = useState("");
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false); // the buyer is talking
  const [mic, setMic] = useState<"pending" | "on" | "off">("pending");
  const [seconds, setSeconds] = useState(0);
  const [booked, setBooked] = useState(false);
  const [stt, setStt] = useState(false); // browser speech-to-text available

  const agent = useRef<AgentSession | null>(null);
  const rec = useRef<SR | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const level = useRef(0); // your mic level, 0 to 1, read by the orb every frame
  const log = useRef<HTMLDivElement>(null);
  // live values for callbacks that outlive a render
  const live = useRef({ muted: false, speaking: false, ended: false, turns: 0, booked: false, seconds: 0 });

  const listen = useCallback(() => {
    const r = rec.current;
    const l = live.current;
    if (!r || l.muted || l.speaking || l.ended) return;
    try { r.start(); } catch { /* already listening */ }
  }, []);

  const finish = useCallback(() => {
    const l = live.current;
    if (l.ended) return;
    l.ended = true;
    agent.current?.end();
    rec.current?.abort();
    window.speechSynthesis?.cancel();
    stream.current?.getTracks().forEach((t) => t.stop());
    audio.current?.close().catch(() => {});
    setPhase("ended");
    setSpeaking(false);
    onEnd({ seconds: l.seconds, turns: l.turns, booked: l.booked });
  }, [onEnd]);

  // the buyer says a line: into the transcript, then out loud (or a reading-time pause without speech)
  const buyerSays = useCallback((text: string, after?: () => void) => {
    if (live.current.ended && !after) return;
    setLines((ls) => [...ls, { who: "buyer", text }]);
    setSpeaking(true);
    live.current.speaking = true;
    rec.current?.abort();
    const done = () => { live.current.speaking = false; setSpeaking(false); if (after) after(); else listen(); };
    const synth = window.speechSynthesis;
    if (synth && typeof SpeechSynthesisUtterance !== "undefined") {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-IN";
      u.rate = 1.05;
      u.onend = done;
      u.onerror = done;
      synth.cancel();
      synth.speak(u);
    } else {
      window.setTimeout(done, 400 + text.split(" ").length * 280);
    }
  }, [listen]);

  // a finished line from you goes to the transcript and the agent
  const youSay = useCallback((text: string) => {
    const t = text.trim();
    if (!t || live.current.ended) return;
    live.current.turns++;
    setLines((ls) => [...ls, { who: "you", text: t }]);
    setInterim("");
    agent.current?.send(t);
  }, []);

  // connect: microphone, speech-to-text, agent
  useEffect(() => {
    let cancelled = false;
    let hangup: (() => void) | null = null;
    const l = live.current;
    l.ended = false; l.turns = 0;

    agent.current = createAgent(buyer, {
      onSay: (text) => buyerSays(text, hangup ?? undefined),
      onBooked: () => { live.current.booked = true; setBooked(true); },
      // hang up only after the last line has been spoken
      onHangup: () => { hangup = () => window.setTimeout(finish, 600); },
    });

    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
        if (cancelled) { s.getTracks().forEach((t) => t.stop()); return; }
        stream.current = s;
        const ctx = new AudioContext();
        audio.current = ctx;
        const an = ctx.createAnalyser();
        an.fftSize = 256;
        ctx.createMediaStreamSource(s).connect(an);
        const buf = new Uint8Array(an.frequencyBinCount);
        // your voice level drives the orb (a ref, no re-render per frame)
        const tick = () => {
          if (live.current.ended) return;
          an.getByteFrequencyData(buf);
          let sum = 0;
          for (let i = 0; i < buf.length; i++) sum += buf[i];
          const lvl = live.current.muted ? 0 : Math.min(1, sum / buf.length / 60);
          level.current = lvl;
          requestAnimationFrame(tick);
        };
        tick();
        setMic("on");
      } catch {
        setMic("off");
      }

      const SRC = getSR();
      if (SRC && !cancelled) {
        const r = new SRC();
        r.lang = "en-IN";
        r.continuous = true;
        r.interimResults = true;
        r.onresult = (e) => {
          let partial = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const res = e.results[i];
            if (res.isFinal) youSay(res[0].transcript);
            else partial += res[0].transcript;
          }
          setInterim(partial);
        };
        // recognition stops on silence: pick it up again while it's your turn
        r.onend = () => window.setTimeout(listen, 150);
        r.onerror = (e) => { if (e.error === "not-allowed" || e.error === "service-not-allowed") { rec.current = null; setStt(false); } };
        rec.current = r;
        setStt(true);
      }

      if (cancelled) return;
      setPhase("ringing");
      window.setTimeout(() => {
        if (cancelled || live.current.ended) return;
        setPhase("live");
        agent.current?.start();
      }, 1600);
    })();

    return () => {
      cancelled = true;
      l.ended = true;
      agent.current?.end();
      rec.current?.abort();
      window.speechSynthesis?.cancel();
      stream.current?.getTracks().forEach((t) => t.stop());
      audio.current?.close().catch(() => {});
    };
    // one connection per buyer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyer.id]);

  // call timer, with the five-minute limit
  useEffect(() => {
    if (phase !== "live") return;
    const t = window.setInterval(() => setSeconds(++live.current.seconds), 1000);
    return () => window.clearInterval(t);
  }, [phase]);
  useEffect(() => { if (seconds >= LIMIT) finish(); }, [seconds, finish]);

  // mute: silence the mic track and stop listening
  const toggleMute = () => {
    const m = !live.current.muted;
    live.current.muted = m;
    setMuted(m);
    stream.current?.getAudioTracks().forEach((t) => (t.enabled = !m));
    if (m) { rec.current?.abort(); setInterim(""); } else listen();
  };

  // keep the newest line in view
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [lines, interim]);

  const canSpeak = mic === "on" && stt;
  const status = phase === "connecting" ? "Connecting" : phase === "ringing" ? `Calling ${first}` : phase === "ended" ? "Call ended" : speaking ? `${first} is speaking` : muted ? "You're muted" : "Your turn";

  const orb: OrbState = muted ? "muted" : phase === "connecting" || phase === "ringing" ? "ringing" : speaking ? "agent" : phase === "live" ? "you" : "idle";
  const progress = Math.min(100, (seconds / LIMIT) * 100);

  const live_ = phase === "live";
  const hint = !live_ ? "The call hasn't started yet" : speaking ? `${first} is speaking…` : muted ? "Muted · type your reply" : canSpeak ? "Speak, or type your reply" : mic === "off" ? "Microphone off · type your reply" : "Type your reply";

  return (
    // fills the card's fixed-height slot, and nothing inside changes size during a call: the transcript scrolls. VoxSphere palette only.
    <div className="vox relative flex h-full min-h-[40rem] flex-col overflow-hidden">
      {/* header: live chip, timer, and a thin line showing time used of the five minutes */}
      <div className="relative flex items-center justify-between px-5 pt-5 sm:px-6">
        <span className={`vox-chip r-full ${live_ ? "is-live" : ""}`}>
          <span className="vox-dot r-full" aria-hidden="true" />
          {live_ ? "Live" : status}
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
        <p role="status" className={`${mono} mt-2 h-4 ${booked ? "vox-name-agent font-semibold" : "text-[#6c4cf1]"}`}>{booked ? "✓ Meeting booked" : status}</p>
      </div>

      {/* transcript as a conversation: buyer on the left, you on the right; scrolls in place */}
      <div ref={log} className="vox-log relative mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto px-5 pb-3 pt-4 text-sm leading-relaxed sm:px-6" aria-live="polite" aria-label="Live transcript">
        {lines.length === 0 && <p className={`${mono} pt-6 text-center text-[#a9a5c2]`}>Live transcript appears here</p>}
        {lines.map((l, i) => (
          <div key={i} className={`vox-msg ${l.who === "you" ? "is-you" : ""}`}>
            <span className="vox-bubble r-lg">{l.text}</span>
          </div>
        ))}
        {/* what you're saying right now, before it's final */}
        {interim && (
          <div className="vox-msg is-you"><span className="vox-bubble is-interim r-lg">{interim}</span></div>
        )}
      </div>

      {/* dock: mic, reply box, end call. Always the same size, so nothing jumps. */}
      <form className="vox-dock relative flex shrink-0 items-center gap-2 px-4 py-3 sm:px-5" onSubmit={(e) => { e.preventDefault(); youSay(typed); setTyped(""); }}>
        <button type="button" onClick={toggleMute} disabled={!live_ || mic !== "on"} aria-pressed={muted} aria-label={muted ? "Unmute" : "Mute"} title={muted ? "Unmute" : "Mute"}
          className="vox-btn r-full grid h-11 w-11 shrink-0 place-items-center disabled:opacity-40">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3" />
            {muted && <path d="M4 4l16 16" />}
          </svg>
        </button>
        <div className="vox-input r-full flex min-w-0 flex-1 items-center pl-4 pr-1">
          <input value={typed} onChange={(e) => setTyped(e.target.value)} disabled={!live_ || speaking}
            placeholder={hint} aria-label="Type your reply"
            className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#15122e] placeholder:text-[#77738f] focus:outline-none disabled:cursor-not-allowed" />
          <button type="submit" disabled={!live_ || speaking || !typed.trim()} aria-label="Send" className="vox-send r-full grid h-9 w-9 shrink-0 place-items-center disabled:opacity-30">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
        <button type="button" onClick={finish} disabled={phase === "ended"} aria-label="End call" title="End call"
          className="vox-end r-full flex h-11 shrink-0 items-center gap-2 px-4 text-sm font-semibold disabled:opacity-40">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 9c-2.6 0-5.1.6-7.3 1.8-.7.4-1.1 1.1-1.1 1.9v2.1c0 .8.8 1.4 1.6 1.2l3-.8c.6-.2 1-.7 1-1.3v-1.6a12 12 0 0 1 5.6 0v1.6c0 .6.4 1.1 1 1.3l3 .8c.8.2 1.6-.4 1.6-1.2v-2.1c0-.8-.4-1.5-1.1-1.9A15 15 0 0 0 12 9z" /></svg>
          <span className="hidden sm:inline">End</span>
        </button>
      </form>
    </div>
  );
}
