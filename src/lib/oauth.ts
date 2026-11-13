/**
 * Minimal OAuth 2.0 authorization server for the site's public, read-only agent APIs.
 *
 * Why it exists: agent tooling discovers authentication through OAuth metadata
 * (RFC 8414, RFC 9728). Everything on this site is public, so the only access
 * this server grants is the same read-only access every visitor already has
 * (scope "public:read"). Tokens are optional: /mcp works without one.
 *
 * What it implements (all stateless, ES256-signed JWTs, no database):
 *  - authorization_code + PKCE (S256 only), with a consent page (no silent redirects)
 *  - client_credentials for anonymous agents (no client secret)
 *  - stateless dynamic client registration (RFC 7591): any public client may register
 *  - JWKS for token verification
 * Disabled (all OAuth routes and metadata return 404) unless OAUTH_SIGNING_KEY is set.
 */
import { createHash, createPrivateKey, createPublicKey, randomUUID, sign, verify, type JsonWebKey, type KeyObject } from "node:crypto";
import { site } from "@/lib/site";

export const ISSUER = site.url;
export const SCOPE = "public:read";
export const MCP_RESOURCE = `${site.url}/mcp`;
export const RESOURCES = [MCP_RESOURCE, site.url];
const ACCESS_TTL = 3600; // seconds
const CODE_TTL = 120;

export const endpoints = {
  authorize: `${ISSUER}/oauth/authorize`,
  token: `${ISSUER}/oauth/token`,
  register: `${ISSUER}/oauth/register`,
  jwks: `${ISSUER}/.well-known/jwks.json`,
  asMetadata: `${ISSUER}/.well-known/oauth-authorization-server`,
  prmRoot: `${ISSUER}/.well-known/oauth-protected-resource`,
  prmMcp: `${ISSUER}/.well-known/oauth-protected-resource/mcp`,
};

const b64url = (b: Buffer | string) => Buffer.from(b).toString("base64url");
const now = () => Math.floor(Date.now() / 1000);

type Keys = { priv: KeyObject; pub: KeyObject; kid: string; jwk: JsonWebKey };
let cached: Keys | null | undefined;

function keys(): Keys | null {
  if (cached !== undefined) return cached;
  const raw = process.env.OAUTH_SIGNING_KEY?.trim();
  if (!raw) return (cached = null);
  // Stored as base64 of a PKCS#8 PEM so it fits on one line in Vercel.
  const pem = raw.includes("BEGIN") ? raw : Buffer.from(raw, "base64").toString("utf8");
  const priv = createPrivateKey(pem);
  if (priv.asymmetricKeyType !== "ec") throw new Error("OAUTH_SIGNING_KEY must be an EC P-256 key");
  const pub = createPublicKey(priv);
  const jwk = pub.export({ format: "jwk" });
  // RFC 7638 thumbprint as the key id
  const kid = b64url(createHash("sha256").update(JSON.stringify({ crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y })).digest());
  return (cached = { priv, pub, kid, jwk: { ...jwk, kid, use: "sig", alg: "ES256" } });
}

export const oauthEnabled = () => keys() !== null;
export const jwks = () => ({ keys: [keys()!.jwk] });

type Claims = Record<string, unknown> & { token_use: "access" | "code"; exp: number };

function signJwt(claims: Claims): string {
  const k = keys();
  if (!k) throw new Error("OAuth is not configured");
  const head = b64url(JSON.stringify({ alg: "ES256", typ: claims.token_use === "access" ? "at+jwt" : "JWT", kid: k.kid }));
  const body = b64url(JSON.stringify({ iss: ISSUER, iat: now(), jti: randomUUID(), ...claims }));
  const sig = sign("sha256", Buffer.from(`${head}.${body}`), { key: k.priv, dsaEncoding: "ieee-p1363" });
  return `${head}.${body}.${b64url(sig)}`;
}

function verifyJwt(token: string, use: Claims["token_use"]): Claims | null {
  const k = keys();
  const parts = token.split(".");
  if (!k || parts.length !== 3 || token.length > 4096) return null;
  try {
    const head = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    if (head.alg !== "ES256" || head.kid !== k.kid) return null;
    const ok = verify("sha256", Buffer.from(`${parts[0]}.${parts[1]}`), { key: k.pub, dsaEncoding: "ieee-p1363" }, Buffer.from(parts[2], "base64url"));
    if (!ok) return null;
    const c = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8")) as Claims;
    if (c.iss !== ISSUER || c.token_use !== use || typeof c.exp !== "number" || c.exp < now()) return null;
    return c;
  } catch {
    return null;
  }
}

