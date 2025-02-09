import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieCard from '../compenents/MovieCard';

const ProfileScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('favorites');
        const parsedFavorites = favoritesData ? JSON.parse(favoritesData) : [];
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, []); // Only run once when component mounts

  const handleAddToFavorites = async (movie) => {
    try {
      // Step 1: UI update (state update) immediately
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);

      // Step 2: Save updated favorites to AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      console.log("Movie added to favorites:", movie);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  const handleRemoveFromFavorites = async (movie) => {
    try {
      // Step 1: UI update (state update) immediately
      const updatedFavorites = favorites.filter((item) => item.id !== movie.id);
      setFavorites(updatedFavorites);

      // Step 2: Save updated favorites to AsyncStorage
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      console.log("Movie removed from favorites:", movie);
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };

  return (
    <LinearGradient colors={['#a8c0ff', '#3f4c6b']} style={styles.container}>
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Buğra Kahvecioğlu</Text>
      <Text style={styles.email}>bugra@example.com</Text>
      <Text style={styles.favoritesTitle}>Favori Filmlerim</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFavorite={true} // Always true when on the favorites screen
              addToFavorites={handleAddToFavorites}
              removeFromFavorites={handleRemoveFromFavorites}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContentContainer}
          style={styles.flatList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Favori film bulunamadı.</Text>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#eee',
  },
  favoritesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    width: '100%',
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
