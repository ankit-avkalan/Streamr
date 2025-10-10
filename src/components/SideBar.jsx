import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// icons
import { HiOutlineHome } from "react-icons/hi";
import {
  MdMovieCreation,
  MdOutlineLiveTv,
  MdOutlineBookmarkAdd,
} from "react-icons/md";
import { RiSettings6Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", icon: <HiOutlineHome /> },
    { label: "Movies", icon: <MdMovieCreation /> },
    { label: "Live TV", icon: <MdOutlineLiveTv /> },
    { label: "Bookmarks", icon: <MdOutlineBookmarkAdd /> },
  ];

  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <div className="hidden md:flex bg-[#0c0c0c] sticky top-0 h-screen w-16 flex-col items-center gap-4 py-6">
        <h1 className="text-2xl font-bold text-[#b70710]">S</h1>

        <nav className="flex flex-col items-center gap-6 mt-4">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href="#"
              aria-label={link.label}
              className="text-lg flex h-10 w-10 items-center justify-center rounded-lg text-[#7d7d7d] transition-all hover:bg-[#170102] hover:text-[#e50914] hover:scale-110 ease-linear"
            >
              {link.icon}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-6">
          <a
            href="#"
            aria-label="Settings"
            className="text-lg flex h-10 w-10 items-center justify-center rounded-lg text-[#7d7d7d] transition-all hover:bg-[#170102] hover:text-[#e50914] hover:scale-110 ease-linear"
          >
            <RiSettings6Fill />
          </a>
          <a
            href="#"
            aria-label="Profile"
            className="text-lg flex h-10 w-10 items-center justify-center rounded-lg text-[#7d7d7d] transition-all hover:bg-[#170102] hover:text-[#e50914] hover:scale-110 ease-linear"
          >
            <FaRegUser />
          </a>
        </div>
      </div>

      {/* ===== Mobile Navbar ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0c0c0c] border-t border-[#1f1f1f] flex justify-around items-center py-3 z-50">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href="#"
            aria-label={link.label}
            className="flex flex-col items-center text-[#7d7d7d] hover:text-[#e50914] transition-colors"
          >
            {link.icon}
            <span className="text-[10px] mt-1">{link.label}</span>
          </a>
        ))}

      </div>

      {/* ===== Mobile Sidebar Overlay ===== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#0c0c0c] flex flex-col items-center justify-center space-y-6"
          >
            {navLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                aria-label={link.label}
                className="text-2xl font-semibold text-[#b9b9b9] hover:text-[#e50914] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="flex gap-6 mt-10">
              <a href="#" className="text-xl text-[#7d7d7d] hover:text-[#e50914]">
                <RiSettings6Fill />
              </a>
              <a href="#" className="text-xl text-[#7d7d7d] hover:text-[#e50914]">
                <FaRegUser />
              </a>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-3xl text-[#b9b9b9] hover:text-[#e50914] transition-all"
            >
              <IoClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideBar;
