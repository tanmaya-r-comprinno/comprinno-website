import { SDR_CAMPAIGN } from "@/content/careerCampaigns";
import { jobImageSize, jobShareImage } from "@/lib/jobShareImage";

export const alt = "Comprinno is hiring a Sales Development Representative";
export const size = jobImageSize;
export const contentType = "image/png";

export default function Image() {
  return jobShareImage(SDR_CAMPAIGN);
}
