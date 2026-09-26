import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { About } from "@/components/About";
import { AiChat } from "@/components/AiChat";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { MobileActionBar } from "@/components/MobileActionBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="pb-20 sm:pb-0">
        <Hero />
        <Reveal>
          <Skills />
        </Reveal>
        <Suspense fallback={<section id="work" className="container-page py-16 sm:py-20" />}>
          <Projects />
        </Suspense>
        <Experience />
        <Education />
        <About />
        <Reveal>
          <AiChat />
        </Reveal>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
