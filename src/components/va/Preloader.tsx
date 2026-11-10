"use client";

import { useEffect, useState } from "react";

// CSS alone hides the overlay by 1.4s; this only drives the counter and unmounts it.
export default function Preloader() {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const t0 = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 800);
      setN(Math.round(p * 100));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    const done = window.setTimeout(() => setGone(true), 1450);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(done);
    };
  }, []);

  if (gone) return null;
  return (
    <div className="pa-pre" aria-hidden="true">
      <span className="pa-mono pa-pre-count">LOADING {n}%</span>
      <span className="pa-pre-dot" />
    </div>
  );
}
