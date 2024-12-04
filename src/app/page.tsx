import Certifications from "@/components/Certifications";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <Hero/>
      <Experience/>
      <Certifications/>
      <RecentProjects/>
      <Footer/>
    </div>
  );
}

