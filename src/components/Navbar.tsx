"use client";
import React, { useState, useEffect } from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconDeviceLaptop, IconHome, IconMessage, IconUser } from "@tabler/icons-react";

export function Navbar() {
  const [activeNavItem, setActiveNavItem] = useState("#hero");

  const navItems = [
    {
      name: "Home",
      link: "#hero",
      icon: <IconHome className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#macbook-scroll-demo",
      icon: <IconUser className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "#recent-projects",
      icon: <IconDeviceLaptop className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#footer",
      icon: <IconMessage className="h-6 w-6 text-neutral-500 dark:text-white" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "#hero";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
          currentSection = `#${section.id}`;
        }
      });

      setActiveNavItem(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} activeNavItem={activeNavItem} />
    </div>
  );
}