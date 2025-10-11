import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <motion.div
      className="flex items-center relative ml-auto w-full sm:w-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Search Icon (visible on small screens) */}
      <FaSearch className="absolute left-3 text-sm" />

      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          rounded-full border border-[#ffffff] py-2 pl-9 pr-3 
          text-sm placeholder-[#7d7d7d] 
          focus:outline focus:ring-3 focus:ring-[gradient-to-r from-pink-500 via-purple-500 to-yellow-500] 
          duration-300 ease-linear
          w-full sm:w-72 md:w-80 lg:w-96
        "
      />
    </motion.div>
  );
};

export default Search;
