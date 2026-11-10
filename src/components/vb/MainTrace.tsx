"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const IDS = ["about", "projects", "skills", "experience", "awards", "contact"];
const X = 20;
const J = 14;

export default function MainTrace() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState({ h: 0, ys: [] as number[] });

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const measure = () => {
      const top = parent.getBoundingClientRect().top;
      const ys = IDS.map((id) => document.getElementById(id))
        .filter((n): n is HTMLElement => !!n)
        .map((n) => n.getBoundingClientRect().top - top);
      setGeo({ h: parent.offsetHeight, ys });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const dist = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  let d = `M${X} 0`;
  geo.ys.forEach((y) => {
    const yy = Math.max(y, 40);
    d += ` V${yy - 2 * J} L${X + J} ${yy - J} V${yy + J} L${X} ${yy + 2 * J}`;
  });
  d += ` V${geo.h}`;

  return (
    <div ref={ref} className="pb-cu pb-main-trace" aria-hidden="true">
      {geo.h > 0 && (
        <>
          <svg width="56" height={geo.h} viewBox={`0 0 56 ${geo.h}`}>
            <path d={d} className="pb-trace pb-trace-ghost" />
            <motion.path d={d} className="pb-trace" style={reduce ? undefined : { pathLength: scrollYProgress }} />
            {geo.ys.map((y, i) => (
              <g key={i}>
                <circle cx={X + J} cy={Math.max(y, 40)} r="9" className="pb-via-ring" />
                <circle cx={X + J} cy={Math.max(y, 40)} r="4" className="pb-via-hole" />
              </g>
            ))}
          </svg>
          {!reduce && (
            <motion.span
              className="pb-signal"
              style={{ offsetPath: `path("${d}")`, offsetDistance: dist }}
            />
          )}
        </>
      )}
    </div>
  );
}
