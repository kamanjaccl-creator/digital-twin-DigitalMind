-- Security Events Table
CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
  source_ip INET,
  user_agent TEXT,
  endpoint TEXT NOT NULL,
  payload TEXT,
  threat_type TEXT,
  action TEXT NOT NULL CHECK (action IN ('ALLOW', 'BLOCK', 'CHALLENGE')),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT,
  user_id UUID,
  metadata JSONB,
  CONSTRAINT valid_event_type CHECK (event_type IN (
    'THREAT_DETECTED', 'THREAT_BLOCKED', 'LOGIN_ATTEMPT', 
    'ACCESS_DENIED', 'RATE_LIMITED'
  ))
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_security_events_timestamp ON security_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_ip ON security_events(source_ip);
