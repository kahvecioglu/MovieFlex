import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MovieCard = ({ movie }) => {
  const shareMovie = async () => {
    try {
      await Share.share({
        message: `Check out this movie: ${movie.original_title}`,
      });
    } catch (error) {
      console.error('Error sharing movie:', error);
    }
  };
  const favoriyeekle = async () => {
   
  };


  return (
    <View style={styles.card}>
      {/* Film Resmi */}
      <Image source={{ uri: movie.poster_path }} style={styles.image} />

      <View style={styles.info}>
        {/* Film Adı */}
        <Text style={styles.title}>{movie.original_title}</Text>

        {/* Çıkış Tarihi */}
        <Text style={styles.releaseDate}>
          Release Date: {movie.release_date}
        </Text>

        
        {/* IMDb Puanı */}
        <Text style={styles.rating}>
          Rating: {movie.vote_average ? movie.vote_average : 'N/A'}
        </Text>
      </View>

      {/* Kalp Butonu */}
      <TouchableOpacity style={styles.heartButton} onPress={favoriyeekle}>
        <Ionicons name="heart-outline" size={24} color="tomato" />
      </TouchableOpacity>

      {/* Paylaş Butonu */}
      <TouchableOpacity style={styles.shareButton} onPress={shareMovie}>
        <Ionicons name="share-social-outline" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#3b8d99',
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
  releaseDate: {
    fontSize: 14,
    color: 'black',
  },
  rating: {
    fontSize: 14,
    color: 'orange',
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 5,
  },
});

export default MovieCard;
