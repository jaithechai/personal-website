import Hero from "@/components/va/Hero";
import About from "@/components/va/About";
import Projects from "@/components/va/Projects";
import Skills from "@/components/va/Skills";
import Experience from "@/components/va/Experience";
import Awards from "@/components/va/Awards";
import Contact from "@/components/va/Contact";
import Footer from "@/components/va/Footer";

export default function PosterPage() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
