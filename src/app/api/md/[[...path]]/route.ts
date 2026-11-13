import { pageMarkdown } from "@/lib/agentDocs";

/**
 * Markdown version of a page. Not linked directly: src/proxy.ts rewrites page
 * requests that send `Accept: text/markdown` here, so agents get Markdown at the
 * page's own URL (https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/).
 */
export async function GET(_request: Request, ctx: RouteContext<"/api/md/[[...path]]">) {
  const { path = [] } = await ctx.params;
  const md = pageMarkdown(`/${path.join("/")}`);
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
  };
  if (!md) return new Response("# Page not found\n", { status: 404, headers });
  // Rough token estimate (about 4 characters per token), as Markdown-for-agents clients expect.
  return new Response(md, { headers: { ...headers, "x-markdown-tokens": String(Math.ceil(md.length / 4)) } });
}
