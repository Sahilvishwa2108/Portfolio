"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import certificatesData from "@/data/certificates.json";
import { BackgroundGradient } from "./ui/background-gradient";

interface Certificate {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
}

function Certifications() {
  const certificates = certificatesData.certificates;
  return (
    <div className="py-12 bg-black">
      <div>
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            CERTIFICATIONS
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Learn With the Best
          </p>
        </div>
      </div>
      <div className="mt-10 mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 justify-center">
          {certificates.map((certificate: Certificate) => (
            <div key={certificate.id} className="flex justify-center">
              <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    height={100}
                    width={400}
                    className="object-fill rounded-2xl"
                  />
                  <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {certificate.title}
                  </p>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 text-center">
        <Link
          href={"/certifications"}
          className="px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
        >
          View All certificates
        </Link>
      </div>
    </div>
  );
}

export default Certifications;
