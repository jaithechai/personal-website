"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import Preloader from "./Preloader";
import Dock from "./Dock";

export default function Board({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [layers, setLayers] = useState({ cu: true, silk: true, mask: true });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Footer "Back to top" link: plain href="#" jump without Lenis, smooth with it.
    const toTop = (e: MouseEvent) => {
      if (!(e.target as Element).closest?.("[data-top]")) return;
      e.preventDefault();
      lenis.scrollTo(0, { duration: 2.8 });
    };
    document.addEventListener("click", toTop);
    return () => {
      document.removeEventListener("click", toTop);
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      html.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div
      className="pb-root"
      data-cu={layers.cu ? "on" : "off"}
      data-silk={layers.silk ? "on" : "off"}
      data-mask={layers.mask ? "on" : "off"}
    >
      <Preloader />
      {children}
      <Dock lenisRef={lenisRef} layers={layers} setLayers={setLayers} />
    </div>
  );
}
