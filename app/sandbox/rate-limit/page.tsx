"use client";

import { useState } from "react";

interface BurstResult {
  lastStatus: number | null;
  lastMessage: string;
  limitedCount: number;
  totalRequests: number;
}

export default function SandboxRateLimit() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BurstResult | null>(null);

  const burst = async () => {
    if (loading) return;
    setLoading(true);

    let limited = 0;
    let total = 0;
    let lastStatus: number | null = null;
    let lastMessage = "";

    try {
      // Fire a small burst of requests in sequence so rate limiting and logging are exercised
      for (let i = 0; i < 6; i++) {
        total += 1;
        const res = await fetch("/api/sandbox/rate-limit", { method: "POST" });
        lastStatus = res.status;
        const data = await res.json().catch(() => ({}));
        lastMessage = data.message || data.error || "";
        if (!res.ok) {
          limited += 1;
        }
      }
    } catch (err) {
      lastStatus = null;
      lastMessage = "Network error while sending burst.";
    } finally {
      setLoading(false);
      setResult({ lastStatus, lastMessage, limitedCount: limited, totalRequests: total });
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Sandbox: Automated / Bot Traffic</h1>
      <p>
        This sandbox sends a short burst of requests to
        {" "}
        <code>/api/sandbox/rate-limit</code>
        {" "}
        to simulate basic scanner or bot behaviour. The backend applies rate limiting and logs events
        to the security dashboard.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        <button onClick={burst} style={{ padding: "8px 12px", cursor: "pointer" }} disabled={loading}>
          {loading ? "Sending burst..." : "Send burst of requests"}
        </button>
      </div>
      {result && (
        <div style={{ marginTop: 16, fontSize: 14 }}>
          <p>
            <strong>Total requests:</strong> {result.totalRequests}
          </p>
          <p>
            <strong>Rate-limited responses:</strong> {result.limitedCount}
          </p>
          <p>
            <strong>Last status:</strong> {result.lastStatus ?? "n/a"}
          </p>
          {result.lastMessage && <p style={{ marginTop: 4 }}>{result.lastMessage}</p>}
        </div>
      )}
      <p style={{ marginTop: 16, color: "#555" }}>
        Educational note: in a real deployment, rate limits combine with Arcjet's edge protections to
        slow down automated recon, credential stuffing, and noisy bot traffic while keeping normal
        users fast.
      </p>
    </main>
  );
}
