"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Brain,
  Car,
  Code2,
  GraduationCap,
  School,
  Users,
  Wrench,
} from "lucide-react";

const projects = [
  {
    title: "Solar Car Electrical System",
    subtitle: "Plano Green Team",
    icon: Car,
    color: "warm",
    description:
      "Designed and built the electrical architecture for a competitive solar race car. That includes telemetry, RF wireless steering, and the main propulsion path, all laid out in KiCad. I also programmed a Raspberry Pi for live data, wired InfluxDB and Grafana dashboards, and used telemetry to help guide race strategy across 500 miles at Texas Motor Speedway.",
    bullets: [
      "4th nationally in the Advanced Division",
      "$25K plus raised from sponsors",
      "Real time telemetry and dashboards",
    ],
    tags: ["KiCad", "Python", "Raspberry Pi", "InfluxDB", "Grafana"],
  },
  {
    title: "Autonomous Driving CNN",
    subtitle: "UTD DEIL Lab",
    icon: Brain,
    color: "accent",
    description:
      "Built a convolutional neural network from scratch for autonomous driving image classification. I tuned the model with GridSearchCV, reviewed results with F1 score and confusion matrices, and presented the work to faculty and graduate mentors. The project reached 95 percent plus accuracy and was recognized as a strong intern project.",
    bullets: ["95 percent plus accuracy", "Built from scratch", "Presented to mentors"],
    tags: ["Python", "CNN", "GridSearchCV", "Computer Vision"],
  },
  {
    title: "Real Time Gym Form Analyzer",
    subtitle: "UTD Deep Dive AI Workshop",
    icon: Wrench,
    color: "accent",
    description:
      "Co built a computer vision system that analyzes workout form in real time and gives feedback from video input. I worked in Python with XGBoost, tested multiple datasets, and helped tune the model before presenting it to graduate students and professors. The project finished top 10 out of 40.",
    bullets: ["Top 10 of 40 projects", "Real time feedback", "Multi dataset testing"],
    tags: ["Python", "XGBoost", "Computer Vision"],
  },
  {
    title: "Green Portfolio Project Website",
    subtitle: "Website Developer, internship",
    icon: Code2,
    color: "warm",
    description:
      "As a website developer for the Green Portfolio Project, I helped shape an engaging platform for aspiring young entrepreneurs. I worked with the team to structure the site in HTML, keep it easy to navigate across devices, and support the overall build with communication and adaptability. The site is still a work in progress, but the goal is clear, give high schoolers a place with useful resources and real connections.",
    bullets: ["HTML structure and navigation", "Team collaboration", "Work in progress"],
    tags: ["HTML", "CSS", "Responsive Design"],
  },
];

const experience = [
  {
    role: "Electrical and Telemetry Lead",
    org: "Plano Green Team",
    period: "2023 to present",
    icon: Car,
    notes: [
      "Built telemetry, RF steering, and propulsion support",
      "Worked on live dashboards for race day decisions",
      "Raised funds through sponsor outreach",
    ],
  },
  {
    role: "Website Developer",
    org: "Green Portfolio Project",
    period: "Mar 2024 to Aug 2024",
    icon: Code2,
    notes: [
      "Structured the site in HTML and CSS",
      "Helped keep the project organized across the team",
      "Focused on a simple, accessible build",
    ],
  },
  {
    role: "iCode",
    org: "iCode",
    period: "2025 to present",
    icon: GraduationCap,
    notes: [
      "Started in 2025",
      "Continued building around student technology work",
      "Kept my coding work tied to real people and real classes",
    ],
  },
  {
    role: "ML and Computer Vision Research Intern",
    org: "UT Dallas, DEIL Lab",
    period: "2025",
    icon: Brain,
    notes: [
      "Built a CNN from scratch",
      "Reached 95 percent plus accuracy",
      "Presented the project to faculty and mentors",
    ],
  },
  {
    role: "AI and ML Research Intern",
    org: "UT Dallas, Deep Dive Workshop",
    period: "2024",
    icon: Users,
    notes: [
      "Co built the gym form project",
      "Used Python and XGBoost",
      "Placed top 10 out of 40",
    ],
  },
];

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Work() {
  return (
    <section id="work" className="py-16 md:py-20 border-t border-[var(--border)]">
      <div className="page-shell">
        <FadeIn>
          <div className="mb-10 md:mb-12">
            <div className="section-eyebrow mb-4">Work</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-2xl">
              A few things I have actually shipped.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              These are the projects and roles that say the most about how I like to work, hands
              on, practical, and tied to something useful.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <FadeIn key={project.title} delay={index * 0.04}>
                <article className="card-bordered p-5 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)]">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-display text-3xl leading-none">{project.title}</h3>
                        <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-text-muted" />
                  </div>

                  <p className="text-sm leading-relaxed text-text-secondary">{project.description}</p>

                  <ul className="mt-4 space-y-2">
                    {project.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-1)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`tag ${project.color === "warm" ? "tag-warm" : "tag-accent"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-12 section-divider" />

        <FadeIn>
          <div className="mt-12 mb-6">
            <div className="section-eyebrow mb-4">Experience</div>
            <h3 className="font-display text-3xl md:text-4xl leading-none">Where I have spent time.</h3>
          </div>
        </FadeIn>

        <div className="grid gap-4">
          {experience.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.role} delay={index * 0.04}>
                <details className="card-bordered p-5">
                  <summary className="list-none cursor-pointer flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)]">
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h4 className="font-display text-3xl leading-none">{item.role}</h4>
                        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                          {item.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-mono uppercase tracking-[0.16em] text-text-muted">
                        {item.org}
                      </p>
                    </div>
                  </summary>

                  <div className="mt-4 pl-14">
                    <ul className="space-y-2">
                      {item.notes.map((note) => (
                        <li key={note} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-2)]" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
