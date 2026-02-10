"use client";

export default function SandboxSQL() {
  const sanitize = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = String(data.get("payload") || "");
    const safe = sanitize(input);
    const msg = `Received input (sanitized): ${safe}\n\nNote: In production, parameterized queries prevent SQL injection.`;
    alert(msg);
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Sandbox: SQL Injection</h1>
      <p>Try common SQL payloads. We will sanitize and reflect the input (no backend call).</p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Test input
          <input name="payload" type="text" placeholder="e.g., ' OR 1=1 --" style={{ width: "100%", padding: 8 }} />
        </label>
        <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }}>Submit</button>
      </form>
      <p style={{ marginTop: 16, color: "#555" }}>
        Educational note: Use prepared statements/parameterized queries to avoid SQL injection. This demo only shows sanitization for UI reflection.
      </p>
    </main>
  );
}
