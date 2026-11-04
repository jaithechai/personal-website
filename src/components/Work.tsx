"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Solar Car Electrical System",
    org: "Plano Green Team",
    description:
      "Led the electrical subsystem of a competitive solar race car through design, build, and on-road race operations. Designed all 5 of the car's circuits in KiCad across three seasons, covering pack wiring, sensing, and control, then built each one out in hardware and integrated it with the mechanical team's chassis. Built and installed the telemetry hardware (sensors, wiring, and the RF link) that fed the team's live race-strategy dashboards. Moved the driver's turn signals, hazards, and horn onto a wheel-mounted remote by integrating an RF-activated relay into the low-voltage system, with no cable through the steering column.",
    highlights: [
      "2nd in Advanced Classic, 2026 Solar Car Challenge",
      "$50,000+ raised from 30+ sponsors",
      "Live telemetry across 500 race miles",
    ],
    tech: "KiCad schematics / Wire harnessing / Telemetry hardware / RF integration / EMI-aware layout / Raspberry Pi integration",
    image: "/work-solar-car.png",
    imgW: 1584,
    imgH: 891,
  },
  {
    title: "Autonomous Driving CNN",
    org: "Data-Efficient Intelligent Learning Lab, UT Dallas",
    description:
      "Tuned an existing convolutional neural network with GridSearchCV as part of the lab's research team, reaching 95%+ accuracy classifying autonomous-driving images. Owned model validation: evaluated with F1-score and confusion matrices, visualized results in Seaborn, and presented the findings to faculty and graduate mentors.",
    highlights: [
      "95%+ classification accuracy",
      "Owned validation and metrics",
      "Presented to faculty and graduate mentors",
    ],
    tech: "Python / scikit-learn / GridSearchCV / Seaborn / Computer Vision",
    image: "/work-cnn.png",
    imgW: 952,
    imgH: 640,
  },
  {
    title: "Gym Form Classifier",
    org: "Deep-Dive AI Workshop, UT Dallas",
    description:
      "Co-developed a computer-vision gym-form classifier in Python with XGBoost, leading the experimentation, tuning, and evaluation. Built the pipeline end to end: extracted concentric rep times from lifting video using ArUco marker tracking, combined them with lifter attributes, and classified reps-in-reserve into three intensity bands. Placed top 10 of 40 projects.",
    highlights: [
      "Top 10 of 40 projects",
      "ArUco-based rep-time extraction",
      "Three-band reps-in-reserve classification",
    ],
    tech: "Python / XGBoost / Computer Vision",
    image: "/work-gym.png",
    imgW: 916,
    imgH: 834,
  },
];

const experience = [
  {
    role: "Electrical and Telemetry Lead",
    period: "2024 to 2026",
    org: "Plano Green Team, Solar Car Challenge. Safety Officer, 2023 to 2024",
    notes: [
      "Designed all 5 of the car's circuits in KiCad across three seasons and built each one out in hardware",
      "Built and installed the telemetry hardware that fed live race-strategy dashboards over 500 miles at Texas Motor Speedway",
      "Built the propulsion package: a 1,150 W solar array feeding a 5.2 kWh pack (52.1 V, 100 Ah) and motor, placed to keep EMI off the sensor and control lines",
      "Led and trained a 15-person electrical subteam, all first-time members",
      "Raised $50,000+ from 30+ sponsors across three seasons",
    ],
  },
  {
    role: "Research Intern, Machine Learning and Computer Vision",
    period: "Summer 2025",
    org: "Data-Efficient Intelligent Learning Lab, UT Dallas",
    notes: [
      "Tuned an existing CNN with GridSearchCV to 95%+ accuracy on autonomous-driving images",
      "Owned model validation with F1-score, confusion matrices, and Seaborn",
      "Presented findings to faculty and graduate mentors",
    ],
  },
  {
    role: "Research Intern, AI/ML",
    period: "Summer 2024",
    org: "Deep-Dive AI Workshop, UT Dallas",
    notes: [
      "Co-developed a gym-form classifier in Python with XGBoost, leading the experimentation, tuning, and evaluation",
      "Extracted concentric rep times from lifting video with ArUco marker tracking",
      "Placed top 10 of 40 projects",
    ],
  },
  {
    role: "STEM Instructor",
    period: "April 2025 to April 2026",
    org: "iCode School, Plano, TX",
    notes: [
      "Wrote the curriculum that took K-12 students from block coding to advanced Python and AI over a single year",
      "Ran hands-on robotics and drone labs, teaching hardware and software side by side rather than as separate units",
    ],
  },
  {
    role: "Leadership",
    period: "2023 to 2026",
    org: "Liberty High School",
    notes: [
      "Textbooks for Tomorrow (501(c)(3)), VP of Operations and Outreach: distributed 7,800+ books worth $65K across a 200+ volunteer operation",
      "National Honor Society, Chapter President: led 380+ members to 7,700+ annual volunteer hours",
      "Academic Decathlon, President: 3rd in Math in Texas at the 2025 State Finals",
    ],
  },
];

