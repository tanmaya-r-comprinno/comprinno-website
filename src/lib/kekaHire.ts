import "server-only";
import { SDR_CAMPAIGN } from "@/content/careerCampaigns";

const HIRE_API = "https://comprinno.keka.com/api/v1/hire";
const OUTBOUND_POSTING = `/careers/jobdetails/${SDR_CAMPAIGN.kekaJobId}`;
const JOB_TITLE = "sales development representative (outbound)";
const DETAILS_FIELD = "sdr campaign details";

type Job = { id: string; title: string; careerPortalUrl?: string };
type Field = {
  id: string;
  fieldName: string;
  required: boolean;
  fieldOptions?: { id: string; value: string }[] | null;
};
type Form = { jobId: string; fields: Field[]; resume?: Field; details?: Field; documents: Field[] };

export class KekaError extends Error {
  constructor(readonly status: number, readonly operation: string) {
    super(`Keka ${operation}: HTTP ${status}`);
  }
}

async function request(url: string, operation: string, init: RequestInit) {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(12_000),
  });
  if (!response.ok) throw new KekaError(response.status, operation);
  return response;
}

let auth: { value: string; expires: number } | undefined;
async function token() {
  if (auth && auth.expires > Date.now()) return auth.value;
  const client_id = process.env.KEKA_CLIENT_ID;
  const client_secret = process.env.KEKA_CLIENT_SECRET;
  const api_key = process.env.KEKA_API_KEY;
  if (!client_id || !client_secret || !api_key) throw new KekaError(503, "configuration");

  const response = await request("https://login.keka.com/connect/token", "authentication", {
    method: "POST",
    body: new URLSearchParams({ grant_type: "kekaapi", scope: "kekaapi", client_id, client_secret, api_key }),
  });
  const { access_token, expires_in } = await response.json();
  if (typeof access_token !== "string" || !access_token) throw new KekaError(502, "authentication");
  auth = { value: access_token, expires: Date.now() + Math.max(0, Number(expires_in) - 30) * 1000 };
  return auth.value;
}

async function hire(path: string, operation: string, body?: FormData | Record<string, unknown>) {
  const headers = { Authorization: `Bearer ${await token()}`, Accept: "application/json" };
  if (!body) return request(`${HIRE_API}${path}`, operation, { headers });
  const multipart = body instanceof FormData;
  return request(`${HIRE_API}${path}`, operation, {
    method: "POST",
    headers: multipart ? headers : { ...headers, "Content-Type": "application/json" },
    body: multipart ? body : JSON.stringify(body),
  });
}

function rows<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object" && "data" in payload && Array.isArray(payload.data)) return payload.data;
  throw new KekaError(502, "response format");
}

async function outboundJobId() {
  const explicit = process.env.KEKA_SDR_JOB_ID?.trim();
  if (explicit) return explicit;
  for (let page = 1; page <= 10; page++) {
    const response = await hire(`/jobs?pageNumber=${page}&pageSize=100`, "job lookup");
    const jobs = rows<Job>(await response.json());
    const job = jobs.find((item) => item.title?.trim().toLowerCase() === JOB_TITLE &&
      item.careerPortalUrl?.replace(/\/+$/, "").endsWith(OUTBOUND_POSTING));
    if (job?.id) return job.id;
    if (jobs.length < 100) break;
  }
  throw new KekaError(503, "Outbound SDR job lookup");
}

export const fieldLabel = (field: Field) => field.fieldName.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

let formCache: { promise: Promise<Form>; expires: number } | undefined;
export function getSdrForm() {
  if (formCache && formCache.expires > Date.now()) return formCache.promise;
  const promise = (async () => {
    const jobId = await outboundJobId();
    const response = await hire(`/jobs/${encodeURIComponent(jobId)}/applicationfields`, "application fields");
    const fields = rows<Field>(await response.json()).filter((field) => field?.id && field.fieldName);
    const label = (process.env.KEKA_SDR_DETAILS_FIELD || DETAILS_FIELD).trim().toLowerCase();
    const details = fields.find((field) => field.id.toLowerCase() === label || field.fieldName.trim().toLowerCase() === label);
    const resume = fields.find((field) => ["resume", "resume cv", "cv"].includes(fieldLabel(field)));
    if (details && details.id === resume?.id) throw new KekaError(503, "application field configuration");
    const documents = fields.filter((field) => /^additional document [1-3]$/.test(fieldLabel(field)))
      .sort((a, b) => fieldLabel(a).localeCompare(fieldLabel(b)));
    return { jobId, fields, resume, details, documents };
  })().catch((error) => {
    formCache = undefined;
    throw error;
  });
  formCache = { promise, expires: Date.now() + 60_000 };
  return promise;
}

export async function uploadKekaDocument(file: File) {
  const data = new FormData();
  data.set("file", file);
  const response = await hire("/documents", "document upload", data);
  const payload = await response.json();
  const id = payload.attachmentId ?? payload.data?.attachmentId;
  if (typeof id !== "string" || !id) throw new KekaError(502, "document upload response");
  return id;
}

async function writeResult(response: Response, operation: string) {
  const raw = await response.text();
  let payload;
  try { payload = JSON.parse(raw); } catch { return raw; }
  if (payload?.succeeded === false) {
    const status = Number(payload.status);
    throw new KekaError(status >= 400 && status <= 599 ? status : 502, operation);
  }
  return payload?.data ?? payload;
}

export async function createKekaCandidate(jobId: string, data: Record<string, unknown>) {
  const operation = "candidate creation";
  const response = await hire(`/jobs/${encodeURIComponent(jobId)}/candidate`, operation, data);
  const result = await writeResult(response, operation);
  const candidateId = typeof result === "string" ? result : result?.candidateId ?? result?.candidateIdentifier ?? result?.id;
  return typeof candidateId === "string" && /^[A-Za-z0-9_-]{1,100}$/.test(candidateId) ? candidateId : undefined;
}

export async function uploadKekaResume(candidateId: string, resume: File) {
  const data = new FormData();
  data.set("fileName", resume);
  const operation = "résumé upload";
  const response = await hire(`/jobs/candidate/${encodeURIComponent(candidateId)}/resume`, operation, data);
  await writeResult(response, operation);
}

export async function addKekaCandidateNote(jobId: string, candidateId: string, note: string) {
  const operation = "candidate note";
  const comments = note.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const response = await hire(`/jobs/${encodeURIComponent(jobId)}/candidate/${encodeURIComponent(candidateId)}/notes`, operation, { comments });
  await writeResult(response, operation);
}
