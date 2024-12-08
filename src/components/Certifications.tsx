"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import certificatesData from "@/data/certificates.json";
import { BackgroundGradient } from "./ui/background-gradient";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Certificate {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

function Certifications() {
  const certificates = certificatesData.certificates;

  const settings = {
    dots: true,
    infinite: true,
    speed: 10000, // Slow down the transition speed
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Continuous scrolling
    cssEase: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="relative py-12 bg-black overflow-hidden">
      <div className="relative z-10">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            CERTIFICATIONS
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Learn With the Best
          </p>
        </div>
        <Slider {...settings}>
          {certificates.map((certificate: Certificate) => (
            <div key={certificate.id} className="p-6 gap-32 relative"> {/* Increased padding from p-4 to p-6 */}
              <BackgroundGradient>
                <div className="bg-black rounded-3xl overflow-hidden shadow-lg group">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-filter backdrop-blur-xs backdrop-saturate-180 border border-opacity-12 rounded-3xl flex flex-col justify-center items-center transition-all duration-1000 group-hover:h-0 group-hover:opacity-0 overflow-hidden">
                    <h3 className="text-lg font-semibold text-white">{certificate.title}</h3>
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
        </Slider>
      </div>
    </div>
  );
}

export default Certifications;
