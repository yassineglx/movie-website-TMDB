"use client"

import { useState, useEffect, useTransition } from 'react'
import { MovieCard } from './movie-card'
import { MovieCardSkeleton } from './movie-card-skeleton'
import { CategoryFilter } from './category-filter'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function MovieList({ initialMovies, genres, fetchMoreMovies, search }) {
  const [movies, setMovies] = useState(initialMovies)
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    setMovies(initialMovies)
    setPage(2)
    setHasMore(true)
  }, [initialMovies])

  const loadMoreMovies = async () => {
    startTransition(async () => {
      const newMovies = await fetchMoreMovies(page, search, selectedGenre)
      if (newMovies.length === 0) {
        setHasMore(false)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies])
        setPage((prevPage) => prevPage + 1)
      }
    })
  }

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId)
    setMovies(initialMovies.filter(movie => 
      genreId ? movie.genre_ids.includes(genreId) : true
    ))
    setPage(2)
    setHasMore(true)
  }

  console.log(movies)
  return (
    <div className="space-y-4">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          <CategoryFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={handleGenreSelect}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6 transition-all duration-300 ease-in-out">
        {movies.map((movie) => (
          <div key={movie.id} className='overflow-hidden rounded-md shadow-sm transform duration-300 ease-in-out hover:scale-95' >
          <MovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="text-center">
          <button 
            onClick={loadMoreMovies} 
            disabled={isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isPending ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      {isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

