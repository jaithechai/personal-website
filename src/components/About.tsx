"use client";

import { motion } from "framer-motion";

const glance = [
  "Electrical and telemetry lead on Plano Green Team. The team is not affiliated with Liberty High School.",
  "Worked on computer vision and machine learning projects at UTD labs.",
  "Built web projects, including work on the Green Portfolio Project.",
  "Freshman in UT Austin ECE, class of 2030. SAT 1540. Took 18 AP courses.",
];

const timeline = [
  {
    year: "2023",
    title: "Joined Plano Green Team",
    text: "Started working on the solar car as Safety Officer, then moved into electrical systems, telemetry, and race support.",
  },
  {
    year: "2024",
    title: "UTD workshop project",
    text: "Co-built a real time gym form system with Python and XGBoost, then presented it to graduate students and professors.",
  },
  {
    year: "2024",
    title: "Solar car results",
    text: "Helped the team finish 4th nationally while raising more than $25K from sponsors.",
  },
  {
    year: "2024",
    title: "Green Portfolio Project",
    text: "Worked as a website developer on a project for aspiring young entrepreneurs. Focused on HTML structure, communication, and adaptability.",
  },
  {
    year: "2025",
    title: "UTD DEIL Lab",
    text: "Built a CNN from scratch for autonomous driving image classification and reached 95% plus accuracy.",
  },
  {
    year: "2025",
    title: "iCode",
    text: "Started work in 2025 and kept building around coding, teaching, and student support.",
  },
  {
    year: "2026",
    title: "UT Austin",
    text: "Started ECE at UT Austin as a freshman, class of 2030.",
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
                That has led me to solar cars, research, websites, and
                student-focused tech.
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
