import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RecruiterPanel } from "@/components/RecruiterPanel";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <RecruiterPanel />
        <Projects />
        <Experience />
        <About />
      </main>
      <Footer />
    </>
  );
}
