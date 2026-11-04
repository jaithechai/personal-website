"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const links = [
  ["Home", "/"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    setEnhanced(true);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <header className="site-header">
      <nav className="page-shell nav-inner" aria-label="Main navigation">
        <Link href="/" className="brand">
          <svg viewBox="0 0 40 32" width="40" height="32" aria-hidden="true">
            <path d="M0 16h10m20 0h10" stroke="var(--wire)" strokeWidth="2" />
            <rect
              x="10"
              y="6"
              width="20"
              height="20"
              fill="var(--symbol-fill)"
              stroke="var(--symbol-line)"
              strokeWidth="2"
            />
          </svg>
          <span>Jai Dilbaghi</span>
        </Link>
        <button
          className="menu-button button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(!open)}
          hidden={!enhanced}
        >
          Menu
        </button>
        <div
          id="site-menu"
          className={`nav-links ${enhanced ? "enhanced" : ""} ${open ? "is-open" : ""}`}
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
