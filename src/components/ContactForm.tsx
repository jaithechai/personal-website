"use client";
import type { FormEvent } from "react";
import { EMAIL } from "@/lib/site";
export default function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Message from ${data.get("name")}`;
    const body = `${data.get("body")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <form
      className="contact-form"
      action={`mailto:${EMAIL}`}
      method="get"
      onSubmit={submit}
    >
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        autoComplete="name"
        placeholder="Your name"
        required
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="body"
        placeholder="Your message"
        rows={6}
        required
      />
      <button type="submit" className="button">
        Send
      </button>
      <p className="form-hint">
        Send opens your email app with this message filled in.
      </p>
    </form>
  );
}
