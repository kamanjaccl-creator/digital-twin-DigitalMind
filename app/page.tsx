"use client";

import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

const features = [
  {
    num: "01",
    title: "Real-time Threat Detection",
    desc: "Detects SQL injection, XSS, prompt injection, and bot attacks in real-time with severity classification.",
  },
  {
    num: "02",
    title: "AI-Driven Interactions",
    desc: "Conversational persona agent answers questions about skills, experience, and portfolio content.",
  },
  {
    num: "03",
    title: "Security Dashboard",
    desc: "Visualises attack patterns, blocked threats, and system performance with real-time updates.",
  },
  {
    num: "04",
    title: "Audit Logging",
    desc: "All security events are logged for transparency, accountability, and compliance.",
  },
];

const agents = [
  {
    name: "DigitalTwinPersona",
    status: "active" as const,
    desc: "Interactive digital twin representing professional identity",
    caps: [
      "Maintain concise, approachable, and informative responses",
      "Provide professional guidance and contact info",
      "Answer questions about skills, projects, and certifications",
    ],
    model: "GPT-4 Turbo",
    temp: "0.7",
  },
  {
    name: "SecurityGuardian",
    status: "active" as const,
    desc: "Detects threats and protects the portfolio from malicious inputs",
    caps: [
      "Provide recommended action: ALLOW, BLOCK, CHALLENGE",
      "Assign severity (LOW, MEDIUM, HIGH, CRITICAL)",
      "Detect SQL injection, XSS, prompt injections, bot attacks",
    ],
    model: "GPT-4 Turbo",
    temp: "0.1",
  },
  {
    name: "ContentCreator",
    status: "standby" as const,
    desc: "Generates and manages blog posts and project documentation",
    caps: [
      "Support MCP tools for automation",
      "Maintain consistent branding and technical accuracy",
      "Create, update, and summarise content in markdown",
    ],
    model: "GPT-4 Turbo",
    temp: "0.8",
  },
  {
    name: "ThreatAnalytics",
    status: "active" as const,
    desc: "Aggregates and analyses security events for actionable insights",
    caps: [
      "Predict potential future threats",
      "Generate dashboards and reports",
      "Compute threat metrics and trends",
    ],
    model: "GPT-4 Turbo",
    temp: "0.5",
  },
  {
    name: "AuditLogger",
    status: "active" as const,
    desc: "Logs and monitors all security-related events",
    caps: [
      "Send real-time notifications for critical events",
      "Store events in Supabase",
      "Sanitise sensitive data before logging",
    ],
    model: "System",
    temp: "0",
  },
];

const projects = [
  {
    title: "Portfolio Hardening System",
    desc: "Cyber-hardened portfolio with AI agents and real-time security monitoring. Implements OWASP Top 10 best practices with multi-layer defence architecture.",
    features: ["Real-time threat detection", "AI-powered chatbot", "Security dashboard", "Audit logging"],
    tags: ["Next.js 16", "TypeScript", "Supabase", "Vercel"],
  },
  {
    title: "MCP Server Architecture",
    desc: "Model Context Protocol implementation enabling AI agents to interact with external tools, databases, and services with secure tool calling.",
    features: ["Security Monitor Server", "Content Manager Server", "Threat Intelligence Server", "Tool orchestration"],
    tags: ["TypeScript", "OpenAI", "Supabase", "Node.js"],
  },
  {
    title: "Security Event Pipeline",
    desc: "Structured logging and event pipeline for capturing, analysing, and responding to security threats with real-time notifications.",
    features: ["Event classification", "Severity scoring", "IP reputation checks", "Automated blocking"],
    tags: ["PostgreSQL", "Supabase Realtime", "Zod"],
  },
  {
    title: "Threat Detection API",
    desc: "Multi-layer API security with rate limiting, WAF integration, input validation, and bot detection using Arcjet and custom middleware.",
    features: ["SQL injection detection", "XSS prevention", "Rate limiting", "Bot mitigation"],
    tags: ["Next.js API", "Arcjet", "Zod"],
  },
];

