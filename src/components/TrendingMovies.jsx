import React from "react";
import { motion } from "framer-motion";

const TrendingMovies = ({ trendingMovies }) => {
  if (!trendingMovies || trendingMovies.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-8 md:12">
      <h3 className="font-bold text-2xl sm:text-3xl md:text-3xl px-4 sm:px-6 md:px-8">
        Trending Movies
      </h3>
      {trendingMovies.length > 0 && (
        <motion.ul
          className="flex flex-shrink gap-4 sm:gap-6 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {trendingMovies.map((movie) => (
            <motion.li
              key={movie.$id}
              className="flex flex-col gap-2 sm:gap-3"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="w-auto object-cover rounded-xl"
              />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </section>
  );
};

export default TrendingMovies;