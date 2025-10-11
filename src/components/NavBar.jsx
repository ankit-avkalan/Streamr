import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Movies", href: "#" },
    { label: "TV Shows", href: "#" },
    { label: "Trending", href: "#" },
  ];

  return (
    <nav className="flex items-center justify-between w-full">
      {/* Logo or Title */}
      <motion.h1
        className="md:hidden sm:text-2xl font-bold tracking-tight"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        STEAMR
      </motion.h1>

      {/* Desktop Nav */}
      <motion.div
        className="hidden md:flex gap-8 text-base lg:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-semibold hover:text-[#b9b9b9] hover:scale-105 transition-transform duration-300 ease-linear"
          >
            {link.label}
          </a>
        ))}
      </motion.div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        {isOpen ? <HiX size={26} /> : <HiOutlineMenu size={26} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full backdrop-blur-md md:hidden z-40"
          >
            <ul className="flex flex-col items-center py-4 gap-4">
              {navLinks.map((link) => (
                <motion.li
                  key={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={link.href}
                    className="text-lg font-medium hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
