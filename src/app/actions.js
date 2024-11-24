"use server"

import { getPopularMovies, searchMovies } from '@/lib/tmdb'

export async function fetchMoreMovies(page, search, selectedGenre) {
  try {
    let newMovies;
    if (search) {
      newMovies = await searchMovies(search, page);
    } else {
      newMovies = await getPopularMovies(page);
    }
    return selectedGenre
      ? newMovies.filter(movie => movie.genre_ids.includes(selectedGenre))
      : newMovies;
  } catch (error) {
    console.error('Error fetching more movies:', error);
    return [];
  }
}

