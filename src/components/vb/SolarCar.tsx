"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Small cartoon solar car that drives across its project card as the page scrolls.
export default function SolarCar() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Scroll range in page pixels over which the car crosses: [card enters viewport, card fully scrolled].
  const [range, setRange] = useState<[number, number]>([0, 1]);
  const { scrollY } = useScroll();

  useEffect(() => {
    const card = ref.current?.closest<HTMLElement>(".pb-card");
    const deck = card?.parentElement;
    if (!card || !deck) return;
    const set = () => {
      // The card is sticky, so its own rect lies once stuck. Rebuild its natural top from the deck.
      let top = deck.getBoundingClientRect().top + window.scrollY;
      for (let el = card.previousElementSibling; el; el = el.previousElementSibling) {
        top += (el as HTMLElement).offsetHeight;
      }
      const road = ref.current!;
      const x = road.getBoundingClientRect().top - card.getBoundingClientRect().top;
      const h = card.offsetHeight;
      const vh = window.innerHeight;
      // Cross exactly while the road is on screen: from entering at the bottom until the
      // next card covers it (sticky deck) or it leaves at the top (stacked layout).
      const sticky = getComputedStyle(card).position === "sticky";
      const end = sticky ? top + h - x - Math.min(0, vh - h) : top + x + road.offsetHeight;
      setRange([top + x - vh, end]);
    };
    set();
    const ro = new ResizeObserver(set);
    ro.observe(card);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);

  const left = useTransform(scrollY, range, ["-14%", "100%"], { clamp: true });
  const spin = useTransform(scrollY, (v) => v * 1.2);

  return (
    <div ref={ref} className="pb-road" aria-hidden="true">
      <motion.svg
        className="pb-car"
        viewBox="0 0 120 64"
        style={reduce ? { left: "43%" } : { left }}
      >
        {/* Drawn after Jai's sketch of the car: grey wing deck, blue dome with a face, 67 plate. */}
        {[30, 62, 96].map((cx) => (
          <motion.g key={cx} style={{ rotate: reduce ? 0 : spin, transformBox: "fill-box", transformOrigin: "center" }}>
            <circle cx={cx} cy="55" r="7" fill="#111" stroke="#f3f1e7" strokeWidth="1.5" />
            <path d={`M${cx - 7} 55 H${cx + 7}`} stroke="#f3f1e7" strokeWidth="1.5" />
          </motion.g>
        ))}
        {/* lower body */}
        <path d="M22 37 H106 L108 53 H26 Z" fill="#8f9396" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        {/* number plate */}
        <rect x="84" y="41" width="19" height="10" fill="#2f6fd0" stroke="#111" strokeWidth="1.5" />
        <path d="M84 41 H90 L84 46 Z" fill="#f2c230" stroke="#111" strokeWidth="1" />
        <text x="95" y="49.2" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">67</text>
        {/* dome with face */}
        <path d="M48 29 A20 19 0 0 1 88 29 Z" fill="#a9d4ee" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="62" cy="19" r="1.9" fill="#111" />
        <circle cx="74" cy="19" r="1.9" fill="#111" />
        <path d="M64 23 Q68 27 72 23" fill="none" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
        {/* wing deck */}
        <path d="M2 35 Q44 23 112 27 Q121 31 114 39 Q58 43 2 35 Z" fill="#c9cccd" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M22 34 Q64 29 110 32" fill="none" stroke="#111" strokeWidth="1.2" />
      </motion.svg>
    </div>
  );
}
