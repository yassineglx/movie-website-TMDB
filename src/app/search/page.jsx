import { Suspense } from 'react'
import { searchMovies, getGenres } from '@/lib/tmdb'
import { MovieList } from '@/components/movie-list'
import { FavoritesProvider } from '@/contexts/favorites-context'

export default async function SearchPage({ searchParams }) {
  const search = searchParams.q ?? '';
  let movies = [];
  let genres = [];
  let error = null;

  try {
    movies = await searchMovies(search);
    genres = await getGenres();
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unexpected error occurred';
  }

  return (
    <FavoritesProvider>
      <main className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Search Results for: {search}</h2>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <MovieList movies={movies} genres={genres} />
          </Suspense>
        )}
      </main>
    </FavoritesProvider>
  )
}

