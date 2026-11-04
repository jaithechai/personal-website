import { projects, debugNote, experience, skills, awards } from "@/lib/content";
import { SymbolHeader, ProjectMedia } from "./Schematic";
import WorkBus from "./WorkBus";

function ProjectArticle({ index }: { index: number }) {
  const project = projects[index];
  return (
    <article id={project.id} className={`project project-${project.id}`}>
      <SymbolHeader project={project} />
      <div className="project-content">
        <ProjectMedia project={project} priority={index === 0} />
        <div className="project-copy">
          <p>{project.summary}</p>
          {project.details.map((text) => (
            <p key={text}>{text}</p>
          ))}
          {index === 0 && (
            <aside className="debug-note">
              <h3>Debug note: race-day throttle loss</h3>
              <p>{debugNote}</p>
            </aside>
          )}
          {project.links && (
            <ul className="project-links">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label} ↗</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
export default function Work() {
  return (
    <main id="main" className="page-shell">
      <div className="page-intro">
        <h1>Work</h1>
        <p className="lead">
          Circuits designed in KiCad, hardware tested on the race course, and
          models evaluated at UT Dallas.
        </p>
      </div>
      <WorkBus>
        <div className="project-stack">
          <ProjectArticle index={0} />
          <div className="pcb-pair">
            <ProjectArticle index={1} />
            <ProjectArticle index={2} />
          </div>
          <ProjectArticle index={3} />
          <div className="research-pair">
            <ProjectArticle index={4} />
            <ProjectArticle index={5} />
          </div>
        </div>
        <section className="section">
          <h2 className="bus-node">Experience</h2>
          <div className="experience-head bom-grid" aria-hidden="true">
            <span>Ref</span>
            <span>Role</span>
            <span>Org</span>
            <span>Dates</span>
          </div>
          <ol className="experience-list" role="list">
            {experience.map((item) => (
              <li key={item.ref} className="bom-grid">
                <span className="refdes">{item.ref}</span>
                <h3>{item.role}</h3>
                <div>
                  {item.org}
                  {item.notes.length > 0 && (
                    <ul
                      className={
                        item.ref === "E6"
                          ? "leadership-list"
                          : "experience-notes"
                      }
                    >
                      {item.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className="experience-dates">{item.dates}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="section">
          <h2 className="bus-node">Skills</h2>
          <dl className="skills">
            {skills.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items}</dd>
              </div>
            ))}
          </dl>
        </section>
        <h2 id="awards-heading" className="bus-node bus-end">
          Awards
        </h2>
      </WorkBus>
      <section className="awards-section" aria-labelledby="awards-heading">
        <ul className="award-list">
          {awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
