import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import Preloader from './components/Preloader'

import Home from './pages/Home'
import Favourite from './pages/Favourite'
import Profile from './pages/Profile'
import TVShows from './pages/TVShows'
import Trending from './pages/Trending'
import MovieDetail from './pages/MovieDetail'

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

      // If this was a search query, update search counts and set selected movie.
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
        setSelectedMovie(data.results[0]);
      }

      // If no query (initial load / discover), auto-select the first movie so
      // the Hero shows the same movie as the first item in AllMovies.
      if (!query && data.results && data.results.length > 0) {
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
        <Preloader /> 
      </AnimatePresence>
    )
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col text-white scroll-smooth font-tracking-normal bg-black">
        <div className="flex w-full">
          <SideBar />
          <div className="flex-1">
            <header className="sticky top-0 z-10 bg-black w-full py-4 px-4 sm:px-8 md:px-12">
              <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="w-full block md:inline-block">
                  <NavBar />
                </div>
                <div className="w-full md:w-auto mt-3 md:mt-0">
                  <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
              </div>
            </header>




            <main className="flex flex-col gap-12 px-4 sm:px-8 md:px-12">
              <Routes>
                <Route path="/" element={
                  <Home 
                    selectedMovie={selectedMovie}
                    trendingMovies={trendingMovies}
                    moviesList={moviesList}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    onSelectMovie={setSelectedMovie}
                  />
                } />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/tv-shows" element={<TVShows />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </div>
        <Footer />       
      </div>
    </Router>
  )
}

export default App
