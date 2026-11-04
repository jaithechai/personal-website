"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";

export default function WorkBus({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const reduced = useReducedMotion();
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    setEnhanced(true);
  }, []);
  return (
    <div
      ref={ref}
      className={`work-bus-layout ${enhanced && !reduced ? "bus-enhanced" : ""}`}
    >
      <div className="work-bus" aria-hidden="true">
        <motion.div
          className="bus-overlay"
          style={{ scaleY: enhanced && !reduced ? scrollYProgress : 1 }}
        />
      </div>
      {children}
    </div>
  );
}
