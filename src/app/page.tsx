"use client";

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ScrollSection } from '@/components/ui/scroll-section';
import { PageTransition } from '@/components/ui/page-transition';
import Hero from '@/components/Hero';
import About from '@/components/About';

// Dynamically import heavy components
const TechnicalSkills = dynamic(() => import('@/components/TechnicalSkills'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-10 h-10 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
  </div>,
  ssr: true
});

const Timeline = dynamic(() => import('@/components/Timeline'), {
  loading: () => <div className="min-h-[300px]"></div>,
  ssr: true
});

const RecentProjects = dynamic(() => import('@/components/RecentProjects'), {
  ssr: true
});

const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: true
});

const Achievements = dynamic(() => import('@/components/Achievements').then(mod => mod.Achievements), {
  ssr: false
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true
});

export default function Home() {
  // Add smooth scrolling behavior
  useEffect(() => {
    // Performance optimization - load non-critical resources after initial render
    const loadNonCriticalResources = () => {
      // Preload images or other resources here
      const preloadImages = [
        '/your-profile-image.jpg',
        // Add other critical images here
      ];
      
      preloadImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    // Use requestIdleCallback for non-critical tasks
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNonCriticalResources);
    } else {
      setTimeout(loadNonCriticalResources, 2000);
    }
    
    // Ensure smooth anchor scrolling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Calculate offset for fixed header
        const navHeight = document.querySelector('nav')?.offsetHeight || 0;
        const offset = navHeight + 24;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col overflow-hidden">
        <ScrollProgress />
        <Navbar />
        
        <section id="hero" className="relative animated-gradient">
          <Hero />
        </section>
        
        <ScrollSection id="about" animation="fade" className="relative">
          <div className="animated-gradient absolute inset-0 opacity-10"></div>
          <About />
        </ScrollSection>
        
        <ScrollSection id="skills" animation="slide-up">
          <TechnicalSkills />
        </ScrollSection>
        
        <ScrollSection id="timeline" animation="fade">
          <Timeline />
        </ScrollSection>
        
        <ScrollSection id="recent-projects" animation="slide-up">
          <div className="animated-gradient absolute inset-0 opacity-5"></div>
          <RecentProjects />
        </ScrollSection>
        
        <ScrollSection id="experience" animation="fade">
          <Experience />
        </ScrollSection>
        
        <ScrollSection id="achievements" animation="slide-up">
          <Achievements />
        </ScrollSection>
        
        <Footer />
      </main>
    </PageTransition>
  );
}
