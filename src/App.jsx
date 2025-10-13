import React from 'react'
import { AnimatePresence } from 'framer-motion'

import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import TrendingMovies from './components/TrendingMovies'
import AllMovies from './components/AllMovies'

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
      <div className="min-h-screen flex flex-col text-white scroll-smooth font-tracking-normal">
        <div className="flex w-full">
          <SideBar />
          <div>
            <header className="sticky top-0 z-10 flex flex-wrap md:flex-nowrap items-center py-4 px-4 sm:px-8 md:px-12 w-full gap-4 md:gap:8 bg-black">
              {/* nav bar */}
              <NavBar />
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

            <main className="flex flex-col gap-12">
              {/* hero section  */}
              < Hero selectedMovie={selectedMovie} />             
              {/* trending movies */}
              < TrendingMovies trendingMovies={trendingMovies} />
              {/* all movies */}
              <AllMovies
                moviesList={moviesList}
                isLoading={isLoading}
                errorMessage={errorMessage}
                onSelectMovie={setSelectedMovie}
              />
            </main>
          </div>
        </div>

        <Footer />       
      </div>
    </AnimatePresence>
     
  )
}

export default App
