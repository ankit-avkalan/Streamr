import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical, BsX } from "react-icons/bs";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Movies", href: "/", description: "Browse all movies" },
    { label: "TV Shows", href: "/tv-shows", description: "Explore TV series" },
    { label: "Trending", href: "/trending", description: "What's popular now" },
  ];

  useEffect(() => {
    // Lock body scroll when mobile menu is open to prevent layout jumps on keyboard open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav className="flex items-center justify-between w-full tracking-normal">
      {/* Logo or Title */}
      <h1
        className="text-2xl md:hidden font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500"
      >
        Streamr
      </h1>

      {/* Desktop Nav */}
      <div
        className="hidden md:flex gap-8 text-base lg:text-lg"
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="font-semibold hover:text-[#b9b9b9] hover:scale-105 transition-transform duration-300 ease-linear"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
      >
        {isOpen ? <BsX size={26} /> : <BsThreeDotsVertical size={26} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/95 backdrop-blur-sm md:hidden z-40 border-t border-gray-800">
          <div className="p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span className="text-lg font-medium">{link.label}</span>
                <p className="text-sm text-gray-400">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;