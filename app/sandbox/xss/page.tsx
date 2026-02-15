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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      console.error("XSS sandbox error", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[720px] mx-auto px-6 py-10">
        <a href="/sandbox" className="text-accent text-sm hover:underline mb-4 inline-block">
          {'← Back to sandbox'}
        </a>
        <h1 className="text-2xl font-bold text-foreground mb-2">{'Sandbox: Cross-Site Scripting (XSS)'}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Enter HTML/JS snippets. The API will analyze them for XSS / malicious
          payload patterns and log attempts to the security_events table.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-sm text-foreground">
            Test input
            <input
              name="payload"
              type="text"
              placeholder="e.g., <script>alert(1)</script>"
              className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="self-start px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Analyze payload"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-destructive text-sm">{error}</p>
        )}

        {result && (
          <div
            className={`mt-6 p-4 rounded-xl border ${
              result.isThreat
                ? "border-destructive/50 bg-destructive/10"
                : "border-primary/30 bg-primary/5"
            }`}
          >
            <p className="text-sm text-foreground">
              <strong>Threat detected:</strong> {result.isThreat ? "Yes" : "No"}
            </p>
            <p className="text-sm text-foreground mt-1">
              <strong>Action:</strong> {result.action}
            </p>
            <p className="text-sm text-foreground mt-1">
              <strong>Severity:</strong> {result.severity}
            </p>
            <p className="text-sm text-foreground mt-1">
              <strong>Message:</strong> {result.message}
            </p>
            {Array.isArray(result.patterns) && result.patterns.length > 0 && (
              <div className="mt-2">
                <strong className="text-sm text-foreground">Matched patterns:</strong>
                <ul className="mt-1 text-sm text-muted-foreground list-disc pl-5">
                  {result.patterns.map((p, i) => (
                    <li key={i} className="break-all">{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-muted-foreground text-xs leading-relaxed">
          Educational note: In production, combine server-side validation,
          output encoding, Content Security Policy (CSP), and security headers.
        </p>
      </main>
    </div>
  );
}
