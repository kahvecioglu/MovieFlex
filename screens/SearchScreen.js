import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllMovies } from '../services/MovieApi';
import MovieCard from '../compenents/MovieCard';

const SearchScreen = ({ addToFavorites }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getAllMovies();
        setMovies(movieData);
        setFilteredMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const filteredData = movies.filter((movie) =>
        movie.original_title.toLowerCase().includes(lowerCaseSearchQuery)
      );
      setFilteredMovies(filteredData);
    }
  }, [searchQuery, movies]);

  const renderMovie = ({ item }) => {
    return <MovieCard movie={item} addToFavorites={addToFavorites} />;
  };

  return (
    <LinearGradient colors={['#a8c0ff', '#3f4c6b']} style={styles.container}>
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
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // İki sütunlu düzen
          columnWrapperStyle={styles.row} // Satır arasındaki boşlukları ayarlıyoruz
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between', // İki film arasına boşluk bırakacak
  },
});

export default SearchScreen;
