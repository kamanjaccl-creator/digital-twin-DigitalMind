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
}

function groupBy<T, K extends string | number | symbol>(items: T[], getKey: (item: T) => K) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    // @ts-ignore
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<K, number>);
}

export default async function DashboardPage() {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return (
      <main style={{ maxWidth: 960, margin: "40px auto", padding: 24 }}>
        <h1>Security Dashboard</h1>
        <p style={{ color: "#555" }}>
          Supabase is not configured. Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and
          {" "}
          <code>SUPABASE_SERVICE_KEY</code> and run the migration in
          {" "}
          <code>migrations/001_security_events.sql</code> to enable telemetry.
        </p>
      </main>
    );
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("security_events")
    .select(
      "id, event_type, severity, threat_type, action, endpoint, source_ip, user_agent, timestamp"
    )
    .gte("timestamp", since)
    .order("timestamp", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error loading security_events", error);
  }

  const events: SecurityEventRow[] = (data as any) || [];

  const threatsByType = groupBy(events, (e) => e.threat_type || "UNKNOWN");
  const actions = groupBy(events, (e) => e.action);

  const blocked = actions["BLOCK"] || 0;
  const allowed = (actions["ALLOW"] || 0) + (actions["CHALLENGE"] || 0);

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", padding: 24 }}>
      <h1>Security Dashboard</h1>
      <p style={{ color: "#555", marginBottom: 16 }}>
        Last 24 hours of security events logged from the Digital Twin sandbox and defences.
      </p>

      <section style={{ marginBottom: 24 }}>
        <h2>Summary</h2>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 600 }}>{events.length}</div>
            <div style={{ color: "#555" }}>Total events (last 24h)</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 600 }}>{blocked}</div>
            <div style={{ color: "#555" }}>Blocked / high-risk</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 600 }}>{allowed}</div>
            <div style={{ color: "#555" }}>Allowed / challenged</div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2>Threats by type</h2>
        {Object.keys(threatsByType).length === 0 ? (
          <p style={{ color: "#555" }}>No events recorded in the last 24 hours.</p>
        ) : (
          <ul>
            {Object.entries(threatsByType).map(([type, count]) => (
              <li key={type}>
                <strong>{type}</strong>: {count as number}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Recent activity</h2>
        {events.length === 0 ? (
          <p style={{ color: "#555" }}>No recent events.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 4 }}>
                  Time
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 4 }}>
                  Type
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 4 }}>
                  Severity
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 4 }}>
                  Action
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 4 }}>
                  Endpoint
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 4 }}>
                  IP
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>
                    {new Date(e.timestamp).toLocaleString()}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>
                    {e.threat_type || e.event_type}
                  </td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>{e.severity}</td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>{e.action}</td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>{e.endpoint}</td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 4 }}>{e.source_ip || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Evidence & reports</h2>
        <p style={{ color: "#555" }}>
          Detailed logs, CVSS scoring, risk reports, and remediation notes are maintained in
          {" "}
          <a
            href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/docs/security-evidence.md"
            target="_blank"
            rel="noreferrer"
          >
            docs/security-evidence.md
          </a>
          . Use that file to upload screenshots, exported scan reports, and structured summaries
          for each security layer.
        </p>
      </section>
    </main>
  );
}
