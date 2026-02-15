"use client";

import React, { useState } from "react";

export default function AuthSandboxPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<{ status: number; data: Record<string, unknown> } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callEndpoint = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const url = "/api/admin/secret" + (token ? `?token=${encodeURIComponent(token)}` : "");
      const res = await fetch(url, { method: "GET" });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || data.error || "Request failed");
      }

      setResult({ status: res.status, data });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      console.error("Auth sandbox error", err);
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
        <h1 className="text-2xl font-bold text-foreground mb-2">{'Sandbox: Authentication & Access Control'}</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          This sandbox simulates an admin-only API at{" "}
          <code className="text-accent font-mono text-xs">/api/admin/secret</code>.
          Requests without the correct token are logged as{" "}
          <code className="text-accent font-mono text-xs">ACCESS_DENIED</code>{" "}
          or broken access-control attempts in the security_events table.
        </p>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-foreground">
            {'Admin token (demo)'}
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="leave blank to simulate unauthorized access"
              className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <button
            onClick={callEndpoint}
            disabled={loading}
            className="self-start px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Calling API..." : "Call protected API"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-destructive text-sm">{error}</p>
        )}

        {result && (
          <div className="mt-6 p-4 rounded-xl border border-border bg-card">
            <p className="text-sm text-foreground">
              <strong>Status:</strong> {result.status}
            </p>
            <pre className="mt-3 p-3 bg-background rounded-lg text-xs text-foreground font-mono overflow-x-auto border border-border">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}

        <p className="mt-6 text-muted-foreground text-xs leading-relaxed">
          Hint: the demo token is configured via{" "}
          <code className="text-accent font-mono">DEMO_ADMIN_TOKEN</code>{" "}
          (default value is a non-sensitive placeholder). Use this to demonstrate both failed
          and successful authorization flows and then show the corresponding entries on the dashboard.
        </p>
      </main>
    </div>
  );
}
