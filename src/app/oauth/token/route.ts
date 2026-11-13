/**
 * OAuth 2.0 token endpoint. Public clients only (no client secrets exist).
 *  - authorization_code: code + code_verifier (PKCE) + same client_id and redirect_uri
 *  - client_credentials: anonymous agents; client_id optional
 * Tokens grant scope public:read only, i.e. what every visitor can already read.
 */
import { checkClientId, checkResource, checkScope, issueAccessToken, oauthEnabled, redeemCode } from "@/lib/oauth";

const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" };
const reply = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", Pragma: "no-cache", ...CORS } });
const oauthError = (error: string, description: string, status = 400) => reply({ error, error_description: description }, status);

async function params(request: Request): Promise<URLSearchParams | null> {
  const type = request.headers.get("content-type") ?? "";
  const text = await request.text();
  if (text.length > 8192) return null;
  if (type.includes("application/json")) {
    try {
      const o = JSON.parse(text) as Record<string, unknown>;
      return new URLSearchParams(Object.entries(o).map(([k, v]) => [k, String(v)]));
    } catch {
      return null;
    }
  }
  return new URLSearchParams(text);
}

export async function POST(request: Request) {
  if (!oauthEnabled()) return new Response("Not found\n", { status: 404 });
  const p = await params(request);
  if (!p) return oauthError("invalid_request", "Body must be application/x-www-form-urlencoded (or JSON), up to 8 KB.");
  if (p.get("client_secret")) return oauthError("invalid_client", "This server has public clients only; do not send a client_secret.", 401);

  const grant = p.get("grant_type");
  if (grant === "authorization_code") {
    const client_id = checkClientId(p.get("client_id"));
    const code = p.get("code") ?? "";
    const redirect_uri = p.get("redirect_uri") ?? "";
    const verifier = p.get("code_verifier") ?? "";
    if (!client_id || !code || !redirect_uri || !verifier) return oauthError("invalid_request", "code, client_id, redirect_uri and code_verifier are required.");
    // redirect_uri is compared in its normalised form, as issued on the consent page
    let normalised = redirect_uri;
    try { normalised = new URL(redirect_uri).toString(); } catch { /* compared as-is */ }
    const granted = redeemCode(code, client_id, normalised, verifier);
    if (!granted) return oauthError("invalid_grant", "The code is invalid, expired, or doesn't match the client, redirect_uri or code_verifier.");
    return reply(issueAccessToken({ client_id, ...granted }));
  }

  if (grant === "client_credentials") {
    const client_id = checkClientId(p.get("client_id") ?? "anonymous");
    if (!client_id) return oauthError("invalid_request", "client_id is invalid.");
    const scope = checkScope(p.get("scope"));
    if (!scope) return oauthError("invalid_scope", "The only supported scope is public:read.");
    const resource = checkResource(p.get("resource"));
    if (!resource) return oauthError("invalid_target", "Unknown resource.");
    return reply(issueAccessToken({ client_id, scope, resource }));
  }

  return oauthError("unsupported_grant_type", "Use authorization_code (with PKCE) or client_credentials.");
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
