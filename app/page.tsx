"use client";

export default function Home() {
  return (
    <div className="cyber-bg min-h-screen text-foreground font-sans">
      <header className="border-b border-border/30 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-[1040px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="font-semibold text-foreground">Digital Twin III</span>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="/#about" className="text-foreground/80 hover:text-primary transition-colors no-underline">
              About
            </a>
            <a href="/#sandbox" className="text-foreground/80 hover:text-primary transition-colors no-underline">
              Sandbox
            </a>
            <a href="/#threats" className="text-foreground/80 hover:text-primary transition-colors no-underline">
              Threats
            </a>
            <a href="/#stack" className="text-foreground/80 hover:text-primary transition-colors no-underline">
              Stack
            </a>
            <a href="/lab" className="text-foreground/80 hover:text-primary transition-colors no-underline">
              Lab Case Study
            </a>
            <a href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors no-underline">
              Dashboard
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-[1040px] mx-auto px-6 py-8 pb-10">
        {/* Hero */}
        <section className="flex flex-wrap gap-8 items-stretch mb-10">
          {/* Left: personal summary & CTAs */}
          <div className="flex-1 min-w-[260px]">
            <p className="text-xs tracking-[2px] text-accent uppercase">
              Cyber-Hardened Portfolio
            </p>
            <h1 className="text-[32px] font-bold mt-2 mb-1 text-foreground">DigitalMind</h1>
            <p className="text-muted-foreground text-sm max-w-[560px] mb-2 leading-relaxed">
              A secure, cloud-deployed AI portfolio developed through teamwork and real-world
              testing. This Digital Twin is more than a website — it is a live hacking lab where
              you can safely attack defined surfaces and watch the detections appear in real
              time.
            </p>
            <p className="text-muted-foreground text-sm max-w-[560px] mb-2 leading-relaxed">
              Built within an industry-aligned program, it showcases cloud deployment,
              cybersecurity engineering, and collaborative software development using
              modern AI tools.
            </p>
            <p className="text-foreground text-[13px] font-medium">
              Secure. Monitored. Production-ready. Built to be tested, attacked, and improved.
            </p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <a
                href="/#sandbox"
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium no-underline hover:brightness-110 transition-all"
              >
                Explore attack sandbox
              </a>
              <a
                href="/dashboard"
                className="px-4 py-2 rounded-full border border-border text-foreground text-sm no-underline hover:border-primary/50 hover:text-primary transition-all"
              >
                View security dashboard
              </a>
              <a
                href="/lab"
                className="px-4 py-2 rounded-full border border-border text-foreground text-sm no-underline hover:border-primary/50 hover:text-primary transition-all"
              >
                Read case study
              </a>
            </div>
          </div>

          {/* Right: security overview card */}
          <div className="basis-[280px] grow-0 shrink-0 rounded-[20px] p-4 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),hsl(var(--background))] border border-border/40 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[11px] text-accent m-0">Live Lab</p>
                <p className="text-sm font-semibold m-0 text-foreground">Attack surface summary</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-primary/15 text-primary">
                Online
              </span>
            </div>
            <div className="rounded-[14px] bg-card/90 p-3 text-xs text-foreground">
              <ul className="m-0 pl-4">
                <li>Target SQL injection, XSS, and auth flows in safe sandboxes.</li>
                <li>Every attempt is logged into the Supabase-backed security dashboard.</li>
                <li>Use your own testing tools and payloads — this lab is built to be attacked.</li>
              </ul>
            </div>
            <a
              href="/dashboard"
              className="mt-auto text-xs px-3 py-2 rounded-full border border-border no-underline text-foreground flex justify-between items-center hover:border-primary/50 hover:text-primary transition-all"
            >
              <span>Open security dashboard</span>
              <span>{'↗'}</span>
            </a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-8 scroll-mt-24">
          <h2 className="text-xl font-semibold mb-2 text-foreground">What this Digital Twin represents</h2>
          <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
            Every production web app is a target. This Digital Twin turns that risk into a
            teaching tool: a controlled cyber range where you can deliberately attack, observe
            detections and blocks, practise incident response, and document how you harden the
            system release by release.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            For hiring managers, this site is both a portfolio and a live security case study:
            it hosts my professional identity and projects, exposes safe attack surfaces, and
            shows how I manage security as an ongoing lifecycle instead of a one-time checkbox.
          </p>
        </section>

        {/* Threats & Defenses */}
        <section id="threats" className="mb-8 scroll-mt-24">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Threats you train against</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 text-sm">
            <div className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
              <h3 className="text-[15px] font-semibold mb-1.5 text-foreground">Injection attacks</h3>
              <p className="text-muted-foreground">SQL injection, prompt injection, and malicious payloads.</p>
            </div>
            <div className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
              <h3 className="text-[15px] font-semibold mb-1.5 text-foreground">{'Auth & access control'}</h3>
              <p className="text-muted-foreground">Authentication failures, broken access control, privilege abuse.</p>
            </div>
            <div className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
              <h3 className="text-[15px] font-semibold mb-1.5 text-foreground">{'Bots & automation'}</h3>
              <p className="text-muted-foreground">Automated scanners, brute-force tools, and scripted attacks.</p>
            </div>
          </div>
        </section>

        {/* Sandbox */}
        <section id="sandbox" className="mb-8 scroll-mt-24">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Hacking simulation sandbox</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            These live sandboxes are wired to real detection, logging, and rate limiting. You can
            safely try common attacks and then open the dashboard to observe how the system
            classified and handled your traffic.
          </p>
          <ul className="text-sm mt-3 space-y-2">
            <li>
              <a href="/sandbox/sql" className="text-accent hover:underline">/sandbox/sql</a>
              {' — SQL injection payloads, detection, and safe query patterns.'}
            </li>
            <li>
              <a href="/sandbox/xss" className="text-accent hover:underline">/sandbox/xss</a>
              {' — reflected XSS attempts, output encoding, and malicious payload detection.'}
            </li>
            <li>
              <a href="/sandbox/rate-limit" className="text-accent hover:underline">/sandbox/rate-limit</a>
              {' — automated/bot-style traffic, scanners, and basic WAF-style rate limiting.'}
            </li>
            <li>
              <a href="/sandbox/auth" className="text-accent hover:underline">/sandbox/auth</a>
              {' — authentication failures, broken access control, and privilege-abuse scenarios.'}
            </li>
          </ul>
        </section>

        {/* Stack */}
        <section id="stack" className="mb-8 scroll-mt-24">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Security-focused stack behind the lab</h2>
          <ul className="text-sm text-foreground space-y-1">
            <li>Next.js (App Router) + TypeScript for a modern, testable, security-first frontend.</li>
            <li>Supabase for database, authentication, and structured security event logging.</li>
            <li>Arcjet for WAF protections, basic bot controls, and rate limiting.</li>
            <li>Security utility functions for injection detection, sanitisation, and logging.</li>
            <li>Vercel for hardened deployments, previews, and production-like environments.</li>
          </ul>
        </section>

        {/* Team mission */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-foreground">{'Team mission & collaboration'}</h2>
          <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
            Our mission is to design and deploy intelligent digital systems that are secure,
            resilient, and production-ready. We believe modern web applications must be built
            with security as a continuous lifecycle, supported by collaborative development,
            real-world testing, and measurable improvement.
          </p>
          <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
            Through structured teamwork and cloud-based deployment, we transform concepts into
            defensible, operational systems that reflect professional engineering standards.
            This lab was built using Next.js/React, the OpenAI API, Supabase, and Vercel, with
            GitHub and ClickUp underpinning version control and project coordination.
          </p>
        </section>

        {/* Call to action */}
        <section className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-foreground">Use this live lab as your case study</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Share this site with recruiters, hiring managers, and mentors. It is a deployable,
            auditable cyber lab that demonstrates how you design, test, and improve defences —
            not just theory on a CV, but a running system that can be safely attacked, defended,
            and analysed.
          </p>
        </section>
      </main>
    </div>
  );
}
