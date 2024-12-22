"use client";
import { useState, useEffect } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import certificatesData from "@/data/certificates.json";
import { BackgroundGradient } from "./ui/background-gradient";
import { useInView } from "@/hooks/useInView";

export function Achivements() {
  const [ref, isInView] = useInView({ threshold: 0.5 });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isInView, hasLoaded]);

  const cards = certificatesData.certificates.map((certificate, index) => (
    <BackgroundGradient key={certificate.src} className="rounded-3xl">
      <Card card={{ ...certificate, category: certificate.category.toString() }} index={index} />
    </BackgroundGradient>
  ));

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="w-full h-full py-20">
      {hasLoaded && (
        <>
          <div className="text-center">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase mb-10">
              CERTIFICATIONS
            </h2>
          </div>
          <Carousel items={cards} />
        </>
      )}
    </div>
  );
}
