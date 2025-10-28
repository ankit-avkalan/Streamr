import React from "react";
import { motion } from "framer-motion";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

const AllMovies = ({ moviesList, isLoading, errorMessage, onSelectMovie }) => {
  return (
    <section className="flex flex-col gap-6 w-full bg-black text-white py-10">
      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          All Movies
        </h3>
        <div className="h-[2px] bg-gradient-to-r from-red-600 to-purple-600 flex-1 ml-4 opacity-70 rounded-full" />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : errorMessage ? (
        <p className="text-center text-gray-400 text-lg py-10">{errorMessage}</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 px-4 sm:px-8 md:px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06 },
            },
          }}
        >
          {moviesList.map((movie) => (
            <motion.div
              key={movie.id}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <MovieCard movie={movie} onSelectMovie={onSelectMovie} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default AllMovies;
