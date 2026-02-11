"use client";

export default function Home() {
  const rollDice = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    alert("You rolled: " + result);
  };
  return (
    <main style={{
      maxWidth: 960,
      margin: "40px auto",
      padding: 24,
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      lineHeight: 1.6
    }}>
      <h1 style={{ marginBottom: 8 }}>Digital Twin III — Hack Me If You Can</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        This isn&apos;t a static portfolio. It&apos;s a live cyber lab built to be scanned,
        attacked, monitored, and continuously hardened.
      </p>

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 8,
          marginBottom: 32,
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>About</h2>
          <p>
            Your Digital Twin is treated as a real target: a web application backed by data,
            defended with layered controls, and instrumented to capture attacker behaviour and
            your responses.
          </p>
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            padding: 16,
            border: "1px solid #eee",
            borderRadius: 8,
          }}
        >
          <h2 style={{ margin: 0 }}>Live Demo</h2>
          <p style={{ marginTop: 8 }}>Deployed on Vercel and ready to be tested, safely.</p>
          <button
            onClick={rollDice}
            style={{ marginTop: 12, padding: "8px 12px", cursor: "pointer", borderRadius: 6 }}
          >
            Roll Dice 🎲 <span style={{ fontSize: 12, marginLeft: 4 }}>(tool example)</span>
          </button>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Featured Capabilities</h2>
        <ul>
          <li>Hosts your professional identity and project content on a live site.</li>
          <li>Detects and blocks real threats like SQL injection, XSS, and prompt injection.</li>
          <li>Analyses attacker behaviour and surfaces risk in human-readable reports.</li>
          <li>Shows security as a lifecycle: detection, response, remediation, hardening.</li>
          <li>Communicates your cyber maturity to employers with real telemetry.</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Threats &amp; Defenses</h2>
        <p style={{ color: "#555" }}>
          The portfolio is designed to demonstrate resilience against common real-world issues:
        </p>
        <ul>
          <li>SQL injection and malicious payloads against data-backed endpoints.</li>
          <li>Prompt injection attempts against AI agents and automation.</li>
          <li>Authentication and authorization failures.</li>
          <li>Broken access control and privilege escalation paths.</li>
          <li>Automated bot and scanner traffic (rate limiting, challenges).</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Sandbox</h2>
        <p style={{ color: "#555" }}>Safe, isolated routes to experiment with typical web attacks:</p>
        <ul>
          <li><a href="/sandbox/sql">/sandbox/sql</a> — SQL injection scenarios.</li>
          <li><a href="/sandbox/xss">/sandbox/xss</a> — XSS and output encoding.</li>
          <li><a href="/sandbox/rate-limit">/sandbox/rate-limit</a> — Rate limiting behavior.</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Tech Stack</h2>
        <ul>
          <li>Next.js (App Router) + TypeScript</li>
          <li>Supabase (database, auth, audit logs)</li>
          <li>ArcJet (threat detection, rate limiting)</li>
          <li>OpenAI (security and persona agents)</li>
          <li>Vercel (hosting & CI/CD)</li>
        </ul>
      </section>

      <section style={{ marginTop: 24, marginBottom: 16 }}>
        <h2>Contact</h2>
        <p>
          Use this site as a case study in interviews and technical discussions. Link it from
          your resume, LinkedIn, or GitHub to demonstrate that you understand modern
          application security in practice.
        </p>
      </section>
    </main>
  );
}
