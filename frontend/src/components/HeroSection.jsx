import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection({ title, subtitle, backgroundImage }) {
  return (
    <section
      className="relative top-0 left-0 w-full h-[80vh] md:h-[40vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative text-white text-center pt-25">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold uppercase"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg mt-2 whitespace-pre-line"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
