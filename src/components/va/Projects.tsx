import Image from "next/image";
import { person, projects } from "@/lib/content";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Projects() {
  const total = projects.length;
  return (
    <section id="projects" className="pa-projects" aria-labelledby="pa-projects-h">
      <div className="pa-card pa-card--paper pa-card--head">
        <div className="pa-card-in">
          <p className="pa-mono pa-card-count">Projects</p>
          <h2 id="pa-projects-h" className="pa-display pa-head-title">
            Six projects
          </h2>
          <p className="pa-mono pa-head-sub">{person.workIntro}</p>
        </div>
      </div>

      {projects.map((p, i) => {
        const tone = i % 2 === 0 ? "ink" : "paper";
        return (
          <article key={p.id} className={`pa-card pa-card--${tone}`} data-pa-view>
            <Reveal i={i}>
              <div className="pa-card-top pa-mono">
                <span>
                  {p.org}
                  {p.dates ? ` · ${p.dates}` : ""}
                </span>
                <span>
                  PROJECTS {pad(i + 1)} / {pad(total)}
                </span>
              </div>
              <h3 className="pa-display pa-card-name">
                <span aria-hidden="true">{p.shortName}</span>
                <span className="pa-sr">{p.name}</span>
              </h3>
              <div className="pa-card-grid">
                <div className="pa-card-col">
                  <p className="pa-card-desc">{p.description}</p>
                  <ul className="pa-tags" aria-label="Tags">
                    {p.tags.map((t) => (
                      <li key={t} className="pa-mono">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {p.links.length > 0 && (
                    <p className="pa-card-links pa-mono">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.label} ↗
                        </a>
                      ))}
                    </p>
                  )}
                </div>
                <div className="pa-card-col">
                  {p.image && p.imageSize && (
                    <figure className="pa-frame">
                      <Image
                        src={p.image}
                        alt={`${p.name}`}
                        width={p.imageSize.width}
                        height={p.imageSize.height}
                        sizes="(max-width: 1000px) 90vw, 40vw"
                      />
                    </figure>
                  )}
                  <ul className="pa-card-facts">
                    {p.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </article>
        );
      })}
    </section>
  );
}
