import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MovieCard = ({ movie }) => {
  return (
    <View style={styles.card}>
      {/* Film Resmi */}
      <Image source={{ uri: movie.Poster }} style={styles.image} />

      <View style={styles.info}>
        {/* Film Adı */}
        <Text style={styles.title}>{movie.Title}</Text>

        {/* Yönetmen */}
        <Text style={styles.director}>
          {movie.Director ? `Director: ${movie.Director}` : 'Director: N/A'}
        </Text>

        {/* IMDb Puanı */}
        <Text style={styles.imdb}>
          IMDb: {movie.imdbRating ? movie.imdbRating : 'N/A'}
        </Text>
      </View>

      {/* Kalp Butonu */}
      <TouchableOpacity style={styles.heartButton}>
        <Ionicons name="heart-outline" size={24} color="tomato" />
      </TouchableOpacity>

      

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#3b8d99', // Tek renk arka plan
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 30,
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  director: {
    fontSize: 14,
    color: 'black',
  },
  imdb: {
    fontSize: 14,
    color: 'orange',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default MovieCard;
