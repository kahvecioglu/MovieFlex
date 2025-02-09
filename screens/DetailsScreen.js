import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { movie } = route.params; // 'movie' bilgisi parametre olarak alınıyor

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.poster_path }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.rating}>Rating: {movie.vote_average ? movie.vote_average : 'N/A'}</Text>
        <Text style={styles.popularity}>Popularity: {movie.popularity ? movie.popularity : 'N/A'}</Text>
        <Text style={styles.language}>Language: {movie.original_language}</Text>
        <Text style={styles.overview}>{movie.overview ? movie.overview : 'No overview available.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc', // Arka plan rengini buradan değiştirdik
  },
  image: {
    width: '100%',
    height: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 10,
  },
  popularity: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  language: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  budget: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  revenue: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  genres: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
