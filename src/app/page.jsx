import { Suspense } from 'react'
import { getPopularMovies, searchMovies, getGenres } from '@/lib/tmdb'
import { MovieList } from '@/components/movie-list'
import { FavoritesProvider } from '@/contexts/favorites-context'

export default async function Home({ searchParams }) {
  const search = searchParams?.search || '';
  let movies = [];
  let genres = [];
  let error = null;

  try {
    movies = search ? await searchMovies(search) : await getPopularMovies();
    genres = await getGenres();
  } catch (e) {
    error = e instanceof Error ? e.message : 'An unexpected error occurred';
  }

  return (
    <FavoritesProvider>
      <main className="container mx-auto py-8">
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
