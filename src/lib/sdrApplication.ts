export const APPLICATION_PATH = "/api/careers/sdr";
export const APPLICATION_UPLOAD_BYTES = 4_000_000;
export const APPLICATION_FILE_TYPES = ".doc,.docx,.pdf,.rtf,.odt";
import { site } from "@/lib/site";

export const CAREERS_EMAIL = site.emails.careers;
export const APPLICATION_UNAVAILABLE = `Online application submission is currently unavailable. Email your résumé to ${CAREERS_EMAIL}.`;

export function validApplicationFile(file: File): boolean {
  return file.size > 0 && /\.(docx?|pdf|rtf|odt)$/i.test(file.name);
}
