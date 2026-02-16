import SiteHeader from "../../components/site-header";
import SiteFooter from "../../components/site-footer";
import { getSupabaseServer } from "../../lib/supabase-server";

interface SecurityEventRow {
  id: string;
  event_type: string;
  severity: string;
  threat_type: string | null;
  action: string;
  endpoint: string;
  source_ip: string | null;
  user_agent: string | null;
  timestamp: string;
  metadata?: Record<string, unknown> | null;
}

function groupBy<T, K extends string | number | symbol>(items: T[], getKey: (item: T) => K) {
  return items.reduce(
    (acc, item) => {
      const key = getKey(item);
      (acc as Record<K, number>)[key] = ((acc as Record<K, number>)[key] || 0) + 1;
      return acc;
    },
    {} as Record<K, number>,
  );
}

export default async function DashboardPage() {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return (
      <div className="cyber-bg">
        <SiteHeader />
        <main className="container-md" style={{ paddingTop: 40, paddingBottom: 48 }}>
          <p className="section-label">Security Dashboard</p>
          <h1 className="section-title">Security Dashboard</h1>
          <p className="section-desc">
            Supabase is not configured. Set{" "}
            <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 12 }}>NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            and{" "}
            <code style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 12 }}>SUPABASE_SERVICE_KEY</code>{" "}
            to enable telemetry.
          </p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("security_events")
    .select("id, event_type, severity, threat_type, action, endpoint, source_ip, user_agent, timestamp, metadata")
    .gte("timestamp", since)
    .order("timestamp", { ascending: false })
    .limit(100);

  if (error) console.error("Error loading security_events", error);

  const events: SecurityEventRow[] = (data as SecurityEventRow[]) || [];
  const threatsByType = groupBy(events, (e) => e.threat_type || "UNKNOWN");
  const actions = groupBy(events, (e) => e.action);
  const blocked = actions["BLOCK"] || 0;
  const allowed = (actions["ALLOW"] || 0) + (actions["CHALLENGE"] || 0);
  const rateLimited = events.filter((e) => e.event_type === "RATE_LIMITED").length;
  const botDetections = events.filter((e) => e.threat_type === "BOT_BEHAVIOR").length;
  const shieldTriggers = events.filter((e) => e.event_type === "THREAT_DETECTED").length;
  const uniqueIps = new Set(events.map((e) => e.source_ip).filter(Boolean)).size;
  const arcjetEvents = events.filter((e) => e.metadata && (e.metadata as Record<string, unknown>).provider === "arcjet");
  const arcjetBlocks = arcjetEvents.filter((e) => e.action === "BLOCK").length;
  const arcjetRateLimits = arcjetEvents.filter((e) => e.event_type === "RATE_LIMITED").length;
  const arcjetBots = arcjetEvents.filter(
    (e) => e.threat_type === "BOT_BEHAVIOR" || (e.metadata && typeof (e.metadata as Record<string, unknown>).kind === "string" && ((e.metadata as Record<string, unknown>).kind as string).includes("bot")),
  ).length;
  const activeAlerts = events.filter((e) => e.severity === "HIGH" || e.severity === "CRITICAL");

  return (
    <div className="cyber-bg">
      <SiteHeader />
      <main className="container" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <header style={{ marginBottom: 24 }}>
          <p className="section-label">Security Operations</p>
          <h1 className="section-title">Security Dashboard</h1>
          <p className="section-desc">Real-time security telemetry from your live cyber lab (last 24h).</p>
        </header>

        {/* Stat cards row */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 12 }}>
            <MetricCard label="Total requests" value={events.length} desc="Events logged (24h)" />
            <MetricCard label="Allowed" value={allowed} desc="Safe or challenged" color="var(--primary)" />
            <MetricCard label="Blocked" value={blocked} desc="High-risk stopped" color="var(--destructive)" />
            <MetricCard label="Rate limits" value={rateLimited} desc="Excessive traffic" color="#facc15" />
            <MetricCard label="Bot detections" value={botDetections} desc="Automated behaviour" color="var(--accent)" />
            <MetricCard label="Shield triggers" value={shieldTriggers} desc="Threat detections" color="#a78bfa" />
            <MetricCard label="Unique IPs" value={uniqueIps} desc="Distinct sources" color="#fb923c" />
          </div>
        </section>

        {/* Arcjet */}
        <section className="page-section">
          <div className="page-section-header">
            <span className="page-section-dot" />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--fg)", margin: 0 }}>Arcjet edge protection</h2>
          </div>
          {arcjetEvents.length === 0 ? (
            <p className="section-desc">No Arcjet decisions in the last 24 hours. Generate traffic to see edge firewall activity.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 12 }}>
              <MetricCard label="Arcjet blocks" value={arcjetBlocks} desc="Stopped at edge" color="#fb923c" />
              <MetricCard label="Rate limits" value={arcjetRateLimits} desc="Throttled traffic" color="#facc15" />
              <MetricCard label="Bot denials" value={arcjetBots} desc="Bots blocked" color="var(--accent)" />
            </div>
          )}
        </section>

        {/* Threat mix */}
        <section className="page-section">
          <div className="page-section-header">
            <span className="page-section-dot" />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--fg)", margin: 0 }}>Threat mix (last 24 hours)</h2>
          </div>
          {events.length === 0 ? (
            <p className="section-desc">No telemetry yet. Use sandbox endpoints to generate attack traffic.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(threatsByType).map(([type, count]) => (
                <span key={type} className="tech-badge">
                  {type} <span style={{ marginLeft: 6, color: "var(--accent)" }}>x{count}</span>
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Alerts */}
        <section className="page-section">
          <div className="page-section-header">
            <span className="page-section-dot" />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--fg)", margin: 0 }}>Active alerts</h2>
          </div>
          <div className="card">
            {activeAlerts.length === 0 ? (
              <p className="section-desc" style={{ maxWidth: "none" }}>No active security alerts. Application stable under current traffic.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13 }}>
                {activeAlerts.map((e) => (
                  <li key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ color: "var(--fg)" }}><strong>{e.severity}</strong> . {e.threat_type || e.event_type}</div>
                      <div style={{ color: "var(--fg-muted)" }}>{e.endpoint} . {new Date(e.timestamp).toLocaleString()}</div>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--fg-muted)" }}>{e.source_ip || "-"}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Recent activity */}
        <section className="page-section">
          <div className="page-section-header">
            <span className="page-section-dot" />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--fg)", margin: 0 }}>Recent activity</h2>
          </div>
          {events.length === 0 ? (
            <p className="section-desc">No recent events.</p>
          ) : (
            <div style={{ borderRadius: "var(--radius)", border: "1px solid var(--border)", overflow: "hidden", background: "var(--bg-card)" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time</th><th>Type</th><th>Severity</th><th>Action</th><th>Endpoint</th><th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e.id}>
                      <td>{new Date(e.timestamp).toLocaleString()}</td>
                      <td>{e.threat_type || e.event_type}</td>
                      <td>{e.severity}</td>
                      <td>{e.action}</td>
                      <td>{e.endpoint}</td>
                      <td style={{ color: "var(--fg-muted)" }}>{e.source_ip || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Evidence */}
        <section className="page-section">
          <div className="page-section-header">
            <span className="page-section-dot" />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--fg)", margin: 0 }}>{"Evidence & reports"}</h2>
          </div>
          <p className="section-desc">
            Detailed logs, risk assessments, and remediation notes are maintained in{" "}
            <a href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/docs/security-evidence.md" target="_blank" rel="noreferrer">
              docs/security-evidence.md
            </a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function MetricCard({ label, value, desc, color = "var(--accent)" }: { label: string; value: number; desc: string; color?: string }) {
  return (
    <div className="metric-card">
      <div className="label">{label}</div>
      <div className="value" style={{ color }}>{value}</div>
      <div className="desc">{desc}</div>
    </div>
  );
}
