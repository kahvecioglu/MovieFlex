import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // AsyncStorage'den favorileri yükle
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, []);

  // Favorileri AsyncStorage'e kaydet
  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };

  // Favoriye ekleme fonksiyonu
  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
    }
  };

  // Favorilerden çıkarma fonksiyonu
  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
