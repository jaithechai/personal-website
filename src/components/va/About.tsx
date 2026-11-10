"use client";

import { ramp } from "@/lib/ramp";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { person, contact } from "@/lib/content";

function Word({ w, p, a, b }: { w: string; p: MotionValue<number>; a: number; b: number }) {
  const opacity = useTransform(p, ramp(a, b, 0.15, 1));
  return (
    <>
      <motion.span className="pa-w pa-anim" style={{ opacity }}>
        {w}
      </motion.span>{" "}
    </>
  );
}

const github = contact.rows[2];

const FACTS: { label: string; value: string; href?: string }[] = [
  { label: "STUDYING", value: `${person.degree}, ${person.school}` },
  { label: "MINOR", value: person.minor },
  { label: "BASED IN", value: "Austin, Texas" },
  { label: "ON GITHUB", value: github.display, href: github.href },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = person.aboutIntro.split(" ");

  return (
    <section id="about" ref={ref} className="pa-about" aria-labelledby="pa-about-h">
      <div className="pa-about-stage">
        <div className="pa-about-top">
          <h2 id="pa-about-h" className="pa-mono pa-label">
            About
          </h2>
          <div className="pa-about-photo">
            <Image
              src={person.headshot}
              alt={person.headshotAlt}
              width={320}
              height={320}
              sizes="(max-width: 700px) 88px, 200px"
              priority
            />
          </div>
        </div>
        <p className="pa-about-text">
          {words.map((w, i) => {
            const a = 0.04 + (i / words.length) * 0.62;
            return <Word key={i} w={w} p={p} a={a} b={a + 0.1} />;
          })}
        </p>
        <dl className="pa-facts">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt className="pa-mono">{f.label}</dt>
              <dd>
                {f.href ? (
                  <a href={f.href} target="_blank" rel="noopener noreferrer">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
