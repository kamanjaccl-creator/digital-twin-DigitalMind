"use client";

import { useState, type FormEvent } from "react";

interface Result {
  isThreat: boolean;
  patterns: string[];
  action: string;
  severity: string;
  message: string;
}

export default function SandboxSQL() {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = String(data.get("payload") || "").trim();
    if (!input || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/sandbox/sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const json = await res.json();
      if (!res.ok) {
        setResult({
          isThreat: false,
          patterns: [],
          action: "ERROR",
          severity: "LOW",
          message: json.error || "Unexpected error from API.",
        });
      } else {
        setResult({
          isThreat: !!json.isThreat,
          patterns: json.patterns || [],
          action: json.action,
          severity: json.severity,
          message: json.message,
        });
      }
    } catch {
      setResult({
        isThreat: false,
        patterns: [],
        action: "ERROR",
        severity: "LOW",
        message: "Network or server error occurred while analysing input.",
      });
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
        <h1 className="text-2xl font-bold text-foreground mb-2">Sandbox: SQL Injection</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Try common SQL payloads. The backend will run basic SQL injection detection, log events,
          and show whether the input would be blocked.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-sm text-foreground">
            Test input
            <input
              name="payload"
              type="text"
              placeholder="e.g., ' OR 1=1 --"
              className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="self-start px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analysing..." : "Submit"}
          </button>
        </form>

        <p className="mt-6 text-muted-foreground text-xs leading-relaxed">
          Educational note: In production, parameterized queries and strict input validation are used
          to prevent SQL injection. This demo shows how detection + logging can power your security
          dashboard.
        </p>

        {result && (
          <div
            className={`mt-6 p-4 rounded-xl border ${
              result.isThreat
                ? "border-destructive/50 bg-destructive/10"
                : "border-primary/30 bg-primary/5"
            }`}
          >
            <p className="text-sm font-semibold text-foreground m-0">
              {result.isThreat ? "Potential SQL injection detected" : "No obvious SQL injection detected"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
            {result.patterns.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Matched patterns: {result.patterns.join(", ")}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Action: <strong className="text-foreground">{result.action}</strong> | Severity:{" "}
              <strong className="text-foreground">{result.severity}</strong>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
