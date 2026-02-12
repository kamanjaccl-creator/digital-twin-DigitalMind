import { NextRequest, NextResponse } from "next/server";
import { logSecurityEvent } from "../../../../lib/audit-logger";

const DEMO_ADMIN_TOKEN = process.env.DEMO_ADMIN_TOKEN || "changeme-demo-admin";

export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  const url = request.nextUrl;
  const tokenFromHeader = request.headers.get("x-admin-token") || "";
  const tokenFromQuery = url.searchParams.get("token") || "";
  const token = tokenFromHeader || tokenFromQuery;
  const attempted = Boolean(token);

  if (token !== DEMO_ADMIN_TOKEN) {
    await logSecurityEvent({
      eventType: "ACCESS_DENIED",
      severity: attempted ? "MEDIUM" : "LOW",
      sourceIP: ip,
      userAgent,
      endpoint: "/api/admin/secret",
      action: "BLOCK",
      threatType: attempted ? "BROKEN_ACCESS_CONTROL" : "AUTH_FAILURE",
      metadata: {
        tokenPresent: attempted,
      },
    });

    return NextResponse.json(
      {
        ok: false,
        message:
          "Unauthorized. This simulates a protected admin API and logs access-denied attempts for the dashboard.",
      },
      { status: 401 }
    );
  }

  await logSecurityEvent({
    eventType: "LOGIN_ATTEMPT",
    severity: "LOW",
    sourceIP: ip,
    userAgent,
    endpoint: "/api/admin/secret",
    action: "ALLOW",
    metadata: { demo: true },
  });

  return NextResponse.json({
    ok: true,
    secret: "Flag{this-is-a-demo-admin-secret}",
    message:
      "Authorized. In a real system this would be sensitive admin-only data behind proper authentication.",
  });
}
