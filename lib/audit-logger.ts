import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SecurityAction = "ALLOW" | "BLOCK" | "CHALLENGE" | "LOG_ONLY";

export interface SecurityEvent {
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
  payload?: string; // already sanitized if user-provided
  threatType?: string;
  action: SecurityAction;
  sessionId?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

let supabaseClient: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    console.warn("Supabase credentials missing; security events will not be persisted.");
    return null;
  }

  supabaseClient = createClient(url, key);
  return supabaseClient;
}

export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  const client = getSupabase();
  if (!client) return; // fail open on logging only

  const safePayload = event.payload
    ? event.payload
        .replace(/password['"]\s*:\s*['"][^'"]+['"]/gi, 'password: "[REDACTED]"')
        .replace(/token['"]\s*:\s*['"][^'"]+['"]/gi, 'token: "[REDACTED]"')
        .slice(0, 1000)
    : undefined;

  const { error } = await client.from("security_events").insert({
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
  });

  if (error) {
    console.error("Failed to log security event", error);
  }
}
