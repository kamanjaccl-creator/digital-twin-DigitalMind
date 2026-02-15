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
    } catch {
      lastStatus = null;
      lastMessage = "Network error while sending burst.";
    } finally {
      setLoading(false);
      setResult({ lastStatus, lastMessage, limitedCount: limited, totalRequests: total });
    }
  };

  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[720px] mx-auto px-6 py-10">
        <a href="/sandbox" className="text-accent text-sm hover:underline mb-4 inline-block">
          {'← Back to sandbox'}
        </a>
        <h1 className="text-2xl font-bold text-foreground mb-2">Sandbox: Automated / Bot Traffic</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          This sandbox sends a short burst of requests to{" "}
          <code className="text-accent font-mono text-xs">/api/sandbox/rate-limit</code>{" "}
          to simulate basic scanner or bot behaviour. The backend applies rate limiting and logs events
          to the security dashboard.
        </p>

        <button
          onClick={burst}
          disabled={loading}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending burst..." : "Send burst of requests"}
        </button>

        {result && (
          <div className="mt-6 p-4 rounded-xl border border-border bg-card">
            <p className="text-sm text-foreground">
              <strong>Total requests:</strong> {result.totalRequests}
            </p>
            <p className="text-sm text-foreground mt-1">
              <strong>Rate-limited responses:</strong>{" "}
              <span className={result.limitedCount > 0 ? "text-destructive" : "text-primary"}>
                {result.limitedCount}
              </span>
            </p>
            <p className="text-sm text-foreground mt-1">
              <strong>Last status:</strong> {result.lastStatus ?? "n/a"}
            </p>
            {result.lastMessage && (
              <p className="text-sm text-muted-foreground mt-2">{result.lastMessage}</p>
            )}
          </div>
        )}

        <p className="mt-6 text-muted-foreground text-xs leading-relaxed">
          {'Educational note: in a real deployment, rate limits combine with Arcjet\'s edge protections to slow down automated recon, credential stuffing, and noisy bot traffic while keeping normal users fast.'}
        </p>
      </main>
    </div>
  );
}
