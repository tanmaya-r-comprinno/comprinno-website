/**
 * OAuth 2.0 authorization endpoint (authorization code + PKCE S256).
 * GET shows a consent page; nothing redirects until the user clicks Continue,
 * so this endpoint can't be used as an open redirect. The POST only accepts
 * submissions from this site's own consent page (Origin check).
 */
import { ISSUER, checkClientId, checkRedirectUri, checkResource, checkScope, issueCode, oauthEnabled } from "@/lib/oauth";

type Params = { client_id: string; redirect_uri: string; state: string; scope: string; resource: string; code_challenge: string };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(title)} | Comprinno</title>
<style>body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1c1c1c;background:#f5f8fd;margin:0;display:grid;place-items:center;min-height:100vh}
main{background:#fff;border:1px solid #c8d5e8;border-top:3px solid #006bc9;max-width:30rem;padding:2rem;margin:1rem}
h1{font-size:1.25rem;margin:0 0 1rem}p,li{line-height:1.55;color:#3d3d3d}code{background:#eef2f6;padding:.1rem .3rem;word-break:break-all}
.row{display:flex;gap:.75rem;margin-top:1.5rem}button{font:inherit;font-weight:600;padding:.7rem 1.2rem;border:1.5px solid #1c1c1c;background:#fff;cursor:pointer}
button[value=allow]{background:#ffbb00;border-color:#ffbb00}button:focus-visible{outline:2px solid #006bc9;outline-offset:2px}</style></head>
<body><main>${body}</main></body></html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      // No form-action: Chrome applies it to the redirect after submit, which must reach the app.
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
      "Referrer-Policy": "no-referrer",
    },
  });
}

const errorPage = (message: string) => page("Authorization error", `<h1>This sign-in request can't be completed</h1><p>${esc(message)}</p>`, 400);

/** Validates every parameter; returns an error message or the clean values. */
function validate(get: (k: string) => string | null): Params | string {
  if (get("response_type") !== "code") return "Only response_type=code is supported.";
  const client_id = checkClientId(get("client_id"));
  if (!client_id) return "A valid client_id is required.";
  const redirect = checkRedirectUri(get("redirect_uri"));
  if (!redirect) return "redirect_uri must be https, a loopback http address or an app scheme.";
  const code_challenge = get("code_challenge") ?? "";
  if (get("code_challenge_method") !== "S256" || !/^[A-Za-z0-9_-]{43}$/.test(code_challenge)) return "PKCE with code_challenge_method=S256 is required.";
  const scope = checkScope(get("scope"));
  if (!scope) return "The only supported scope is public:read.";
  const resource = checkResource(get("resource"));
  if (!resource) return "Unknown resource.";
  return { client_id, redirect_uri: redirect.toString(), state: (get("state") ?? "").slice(0, 500), scope, resource, code_challenge };
}

export async function GET(request: Request) {
  if (!oauthEnabled()) return new Response("Not found\n", { status: 404 });
  const q = new URL(request.url).searchParams;
  const p = validate((k) => q.get(k));
  if (typeof p === "string") return errorPage(p);

  const dest = new URL(p.redirect_uri);
  const hidden = Object.entries({ ...p, response_type: "code", code_challenge_method: "S256" })
    .map(([k, v]) => `<input type="hidden" name="${esc(k)}" value="${esc(v)}">`)
    .join("");
  return page(
    "Allow read-only access",
    `<h1>Allow read-only access to comprinno.net?</h1>
<p>The app <code>${esc(p.client_id)}</code> is asking for <strong>public, read-only</strong> access to Comprinno's website content (scope <code>${esc(p.scope)}</code>).</p>
<ul><li>No account is created and no personal data is shared.</li><li>It can only read content that is already public on this site.</li></ul>
<p>If you continue, you'll be sent back to <code>${esc(dest.protocol === "https:" || dest.protocol === "http:" ? dest.host : dest.protocol)}</code>.</p>
<form method="post" action="/oauth/authorize">${hidden}<div class="row"><button type="submit" name="decision" value="allow">Continue</button><button type="submit" name="decision" value="deny">Cancel</button></div></form>`,
  );
}

export async function POST(request: Request) {
  if (!oauthEnabled()) return new Response("Not found\n", { status: 404 });
  // Only our own consent page may submit (blocks auto-submitting forms on other sites).
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (origin !== new URL(ISSUER).origin && !(origin === null && fetchSite === "same-origin")) {
    return errorPage("This request didn't come from the Comprinno consent page.");
  }
  const form = await request.formData();
  const p = validate((k) => {
    const v = form.get(k);
    return typeof v === "string" ? v : null;
  });
  if (typeof p === "string") return errorPage(p);

  const back = new URL(p.redirect_uri);
  if (form.get("decision") === "allow") {
    back.searchParams.set("code", issueCode(p));
  } else {
    back.searchParams.set("error", "access_denied");
  }
  if (p.state) back.searchParams.set("state", p.state);
  back.searchParams.set("iss", ISSUER); // RFC 9207
  return new Response(null, { status: 303, headers: { Location: back.toString(), "Cache-Control": "no-store" } });
}
