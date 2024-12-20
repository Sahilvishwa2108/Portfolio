"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import certificatesData from "@/data/certificates.json";
import { BackgroundGradient } from "./ui/background-gradient";
import { Marquee } from "@/components/ui/marquee";

interface Certificate {
  id: number;
  title: string;
  slug: string;
  image: string;
}

const certificates: Certificate[] = certificatesData.certificates;

const Certifications = () => {
  return (
    <div className="relative py-12 bg-black overflow-hidden">
      <div className="relative z-10">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase mb-10">
            CERTIFICATIONS
          </h2>
        </div>
        <Marquee pauseOnHover className="[--duration:60s]">
          {certificates.map((certificate: Certificate) => (
            <div key={certificate.id} className="p-6 gap-32 relative">
              <BackgroundGradient>
                <div className="bg-black rounded-3xl overflow-hidden shadow-lg group" style={{ width: 300, height: 200 }}>
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    width={300}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-filter backdrop-blur-xs backdrop-saturate-180 border border-opacity-12 rounded-3xl flex flex-col justify-center items-center transition-all duration-1000 group-hover:h-0 group-hover:opacity-0 overflow-hidden">
                    <h3 className="text-lg font-semibold text-white text-center">{certificate.title}</h3>
                    <Link href={`/certificates/${certificate.slug}`} legacyBehavior>
                      <a className="mt-4 inline-block text-teal-600 hover:text-teal-800">
                        Learn More
                      </a>
                    </Link>
                  </div>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:60s]">
          {certificates.map((certificate: Certificate) => (
            <div key={certificate.id} className="p-6 gap-32 relative">
              <BackgroundGradient>
                <div className="bg-black rounded-3xl overflow-hidden shadow-lg group" style={{ width: 300, height: 200 }}>
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    width={300}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-filter backdrop-blur-xs backdrop-saturate-180 border border-opacity-12 rounded-3xl flex flex-col justify-center items-center transition-all duration-1000 group-hover:h-0 group-hover:opacity-0 overflow-hidden">
                    <h3 className="text-lg font-semibold text-white text-center">{certificate.title}</h3>
                    <Link href={`/certificates/${certificate.slug}`} legacyBehavior>
                      <a className="mt-4 inline-block text-teal-600 hover:text-teal-800">
                        Learn More
                      </a>
                    </Link>
                  </div>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Certifications;
