"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main>
      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="page-shell">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div>
              <h2 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-xl">
                Contact
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                Email is the easiest way to reach me. I am open to internships,
                research, and project work.
              </p>
              <div className="mt-8 space-y-3">
                <a
                  href="mailto:jai.dilbaghi@gmail.com"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3 text-sm"
                >
                  <span className="w-20 text-text-muted">Email</span>
                  <span className="text-text-primary group-hover:text-[var(--accent-1)]">
                    jai.dilbaghi@gmail.com
                  </span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3 text-sm"
                >
                  <span className="w-20 text-text-muted">LinkedIn</span>
                  <span className="text-text-primary group-hover:text-[var(--accent-1)]">
                    /in/jai-dilbaghi-a0996a289
                  </span>
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3 text-sm"
                >
                  <span className="w-20 text-text-muted">GitHub</span>
                  <span className="text-text-primary group-hover:text-[var(--accent-1)]">
                    /jaithechai
                  </span>
                </a>
              </div>
            </div>
            <div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                    Name
                  </label>
                  <input
                    className="input-field"
                    placeholder="Your name"
                    required
                    name="name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setName(e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="you@example.com"
                    required
                    name="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.18em] text-text-muted">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="input-field resize-none"
                    placeholder="What are you building?"
                    required
                    value={message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setMessage(e.target.value)
                    }
                  />
                </div>
                <button type="submit" className="btn-primary disabled:opacity-70">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
