"use client";

import { useEffect, useState } from "react";

type Phase = "route" | "drc" | "wipe" | "done";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("route");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 850);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const a = setTimeout(() => setPhase("drc"), 900);
    const b = setTimeout(() => setPhase("wipe"), 1150);
    const c = setTimeout(() => setPhase("done"), 1500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, []);

  if (phase === "done") return null;
  return (
    <div className="pb-pre" data-phase={phase} aria-hidden="true">
      <svg className="pb-pre-svg" viewBox="0 0 400 120">
        <path
          d="M40 60 H150 L180 30 H250 L280 60 H360"
          className="pb-pre-trace"
          pathLength={1}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="26" y="46" width="28" height="28" className="pb-pre-pad" />
        <rect x="346" y="46" width="28" height="28" className="pb-pre-pad" />
      </svg>
      <p className="pb-pre-text">{phase === "route" ? `ROUTING ${pct}%` : "DRC 0 ERRORS"}</p>
    </div>
  );
}
