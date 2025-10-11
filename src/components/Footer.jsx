import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="text-center text-sm p-6 mt-8 border-t border-[#2a2a2a] bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="font-bold text-sm sm:text-sm md:text-base">
        Made with{" "}
        <span className="text-[#b70710] animate-pulse">❤️</span> by{" "}
        <span className="font-semibold hover:text-[#ffffff] duration-300 ease-linear">
          Orian
        </span>
      </p>
    </motion.footer>
  );
};

export default Footer;
