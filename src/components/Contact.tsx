'use client'
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    }
  };

  return (
    <section ref={sectionRef} className="px-4 py-10 bg-black text-white" id="contact">
      <div className="container mx-auto flex flex-col items-center">
        <motion.h1 
          className="text-3xl lg:text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Have any questions or want to work together? Fill out the form below and I&apos;ll get back to you as soon as possible.
        </motion.p>
        <motion.form 
          ref={form} 
          onSubmit={sendEmail} 
          className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-4">
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input type="text" name="user_name" id="user_name" placeholder="Your name" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="user_email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input type="email" name="user_email" id="user_email" placeholder="Your email" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
            <input type="text" name="subject" id="subject" placeholder="Subject" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea name="message" id="message" placeholder="Your message" className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500" required></textarea>
          </div>
          <motion.button 
            type="submit" 
            className="w-full py-3 bg-teal-500 text-white font-bold rounded hover:bg-teal-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;