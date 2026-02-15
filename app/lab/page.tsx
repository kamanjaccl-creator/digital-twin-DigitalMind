export default function LiveCyberLabPage() {
  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[960px] mx-auto px-6 py-10">
        <a href="/" className="text-accent text-sm hover:underline mb-4 inline-block">
          {'← Back to site'}
        </a>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          {'Digital Twin III — Cyber-Hardened Portfolio'}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          <strong className="text-foreground">Hack us if you can.</strong> This portfolio is no longer just a showcase of
          work — it is a monitored, security-aware web system designed to run under real-world
          conditions.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Modern professional web applications are active targets. Systems that manage data,
          users, and AI-driven features must be built to defend, monitor, and continuously
          improve their resilience. This project transforms our portfolio into a cyber-secured,
          intelligence-driven digital platform that demonstrates practical security
          implementation rather than theoretical claims.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Developed as a collaborative initiative within an industry-aligned program delivered by
          <strong className="text-foreground"> ausbiz Consulting</strong>, this project focuses on building a production-ready
          web application capable of detecting threats, protecting data, and demonstrating
          defensive system design.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">From Portfolio to Secure Digital System</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            Our team designed and deployed a portfolio platform that integrates security
            controls, monitoring mechanisms, and layered defensive architecture to address common
            web application vulnerabilities.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            Security considerations include protection against:
          </p>
          <ul className="text-muted-foreground text-sm pl-5 list-disc space-y-1">
            <li>SQL injection attacks</li>
            <li>Prompt injection and other malicious inputs</li>
            <li>Authentication and authorization weaknesses</li>
            <li>Broken access control</li>
            <li>{'Malicious payload execution (e.g., XSS)'}</li>
            <li>Automated bot activity and suspicious traffic behaviour</li>
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            Rather than treating security as a static feature, the system operates as a live
            cyber environment: traffic is exercised using common testing tools, logged into
            Supabase, surfaced through the dashboard, and used to drive regular hardening
            changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Evidence-Based Security Approach</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            The project emphasises measurable and observable security practices. The platform is
            structured to support:
          </p>
          <ul className="text-muted-foreground text-sm pl-5 list-disc space-y-1">
            <li>System activity logging and monitoring</li>
            <li>Threat detection and attacker behaviour analysis</li>
            <li>Risk awareness and defensive configuration tuning</li>
            <li>Documentation of system refinement and improvements over time</li>
            <li>Continuous system hardening through iterative development and retesting</li>
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            This transforms the portfolio into a defensible case study of secure deployment and
            operational resilience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">What This Project Demonstrates</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            By completing this project, our team delivers a system that:
          </p>
          <ul className="text-muted-foreground text-sm pl-5 list-disc space-y-1">
            <li>Hosts professional identity and project work in a security-focused environment</li>
            <li>Implements defensive controls within a real cloud deployment</li>
            <li>Demonstrates awareness of modern cybersecurity risks and attack patterns</li>
            <li>Applies security as an ongoing lifecycle practice, not a one-off task</li>
            <li>Reflects real-world development, observability, and deployment standards</li>
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            This cyber-hardened Digital Twin represents a production-ready application built with
            collaboration, secure architecture, and continuous improvement at its core.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Security as a Lifecycle</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            The system is designed around a simple but disciplined security lifecycle that can be
            demonstrated live:
          </p>
          <ol className="text-muted-foreground text-sm pl-5 list-decimal space-y-2">
            <li>
              <strong className="text-foreground">Prevent</strong> — Arcjet acts as a WAF and rate limiter at the edge, while
              input validation, output encoding, and role-based access control harden the
              application itself.
            </li>
            <li>
              <strong className="text-foreground">Detect</strong> — Custom detectors flag SQL injection, XSS, prompt injection,
              auth failures, and bot behaviour. Every event is written to Supabase as structured
              telemetry.
            </li>
            <li>
              <strong className="text-foreground">Respond</strong> — The security dashboard highlights active alerts and recent
              incidents so an operator can quickly see what was blocked, from where, and why.
            </li>
            <li>
              <strong className="text-foreground">Improve</strong> — Attack patterns from logs and Arcjet are used to tighten
              rules, tune rate limits, add new detectors, and update this case study with
              evidence of changes over time.
            </li>
          </ol>
          <p className="text-muted-foreground text-sm leading-relaxed mt-2">
            This shows employers not just that security controls exist, but that they are
            observable, testable, and part of a continuous improvement loop.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Project Vision</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
            This project is more than a portfolio — it is a deployable, auditable demonstration of
            secure web development practice. It reflects our ability to design systems that are
            not only functional and scalable, but also resilient and professionally defensible.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Digital Twin III represents a system designed not just to function, but to
            withstand.
          </p>
        </section>
      </main>
    </div>
  );
}
