"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Room } from "livekit-client";
import {
  CALL_LIMIT_SECONDS, CALLS_PATH, type BrowserCallSession, type BuyerId, type Turn,
} from "@/lib/sdrVoice";

export type EndedCall = { callId: string; reportToken: string; seconds: number };

type Attempt = {
  controller: AbortController;
  room?: Room;
  mic?: MediaStreamTrack;
  audio: Set<HTMLMediaElement>;
  timer?: number;
  call?: EndedCall;
  startedAt?: number;
};

function release(attempt: Attempt) {
  attempt.controller.abort();
  window.clearInterval(attempt.timer);
  attempt.mic?.stop();
  attempt.audio.forEach((element) => element.remove());
  attempt.room?.removeAllListeners();
  void attempt.room?.disconnect().catch(() => undefined);
}

export function useVoiceCall(onEnd: (call: EndedCall) => void) {
  const active = useRef<Attempt | null>(null);
  const level = useRef(0);
  const [phase, setPhase] = useState<"idle" | "connecting" | "ringing" | "live" | "error">("idle");
  const [lines, setLines] = useState<Turn[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [limit, setLimit] = useState(CALL_LIMIT_SECONDS);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [error, setError] = useState("");

  const finish = useCallback(() => {
    const attempt = active.current;
    if (!attempt) return;
    active.current = null;
    release(attempt);
    level.current = 0;
    setPhase("idle");
    if (attempt.call && attempt.startedAt !== undefined) {
      onEnd({ ...attempt.call, seconds: Math.floor((performance.now() - attempt.startedAt) / 1000) });
    }
  }, [onEnd]);

  const start = async (buyer: BuyerId) => {
    if (active.current) return;
    const attempt: Attempt = { controller: new AbortController(), audio: new Set() };
    active.current = attempt;
    setPhase("connecting");
    setLines([]);
    setSeconds(0);
    setLimit(CALL_LIMIT_SECONDS);
    setSpeaking(false);
    setMuted(false);
    setAudioBlocked(false);
    setError("");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Open this page over HTTPS in a browser that supports microphone access.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      if (active.current !== attempt) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      attempt.mic = stream.getAudioTracks()[0];
      const { Room, RoomEvent, Track, setLogLevel } = await import("livekit-client");
      if (active.current !== attempt) return;

      const response = await fetch(CALLS_PATH, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ buyer }),
        signal: attempt.controller.signal,
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(body?.message ?? "The call could not be started.");
      }
      const session = (await response.json()) as BrowserCallSession;
      if (active.current !== attempt) return;
      attempt.call = { callId: session.callId, reportToken: session.reportToken, seconds: 0 };

      setLogLevel("warn");
      const room = new Room();
      attempt.room = room;
      setPhase("ringing");
      room
        .on(RoomEvent.TrackSubscribed, (track) => {
          if (track.kind !== Track.Kind.Audio) return;
          const element = track.attach();
          element.hidden = true;
          document.body.appendChild(element);
          attempt.audio.add(element);
        })
        .on(RoomEvent.TrackUnsubscribed, (track) => {
          track.detach().forEach((element) => {
            attempt.audio.delete(element);
            element.remove();
          });
        })
        .on(RoomEvent.AudioPlaybackStatusChanged, (canPlay) => setAudioBlocked(!canPlay))
        .on(RoomEvent.ActiveSpeakersChanged, (speakers) => {
          setSpeaking(speakers.some((speaker) => !speaker.isLocal));
          level.current = room.localParticipant.audioLevel;
        })
        .on(RoomEvent.DataReceived, (payload) => {
          try {
            const message = JSON.parse(new TextDecoder().decode(payload));
            if (message?.type === "voxsphere.transcript" && typeof message.text === "string" &&
                (message.speaker === "user" || message.speaker === "agent")) {
              const who = message.speaker === "user" ? "you" : "buyer";
              setLines((current) => [...current, { who, text: message.text }]);
            }
          } catch {
            // LiveKit can carry other data alongside transcript messages.
          }
        })
        .on(RoomEvent.Disconnected, () => {
          if (active.current !== attempt || attempt.startedAt === undefined) return;
          finish();
        });

      await room.connect(session.url, session.token);
      if (active.current !== attempt) return;
      await room.localParticipant.publishTrack(attempt.mic, { source: Track.Source.Microphone });
      if (active.current !== attempt) return;

      const duration = session.maxDurationSecs > 0
        ? Math.min(CALL_LIMIT_SECONDS, session.maxDurationSecs)
        : CALL_LIMIT_SECONDS;
      setLimit(duration);
      const startedAt = performance.now();
      attempt.startedAt = startedAt;
      setPhase("live");
      attempt.timer = window.setInterval(() => {
        const elapsed = Math.floor((performance.now() - startedAt) / 1000);
        setSeconds(elapsed);
        if (elapsed >= duration) finish();
      }, 250);
    } catch (cause) {
      if (active.current !== attempt) return;
      active.current = null;
      release(attempt);
      setPhase("error");
      if (cause instanceof DOMException && cause.name === "NotAllowedError") {
        setError("Allow microphone access in your browser, then try again.");
      } else if (cause instanceof DOMException && cause.name === "NotFoundError") {
        setError("Connect a microphone, then try again.");
      } else {
        setError(cause instanceof Error ? cause.message : "The call could not be started.");
      }
    }
  };

  const toggleMute = async () => {
    const attempt = active.current;
    if (!attempt?.room) return;
    try {
      const publication = await attempt.room.localParticipant.setMicrophoneEnabled(muted);
      if (active.current !== attempt) return;
      setMuted(publication?.isMuted ?? true);
      setError("");
    } catch {
      if (active.current === attempt) setError("Could not change the microphone. Please try again.");
    }
  };

  const enableAudio = async () => {
    const attempt = active.current;
    if (!attempt?.room) return;
    try {
      await attempt.room.startAudio();
      if (active.current === attempt) setError("");
    } catch {
      if (active.current === attempt) setError("Could not play the buyer’s audio. Please try again.");
    }
  };

  useEffect(() => () => {
    const attempt = active.current;
    active.current = null;
    if (attempt) release(attempt);
  }, []);

  return { phase, lines, seconds, limit, speaking, muted, audioBlocked, error, level, start, finish, toggleMute, enableAudio };
}
