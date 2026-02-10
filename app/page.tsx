export default function Home() {
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
        This is the landing page for the hacking simulation sandbox and security dashboard. Explore
        the sandbox routes, review documentation, and track performance improvements.
      </p>

      <section style={{ marginTop: 24 }}>
        <h2>Sandbox</h2>
        <ul>
          <li><a href="/sandbox/sql">/sandbox/sql</a> — Parameterized queries and SQLi detection</li>
          <li><a href="/sandbox/xss">/sandbox/xss</a> — CSP enforcement and output encoding</li>
          <li><a href="/sandbox/rate-limit">/sandbox/rate-limit</a> — Per-IP rate limit demo</li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Documentation</h2>
        <ul>
          <li><a href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/agents.md" target="_blank" rel="noreferrer">Agents Architecture</a></li>
          <li><a href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/docs/design.md" target="_blank" rel="noreferrer">Design</a></li>
          <li><a href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/docs/prd.md" target="_blank" rel="noreferrer">PRD</a></li>
          <li><a href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/performance-comparison.md" target="_blank" rel="noreferrer">Performance Comparison</a></li>
          <li><a href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/data-refinement-log.md" target="_blank" rel="noreferrer">Data Refinement Log</a></li>
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Deployment</h2>
        <p>
          Vercel project URL: <a href="https://vercel.com/ashmin7s-projects" target="_blank" rel="noreferrer">vercel.com/ashmin7s-projects</a>
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Security Dashboard</h2>
        <p>Coming soon — will visualize ArcJet and Supabase telemetry, threats by type, and outcomes.</p>
      </section>
    </main>
  );
}
