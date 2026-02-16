"use client";

import SiteHeader from "../components/site-header";
import SiteFooter from "../components/site-footer";

export default function Home() {
  return (
    <div className="cyber-bg">
      <SiteHeader />

      <main className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        {/* Hero */}
        <section
          id="hero"
          style={{
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {/* Left: personal summary & CTAs */}
          <div style={{ flex: "1 1 420px" }}>
            <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--accent)" }}>
              Cyber-Hardened Portfolio
            </p>
            <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.3, marginTop: 6 }}>Ashmin Aryal</h1>
            <p style={{ fontSize: 14, color: "var(--fg-muted)", marginTop: 4 }}>
              Cybersecurity-focused Software Engineer
            </p>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginTop: 16 }}>
              A secure, cloud-deployed AI portfolio developed through teamwork and real-world
              testing. This Digital Twin is more than a website&mdash;it is a live cyber lab designed
              to detect threats, protect data, and demonstrate observable security practices.
            </p>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
              Built within an industry-aligned program, it showcases cloud deployment,
              cybersecurity engineering, and collaborative software development using
              modern AI tools.
            </p>
            <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
              Secure. Monitored. Production-ready. Real deployment. Real security. Real
              collaboration.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
              <a href="/sandbox" className="btn-primary">Explore attack sandbox</a>
              <a href="/dashboard" className="btn-outline">View security dashboard</a>
              <a href="/lab" className="btn-outline">Read case study</a>
            </div>
          </div>

          {/* Right: security overview card */}
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: 1, color: "var(--fg-muted)", margin: 0 }}>DIGITALMIND TEAM</p>
              </div>
              <span className="badge badge-online">Online</span>
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
        <section id="about" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>What this Digital Twin represents</h2>
          <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7 }}>
            Every production web app is a target. This Digital Twin turns that risk into a
            teaching tool: a controlled cyber range where you can deliberately attack, observe
            detections and blocks, practise incident response, and document how you harden the
            system release by release.
          </p>
        </section>

        {/* Threats & Defenses */}
        <section id="threats" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Threats you train against</h2>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[
              { title: "Injection attacks", desc: "SQL injection, prompt injection, and malicious payloads." },
              { title: "Auth & access control", desc: "Authentication failures, broken access control, privilege abuse." },
              { title: "Bots & automation", desc: "Automated scanners, brute-force tools, and scripted attacks." },
            ].map((t) => (
              <div key={t.title} className="card" style={{ flex: "1 1 260px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: "var(--fg-muted)" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sandbox */}
        <section id="sandbox" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Hacking simulation sandbox</h2>
          <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
            These live sandboxes are wired to real detection, logging, and rate limiting. You can
            safely try common attacks and immediately see how the application reacts.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { href: "/sandbox/sql", label: "/sandbox/sql", desc: "SQL injection payloads, detection, and safe query patterns." },
              { href: "/sandbox/xss", label: "/sandbox/xss", desc: "reflected XSS attempts, output encoding, and malicious payload detection." },
              { href: "/sandbox/rate-limit", label: "/sandbox/rate-limit", desc: "automated/bot-style traffic, scanners, and basic WAF-style rate limiting." },
              { href: "/sandbox/auth", label: "/sandbox/auth", desc: "authentication failures, broken access control, and privilege-abuse scenarios." },
            ].map((s) => (
              <a key={s.href} href={s.href} className="link-card" style={{ display: "block", textDecoration: "none" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)" }}>{s.label}</span>
                {" "}
                <span style={{ fontSize: 13, color: "var(--fg-muted)" }}>&mdash; {s.desc}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section id="stack" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Security-focused stack behind the lab</h2>
          <ul style={{ listStyle: "disc", paddingLeft: 20, color: "var(--fg-muted)", fontSize: 14, lineHeight: 2 }}>
            <li>Next.js (App Router) + TypeScript for a modern, testable, security-first frontend.</li>
            <li>Supabase for database, authentication, and structured security event logging.</li>
            <li>Arcjet for WAF protections, basic bot controls, and rate limiting.</li>
            <li>Security utility functions for injection detection, sanitisation, and logging.</li>
            <li>Vercel for hardened deployments, previews, and production-like environments.</li>
          </ul>
        </section>

        {/* Team mission */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>{"Team mission & collaboration"}</h2>
          <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7 }}>
            Our mission is to design and deploy intelligent digital systems that are secure,
            resilient, and production-ready. We believe modern web applications must be built
            with security as a continuous lifecycle, supported by collaborative development,
            real-world testing, and measurable improvement.
          </p>
          <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
            Through structured teamwork and cloud-based deployment, we transform concepts into
            defensible, operational systems that reflect professional engineering standards.
            This lab was built using Next.js/React, the OpenAI API, Supabase, and Vercel, with
            GitHub and ClickUp underpinning version control and project coordination.
          </p>
        </section>

        {/* CTA */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Use this live lab as your case study</h2>
          <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7 }}>
            Share this site with recruiters, hiring managers, and mentors. It is a deployable,
            auditable cyber lab that demonstrates how you design, test, and improve defences &mdash;
            not just theory on a CV, but a running system that can be safely attacked, defended,
            and analysed.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
