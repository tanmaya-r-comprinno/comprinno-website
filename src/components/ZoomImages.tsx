"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps article content: clicking any image opens it in a pop-up where the reader
 * can zoom (buttons, mouse wheel, double-click) and drag to pan. Esc or the
 * backdrop closes it. Detailed architecture diagrams become readable this way.
 */
export default function ZoomImages({ children }: { children: ReactNode }) {
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const close = useCallback(() => setImg(null), []);
  const zoom = useCallback((d: number) => setScale((s) => Math.min(6, Math.max(1, +(s + d).toFixed(2)))), []);

  useEffect(() => {
    if (!img) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") zoom(0.5);
      if (e.key === "-") zoom(-0.5);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [img, close, zoom]);

  // reset pan when fully zoomed out
  const shownPos = scale === 1 ? { x: 0, y: 0 } : pos;

  return (
    <>
      <div
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t.tagName !== "IMG") return;
          e.preventDefault();
          const el = t as HTMLImageElement;
          setScale(1); setPos({ x: 0, y: 0 });
          setImg({ src: el.currentSrc || el.src, alt: el.alt });
        }}
        className="zoomable"
      >
        {children}
      </div>

      {img && (
        <div role="dialog" aria-modal="true" aria-label={img.alt || "Image"} className="fixed inset-0 z-[100] flex flex-col bg-[#0a134b]/90 backdrop-blur-sm" onClick={close}>
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
            <p className="truncate font-mono text-xs uppercase tracking-widest text-white/70">{img.alt || "Diagram"}</p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => zoom(-0.5)} disabled={scale <= 1} className="zoom-btn" aria-label="Zoom out">−</button>
              <span className="w-12 text-center font-mono text-xs">{Math.round(scale * 100)}%</span>
              <button type="button" onClick={() => zoom(0.5)} disabled={scale >= 6} className="zoom-btn" aria-label="Zoom in">+</button>
              <button type="button" onClick={() => { setScale(1); setPos({ x: 0, y: 0 }); }} className="zoom-btn !w-auto px-3 text-xs" aria-label="Reset zoom">Reset</button>
              <button type="button" onClick={close} className="zoom-btn ml-2" aria-label="Close">✕</button>
            </div>
          </div>
          <div
            className={`relative flex-1 overflow-hidden ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => zoom(e.deltaY < 0 ? 0.25 : -0.25)}
            onDoubleClick={() => (scale > 1 ? (setScale(1), setPos({ x: 0, y: 0 })) : setScale(2.5))}
            onPointerDown={(e) => { if (scale > 1) { drag.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y }; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); } }}
            onPointerMove={(e) => { const d = drag.current; if (d) setPos({ x: d.px + (e.clientX - d.x) / scale, y: d.py + (e.clientY - d.y) / scale }); }}
            onPointerUp={() => (drag.current = null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              className="absolute left-1/2 top-1/2 max-h-[88%] max-w-[94%] select-none bg-white p-2 shadow-2xl transition-transform duration-150"
              style={{ transform: `translate(-50%, -50%) scale(${scale}) translate(${shownPos.x}px, ${shownPos.y}px)` }}
            />
          </div>
          <p className="pb-3 text-center text-xs text-white/60">Scroll or use + / − to zoom · drag to move · double-click to toggle · Esc to close</p>
        </div>
      )}
    </>
  );
}
