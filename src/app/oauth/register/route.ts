/**
 * Dynamic Client Registration (RFC 7591), stateless. MCP clients register
 * before starting the authorization flow. Every client is public (no secret)
 * and only ever gets scope public:read, so nothing needs to be stored: the
 * client_id is generated and the redirect URIs are re-checked at authorization.
 */
import { randomUUID } from "node:crypto";
import { SCOPE, checkRedirectUri, oauthEnabled } from "@/lib/oauth";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const reply = (body: object, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });

export async function POST(request: Request) {
  if (!oauthEnabled()) return new Response("Not found\n", { status: 404 });
  const text = await request.text();
  let meta: Record<string, unknown>;
  try {
    if (text.length > 16384) throw new Error();
    meta = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    return reply({ error: "invalid_client_metadata", error_description: "Body must be JSON, up to 16 KB." }, 400);
  }
  const uris = Array.isArray(meta.redirect_uris) ? meta.redirect_uris.map(String) : [];
  if (uris.length > 10 || uris.some((u) => !checkRedirectUri(u))) {
    return reply({ error: "invalid_redirect_uri", error_description: "Use up to 10 https, loopback http or app-scheme redirect URIs." }, 400);
  }
  if (meta.token_endpoint_auth_method && meta.token_endpoint_auth_method !== "none") {
    return reply({ error: "invalid_client_metadata", error_description: "Only public clients (token_endpoint_auth_method none) are supported." }, 400);
  }
  return reply(
    {
      client_id: `dcr-${randomUUID()}`,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_name: typeof meta.client_name === "string" ? meta.client_name.slice(0, 200) : undefined,
      redirect_uris: uris,
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code", "client_credentials"],
      response_types: ["code"],
      scope: SCOPE,
    },
    201,
  );
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
