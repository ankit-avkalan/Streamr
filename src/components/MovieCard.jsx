import React from 'react'

const MovieCard = ({ movie, onSelectMovie }) => {
  const { 
    title, 
    vote_average, 
    poster_path, 
    release_date, 
    original_language 
  } = movie

  return (
    <div 
      onClick={() => {
        onSelectMovie(movie);
        document.getElementById('hero').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }} 
      className="flex flex-col gap-2 sm:gap-3 hover:scale-95 duration-300 ease-linear cursor-pointer"
    >
      <img 
        className="w-full aspect-[2/3] rounded-xl object-cover bg-center" 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no_movie.png'} 
        alt={title} 
      />
      
      <div className="px-1">
        <p className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
          {title}
        </p>

        <div className="flex flex-wrap items-center gap-x-1 text-xs sm:text-sm text-gray-400">
          <p>{release_date ? release_date.slice(0, 4) : 'Unknown'} ·</p>
          <p>{vote_average ? vote_average.toFixed(1) : 'Unknown'} ·</p>
          <p className="uppercase">{original_language || 'Unknown'}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
