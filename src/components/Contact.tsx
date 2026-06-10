"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "jai.dilbaghi@gmail.com",
    href: "mailto:jai.dilbaghi@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/jaidilbaghi",
    href: "https://linkedin.com/in/jaidilbaghi",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "/jaidilbaghi",
    href: "https://github.com/jaidilbaghi",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-20 border-t border-[var(--border)]">
      <div className="page-shell">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <div className="section-eyebrow mb-4">Contact</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-xl">
              Say hello, or send something interesting.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
              Email is the easiest way to reach me. I am open to internships, research, and
              projects that need someone to actually build them.
            </p>

            <div className="mt-8 grid gap-3">
              {socials.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card-bordered p-4 flex items-center gap-4 hover:border-[var(--accent-1)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)]">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                      {label}
                    </div>
                    <div className="truncate text-sm text-text-primary">{value}</div>
                  </div>
                  <ArrowRight size={14} className="text-text-muted" />
                </a>
              ))}
            </div>
          </div>

          <div className="card-bordered p-5">
            <div className="section-eyebrow mb-4">Message</div>

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <p className="font-display text-3xl">Sent.</p>
                <p className="mt-2 text-sm text-text-secondary">
                  I will get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="What are you building?"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary disabled:opacity-70"
                >
                  {status === "sending" ? "Sending" : "Send"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
