import { llmsTxt } from "@/lib/agentDocs";

// Built from content files only (no request data), so Next prerenders it at build time.
export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
