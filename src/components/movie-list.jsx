"use client"

import { useState } from 'react'
import { MovieCard } from './movie-card'
import { CategoryFilter } from './category-filter'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function MovieList({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_ids.includes(selectedGenre))
    : movies;
// console.log(genres);
// console.log(movies);



  return (
    <div className="space-y-4 ">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          <CategoryFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 transition-all duration-300 ease-in-out">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="overflow-hidden rounded-md shadow-sm transform duration-300 ease-in-out hover:scale-95">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  )
}

