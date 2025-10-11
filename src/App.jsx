import React from 'react'
import { MdOutlinePlayArrow } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import Preloader from './components/Preloader'

import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

import { getTrendingMovies, updateSearchCount} from './appwrite';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const API_OPTIONS = {
  method: "GET",
  headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
};

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; 
    
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) { 
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMoviesList([])
        return;
      }

      setMoviesList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
        setSelectedMovie(data.results[0]);
      }
      
    } catch(error) {
      console.error(`Error fetching movies:${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");

    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();

      setTrendingMovies(movies);  
    } catch (error) {
      console.error(`Error loading trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setIsAppLoading(false);
  }, 2000);
  return () => clearTimeout(timer);
  }, []);


  if (isAppLoading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Preloader />
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col text-white scroll-smooth"
      >
        <div className="flex w-full">

          {/* Sidebar - hidden on mobile */}
          <motion.div
            className="hidden md:block"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.div>

          {/* side bar */}
          <div>
            <SideBar />
          </div>
          
          <div className="flex-1 w-full">
            {/* nav bar */}
            <motion.header 
              className="sticky top-0 z-10 flex flex-wrap md:flex-nowrap items-center py-4 px-4 sm:px-8 md:px-12 w-full gap-4 md:gap:8"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <NavBar />
              <div className="flex-1 min-w-[200px]">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
            </motion.header>

            <main className="flex flex-col gap-12">
              {/* hero section  */}
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
                    className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedMovie ? selectedMovie.title : "The House of The Dragon"}
                  </motion.h1>
                  <motion.p 
                    className="max-w-xl sm:max-w-2xl text-sm sm:text-base"
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
              
              {/* treding movies */}
              <section className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-8 md:12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Trending Movies</h3>
                {trendingMovies.length > 0 && (
                  <motion.ul 
                    className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 },
                      },
                    }}>
                    {trendingMovies.map((movie, index) => (
                      <motion.li 
                        key={movie.$id}
                        className="flex-shrink-0"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                        <img 
                          src={movie.poster_url} 
                          alt={movie.title} 
                          className="w-32 sm:w-40 md:w-48 object-cover"
                        />
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </section>

              {/* all movies */}
              <section className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-8 md:px-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">All Movies</h3>

                {isLoading ? (
                  <Spinner />
                ) : errorMessage ? (
                  <p>{errorMessage}</p>
                ) : (
                  <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.08 },
                      },
                    }}>
                    {moviesList.map((movie) => (
                      <motion.div 
                        key={movie.id}
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <MovieCard key={movie.id} movie={movie} onSelectMovie={setSelectedMovie} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </section>
            </main>
          </div>
        </div>

        <Footer />       
      </motion.div>
    </AnimatePresence>
     
  )
}

export default App
