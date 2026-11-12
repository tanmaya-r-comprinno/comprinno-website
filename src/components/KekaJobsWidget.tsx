"use client";

import { useEffect } from "react";

/**
 * Keka Jobs Widget
 * Embeds the Keka job board using their official embed code.
 */
export default function KekaJobsWidget() {
  useEffect(() => {
    // Define khConfig as per Keka's embed code
    (window as any).khConfig = {
      identifier: "1f7a7e3f-2b83-448c-a9f3-368f72583618",
      domain: "https://comprinno.keka.com/careers/",
      targetContainer: "#khembedjobs",
    };

    // Load the Keka embed script
    const script = document.createElement("script");
    script.src = "https://comprinno.keka.com/careers/api/embedjobs/js/1f7a7e3f-2b83-448c-a9f3-368f72583618";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      delete (window as any).khConfig;
    };
  }, []);

  return <div id="khembedjobs" className="keka-jobs-widget" />;
}
