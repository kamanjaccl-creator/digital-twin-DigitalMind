"use client";

import React, { useState } from "react";

export default function SandboxXSS() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    isThreat: boolean;
    patterns: string[];
    action: string;
    severity: string;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/sandbox/xss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error("XSS sandbox error", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Sandbox: Cross-Site Scripting (XSS)</h1>
      <p>
        Enter HTML/JS snippets. The API will analyze them for XSS / malicious
        payload patterns and log attempts to the security_events table.
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Test input
          <input
            name="payload"
            type="text"
            placeholder="e.g., <script>alert(1)</script>"
            style={{ width: "100%", padding: 8 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button
          type="submit"
          style={{ padding: "8px 12px", cursor: "pointer" }}
          disabled={loading || !input.trim()}
        >
          {loading ? "Analyzing..." : "Analyze payload"}
        </button>
      </form>
      {error && (
        <p style={{ marginTop: 16, color: "#f87171" }}>{error}</p>
      )}
      {result && (
        <div style={{ marginTop: 16, fontSize: 14 }}>
          <p>
            <strong>Threat detected:</strong> {result.isThreat ? "Yes" : "No"}
          </p>
          <p>
            <strong>Action:</strong> {result.action}
          </p>
          <p>
            <strong>Severity:</strong> {result.severity}
          </p>
          <p>
            <strong>Message:</strong> {result.message}
          </p>
          {Array.isArray(result.patterns) && result.patterns.length > 0 && (
            <div>
              <strong>Matched patterns:</strong>
              <ul>
                {result.patterns.map((p, i) => (
                  <li key={i} style={{ wordBreak: "break-all" }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <p style={{ marginTop: 16, color: "#555" }}>
        Educational note: In production, combine server-side validation,
        output encoding, Content Security Policy (CSP), and security headers.
      </p>
    </main>
  );
}
