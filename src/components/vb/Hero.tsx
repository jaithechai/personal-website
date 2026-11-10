"use client";

import { ramp } from "@/lib/ramp";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { person } from "@/lib/content";

type Pt = [number, number];
type Side = "t" | "b" | "l" | "r";
const OFFS = Array.from({ length: 10 }, (_, i) => -72 + i * 16);
const DIR: Record<Side, Pt> = { t: [0, -1], b: [0, 1], l: [-1, 0], r: [1, 0] };

// 45-degree routing: diagonal first, then one straight run.
function route(a: Pt, b: Pt): Pt[] {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const m = Math.min(Math.abs(dx), Math.abs(dy));
  return [a, [a[0] + (Math.sign(dx) || 1) * m, a[1] + (Math.sign(dy) || 1) * m], b];
}

const CORNERS = [
  { id: "tl", x: 0, y: 0, pins: [["t", 0], ["l", 0]], label: "PORTFOLIO" },
  { id: "tr", x: 1, y: 0, pins: [["t", 9], ["r", 0]], label: "ECE, UT AUSTIN" },
  { id: "bl", x: 0, y: 1, pins: [["b", 0], ["l", 9]], label: "AUSTIN, TEXAS" },
  { id: "br", x: 1, y: 1, pins: [["b", 9], ["r", 9]], label: "SCROLL ↓" },
] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDim({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dim;
  const s = 0.46 * Math.min(w, h);
  const k = s / 400;
  const endScale = Math.max(w, h) / (0.38 * s) * 1.08;
  const mx = w < 700 ? 26 : 48;
  const mt = w < 700 ? 34 : 48;
  const mb = w < 900 ? 124 : 88;

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(p, [0.05, 0.95], [1, endScale]);
  const fade = useTransform(p, ramp(0, 0.35, 1, 0));
  const nameOp = useTransform(p, ramp(0.15, 0.5, 1, 0));

  const geo = useMemo(() => {
    const cx = w / 2;
    const cy = h / 2;
    const pinAt = (side: Side, i: number) => {
      const o = OFFS[i] * k;
      const p: Pt =
        side === "t" ? [cx + o, cy - 100 * k] : side === "b" ? [cx + o, cy + 100 * k] :
        side === "l" ? [cx - 100 * k, cy + o] : [cx + 100 * k, cy + o];
      return { p, d: DIR[side] };
    };
    const used = new Set<string>();
    const vias: Pt[] = [];
    const paths = CORNERS.map((c) => {
      const v: Pt = [c.x ? w - mx : mx, c.y ? h - mb : mt];
      vias.push(v);
      return c.pins.map(([side, i]) => {
        used.add(side + i);
        const { p, d } = pinAt(side, i);
        const p1: Pt = [p[0] + d[0] * 18, p[1] + d[1] * 18];
        const pts = [p, ...route(p1, v)];
        return pts.map((q, n) => `${n ? "L" : "M"}${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" ");
      });
    }).flat();
    const stubs: { d: string; e: Pt }[] = [];
    (["t", "b", "l", "r"] as Side[]).forEach((side) =>
      OFFS.forEach((_, i) => {
        if (used.has(side + i)) return;
        const { p, d } = pinAt(side, i);
        const len = 16 + (i % 3) * 8;
        const e: Pt = [p[0] + d[0] * len, p[1] + d[1] * len];
        stubs.push({ d: `M${p[0].toFixed(1)} ${p[1].toFixed(1)} L${e[0].toFixed(1)} ${e[1].toFixed(1)}`, e });
      }),
    );
    return { paths, vias, stubs };
  }, [w, h, k, mx, mt, mb]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    e.currentTarget.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };

  return (
    <section ref={ref} className="pb-hero" aria-label="Introduction">
      <div ref={stageRef} className="pb-hero-stage" onPointerMove={onMove}>
        <motion.div className="pb-hero-fade" style={reduce ? undefined : { opacity: fade }}>
          <svg className="pb-cu pb-hero-traces" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
            {geo.paths.map((d, i) => (
              <path key={i} d={d} pathLength={1} className="pb-trace pb-draw" style={{ animationDelay: `${1.4 + i * 0.08}s` }} />
            ))}
            {geo.stubs.map((st, i) => (
              <g key={i}>
                <path d={st.d} className="pb-trace pb-trace-thin" />
                <circle cx={st.e[0]} cy={st.e[1]} r="3.5" className="pb-via-ring" />
              </g>
            ))}
            {geo.vias.map((v, i) => (
              <g key={i}>
                <circle cx={v[0]} cy={v[1]} r="10" className="pb-via-ring" />
                <circle cx={v[0]} cy={v[1]} r="4.5" className="pb-via-hole" />
              </g>
            ))}
          </svg>
          {CORNERS.map((c, i) => {
            const v = geo.vias[i];
            return (
              <span
                key={c.id}
                className={`pb-label pb-hero-label ${c.x ? "is-right" : ""}`}
                style={{
                  top: v[1] - 9,
                  ...(c.x ? { right: w - v[0] + 20 } : { left: v[0] + 20 }),
                }}
              >
                {c.label}
              </span>
            );
          })}
        </motion.div>

        <motion.div className="pb-hero-chip" style={{ width: s, height: s, ...(reduce ? {} : { scale }) }}>
          <div className="pb-par">
            <svg viewBox="0 0 400 400" width="100%" height="100%" aria-hidden="true">
              <g className="pb-gold-fill">
                {(["t", "b"] as const).map((side) =>
                  OFFS.map((o) => (
                    <rect key={side + o} x={197 + o} y={side === "t" ? 100 : 276} width="6" height="24" />
                  )),
                )}
                {(["l", "r"] as const).map((side) =>
                  OFFS.map((o) => (
                    <rect key={side + o} y={197 + o} x={side === "l" ? 100 : 276} width="24" height="6" />
                  )),
                )}
              </g>
              <rect x="124" y="124" width="152" height="152" rx="6" className="pb-chip-body" />
              <rect x="132" y="132" width="136" height="136" rx="3" className="pb-chip-bevel" />
              <circle cx="146" cy="146" r="5" className="pb-chip-dot" />
              <g className="pb-silk">
                <path d="M106 92 H308 V308 H92 V106 Z" className="pb-outline" />
                <text x="308" y="84" textAnchor="end" className="pb-svg-label">U1</text>
              </g>
            </svg>
          </div>
        </motion.div>

        <motion.h1 className="pb-hero-name" style={reduce ? undefined : { opacity: nameOp }}>
          {person.name.toUpperCase()}
        </motion.h1>
      </div>
    </section>
  );
}
