import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "../../../../lib/rate-limit";
import { logSecurityEvent } from "../../../../lib/audit-logger";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const rate = checkRateLimit(ip, "/api/sandbox/rate-limit");

    if (!rate.allowed) {
      await logSecurityEvent({
        eventType: "RATE_LIMITED",
        severity: "MEDIUM",
        sourceIP: ip,
        userAgent,
        endpoint: "/api/sandbox/rate-limit",
        action: "BLOCK",
        threatType: "BOT_BEHAVIOR",
        metadata: { remaining: rate.remaining, resetMs: rate.resetMs },
      });

      return NextResponse.json(
        {
          allowed: false,
          message:
            "Rate limit triggered. This simulates a basic defence against automated tools and aggressive scanners.",
          remaining: rate.remaining,
          resetMs: rate.resetMs,
        },
        { status: 429 },
      );
    }

    await logSecurityEvent({
      eventType: "THREAT_DETECTED",
      severity: "LOW",
      sourceIP: ip,
      userAgent,
      endpoint: "/api/sandbox/rate-limit",
      action: "ALLOW",
      threatType: "BOT_BEHAVIOR",
      metadata: { remaining: rate.remaining, resetMs: rate.resetMs },
    });

    return NextResponse.json({
      allowed: true,
      message:
        "Request accepted. Keep sending bursts to see how rate limiting and logging respond to automated-style traffic.",
      remaining: rate.remaining,
      resetMs: rate.resetMs,
    });
  } catch (error) {
    console.error("/api/sandbox/rate-limit error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
