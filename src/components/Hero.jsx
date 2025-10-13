import React from 'react'
import { motion } from 'framer-motion'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const Hero = ({ selectedMovie }) => {
    return ( 
        <motion.section 
            key={selectedMovie ? selectedMovie.id : "default-hero"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex flex-col justify-end bg-cover bg-no-repeat h-[60vh] sm:h-[70vh] md:h-[80vh]"
            style={{
                backgroundImage: `linear-gradient(to top, #000000, rgba(0, 0, 0, 0.2)), url(${
                selectedMovie
                    ? `${IMAGE_BASE_URL}${selectedMovie.backdrop_path || selectedMovie.poster_path}`
                    : '/hero.jpg'
                })`,
            }}
        >
            <div className="relative flex flex-col px-6 sm:px-10 md:px-20 mb-10 sm:mb-16">
                <motion.h1 
                    className="text-4xl sm:text-2xl md:text-3xl font-extrabold mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {selectedMovie ? selectedMovie.title : "The House of The Dragon"}
                </motion.h1>
                <motion.p 
                    className="max-w-xl sm:max-w-2xl text-sm sm:text-sm font-medium bold"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {selectedMovie
                        ? selectedMovie.overview
                        : "House of the Dragon is a thrilling prequel to Game of Thrones, following the Targaryen dynasty's civil war, the Dance of the Dragon, filled with political intrigue and dragon-fueled battles."}
                </motion.p>     
            </div>
        </motion.section>         
    )
}

export default Hero 