const team = [
  {
    initials: "AA",
    name: "Ashmin Aryal",
    role: "Team Lead / STAR File Author",
    color: "rgba(56, 189, 248, 0.15)",
    contributions: [
      "Documentation and team management",
      "Project architecture and workflow coordination",
      "Created consolidated star.json including metadata, sample content, and agent configurations",
    ],
  },
  {
    initials: "VK",
    name: "Victor Kamanja",
    role: "Frontend Developer / PRD Author",
    color: "rgba(34, 197, 94, 0.15)",
    contributions: [
      "Risk and mitigation strategies documentation",
      "Frontend UI/UX implementation",
      "Defined project requirements and technical specifications",
    ],
  },
  {
    initials: "PW",
    name: "Phuntshok Wangdruk",
    role: "Backend Developer / Agents Developer",
    color: "rgba(168, 85, 247, 0.15)",
    contributions: [
      "MCP server implementation",
      "Backend API and security infrastructure",
      "Developed AI agents including Persona and Security Guardian",
    ],
  },
];

const techStack = [
  "Next.js 16",
  "React Framework",
  "Supabase",
  "PostgreSQL + Auth",
  "Vercel",
  "Edge Deployment",
  "OpenAI",
  "AI Integration",
  "WAF",
  "Web Security",
  "TypeScript",
  "Type Safety",
];

