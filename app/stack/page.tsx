export default function StackPage() {
  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[960px] mx-auto px-6 py-10">
        <a href="/" className="text-accent text-sm hover:underline mb-4 inline-block">
          {'← Back to site'}
        </a>
        <h1 className="text-2xl font-bold text-foreground mb-4">Security-focused tech stack</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          The Digital Twin lab is built with a modern, production-ready stack that emphasises
          observability and defence-in-depth.
        </p>
        <ul className="text-sm text-foreground space-y-2 list-disc pl-5">
          <li>
            Next.js (App Router) + TypeScript for a modern, testable, security-first frontend and
            API surface.
          </li>
          <li>Supabase for database, authentication, and structured security event logging.</li>
          <li>Arcjet for WAF protections, basic bot controls, and rate limiting at the edge.</li>
          <li>Security utility functions for injection detection, sanitisation, and logging.</li>
          <li>Vercel for hardened deployments, previews, and production-like environments.</li>
        </ul>
        <p className="text-muted-foreground text-sm leading-relaxed mt-4">
          This combination lets you talk concretely about how you build, deploy, and operate a
          secure web system in the cloud.
        </p>
      </main>
    </div>
  );
}
