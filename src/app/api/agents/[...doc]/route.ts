/**
 * Serves the /.well-known discovery documents (rewritten here in next.config.ts).
 * See src/lib/agentDiscovery.ts and src/lib/oauth.ts for what each document contains.
 */
import { aiCatalog, apiCatalog, poppy, serverCard, skillMd, skillsIndex } from "@/lib/agentDiscovery";
import { MCP_RESOURCE, authorizationServerMetadata, jwks, oauthEnabled, protectedResourceMetadata } from "@/lib/oauth";
import { site } from "@/lib/site";

const CORS = { "Access-Control-Allow-Origin": "*" };
const json = (body: unknown, type = "application/json") =>
  new Response(JSON.stringify(body, null, 2), { headers: { "Content-Type": `${type}; charset=utf-8`, ...CORS } });
const notFound = () => new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });

export async function GET(_request: Request, ctx: RouteContext<"/api/agents/[...doc]">) {
  const doc = (await ctx.params).doc.join("/");

  if (doc === "mcp/server-card.json") return json(serverCard());
  if (doc === "api-catalog") return json(apiCatalog(), "application/linkset+json");
  if (doc === "ai-catalog.json") return json(aiCatalog());
  if (doc === "poppy.json") return json(poppy());
  if (doc === "agent-skills/index.json") return json(skillsIndex());

  // OAuth metadata is only published when the authorization server is configured.
  if (["oauth-authorization-server", "oauth-protected-resource", "oauth-protected-resource/mcp", "jwks.json"].includes(doc)) {
    if (!oauthEnabled()) return notFound();
    if (doc === "oauth-authorization-server") return json(authorizationServerMetadata());
    if (doc === "jwks.json") return json(jwks(), "application/jwk-set+json");
    // RFC 9728: the resource identifier matches the URL the metadata was fetched for.
    return json(protectedResourceMetadata(doc.endsWith("/mcp") ? MCP_RESOURCE : site.url));
  }

  const skill = doc.match(/^agent-skills\/([a-z0-9-]+)\/SKILL\.md$/);
  const md = skill ? skillMd(skill[1]) : null;
  if (md) return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8", ...CORS } });

  return notFound();
}
