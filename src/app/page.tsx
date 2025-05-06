"use client";

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import { Navbar } from '@/components/Navbar';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import TechnicalSkills from '@/components/TechnicalSkills';
import RecentProjects from '@/components/RecentProjects';
import Experience from '@/components/Experience';
import { Achievements } from '@/components/Achievements'; // Fixed import
import Footer from '@/components/Footer';

export default function Home() {
  // Add any global animation or sizing logic
  useEffect(() => {
    // Add any global animations or effects here
  }, []);

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <TechnicalSkills />
      <Timeline />
      <RecentProjects />
      <Experience />
      <Achievements /> 
      <Footer />
    </main>
  );
}
