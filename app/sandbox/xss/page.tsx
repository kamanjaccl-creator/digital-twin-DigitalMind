"use client";

import React, { useState } from "react";
import SiteHeader from "../../../components/site-header";
import SiteFooter from "../../../components/site-footer";

export default function SandboxXSS() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ isThreat: boolean; patterns: string[]; action: string; severity: string; message: string } | null>(null);
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container-sm" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{"Cross-Site Scripting (XSS) Sandbox"}</h1>
        <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          Enter HTML/JS snippets. The API will analyze them for XSS / malicious payload patterns and log attempts.
        </p>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 14, color: "var(--fg)" }}>
            Test input
            <input
              name="payload"
              type="text"
              placeholder="e.g., <script>alert(1)</script>"
              className="input"
              style={{ marginTop: 6 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button type="submit" disabled={loading || !input.trim()} className="btn-primary" style={{ alignSelf: "flex-start" }}>
            {loading ? "Analyzing..." : "Analyze payload"}
          </button>
        </form>

        {error && <p style={{ marginTop: 16, color: "var(--destructive)", fontSize: 14 }}>{error}</p>}

        {result && (
          <div className={result.isThreat ? "result-threat" : "result-safe"} style={{ marginTop: 24 }}>
            <p style={{ fontSize: 14, margin: 0, color: "var(--fg)" }}><strong>Threat detected:</strong> {result.isThreat ? "Yes" : "No"}</p>
            <p style={{ fontSize: 14, marginTop: 4, color: "var(--fg-muted)" }}><strong style={{ color: "var(--fg)" }}>Action:</strong> {result.action}</p>
            <p style={{ fontSize: 14, marginTop: 4, color: "var(--fg-muted)" }}><strong style={{ color: "var(--fg)" }}>Severity:</strong> {result.severity}</p>
            <p style={{ fontSize: 14, marginTop: 4, color: "var(--fg-muted)" }}><strong style={{ color: "var(--fg)" }}>Message:</strong> {result.message}</p>
            {result.patterns.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong style={{ fontSize: 14, color: "var(--fg)" }}>Matched patterns:</strong>
                <ul style={{ marginTop: 4, fontSize: 14, color: "var(--fg-muted)", paddingLeft: 20 }}>
                  {result.patterns.map((p, i) => <li key={i} style={{ wordBreak: "break-all" }}>{p}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        <p style={{ marginTop: 24, color: "var(--fg-muted)", fontSize: 12, lineHeight: 1.7 }}>
          Educational note: In production, combine server-side validation, output encoding, Content Security Policy (CSP), and security headers.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
