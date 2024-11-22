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

  return (
    <div className="space-y-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

