import {Achivements} from "@/components/Achivements";
import {Certifications} from "@/components/Certifications";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import About from "@/components/About";
import { MacbookScrollDemo } from "@/components/Macbook-scroll";
import {AnimatedContainer} from "@/components/ui/AnimatedContainer";
import { TimelineDemo } from "@/components/Timeline";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="macbook-scroll-demo">
        <MacbookScrollDemo />
      </section>
      <AnimatedContainer reverse={false} direction="vertical" distance={100}>
        <section id="experience">
          <Experience />
        </section>
      </AnimatedContainer>
      <AnimatedContainer reverse={false} direction="vertical" distance={100}>
        <section id="timeline">
          <TimelineDemo />
        </section>
      </AnimatedContainer>
      <section id="achievements">
        <Achivements />
      </section>
      <section id="certifications">
        <Certifications />
      </section>
      <AnimatedContainer reverse={false} direction="vertical" distance={100}>
        <section id="recent-projects">
          <RecentProjects />
        </section>
      </AnimatedContainer>
      <section id="contact">
        <Contact />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
