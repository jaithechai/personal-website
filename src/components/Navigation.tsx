"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);

      const sections = ["home", "about", "work", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 128) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
            <button
              onClick={() => handleNavClick("#home")}
              className="font-display text-2xl tracking-tight text-text-primary"
            >
              Jai Dilbaghi
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => {
                const id = href.replace("#", "");
                const isActive = active === id;

                return (
                  <button
                    key={label}
                    onClick={() => handleNavClick(href)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              <a href="#contact" className="ml-2 btn-secondary">
                Contact
              </a>
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
                <button
                  key={label}
                  onClick={() => handleNavClick(href)}
                  className="text-left px-2 py-3 text-sm text-text-secondary hover:text-text-primary"
                >
                  {label}
                </button>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-secondary w-fit">
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
