import { skills } from "@/lib/content";

export default function Skills() {
  let n = 0;
  return (
    <section id="skills" className="pb-section pb-skills pb-pour">
      <div className="pb-wrap">
        <p className="pb-label pb-gold">SKILLS</p>
        <h2 className="pb-giant pb-giant-xl">Skills</h2>
        <div className="pb-bom-head pb-label" aria-hidden="true">
          <span>GROUP</span>
          <span>REF</span>
          <span>ITEM</span>
        </div>
        {skills.map((g) => (
          <div key={g.label} className="pb-bom-group">
            <h3 className="pb-bom-name">{g.label}</h3>
            <ul className="pb-bom-rows">
              {g.items.map((it) => {
                n += 1;
                return (
                  <li key={it} className="pb-bom-row">
                    <span className="pb-label pb-gold">S{String(n).padStart(2, "0")}</span>
                    <span>{it}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
