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
    } catch (err) {
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
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Sandbox: SQL Injection</h1>
      <p>
        Try common SQL payloads. The backend will run basic SQL injection detection, log events,
        and show whether the input would be blocked.
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Test input
          <input
            name="payload"
            type="text"
            placeholder="e.g., ' OR 1=1 --"
            style={{ width: "100%", padding: 8 }}
          />
        </label>
        <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }} disabled={loading}>
          {loading ? "Analysing..." : "Submit"}
        </button>
      </form>
      <p style={{ marginTop: 16, color: "#555" }}>
        Educational note: In production, parameterized queries and strict input validation are used
        to prevent SQL injection. This demo shows how detection + logging can power your security
        dashboard.
      </p>

      {result && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            backgroundColor: result.isThreat ? "#fef2f2" : "#f9fafb",
          }}
        >
          <p style={{ margin: 0, fontWeight: 600 }}>
            {result.isThreat ? "Potential SQL injection detected" : "No obvious SQL injection detected"}
          </p>
          <p style={{ marginTop: 4 }}>{result.message}</p>
          {result.patterns.length > 0 && (
            <p style={{ marginTop: 4, fontSize: 12, color: "#4b5563" }}>
              Matched patterns: {result.patterns.join(", ")}
            </p>
          )}
          <p style={{ marginTop: 4, fontSize: 12, color: "#4b5563" }}>
            Action: <strong>{result.action}</strong> | Severity: <strong>{result.severity}</strong>
          </p>
        </div>
      )}
    </main>
  );
}
