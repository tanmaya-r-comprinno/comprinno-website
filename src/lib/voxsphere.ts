/**
 * Server-side client for the VoxSphere public call API. Holds the API key, so it must
 * only ever run on the server (`server-only` makes the build fail if a page imports it).
 */
import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import type { BuyerId, CallResult, CallSession } from "./sdrVoice";

const AGENTS = {
  ananya: "sdr-ananya-rao",
  rohan: "sdr-rohan-mehta",
  meera: "sdr-meera-iyer",
  vikram: "sdr-vikram-sethi",
  karan: "sdr-karan-malhotra",
} satisfies Record<BuyerId, string>;

export function isBuyer(value: unknown): value is BuyerId {
  return typeof value === "string" && Object.hasOwn(AGENTS, value);
}

export class VoxSphereError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}

function settings() {
  const url = process.env.VOXSPHERE_API_URL;
  const key = process.env.VOXSPHERE_API_KEY;
  if (!url || !key) throw new VoxSphereError(500, "VOXSPHERE_API_URL and VOXSPHERE_API_KEY must be set");
  return { url: url.replace(/\/+$/, ""), key };
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = settings();
  const response = await fetch(`${url}/api/v1/public${path}`, {
    ...init,
    headers: { "content-type": "application/json", "x-api-key": key },
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new VoxSphereError(response.status, response.statusText);
  }
  return (await response.json()) as T;
}

export function startCall(buyer: BuyerId, visitorId: string): Promise<CallSession> {
  return call<CallSession>("/calls", { method: "POST", body: JSON.stringify({ agentId: AGENTS[buyer], visitorId }) });
}

export function getCallResult(callId: string): Promise<CallResult> {
  return call<CallResult>(`/calls/${encodeURIComponent(callId)}`);
}

function sign(value: string): string {
  const salt = process.env.VISITOR_ID_SALT;
  if (!salt) throw new Error("VISITOR_ID_SALT must be set");
  return createHmac("sha256", salt).update(value).digest("base64url");
}

export function visitorId(request: Request): string {
  const forwarded = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return sign(`visitor:${ip}`).slice(0, 32);
}

export const CALL_ID = /^[A-Za-z0-9_-]{1,64}$/;
const REPORT_LIFETIME_SECONDS = 60 * 60;

export function reportToken(callId: string): string {
  const expiresAt = Math.floor(Date.now() / 1000) + REPORT_LIFETIME_SECONDS;
  return `${expiresAt}.${sign(`report:${callId}:${expiresAt}`)}`;
}

export function canReadReport(callId: string, authorization: string | null): boolean {
  const token = /^Bearer (\d{10})\.([A-Za-z0-9_-]{43})$/.exec(authorization ?? "");
  if (!token || Number(token[1]) <= Date.now() / 1000) return false;
  const expected = sign(`report:${callId}:${token[1]}`);
  return timingSafeEqual(Buffer.from(token[2]), Buffer.from(expected));
}
