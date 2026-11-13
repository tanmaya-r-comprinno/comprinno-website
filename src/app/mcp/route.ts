/**
 * Public, read-only MCP server (Streamable HTTP transport, stateless, JSON responses).
 * Spec: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
 * Tools are defined in src/lib/agentApi.ts; none of them write data or call other services.
 */
import { SERVER_INFO, tools, toolByName } from "@/lib/agentApi";
import { site } from "@/lib/site";

const SUPPORTED_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const DEFAULT_VERSION = "2025-06-18";
const MAX_BODY_BYTES = 64 * 1024;

type JsonRpcId = string | number | null;
type JsonRpcRequest = { jsonrpc?: string; id?: JsonRpcId; method?: string; params?: Record<string, unknown> };

const ok = (id: JsonRpcId, result: unknown) => ({ jsonrpc: "2.0", id, result });
const fail = (id: JsonRpcId, code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } });

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS } });

function handle(msg: JsonRpcRequest): object | null {
  const id = msg.id ?? null;
  if (msg.jsonrpc !== "2.0" || typeof msg.method !== "string") return fail(id, -32600, "Invalid Request");
  // Notifications (no id) get no response.
  if (msg.id === undefined) return null;

  switch (msg.method) {
    case "initialize": {
      const asked = String(msg.params?.protocolVersion ?? "");
      return ok(id, {
        protocolVersion: SUPPORTED_VERSIONS.includes(asked) ? asked : DEFAULT_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: `Read-only access to public content on ${site.url}: search services, products, case studies, blog posts and press releases, and read any page as Markdown. No authentication needed.`,
      });
    }
    case "ping":
      return ok(id, {});
    case "tools/list":
      return ok(id, {
        tools: tools.map(({ name, title, description, inputSchema }) => ({
          name, title, description, inputSchema,
          annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
        })),
      });
    case "tools/call": {
      const name = String(msg.params?.name ?? "");
      const tool = toolByName(name);
      if (!tool) return fail(id, -32602, `Unknown tool: ${name}`);
      const args = (msg.params?.arguments ?? {}) as Record<string, unknown>;
      try {
        return ok(id, { content: [{ type: "text", text: tool.run(args) }], isError: false });
      } catch (err) {
        return ok(id, { content: [{ type: "text", text: err instanceof Error ? err.message : "Tool error" }], isError: true });
      }
    }
    default:
      return fail(id, -32601, `Method not found: ${msg.method}`);
  }
}

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return json(fail(null, -32600, "Request too large"), 413);
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json(fail(null, -32700, "Parse error"), 400);
  }
  if (Array.isArray(body)) {
    const out = body.slice(0, 20).map((m) => handle(m as JsonRpcRequest)).filter((r) => r !== null);
    return out.length ? json(out) : new Response(null, { status: 202, headers: CORS });
  }
  const res = handle(body as JsonRpcRequest);
  return res ? json(res) : new Response(null, { status: 202, headers: CORS });
}

// This server doesn't open server-to-client SSE streams.
export function GET() {
  return new Response("This MCP endpoint accepts JSON-RPC over HTTP POST. See /.well-known/mcp/server-card.json", {
    status: 405,
    headers: { Allow: "POST, OPTIONS", "Content-Type": "text/plain; charset=utf-8", ...CORS },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
