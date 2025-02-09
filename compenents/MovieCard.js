import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Navigation için hook ekleniyor
import { useFavorites } from '../compenents/FavoritesContext';

const MovieCard = ({ movie }) => {
  const navigation = useNavigation(); // Navigation hook'unu kullan
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  // Detay sayfasına yönlendirme fonksiyonu
  const goToDetails = () => {
    navigation.navigate('Details', { movie });
  };

  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.45;
  const imageHeight = cardWidth * 1.5;

  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={goToDetails}>
      <Image source={{ uri: movie.poster_path }} style={[styles.image, { height: imageHeight }]} />
      <View style={styles.overlay} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.original_title}</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleFavorite}>
        <Ionicons 
          name={isFavorite ? 'heart' : 'heart-outline'} 
          size={30} 
          color={isFavorite ? '#ff6347' : '#fff'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15, 
    backgroundColor: '#333',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    elevation: 5,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 15,
  },
  overlay: {
    position: 'absolute',
    
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
  info: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 99, 71, 0.6)',
    borderRadius: 50,
    padding: 8,
    zIndex: 2,
  },
});

export default MovieCard;
