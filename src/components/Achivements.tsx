"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import certificatesData from "@/data/certificates.json";
import { BackgroundGradient } from "./ui/background-gradient";

export function Achivements() {
  const cards = certificatesData.certificates.map((certificate, index) => (
    <BackgroundGradient key={certificate.src} className="rounded-3xl">
      <Card card={{ ...certificate, category: certificate.category.toString() }} index={index} />
    </BackgroundGradient>
  ));

  return (
    <div className="w-full h-full py-20">
      <div className="text-center">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase mb-10">
          CERTIFICATIONS
        </h2>
      </div>
      <Carousel items={cards} />
    </div>
  );
}
