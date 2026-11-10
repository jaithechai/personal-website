"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame, useReducedMotion } from "framer-motion";
import "./steer.css";

// Closed loop, so the lap repeats with no jump.
const TRACK = "M80 130 C80 40 220 30 320 90 S560 40 560 130 S420 230 320 170 S80 220 80 130 Z";
const LAP = 16000; // ms per lap
const LOOK = 46; // px of road ahead used for the steering arrow

// Plays on its own: a car follows a winding road, an arrow shows which way it steers.
export default function SteerDemo() {
  const reduce = !!useReducedMotion();
  const path = useRef<SVGPathElement>(null);
  const car = useRef<SVGGElement>(null);
  const arrow = useRef<SVGGElement>(null);
  const out = useRef<HTMLSpanElement>(null);

  const place = (ms: number) => {
    const p = path.current;
    if (!p || !car.current || !arrow.current || !out.current) return;
    const L = p.getTotalLength();
    const s = ((ms % LAP) / LAP) * L;
    const heading = (at: number) => {
      const a = p.getPointAtLength(at % L);
      const b = p.getPointAtLength((at + 2) % L);
      return Math.atan2(b.y - a.y, b.x - a.x);
    };
    const pos = p.getPointAtLength(s);
    const h = heading(s);
    const d = heading(s + LOOK) - h;
    const deg = (Math.atan2(Math.sin(d), Math.cos(d)) * 180) / Math.PI;
    car.current.setAttribute("transform", `translate(${pos.x} ${pos.y}) rotate(${(h * 180) / Math.PI})`);
    arrow.current.setAttribute("transform", `translate(16 0) rotate(${deg})`);
    const n = Math.round(Math.abs(deg));
    out.current.textContent = n < 4 ? "STRAIGHT" : `${deg < 0 ? "LEFT" : "RIGHT"} ${n}°`;
  };

  useEffect(() => place(1200), []); // first frame, and the only frame under reduced motion
  useAnimationFrame((t) => {
    if (!reduce) place(t);
  });

  return (
    <div className="pb-demo pb-dark">
      <div className="pb-demo-head">
        <h4 className="pb-demo-title">FOLLOW THE ROAD</h4>
        <span className="pb-demo-out" aria-hidden="true">
          STEERING: <b ref={out}>STRAIGHT</b>
        </span>
      </div>
      <svg
        viewBox="0 0 640 260"
        className="pbs-track"
        role="img"
        aria-label="Animation of a small car following a winding road. An arrow in front of the car shows the steering direction."
      >
        <path d={TRACK} className="pbs-edge" />
        <path ref={path} d={TRACK} className="pbs-road" />
        <path d={TRACK} className="pbs-mid" />
        <g ref={car}>
          <g ref={arrow}>
            <path d="M0 0 H30" className="pbs-arrow" />
            <path d="M40 0 L28 -7 V7 Z" fill="#e3b555" />
          </g>
          <path d="M-18 0 Q-6 -11 10 -10 Q17 -9 17 0 Q17 9 10 10 Q-6 11 -18 0 Z" fill="#c9cccd" stroke="#111" strokeWidth="2" />
          <circle cx="4" cy="0" r="5.5" fill="#a9d4ee" stroke="#111" strokeWidth="1.5" />
        </g>
      </svg>
      <p className="pb-label pb-demo-note">
        Illustration only. The arrow follows the curve of this drawn road. It is not output from the trained model.
      </p>
    </div>
  );
}
