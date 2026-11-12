"use client";

import { useRef, type ReactNode } from "react";

/**
 * On hover the badge stops swaying and leans toward the viewer, following the
 * cursor on the Y axis (and a little on X), then settles back when the cursor leaves.
 */
export default function TiltBadge({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(x * 24).toFixed(1)}deg`);
    el.style.setProperty("--rx", `${(-y * 10).toFixed(1)}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty("--ry", "0deg");
    ref.current?.style.setProperty("--rx", "0deg");
  };
  return (
    <div ref={ref} className="tilt-badge" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
