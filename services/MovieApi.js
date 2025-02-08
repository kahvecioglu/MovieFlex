const API_KEY = 'dbbe2f2e';
const BASE_URL = 'https://www.omdbapi.com/';

// Ana sayfa için tüm filmleri çeker
export const getAllMovies = async () => {
  try {
    let allMovies = [];

    for (let page = 1; page <= 10; page++) { 
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=movie&page=${page}`);
      const data = await response.json();

      if (data.Response === 'True' && data.Search) {
        allMovies = [...allMovies, ...data.Search]; // Filmleri listeye ekliyoruz
      } else {
        break; // Eğer sonuç yoksa döngüyü durdur
      }
    }

    return allMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const getMoviesBySearch = async (searchQuery) => {
  try {
    let allMovies = [];

    // Arama terimini küçük harfe çeviriyoruz
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    // Eğer arama terimi varsa, 10 sayfaya kadar veri çekiyoruz
    for (let page = 1; page <= 10; page++) {
      const url = `${BASE_URL}?apikey=${API_KEY}&s=${lowerCaseSearchQuery}&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True' && data.Search) {
        // Gelen sonuçları küçük harfe çevirip eşleşmeleri kontrol ediyoruz
        const filteredMovies = data.Search.filter((movie) =>
          movie.Title.toLowerCase().includes(lowerCaseSearchQuery)
        );
        allMovies = [...allMovies, ...filteredMovies];
      } else {
        break; // Eğer sonuç yoksa döngüyü durdur
      }
    }

    return allMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};



