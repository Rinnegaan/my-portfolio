import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import CyberProfile from "@/components/sections/CyberProfile";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <CyberProfile />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
