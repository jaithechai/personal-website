import { skills } from "@/lib/content";

export default function Skills() {
  let n = 0;
  return (
    <section id="skills" className="pa-skills" aria-labelledby="pa-skills-h">
      <h2 id="pa-skills-h" className="pa-mono pa-label pa-skills-label">
        Skills
      </h2>
      {skills.map((g) => (
        <div key={g.label} className="pa-skill-row">
          <h3 className="pa-display pa-skill-name">{g.label}</h3>
          <ol className="pa-skill-list">
            {g.items.map((it) => {
              n += 1;
              return (
                <li key={it}>
                  <span className="pa-skill-item">{it}</span>
                  <span className="pa-mono pa-skill-idx">[{String(n).padStart(2, "0")}]</span>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </section>
  );
}
