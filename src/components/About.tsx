"use client";

import { motion } from "framer-motion";

const glance = [
  "Electrical Lead on Plano Green Team, 2024 to 2026. Safety Officer before that.",
  "Machine learning and computer vision research at UT Dallas.",
  "Led a 15-person electrical subteam and raised $50,000+ from 30+ sponsors across three seasons.",
  "B.S. Electrical and Computer Engineering, Minor in Entrepreneurship, UT Austin.",
];

const timeline = [
  {
    year: "2023",
    title: "Joined Plano Green Team",
    text: "Started on the solar car as Safety Officer, then moved into electrical systems, telemetry, and race support.",
  },
  {
    year: "2024",
    title: "UT Dallas Deep-Dive AI Workshop",
    text: "Co-developed a computer-vision gym-form classifier in Python with XGBoost and placed top 10 of 40 projects.",
  },
  {
    year: "2024",
    title: "Solar car results",
    text: "Team finished 4th in the nation in the Advanced Division.",
  },
  {
    year: "2025",
    title: "iCode School",
    text: "Joined as a STEM Instructor and wrote a K-12 curriculum running from block coding to advanced Python and AI.",
  },
  {
    year: "2025",
    title: "UT Dallas research",
    text: "Tuned an existing CNN for autonomous-driving image classification, owned the validation, and reached 95%+ accuracy.",
  },
  {
    year: "2025",
    title: "Solar car results",
    text: "Team finished 4th in the nation in the Advanced Classic Division.",
  },
  {
    year: "2026",
    title: "2nd in Advanced Classic",
    text: "Placed 2nd in the Advanced Classic Division at the Solar Car Challenge, a cross-country race across Texas, leading the electrical subsystem through design, build, and on-road race operations.",
  },
  {
    year: "2026",
    title: "UT Austin",
    text: "Started Electrical and Computer Engineering at UT Austin.",
  },
  {
    year: "2026",
    title: "Y Combinator Startup School",
    text: "Selected for Y Combinator Startup School 2026.",
  },
];

export default function About() {
  return (
    <main>
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="page-shell">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <div className="mb-10 md:mb-12">
              <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-2xl">
                About Me
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                I like projects where the work is real and the result matters.
                That has led me to circuit board design, solar cars, machine learning
                research, and teaching.
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <div>
                <h3 className="font-display text-3xl leading-none">
                  At a glance
                </h3>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-text-secondary">
                  {glance.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-1)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className="relative pl-5">
                <div className="timeline-line" />
                <div className="space-y-5">
                  {timeline.map((entry, i) => (
                    <div key={i} className="relative pl-5">
                      <div className="absolute left-0 top-1.5 timeline-dot" />
                      <div>
                        <span className="text-xs text-text-muted">
                          {entry.year}
                        </span>
                        <h3 className="mt-1 font-display text-2xl">
                          {entry.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                          {entry.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
