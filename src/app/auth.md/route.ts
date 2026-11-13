import { authMd } from "@/lib/agentDiscovery";

export function GET() {
  return new Response(authMd(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
