import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      className="mt-12 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">Streamr</h2>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              Discover and track movies and TV shows trending across the globe.
            </p>
          </div>
          <nav className="text-sm text-gray-300">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li><Link to="/" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">Movies</Link></li>
              <li><Link to="/tv-shows" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">TV Shows</Link></li>
              <li><Link to="/trending" className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500">Trending</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-6 border-t border-[#2a2a2a] pt-4 bg-black/60 rounded-t-md">
          <p className="text-center text-xs text-gray-300">
            © {new Date().getFullYear()} Streamr · Made with <span className="animate-pulse">❤️</span> by Orian
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
