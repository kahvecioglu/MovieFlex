import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import MovieCard from '../compenents/MovieCard';
import { getMoviesBySearch } from '../services/MovieApi';
import { LinearGradient } from 'expo-linear-gradient';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(''); // Kullanıcı uyarısı için state

  const fetchMovies = async (query) => {
    try {
      setLoading(true);
      const movieData = await getMoviesBySearch(query);
      setMovies(movieData || []); // Film listesini güncelle
    } catch (error) {
      setMovies([]); // Film bulunamazsa listeyi temizle
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.length >= 4) {
      fetchMovies(searchQuery);
      setWarning('');
    } else if (searchQuery.length > 0) {
      setWarning('En az 4 karakter girin');
      setMovies([]);
    } else {
      setMovies([]);
      setWarning('');
    }
  }, [searchQuery]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const renderMovie = ({ item }) => <MovieCard movie={item} />;

  return (
    <LinearGradient colors={['#a8c0ff', '#3f4c6b']} style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Film ara..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {warning ? <Text style={styles.warningText}>{warning}</Text> : null}

      {loading ? (
        <Text style={styles.loadingText}>Yükleniyor...</Text>
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
  searchInput: {
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    margin: 10,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 18,
    color: '#fff',
  },
  warningText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'orange',
  },
});

export default SearchScreen;
