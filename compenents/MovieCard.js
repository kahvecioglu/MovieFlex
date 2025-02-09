import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, Share, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage'ı import ediyoruz

const MovieCard = ({ movie }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Uygulama başladığında, favori filmleri AsyncStorage'tan alıyoruz.
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        const favoritesArray = favorites ? JSON.parse(favorites) : [];
        setIsFavorite(favoritesArray.some(fav => fav.id === movie.id)); // Eğer film favorilerdeyse, state'i güncelliyoruz
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, [movie.id]);

  const saveToFavorites = async (movie) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = favorites ? JSON.parse(favorites) : [];

      // Eğer film favorilerde değilse, ekliyoruz
      if (!favoritesArray.some(fav => fav.id === movie.id)) {
        favoritesArray.push(movie);
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error saving movie to favorites:', error);
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const favoritesArray = favorites ? JSON.parse(favorites) : [];

      // Eğer film favorilerdeyse, çıkarıyoruz
      const updatedFavorites = favoritesArray.filter(fav => fav.id !== movie.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
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
            onPress: () => removeFromFavorites(movie),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    } else {
      saveToFavorites(movie);
    }
  };

  const shareMovie = async () => {
    try {
      await Share.share({
        message: `Check out this movie: ${movie.original_title}`,
      });
    } catch (error) {
      console.error('Error sharing movie:', error);
    }
  };

  const handleCardPress = () => {
    navigation.navigate('Details', { movie: movie });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
      <Image source={{ uri: movie.poster_path }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.rating}>Rating: {movie.vote_average ? movie.vote_average : 'N/A'}</Text>
      </View>

      <TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavorite ? "red" : "gray"}
        />
      </TouchableOpacity>

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
