"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

// Top to bottom. file null = the bare board with no artwork.
const LAYERS: { file: string | null; label: string }[] = [
  { file: "F_Silkscreen", label: "Silkscreen" },
  { file: "F_Mask", label: "Exposed pads" },
  { file: "F_Cu", label: "Top copper" },
  { file: null, label: "FR-4 core" },
  { file: "B_Cu", label: "Bottom copper" },
];
const GAP = 58; // px between plates when fully apart

function Plate({ src, lift, p, reduce }: { src: string | null; lift: number; p: MotionValue<number>; reduce: boolean }) {
  const z = useTransform(p, [0, 1], [0, lift]);
  return (
    <motion.div className={`pbx-plate${src ? "" : " pbx-core"}`} style={{ z: reduce ? lift : z }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src && <img src={src} alt="" loading="lazy" />}
    </motion.div>
  );
}

// Each label lights up in turn, top layer first, as the stack opens.
function Label({ i, text, p, reduce }: { i: number; text: string; p: MotionValue<number>; reduce: boolean }) {
  const from = 0.15 + i * 0.14;
  const opacity = useTransform(p, [from, from + 0.2], [0.25, 1]);
  const x = useTransform(p, [from, from + 0.2], [-10, 0]);
  return (
    <motion.li style={reduce ? undefined : { opacity, x }}>
      <span className="pbx-num">{i + 1}</span> {text}
    </motion.li>
  );
}

// The board starts as one flat stack and pulls apart once it is well inside the screen.
export default function BoardLayers({ name, ratio }: { name: string; ratio: number }) {
  const reduce = !!useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  // 0 when the stage's middle is 70% down the screen, 1 when it is 35% down.
  const { scrollYProgress } = useScroll({ target: stage, offset: ["center 0.7", "center 0.35"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.6 });
  const rotateX = useTransform(p, [0, 1], [46, 60]);
  const mid = (LAYERS.length - 1) / 2;
  return (
    <div className="pbx">
      <h5 className="pbo-h">THE LAYERS</h5>
      <div className="pbx-row">
        <div ref={stage} className="pbx-stage" role="img" aria-label="The board drawn as five separate layers stacked apart: silkscreen, exposed pads, top copper, FR-4 core, bottom copper.">
          <motion.div className="pbx-tilt" style={{ aspectRatio: String(ratio), rotateX: reduce ? 60 : rotateX, rotateZ: -34 }}>
            {[...LAYERS].reverse().map((l, i) => (
              <Plate key={l.label} src={l.file && `/boards/${name}-${l.file}.svg`} lift={(i - mid) * GAP} p={p} reduce={reduce} />
            ))}
          </motion.div>
        </div>
        <ol className="pbx-legend pb-label">
          {LAYERS.map((l, i) => (
            <Label key={l.label} i={i} text={l.label} p={p} reduce={reduce} />
          ))}
        </ol>
      </div>
    </div>
  );
}
