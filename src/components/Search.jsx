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
      <FaSearch className="absolute left-3 text-[#7d7d7d] text-sm sm:hidden" />

      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          rounded-full border border-[#7d7d7d] py-2 pl-9 pr-3 
          text-sm text-[#b9b9b9] placeholder-[#7d7d7d] 
          focus:outline-none focus:ring-1 focus:ring-[#170102] 
          duration-300 ease-linear bg-transparent
          w-full sm:w-72 md:w-80 lg:w-96
        "
      />
    </motion.div>
  );
};

export default Search;
