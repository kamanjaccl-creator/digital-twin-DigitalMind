export default function SandboxLandingPage() {
  return (
    <main
      style={{
        maxWidth: 960,
        margin: "40px auto",
        padding: 24,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        color: "#e5e7eb",
        background: "#020617",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Offensive security sandbox</h1>
      <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 12 }}>
        This environment behaves like a compact, production-grade attack surface. Each endpoint
        is instrumented end-to-end so you can safely point scanners, HTTP clients, or custom
        scripts at it while the backend classifies traffic, rate-limits abuse, and feeds
        telemetry into the security dashboard.
      </p>
      <ul style={{ fontSize: 14, paddingLeft: 20 }}>
        <li style={{ marginBottom: 6 }}>
          <a href="/sandbox/sql" style={{ color: "#38bdf8" }}>
            /sandbox/sql
          </a>{" "}
           SQL injection lab focused on classic payloads, detection signals, and safe
          parameterised query patterns.
        </li>
        <li style={{ marginBottom: 6 }}>
          <a href="/sandbox/xss" style={{ color: "#38bdf8" }}>
            /sandbox/xss
          </a>{" "}
           reflected XSS and malicious payload exercises with output encoding and
          server-side filtering.
        </li>
        <li style={{ marginBottom: 6 }}>
          <a href="/sandbox/rate-limit" style={{ color: "#38bdf8" }}>
            /sandbox/rate-limit
          </a>{" "}
           automated/bot-style traffic, scanners, and WAF-style token-bucket rate limiting
          with event logging.
        </li>
        <li style={{ marginBottom: 6 }}>
          <a href="/chat" style={{ color: "#38bdf8" }}>
            /chat
          </a>{" "}
           prompt injection lab targeting the Digital Twin chatbot, with every attempt
          analysed, blocked where necessary, and written to the audit trail.
        </li>
        <li style={{ marginBottom: 6 }}>
          <a href="/sandbox/auth" style={{ color: "#38bdf8" }}>
            /sandbox/auth
          </a>{" "}
           authentication and authorisation lab covering broken access control, privilege
          escalation attempts, and misconfigured secrets.
        </li>
      </ul>
      <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 12 }}>
        Treat this like a small, dedicated target in a professional red-team lab: attack only the
        endpoints documented here, observe how they are classified on the dashboard, and do not
        reuse payloads against systems you do not own.
      </p>
    </main>
  );
}
