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
      <h1 style={{ marginBottom: 8 }}>Digital Twin III — Cyber-Hardened Portfolio</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        A cybersecurity-focused digital twin that showcases your skills through a live hacking
        simulation sandbox, real-time threat analytics, and AI-powered security agents.
      </p>

      <section style={{ textAlign: "center", marginTop: 16, padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
        <h2 style={{ margin: 0 }}>Digital Twin System — Production Ready</h2>
        <p style={{ marginTop: 8 }}>Week 4 deployment is live on Vercel and wired for security telemetry.</p>
        <button
          onClick={rollDice}
          style={{ marginTop: 12, padding: "8px 12px", cursor: "pointer", borderRadius: 6 }}
        >
          Roll Dice 🎲 <span style={{ fontSize: 12, marginLeft: 4 }}>(MCP tool demo)</span>
        </button>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>About This Digital Twin</h2>
        <p>
          This project represents a cybersecurity professional&apos;s portfolio as a living
          system, not just a static resume. It combines secure-by-design web development with
          AI agents that monitor, defend, and explain what&apos;s happening behind the scenes.
        </p>
        <p>
          Recruiters and collaborators can explore realistic attack simulations, review
          architecture decisions, and see how security telemetry would power a production
          dashboard.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>AI Agents &amp; Security Architecture</h2>
        <p>
          The platform is built around multiple cooperating agents documented in
          {" "}
          <a
            href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/agents.md"
            target="_blank"
            rel="noreferrer"
          >
            agents.md
          </a>
          :
        </p>
        <ul>
          <li><strong>Digital Twin Persona</strong> — answers questions about skills and projects.</li>
          <li><strong>Security Guardian</strong> — detects prompt injection, SQLi, XSS, and more.</li>
          <li><strong>Threat Analytics</strong> — turns raw logs into dashboard-ready insights.</li>
          <li><strong>Content Creator</strong> — generates technical blog posts and docs.</li>
          <li><strong>Audit Logger</strong> — records security events for forensics and auditing.</li>
        </ul>
        <p style={{ color: "#555" }}>
          Together they demonstrate how AI agents can harden a modern web application and explain
          their decisions in human terms.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Hacking Simulation Sandbox</h2>
        <p>
          Use the sandbox to safely try common attack patterns and immediately see how they are
          detected, logged, and mitigated. Each route focuses on a specific class of vulnerability:
        </p>
        <ul>
          <li><a href="/sandbox/sql">/sandbox/sql</a> — Parameterized queries and SQL injection detection.</li>
          <li><a href="/sandbox/xss">/sandbox/xss</a> — Output encoding and CSP-style XSS defenses.</li>
          <li><a href="/sandbox/rate-limit">/sandbox/rate-limit</a> — Per-IP rate limiting behavior.</li>
        </ul>
        <p style={{ color: "#555" }}>
          These flows are intentionally educational: inputs are sandboxed, telemetry is surfaced,
          and nothing touches real production data.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Security Dashboard (Preview)</h2>
        <p>
          The next step is a full security dashboard wired to ArcJet and Supabase logs. It will
          highlight key portfolio-ready metrics such as:
        </p>
        <ul>
          <li>Threats by type (SQLi, XSS, prompt injection, bot behavior).</li>
          <li>Blocked vs allowed requests over time.</li>
          <li>Top attacking IPs and endpoints being probed.</li>
          <li>Current threat level (LOW / MEDIUM / HIGH / CRITICAL).</li>
        </ul>
        <p style={{ color: "#555" }}>
          This demonstrates familiarity with real-world monitoring, alerting, and security
          operations workflows.
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Tech Stack</h2>
        <p>
          The digital twin is built with a modern, production-ready stack tuned for security and
          observability:
        </p>
        <ul>
          <li>Next.js (App Router) + TypeScript for the frontend and API routes.</li>
          <li>Supabase for database, auth, and audit logging.</li>
          <li>ArcJet for application-layer threat detection and rate limiting.</li>
          <li>OpenAI for persona and security-focused AI agents.</li>
          <li>Vercel for CI/CD, edge hosting, and preview environments.</li>
        </ul>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Documentation</h2>
        <p>Deep-dive into the design decisions and week-by-week improvements:</p>
        <ul>
          <li>
            <a
              href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/docs/design.md"
              target="_blank"
              rel="noreferrer"
            >
              System Design
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/docs/prd.md"
              target="_blank"
              rel="noreferrer"
            >
              Product Requirements (PRD)
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/performance-comparison.md"
              target="_blank"
              rel="noreferrer"
            >
              Performance Comparison
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/data-refinement-log.md"
              target="_blank"
              rel="noreferrer"
            >
              Data Refinement Log
            </a>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Deployment</h2>
        <p>
          Deployed on Vercel with preview environments for each branch. Live project URL:
          {" "}
          <a
            href="https://vercel.com/ashmin7s-projects"
            target="_blank"
            rel="noreferrer"
          >
            vercel.com/ashmin7s-projects
          </a>
          .
        </p>
      </section>

      <section style={{ marginTop: 32, marginBottom: 16 }}>
        <h2>Get in Touch</h2>
        <p>
          Interested in discussing security engineering, AI agents, or this project in more
          detail? Use this portfolio as a conversation starter and reach out via your preferred
          channel (email, LinkedIn, or GitHub).
        </p>
      </section>
    </main>
  );
}
