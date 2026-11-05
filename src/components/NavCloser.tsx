"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Desktop dropdowns open on :hover and :focus-within (pure CSS).
 * After a link is clicked, focus stays on it and the cursor is still over the
 * menu, so the dropdown would stay open. This closes it:
 *  - on click: suppress the open state until the pointer leaves that menu
 *  - on route change: drop focus from the clicked link
 */
export default function NavCloser() {
  const pathname = usePathname();

  useEffect(() => {
    const el = document.activeElement as HTMLElement | null;
    if (el?.closest("nav[aria-label='Primary']")) el.blur();
  }, [pathname]);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("nav[aria-label='Primary']");
    if (!nav) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest("a");
      const group = link?.closest<HTMLElement>(".group");
      if (!link || !group) return;
      group.classList.add("nav-closed");
      link.blur();
      const reopen = () => group.classList.remove("nav-closed");
      group.addEventListener("mouseleave", reopen, { once: true });
    };
    nav.addEventListener("click", onClick);
    return () => nav.removeEventListener("click", onClick);
  }, []);

  return null;
}
