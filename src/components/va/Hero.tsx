"use client";

import { ramp } from "@/lib/ramp";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { person } from "@/lib/content";

const RING = "ELECTRICAL AND COMPUTER ENGINEERING · UT AUSTIN · ";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(p, [0, 0.9], [1, 5]);
  const ringOpacity = useTransform(p, ramp(0, 0.4, 1, 0));
  const ringRotate = useTransform(p, [0, 1], [0, 140]);
  const nameOpacity = useTransform(p, ramp(0.3, 0.75, 1, 0));
  const labelOpacity = useTransform(p, ramp(0, 0.3, 1, 0));

  return (
    <section ref={ref} className="pa-hero" aria-label="Introduction">
      <div className="pa-hero-stage">
        <motion.div className="pa-hero-circle pa-anim" style={{ scale }} />
        <motion.div className="pa-hero-ring pa-anim" style={{ rotate: ringRotate, opacity: ringOpacity }}>
          <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
            <defs>
              <path id="pa-ring-path" d="M50 50 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
            </defs>
            <text className="pa-ring-text">
              <textPath href="#pa-ring-path" textLength="274" lengthAdjust="spacing">
                {RING + RING}
              </textPath>
            </text>
          </svg>
        </motion.div>
        <motion.h1 className="pa-hero-name pa-display pa-anim" style={{ opacity: nameOpacity }}>
          {person.name}
        </motion.h1>
        <motion.div className="pa-hero-labels pa-mono pa-anim" style={{ opacity: labelOpacity }} aria-hidden="true">
          <span className="tl">PORTFOLIO</span>
          <span className="tr">ECE, UT AUSTIN</span>
          <span className="bl">AUSTIN, TEXAS</span>
          <span className="br">SCROLL ↓</span>
        </motion.div>
      </div>
    </section>
  );
}
