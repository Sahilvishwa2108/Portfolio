import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingNav } from '@/components/ui/floating-navbar';
import { AnimatedCursor } from '@/components/ui/animated-cursor';
import { Home, User, Code, Clock, Grid, Send } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sahil Vishwakarma | Full Stack Developer & UI/UX Designer",
    template: "%s | Sahil Vishwakarma"
  },
  description: "Full Stack Developer specializing in Next.js, React, TypeScript, and modern web technologies. Explore my portfolio showcasing innovative projects, technical skills, and professional experience.",
  keywords: [
    "Sahil Vishwakarma",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "UI/UX Designer",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Web Development"
  ],
  authors: [{ name: "Sahil Vishwakarma" }],
  creator: "Sahil Vishwakarma",
  publisher: "Sahil Vishwakarma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sahilvishwa2108.vercel.app",
    title: "Sahil Vishwakarma | Full Stack Developer",
    description: "Explore my portfolio showcasing innovative web development projects and technical expertise.",
    siteName: "Sahil Vishwakarma Portfolio",
    images: [
      {
        url: "/projects/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Sahil Vishwakarma Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Vishwakarma | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, React, and modern web technologies.",
    images: ["/projects/portfolio.png"],
    creator: "@sahilvishwa2108"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  metadataBase: new URL('https://sahilvishwa2108.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative w-full flex items-center">
          <FloatingNav navItems={navItems} />
        </div>
        {children}
        <AnimatedCursor />
      </body>
    </html>
  );
}