import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";

export default function ThreatsPage() {
  const threats = [
    {
      title: "Injection attacks",
      desc: "SQL injection, prompt injection, and malicious payloads targeting data stores, interpreters, or AI models.",
    },
    {
      title: "Auth & access control",
      desc: "Authentication failures, broken access control, and privilege abuse scenarios across sandbox endpoints and admin surfaces.",
    },
    {
      title: "Bots & automation",
      desc: "Automated scanners, brute force tools, scripted requests, and spoofed user agents detected and rate-limited at the edge.",
    },
  ];

  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container-md" style={{ paddingTop: 40, paddingBottom: 48 }}>
        <p className="section-label">Threat Intelligence</p>
        <h1 className="section-title">Threats you train against</h1>
        <p className="section-desc" style={{ marginBottom: 24 }}>
          This lab is designed around the most common and high-impact web application threats.
          Each category is instrumented so you can attack it safely and see how the system responds.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {threats.map((t) => (
            <div key={t.title} className="feature-card">
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
        <p className="section-desc" style={{ marginTop: 24 }}>
          Combined with the security dashboard, this page helps you explain exactly what kinds of
          behaviour your system is meant to withstand.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
