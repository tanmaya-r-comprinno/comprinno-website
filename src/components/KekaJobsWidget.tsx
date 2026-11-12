"use client";

/**
 * Keka Jobs Widget
 * Embeds the Keka job board in an iframe since direct script embedding
 * is blocked by CORS from localhost.
 */
export default function KekaJobsWidget() {
  // Keka provides an embeddable URL - construct the iframe src
  const iframeSrc = "https://comprinno.keka.com/careers/joblist/1f7a7e3f-2b83-448c-a9f3-368f72583618";

  return (
    <div className="keka-jobs-widget border border-line bg-bg">
      <iframe
        src={iframeSrc}
        title="Comprinno Careers - Open Positions"
        className="w-full min-h-[600px] border-0"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
