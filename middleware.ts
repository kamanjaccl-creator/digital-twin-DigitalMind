import { NextRequest, NextResponse } from "next/server";
import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "./lib/arcjet";

type SecurityAction = "ALLOW" | "BLOCK" | "CHALLENGE" | "LOG_ONLY";

interface SecurityEvent {
  eventType:
    | "THREAT_DETECTED"
    | "THREAT_BLOCKED"
    | "LOGIN_ATTEMPT"
    | "ACCESS_DENIED"
    | "RATE_LIMITED";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  sourceIP?: string;
  userAgent?: string;
  endpoint: string;
  payload?: string;
  threatType?: string;
  action: SecurityAction;
  sessionId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return;
  }

  const safePayload = event.payload
    ? event.payload
        .replace(/password['"]\s*:\s*['"][^'"]+['"]/gi, 'password: "[REDACTED]"')
        .replace(/token['"]\s*:\s*['"][^'"]+['"]/gi, 'token: "[REDACTED]"')
        .slice(0, 1000)
    : undefined;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/security_events`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        event_type: event.eventType,
        severity: event.severity,
        source_ip: event.sourceIP,
        user_agent: event.userAgent,
        endpoint: event.endpoint,
        payload: safePayload,
        threat_type: event.threatType,
        action: event.action === "LOG_ONLY" ? "ALLOW" : event.action,
        session_id: event.sessionId,
        user_id: event.userId,
        metadata: event.metadata ?? {},
      }),
    });
  } catch (error) {
    console.error("Failed to log security event from middleware", error);
  }
}

export const config = {
  matcher: ["/api/:path*"],
};

export default async function middleware(request: NextRequest) {
  // If Arcjet is not configured, just continue as normal.
  if (!aj) {
    return NextResponse.next();
  }

  const decision = await aj.protect(request, { requested: 5 });
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const endpoint = request.nextUrl.pathname;

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      await logSecurityEvent({
        eventType: "RATE_LIMITED",
        severity: "MEDIUM",
        sourceIP: ip,
        userAgent,
        endpoint,
        action: "BLOCK",
        threatType: "BOT_BEHAVIOR",
        metadata: { provider: "arcjet", kind: "rate_limit" },
      });
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 },
      );
    }
    if (decision.reason.isBot()) {
      await logSecurityEvent({
        eventType: "THREAT_BLOCKED",
        severity: "HIGH",
        sourceIP: ip,
        userAgent,
        endpoint,
        action: "BLOCK",
        threatType: "BOT_BEHAVIOR",
        metadata: { provider: "arcjet", kind: "bot" },
      });
      return NextResponse.json(
        { error: "No bots allowed", reason: decision.reason },
        { status: 403 },
      );
    }
    await logSecurityEvent({
      eventType: "THREAT_BLOCKED",
      severity: "HIGH",
      sourceIP: ip,
      userAgent,
      endpoint,
      action: "BLOCK",
      threatType: "WAF_SHIELD",
      metadata: { provider: "arcjet", kind: "shield" },
    });
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 },
    );
  }

  // Extra hardening based on IP / spoofed bot signals
  if (decision.ip.isHosting()) {
    await logSecurityEvent({
      eventType: "THREAT_BLOCKED",
      severity: "HIGH",
      sourceIP: ip,
      userAgent,
      endpoint,
      action: "BLOCK",
      threatType: "HOSTING_PROVIDER",
      metadata: { provider: "arcjet", kind: "hosting" },
    });
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 },
    );
  }

  if (decision.results.some(isSpoofedBot)) {
    await logSecurityEvent({
      eventType: "THREAT_BLOCKED",
      severity: "HIGH",
      sourceIP: ip,
      userAgent,
      endpoint,
      action: "BLOCK",
      threatType: "BOT_BEHAVIOR",
      metadata: { provider: "arcjet", kind: "spoofed_bot" },
    });
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 },
    );
  }

  return NextResponse.next();
}
