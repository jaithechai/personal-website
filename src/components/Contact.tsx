import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import ContactForm from "./ContactForm";
export default function Contact() {
  return (
    <main id="main" className="page-shell">
      <div className="page-intro">
        <h1>Contact</h1>
        <p className="lead">
          Looking for Summer 2027 internships and research.
        </p>
      </div>
      <div className="contact-layout">
        <div>
          <h2>Get in touch</h2>
          <p>Email is the easiest way to reach me.</p>
          <dl className="contact-links">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>LinkedIn</dt>
              <dd>
                <a href={LINKEDIN_URL}>/in/jaidilbaghi ↗</a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href={GITHUB_URL}>/jaithechai ↗</a>
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
