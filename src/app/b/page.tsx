import Board from "@/components/vb/Board";
import Hero from "@/components/vb/Hero";
import MainTrace from "@/components/vb/MainTrace";
import About from "@/components/vb/About";
import Projects from "@/components/vb/Projects";
import Skills from "@/components/vb/Skills";
import Experience from "@/components/vb/Experience";
import Awards from "@/components/vb/Awards";
import Contact from "@/components/vb/Contact";
import Footer from "@/components/vb/Footer";

export default function BoardPage() {
  return (
    <Board>
      <main>
        <Hero />
        <div className="pb-after">
          <MainTrace />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Awards />
          <Contact />
        </div>
      </main>
      <Footer />
    </Board>
  );
}
