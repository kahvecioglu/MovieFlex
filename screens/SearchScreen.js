import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // LinearGradient ekleyin
import { getAllMovies } from '../services/MovieApi';
import MovieCard from '../compenents/MovieCard';

const SearchScreen = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getAllMovies();
        setMovies(movieData);
        setFilteredMovies(movieData); // Başlangıçta tüm filmleri göster
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filtreleme işlemi
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(movies); // Eğer arama terimi boşsa, tüm filmleri göster
    } else {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const filteredData = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(lowerCaseSearchQuery)
      );
      setFilteredMovies(filteredData); // Filtrelenmiş veriyi güncelle
    }
  }, [searchQuery, movies]); // Arama terimi veya filmler değişirse, filtrele

  const renderMovie = ({ item }) => {
    return <MovieCard movie={item} />;
  };

  return (
    <LinearGradient
      colors={['#a8c0ff', '#3f4c6b']} // Diğer sayfalarla aynı gradient renkleri
      style={styles.container}
    >
      <TextInput
        style={styles.searchInput}
        placeholder="Film ara...."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={filteredMovies}
          renderItem={renderMovie}
           keyExtractor={(item) => item.movie_id.toString()}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Input arka plan rengi
    color: '#fff', // Input metin rengi
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff', // Yükleme metni rengi
  },
});

export default SearchScreen;
