const BASE_URL = 'https://jsonfakery.com/movies/paginated';

// Ana sayfa için tüm filmleri çeker
export const getAllMovies = async () => {
  try {
    let allMovies = [];

    for (let page = 1; page <= 10; page++) {
      const url = `${BASE_URL}?page=${page}`;
   

      const response = await fetch(url);
     

      const result = await response.json();
  

      if (result.data && Array.isArray(result.data)) {
        allMovies = [...allMovies, ...result.data]; // Filmleri listeye ekliyoruz
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

