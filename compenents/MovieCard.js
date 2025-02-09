import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // useNavigation hook'unu import ediyoruz

const MovieCard = ({ movie, addToFavorites, removeFromFavorites, isFavorite }) => {
  const navigation = useNavigation(); // navigation nesnesini buradan alıyoruz

  const shareMovie = async () => {
    try {
      await Share.share({
        message: `Check out this movie: ${movie.original_title}`,
      });
    } catch (error) {
      console.error('Error sharing movie:', error);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      Alert.alert(
        'Remove from Favorites',
        'Are you sure you want to remove this movie from your favorites?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Remove',
            onPress: () => {
              console.log('Removing from favorites:', movie.id);
              removeFromFavorites(movie.id);
            },
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    } else {
      addToFavorites(movie);
    }
  };

  const handleCardPress = () => {
    // MovieCard'a tıklandığında, detaylar sayfasına yönlendiriyoruz
    navigation.navigate('Details', { movie: movie }); // 'Details' ekranına movie verisini gönderiyoruz
  };
  

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={{ uri: movie.poster_path }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.rating}>Rating: {movie.vote_average ? movie.vote_average : 'N/A'}</Text>
      </View>

      {/* Favori butonu */}
      <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={24} 
          color={isFavorite ? "red" : "gray"} 
        />
      </TouchableOpacity>

      {/* Paylaşım butonu */}
      <TouchableOpacity style={styles.shareButton} onPress={shareMovie}>
        <Ionicons name="share-social-outline" size={24} color="blue" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '50%',
    marginBottom: 10,
    backgroundColor: '#3b8d99',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    color: '#fff',
  },
  releaseDate: {
    fontSize: 14,
    color: '#eee',
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
