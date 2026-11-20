/**
 * Keka integration points for the SDR application flow.
 *
 * Keka API keys must never reach the browser: both functions should call our own
 * route handlers (e.g. /api/careers/...), which talk to Keka server-side.
 */

export type HiringManager = {
  name: string;
  title: string;
  email: string;      // company email
  linkedin: string;   // full profile URL
  photo?: string;     // optional avatar URL from Keka
};

// TODO(keka): replace with the Keka job posting ID for the SDR role
export const SDR_JOB_ID = "sdr-2026";

/** Sample data, shown until the Keka endpoint is wired. Replace, don't ship. */
const SAMPLE: HiringManager = {
  name: "Hiring Manager",
  title: "Head of Sales Development",
  email: "careers@comprinno.net",
  linkedin: "https://www.linkedin.com/company/comprinno/",
};

/** Hiring manager for a job posting. */
export async function getHiringManager(jobId = SDR_JOB_ID): Promise<HiringManager> {
  // TODO(keka): const res = await fetch(`/api/careers/jobs/${jobId}/hiring-manager`); return res.json();
  void jobId;
  return SAMPLE;
}

/** "linkedin.com/in/asha-rao/" → "asha-rao"; company pages fall back to the last path segment. */
export function linkedinHandle(url: string) {
  const parts = url.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] || url;
}
