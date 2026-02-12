# Security Evidence & Audit Trail

This document collects **evidence for each security layer** in the Digital Twin III portfolio. Use it as an auditable record you can show to employers, reviewers, and assessors.

> Tip: store screenshots in your repo (e.g. `docs/screenshots/`) or link to hosted images, and reference them from here.

---

## 1. Logs & Telemetry

### 1.1 Supabase `security_events` Table

- **Environment**: (e.g. Production / Preview)
- **Retention window**: (e.g. 30 days)
- **Sample query**:
  - Description: e.g. "Events for last 24h by threat type"
  - Screenshot / link: `TODO: add screenshot or link`

| Timestamp (UTC)       | Event Type        | Severity | Threat Type     | Endpoint           | Source IP      | Action  |
|-----------------------|-------------------|----------|-----------------|--------------------|----------------|---------|
| `2025-..`             | THREAT_BLOCKED    | HIGH     | SQL_INJECTION   | /api/sandbox/sql   | 203.0.113.10   | BLOCK   |
| `...`                 | THREAT_DETECTED   | MEDIUM   | PROMPT_INJECTION| /api/chat          | 198.51.100.27  | ALLOW   |

_Add more rows or screenshots as needed._

### 1.2 ArcJet / WAF Metrics (If enabled)

- Requests per minute / per endpoint
- Blocked vs allowed by rule (rate limiting, bot, geo, etc.)
- Evidence: `TODO: paste screenshots or export links`

---

## 2. Attack Statistics

Summarise **how often** your portfolio is being attacked and how it responds.

### 2.1 High-Level Summary (Last 7–30 Days)

- Total security events: `TODO`
- Total blocked attacks: `TODO`
- Top 3 threat types: `TODO` (e.g. SQLi, XSS, prompt injection)
- Top targeted endpoints: `TODO`

### 2.2 Breakdown by Threat Type

| Threat Type        | Events | Blocked | Allowed/Challenged | Notes                                |
|--------------------|--------|---------|---------------------|--------------------------------------|
| SQL_INJECTION      | `TODO` | `TODO`  | `TODO`              | Mostly from sandbox testing          |
| PROMPT_INJECTION   | `TODO` | `TODO`  | `TODO`              | Detected in chatbot inputs           |
| BOT_BEHAVIOR       | `TODO` | `TODO`  | `TODO`              | Scanner/rate-limit evidence          |

_Attach charts or screenshots from `/dashboard` if available._

---

## 3. CVSS Scoring

Document the **most important findings** using CVSS (v3.x).

| ID  | Vulnerability / Scenario                 | CVSS Base Score | Vector String                     | Justification & Context              | Status      |
|-----|------------------------------------------|-----------------|-----------------------------------|--------------------------------------|-------------|
| V-1 | Example: Weak rate limiting on /login   | `TODO`          | `CVSS:3.1/...`                    | e.g. Brute-force risk, low impact    | Remediated  |
| V-2 | Example: Verbose error messages in API  | `TODO`          | `CVSS:3.1/...`                    | Info leak, limited exploitation      | In progress |

_Add rows for each real finding, with full CVSS breakdown saved in a separate appendix if needed._

---

## 4. Risk Reports

Summarise **periodic risk assessments** of your Digital Twin.

### 4.1 Weekly / Sprint Risk Snapshot

- Date range: `TODO`
- Overall risk level: `LOW / MEDIUM / HIGH`
- Key drivers:
  - `TODO: bullet points`
- Mitigations planned/implemented this period:
  - `TODO: bullet points`

Repeat this section for multiple weeks to show security as a lifecycle.

---

## 5. Penetration Test & Tooling Results

Capture results from manual testing and automated tools (e.g. Nikto, ZAP, Burp, custom scripts).

### 5.1 Manual / Guided Pentest

- Date: `TODO`
- Scope: endpoints, components, data
- Tester: self / peer / external
- Summary of findings:
  - `TODO`
- Evidence: screenshots, request/response samples (with sensitive data redacted)

### 5.2 Automated Scans (e.g., Nikto, OWASP ZAP)

| Tool      | Date       | Scope / Target URL                  | Issues Found | Severity Range | Notes                |
|-----------|------------|--------------------------------------|-------------|----------------|----------------------|
| Nikto     | `TODO`     | `https://...`                       | `TODO`      | Low–Medium     | No critical issues   |
| ZAP       | `TODO`     | `https://...`                       | `TODO`      | `TODO`         | `TODO`              |

_Attach the actual reports as files or links._

---

## 6. Remediation Notes

For each significant issue, record what you changed and how you verified the fix.

| Finding ID | Summary of Issue                         | Fix Implemented                         | Date Fixed | Evidence of Fix (logs/tests)            |
|-----------|-------------------------------------------|-----------------------------------------|-----------|-----------------------------------------|
| V-1       | Example: Weak rate limiting              | Added per-IP rate limit + logging       | `TODO`    | Screenshot from logs & dashboard        |
| V-2       | Example: Prompt injection into chatbot   | Added detection and safe fallback path  | `TODO`    | Before/after transcripts + code diff    |

---

## 7. Resilience Patterns & Hardening History

Describe the **patterns** you implemented to improve resilience over time.

Examples (edit/extend these):

- **Defense-in-depth for SQL injection**
  - Parameterized queries + detection + logging + educational sandbox.
- **Secure AI usage**
  - Prompt injection detection, strict system prompts, no direct tool execution.
- **Authentication & Access Control**
  - RLS in database + role-based checks in API routes + audit logs.
- **Rate limiting & bot controls**
  - Per-IP limits for sandbox/chat + evidence of blocked scans.

Add narrative here showing how your Digital Twin evolved in response to real or simulated attacks.
