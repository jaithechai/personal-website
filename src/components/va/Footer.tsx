import { person, contact } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="pa-footer">
      <p className="pa-footer-line pa-mono">
        <span>
          {contact.rows.map((r, i) => (
            <span key={r.label}>
              {i > 0 && " · "}
              <a
                href={r.href}
                {...(r.href.startsWith("mailto:")
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
              >
                {r.label}
              </a>
            </span>
          ))}
        </span>
      </p>
      <p className="pa-footer-name pa-display" aria-hidden="true">
        {person.name}
      </p>
    </footer>
  );
}
