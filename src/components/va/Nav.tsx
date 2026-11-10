"use client";

import { useEffect, useState, type MouseEvent } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const WATCH = ["about", "projects", "skills", "experience", "awards", "contact"];

export default function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = WATCH.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const lenis = (window as unknown as { __paLenis?: { scrollTo: (t: HTMLElement) => void } })
      .__paLenis;
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView();
  };

  return (
    <nav className="pa-nav" aria-label="Sections">
      <ul>
        {LINKS.map((l) => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              onClick={(e) => go(e, l.id)}
              aria-current={active === l.id ? "true" : undefined}
              className={active === l.id ? "is-active" : undefined}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
