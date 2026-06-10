"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Code2, Cpu, Github, Linkedin, Mail, BookOpen } from "lucide-react";
import Image from "next/image";

const chips = [
  { icon: Cpu, text: "Solar car" },
  { icon: BookOpen, text: "Research" },
  { icon: Code2, text: "Web projects" },
];

const facts = [
  { value: "ECE", label: "UT Austin, class of 2030" },
  { value: "1540", label: "SAT, 790 math and 750 reading" },
  { value: "18", label: "AP courses" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/jaidilbaghi" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/jaidilbaghi" },
  { icon: Mail, label: "Email", href: "mailto:jai.dilbaghi@gmail.com" },
];

export default function Hero() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="page-shell">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {chips.map(({ icon: Icon, text }) => (
                <span key={text} className="tag tag-accent">
                  <Icon size={11} />
                  {text}
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-6xl md:text-7xl leading-[0.92] tracking-tight max-w-2xl"
            >
              Small teams.
              <br />
              Real systems.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-text-secondary"
            >
              I&apos;m Jai, a freshman in ECE at UT Austin. I spend my time on solar cars, research,
              teaching, and building web tools for people who are actually going to use them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#work" className="btn-primary">
                See work <ArrowRight size={15} />
              </a>
              <a href="#contact" className="btn-secondary">
                Contact
              </a>
              <a href="/resume.pdf" className="btn-secondary" download>
                Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.22 }}
              className="mt-8 flex items-center gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
                Links
              </span>
              <div className="h-px w-10 bg-[var(--border)]" />
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-text-muted hover:text-text-primary"
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="relative"
            >
              <div className="relative w-full max-w-md overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-card)]">
                <Image
                  src="/headshot.jpg"
                  alt="Jai Dilbaghi portrait"
                  width={640}
                  height={640}
                  priority
                  className="h-auto w-full object-cover object-top"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {facts.map(({ value, label }) => (
                <div key={label} className="card-bordered p-4">
                  <div className="font-display text-3xl leading-none">{value}</div>
                  <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.14em] text-text-muted">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="card-bordered p-4"
            >
              <p className="text-sm leading-relaxed text-text-secondary">
                Open to internships, research, and project work.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={scrollToWork}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted"
          aria-label="Scroll to work"
        >
          <ChevronDown size={15} />
          Scroll
        </motion.button>
      </div>
    </section>
  );
}
