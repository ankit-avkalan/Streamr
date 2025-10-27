import React from 'react'
import { motion } from 'framer-motion'
import Spinner from './Spinner'
import MovieCard from './MovieCard'

const AllMovies = ({ moviesList, isLoading, errorMessage, onSelectMovie }) => {
  return (
    <section className="flex flex-col gap-4 sm:gap-6 w-full">
      <h3 className="font-bold text-2xl sm:text-3xl md:text-3xl px-4 sm:px-6 md:px-8">All Movies</h3>

      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 px-2 sm:px-3 md:px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {moviesList.map((movie) => (
            <motion.div
              key={movie.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <MovieCard movie={movie} onSelectMovie={onSelectMovie} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}

export default AllMovies
