import { cacheLife } from "next/cache";

/**
 * Open roles from Keka (the same feed Keka's careers widget uses).
 * HR adds or closes a job in Keka; the site picks it up within the hour.
 */
const ID = "1f7a7e3f-2b83-448c-a9f3-368f72583618";
const BASE = "https://comprinno.keka.com/careers/";

export type Job = { id: number; title: string; department: string; cities: string[]; experience: string; days: number; url: string };

type Raw = { id: number; title: string; departmentName?: string; jobLocations?: { city?: string }[]; experience?: string; publishedSinceDays?: number };

export async function getJobs(): Promise<Job[]> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`${BASE}api/embedjobs/default/active/${ID}`);
    if (!res.ok) return [];
    const raw = (await res.json()) as Raw[];
    return raw.map((j) => ({
      id: j.id,
      title: j.title.replace(/​/g, "").trim(),
      department: j.departmentName?.trim() || "Other",
      cities: [...new Set((j.jobLocations ?? []).map((l) => l.city?.replace("Bengaluru", "Bengaluru") ?? "").filter(Boolean))],
      experience: (j.experience ?? "").replace(/\s*-\s*/g, "–").replace(/\s*(years?|yrs?)\b/i, " yrs").trim(),
      days: j.publishedSinceDays ?? 0,
      url: `${BASE}jobdetails/${j.id}`,
    }));
  } catch {
    return [];
  }
}