export default function Home() {
  return (
    <div className="cyber-bg">
      <SiteHeader />

      <main className="container" style={{ paddingTop: 40, paddingBottom: 48 }}>
        {/* Hero */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "stretch", marginBottom: 56 }}>
          <div style={{ flex: "1 1 320px" }}>
            <p className="section-label">System Active</p>
            <h1 style={{ fontSize: 38, fontWeight: 700, marginTop: 8, marginBottom: 6, lineHeight: 1.2 }}>
              Digital Twin III
              <br />
              <span style={{ color: "var(--accent)" }}>Cyber-Hardened</span>
              <br />
              Portfolio
            </h1>
            <p className="section-desc" style={{ marginBottom: 20 }}>
              A cyber-secured, monitored, and attack-resilient digital asset demonstrating
              real-world threat defence capabilities with integrated AI agents.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/#projects" className="btn-primary">View Projects</a>
              <a href="/chat" className="btn-outline">Talk to Digital Twin</a>
            </div>
          </div>

          {/* Status card */}
          <div
            style={{
              flexBasis: 300,
              flexGrow: 0,
              flexShrink: 0,
              borderRadius: 20,
              padding: 22,
              background: "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.15), transparent 55%), var(--bg-card)",
              border: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div>
              <p style={{ fontSize: 11, letterSpacing: 1, color: "var(--fg-muted)", margin: 0 }}>DIGITALMIND TEAM</p>
              <span className="badge badge-online" style={{ marginTop: 6, display: "inline-block" }}>Online</span>
            </div>
            <div style={{ borderRadius: 14, background: "rgba(5,10,24,0.85)", border: "1px solid var(--border)", padding: "14px 16px", fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--fg-muted)" }}>STATUS</span>
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>OPERATIONAL</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--fg-muted)" }}>ACCESS LEVEL</span>
                <span style={{ color: "var(--fg)", fontWeight: 700 }}>PUBLIC</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
                <span style={{ color: "var(--fg-muted)" }}>THREAT DETECTION</span>
                <span style={{ color: "var(--primary)", fontWeight: 600 }}>ACTIVE</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 11 }}>
              <span className="tech-badge">WAF Protection ENABLED</span>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="page-section" style={{ marginBottom: 56 }}>
          <p className="section-label">About the Project</p>
          <h2 className="section-title">Transforming portfolios into cyber-resilient assets</h2>
          <p className="section-desc" style={{ marginBottom: 12 }}>
            The Digital Twin III project demonstrates a professional portfolio that is both visually
            appealing and cyber-resilient. It detects and blocks real cyber threats in real-time
            while analysing attacker behaviour and generating actionable insights.
          </p>
          <p className="section-desc">
            Built with enterprise-level security controls aligned with OWASP Top 10 best practices,
            this portfolio serves as a showcase of cybersecurity expertise and modern web development.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {techStack.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="page-section" style={{ marginBottom: 56 }}>
          <p className="section-label">Key Features</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {features.map((f) => (
              <div key={f.num} className="feature-card">
                <div className="feature-number">{f.num}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="page-section" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Building secure systems</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>
            Each component of the Digital Twin III project demonstrates enterprise-level security
            practices and modern development techniques.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {projects.map((p) => (
              <div key={p.title} className="project-card">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                  Key Features
                </p>
                <div className="project-features">
                  {p.features.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Agents */}
        <section className="page-section" style={{ marginBottom: 56 }}>
          <p className="section-label">AI Agents Architecture</p>
          <h2 className="section-title">Intelligent agents working in harmony</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>
            Multiple AI agents collaborate to provide an interactive, secure, and self-defending
            portfolio experience using the Model Context Protocol (MCP).
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {agents.map((a) => (
              <div key={a.name} className="agent-card">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className={`agent-status ${a.status === "active" ? "agent-status-active" : "agent-status-standby"}`}>
                    {a.status}
                  </span>
                </div>
                <h3>{a.name}</h3>
                <p className="agent-desc">{a.desc}</p>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: 1 }}>
                  Capabilities
                </p>
                <ul>
                  {a.caps.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <div className="agent-meta">
                  Model: {a.model} &middot; Temp: {a.temp}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sandbox */}
        <section id="sandbox" className="page-section" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
          <p className="section-label">Security Operations</p>
          <h2 className="section-title">Hacking simulation sandbox</h2>
          <p className="section-desc" style={{ marginBottom: 20 }}>
            These live sandboxes are wired to real detection, logging, and rate limiting. You can
            safely try common attacks and then open the dashboard to observe how the system
            classified and handled your traffic.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {[
              { href: "/sandbox/sql", label: "SQL Injection", desc: "SQL injection payloads, detection, and safe query patterns." },
              { href: "/sandbox/xss", label: "XSS Testing", desc: "Reflected XSS attempts, output encoding, and malicious payload detection." },
              { href: "/sandbox/rate-limit", label: "Rate Limiting", desc: "Bot-style traffic, scanners, and WAF-style rate limiting." },
              { href: "/sandbox/auth", label: "Auth Bypass", desc: "Authentication failures, broken access control, and privilege abuse scenarios." },
            ].map((s) => (
              <a key={s.href} href={s.href} className="link-card" style={{ display: "block", textDecoration: "none" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)", marginBottom: 6 }}>{s.label}</h3>
                <p style={{ color: "var(--fg-muted)", fontSize: 13, margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <a href="/dashboard" className="btn-outline">View Full Dashboard</a>
          </div>
        </section>

        {/* Team */}
        <section className="page-section" style={{ marginBottom: 56 }}>
          <p className="section-label">The Team</p>
          <h2 className="section-title">Meet DigitalMind Team</h2>
          <p className="section-desc" style={{ marginBottom: 24 }}>
            A collaborative team of developers passionate about cybersecurity, AI-assisted
            development, and building secure web applications.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {team.map((m) => (
              <div key={m.initials} className="team-card">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div className="team-avatar" style={{ background: m.color }}>{m.initials}</div>
                  <div>
                    <h3>{m.name}</h3>
                    <p className="role">{m.role}</p>
                  </div>
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                  Contributions
                </p>
                <ul>
                  {m.contributions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="page-section" style={{ marginBottom: 48, scrollMarginTop: 80 }}>
          <p className="section-label">Technology Stack</p>
          <h2 className="section-title">Security-focused stack behind the lab</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {[
              { name: "Next.js (App Router)", desc: "Modern, testable, security-first frontend" },
              { name: "Supabase", desc: "Database, authentication, and structured security event logging" },
              { name: "Arcjet", desc: "WAF protections, basic bot controls, and rate limiting" },
              { name: "Vercel", desc: "Hardened deployments, previews, and production-like environments" },
              { name: "TypeScript", desc: "Strict type safety across the full stack" },
              { name: "Security Utils", desc: "Injection detection, sanitisation, and logging" },
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  padding: "16px 18px",
                  borderRadius: 12,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "var(--fg)" }}>{item.name}</p>
                <p style={{ margin: 0, color: "var(--fg-muted)", fontSize: 12 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
