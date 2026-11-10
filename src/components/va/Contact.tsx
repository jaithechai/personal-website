"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/lib/content";

const fill = (t: string, v: Record<string, string>) =>
  t.replace(/\{(\w+)\}/g, (_, k: string) => v[k] ?? "");

export default function Contact() {
  const [v, setV] = useState<Record<string, string>>({ name: "", email: "", message: "" });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = fill(contact.mailto.subjectTemplate, v);
    const body = fill(contact.mailto.bodyTemplate, v);
    window.location.href = `mailto:${contact.mailto.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="pa-contact" aria-labelledby="pa-contact-h">
      <p className="pa-mono pa-label">Contact</p>
      <h2 id="pa-contact-h" className="pa-display pa-contact-h">
        Contact
      </h2>
      <p className="pa-contact-helper">{contact.helper}</p>

      <ul className="pa-links">
        {contact.rows.map((r) => {
          const ext = !r.href.startsWith("mailto:");
          return (
            <li key={r.label}>
              <a
                href={r.href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="pa-mono">{r.label}</span>
                <span className="pa-links-val">{r.display}</span>
                <span className="pa-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <form className="pa-form" onSubmit={submit}>
        {contact.form.fields.map((f) => {
          const common = {
            id: `pa-f-${f.name}`,
            name: f.name,
            placeholder: f.placeholder,
            required: true,
            value: v[f.name],
            onChange: (e: { target: { value: string } }) =>
              setV((s) => ({ ...s, [f.name]: e.target.value })),
          };
          return (
            <div key={f.name} className={f.name === "message" ? "pa-field pa-field--wide" : "pa-field"}>
              <label className="pa-mono" htmlFor={common.id}>
                {f.label}
              </label>
              {f.name === "message" ? (
                <textarea rows={5} {...common} />
              ) : (
                <input type={f.name === "email" ? "email" : "text"} {...common} />
              )}
            </div>
          );
        })}
        <div className="pa-form-foot">
          <button type="submit" className="pa-btn pa-mono">
            {contact.form.submitLabel}
          </button>
          <p className="pa-form-note">{contact.form.note}</p>
        </div>
      </form>
    </section>
  );
}
