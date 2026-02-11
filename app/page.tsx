"use client";

export default function Home() {
  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    alert("You rolled: " + result);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid rgba(148,163,184,0.3)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "999px",
                background: "#22c55e",
                boxShadow: "0 0 12px #22c55e",
              }}
            />
            <span style={{ fontWeight: 600 }}>Digital Twin III</span>
          </div>
          <nav style={{ display: "flex", gap: 16, fontSize: 14 }}>
            <a href="#about" style={{ color: "#e5e7eb", textDecoration: "none" }}>About</a>
            <a href="#sandbox" style={{ color: "#e5e7eb", textDecoration: "none" }}>Sandbox</a>
            <a href="#threats" style={{ color: "#e5e7eb", textDecoration: "none" }}>Threats</a>
            <a href="#stack" style={{ color: "#e5e7eb", textDecoration: "none" }}>Stack</a>
            <a href="/dashboard" style={{ color: "#e5e7eb", textDecoration: "none" }}>Dashboard</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1040, margin: "0 auto", padding: "32px 24px 40px" }}>
        {/* Hero */}
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ fontSize: 12, letterSpacing: 2, color: "#a5b4fc", textTransform: "uppercase" }}>
              Hack Me If You Can
            </p>
            <h1 style={{ fontSize: 32, margin: "8px 0 12px" }}>
              A cyber-secured portfolio that invites attackand proves resilience.
            </h1>
            <p style={{ color: "#9ca3af", fontSize: 14, maxWidth: 560 }}>
              This site turns your professional portfolio into an active target: backed by data,
              protected by layered defenses, and instrumented to capture attacker behaviour,
              telemetry, and your remediation steps.
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="#sandbox"
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "#22c55e",
                  color: "#020617",
                  fontSize: 14,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Explore attack sandbox
              </a>
              <button
                onClick={rollDice}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "1px solid #4b5563",
                  background: "transparent",
                  color: "#e5e7eb",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Roll security dice 🎲
              </button>
            </div>
          </div>
          <div
            style={{
              flexBasis: 260,
              flexGrow: 0,
              flexShrink: 0,
              borderRadius: 16,
              padding: 16,
              background:
                "radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 55%), #020617",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Course outcome</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13 }}>
              <li>• Hosts your professional identity &amp; project content</li>
              <li>• Detects &amp; blocks real web threats in real-time</li>
              <li>• Analyses attacker behaviour and patterns</li>
              <li>• Surfaces CVSS-style risk &amp; remediation notes</li>
              <li>• Demonstrates security as a lifecycle, not a checkbox</li>
            </ul>
          </div>
        </section>

        {/* About */}
        <section id="about" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>What this Digital Twin represents</h2>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>
            Every production web app is a potential entry point for attackers. This portfolio is
            built to reflect that reality: it is a controlled environment where you can run
            attacks, review telemetry, and show how you respond and harden over time.
          </p>
        </section>

        {/* Threats & Defenses */}
        <section id="threats" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Threats you train against</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              fontSize: 14,
            }}
          >
            <div style={{ padding: 12, borderRadius: 12, border: "1px solid #1f2937" }}>
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Injection attacks</h3>
              <p style={{ color: "#9ca3af" }}>SQL injection, prompt injection, and malicious payloads.</p>
            </div>
            <div style={{ padding: 12, borderRadius: 12, border: "1px solid #1f2937" }}>
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Auth &amp; access control</h3>
              <p style={{ color: "#9ca3af" }}>Authentication failures, broken access control, privilege abuse.</p>
            </div>
            <div style={{ padding: 12, borderRadius: 12, border: "1px solid #1f2937" }}>
              <h3 style={{ fontSize: 15, marginBottom: 6 }}>Bots &amp; automation</h3>
              <p style={{ color: "#9ca3af" }}>Automated scanners, brute-force tools, and scripted attacks.</p>
            </div>
          </div>
        </section>

        {/* Sandbox */}
        <section id="sandbox" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Hacking simulation sandbox</h2>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>
            These routes are safe sandboxes where attacks are expected. They show how the
            application detects, logs, and mitigates harmful input.
          </p>
          <ul style={{ fontSize: 14 }}>
            <li>
              <a href="/sandbox/sql" style={{ color: "#38bdf8" }}>
                /sandbox/sql
              </a>{" "}
               SQL injection patterns and parameterised queries.
            </li>
            <li>
              <a href="/sandbox/xss" style={{ color: "#38bdf8" }}>
                /sandbox/xss
              </a>{" "}
               reflected XSS attempts and output encoding.
            </li>
            <li>
              <a href="/sandbox/rate-limit" style={{ color: "#38bdf8" }}>
                /sandbox/rate-limit
              </a>{" "}
               automated/bot-style traffic and rate limiting.
            </li>
            <li>
              <a href="/sandbox/auth" style={{ color: "#38bdf8" }}>
                /sandbox/auth
              </a>{" "}
              – authentication failures and broken access-control scenarios.
            </li>
          </ul>
        </section>

        {/* Stack */}
        <section id="stack" style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Security-focused stack</h2>
          <ul style={{ fontSize: 14, color: "#e5e7eb" }}>
            <li>Next.js (App Router) + TypeScript for a modern, testable frontend.</li>
            <li>Supabase for database, authentication, and structured audit logging.</li>
            <li>ArcJet for application-layer WAF-style protections and rate limiting.</li>
            <li>OpenAI agents for persona, threat analysis, and security content.</li>
            <li>Vercel for deployment, previews, and production-like environments.</li>
          </ul>
        </section>

        {/* Call to action */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Use this as your case study</h2>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>
            Share this site with recruiters, hiring managers, and mentors. It is a deployable,
            auditable example of how you think about real-world application securityfar
            beyond a static CV.
          </p>
        </section>
      </main>
    </div>
  );
}
