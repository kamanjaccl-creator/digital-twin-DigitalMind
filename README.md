Digital Twin III – Cyber-Hardened Portfolio

Transforming a personal web portfolio into a secure, monitored, and AI-assisted digital presence.

Project Repository: digital-twin-DigitalMind
Owner: DigitalMind Team 

Project Overview

The Digital Twin III – Cyber-Hardened Portfolio project is designed to showcase a professional portfolio that is not only visually appealing but also cyber-resilient. It demonstrates the ability to:

Detect and block real cyber threats in real-time.

Analyze attacker behavior and generate actionable insights.

Maintain audit logs and security metrics.

Present a secure, AI-assisted digital presence to prospective employers.

This project uses Next.js 16 + TypeScript on the frontend, Node.js 20 for APIs, and Supabase for the database. Security is enforced via Clerk authentication, Web Application Firewall, and real-time threat detection agents.

Features

Secure Authentication: Users can log in and manage profiles securely.

Real-time Threat Monitoring: Detects SQL injection, XSS, bot traffic, and other attack vectors.

AI-Driven Interactions: Persona agent answers questions about skills, experience, and portfolio content.

Content Management: Automated content creation and project documentation through AI tools.

Analytics Dashboard: Visualizes attack patterns, blocked threats, and system performance.

Audit Logging: All security events are logged for transparency and accountability.

Technology Stack
Layer	Technology
Frontend	Next.js 16 + TypeScript
Backend	Node.js 20 / API routes
Database	Supabase (PostgreSQL)
Authentication	Clerk or Supabase Auth
Deployment	Vercel
AI Agents	OpenAI GPT models
Security	WAF, CSP, X-Frame-Options, HSTS, structured logging
AI Agents Architecture
Agent	Purpose	Key Features
Persona Agent	Digital twin interactions	Conversational AI, skill representation
Security Guardian	Threat detection	Prompt injection, SQL/XSS detection, blocking malicious inputs
Content Creator	Blog/project management	MCP tool support, markdown generation
Threat Analytics	Security insights	Pattern analysis, dashboard metrics, attack predictions
Audit Logger	Event logging	Structured logs, real-time critical alerts

All agents are orchestrated to work together securely, providing an interactive, self-defending portfolio experience.

Database

Supabase tables:

security_events – Logs all security events with severity, threat type, source IP, and actions.

blog_posts – Stores blog content, slugs, tags, and authors.

projects – Contains portfolio projects, technology stacks, GitHub/live URLs, and README content.

threat_metrics_daily – Materialized view for analytics dashboards.

Row-level security ensures only authorized users or system roles can access or insert data.

Contributors:

Phuntshok Wangdruk – Backend/ AI Agents File
Victor Kamanja – Fronted Developer/PRD File
Ashmin Aryal – Team Lead/STAR File & Readme
