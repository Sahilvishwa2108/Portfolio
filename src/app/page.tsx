import Certifications from "@/components/Certifications";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import About from "@/components/About";


export default function Home() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Hero/>
      <About/>
      <Experience/>
      <Certifications/>
      <RecentProjects/>
      <Footer/>
    </div>
  );
}

