import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function SandboxLandingPage() {
  const sandboxes = [
    { href: "/sandbox/sql", label: "SQL Injection Lab", desc: "Classic payloads, detection signals, and safe parameterised query patterns." },
    { href: "/sandbox/xss", label: "XSS Testing", desc: "Reflected XSS and malicious payload exercises with output encoding and server-side filtering." },
    { href: "/sandbox/rate-limit", label: "Rate Limiting", desc: "Automated/bot-style traffic, scanners, and WAF-style token-bucket rate limiting with event logging." },
    { href: "/sandbox/auth", label: "Auth Bypass", desc: "Authentication and authorisation lab covering broken access control, privilege escalation attempts, and misconfigured secrets." },
    { href: "/chat", label: "Prompt Injection", desc: "Prompt injection lab targeting the Digital Twin chatbot, with every attempt analysed, blocked where necessary, and written to the audit trail." },
  ];

  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container-md" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="section-label">Security Operations</p>
        <h1 className="section-title">Offensive security sandbox</h1>
        <p className="section-desc" style={{ marginBottom: 24 }}>
          This environment behaves like a compact, production-grade attack surface. Each endpoint
          is instrumented end-to-end so you can safely point scanners, HTTP clients, or custom
          scripts at it while the backend classifies traffic, rate-limits abuse, and feeds
          telemetry into the security dashboard.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sandboxes.map((s) => (
            <a key={s.href} href={s.href} className="feature-card" style={{ textDecoration: "none", padding: 18, display: "block" }}>
              <h3 style={{ color: "var(--fg)" }}>{s.label}</h3>
              <p>{s.desc}</p>
            </a>
          ))}
        </div>

        <p style={{ color: "var(--fg-muted)", fontSize: 12, lineHeight: 1.7, marginTop: 24 }}>
          Treat this like a small, dedicated target in a professional red-team lab: attack only the
          endpoints documented here, observe how they are classified on the dashboard, and do not
          reuse payloads against systems you do not own.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
