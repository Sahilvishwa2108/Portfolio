'use client'
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "@/components/ui/MagicButton";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface SocialMedia {
  id: number;
  link: string;
  img: string;
}

const Footer = () => {
  return (
    <footer className="px-4 py-10 bg-gray-800 text-white" id="contact">
      <div className="container mx-auto flex flex-col items-center">
        <motion.h1 
          className="text-3xl lg:text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to take <span className="text-teal-500">your</span> digital presence to the next level?
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Reach out to me today and let's discuss how I can help you achieve your goals.
        </motion.p>
        <motion.a 
          href="mailto:sahilvishwa2108@gmail.com"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </motion.a>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-16">
        <motion.p 
          className="text-gray-400 text-sm md:text-base mb-4 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Copyright © {new Date().getFullYear()} Sahil Vishwakarma
        </motion.p>

        <div className="flex items-center gap-4">
          {socialMedia.map((info: SocialMedia) => (
            <motion.div 
              key={info.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href={info.link} className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full hover:bg-teal-500 transition duration-300">
                <Image src={info.img} alt="icons" width={20} height={20} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
