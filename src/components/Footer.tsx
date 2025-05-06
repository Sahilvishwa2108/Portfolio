"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative mt-20">
      {/* Wave effect */}
      <div className="absolute top-0 left-0 w-full overflow-hidden transform -translate-y-full">
        <svg
          width="100%"
          height="150"
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 25H60C120 25 240 25 360 46.7C480 68.3 600 111.7 720 111.7C840 111.7 960 68.3 1080 46.7C1200 25 1320 25 1380 25H1440V150H1380C1320 150 1200 150 1080 150C960 150 840 150 720 150C600 150 480 150 360 150C240 150 120 150 60 150H0V25Z"
            fill="#1f2937"
          />
        </svg>
      </div>

      {/* 3D Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-3xl"></div>
        <div className="absolute top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-l from-purple-500/20 to-pink-500/20 blur-3xl"></div>
      </div>

      <div className="px-4 py-16 bg-gray-800 text-white relative overflow-hidden">
        <div className="container mx-auto flex flex-col items-center">
          <motion.h1 
            className="text-3xl lg:text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to take <span className="text-teal-500">your</span> digital presence to the next level?
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-center mb-8 max-w-2xl"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
            Whether it&apos;s a new project, an existing application that needs improvements, or just an idea you&apos;re exploring.
          </motion.p>
          
          {/* Contact Card - Added id="contact" here for proper navigation */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-3xl bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 mt-6 mb-12 border border-gray-700/50 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Email */}
              <motion.div 
                className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors border border-gray-700/30"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-1">Email</h4>
                <p className="text-gray-400 text-sm mb-3">Send me an email anytime.</p>
                <a 
                  href="mailto:sahilvishwa2108@gmail.com" 
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                >
                  sahilvishwa2108@gmail.com
                </a>
              </motion.div>
              
              {/* Location */}
              <motion.div 
                className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors border border-gray-700/30"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-1">Location</h4>
                <p className="text-gray-400 text-sm mb-3">Based in India.</p>
                <span className="text-blue-400 font-medium">Bhopal, MP</span>
              </motion.div>
              
              {/* Connect */}
              <motion.div 
                className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/80 transition-colors border border-gray-700/30"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-1">Social</h4>
                <p className="text-gray-400 text-sm mb-3">Let&apos;s connect online.</p>
                <div className="flex space-x-3">
                  {socialMedia && socialMedia.map((info) => (
                    <Link 
                      key={info.id} 
                      href={info.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform"
                    >
                      <Image src={info.img} alt="social" width={20} height={20} />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.a 
            href="mailto:sahilvishwa2108@gmail.com"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000"></div>
            <button className="relative px-8 py-4 bg-gray-900 rounded-full text-white flex items-center gap-2">
              Let&apos;s get in touch
              <FaLocationArrow />
            </button>
          </motion.a>
        </div>

        {/* Divider */}
        <div className="container mx-auto my-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
        </div>

        {/* Footer bottom */}
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-gray-400 text-sm md:text-base mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            &copy; {currentYear} Sahil Vishwakarma. All rights reserved.
          </motion.p>

          {/* Links */}
          <div className="flex space-x-6">
            <Link href="#hero" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Home</Link>
            <Link href="#about" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">About</Link>
            <Link href="#recent-projects" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Projects</Link>
            <Link href="#contact" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;