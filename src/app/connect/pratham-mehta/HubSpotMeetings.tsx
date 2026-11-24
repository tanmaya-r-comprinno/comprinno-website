"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Booked = { when?: number };

/** Calendar-shaped placeholder shown until HubSpot's iframe has loaded. */
function CalendarSkeleton({ slow, url }: { slow: boolean; url: string }) {
  const bar = "bg-neutral-200 motion-safe:animate-pulse";
  return (
    <div role="status" aria-live="polite" className="flex h-full min-h-[560px] flex-col border border-[var(--color-line-strong)] bg-white lg:h-[670px]">
      <span className="sr-only">Loading Pratham&apos;s calendar</span>
      <div className="grid flex-1 sm:grid-cols-2" aria-hidden="true">
        {/* left: avatar, title, month grid */}
        <div className="flex flex-col items-center gap-4 border-b border-neutral-100 p-6 sm:border-b-0 sm:border-r">
          <span className={`h-16 w-16 !rounded-full ${bar}`} />
          <span className={`h-5 w-48 ${bar}`} />
          <span className={`h-4 w-32 ${bar}`} />
          <div className="mt-2 grid w-full max-w-xs grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => <span key={i} className={`aspect-square ${bar}`} style={{ animationDelay: `${(i % 7) * 60}ms` }} />)}
          </div>
        </div>
        {/* right: duration picker and time slots */}
        <div className="hidden flex-col gap-3 p-6 sm:flex">
          <span className={`h-4 w-40 ${bar}`} />
          <span className={`h-9 w-full ${bar}`} />
          <span className={`mt-3 h-4 w-44 ${bar}`} />
          {Array.from({ length: 7 }, (_, i) => <span key={i} className={`h-10 w-full ${bar}`} style={{ animationDelay: `${i * 80}ms` }} />)}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-neutral-100 px-4 py-3 text-center text-sm text-neutral-600">
        <span>Loading Pratham&apos;s calendar…</span>
        {slow && <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--brand-blue)] underline">Taking a while? Open it directly</a>}
      </div>
    </div>
  );
}

/**
 * HubSpot's official inline meetings embed (books straight into Pratham's calendar).
 * HubSpot's own confirmation (a cartoon tick inside its iframe) can't be styled, so when the
 * embed reports a booking we swap it for our own confirmation, using the site's check icon.
 *
 * Weight: HubSpot's embed pulls ~3 MB (plus its analytics). We only load it when the calendar
 * comes within ~800px of the viewport (or the visitor jumps to #calendar), so the page itself stays light.
 */
export default function HubSpotMeetings({ url }: { url: string }) {
  const [booked, setBooked] = useState<Booked | null>(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false); // HubSpot iframe has loaded
  const [slow, setSlow] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);

  // Once loading starts: watch for the iframe HubSpot injects and wait for its load event.
  useEffect(() => {
    const el = holder.current;
    if (!near || !el) return;
    let frame: HTMLIFrameElement | null = null;
    const done = () => window.setTimeout(() => setReady(true), 400); // let HubSpot paint inside the frame
    const hook = () => {
      const f = el.querySelector("iframe");
      if (!f || f === frame) return;
      frame = f;
      f.addEventListener("load", done, { once: true });
    };
    const mo = new MutationObserver(hook);
    mo.observe(el, { childList: true, subtree: true });
    hook();
    const slowTimer = window.setTimeout(() => setSlow(true), 8000);
    return () => { mo.disconnect(); frame?.removeEventListener("load", done); window.clearTimeout(slowTimer); };
  }, [near]);

  useEffect(() => {
    const el = box.current;
    if (!el || near) return;
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) setNear(true); }, { rootMargin: "800px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!/^https:\/\/meetings(-[a-z0-9]+)?\.hubspot\.com$/.test(e.origin)) return;
      if (!e.data?.meetingBookSucceeded) return;
      const when = e.data?.meetingsPayload?.bookingResponse?.event?.dateTime;
      setBooked({ when: typeof when === "number" ? when : undefined });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  let done = null;
  if (booked) {
    const when = booked.when
      ? new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(booked.when)
      : null;
    done = (
      <div role="status" className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 border border-[var(--color-line-strong)] bg-white px-6 py-12 text-center">
        <span className="grid aspect-square h-16 w-16 shrink-0 place-items-center !rounded-full bg-[var(--brand-blue)] text-white shadow-[0_10px_30px_-10px_var(--brand-blue)]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
        </span>
        <h3 className="text-2xl font-semibold text-[var(--brand-navy)]">You&apos;re booked in</h3>
        {when && <p className="font-medium text-neutral-800">{when}</p>}
        <p className="max-w-sm text-sm text-neutral-600">A calendar invite with the meeting link is on its way to your email. Bring a rough view of what you run today.</p>
      </div>
    );
  }

  // HubSpot script owns the iframe it injects, so we hide the container instead of unmounting it.
  return (
    <>
      {done}
      <div ref={box} className={booked ? "hidden" : "relative h-full"}>
        {!ready && <CalendarSkeleton slow={slow} url={url} />}
        {near && (
          // kept out of view (not display:none, so HubSpot can size it) until the iframe has loaded
          <div ref={holder} className={ready ? undefined : "pointer-events-none invisible absolute inset-x-0 top-0 -z-10"}>
            <div className="meetings-iframe-container [&_iframe]:!block [&_iframe]:!w-full" data-src={`${url}${url.includes("?") ? "&" : "?"}embed=true`} />
          </div>
        )}
      </div>
      {near && <Script src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" strategy="afterInteractive" />}
    </>
  );
}
