import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function StackPage() {
  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container-md" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Security-focused tech stack</h1>
        <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
          The Digital Twin lab is built with a modern, production-ready stack that emphasises
          observability and defence-in-depth.
        </p>
        <ul style={{ listStyle: "disc", paddingLeft: 20, color: "var(--fg-muted)", fontSize: 14, lineHeight: 2 }}>
          <li>Next.js (App Router) + TypeScript for a modern, testable, security-first frontend and API surface.</li>
          <li>Supabase for database, authentication, and structured security event logging.</li>
          <li>Arcjet for WAF protections, basic bot controls, and rate limiting at the edge.</li>
          <li>Security utility functions for injection detection, sanitisation, and logging.</li>
          <li>Vercel for hardened deployments, previews, and production-like environments.</li>
        </ul>
        <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginTop: 14 }}>
          This combination lets you talk concretely about how you build, deploy, and operate a
          secure web system in the cloud.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