/** Only the public scope exists. Empty means the default. */
export function checkScope(scope: string | null | undefined): string | null {
  const parts = (scope ?? "").split(/\s+/).filter(Boolean);
  return parts.every((s) => s === SCOPE) ? SCOPE : null;
}

/** RFC 8707 resource indicator: must be one of ours (default: the MCP server). */
export function checkResource(resource: string | null | undefined): string | null {
  if (!resource) return MCP_RESOURCE;
  return RESOURCES.includes(resource.replace(/\/$/, "")) ? resource.replace(/\/$/, "") : null;
}

const BLOCKED_SCHEMES = new Set(["javascript:", "data:", "file:", "vbscript:", "blob:", "about:", "ftp:"]);
/**
 * Redirect URIs: https, loopback http (RFC 8252 native apps) or a private-use
 * scheme such as cursor://. Never a fragment, never script-capable schemes.
 * The user always confirms on the consent page before any redirect happens.
 */
export function checkRedirectUri(uri: string | null | undefined): URL | null {
  if (!uri || uri.length > 2000) return null;
  try {
    const u = new URL(uri);
    if (u.hash || BLOCKED_SCHEMES.has(u.protocol) || u.username || u.password) return null;
    if (u.protocol === "http:") return ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname) ? u : null;
    return u;
  } catch {
    return null;
  }
}

export const checkClientId = (id: string | null | undefined) => (id && id.length <= 512 && !/[\s<>"]/.test(id) ? id : null);

export function issueCode(p: { client_id: string; redirect_uri: string; code_challenge: string; scope: string; resource: string }) {
  return signJwt({ token_use: "code", exp: now() + CODE_TTL, ...p });
}

/** Authorization codes are short-lived signed JWTs bound to client, redirect URI and PKCE challenge. */
export function redeemCode(code: string, client_id: string, redirect_uri: string, code_verifier: string) {
  const c = verifyJwt(code, "code");
  if (!c || c.client_id !== client_id || c.redirect_uri !== redirect_uri) return null;
  if (!/^[A-Za-z0-9._~-]{43,128}$/.test(code_verifier)) return null; // RFC 7636 §4.1
  const challenge = b64url(createHash("sha256").update(code_verifier).digest());
  return challenge === c.code_challenge ? { scope: String(c.scope), resource: String(c.resource) } : null;
}

export function issueAccessToken(p: { client_id: string; scope: string; resource: string }) {
  const token = signJwt({ token_use: "access", exp: now() + ACCESS_TTL, sub: `anonymous:${p.client_id}`, aud: p.resource, client_id: p.client_id, scope: p.scope });
  return { access_token: token, token_type: "Bearer", expires_in: ACCESS_TTL, scope: p.scope };
}

/** Validates a Bearer token presented to one of our resources. */
export function verifyAccessToken(token: string, resource: string) {
  const c = verifyJwt(token, "access");
  if (!c || (c.aud !== resource && c.aud !== site.url)) return null;
  return c;
}

/** RFC 6750 challenge pointing clients at the protected resource metadata (RFC 9728 §5.1). */
export const wwwAuthenticate = (error?: string) =>
  `Bearer resource_metadata="${endpoints.prmMcp}", scope="${SCOPE}"${error ? `, error="${error}"` : ""}`;

/** auth.md agent registration block, shared by auth.md and the AS metadata. */
export const agentAuth = () => ({
  skill: `${ISSUER}/auth.md`,
  register_uri: `${ISSUER}/auth.md#anonymous-public-access`,
  claim_uri: `${ISSUER}/auth.md#claim-and-revocation`,
  identity_types_supported: ["anonymous"],
  anonymous: { credential_types_supported: ["none"] },
});

export function authorizationServerMetadata() {
  return {
    issuer: ISSUER,
    authorization_endpoint: endpoints.authorize,
    token_endpoint: endpoints.token,
    registration_endpoint: endpoints.register,
    jwks_uri: endpoints.jwks,
    scopes_supported: [SCOPE],
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    token_endpoint_auth_methods_supported: ["none"],
    code_challenge_methods_supported: ["S256"],
    authorization_response_iss_parameter_supported: true,
    service_documentation: `${ISSUER}/auth.md`,
    agent_auth: agentAuth(),
  };
}

export function protectedResourceMetadata(resource: string) {
  return {
    resource,
    resource_name: "Comprinno website (public, read-only)",
    authorization_servers: [ISSUER],
    scopes_supported: [SCOPE],
    bearer_methods_supported: ["header"],
    resource_signing_alg_values_supported: ["ES256"],
    resource_documentation: `${ISSUER}/auth.md`,
  };
}
