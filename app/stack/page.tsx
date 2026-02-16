import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function StackPage() {
  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container-md" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="section-label">Technology Stack</p>
        <h1 className="section-title">Security-focused tech stack</h1>
        <p className="section-desc" style={{ marginBottom: 24 }}>
          The Digital Twin lab is built with a modern, production-ready stack that emphasises
          observability and defence-in-depth.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "Next.js (App Router) + TypeScript", desc: "Modern, testable, security-first frontend and API surface." },
            { name: "Supabase", desc: "Database, authentication, and structured security event logging." },
            { name: "Arcjet", desc: "WAF protections, basic bot controls, and rate limiting at the edge." },
            { name: "Security utility functions", desc: "Injection detection, sanitisation, and logging." },
            { name: "Vercel", desc: "Hardened deployments, previews, and production-like environments." },
          ].map((s) => (
            <div key={s.name} className="feature-card" style={{ padding: 18 }}>
              <h3 style={{ marginBottom: 4 }}>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="section-desc" style={{ marginTop: 24 }}>
          This combination lets you talk concretely about how you build, deploy, and operate a
          secure web system in the cloud.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
