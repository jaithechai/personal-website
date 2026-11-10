import { awards } from "@/lib/content";

export default function Awards() {
  return (
    <section id="awards" className="pb-section pb-awards">
      <div className="pb-wrap">
        <p className="pb-label pb-gold">AWARDS</p>
        <h2 className="pb-giant pb-giant-xl">Awards</h2>
      </div>
      {/* The list is rendered twice so the loop has no seam; the second copy is hidden from screen readers. */}
      <div className="pb-tp-row">
        <ul className="pb-tp-track" aria-label="Awards">
        {[...awards, ...awards].map((a, n) => { const i = n % awards.length; return (
          <li key={n} className="pb-tp" aria-hidden={n >= awards.length || undefined}>
            <svg className="pb-tp-pad" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="28" className="pb-tp-ring" />
              <circle cx="32" cy="32" r="12" className="pb-tp-hole" />
            </svg>
            <span className="pb-label">TP{i + 1}</span>
            <h3 className="pb-tp-name">{a.name}</h3>
            <p className="pb-tp-detail">{a.detail}</p>
            {a.year && <p className="pb-label">{a.year}</p>}
          </li>
        ); })}
        </ul>
      </div>
    </section>
  );
}
