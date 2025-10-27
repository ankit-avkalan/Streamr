import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

// icons
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { RiSettings6Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Only show Home, Favourite, and User icons for desktop
  const desktopLinks = [
    { label: "Home", icon: <HiOutlineHome />, path: "/" },
    { label: "Favourites", icon: <MdOutlineBookmarkAdd />, path: "/favourite" },
    { label: "Profile", icon: <FaRegUser />, path: "/profile" },
  ];
  // Mobile can keep labels if desired
  const navLinks = desktopLinks;

  return (
    <>
      {/* ===== Desktop Sidebar ===== */}
      <div className="hidden md:flex sticky top-0 h-screen md:w-16 lg:w-16 xl:w-16 flex-col items-center gap-4 py-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">S</h1>
        <nav className="flex flex-col items-center gap-6 mt-4">
          {desktopLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              aria-label={link.label}
              className={`text-lg flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:text-[#e50914] hover:scale-110 ease-linear
                ${location.pathname === link.path ? 'text-[#e50914]' : ''}`}
            >
              {link.icon}
            </Link>
          ))}
        </nav>
        {/* No extra icons or labels for desktop */}
      </div>

      {/* ===== Mobile Navbar ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-[#1f1f1f] flex justify-around items-center py-3 z-50">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            aria-label={link.label}
            className={`flex flex-col items-center transition-colors hover:text-[#e50914]
              ${location.pathname === link.path ? 'text-[#e50914]' : ''}`}
          >
            {link.icon}
            <span className="text-[8px] font-bold mt-1">{link.label}</span>
          </Link>
        ))}

      </div>
    </>
  );
};

export default SideBar;
