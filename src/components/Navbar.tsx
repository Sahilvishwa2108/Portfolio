"use client";
import React, { useState, useEffect } from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { Home, User, Code, Clock, Grid, Send } from "lucide-react";

export function Navbar() {
  const [activeNavItem, setActiveNavItem] = useState("#hero");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we have access to the DOM before listening to scroll events
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define navigation items once
  const navItems = [
    {
      name: "Home",
      link: "#hero",
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <User className="h-4 w-4" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: <Code className="h-4 w-4" />,
    },
    {
      name: "Timeline",
      link: "#timeline",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      name: "Projects",
      link: "#recent-projects",
      icon: <Grid className="h-4 w-4" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <Send className="h-4 w-4" />,
    },
  ];

  useEffect(() => {
    if (!isMounted) return;
    
    // Improved scroll detection with debounce
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const sections = document.querySelectorAll("section, [id]");
        let currentSection = "#hero";
        let minDistance = Infinity;

        sections.forEach((section) => {
          const sectionId = section.getAttribute("id");
          if (!sectionId) return;
          
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          
          // Find the section closest to the top of the viewport
          if (distance < minDistance && rect.top <= 100) {
            minDistance = distance;
            currentSection = `#${sectionId}`;
          }
        });

        setActiveNavItem(currentSection);
      }, 100); // Small debounce for performance
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check for the active section
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isMounted]);

  return (
    <>
      <FloatingNav navItems={navItems} activeNavItem={activeNavItem} />
    </>
  );
}