"use client";

import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const RecentProjects = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [loadedCards, setLoadedCards] = useState<number[]>([]);

  useEffect(() => {
    if (isInView) {
      projects.forEach((_, index) => {
        setTimeout(() => {
          setLoadedCards((prev) => [...prev, index]);
        }, index * 300); // Adjust the delay as needed
      });
    }
  }, [isInView]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="py-20 text-center">
      {isInView && (
        <>
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            A small collection of PROJECTS
          </h2>
          <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
            {projects.map((item, index) => (
              <div
                className={`lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw] transition-opacity duration-500 ${loadedCards.includes(index) ? 'opacity-100' : 'opacity-0'}`}
                key={item.id}
              >
                <PinContainer
                  title="Checkout"
                  href="https://twitter.com/mannupaaji"
                >
                  <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                    <div
                      className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <Image src="/bg.png" alt="bgimg" fill style={{ objectFit: "cover" }} quality={100} />
                    </div>
                    <Image
                      src={item.img}
                      alt="cover"
                      fill
                      style={{ objectFit: "cover" }}
                      className="z-10 absolute bottom-0 rounded-3xl"
                    />
                  </div>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                    {item.title}
                  </h1>

                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                    style={{
                      color: "#BEC1DD",
                      margin: "1vh 0",
                    }}
                  >
                    {item.des}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {item.iconLists.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                          style={{
                            transform: `translateX(-${5 * index + 2}px)`,
                          }}
                        >
                          <Image src={icon} alt="icon5" width={20} height={20} />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center items-center">
                      <Link href={item.link}>
                        <button className="text-teal-600">Live Link</button>
                      </Link>
                      <FaLocationArrow className="ms-3" color="#CBACF9" />
                    </div>
                  </div>
                </PinContainer>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentProjects;
