import { NextRequest, NextResponse } from "next/server";
import { detectSQLInjection } from "../../../../lib/security/detectors";
import { logSecurityEvent } from "../../../../lib/audit-logger";
import { checkRateLimit } from "../../../../lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const rate = checkRateLimit(ip, "/api/sandbox/sql");
    if (!rate.allowed) {
      await logSecurityEvent({
        eventType: "RATE_LIMITED",
        severity: "MEDIUM",
        sourceIP: ip,
        userAgent,
        endpoint: "/api/sandbox/sql",
        action: "BLOCK",
        threatType: "BOT_BEHAVIOR",
        metadata: { remaining: rate.remaining, resetMs: rate.resetMs },
      });

      return NextResponse.json(
        {
          error:
            "Too many requests. This SQL injection sandbox is rate limited to simulate WAF / bot protection.",
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const input: string = typeof body.input === "string" ? body.input : "";

    if (!input) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const detection = detectSQLInjection(input);
    const isThreat = detection.detected;

    const action = isThreat ? "BLOCK" : "ALLOW";
    const severity = isThreat ? "HIGH" : "LOW";

    await logSecurityEvent({
      eventType: isThreat ? "THREAT_BLOCKED" : "THREAT_DETECTED",
      severity,
      sourceIP: ip,
      userAgent,
      endpoint: "/api/sandbox/sql",
      payload: input,
      threatType: isThreat ? "SQL_INJECTION" : undefined,
      action,
      metadata: { patterns: detection.patterns },
    });

    return NextResponse.json({
      input,
      isThreat,
      patterns: detection.patterns,
      action,
      severity,
      message: isThreat
        ? "Potential SQL injection detected. Query would be blocked and logged."
        : "No obvious SQL injection patterns detected. In production, always use parameterized queries.",
    });
  } catch (error) {
    console.error("/api/sandbox/sql error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
