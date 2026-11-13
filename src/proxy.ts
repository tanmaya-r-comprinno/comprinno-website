import { NextResponse, type NextRequest } from "next/server";

/**
 * Markdown for agents: a page request that asks for `Accept: text/markdown`
 * is served the page as Markdown from /api/md, at the same URL.
 * Browsers never send that header, so normal visitors are unaffected; the
 * matcher keeps this proxy off every other request.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/api/md${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    {
      // pages only: skip API routes, Next internals and files with an extension
      source: "/((?!api/|_next/|.*\\..*).*)",
      has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    },
  ],
};
