"use client"

import { Button } from "@/components/ui/button"

export function CategoryFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <>
      <Button
        variant={selectedGenre === null ? "default" : "outline"}
        onClick={() => onSelectGenre(null)}
      >
        All
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant={selectedGenre === genre.id ? "default" : "outline"}
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </Button>
      ))}
    </>
  )
}

