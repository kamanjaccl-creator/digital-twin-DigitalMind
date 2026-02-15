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
    {} as Record<K, number>
  );
}

export default async function DashboardPage() {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return (
      <div className="cyber-bg min-h-screen font-sans">
        <main className="max-w-[960px] mx-auto px-6 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-4">Security Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Supabase is not configured. Set <code className="text-accent font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-accent font-mono text-xs">SUPABASE_SERVICE_KEY</code> and run the migration in{" "}
            <code className="text-accent font-mono text-xs">migrations/001_security_events.sql</code> to enable telemetry.
          </p>
        </main>
      </div>
    );
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("security_events")
    .select(
      "id, event_type, severity, threat_type, action, endpoint, source_ip, user_agent, timestamp, metadata"
    )
    .gte("timestamp", since)
    .order("timestamp", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Error loading security_events", error);
  }

  const events: SecurityEventRow[] = (data as SecurityEventRow[]) || [];

  const threatsByType = groupBy(events, (e) => e.threat_type || "UNKNOWN");
  const actions = groupBy(events, (e) => e.action);

  const blocked = actions["BLOCK"] || 0;
  const allowed = (actions["ALLOW"] || 0) + (actions["CHALLENGE"] || 0);
  const rateLimited = events.filter((e) => e.event_type === "RATE_LIMITED").length;
  const botDetections = events.filter((e) => e.threat_type === "BOT_BEHAVIOR").length;
  const shieldTriggers = events.filter((e) => e.event_type === "THREAT_DETECTED").length;
  const uniqueIps = new Set(events.map((e) => e.source_ip).filter(Boolean)).size;

  const arcjetEvents = events.filter(
    (e) => e.metadata && (e.metadata as Record<string, unknown>).provider === "arcjet"
  );
  const arcjetBlocks = arcjetEvents.filter((e) => e.action === "BLOCK").length;
  const arcjetRateLimits = arcjetEvents.filter((e) => e.event_type === "RATE_LIMITED").length;
  const arcjetBots = arcjetEvents.filter(
    (e) =>
      e.threat_type === "BOT_BEHAVIOR" ||
      (e.metadata &&
        typeof (e.metadata as Record<string, unknown>).kind === "string" &&
        ((e.metadata as Record<string, unknown>).kind as string).includes("bot"))
  ).length;

  const activeAlerts = events.filter((e) => e.severity === "HIGH" || e.severity === "CRITICAL");

  return (
    <div className="cyber-bg min-h-screen font-sans">
      <main className="max-w-[1040px] mx-auto px-6 py-8 pb-10">
        <header className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs tracking-[2px] uppercase text-accent">
              Digital Twin III
            </p>
            <h1 className="text-2xl font-bold text-foreground mt-1 mb-1">Security Dashboard</h1>
            <p className="text-[13px] text-muted-foreground">
              Real-time security telemetry from your live cyber lab over the last 24 hours.
            </p>
          </div>
          <a
            href="/"
            className="px-4 py-2 rounded-full border border-border text-sm text-foreground no-underline hover:border-primary/50 hover:text-primary transition-all"
          >
            {'← Back to site'}
          </a>
        </header>

        {/* Overview cards */}
        <section className="mb-6">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
            <MetricCard label="Total requests" value={events.length} description="Events logged (24h)" />
            <MetricCard label="Allowed" value={allowed} description="Safe or challenged" accent="text-primary" />
            <MetricCard label="Blocked" value={blocked} description="High-risk stopped" accent="text-destructive" />
            <MetricCard label="Rate limits" value={rateLimited} description="Excessive traffic" accent="text-yellow-400" />
            <MetricCard label="Bot detections" value={botDetections} description="Automated behaviour" accent="text-accent" />
            <MetricCard label="Shield triggers" value={shieldTriggers} description="Threat detections" accent="text-violet-400" />
            <MetricCard label="Unique IPs" value={uniqueIps} description="Distinct sources" accent="text-orange-400" />
          </div>
        </section>

        {/* Arcjet-specific view */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-2">Arcjet edge protection</h2>
          {arcjetEvents.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">
              No Arcjet decisions have been logged in the last 24 hours yet. Generate traffic
              against the sandbox APIs or run basic scans to see edge firewall activity here.
            </p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
              <MetricCard
                label="Arcjet blocks"
                value={arcjetBlocks}
                description="Requests stopped at the edge"
                accent="text-orange-400"
              />
              <MetricCard
                label="Arcjet rate limits"
                value={arcjetRateLimits}
                description="Throttled abusive traffic"
                accent="text-yellow-400"
              />
              <MetricCard
                label="Arcjet bot denials"
                value={arcjetBots}
                description="Bots and spoofed clients blocked"
                accent="text-accent"
              />
            </div>
          )}
        </section>

        {/* Threat mix */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-2">{'Threat mix (last 24 hours)'}</h2>
          {events.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">
              No telemetry yet. Use the sandbox endpoints and security tools to generate
              real attack traffic, then refresh this page.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Object.entries(threatsByType).map(([type, count]) => (
                <div
                  key={type}
                  className="px-3 py-1.5 rounded-full border border-border bg-card text-xs text-foreground"
                >
                  <span className="opacity-75">{type}</span>
                  <span className="ml-2 text-accent">{'×'}{count}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Active alerts */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-2">Active alerts</h2>
          <div className="rounded-2xl border border-border bg-card p-4">
            {activeAlerts.length === 0 ? (
              <p className="text-[13px] text-muted-foreground">
                No active security alerts. Your application is stable under current traffic.
              </p>
            ) : (
              <ul className="list-none p-0 m-0 text-[13px]">
                {activeAlerts.map((e) => (
                  <li
                    key={e.id}
                    className="flex justify-between py-2 border-b border-secondary last:border-b-0"
                  >
                    <div>
                      <div className="text-foreground">
                        <strong>{e.severity}</strong> {'·'} {e.threat_type || e.event_type}
                      </div>
                      <div className="text-muted-foreground">
                        {e.endpoint} {'·'} {new Date(e.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{e.source_ip || "-"}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Recent activity table */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-foreground mb-2">Recent activity</h2>
          {events.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">No recent events.</p>
          ) : (
            <div className="rounded-2xl border border-border overflow-hidden bg-card">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-card">
                  <tr>
                    <th className="text-left p-2 border-b border-secondary text-muted-foreground font-medium">Time</th>
                    <th className="text-left p-2 border-b border-secondary text-muted-foreground font-medium">Type</th>
                    <th className="text-left p-2 border-b border-secondary text-muted-foreground font-medium">Severity</th>
                    <th className="text-left p-2 border-b border-secondary text-muted-foreground font-medium">Action</th>
                    <th className="text-left p-2 border-b border-secondary text-muted-foreground font-medium">Endpoint</th>
                    <th className="text-left p-2 border-b border-secondary text-muted-foreground font-medium">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-2 border-b border-secondary/50 text-foreground">
                        {new Date(e.timestamp).toLocaleString()}
                      </td>
                      <td className="p-2 border-b border-secondary/50 text-foreground">
                        {e.threat_type || e.event_type}
                      </td>
                      <td className="p-2 border-b border-secondary/50 text-foreground">{e.severity}</td>
                      <td className="p-2 border-b border-secondary/50 text-foreground">{e.action}</td>
                      <td className="p-2 border-b border-secondary/50 text-foreground">{e.endpoint}</td>
                      <td className="p-2 border-b border-secondary/50 text-muted-foreground">{e.source_ip || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Evidence link */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-2">{'Evidence & reports'}</h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            Detailed logs, risk assessments, and remediation notes are maintained in{" "}
            <a
              href="https://github.com/ashmin7/digital-twin-DigitalMind/blob/main/docs/security-evidence.md"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              docs/security-evidence.md
            </a>
            . Use that file to capture screenshots, exported scan reports, and structured
            summaries for each security layer.
          </p>
        </section>
      </main>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: number;
  description: string;
  accent?: string;
}

function MetricCard({ label, value, description, accent = "text-accent" }: MetricCardProps) {
  return (
    <div className="rounded-2xl p-3 border border-border bg-[linear-gradient(135deg,rgba(56,189,248,0.12),rgba(15,23,42,0.95))]">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={`text-2xl font-semibold ${accent}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  );
}
