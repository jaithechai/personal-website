"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "@/lib/site";

export default function Hero() {
  return (
    <main>
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="page-shell">
          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-14 items-center">
            <div>
              <motion.h1
                className="font-display text-6xl md:text-7xl leading-[0.92] tracking-tight max-w-2xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                About Me
              </motion.h1>
              <motion.p
                className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-text-secondary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                I&apos;m Jai, a freshman studying ECE at UT Austin. I like building
                things that have a clear use, especially solar car systems,
                research projects, and web tools.
              </motion.p>
              <motion.p
                className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-text-secondary"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
              >
                I care about doing useful work, learning quickly, and being part
                of teams where people depend on each other.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                <a className="btn-primary" href="/work">
                  See work <ArrowRight size={15} className="lucide lucide-arrow-right" />
                </a>
                <a className="btn-secondary" href="/contact">
                  Contact
                </a>
                <a
                  href={RESUME_URL}
                  className="btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </motion.div>
              <motion.div
                className="mt-8 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-text-muted">
                  Links
                </span>
                <div className="h-px w-10 bg-[var(--border)]"></div>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-text-muted hover:text-text-primary"
                >
                  <Github size={15} className="lucide lucide-github" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-text-muted hover:text-text-primary"
                >
                  <Linkedin size={15} className="lucide lucide-linkedin" />
                </a>
                <a
                  href="mailto:jai.dilbaghi@gmail.com"
                  rel="noopener noreferrer"
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center border border-[var(--border)] text-text-muted hover:text-text-primary"
                >
                  <Mail size={15} className="lucide lucide-mail" />
                </a>
              </motion.div>
            </div>
            <div className="flex flex-col gap-5 lg:pt-1">
              <motion.div
                className="relative lg:self-start"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                <div className="relative w-full max-w-sm overflow-hidden">
                  <Image
                    alt="Jai Dilbaghi portrait"
                    width={640}
                    height={640}
                    priority
                    src="/headshot.jpg"
                    className="h-auto w-full object-cover object-top"
                  />
                </div>
              </motion.div>
              <motion.div
                className="max-w-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
              >
                <ul className="space-y-2 text-sm leading-relaxed text-text-secondary">
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-1)]"></span>
                    <span>ECE at UT Austin, class of 2030</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-1)]"></span>
                    <span>Electrical and telemetry lead on Plano Green Team</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-1)]"></span>
                    <span>
                      Research experience in computer vision and machine learning
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 bg-[var(--accent-1)]"></span>
                    <span>SAT 1540 and 18 AP courses</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
