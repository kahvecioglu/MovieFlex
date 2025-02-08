// services/MovieApi.js
export const API_KEY = 'dbbe2f2e'; // OMDB API key
export const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchQuery) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}`);
    const data = await response.json();
    return data.Search; // Film verilerini döndürür
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
