"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects, person, type Project } from "@/lib/content";
import AgentGraph from "./AgentGraph";
import BuckDemo from "./BuckDemo";
import OpAmpDemo from "./OpAmpDemo";
import SolarCar from "./SolarCar";
import SteerDemo from "./SteerDemo";

type Kind = "curtain" | "sweep" | "rise" | "scale" | "iris" | "diag";
// One entrance per project, in site order.
const KINDS: Kind[] = ["curtain", "sweep", "rise", "scale", "iris", "diag"];

function useEntrance(kind: Kind, p: MotionValue<number>, off: boolean) {
  const clip = useTransform(p, (v) => {
    if (off || v >= 0.995) return "none";
    if (kind === "iris") return `circle(${v * 150}% at 50% 100%)`;
    if (kind === "curtain") return `inset(0 ${(1 - v) * 50}% 0 ${(1 - v) * 50}%)`;
    if (kind === "diag") return `polygon(100% 0, ${100 - v * 200}% 0, 100% ${v * 200}%)`;
    if (kind === "sweep") return `inset(0 ${(1 - v) * 100}% 0 0)`;
    return "none";
  });
  const y = useTransform(p, [0, 1], [kind === "rise" ? 120 : 0, 0]);
  const sc = useTransform(p, [0, 1], [kind === "scale" ? 0.9 : 1, 1]);
  return off ? undefined : { clipPath: clip, y, scale: sc };
}

function Card({ pr, i }: { pr: Project; i: number }) {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const style = useEntrance(KINDS[i % KINDS.length], p, reduce);
  const tan = i % 2 === 1;

  // Tall cards stick by their bottom edge so the next card never hides their content.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => setTop(Math.min(0, window.innerHeight - el.offsetHeight));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    window.addEventListener("resize", set);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", set);
    };
  }, []);

  const n = String(i + 1).padStart(2, "0");
  return (
    <motion.article
      ref={ref}
      className={`pb-card ${tan ? "pb-tan" : "pb-mask"}`}
      style={{ ...style, top, zIndex: 10 + i }}
      aria-labelledby={`proj-${pr.id}`}
    >
      <div className="pb-pads pb-pads-t" aria-hidden="true" />
      <div className="pb-pads pb-pads-b" aria-hidden="true" />
      <div className="pb-silk pb-card-outline" aria-hidden="true" />
      <div className="pb-card-in">
        <div className="pb-card-meta">
          <span className="pb-label pb-silk">U{i + 2}</span>
          <span className="pb-label pb-silk">
            PROJECTS {n} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <h3 id={`proj-${pr.id}`} className="pb-giant">
          <span aria-hidden="true">{pr.shortName}</span>
          <span className="sr-only">{pr.name}</span>
        </h3>
        <p className="pb-role">
          {pr.org}
          {pr.dates ? ` · ${pr.dates}` : ""}
        </p>
        {pr.id === "solar-car" && <SolarCar />}
        <div className="pb-card-grid">
          <div>
            <p className="pb-body">{pr.description}</p>
            <ul className="pb-tags" aria-label="Tags">
              {pr.tags.map((t) => (
                <li key={t} className="pb-tag">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {pr.image && pr.imageSize && (
              <div className="pb-can">
                <Image
                  src={pr.image}
                  alt={`${pr.name}, ${pr.org}`}
                  width={pr.imageSize.width}
                  height={pr.imageSize.height}
                  sizes="(max-width: 900px) 90vw, 560px"
                />
              </div>
            )}
            <ul className="pb-facts">
              {pr.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
        {pr.id === "buck-converter" && <BuckDemo />}
        {pr.id === "op-amp-amplifier" && <OpAmpDemo />}
        {pr.id === "driving-cnn" && <SteerDemo />}
        {pr.id === "agentic-ops" && <AgentGraph />}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pb-projects">
      <div className="pb-wrap pb-proj-head">
        <p className="pb-label pb-gold">PROJECTS</p>
        <h2 className="pb-giant pb-giant-xl">Projects</h2>
        <p className="pb-body">{person.workIntro}</p>
      </div>
      <div className="pb-deck">
        {projects.map((pr, i) => (
          <Card key={pr.id} pr={pr} i={i} />
        ))}
      </div>
    </section>
  );
}
