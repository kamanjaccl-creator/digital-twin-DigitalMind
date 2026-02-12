"use client";

import React, { useState } from "react";

export default function AuthSandboxPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<any>(null);
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
    } catch (err: any) {
      console.error("Auth sandbox error", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Sandbox: Authentication & Access Control</h1>
      <p>
        This sandbox simulates an admin-only API at <code>/api/admin/secret</code>.
        Requests without the correct token are logged as <code>ACCESS_DENIED</code>
        or broken access-control attempts in the security_events table.
      </p>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        <label>
          Admin token (demo)
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="leave blank to simulate unauthorized access"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </label>
        <button
          onClick={callEndpoint}
          disabled={loading}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          {loading ? "Calling API..." : "Call protected API"}
        </button>
      </div>

      {error && (
        <p style={{ marginTop: 16, color: "#f87171" }}>{error}</p>
      )}

      {result && (
        <div style={{ marginTop: 16, fontSize: 14 }}>
          <p>
            <strong>Status:</strong> {result.status}
          </p>
          <pre
            style={{
              marginTop: 8,
              padding: 12,
              background: "#020617",
              color: "#e5e7eb",
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      <p style={{ marginTop: 16, color: "#555" }}>
        Hint: the demo token is configured via <code>DEMO_ADMIN_TOKEN</code>
        (default value is a non-sensitive placeholder). Use this to
        demonstrate both failed and successful authorization flows and then
        show the corresponding entries on the dashboard.
      </p>
    </main>
  );
}
