"use client";

import { ramp } from "@/lib/ramp";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { person, aboutFacts, GITHUB_URL } from "@/lib/content";

function Word({ w, p, a, b, reduce }: { w: string; p: MotionValue<number>; a: number; b: number; reduce: boolean }) {
  const o = useTransform(p, ramp(a, b, 0.18, 1));
  return (
    <motion.span style={reduce ? undefined : { opacity: o }} className="pb-word">
      {w}{" "}
    </motion.span>
  );
}

export default function About() {
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = person.aboutIntro.split(" ");

  const pins: [string, string, string?][] = [
    ["STUDYING", `${person.degree}, ${person.school}`],
    ["MINOR", person.minor],
    ["BASED IN", "Austin, Texas"],
    ["GITHUB", `@${person.handle}`, GITHUB_URL],
  ];

  return (
    <section id="about" className="pb-section pb-about">
      <div className="pb-wrap">
        <p className="pb-label pb-gold">ABOUT</p>
        <h2 className="sr-only">About</h2>
        <p ref={ref} className="pb-reveal">
          {words.map((w, i) => (
            <Word key={i} w={w} p={p} a={(i / words.length) * 0.85} b={(i / words.length) * 0.85 + 0.15} reduce={reduce} />
          ))}
        </p>
        <div className="pb-about-grid">
          <div className="pb-shot">
            <div className="pb-shot-img">
              <Image src={person.headshot} alt={person.headshotAlt} fill sizes="(max-width: 900px) 70vw, 340px" />
            </div>
            <i className="pb-pad pb-pad-tl" /><i className="pb-pad pb-pad-tr" />
            <i className="pb-pad pb-pad-bl" /><i className="pb-pad pb-pad-br" />
          </div>
          <div>
            {person.intro.map((t) => (
              <p key={t} className="pb-body">{t}</p>
            ))}
            <dl className="pb-pintable">
              {pins.map(([k, v, href], i) => (
                <div key={k} className="pb-pinrow">
                  <dt><span className="pb-label pb-gold">PIN {i + 1}</span> <span className="pb-label">{k}</span></dt>
                  <dd>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="pb-link">{v}</a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="pb-facts">
              {aboutFacts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
