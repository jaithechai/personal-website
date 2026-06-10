"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Solar Car Electrical System",
    org: "Plano Green Team",
    description:
      "Designed and built electrical systems for a competitive solar race car. I worked on telemetry, RF wireless steering, the propulsion path, and KiCad layouts. I also programmed a Raspberry Pi for live data and helped set up InfluxDB and Grafana dashboards for race strategy.",
    highlights: [
      "4th nationally in the Advanced Division",
      "$25K plus raised from sponsors",
      "Real time telemetry and dashboards",
    ],
    tech: "KiCad / Python / Raspberry Pi / InfluxDB / Grafana",
    image: "/work-solar-car.png",
    imgW: 1584,
    imgH: 891,
  },
  {
    title: "Autonomous Driving CNN",
    org: "UTD DEIL Lab",
    description:
      "Built a convolutional neural network from scratch for autonomous driving image classification. I tuned the model with GridSearchCV, reviewed results with F1 score and confusion matrices, and presented the work to faculty and graduate mentors. The project reached 95 percent plus accuracy and was recognized as a strong intern project.",
    highlights: [
      "95 percent plus accuracy",
      "Built from scratch",
      "Presented to mentors",
    ],
    tech: "Python / CNN / GridSearchCV / Computer Vision",
    image: "/work-cnn.png",
    imgW: 952,
    imgH: 640,
  },
  {
    title: "Real Time Gym Form Analyzer",
    org: "UTD Deep Dive AI Workshop",
    description:
      "Co-built a computer vision system that analyzes workout form in real time and gives feedback from video input. I worked in Python with XGBoost, tested multiple datasets, and helped tune the model before presenting it to graduate students and professors. The project finished top 10 out of 40.",
    highlights: [
      "Top 10 of 40 projects",
      "Real time feedback",
      "Multi dataset testing",
    ],
    tech: "Python / XGBoost / Computer Vision",
    image: "/work-gym.png",
    imgW: 916,
    imgH: 834,
  },
  {
    title: "Green Portfolio Project Website",
    org: "Website Developer, internship",
    description:
      "Worked on a website for aspiring young entrepreneurs. I helped structure the site in HTML, kept the pages easy to navigate, and worked with the team as the project changed.",
    highlights: [
      "HTML structure and navigation",
      "Team collaboration",
      "Work in progress",
    ],
    tech: "HTML / CSS / Responsive Design",
    image: "/work-green-portfolio.png",
    imgW: 955,
    imgH: 499,
  },
];

const experience = [
  {
    role: "Electrical and Telemetry Lead",
    period: "2023 to present",
    org: "Plano Green Team",
    notes: [
      "Built telemetry, RF steering, and propulsion support",
      "Worked on live dashboards for race day decisions",
      "Raised funds through sponsor outreach",
    ],
  },
  {
    role: "Website Developer",
    period: "Mar 2024 to Aug 2024",
    org: "Green Portfolio Project",
    notes: [
      "Structured the site in HTML and CSS",
      "Helped keep the project organized across the team",
      "Focused on a simple, accessible build",
    ],
  },
  {
    role: "iCode",
    period: "2025 to present",
    org: "iCode",
    notes: [
      "Started in 2025",
      "Continued building around student technology work",
      "Kept my coding work tied to real people and real classes",
    ],
  },
  {
    role: "ML and Computer Vision Research Intern",
    period: "2025",
    org: "UT Dallas, DEIL Lab",
    notes: [
      "Built a CNN from scratch",
      "Reached 95 percent plus accuracy",
      "Presented the project to faculty and mentors",
    ],
  },
  {
    role: "AI and ML Research Intern",
    period: "2024",
    org: "UT Dallas, Deep Dive Workshop",
    notes: [
      "Co-built the gym form project",
      "Used Python and XGBoost",
      "Placed top 10 out of 40",
    ],
  },
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
        </div>
      </section>
    </main>
  );
}
