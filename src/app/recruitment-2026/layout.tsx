import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Standalone recruitment landing pages: /recruitment-2026/<page-name>.
 * Reuses the .campaign wrapper, which hides the main site header and footer (see globals.css),
 * so each page brings its own minimal header and footer. Not in the site menu and not indexed.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function RecruitmentLayout({ children }: { children: ReactNode }) {
  return <div className="campaign">{children}</div>;
}
