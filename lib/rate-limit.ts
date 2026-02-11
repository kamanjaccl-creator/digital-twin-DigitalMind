// Very simple in-memory rate limiter for demo purposes.
// NOTE: This is not production-grade and may not persist across serverless invocations.

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 10; // per IP + endpoint + window

interface Bucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, Bucket>();

export function checkRateLimit(ip: string, endpoint: string): {
  allowed: boolean;
  remaining: number;
  resetMs: number;
} {
  const key = `${ip}|${endpoint}`;
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetMs: WINDOW_MS };
  }

  if (existing.count >= MAX_REQUESTS) {
    const resetMs = WINDOW_MS - (now - existing.windowStart);
    return { allowed: false, remaining: 0, resetMs };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return {
    allowed: true,
    remaining: Math.max(0, MAX_REQUESTS - existing.count),
    resetMs: WINDOW_MS - (now - existing.windowStart),
  };
}
