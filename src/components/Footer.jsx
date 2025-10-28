import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | "ok" | "err"
  const reduce = useReducedMotion();

  const handleSubscribe = (e) => {
    e.preventDefault();
    // tiny email validation (replace with your API call)
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("err");
      return;
    }
    setStatus("ok");
    setEmail("");
    // TODO: call real subscribe endpoint
  };

  return (
    <motion.footer
      className="w-full bg-black text-gray-200"
      initial={reduce ? {} : { opacity: 0, y: 12 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:ml-12 bg-black min-h-screen text-white">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand / About */}
          <div className="max-w-sm">
            <h3 id="footer-heading" className="text-2xl font-semibold tracking-tight">
              <span className="block">Streamr</span>
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Discover and track movies and TV shows. Clean UI, fast search, no fluff.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/10"
                aria-label="Streamr on Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/10"
                aria-label="Streamr on Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/10"
                aria-label="Streamr on Github"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Nav links */}
          <nav className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Explore</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to="/tv-shows" className="text-gray-400 hover:text-white transition-colors">
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link to="/trending" className="text-gray-400 hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Company</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Legal</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Newsletter / CTA */}
          <div className="w-full max-w-xs">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Get updates</h4>
            <p className="text-sm text-gray-400 mb-3">New releases and curated lists — no spam.</p>

            <form onSubmit={handleSubscribe} className="flex gap-2" aria-label="Subscribe to newsletter">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus(null);
                }}
                placeholder="you@domain.com"
                className="flex-1 bg-transparent border border-white/10 text-sm px-3 py-2 rounded-md placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/10"
                aria-invalid={status === "err"}
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-3 py-2 bg-white text-black rounded-md text-sm font-medium hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20"
                aria-label="Subscribe"
              >
                <FaEnvelope />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>

            {status === "err" && (
              <p className="mt-2 text-xs text-red-400">Please enter a valid email address.</p>
            )}
            {status === "ok" && (
              <p className="mt-2 text-xs text-green-400">Thanks — you’re on the list.</p>
            )}
          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-8 border-t border-white/6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Streamr · Made with <span aria-hidden>❤</span> by Orian
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link to="/status" className="hover:text-white transition-colors">
                Status
              </Link>
              <Link to="/docs" className="hover:text-white transition-colors">
                API
              </Link>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Version 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
