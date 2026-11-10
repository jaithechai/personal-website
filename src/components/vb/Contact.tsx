"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { contact } from "@/lib/content";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Message from ${name}`;
    const body = `${message}\n\nFrom: ${name} <${email}>`;
    window.location.href = `mailto:${contact.mailto.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const f = contact.form.fields;
  return (
    <section id="contact" className="pb-section pb-contact pb-pour">
      <div className="pb-wrap">
        <p className="pb-label pb-gold">J1</p>
        <h2 className="pb-giant pb-giant-xl">{contact.heading}</h2>
        <p className="pb-body">{contact.helper}</p>
        <div className="pb-j1">
          <svg className="pb-header-gfx" viewBox="0 0 48 150" aria-hidden="true">
            <rect x="2" y="2" width="44" height="146" className="pb-hdr-body" />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x="12" y={14 + i * 46} width="24" height="24" className="pb-hdr-pad" />
                <circle cx="24" cy={26 + i * 46} r="5" className="pb-via-hole" />
              </g>
            ))}
          </svg>
          <ul className="pb-pinlinks">
            {contact.rows.map((r, i) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="pb-pinlink"
                >
                  <i className="pb-sq" aria-hidden="true" />
                  <span className="pb-label">
                    PIN {i + 1} {r.label.toUpperCase()}
                  </span>
                  <span className="pb-pinlink-val">{r.display}</span>
                  <ArrowUpRight aria-hidden="true" size={26} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="pb-form" onSubmit={handleSubmit}>
          <label className="pb-field">
            <span className="pb-label">{f[0].label}</span>
            <input
              className="pb-input"
              placeholder={f[0].placeholder}
              required
              name="name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </label>
          <label className="pb-field">
            <span className="pb-label">{f[1].label}</span>
            <input
              type="email"
              className="pb-input"
              placeholder={f[1].placeholder}
              required
              name="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </label>
          <label className="pb-field pb-field-wide">
            <span className="pb-label">{f[2].label}</span>
            <textarea
              name="message"
              rows={5}
              className="pb-input"
              placeholder={f[2].placeholder}
              required
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            />
          </label>
          <div className="pb-field-wide pb-form-foot">
            <button type="submit" className="pb-btn">
              {contact.form.submitLabel}
            </button>
            <p className="pb-note">{contact.form.note}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
