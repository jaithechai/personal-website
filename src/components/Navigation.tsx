"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "nav-bar" : "bg-transparent"}`}
      >
        <div className="page-shell">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-display text-2xl tracking-tight text-text-primary"
            >
              Jai Dilbaghi
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-2 btn-primary"
                style={{
                  borderRadius: "0.6rem",
                  background: "var(--accent-1)",
                  borderColor: "var(--accent-1)",
                }}
              >
                Contact
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="md:hidden border border-[var(--border)] px-3 py-2 text-sm font-mono uppercase tracking-wider"
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden nav-bar"
          >
            <div className="page-shell py-3 flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-left px-2 py-3 text-sm text-text-secondary hover:text-text-primary"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-1"
                style={{
                  borderRadius: "0.6rem",
                  background: "var(--accent-1)",
                  borderColor: "var(--accent-1)",
                }}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
