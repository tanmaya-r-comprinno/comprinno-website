/**
 * Keka jobs that have their own page on our site.
 *
 * The careers board links these jobs to `href` (instead of Keka) and shows `badge`.
 * The same entry feeds the page's share image and, for SDR, the Keka application lookup.
 *
 * If HR recreates a job in Keka, update `kekaJobId` here: it is the number at the end of
 * https://comprinno.keka.com/careers/jobdetails/<id>. Closing and reopening keeps the ID.
 */
export type CareerCampaign = {
  kekaJobId: number;
  href: string;
  badge: string;
  /** Share image and preview text. */
  title: string;
  location: string;
  experience: string;
  hook: string;
};

export const SDR_CAMPAIGN: CareerCampaign = {
  kekaJobId: 156580,
  href: "/campaigns/2026/recruitment/sdr",
  badge: "Apply with a mock call",
  title: "Sales Development Representative",
  location: "Pune / Bangalore",
  experience: "1–3 yrs",
  hook: "Skip the CV queue. Take a 5-minute mock call with our AI buyer to apply.",
};

export const careerCampaigns: CareerCampaign[] = [SDR_CAMPAIGN];

export const campaignForJob = (kekaJobId: number) => careerCampaigns.find((c) => c.kekaJobId === kekaJobId);
