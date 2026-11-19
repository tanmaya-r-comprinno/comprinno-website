import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Standalone campaign and recruitment landing pages: /campaign/<year>/<page-name>.
 * The site header and footer are hidden here (see .campaign rules in globals.css), so each
 * page brings its own minimal header and footer. Campaign pages stay out of search results;
 * they are reached from ads and emails.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CampaignLayout({ children }: { children: ReactNode }) {
  return <div className="campaign">{children}</div>;
}
