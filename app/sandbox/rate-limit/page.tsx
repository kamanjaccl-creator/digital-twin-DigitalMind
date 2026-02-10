"use client";

import { useRef, useState } from "react";

export default function SandboxRateLimit() {
  const [count, setCount] = useState(0);
  const timer = useRef<number | null>(null);

  const burst = () => {
    setCount((c) => c + 1);
    if (timer.current) return;
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setCount(0);
    }, 3000);
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Sandbox: Rate Limiting</h1>
      <p>Simulate rapid requests. In production, bursts trigger 429 with audit logs.</p>
      <div style={{ display: "grid", gap: 12 }}>
        <button onClick={burst} style={{ padding: "8px 12px", cursor: "pointer" }}>Send burst</button>
        <div>Current burst count (3s window): {count}</div>
      </div>
      <p style={{ marginTop: 16, color: "#555" }}>
        Educational note: Use per-IP/per-user tokens and sliding windows. This demo resets count after 3s.
      </p>
    </main>
  );
}
