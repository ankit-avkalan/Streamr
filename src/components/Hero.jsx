import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Hero = ({ selectedMovie }) => {
    const [popularMovie, setPopularMovie] = useState(null);

    useEffect(() => {
        const fetchPopularMovie = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/movie/popular?language=en-US&page=1`,
                    API_OPTIONS
                );
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    // Get more details about the movie including videos
                    const movieId = data.results[0].id;
                    const detailsResponse = await fetch(
                        `${API_BASE_URL}/movie/${movieId}?append_to_response=videos`,
                        API_OPTIONS
                    );
                    const movieDetails = await detailsResponse.json();
                    setPopularMovie(movieDetails);
                }
            } catch (error) {
                console.error("Error fetching popular movie:", error);
            }
        };

        if (!selectedMovie) {
            fetchPopularMovie();
        }
    }, [selectedMovie]);
    const displayMovie = selectedMovie || popularMovie;

    return ( 
        <motion.section 
            key={displayMovie ? displayMovie.id : "default-hero"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id="hero"
            className="relative flex flex-col justify-end bg-cover bg-center bg-no-repeat min-h-[70vh] sm:h-screen"
            style={{
                backgroundImage: `linear-gradient(to top, #000000, rgba(0, 0, 0, 0.4)), url(${
                displayMovie
                    ? `${IMAGE_BASE_URL}${displayMovie.backdrop_path || displayMovie.poster_path}`
                    : '/hero.jpg'
                })`,
            }}
        >
            <div className="relative flex flex-col px-4 sm:px-6 md:px-8 mb-10 sm:mb-16">
                <motion.div 
                    className="flex flex-col gap-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold">
                        {displayMovie ? displayMovie.title : "Loading..."}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-sm">
                        {displayMovie && (
                            <>
                                <span className="text-emerald-500 font-semibold">
                                    {Math.round(displayMovie.vote_average * 10)}% Match
                                </span>
                                <span>{displayMovie.release_date?.split('-')[0]}</span>
                                {displayMovie.runtime && (
                                    <span>{Math.floor(displayMovie.runtime / 60)}h {displayMovie.runtime % 60}m</span>
                                )}
                            </>
                        )}
                    </div>
                </motion.div>

                <motion.p 
                    className="max-w-xl sm:max-w-2xl text-sm sm:text-base font-medium mt-4 text-gray-200"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {displayMovie ? displayMovie.overview : "Loading movie details..."}
                </motion.p>

                <motion.div
                    className="mt-6"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <button 
                        className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3 bg-red-600 rounded-full text-sm hover:bg-red-700 transition-colors"
                        onClick={() => {
                            const trailer = displayMovie?.videos?.results?.find(
                                v => v.type === "Trailer" || v.type === "Teaser"
                            );
                            if (trailer) {
                                window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
                            }
                        }}
                    >
                        <FaPlay />
                        <span className="font-semibold">Watch Trailer</span>
                    </button>
                </motion.div>
            </div>
        </motion.section>         
    )
}

export default Hero 