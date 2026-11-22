import { CALL_ID, isBuyer, reportToken, startCall, visitorId, VoxSphereError } from "@/lib/voxsphere";

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json({ message: "Call requests must come from this site." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as { buyer?: unknown } | null;
  if (!isBuyer(body?.buyer)) {
    return Response.json({ message: "Unknown buyer." }, { status: 400 });
  }

  try {
    const { callId, url, token, maxDurationSecs } = await startCall(body.buyer, visitorId(request));
    if (typeof callId !== "string" || !CALL_ID.test(callId) || !url || !token) {
      throw new Error("Invalid call session");
    }
    return Response.json(
      { callId, url, token, maxDurationSecs, reportToken: reportToken(callId) },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof VoxSphereError && error.status === 429) {
      return Response.json({ message: "The call limit has been reached. Please try again later." }, { status: 429 });
    }
    if (error instanceof VoxSphereError && error.status === 503) {
      return Response.json({ message: "All lines are busy. Please try again in a minute." }, { status: 503 });
    }
    console.error("Could not start VoxSphere call", error instanceof VoxSphereError ? error.status : undefined);
    return Response.json({ message: "The call could not be started. Please try again." }, { status: 502 });
  }
}
