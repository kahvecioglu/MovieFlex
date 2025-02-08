const API_KEY = 'dbbe2f2e'; // OMDB API key
const BASE_URL = 'https://www.omdbapi.com/';

export const getMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=movie&page=1`);
    const data = await response.json();
    if (data.Response === 'True') {
      return data.Search; // Movie listesi
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
