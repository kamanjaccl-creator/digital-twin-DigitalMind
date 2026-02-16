"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const sandboxLinks = [
  { href: "/sandbox/sql", label: "SQL Injection" },
  { href: "/sandbox/xss", label: "XSS" },
  { href: "/sandbox/rate-limit", label: "Rate Limiting" },
  { href: "/sandbox/auth", label: "Auth Bypass" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#threats", label: "Threats" },
    { href: "/#stack", label: "Stack" },
    { href: "/lab", label: "Lab Case Study" },
  ];

  const isSandboxActive = pathname.startsWith("/sandbox");

  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href="/" className="header-brand">
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

          {/* Sandbox dropdown */}
          <div className="sandbox-dropdown" ref={dropdownRef}>
            <button
              className={`header-nav-link sandbox-trigger${isSandboxActive ? " active" : ""}`}
              onClick={() => setDropdownOpen((v) => !v)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              type="button"
            >
              Sandbox
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  marginLeft: 4,
                  transition: "transform 0.15s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="sandbox-dropdown-menu">
                <a
                  href="/sandbox"
                  className="sandbox-dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  All Sandboxes
                </a>
                <div className="sandbox-dropdown-divider" />
                {sandboxLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className={`sandbox-dropdown-item${pathname === s.href ? " active" : ""}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/dashboard"
            className={`header-dashboard-btn${pathname === "/dashboard" ? " active" : ""}`}
          >
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
