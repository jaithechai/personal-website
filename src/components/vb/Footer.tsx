import { person, contact, GITHUB_URL, LINKEDIN_URL } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="pb-footer">
      <i className="pb-hole pb-hole-tl" aria-hidden="true" />
      <i className="pb-hole pb-hole-tr" aria-hidden="true" />
      <i className="pb-hole pb-hole-bl" aria-hidden="true" />
      <i className="pb-hole pb-hole-br" aria-hidden="true" />
      <p className="pb-giant pb-foot-name">{person.name.toUpperCase()}</p>
      <p className="pb-label pb-foot-line">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        <span aria-hidden="true"> · </span>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span aria-hidden="true"> · </span>
        <a href={`mailto:${contact.mailto.to}`}>Email</a>
      </p>
      <a href="#" data-top className="pb-top">
        <span aria-hidden="true">↑</span> Back to top
      </a>
    </footer>
  );
}
