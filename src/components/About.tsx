"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Cpu, GraduationCap, Lightbulb, Rocket, School, Users } from "lucide-react";

const focusCards = [
  {
    icon: Cpu,
    title: "Solar car",
    text: "Electrical and telemetry lead on Plano Green Team. Built circuits, dashboards, and radio control. The team is unaffiliated from Liberty High School.",
  },
  {
    icon: BookOpen,
    title: "Research",
    text: "Worked on computer vision and machine learning projects at UTD labs, with a focus on useful results and clean presentation.",
  },
  {
    icon: Rocket,
    title: "Web work",
    text: "Built the Green Portfolio Project site and started an iCode role in 2025.",
  },
  {
    icon: GraduationCap,
    title: "School",
    text: "Freshman in UT Austin ECE, class of 2030. SAT 1540. Took 18 AP courses.",
  },
];

const timelineEvents = [
  {
    year: "2023",
    title: "Joined Plano Green Team",
    text: "Started working on the solar car as Safety Officer, then moved into electrical systems, telemetry, and race support.",
    icon: Cpu,
  },
  {
    year: "2024",
    title: "UTD workshop project",
    text: "Co-built a real time gym form system with Python and XGBoost, then presented it to graduate students and professors.",
    icon: Lightbulb,
  },
  {
    year: "2024",
    title: "Solar car results",
    text: "Helped the team finish 4th nationally while raising more than $25K from sponsors.",
    icon: Users,
  },
  {
    year: "2024",
    title: "Green Portfolio Project",
    text: "Worked as a website developer on a project for aspiring young entrepreneurs. Focused on HTML structure, communication, and adaptability.",
    icon: Rocket,
  },
  {
    year: "2025",
    title: "UTD DEIL Lab",
    text: "Built a CNN from scratch for autonomous driving image classification and reached 95% plus accuracy.",
    icon: BookOpen,
  },
  {
    year: "2025",
    title: "iCode",
    text: "Started work in 2025 and kept building around coding, teaching, and student support.",
    icon: School,
  },
  {
    year: "2026",
    title: "UT Austin",
    text: "Started ECE at UT Austin as a freshman, class of 2030.",
    icon: GraduationCap,
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
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="page-shell">
        <FadeIn>
          <div className="mb-10 md:mb-12">
            <div className="section-eyebrow mb-4">About</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-2xl">
              A few things I keep coming back to.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              I like work that has a real job to do. Solar cars, research, websites, and student
              tools all fit that idea for me.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <div className="space-y-4">
            <FadeIn delay={0.05}>
              <div className="grid sm:grid-cols-2 gap-4">
                {focusCards.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="card-bordered p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)]">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-display text-2xl">{title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-text-secondary">{text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="card-bordered p-5">
                <div className="section-eyebrow mb-3">At a glance</div>
                <p className="text-sm leading-relaxed text-text-secondary">
                  SAT 1540. 18 AP courses. UT Austin ECE, class of 2030.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.08}>
            <div className="relative pl-5">
              <div className="timeline-line" />
              <div className="space-y-5">
                {timelineEvents.map((event) => {
                  const Icon = event.icon;
                  return (
                    <div key={`${event.year}-${event.title}`} className="relative pl-5">
                      <div className="absolute left-0 top-1.5 timeline-dot" />
                      <div className="card-bordered p-4">
                        <div className="flex flex-wrap items-baseline gap-3 mb-2">
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                            {event.year}
                          </span>
                          <h3 className="font-display text-2xl">{event.title}</h3>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-8 w-8 items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)]">
                            <Icon size={14} />
                          </div>
                          <p className="text-sm leading-relaxed text-text-secondary">{event.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
