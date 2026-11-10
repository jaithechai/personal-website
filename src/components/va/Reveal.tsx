"use client";

import { motion, useInView, type TargetAndTransition } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

const KINDS: { from: TargetAndTransition; to: TargetAndTransition }[] = [
  { from: { clipPath: "circle(0% at 50% 50%)" }, to: { clipPath: "circle(150% at 50% 50%)" } },
  {
    from: { clipPath: "inset(-8% 100% -8% -8%)" },
    to: { clipPath: "inset(-8% -8% -8% -8%)" },
  },
  { from: { opacity: 0, y: 70 }, to: { opacity: 1, y: 0 } },
  { from: { opacity: 0, scale: 0.9 }, to: { opacity: 1, scale: 1 } },
];

export default function Reveal({ i, children }: { i: number; children: ReactNode }) {
  const k = KINDS[i % KINDS.length];
  const ref = useRef<HTMLDivElement>(null);
  // Observe the unclipped wrapper: an element clipped to nothing never counts as in view.
  const seen = useInView(ref, { once: true, amount: 0.15 });

  // A sticky card taller than the viewport must stop sticking once its bottom is visible,
  // otherwise the next card covers its overflow.
  useEffect(() => {
    const card = ref.current?.closest<HTMLElement>(".pa-card");
    if (!card) return;
    const fit = () => {
      const sticky = getComputedStyle(card).position === "sticky";
      card.style.top = sticky ? `${Math.min(0, window.innerHeight - card.offsetHeight)}px` : "";
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(card);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      card.style.top = "";
    };
  }, []);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <motion.div
        className="pa-card-in pa-anim"
        initial={k.from}
        animate={seen ? k.to : k.from}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
