import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { fetchPortfolioProjects } from "@/lib/github";

export const revalidate = 3600; // Re-fetch GitHub data every hour

export default async function Home() {
  const projects = await fetchPortfolioProjects();

  return (
    <main className="bg-[#0a192f]">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects projects={projects} />
      <Contact />
      <Footer />
    </main>
  );
}
