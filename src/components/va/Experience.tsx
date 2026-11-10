"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { experience } from "@/lib/content";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const span = () =>
    track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0;
  const x = useTransform(p, (v) => -v * span());
  const fill = useTransform(p, (v) => (track.current ? v * span() + window.innerWidth / 2 : 0));

  useMotionValueEvent(p, "change", (v) => {
    const items = list.current?.children;
    if (!items) return;
    const cx = v * span() + window.innerWidth / 2;
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i < items.length; i++) {
      const el = items[i] as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - cx);
      if (d < bd) {
        bd = d;
        best = i;
      }
    }
    setActive(best);
  });

  return (
    <section
      id="experience"
      ref={ref}
      className="pa-exp"
      style={{ ["--pa-n" as string]: experience.length }}
      aria-labelledby="pa-exp-h"
    >
      <div className="pa-exp-stage">
        <h2 id="pa-exp-h" className="pa-display pa-exp-h">
          Experience
        </h2>
        <div className="pa-exp-view">
          <motion.div ref={track} className="pa-exp-track pa-anim" style={{ x }}>
            <div className="pa-exp-rail" aria-hidden="true">
              <motion.span className="pa-exp-fill" style={{ width: fill }} />
            </div>
            <ol ref={list} className="pa-exp-list">
              {experience.map((e, i) => (
                <li key={e.role + e.dates} className={i === active ? "is-active" : undefined}>
                  <span className="pa-exp-node" aria-hidden="true" />
                  <p className="pa-mono pa-exp-dates">{e.dates}</p>
                  <h3 className="pa-exp-role">{e.role}</h3>
                  <p className="pa-exp-org">{e.org}</p>
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
