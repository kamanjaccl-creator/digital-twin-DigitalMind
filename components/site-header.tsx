"use client";

import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#sandbox", label: "Sandbox" },
    { href: "/#threats", label: "Threats" },
    { href: "/#stack", label: "Stack" },
    { href: "/lab", label: "Lab Case Study" },
  ];

  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="/" className="header-brand">
          {/* Digital Twin icon — layered shield + circuit node */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="header-icon"
          >
            {/* Outer shield */}
            <path
              d="M14 2L4 6.5V13C4 19.35 8.28 25.22 14 27C19.72 25.22 24 19.35 24 13V6.5L14 2Z"
              stroke="var(--primary)"
              strokeWidth="1.5"
              fill="rgba(34,197,94,0.08)"
              strokeLinejoin="round"
            />
            {/* Inner circuit / brain node pattern */}
            <circle cx="14" cy="12" r="2.5" fill="var(--primary)" />
            <circle cx="9" cy="15" r="1.5" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <circle cx="19" cy="15" r="1.5" stroke="var(--accent)" strokeWidth="1" fill="none" />
            <circle cx="14" cy="20" r="1.5" stroke="var(--accent)" strokeWidth="1" fill="none" />
            {/* Connection lines */}
            <line x1="14" y1="14.5" x2="10" y2="14" stroke="var(--accent)" strokeWidth="0.8" opacity="0.6" />
            <line x1="14" y1="14.5" x2="18" y2="14" stroke="var(--accent)" strokeWidth="0.8" opacity="0.6" />
            <line x1="14" y1="14.5" x2="14" y2="18.5" stroke="var(--accent)" strokeWidth="0.8" opacity="0.6" />
          </svg>
          <span className="glow-dot" />
          <span className="header-title">Digital Twin III</span>
        </a>

        <nav className="header-nav">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`header-nav-link${pathname === l.href ? " active" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/dashboard"
            className={`header-dashboard-btn${pathname === "/dashboard" ? " active" : ""}`}
          >
            {/* Dashboard icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Dashboard
          </a>
        </nav>
      </div>
    </header>
  );
}
