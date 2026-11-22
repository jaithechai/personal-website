"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import "./runner.css";

// Tape line through the room: out along the top, round the end, back along the bottom.
const TAPE = "M110 110 H460 Q530 110 530 165 Q530 220 460 220 H150";
const TOP = 350; // length of the first straight
const BOTTOM = 310; // length of the last straight
const V = 0.16; // px per ms
const DWELL = 1600;
const SPIN = 1000;
const REST = 700;

// Strip and table positions. `at` turns the tape length into the strip's distance from Home.
const TABLES = [
  { x: 300, y: 110, ty: 46, at: () => 190 },
  { x: 420, y: 220, ty: 278, at: (L: number) => L - BOTTOM + 40 },
  { x: 220, y: 220, ty: 278, at: (L: number) => L - BOTTOM + 240 },
];

// Where the robot is at time ms: distance along the tape, extra turn in degrees, buzz clock, target table.
function phase(ms: number, S: number[]) {
  const total = S.reduce((a, s) => a + (2 * s) / V + DWELL + 2 * SPIN + REST, 0);
  let t = ms % total;
  for (let k = 0; k < S.length; k++) {
    const go = S[k] / V;
    const n = k + 1;
    if (t < go) return { s: t * V, turn: 0, buzz: -1, n, text: `TO TABLE ${n}` };
    t -= go;
    if (t < DWELL) return { s: S[k], turn: 0, buzz: t, n, text: `AT TABLE ${n}` };
    t -= DWELL;
    if (t < SPIN) return { s: S[k], turn: (t / SPIN) * 180, buzz: -1, n: 0, text: "TURNING AROUND" };
    t -= SPIN;
    if (t < go) return { s: S[k] - t * V, turn: 180, buzz: -1, n: 0, text: "RETURNING HOME" };
    t -= go;
    if (t < SPIN) return { s: 0, turn: 180 + (t / SPIN) * 180, buzz: -1, n: 0, text: "TURNING AROUND" };
    t -= SPIN;
    if (t < REST) return { s: 0, turn: 0, buzz: -1, n: 0, text: "HOME" };
    t -= REST;
  }
  return { s: 0, turn: 0, buzz: -1, n: 0, text: "HOME" };
}

// Plays on its own once it is on screen: the robot delivers to each table in turn, seen from above.
export default function RunnerDemo() {
  const reduce = !!useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const seen = useInView(wrap, { amount: 0.6 });
  const clock = useRef(0);
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const bot = useRef<SVGGElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const out = useRef<HTMLElement>(null);

  const place = (ms: number) => {
    const p = path.current;
    if (!p || !bot.current || !ring.current || !out.current || !svg.current) return;
    const L = p.getTotalLength();
    const f = phase(ms, TABLES.map((t) => t.at(L)));
    const a = p.getPointAtLength(Math.max(0, f.s - 1));
    const b = p.getPointAtLength(Math.min(L, f.s + 1));
    const pos = p.getPointAtLength(f.s);
    const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + f.turn;
    bot.current.setAttribute("transform", `translate(${pos.x} ${pos.y}) rotate(${deg})`);
    const k = f.buzz < 0 ? 0 : (f.buzz % 500) / 500;
    ring.current.setAttribute("cx", String(pos.x));
    ring.current.setAttribute("cy", String(pos.y));
    ring.current.setAttribute("r", String(30 + 30 * k));
    ring.current.setAttribute("opacity", f.buzz < 0 ? "0" : String(1 - k));
    svg.current.dataset.t = String(f.n);
    out.current.textContent = f.text;
  };

  useEffect(() => place(1700), []); // first frame, and the only frame under reduced motion
  useAnimationFrame((_, delta) => {
    if (reduce || !seen) return;
    clock.current += delta;
    place(clock.current);
  });

  return (
    <div ref={wrap} className="pb-demo pb-dark">
      <div className="pb-demo-head">
        <h4 className="pb-demo-title">ON THE FLOOR</h4>
        <span className="pb-demo-out" aria-hidden="true">
          ROBOT: <b ref={out}>HOME</b>
        </span>
      </div>
      <svg
        ref={svg}
        viewBox="0 0 640 320"
        className="pbr"
        role="img"
        aria-label="Top-down animation of the robot following a tape line through a dining room. It leaves the counter, counts the cross strips, stops at one table, turns around and returns."
      >
        <rect x="22" y="48" width="50" height="124" className="pbr-counter" />
        <text x="47" y="110" className="pbr-text" transform="rotate(-90 47 110)" dy="7">
          COUNTER
        </text>
        <path ref={path} d={TAPE} className="pbr-tape" />
        <path d="M110 90 V130" className="pbr-strip" />
        <text x="110" y="160" className="pbr-text">
          HOME
        </text>
        {TABLES.map((t, i) => (
          <g key={i} className={`pbr-table pbr-t${i + 1}`}>
            <path d={`M${t.x} ${t.y - 20} V${t.y + 20}`} className="pbr-strip" />
            {[-40, 40].map((dx) => (
              <circle key={dx} cx={t.x + dx} cy={t.ty} r="10" className="pbr-chair" />
            ))}
            <circle cx={t.x} cy={t.ty} r="30" className="pbr-top" />
            <text x={t.x} y={t.ty + 7} className="pbr-text">
              T{i + 1}
            </text>
          </g>
        ))}
        <circle ref={ring} className="pbr-ring" opacity="0" />
        <g ref={bot}>
          {/* drawn large so it still reads at phone width */}
          <g transform="scale(1.6)">
            <rect x="-12" y="-19" width="16" height="6" rx="2" className="pbr-wheel" />
            <rect x="-12" y="13" width="16" height="6" rx="2" className="pbr-wheel" />
            <rect x="-18" y="-14" width="34" height="28" rx="6" className="pbr-body" />
            <circle cx="-2" cy="0" r="8" className="pbr-cup" />
            <circle cx="12" cy="-6" r="2" className="pbr-eye" />
            <circle cx="12" cy="6" r="2" className="pbr-eye" />
          </g>
        </g>
      </svg>
      <p className="pb-label pb-demo-note">
        Illustration, not a recording. The room is made up; the tape line, cross strips, table stop and turn-around
        are how the robot works.
      </p>
    </div>
  );
}
