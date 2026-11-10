"use client";

import { useEffect, useState, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import type Lenis from "lenis";

const ITEMS = [
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["contact", "Contact"],
] as const;
const IDS = ["about", "projects", "skills", "experience", "awards", "contact"];

type Layers = { cu: boolean; silk: boolean; mask: boolean };

export default function Dock({
  lenisRef,
  layers,
  setLayers,
}: {
  lenisRef: MutableRefObject<Lenis | null>;
  layers: Layers;
  setLayers: Dispatch<SetStateAction<Layers>>;
}) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0 });
    else el.scrollIntoView();
  };

  const toggles: [keyof Layers, string, string][] = [
    ["cu", "CU", "Copper layer, traces"],
    ["silk", "SILK", "Silkscreen layer, outlines and designators"],
    ["mask", "MASK", "Solder mask layer"],
  ];

  return (
    <div className="pb-dock">
      <nav className="pb-nav" aria-label="Sections">
        {ITEMS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => go(e, id)}
            aria-current={active === id ? "true" : undefined}
            className="pb-nav-link"
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="pb-layers" role="group" aria-label="Layers">
        <span className="pb-layers-label">LAYERS</span>
        {toggles.map(([k, label, title]) => (
          <button
            key={k}
            type="button"
            title={title}
            aria-pressed={layers[k]}
            onClick={() => setLayers((l) => ({ ...l, [k]: !l[k] }))}
            className="pb-layer-btn"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
