"use client";

import { useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const RecentProjects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="py-20 text-center">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2
          className="text-base text-teal-600 font-semibold tracking-wide uppercase"
          variants={itemVariants}
        >
          A small collection of PROJECTS
        </motion.h2>
        <motion.div
          className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10"
          variants={containerVariants}
        >
          {projects.map((item) => (
            <motion.div
              className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
              key={item.id}
              variants={itemVariants}
            >
              <PinContainer title="Checkout" href="https://twitter.com/mannupaaji">
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RecentProjects;
