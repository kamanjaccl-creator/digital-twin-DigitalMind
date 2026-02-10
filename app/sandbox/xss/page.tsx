"use client";

export default function SandboxXSS() {
  const sanitize = (s: string) => s
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = String(new FormData(e.currentTarget).get("payload") || "");
    const safe = sanitize(input);
    alert(`Reflected (sanitized) content: ${safe}\n\nCSP and output encoding protect against XSS.`);
  };

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 24 }}>
      <h1>Sandbox: Cross-Site Scripting (XSS)</h1>
      <p>Enter HTML/JS snippets. We will encode them before reflection.</p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Test input
          <input name="payload" type="text" placeholder="e.g., <script>alert(1)</script>" style={{ width: "100%", padding: 8 }} />
        </label>
        <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }}>Submit</button>
      </form>
      <p style={{ marginTop: 16, color: "#555" }}>
        Educational note: Use CSP headers and encode output. Never trust user input.
      </p>
    </main>
  );
}
