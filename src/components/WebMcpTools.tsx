"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * WebMCP: exposes the site's read-only tools to AI agents running in the
 * visitor's browser (https://webmachinelearning.github.io/webmcp/).
 * Feature-detected: does nothing in browsers without the API.
 */
type ToolResult = { content: { type: "text"; text: string }[] };
type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<ToolResult>;
};
type ModelContext = { registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown };

const text = (t: string): ToolResult => ({ content: [{ type: "text", text: t }] });

async function callServerTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  const res = await fetch("/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } }),
  });
  const data = await res.json();
  return data.result ?? text(data.error?.message ?? "Tool call failed");
}

/** Only same-site paths, e.g. "/services/migrate" or a comprinno.net URL. */
function sitePath(input: unknown): string | null {
  const raw = typeof input === "string" ? input.trim() : "";
  if (!raw) return null;
  try {
    const u = new URL(raw, window.location.origin);
    return u.origin === window.location.origin ? `${u.pathname}${u.search}${u.hash}` : null;
  } catch {
    return null;
  }
}

export default function WebMcpTools() {
  const router = useRouter();

  useEffect(() => {
    const ctx = ((document as unknown as { modelContext?: ModelContext }).modelContext ??
      (navigator as unknown as { modelContext?: ModelContext }).modelContext);
    if (!ctx?.registerTool) return;

    const controller = new AbortController();
    const tools: WebMcpTool[] = [
      {
        name: "search_content",
        description: "Search Comprinno's services, products, case studies, blog posts and press releases by keyword.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Keywords, e.g. 'EKS migration fintech'" },
            type: { type: "string", enum: ["all", "service", "product", "case-study", "blog", "news"] },
          },
          required: ["query"],
        },
        execute: (input) => callServerTool("search_content", input),
      },
      {
        name: "get_page",
        description: "Read a page of this site as Markdown, by path (e.g. '/services/manage').",
        inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
        execute: async (input) => {
          const path = sitePath(input.path);
          if (!path) return text("Give a path on this site, e.g. /services/migrate");
          const res = await fetch(path, { headers: { Accept: "text/markdown" } });
          return text(await res.text());
        },
      },
      {
        name: "open_page",
        description: "Navigate the browser to a page on this site, e.g. '/contact' or '/resources/case-studies'.",
        inputSchema: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
        execute: async (input) => {
          const path = sitePath(input.path);
          if (!path) return text("Give a path on this site, e.g. /contact");
          router.push(path);
          return text(`Opened ${path}`);
        },
      },
      {
        name: "get_contact_info",
        description: "Comprinno's sales, support and careers contacts, phone, offices and enquiry form URL.",
        inputSchema: { type: "object", properties: {} },
        execute: () => callServerTool("get_contact_info", {}),
      },
    ];

    for (const tool of tools) {
      try {
        // registerTool returns a Promise in current builds; ignore rejections (e.g. duplicate names).
        Promise.resolve(ctx.registerTool(tool, { signal: controller.signal })).catch(() => {});
      } catch {
        /* older builds may throw synchronously */
      }
    }
    return () => controller.abort();
  }, [router]);

  return null;
}
