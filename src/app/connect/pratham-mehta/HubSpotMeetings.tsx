"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Booked = { when?: number };

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
  const box = useRef<HTMLDivElement>(null);

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
      <div ref={box} className={booked ? "hidden" : undefined}>
        {near ? (
          <div className="meetings-iframe-container [&_iframe]:!block [&_iframe]:!w-full" data-src={`${url}${url.includes("?") ? "&" : "?"}embed=true`} />
        ) : (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 border border-[var(--color-line-strong)] bg-white px-6 text-center lg:h-[670px]">
            <p className="text-sm text-neutral-600">Loading Pratham&apos;s calendar…</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[var(--brand-blue)] underline">Slow connection? Open the calendar directly</a>
          </div>
        )}
      </div>
      {near && <Script src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" strategy="afterInteractive" />}
    </>
  );
}
