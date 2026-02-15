export default function SandboxLandingPage() {
  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[960px] mx-auto px-6 py-10">
        <a href="/" className="text-accent text-sm hover:underline mb-4 inline-block">
          {'← Back to site'}
        </a>
        <h1 className="text-2xl font-bold text-foreground mb-4">Offensive security sandbox</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          This environment behaves like a compact, production-grade attack surface. Each endpoint
          is instrumented end-to-end so you can safely point scanners, HTTP clients, or custom
          scripts at it while the backend classifies traffic, rate-limits abuse, and feeds
          telemetry into the security dashboard.
        </p>

        <ul className="text-sm space-y-3 mb-6">
          <li className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <a href="/sandbox/sql" className="text-accent font-medium hover:underline">/sandbox/sql</a>
            <span className="text-muted-foreground">
              {' — SQL injection lab focused on classic payloads, detection signals, and safe parameterised query patterns.'}
            </span>
          </li>
          <li className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <a href="/sandbox/xss" className="text-accent font-medium hover:underline">/sandbox/xss</a>
            <span className="text-muted-foreground">
              {' — reflected XSS and malicious payload exercises with output encoding and server-side filtering.'}
            </span>
          </li>
          <li className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <a href="/sandbox/rate-limit" className="text-accent font-medium hover:underline">/sandbox/rate-limit</a>
            <span className="text-muted-foreground">
              {' — automated/bot-style traffic, scanners, and WAF-style token-bucket rate limiting with event logging.'}
            </span>
          </li>
          <li className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <a href="/chat" className="text-accent font-medium hover:underline">/chat</a>
            <span className="text-muted-foreground">
              {' — prompt injection lab targeting the Digital Twin chatbot, with every attempt analysed, blocked where necessary, and written to the audit trail.'}
            </span>
          </li>
          <li className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <a href="/sandbox/auth" className="text-accent font-medium hover:underline">/sandbox/auth</a>
            <span className="text-muted-foreground">
              {' — authentication and authorisation lab covering broken access control, privilege escalation attempts, and misconfigured secrets.'}
            </span>
          </li>
        </ul>

        <p className="text-muted-foreground text-xs leading-relaxed">
          Treat this like a small, dedicated target in a professional red-team lab: attack only the
          endpoints documented here, observe how they are classified on the dashboard, and do not
          reuse payloads against systems you do not own.
        </p>
      </main>
    </div>
  );
}
