"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { experience } from "@/lib/content";

export default function Experience() {
  const reduce = !!useReducedMotion();
  const [wide, setWide] = useState(false);
  const secRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [m, setM] = useState({ secH: 0, top: 0, max: 0, delta: 0, trackW: 1, vw: 1200, centers: [] as number[] });
  const [active, setActive] = useState(0);
  const horizontal = wide && !reduce;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (!horizontal) return;
    const measure = () => {
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!pin || !track) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const trackW = track.scrollWidth;
      const max = Math.max(0, trackW - vw);
      const stageH = pin.offsetHeight;
      const centers = Array.from(track.querySelectorAll<HTMLElement>(".pb-exp-item")).map((li) => li.offsetLeft + 12);
      setM({ secH: max + stageH, top: Math.min(0, vh - stageH), max, delta: Math.max(0, stageH - vh), trackW, vw, centers });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [horizontal]);

  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -Math.min(m.max, Math.max(0, v * (m.max + m.delta) - m.delta)));
  const fill = useTransform(x, (v) => Math.min(1, Math.max(0, (m.vw / 2 - v) / m.trackW)));
  useMotionValueEvent(x, "change", (v) => {
    const c = m.vw / 2 - v;
    let best = 0;
    m.centers.forEach((p, i) => {
      if (Math.abs(p - c) < Math.abs(m.centers[best] - c)) best = i;
    });
    setActive(best);
  });

  return (
    <section
      id="experience"
      ref={secRef}
      className="pb-section pb-exp pb-tan"
      data-h={horizontal ? "1" : "0"}
      style={horizontal && m.secH ? { height: m.secH } : undefined}
    >
      <div ref={pinRef} className="pb-exp-pin" style={horizontal ? { top: m.top } : undefined}>
        <div className="pb-wrap pb-exp-head">
          <p className="pb-label pb-gold">EXPERIENCE</p>
          <h2 className="pb-giant pb-giant-xl">Experience</h2>
        </div>
        <div className="pb-exp-view">
          <motion.ol ref={trackRef} className="pb-exp-track" style={horizontal ? { x } : undefined}>
            <span className="pb-exp-line" aria-hidden="true" />
            {horizontal && <motion.span className="pb-exp-fill" aria-hidden="true" style={{ scaleX: fill }} />}
            {experience.map((e, i) => (
              <li key={e.role + e.dates} className="pb-exp-item">
                <span className={`pb-via ${horizontal && i === active ? "is-active" : ""}`} aria-hidden="true" />
                <p className="pb-label pb-gold">{e.dates}</p>
                <h3 className="pb-exp-role">{e.role}</h3>
                <p className="pb-role">{e.org}</p>
                <ul className="pb-facts">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
