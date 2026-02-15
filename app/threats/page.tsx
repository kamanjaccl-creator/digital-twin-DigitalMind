export default function ThreatsPage() {
  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[960px] mx-auto px-6 py-10">
        <a href="/" className="text-accent text-sm hover:underline mb-4 inline-block">
          {'← Back to site'}
        </a>
        <h1 className="text-2xl font-bold text-foreground mb-4">Threats you train against</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          This lab is designed around the most common and high-impact web application threats.
          Each category is instrumented so you can attack it safely and see how the system
          responds.
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 text-sm">
          <div className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <h2 className="text-base font-semibold text-foreground mb-2">Injection attacks</h2>
            <p className="text-muted-foreground leading-relaxed">
              SQL injection, prompt injection, and malicious payloads targeting data stores,
              interpreters, or AI models.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <h2 className="text-base font-semibold text-foreground mb-2">{'Auth & access control'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              Authentication failures, broken access control, and privilege abuse scenarios across
              sandbox endpoints and admin surfaces.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
            <h2 className="text-base font-semibold text-foreground mb-2">{'Bots & automation'}</h2>
            <p className="text-muted-foreground leading-relaxed">
              Automated scanners, brute force tools, scripted requests, and spoofed user agents
              detected and rate-limited at the edge.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mt-6">
          Combined with the security dashboard, this page helps you explain exactly what kinds of
          behaviour your system is meant to withstand.
        </p>
      </main>
    </div>
  );
}
