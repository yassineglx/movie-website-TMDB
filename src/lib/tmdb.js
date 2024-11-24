const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('TMDB API key is not set. Please check your environment variables.');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid TMDB API key. Please check your API key and try again.');
    }
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getPopularMovies(page = 1) {
  const data = await fetchFromTMDB('/movie/popular', { page: page.toString() });
  return data.results;
}

export async function searchMovies(query, page = 1) {
  const data = await fetchFromTMDB('/search/movie', { query, page: page.toString() });
  return data.results;
}

export async function getGenres() {
  const data = await fetchFromTMDB('/genre/movie/list');
  return data.genres;
}


// export const getCredits = async (query, id, payload) => {
//   const response = await Api().get(`/${id}/${query}/credits`, { params: payload })
//   return response
// }
