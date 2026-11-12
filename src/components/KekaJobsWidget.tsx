"use client";

import { useEffect, useRef } from "react";

/**
 * Keka Jobs Widget
 * Embeds the Keka job board iframe via their embed script.
 */
export default function KekaJobsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Keka embed script
    const script = document.createElement("script");
    script.src = "https://comprinno.keka.com/careers/api/embedjobs/js/1f7a7e3f-2b83-448c-a9f3-368f72583618";
    script.async = true;
    script.defer = true;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="keka-jobs-widget min-h-[400px]" />
  );
}
