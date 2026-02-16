"use client";

import React, { useState } from "react";
import SiteHeader from "../../../components/site-header";
import SiteFooter from "../../../components/site-footer";

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
      if (!res.ok) throw new Error(data.message || data.error || "Request failed");
      setResult({ status: res.status, data });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container-sm" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="section-label">Sandbox</p>
        <h1 className="section-title" style={{ fontSize: 24 }}>{"Authentication & Access Control"}</h1>
        <p className="section-desc" style={{ marginBottom: 24 }}>
          Simulates an admin-only API at{" "}
          <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 12 }}>/api/admin/secret</code>.
          Requests without the correct token are logged as{" "}
          <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 12 }}>ACCESS_DENIED</code>{" "}
          events.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 14, color: "var(--fg)" }}>
            Admin token (demo)
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="leave blank to simulate unauthorized access"
              className="input"
              style={{ marginTop: 6 }}
            />
          </label>
          <button onClick={callEndpoint} disabled={loading} className="btn-primary" style={{ alignSelf: "flex-start" }}>
            {loading ? "Calling API..." : "Call protected API"}
          </button>
        </div>

        {error && <p style={{ marginTop: 16, color: "var(--destructive)", fontSize: 14 }}>{error}</p>}

        {result && (
          <div className="card" style={{ marginTop: 24 }}>
            <p style={{ fontSize: 14, color: "var(--fg)" }}><strong>Status:</strong> {result.status}</p>
            <pre
              style={{
                marginTop: 12,
                padding: 12,
                background: "var(--bg)",
                borderRadius: 8,
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                overflowX: "auto",
                border: "1px solid var(--border)",
                color: "var(--fg-muted)",
              }}
            >
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}

        <p style={{ marginTop: 24, color: "var(--fg-muted)", fontSize: 12, lineHeight: 1.7 }}>
          Hint: the demo token is configured via{" "}
          <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>DEMO_ADMIN_TOKEN</code>{" "}
          (default value is a non-sensitive placeholder).
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
