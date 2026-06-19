import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingPortfolioNav from "@/components/FloatingPortfolioNav";
import { fetchMergedProjects } from "@/lib/github";

export const revalidate = 3600; // Re-fetch GitHub data every hour

export default async function Home() {
  const projects = await fetchMergedProjects();

  return (
    <main className="portfolio-bg portfolio-grid-overlay portfolio-page-shell">
      <FloatingPortfolioNav />
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
