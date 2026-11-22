import { CALL_ID, canReadReport, getCallResult, VoxSphereError } from "@/lib/voxsphere";

const headers = { "Cache-Control": "private, no-store" };

export async function GET(request: Request, { params }: RouteContext<"/api/voice/calls/[callId]">) {
  const { callId } = await params;

  try {
    if (!CALL_ID.test(callId) || !canReadReport(callId, request.headers.get("authorization"))) {
      return Response.json({ message: "Call not found." }, { status: 404, headers });
    }

    const result = await getCallResult(callId);
    return Response.json(result, { headers });
  } catch (error) {
    if (error instanceof VoxSphereError && error.status === 404) {
      return Response.json({ message: "Call not found." }, { status: 404, headers });
    }
    console.error("Could not load VoxSphere report", error instanceof VoxSphereError ? error.status : undefined);
    return Response.json({ message: "The call review could not be loaded." }, { status: 502, headers });
  }
}
