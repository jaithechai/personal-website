import Link from "next/link";
import Image from "next/image";
import { projects, highlights } from "@/lib/content";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { SymbolHeader, ProjectMedia } from "./Schematic";

export default function Hero() {
  return (
    <main id="main" className="page-shell home-page">
      <section className="hero">
        <div className="hero-copy">
          <h1>Jai Dilbaghi</h1>
          <p className="lead">
            Electrical and computer engineering at UT Austin. I design circuits,
            build them, and debug them on the road.
          </p>
          <p>Looking for Summer 2027 internships and research.</p>
          <div className="actions">
            <Link href="/work" className="button">
              See work <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/contact" className="button secondary">
              Contact
            </Link>
          </div>
          <div className="social-links">
            <a href={GITHUB_URL}>GitHub</a>
            <a href={LINKEDIN_URL}>LinkedIn</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </div>
        </div>
        <div className="hero-photos">
          <figure className="photo-symbol portrait">
            <div className="photo-label">
              <span>J1</span>
              <span>Jai Dilbaghi</span>
            </div>
            <Image
              src="/headshot.jpg"
              alt="Jai Dilbaghi wearing a suit and tie in front of an orange wall."
              width={800}
              height={800}
              sizes="(max-width: 767px) 45vw, 200px"
              priority
            />
          </figure>
          <figure className="photo-symbol car">
            <div className="photo-label">
              <span>J2</span>
              <span>Plano Green Team</span>
            </div>
            <ProjectMedia project={projects[0]} />
          </figure>
        </div>
      </section>
      <section className="selected section" aria-labelledby="selected-work">
        <div className="section-heading selected-heading">
          <h2 id="selected-work">Selected work</h2>
          <Link href="/work">All work ↗</Link>
        </div>
        <article className="selected-operations">
          <Link href="/work#solar-car" className="symbol-link">
            <SymbolHeader project={projects[0]} linked />
          </Link>
          <div>
            <p>{projects[0].summary}</p>
            <Link href="/work#solar-car">Explore the electrical system ↗</Link>
          </div>
        </article>
        <div className="pcb-pair selected-pcbs">
          {projects.slice(1, 3).map((project) => (
            <article key={project.id}>
              <Link href={`/work#${project.id}`} className="symbol-link">
                <SymbolHeader project={project} linked />
              </Link>
              <ProjectMedia project={project} />
              <p>{project.summary}</p>
              <Link href={`/work#${project.id}`}>Explore the PCB ↗</Link>
            </article>
          ))}
        </div>
        <article className="selected-operations">
          <Link href="/work#agentic-operations" className="symbol-link">
            <SymbolHeader project={projects[3]} linked />
          </Link>
          <div>
            <p>{projects[3].summary}</p>
            <Link href="/work#agentic-operations">Explore the system ↗</Link>
          </div>
        </article>
      </section>
      <ul className="highlights">
        {highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
