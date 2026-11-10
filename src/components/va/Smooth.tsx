"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function Smooth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    const w = window as unknown as { __paLenis?: Lenis };
    w.__paLenis = lenis;
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete w.__paLenis;
    };
  }, []);
  return null;
}
