import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

const Trending = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeWindow, setTimeWindow] = useState('day'); // 'day' or 'week'

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/${timeWindow}?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        setTrendingContent(data.results);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching trending content");
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Trending</h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-full transition-all ${
              timeWindow === 'day'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setTimeWindow('day')}
          >
            Today
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-all ${
              timeWindow === 'week'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setTimeWindow('week')}
          >
            This Week
          </button>
        </div>
      </div>
      
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {trendingContent.map((item) => (
          <MovieCard
            key={item.id}
            movie={{
              ...item,
              title: item.title || item.name,
              release_date: item.release_date || item.first_air_date
            }}
            onSelectMovie={() => {}} // We can implement hero update if needed
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Trending;