const skills = [
  {
    label: "Hardware / EE",
    items:
      "KiCad schematic design, wire harnessing and multi-family crimping, harness routing and strain relief, EMI-aware layout, driver-conscious placement, aluminum sheet metal fabrication, soldering, multimeter, Raspberry Pi integration",
  },
  {
    label: "Software",
    items: "Python, Java, Git/GitHub (branching, worktrees)",
  },
  {
    label: "Data / ML",
    items:
      "XGBoost, scikit-learn, GridSearchCV, Seaborn, model evaluation and visualization",
  },
];

const awards = [
  "Solar Car Challenge: 2nd, Advanced Classic Division, 2026. 4th in Nation, Advanced Classic Division, 2025. 4th in Nation, Advanced Division, 2024.",
  "Accepted and attended Y Combinator Startup School 2026; awarded $25,000+ in AI and cloud credits (OpenAI, Anthropic, AWS).",
  "UT Dallas Battle of the Brains coding competition, Advanced Division Finalist, 2025.",
  "BPA Nationals, Computer Networks.",
];

export default function Work() {
  return (
    <main>
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="page-shell">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <div className="mb-10 md:mb-12">
              <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-2xl">
                Work
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                These are the projects and roles that best show how I work. I
                like hands-on problems with clear goals.
              </p>
            </div>
          </motion.div>

          <div className="space-y-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.05 }}
              >
                <article className="grid md:grid-cols-[0.32fr_0.68fr] gap-4 border-t border-[var(--border)] pt-6">
                  <div>
                    <h3 className="font-display text-3xl leading-none">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{project.org}</p>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {project.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-1)]"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-text-muted">
                      {project.tech}
                    </p>
                    {project.image && (
                      <div className="mt-5 overflow-hidden rounded-md border border-[var(--border)]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={project.imgW}
                          height={project.imgH}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </article>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 section-divider"></div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="mt-12 mb-6">
              <h3 className="font-display text-3xl md:text-4xl leading-none">
                Experience
              </h3>
            </div>
          </motion.div>

          <div className="space-y-6">
            {experience.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.05 }}
              >
                <details className="border-t border-[var(--border)] pt-5">
                  <summary className="list-none cursor-pointer">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h4 className="font-display text-3xl leading-none">
                        {item.role}
                      </h4>
                      <span className="text-xs text-text-muted">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-muted">{item.org}</p>
                  </summary>
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {item.notes.map((note) => (
                        <li
                          key={note}
                          className="flex items-start gap-2 text-sm text-text-secondary"
                        >
                          <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-2)]"></span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 section-divider"></div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="mt-12 mb-6">
              <h3 className="font-display text-3xl md:text-4xl leading-none">
                Skills
              </h3>
            </div>
          </motion.div>

          <div className="space-y-6">
            {skills.map((group) => (
              <div
                key={group.label}
                className="border-t border-[var(--border)] pt-5"
              >
                <h4 className="font-display text-2xl leading-none">
                  {group.label}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {group.items}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 section-divider"></div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="mt-12 mb-6">
              <h3 className="font-display text-3xl md:text-4xl leading-none">
                Awards
              </h3>
            </div>
          </motion.div>

          <ul className="space-y-3 border-t border-[var(--border)] pt-5">
            {awards.map((award) => (
              <li
                key={award}
                className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--accent-1)]"></span>
                <span>{award}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
