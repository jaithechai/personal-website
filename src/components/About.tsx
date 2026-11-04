import { education, timeline } from "@/lib/content";
export default function About() {
  return (
    <main id="main" className="page-shell">
      <div className="page-intro">
        <h1>About</h1>
        <p className="lead">
          I study electrical and computer engineering at UT Austin. On Plano
          Green Team, I took circuits from KiCad schematics to a solar car that
          raced across Texas.
        </p>
      </div>
      <div className="about-layout">
        <section>
          <h2>At a glance</h2>
          <ul className="glance-list">
            <li>{education}</li>
            <li>Austin, TX.</li>
            <li>
              Electrical Lead, Plano Green Team, 2024 to 2026. Safety Officer,
              2023 to 2024.
            </li>
            <li>Machine learning and computer vision research at UT Dallas.</li>
            <li>
              Led a 15-person electrical subteam and raised $50,000+ from 30+
              sponsors across three seasons. 4th in Nation in 2024 and 2025.
            </li>
          </ul>
        </section>
        <section>
          <h2>Revision History</h2>
          <table className="revision-table">
            <thead>
              <tr>
                <th scope="col">Rev year</th>
                <th scope="col">Change</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((entry) => (
                <tr key={entry.year}>
                  <th scope="row">{entry.year}</th>
                  <td>{entry.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
