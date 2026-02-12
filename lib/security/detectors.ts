// Core security detection utilities used across the app.

// Prompt Injection Detection
export function detectPromptInjection(input: string): { detected: boolean; patterns: string[] } {
  const patterns = [
    /ignore\s+(previous|all|above)\s+instructions/i,
    /disregard\s+(your|the)\s+(rules|instructions|guidelines)/i,
    /you\s+are\s+now\s+a/i,
    /forget\s+(everything|your\s+instructions)/i,
    /system\s*:\s*/i,
    /\[INST\]/i,
    /\<\|im_start\|\>/i,
    /pretend\s+you\s+are/i,
    /act\s+as\s+if/i,
    /new\s+instructions:/i,
    /override\s+(mode|protocol)/i,
  ];

  const matched: string[] = [];
  for (const pattern of patterns) {
    if (pattern.test(input)) matched.push(pattern.source);
  }

  return { detected: matched.length > 0, patterns: matched };
}

// SQL Injection Detection
export function detectSQLInjection(input: string): { detected: boolean; patterns: string[] } {
  const patterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/i,
    /(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i,
    /(--)|(\#)|(\/\*)/,
    /(\bEXEC\b|\bEXECUTE\b)/i,
    /(\bxp_\w+)/i,
    /(';?\s*(DROP|DELETE|UPDATE|INSERT))/i,
    /(\bINFORMATION_SCHEMA\b)/i,
    /(\bSLEEP\s*\()/i,
    /(\bBENCHMARK\s*\()/i,
    /(\bWAITFOR\s+DELAY)/i,
  ];

  const matched: string[] = [];
  for (const pattern of patterns) {
    if (pattern.test(input)) matched.push(pattern.source);
  }

  return { detected: matched.length > 0, patterns: matched };
}

// XSS Detection (not yet wired, but available for future endpoints)
export function detectXSS(input: string): { detected: boolean; patterns: string[] } {
  const patterns = [
    /<script\b[^>]*>/i,
    /javascript\s*:/i,
    /on\w+\s*=/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
    /<svg\b[^>]*onload/i,
    /expression\s*\(/i,
    /url\s*\(\s*['"]?javascript/i,
    /<img\b[^>]*onerror/i,
  ];

  const matched: string[] = [];
  for (const pattern of patterns) {
    if (pattern.test(input)) matched.push(pattern.source);
  }

  return { detected: matched.length > 0, patterns: matched };
}

// Simple HTML output sanitization for reflections in sandbox UIs
export function sanitizeOutput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}
