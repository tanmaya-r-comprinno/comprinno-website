"use client";

import { useRef, useState } from "react";

/**
 * "Book a meeting" button. With a Google appointment-schedule link it opens the booking page in a
 * pop-up (Google allows embedding only the `?gv=true` form of the schedule URL, not the short
 * calendar.app.google link). Without one, it falls back to an email to sales.
 */
export default function BookMeeting({ name, embed, fallback, className }: { name: string; embed?: string; fallback: string; className: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const label = (
    <>
      <span className="sm:hidden">Book a call</span>
      <span className="hidden sm:inline">Book a meeting</span>
    </>
  );

  if (!embed) return <a href={fallback} className={className}>{label}</a>;

  const show = () => { setOpen(true); dialog.current?.showModal(); };
  const close = () => { dialog.current?.close(); };

  return (
    <>
      <button type="button" onClick={show} className={className} aria-haspopup="dialog">{label}</button>
      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        aria-label={`Book a meeting with ${name}`}
        className="m-auto h-[min(92vh,760px)] w-[min(96vw,900px)] max-w-none border border-[#c8d5e8] border-t-2 border-t-[#006bc9] bg-white p-0 shadow-2xl backdrop:bg-[#0a134b]/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-[#e3eaf4] px-4 py-3 sm:px-5">
            <p className="font-semibold text-[#1c1c1c]">Book a meeting with {name}</p>
            <div className="flex items-center gap-3">
              <a href={embed.replace("?gv=true", "")} target="_blank" rel="noopener noreferrer" className="hidden text-xs text-[#006bc9] underline underline-offset-2 sm:inline">Open in new tab</a>
              <button type="button" onClick={close} aria-label="Close" className="flex h-9 w-9 items-center justify-center border border-[#c8d5e8] text-lg leading-none text-[#3d3d3d] hover:border-[#006bc9] hover:text-[#006bc9]">×</button>
            </div>
          </div>
          {/* iframe only mounts while open, so Google's page doesn't load for every visitor */}
          {open && <iframe src={embed} title={`Book a meeting with ${name}`} className="w-full flex-1 border-0" />}
        </div>
      </dialog>
    </>
  );
}
