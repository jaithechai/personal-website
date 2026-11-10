"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "link" | "view";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let id = 0;
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.22;
      pos.y += (pos.ty - pos.y) * 0.22;
      if (ref.current)
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);

    const move = (e: MouseEvent) => {
      if (!on) setOn(true);
      pos.tx = e.clientX;
      pos.ty = e.clientY;
    };
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      if (t.closest("a, button, input, textarea, label, [role='button']")) setMode("link");
      else if (t.closest("[data-pa-view]")) setMode("view");
      else setMode("idle");
    };
    const leave = () => setOn(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className="pa-cursor-wrap" aria-hidden="true">
      <div className={`pa-cursor pa-cursor--${mode}${on ? " is-on" : ""}`}>
        <span className="pa-mono">VIEW</span>
      </div>
    </div>
  );
}
