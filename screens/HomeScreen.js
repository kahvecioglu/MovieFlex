import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import MovieCard from '../compenents/MovieCard';
import { getAllMovies } from '../services/MovieApi'; // getAllMovies fonksiyonu
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await getAllMovies(); // Tüm filmleri çekiyoruz
      setMovies(movieData);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const renderMovie = ({ item }) => {
    return <MovieCard movie={item} />;
  };

  return (
    <LinearGradient
      colors={['#a8c0ff', '#3f4c6b']}
      style={styles.container}
    >
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.imdbID}
          numColumns={2}
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
  },
  loadingText: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 18,
    color: '#fff',
  },
});

export default HomeScreen;
